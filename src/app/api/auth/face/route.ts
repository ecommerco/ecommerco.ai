import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * Face Recognition API Route
 * Production-ready endpoint for face authentication
 * 
 * Expected request:
 * POST /api/auth/face
 * Body: { image: base64 string }
 * 
 * Returns:
 * { success: boolean, userId?: string, token?: string, error?: string }
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests per 15 minutes per IP
  const clientIP = getClientIP(req);
  const rateLimitResult = rateLimit(`face:${clientIP}`, 5, 15 * 60 * 1000);

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
    const { descriptor, image } = body;

    if (!descriptor || !Array.isArray(descriptor)) {
      return NextResponse.json(
        { success: false, error: 'Face descriptor is required' },
        { status: 400 }
      );
    }

    // Convert descriptor to JSON string for comparison
    const descriptorString = JSON.stringify(descriptor);

    // Find user with matching face descriptor
    // We'll compare descriptors using euclidean distance
    const users = await prisma.user.findMany({
      where: {
        faceDescriptor: { not: null },
      },
    });

    // Compare with stored descriptors
    let matchedUser = null;
    const threshold = 0.6; // Face matching threshold

    for (const user of users) {
      if (!user.faceDescriptor) continue;

      try {
        const storedDescriptor = JSON.parse(user.faceDescriptor);
        
        // Calculate euclidean distance
        let distance = 0;
        for (let i = 0; i < Math.min(descriptor.length, storedDescriptor.length); i++) {
          distance += Math.pow(descriptor[i] - storedDescriptor[i], 2);
        }
        distance = Math.sqrt(distance);

        if (distance < threshold) {
          matchedUser = user;
          break;
        }
      } catch (error) {
        // Skip invalid descriptors
        continue;
      }
    }

    if (!matchedUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Face not recognized. Please register your face first or use another authentication method.',
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
        method: 'face',
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
        message: 'Face recognized successfully',
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
      console.error('Face recognition error:', error);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Face recognition service temporarily unavailable. Please try again later.',
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
