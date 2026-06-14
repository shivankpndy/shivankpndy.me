// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// =============================================
// CONFIGURATION - ADD YOUR KEYS HERE
// =============================================
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';
const RATE_LIMIT_SALT = process.env.RATE_LIMIT_SALT || 'your-super-secret-salt-change-this';

// In-memory store for rate limiting (resets on server restart)
// For production, consider replacing with Redis / Vercel KV
const rateLimitStore = new Map<string, number>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

// Helper: Create SHA-256 hash
function createHash(input: string): string {
  return crypto
    .createHash('sha256')
    .update(input + RATE_LIMIT_SALT)
    .digest('hex');
}

// Helper: Get client IP (works on Vercel, Netlify, etc.)
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Helper: Create lightweight fingerprint string (non-invasive)
function createFingerprintString(data: any): string {
  return [
    data.userAgent || '',
    data.language || '',
    data.timezone || '',
    data.platform || '',
    data.screenResolution || '',
  ].join('|');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, turnstileToken, fingerprint } = body;

    // 1. Basic validation
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Verify Cloudflare Turnstile
    if (!TURNSTILE_SECRET_KEY) {
      console.error('TURNSTILE_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Bot verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // 3. Create hashed identifier for rate limiting
    const ip = getClientIP(request);
    const fingerprintString = createFingerprintString(fingerprint || {});
    const identifier = createHash(ip + fingerprintString);

    // 4. Check 24-hour rate limit
    const lastSubmission = rateLimitStore.get(identifier);
    const now = Date.now();
    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours

    if (lastSubmission && now - lastSubmission < cooldownPeriod) {
      const remainingMs = cooldownPeriod - (now - lastSubmission);
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
      
      return NextResponse.json(
        {
          error: `You can only send one message every 24 hours. Please try again in approximately ${remainingHours} hour(s).`,
          remainingTime: remainingMs,
        },
        { status: 429 }
      );
    }

    // 5. Store hashed identifier with timestamp
    rateLimitStore.set(identifier, now);

    // 6. TODO: Send the actual email here (Resend, Nodemailer, etc.)
    // For now we just log it (replace with real email sending)
    console.log('New contact form submission:', {
      name,
      email,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}