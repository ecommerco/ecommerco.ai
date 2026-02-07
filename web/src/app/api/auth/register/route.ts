import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
import { prisma } from '@/lib/prisma';
import { isoUint8Array } from '@simplewebauthn/server/helpers';
import type { AuthenticatorTransport } from '@simplewebauthn/server';
import { put } from '@vercel/blob';

// Human-readable title for your website
const rpName = 'Ecommerco.ai';
// A unique identifier for your website
const rpID = 'localhost';
const origin = `http://${rpID}:3000`;

export async function POST(req: NextRequest) {
  let body: any = {};
  let formData: FormData | null = null;
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    formData = await req.formData();
    body = Object.fromEntries(formData);
    if (typeof body.attestationResponse === 'string') {
      try {
        body.attestationResponse = JSON.parse(body.attestationResponse);
      } catch (e) {
        console.error('Failed to parse attestationResponse', e);
      }
    }
  } else {
    body = await req.json();
  }

  const { action, email, name, attestationResponse } = body;

  if (action === 'generate-options') {
    // 1. Create or get user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    // 2. Generate registration options
    // List of authenticators the user has already registered
    const userAuthenticators = await prisma.authenticator.findMany({
      where: { userId: user.id },
    });

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userName: user.email,
      // Don't prompt users for additional information about the authenticator
      // (Recommended for smoother UX)
      attestationType: 'none',
      // Prevent users from re-registering existing authenticators
      excludeCredentials: userAuthenticators.map((authenticator) => ({
        id: authenticator.credentialID,
        type: 'public-key',
        transports: authenticator.transports
          ? (JSON.parse(authenticator.transports as string) as AuthenticatorTransport[])
          : undefined,
      })),
      authenticatorSelection: {
        // "platform" = Face ID / Touch ID / Windows Hello
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
    });

    // 3. Save challenge to DB
    await prisma.user.update({
      where: { id: user.id },
      data: { currentChallenge: options.challenge },
    });

    return NextResponse.json(options);
  }

  if (action === 'verify') {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.currentChallenge) {
      return NextResponse.json({ error: 'User or challenge not found' }, { status: 400 });
    }

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: attestationResponse,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credentialDeviceType, credentialBackedUp, credential } = registrationInfo;
      const { id: credentialID, publicKey: credentialPublicKey, counter } = credential;

      await prisma.authenticator.create({
        data: {
          credentialID: credentialID,
          credentialPublicKey: Buffer.from(credentialPublicKey).toString('base64'),
          counter: BigInt(counter),
          credentialDeviceType,
          credentialBackedUp,
          userId: user.id,
        },
      });

      // Handle file upload if present
      if (formData) {
        const file = formData.get('file') as File | null;
        if (file && file.size > 0) {
          try {
            // Upload to Vercel Blob
            const blob = await put(file.name, file, {
              access: 'public',
            });

            // Update user with document path (URL)
            await prisma.user.update({
              where: { id: user.id },
              data: { documentPath: blob.url },
            });
          } catch (error) {
            console.error('File upload failed:', error);
            // We don't fail the whole request if file upload fails
          }
        }
      }

      // Clear challenge
      await prisma.user.update({
        where: { id: user.id },
        data: { currentChallenge: null },
      });

      return NextResponse.json({ verified: true });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
