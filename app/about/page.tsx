"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Code2, Music, Sword } from 'lucide-react';
import Link from 'next/link';

const crafts = [
  {
    title: "Writing",
    desc: "Personal essays, reported features, and explorations of discipline, identity, and craft.",
    icon: PenTool,
  },
  {
    title: "Coding",
    desc: "Building intentional tools and digital experiences with clean code and thoughtful interfaces.",
    icon: Code2,
  },
  {
    title: "Music",
    desc: "Composing and recording original pieces that blend melody with emotion and texture.",
    icon: Music,
  },
  {
    title: "Boxing",
    desc: "Amateur boxer focused on technique, strategy, and the mental game inside and outside the ring.",
    icon: Sword,
  },
];

export default function About() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [cooldownMessage, setCooldownMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Privacy policy agreement check
    if (!agreedToPrivacy) {
      alert("Please agree to the Privacy Policy before sending a message.");
      return;
    }

    // Client-side 24-hour cooldown check using localStorage
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
      const timeSince = Date.now() - parseInt(lastSubmission);
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in ms

      if (timeSince < cooldownPeriod) {
        const remainingMs = cooldownPeriod - timeSince;
        const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
        setCooldownMessage(
          `You can only send one message every 24 hours. Please try again in approximately ${remainingHours} hour(s).`
        );
        return;
      }
    }

    setIsSubmitting(true);
    setCooldownMessage('');

    try {
      // Collect lightweight, non-invasive browser fingerprint
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      };

      // Get Turnstile token
      const turnstileToken = (window as any).turnstile?.getResponse?.();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          turnstileToken,
          fingerprint,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Server-side rate limit hit
          setCooldownMessage(result.error || 'You can only send one message every 24 hours.');
        } else {
          alert(result.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      // Success
      localStorage.setItem('lastContactSubmission', Date.now().toString());
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setAgreedToPrivacy(false);

      // Reset Turnstile widget
      (window as any).turnstile?.reset?.();

      // Auto-hide success message and reset form
      setTimeout(() => {
        setSubmitted(false);
      }, 2800);

    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure Turnstile widget renders when the CF script becomes available.
  useEffect(() => {
    let interval: number | undefined;

    const tryRender = () => {
      const t = (window as any).turnstile;
      if (t && typeof t.render === 'function') {
        document.querySelectorAll('.cf-turnstile').forEach((el) => {
          // If the widget already rendered it will contain an iframe
          if (!el.querySelector('iframe')) {
            try {
              t.render(el as HTMLElement, { sitekey: (el as HTMLElement).getAttribute('data-sitekey') });
            } catch (err) {
              // ignore render errors and try again
            }
          }
        });

        if (interval) {
          clearInterval(interval);
        }
      }
    };

    // Try immediately, then poll every 500ms up to the script load
    tryRender();
    interval = window.setInterval(tryRender, 500);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-4">CHAPTER I</div>
        <h1 className="font-serif text-6xl md:text-7xl tracking-[-2.4px] mb-6">About</h1>
        <p className="max-w-2xl text-xl text-zinc-400">A quiet introduction to who I am right now.</p>
      </div>

      {/* Bio - Unchanged as per your request */}
      <div className="prose prose-invert max-w-none mb-20 text-[17px] leading-relaxed text-zinc-300">
        <p className="mb-6">
          Most of my days begin and end in the same room. It holds my desk, my work, and the hours between training and sleep. I go to the gym to learn discipline, resilience, and how to move with intention. Then I return here to shape the other parts of myself through writing, coding, and music. This room has quietly become the place where much of my life unfolds.
        </p>

        <p className="mb-6">
          There was a time when I didn't have this kind of space or this kind of freedom. Now that I do, even ordinary things carry a different weight. I can sit with an idea without rushing it. I can leave something unfinished and trust that I can return to it the next day. I can work without needing to explain why it matters to me. That kind of room is something I've learned not to take lightly.
        </p>

        <p>
          I don't have a clear map of where this path leads. I only know that I want to keep moving between the ring and this desk with whatever patience and effort I can give. Some days the work feels simple. Other days it asks for more than I think I have. Either way, I come back to it. I put the gloves away, sit down at the same table, and continue. It isn't always easy, but it feels like mine.
        </p>
      </div>

      {/* Crafts - Unchanged */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-4xl tracking-[-1px]">My Crafts</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {crafts.map((craft, idx) => {
            const Icon = craft.icon;
            return (
              <div key={idx} className="card rounded-3xl p-8 group">
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-0.4px] mb-3 text-white">{craft.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-[15px]">{craft.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect Section with Secure Form */}
      <div id="connect" className="border-t border-zinc-900 pt-16">
        <div className="max-w-2xl">
          <div className="mb-8">
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">CHAPTER II</div>
            <h2 className="font-serif text-5xl tracking-[-1.4px] mb-4">Connect</h2>
            <p className="text-lg text-zinc-400">I read every message. Let&apos;s talk about writing, code, music, or the fight.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-emerald-900/50 bg-emerald-950/30 p-10 text-center"
            >
              <p className="text-emerald-400 text-lg">Thank you. I&apos;ll reply within a few days.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-widest text-zinc-500 mb-2 font-mono">YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3.5 text-base placeholder:text-zinc-600 focus:border-zinc-700"
                    placeholder="Alex Rivera"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-zinc-500 mb-2 font-mono">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3.5 text-base placeholder:text-zinc-600 focus:border-zinc-700"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest text-zinc-500 mb-2 font-mono">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-y rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-base placeholder:text-zinc-600 focus:border-zinc-700"
                  placeholder="I'd love to hear about your current project or idea..."
                />
              </div>

              {/* Cloudflare Turnstile Widget */}
              <div className="pt-2">
                <div className="cf-turnstile" data-sitekey="0x4AAAAAADkixz-BipbI58ar" data-theme="dark"></div>
                {/* 
                  === CLOUDFLARE TURNSTILE SETUP ===
                  1. Go to Cloudflare Dashboard → Turnstile and create a site.
                  2. Copy your Site Key and replace "YOUR_TURNSTILE_SITE_KEY_HERE" above.
                  3. Add your Secret Key in `app/api/contact/route.ts`.
                  4. Make sure the Turnstile script is loaded in layout.tsx or via next/script.
                */}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="mt-1.5 h-4 w-4 accent-white"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-zinc-400">
                  I have read and agree to the{' '}
                  <Link href="/privacy" className="underline hover:text-white transition-colors">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              {/* Cooldown / Error Message */}
              {cooldownMessage && (
                <div className="rounded-2xl border border-amber-900/50 bg-amber-950/30 px-5 py-4 text-sm text-amber-400">
                  {cooldownMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !agreedToPrivacy}
                className="btn btn-primary w-full py-4 text-base disabled:opacity-70 mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-[10px] text-zinc-600 pt-1">
                You can send one message every 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}