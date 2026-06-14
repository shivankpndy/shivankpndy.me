// app/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-6xl tracking-[-2px] mb-4">Privacy Policy</h1>
        <p className="text-zinc-400">Last updated: June 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-zinc-300 space-y-8">
        <section>
          <h2 className="font-serif text-3xl tracking-[-0.5px] mb-4">Information Collected Through the Contact Form</h2>
          <p>
            When you submit the contact form, we collect your name, email address, and message. 
            This information is used solely to respond to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl tracking-[-0.5px] mb-4">Cloudflare Turnstile</h2>
          <p>
            We use Cloudflare Turnstile to protect the form against spam and automated abuse. 
            Turnstile may collect limited technical data (such as IP address and browser characteristics) 
            to determine whether you are a human. This data is processed by Cloudflare and is not used for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl tracking-[-0.5px] mb-4">Rate Limiting & Security</h2>
          <p>
            To prevent spam, we process limited technical information including your IP address and a lightweight 
            browser fingerprint (User-Agent, language, timezone, platform, and screen resolution). 
            This data is used **only** for abuse prevention and rate limiting (one submission per 24 hours).
          </p>
          <p className="mt-4">
            All identifiers are hashed using SHA-256 with a server-side salt before storage. 
            Raw IP addresses and fingerprints are never stored. These records are automatically deleted after 24 hours.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl tracking-[-0.5px] mb-4">Analytics</h2>
          <p>
            We may collect anonymized or aggregated analytics data (such as page views) to improve the website experience. 
            This data does not contain personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl tracking-[-0.5px] mb-4">Your Rights</h2>
          <p>
            If you have any questions about how your data is handled or would like to request deletion of any stored information, 
            please contact me directly through the channels listed on this website.
          </p>
        </section>
      </div>
    </div>
  );
}