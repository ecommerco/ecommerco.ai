import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * Voice Recognition API Route
 * Production-ready endpoint for voice authentication
 * 
 * Expected request:
 * POST /api/auth/voice
 * Body: { audio: base64 string or FormData with audio file }
 * 
 * Returns:
 * { success: boolean, userId?: string, token?: string, error?: string }
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests per 15 minutes per IP
  const clientIP = getClientIP(req);
  const rateLimitResult = rateLimit(`voice:${clientIP}`, 5, 15 * 60 * 1000);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { features, audio } = body;

    if (!features || !Array.isArray(features)) {
      return NextResponse.json(
        { success: false, error: 'Voice features are required' },
        { status: 400 }
      );
    }

    // Find user with matching voice features
    const users = await prisma.user.findMany({
      where: {
        voicePrint: { not: null },
      },
    });

    // Compare with stored voiceprints
    let matchedUser = null;
    const threshold = 0.5; // Voice matching threshold (lower than face because voice varies more)

    for (const user of users) {
      if (!user.voicePrint) continue;

      try {
        const storedFeatures = JSON.parse(user.voicePrint);
        
        // Calculate euclidean distance
        let distance = 0;
        for (let i = 0; i < Math.min(features.length, storedFeatures.length); i++) {
          distance += Math.pow(features[i] - storedFeatures[i], 2);
        }
        distance = Math.sqrt(distance);

        if (distance < threshold) {
          matchedUser = user;
          break;
        }
      } catch (error) {
        // Skip invalid voiceprints
        continue;
      }
    }

    if (!matchedUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Voice not recognized. Please register your voice first or use another authentication method.',
        },
        {
          status: 401,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      {
        userId: matchedUser.id,
        email: matchedUser.email,
        method: 'voice',
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Create session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.session.create({
      data: {
        token,
        userId: matchedUser.id,
        expiresAt,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Voice recognized successfully',
        token,
        expiresAt: expiresAt.getTime(),
        user: {
          id: matchedUser.id,
          email: matchedUser.email,
        },
      },
      {
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );

  } catch (error: any) {
    // Log error for monitoring (in production, use proper logging service)
    if (process.env.NODE_ENV === 'development') {
      console.error('Voice recognition error:', error);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Voice recognition service temporarily unavailable. Please try again later.',
      },
      {
        status: 500,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  }
}
