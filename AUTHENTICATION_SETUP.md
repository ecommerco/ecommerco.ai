# Production Authentication Setup Guide

This guide explains how to set up production-ready authentication services for face recognition, voice recognition, and OTP.

## Overview

The authentication system supports 4 methods:
1. **Face Recognition** - Biometric face authentication
2. **Voice Recognition** - Biometric voice authentication  
3. **Email OTP** - One-time password via email
4. **Phone OTP** - One-time password via SMS

## 1. Face Recognition Setup

### Option A: Azure Face API (Recommended)

1. Create an Azure account and go to [Azure Portal](https://portal.azure.com)
2. Create a "Face" resource in Azure Cognitive Services
3. Get your API key and endpoint
4. Add to `.env.local`:
```env
AZURE_FACE_API_KEY=your-api-key
AZURE_FACE_API_ENDPOINT=https://your-region.api.cognitive.microsoft.com
```

5. Update `src/app/api/auth/face/route.ts`:
```typescript
const response = await fetch(`${faceApiEndpoint}/detect?returnFaceId=true&returnFaceAttributes=age,gender`, {
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': faceApiKey,
    'Content-Type': 'application/octet-stream',
  },
  body: Buffer.from(image, 'base64'),
});
const faceData = await response.json();

// Verify against stored face IDs in database
const user = await prisma.user.findFirst({
  where: { faceId: faceData[0].faceId },
});
```

### Option B: AWS Rekognition

1. Create AWS account and go to [AWS Console](https://console.aws.amazon.com)
2. Enable Amazon Rekognition service
3. Create IAM user with Rekognition access
4. Add to `.env.local`:
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

5. Install AWS SDK:
```bash
npm install @aws-sdk/client-rekognition
```

6. Update `src/app/api/auth/face/route.ts` to use AWS Rekognition SDK

### Option C: FaceIO

1. Sign up at [FaceIO](https://faceio.net)
2. Get your Public ID and API Key
3. Add to `.env.local`:
```env
FACEIO_PUBLIC_ID=your-public-id
FACEIO_API_KEY=your-api-key
```

## 2. Voice Recognition Setup

### Option A: Azure Speech Service (Recommended)

1. Create "Speech" resource in Azure Cognitive Services
2. Get your API key and region
3. Add to `.env.local`:
```env
AZURE_SPEECH_KEY=your-api-key
AZURE_SPEECH_REGION=your-region
```

4. Install Azure Speech SDK:
```bash
npm install microsoft-cognitiveservices-speech-sdk
```

5. Update `src/app/api/auth/voice/route.ts` to use Azure Speech SDK

### Option B: AWS Transcribe

1. Enable Amazon Transcribe service in AWS
2. Add AWS credentials to `.env.local`
3. Install AWS SDK:
```bash
npm install @aws-sdk/client-transcribe
```

### Option C: Deepgram

1. Sign up at [Deepgram](https://deepgram.com)
2. Get your API key
3. Add to `.env.local`:
```env
DEEPGRAM_API_KEY=your-api-key
```

## 3. OTP Setup

### Email OTP

#### Option A: Resend (Recommended)

1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
```env
RESEND_API_KEY=your-api-key
```

4. Install Resend:
```bash
npm install resend
```

5. Update `src/app/api/auth/otp/route.ts`:
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@ecommerco.ai',
  to: email,
  subject: 'Your Verification Code',
  html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
});
```

#### Option B: SendGrid

1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Install SendGrid:
```bash
npm install @sendgrid/mail
```

### SMS OTP

#### Option A: Twilio (Recommended)

1. Sign up at [Twilio](https://twilio.com)
2. Get your Account SID, Auth Token, and Phone Number
3. Add to `.env.local`:
```env
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

4. Install Twilio:
```bash
npm install twilio
```

5. Update `src/app/api/auth/otp/route.ts`:
```typescript
import twilio from 'twilio';
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await twilioClient.messages.create({
  body: `Your verification code is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phone,
});
```

#### Option B: AWS SNS

1. Enable Amazon SNS service
2. Add AWS credentials to `.env.local`
3. Install AWS SDK:
```bash
npm install @aws-sdk/client-sns
```

## 4. Database Setup

You'll need a database to store:
- User face IDs / voiceprints
- OTP codes with expiration
- User authentication tokens

### Using Prisma (Recommended)

1. Install Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

2. Update `prisma/schema.prisma`:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String?  @unique
  phone     String?  @unique
  faceId    String?
  voicePrint String?
  createdAt DateTime @default(now())
}

model OTP {
  id        String   @id @default(cuid())
  email     String?
  phone     String?
  code      String
  expiresAt DateTime
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

3. Run migrations:
```bash
npx prisma migrate dev
```

## 5. JWT Token Setup

1. Install JWT library:
```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

2. Add to `.env.local`:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. Update API routes to generate JWT tokens after successful authentication

## 6. Environment Variables Summary

Create `.env.local` with all required variables:

```env
# Face Recognition
AZURE_FACE_API_KEY=your-key
AZURE_FACE_API_ENDPOINT=your-endpoint
# OR
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1

# Voice Recognition
AZURE_SPEECH_KEY=your-key
AZURE_SPEECH_REGION=your-region
# OR
DEEPGRAM_API_KEY=your-key

# Email OTP
RESEND_API_KEY=your-key
# OR
SENDGRID_API_KEY=your-key

# SMS OTP
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890

# Database
DATABASE_URL=your-database-url

# JWT
JWT_SECRET=your-super-secret-key
```

## 7. Testing

After setup, test each authentication method:

1. **Face Recognition**: Capture face image and verify it matches stored face ID
2. **Voice Recognition**: Record voice sample and verify it matches stored voiceprint
3. **Email OTP**: Send OTP to email and verify code
4. **Phone OTP**: Send OTP to phone and verify code

## 8. Security Considerations

- Store face IDs and voiceprints securely (encrypted)
- Use HTTPS for all API calls
- Implement rate limiting for OTP requests
- Set appropriate OTP expiration times (5 minutes recommended)
- Use strong JWT secrets
- Implement proper error handling (don't expose sensitive information)
- Add logging and monitoring for authentication attempts

## Next Steps

1. Choose your preferred services (Azure, AWS, or third-party)
2. Set up accounts and get API keys
3. Install required npm packages
4. Update API routes with actual service integrations
5. Set up database schema
6. Test each authentication method
7. Deploy to production

## Support

For issues or questions, refer to:
- [Azure Face API Documentation](https://docs.microsoft.com/azure/cognitive-services/face/)
- [Azure Speech Service Documentation](https://docs.microsoft.com/azure/cognitive-services/speech-service/)
- [AWS Rekognition Documentation](https://docs.aws.amazon.com/rekognition/)
- [Twilio API Documentation](https://www.twilio.com/docs)
