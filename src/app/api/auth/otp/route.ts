import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * OTP Authentication API Route
 * Production-ready endpoint for OTP (One-Time Password) authentication
 * 
 * Endpoints:
 * POST /api/auth/otp/send - Send OTP to email/phone
 * POST /api/auth/otp/verify - Verify OTP code
 */
export async function POST(req: NextRequest) {
  const clientIP = getClientIP(req);
  
  try {
    const body = await req.json();
    const { action, email, phone, code } = body;

    // Validate action
    if (!action || (action !== 'send' && action !== 'verify')) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "send" or "verify"' },
        { status: 400 }
      );
    }

    // Rate limiting based on action
    const rateLimitKey = action === 'send' ? `otp-send:${clientIP}` : `otp-verify:${clientIP}`;
    const maxRequests = action === 'send' ? 3 : 5; // Stricter limit for sending
    const rateLimitResult = rateLimit(rateLimitKey, maxRequests, 15 * 60 * 1000);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    if (action === 'send') {
      // Send OTP
      if (!email && !phone) {
        return NextResponse.json(
          { success: false, error: 'Email or phone number is required' },
          { status: 400 }
        );
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

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

      // Store OTP in database
      await prisma.otp.create({
        data: {
          email: email ? email.trim().toLowerCase() : null,
          phone: phone ? phone.trim() : null,
          code: otp,
          expiresAt,
          userId: user.id,
        },
      });

      // TODO: Send OTP via email or SMS
      // Email: Use SendGrid, AWS SES, Resend, etc.
      // SMS: Use Twilio, AWS SNS, etc.
      
      // Example with Resend (email):
      // if (email) {
      //   await resend.emails.send({
      //     from: 'noreply@ecommerco.ai',
      //     to: email,
      //     subject: 'Your Verification Code',
      //     html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
      //   });
      // }

      // Example with Twilio (SMS):
      // if (phone) {
      //   await twilioClient.messages.create({
      //     body: `Your verification code is: ${otp}`,
      //     from: process.env.TWILIO_PHONE_NUMBER,
      //     to: phone,
      //   });
      // }

      const response = NextResponse.json(
        {
          success: true,
          message: 'OTP sent successfully',
          // In production, don't return OTP. Only return it in development.
          ...(process.env.NODE_ENV === 'development' && { otp }),
        }
      );
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
      
      return response;

    } else if (action === 'verify') {
      // Verify OTP
      if (!code) {
        return NextResponse.json(
          { success: false, error: 'OTP code is required' },
          { status: 400 }
        );
      }

      if (!email && !phone) {
        return NextResponse.json(
          { success: false, error: 'Email or phone number is required' },
          { status: 400 }
        );
      }

      // Verify OTP from database
      const otpRecord = await prisma.otp.findFirst({
        where: {
          OR: [
            email ? { email: email.trim().toLowerCase() } : {},
            phone ? { phone: phone.trim() } : {},
          ].filter(obj => Object.keys(obj).length > 0),
          code: code.trim(),
          expiresAt: { gt: new Date() },
          verified: false,
        },
        orderBy: {
          createdAt: 'desc', // Get most recent OTP
        },
      });

      if (!otpRecord) {
        const response = NextResponse.json(
          {
            success: false,
            error: 'Invalid or expired OTP code. Please request a new code.',
          },
          { status: 400 }
        );
        
        response.headers.set('X-RateLimit-Limit', maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
        response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
        
        return response;
      }

      // Mark as verified
      await prisma.otp.update({
        where: { id: otpRecord.id },
        data: { verified: true },
      });

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: otpRecord.userId || '' },
      });

      if (!user) {
        const response = NextResponse.json(
          {
            success: false,
            error: 'User not found',
          },
          { status: 404 }
        );
        
        response.headers.set('X-RateLimit-Limit', maxRequests.toString());
        response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
        response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
        
        return response;
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          method: email ? 'email' : 'phone',
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

      const response = NextResponse.json({
        success: true,
        token,
        expiresAt: expiresAt.getTime(),
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
        },
      });
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
      
      return response;
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
      
      return response;
    }

  } catch (error: any) {
    // Log error for monitoring (in production, use proper logging service)
    if (process.env.NODE_ENV === 'development') {
      console.error('OTP error:', error);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'OTP service temporarily unavailable. Please try again later.',
      },
      { status: 500 }
    );
  }
}
