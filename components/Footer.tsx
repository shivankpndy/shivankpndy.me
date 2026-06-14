import Link from 'next/link';
import { Github, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://linktr.ee/shivankpndy', label: 'Linktree', icon: ExternalLink },
    { href: 'https://github.com/shivankpndy', label: 'GitHub', icon: Github },
    { href: 'https://x.com/shivankpndy', label: 'X', icon: Twitter },
    { href: 'https://instagram.com/shivankpndy', label: 'Instagram', icon: Instagram },
    { href: 'https://linkedin.com/in/shivankpndy', label: 'LinkedIn', icon: Linkedin },
  ];

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/50 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-8">
          <div>
            <p className="text-sm text-zinc-500">
              © {currentYear} Shivank Pandey. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              One person, many crafts.
            </p>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-700 hover:text-zinc-300"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
