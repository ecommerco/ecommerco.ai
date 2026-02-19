import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * Register Face or Voice
 * POST /api/auth/register
 * Body: { type: 'face' | 'voice', descriptor?: number[], features?: number[] }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, descriptor, features, email, phone } = body;

    if (!type || (type !== 'face' && type !== 'voice')) {
      return NextResponse.json(
        { success: false, error: 'Type must be "face" or "voice"' },
        { status: 400 }
      );
    }

    if (type === 'face' && (!descriptor || !Array.isArray(descriptor))) {
      return NextResponse.json(
        { success: false, error: 'Face descriptor is required' },
        { status: 400 }
      );
    }

    if (type === 'voice' && (!features || !Array.isArray(features))) {
      return NextResponse.json(
        { success: false, error: 'Voice features are required' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          email ? { email: email.trim().toLowerCase() } : {},
          phone ? { phone: phone.trim() } : {},
        ].filter(obj => Object.keys(obj).length > 0),
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email ? email.trim().toLowerCase() : null,
          phone: phone ? phone.trim() : null,
        },
      });
    }

    // Update user with face descriptor or voice print
    if (type === 'face') {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          faceDescriptor: JSON.stringify(descriptor),
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          voicePrint: JSON.stringify(features),
        },
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        method: type,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Create session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${type === 'face' ? 'Face' : 'Voice'} registered successfully`,
      token,
      expiresAt: expiresAt.getTime(),
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Registration error:', error);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed. Please try again later.',
      },
      { status: 500 }
    );
  }
}
