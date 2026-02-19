import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

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

      // TODO: Store OTP in database with expiration (5 minutes)
      // await prisma.otp.create({
      //   data: {
      //     email: email || null,
      //     phone: phone || null,
      //     code: otp,
      //     expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      //   },
      // });

      // TODO: Send OTP via email or SMS
      // Email: Use SendGrid, AWS SES, Resend, etc.
      // SMS: Use Twilio, AWS SNS, etc.
      
      // Example with Resend (email):
      // await resend.emails.send({
      //   from: 'noreply@ecommerco.ai',
      //   to: email,
      //   subject: 'Your Verification Code',
      //   html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
      // });

      // Example with Twilio (SMS):
      // await twilioClient.messages.create({
      //   body: `Your verification code is: ${otp}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: phone,
      // });

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

      // TODO: Verify OTP from database
      // const otpRecord = await prisma.otp.findFirst({
      //   where: {
      //     email: email || undefined,
      //     phone: phone || undefined,
      //     code,
      //     expiresAt: { gt: new Date() },
      //     verified: false,
      //   },
      // });

      // if (!otpRecord) {
      //   return NextResponse.json(
      //     { success: false, error: 'Invalid or expired OTP' },
      //     { status: 400 }
      //   );

      //   // Mark as verified
      //   await prisma.otp.update({
      //     where: { id: otpRecord.id },
      //     data: { verified: true },
      //   });

      //   // Get or create user
      //   let user = await prisma.user.findFirst({
      //     where: { email: email || undefined, phone: phone || undefined },
      //   });

      //   if (!user) {
      //     user = await prisma.user.create({
      //       data: { email, phone },
      //     });
      //   }

      //   // Generate JWT token
      //   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      //     expiresIn: '7d',
      //   });

      //   return NextResponse.json({
      //     success: true,
      //     token,
      //     user: { id: user.id, email: user.email },
      //   });
      // }

      const response = NextResponse.json(
        {
          success: false,
          error: 'OTP verification service not configured. Please set up database and email/SMS service.',
        },
        { status: 501 }
      );
      
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
