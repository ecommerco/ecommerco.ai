import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';
import { prisma } from '@/lib/prisma';
import { isoUint8Array } from '@simplewebauthn/server/helpers';

const rpID = 'localhost';
const origin = `http://${rpID}:3000`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, email, authenticationResponse } = body;

  if (action === 'generate-options') {
    // 1. Get user and authenticators
    const user = await prisma.user.findUnique({
      where: { email },
      include: { authenticators: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: user.authenticators.map((authenticator) => ({
        id: authenticator.credentialID,
        type: 'public-key',
        transports: authenticator.transports
          ? (JSON.parse(authenticator.transports as string) as AuthenticatorTransport[])
          : undefined,
      })),
      userVerification: 'required',
    });

    // Save challenge
    await prisma.user.update({
      where: { id: user.id },
      data: { currentChallenge: options.challenge },
    });

    return NextResponse.json(options);
  }

  if (action === 'verify') {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { authenticators: true },
    });

    if (!user || !user.currentChallenge) {
      return NextResponse.json({ error: 'User or challenge not found' }, { status: 400 });
    }

    const authenticator = user.authenticators.find(
      (auth) => auth.credentialID === authenticationResponse.id
    );

    if (!authenticator) {
      return NextResponse.json({ error: 'Authenticator not found' }, { status: 400 });
    }

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: authenticationResponse,
        expectedChallenge: user.currentChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: {
          credentialID: authenticator.credentialID,
          credentialPublicKey: new Uint8Array(Buffer.from(authenticator.credentialPublicKey, 'base64')),
          counter: Number(authenticator.counter),
          transports: authenticator.transports
            ? (JSON.parse(authenticator.transports as string) as AuthenticatorTransport[])
            : undefined,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    const { verified, authenticationInfo } = verification;

    if (verified) {
      // Update counter
      await prisma.authenticator.update({
        where: { credentialID: authenticator.credentialID },
        data: { counter: BigInt(authenticationInfo.newCounter) },
      });

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
