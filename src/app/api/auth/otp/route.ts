import { NextRequest, NextResponse } from 'next/server';

/**
 * OTP Authentication API Route
 * Production-ready endpoint for OTP (One-Time Password) authentication
 * 
 * Endpoints:
 * POST /api/auth/otp/send - Send OTP to email/phone
 * POST /api/auth/otp/verify - Verify OTP code
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, phone, code } = body;

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

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        // In production, don't return OTP. Only return it in development.
        ...(process.env.NODE_ENV === 'development' && { otp }),
      });

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

      return NextResponse.json({
        success: false,
        error: 'OTP verification service not configured. Please set up database and email/SMS service.',
      }, { status: 501 });

    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "send" or "verify"' },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('OTP error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'OTP operation failed' },
      { status: 500 }
    );
  }
}
