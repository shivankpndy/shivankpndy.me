"use client";

import { useEffect } from 'react';
import Reveal from '@/components/Reveal';

export default function BlogRedirect() {
  useEffect(() => {
    // Redirect to Medium profile
    // TODO: Update this URL to Shivank's actual Medium profile or publication when ready
    const mediumUrl = "https://medium.com/@shivankpndy";
    
    // Small delay so user sees the elegant message
    const timer = setTimeout(() => {
      window.location.href = mediumUrl;
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <Reveal className="text-center max-w-md">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>
        
        <h1 className="font-serif text-5xl tracking-[-1.5px] mb-4">Blog</h1>
        <p className="text-xl text-zinc-400 mb-8">Redirecting you to Medium…</p>
        
        <a 
          href="https://medium.com/@shivankpndy" 
          className="inline-block text-sm tracking-widest text-zinc-500 hover:text-white underline-offset-4 hover:underline transition-colors"
        >
          GO TO MEDIUM PROFILE DIRECTLY →
        </a>
        
        <p className="mt-12 text-[10px] text-zinc-600 max-w-[260px] mx-auto">
          Update the redirect URL in <span className="font-mono">app/blog/page.tsx</span> if your publication changes.
        </p>
      </Reveal>
    </div>
  );
}
