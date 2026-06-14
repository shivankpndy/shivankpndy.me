# Shivank Pandey — Portfolio

A refined, production-ready personal website for Shivank Pandey built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

**Live aesthetic**: Quiet, elegant, dark-first with a smooth light mode toggle. Subtle gradients, beautiful typography (Playfair Display + Inter + JetBrains Mono), and buttery micro-interactions.

## Features

- **Home**: Striking hero + elegant overview of four crafts
- **About**: Personal biography + refined craft cards + fully functional contact form (with Cloudflare Turnstile placeholder)
- **Writing**: Clean showcase of published work with realistic placeholders
- **Projects**: Four detailed projects. Each card opens a beautiful modal with complete, well-written project documentation, tech stack, and GitHub links
- **Records**: 
  - Audio file upload with instant browser preview/play
  - Clean list of recordings with play/pause + delete
  - Interactive Web Audio API composer with 8 notes + demo melody button
- **Games Lab**: Two elegant playable games
  - Tic-Tac-Toe (full win detection + reset)
  - Memory matching game (smooth 3D flips, move counter)
- **Blog**: Automatic redirect to Medium profile (easy to update)
- Fully responsive, accessible, smooth animations throughout
- Theme persistence (dark/light) via localStorage + context
- Professional navbar with mobile menu
- All social links correctly configured

## Tech Stack

- Next.js 16 + App Router + TypeScript
- Tailwind CSS 4 + PostCSS
- Framer Motion (animations & modals)
- Lucide React (icons)
- Pure Web Audio API (no external audio libs)
- React hooks for all interactive state

## Getting Started

### 1. Install dependencies

```bash
npm install
```

This will install `framer-motion`, `lucide-react`, and all other required packages.

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

## Customization Guide

### Content Updates (Easy)

- **Bio & name**: Edit `app/page.tsx` hero section
- **Writing pieces**: Update the `pieces` array in `app/writing/page.tsx`
- **Projects**: Edit the `projects` array in `app/projects/page.tsx`. The modal content lives in the `longDesc` field — make it rich and detailed.
- **Music / Records**: The page is fully functional. Uploaded files stay only in the visitor's browser (no backend).
- **Games**: Fully self-contained in `app/games/page.tsx`
- **Blog redirect**: Change the URL in `app/blog/page.tsx` (currently points to placeholder Medium)

### Adding Real Images / OG Image

1. Add `og-image.jpg` (1200×630) to `/public`
2. Update metadata in `app/layout.tsx` if needed

### Cloudflare Turnstile (Contact Form)

See the detailed comment block inside `app/about/page.tsx` (the form). 

Quick steps:
1. Create Turnstile site at Cloudflare dashboard
2. Add the script tag to `layout.tsx`
3. Replace the placeholder div with the official widget
4. Verify the token in a Next.js Route Handler (`/api/contact`) before sending email

The current form already works beautifully for development and production demos.

### Social Links

All links are in `components/Footer.tsx` and `components/Navbar.tsx` (if you add more). Update the URLs as needed:
- Linktree, GitHub, X/Twitter, Instagram, LinkedIn all point to `shivankpndy`

### Theme

Dark mode is default and persisted. The toggle is in the top-right of the navbar.

## Design Philosophy

This site avoids flashy colors and trends. It uses:
- Generous whitespace
- Refined typography scale
- Subtle white/gray gradients on headings
- Micro spring animations via Framer Motion
- Consistent rounded-3xl cards and buttons
- Thoughtful hover and active states

The goal is to feel like a quiet, confident personal space — not a marketing site.

## Deployment

Vercel (recommended):
```bash
npx vercel
```

Or any platform that supports Next.js (Netlify, Cloudflare Pages, etc.).

---

Built with care for Shivank Pandey. One person, many crafts.

Update this README as the portfolio evolves.
