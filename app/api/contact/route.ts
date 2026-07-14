// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';

// =============================================
// CONFIGURATION (from environment only)
// =============================================
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || '';
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || '';
const RATE_LIMIT_SALT = process.env.RATE_LIMIT_SALT || '';
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const WEAK_RATE_LIMIT_SALTS = new Set([
  '',
  'your-super-secret-salt-change-this',
  'change-me',
  'secret',
]);

const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
  turnstileToken: 2048,
} as const;

// Basic RFC 5322-ish check (practical, not full grammar)
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// In-memory store for rate limiting (resets on server restart)
// For production, consider replacing with Redis / Vercel KV
const rateLimitStore = new Map<string, number>();
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of rateLimitStore.entries()) {
    if (now - timestamp > COOLDOWN_MS) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

function createHash(input: string): string {
  return crypto
    .createHash('sha256')
    .update(input + RATE_LIMIT_SALT)
    .digest('hex');
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function createFingerprintString(data: unknown): string {
  const d = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  return [
    d.userAgent || '',
    d.language || '',
    d.timezone || '',
    d.platform || '',
    d.screenResolution || '',
  ].join('|');
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strip CR/LF and other control chars that can break email headers. */
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\0-\x1F\x7F]/g, '').trim();
}

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function validateInputs(body: unknown):
  | { ok: true; name: string; email: string; message: string; turnstileToken: string; fingerprint: unknown }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }

  const raw = body as Record<string, unknown>;
  const name = asNonEmptyString(raw.name);
  const email = asNonEmptyString(raw.email);
  const message = asNonEmptyString(raw.message);
  const turnstileToken = asNonEmptyString(raw.turnstileToken);

  if (!name || !email || !message || !turnstileToken) {
    return { ok: false, error: 'Missing required fields' };
  }

  if (name.length > LIMITS.name) {
    return { ok: false, error: `Name must be at most ${LIMITS.name} characters.` };
  }
  if (email.length > LIMITS.email) {
    return { ok: false, error: `Email must be at most ${LIMITS.email} characters.` };
  }
  if (message.length > LIMITS.message) {
    return { ok: false, error: `Message must be at most ${LIMITS.message} characters.` };
  }
  if (turnstileToken.length > LIMITS.turnstileToken) {
    return { ok: false, error: 'Invalid bot verification token.' };
  }

  const safeEmail = sanitizeHeaderValue(email);
  if (!EMAIL_RE.test(safeEmail)) {
    return { ok: false, error: 'Please provide a valid email address.' };
  }

  const safeName = sanitizeHeaderValue(name);
  if (!safeName) {
    return { ok: false, error: 'Please provide a valid name.' };
  }

  return {
    ok: true,
    name: safeName,
    email: safeEmail,
    message,
    turnstileToken,
    fingerprint: raw.fingerprint,
  };
}

export async function POST(request: NextRequest) {
  try {
    if (WEAK_RATE_LIMIT_SALTS.has(RATE_LIMIT_SALT)) {
      console.error('RATE_LIMIT_SALT is missing or uses a known-weak default');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const validated = validateInputs(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { name, email, message, turnstileToken, fingerprint } = validated;

    // Verify Cloudflare Turnstile
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

    // Hashed identifier for rate limiting
    const ip = getClientIP(request);
    const fingerprintString = createFingerprintString(fingerprint);
    const identifier = createHash(ip + fingerprintString);

    const lastSubmission = rateLimitStore.get(identifier);
    const now = Date.now();

    if (lastSubmission && now - lastSubmission < COOLDOWN_MS) {
      const remainingMs = COOLDOWN_MS - (now - lastSubmission);
      const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));

      return NextResponse.json(
        {
          error: `You can only send one message every 24 hours. Please try again in approximately ${remainingHours} hour(s).`,
          remainingTime: remainingMs,
        },
        { status: 429 }
      );
    }

    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
      console.error('Resend email configuration is incomplete');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    if (!resend) {
      console.error('Resend client initialization failed');
      return NextResponse.json(
        { error: 'Email service client could not be initialized.' },
        { status: 500 }
      );
    }

    const emailHtml = `
      <div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.5;">
        <h1 style="font-size: 1.4rem;">New contact form message</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-wrap; background: #f8f8f8; border-radius: 12px; padding: 14px; margin-top: 8px;">
          ${escapeHtml(message)}
        </div>
        <hr style="margin: 20px 0; border-color: #ddd;" />
        <p style="font-size: 0.9rem; color: #555; margin: 0;">Received from the about page contact form.</p>
      </div>
    `;

    const subjectName = name.slice(0, 80);
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${subjectName}`,
      html: emailHtml,
    });

    // Only count toward the rate limit after a successful send
    rateLimitStore.set(identifier, now);

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
