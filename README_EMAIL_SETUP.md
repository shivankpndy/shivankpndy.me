# Email Setup for Contact Form

This project now uses Resend to deliver messages from the about page contact form to your inbox.

## Required environment variables

Add the following values to `.env.local`:

```dotenv
TURNSTILE_SECRET_KEY=...
RATE_LIMIT_SALT=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=you@yourdomain.com
RESEND_TO_EMAIL=your-inbox@domain.com
```

- `RESEND_API_KEY`: API key from Resend.
- `RESEND_FROM_EMAIL`: Verified sending address in Resend.
- `RESEND_TO_EMAIL`: Your inbox destination.

## Notes

- The contact form still uses Cloudflare Turnstile for spam protection.
- Rate limiting is enforced both client-side and server-side.
- If the email service is not configured, submissions return a 500 error.
