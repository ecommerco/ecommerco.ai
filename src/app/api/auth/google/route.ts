import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * Google OAuth Authentication
 * POST /api/auth/google
 * Body: { idToken: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idToken, email, name, picture } = body;

    // In production, verify the idToken with Google's API
    // For now, we'll accept the email and create/find user
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          // You can store name and picture in additional fields if needed
        },
      });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        method: 'google',
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
      token,
      expiresAt: expiresAt.getTime(),
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Google auth error:', error);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Google authentication failed. Please try again.',
      },
      { status: 500 }
    );
  }
}
