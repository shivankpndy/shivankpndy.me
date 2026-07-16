"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { ArrowRight, PenTool, Code2, Gamepad2, ExternalLink, Sword } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import ScrollFrameSequence from '@/components/ScrollFrameSequence';
import Reveal from '@/components/Reveal';

const crafts = [
  {
    title: "Writing",
    description: "Essays and dispatches from the intersection of discipline and creativity.",
    href: "/writing",
    icon: PenTool,
  },
  {
    title: "Projects",
    description: "Digital tools and experiments built with intention and craft.",
    href: "/projects",
    icon: Code2,
  },
  {
    title: "Boxing",
    description: "Amateur boxer focused on technique, strategy, and the mental game inside and outside the ring.",
    href: "#",
    icon: Sword,
  },
];

function splitLetters(word: string, keyPrefix: string) {
  return word.split('').map((char, i) => (
    <span
      key={`${keyPrefix}-${i}`}
      className="hero-letter inline-block"
      style={{ opacity: 0 }}
    >
      {char}
    </span>
  ));
}

export default function Home() {
  useEffect(() => {
    animate('.hero-letter', {
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [70, 0],
      delay: stagger(28),
      duration: 900,
      ease: 'outExpo',
    });
  }, []);

  const heroOverlay = (
    <div className="mx-auto max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 inline-flex items-center rounded-full border border-zinc-700 px-4 py-1 text-xs tracking-[3px] text-zinc-300 font-mono">
          DELHI / INDIA
        </div>

        <h1
          className="font-serif text-[72px] md:text-[92px] leading-[0.92] tracking-[-3.2px] text-white mb-6"
          style={{ perspective: 800 }}
        >
          {splitLetters('Shivank', 'first')}
          <br />
          {splitLetters('Pandey', 'last')}
        </h1>

        <p className="max-w-[620px] mx-auto text-2xl md:text-3xl tracking-[-0.4px] text-zinc-200 mb-10 font-light">
          A place for the things I&apos;m building.<br />
          Projects, writing, and notes from the journey.<br />
          <span className="text-zinc-400">
            Alongside the life that shapes them.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#crafts"
            className="btn btn-primary px-8 py-3 text-base group"
          >
            Explore my crafts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/about" className="btn px-8 py-3 text-base border-zinc-600 text-white hover:bg-white/10">
            About me
          </Link>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      {/* Hero + Craft Morph Scroll Sequence */}
      <section className="relative -mt-20">
        <ScrollFrameSequence
          frameCount={181}
          basePath="/frames/crafts-morph"
          scrollLength={3}
          fullBleed
          overlay={heroOverlay}
          overlayFadeRange={[0.05, 0.35]}
        />
      </section>

      {/* Crafts Section */}
      <section id="crafts" className="mx-auto max-w-7xl px-6 pb-20 pt-20">
        <Reveal className="mb-12 flex items-end justify-between">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">DISCIPLINES</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Crafts</h2>
          </div>
          <p className="hidden md:block max-w-xs text-right text-sm text-zinc-500">
            Four distinct practices. One integrated life.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crafts.map((craft, index) => {
            const Icon = craft.icon;
            return (
              <Reveal key={index} delay={index * 0.08}>
                <Link href={craft.href} className="group">
                  <TiltCard className="card h-full rounded-3xl p-8 flex flex-col border border-transparent hover:border-zinc-800">
                    <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-serif text-3xl tracking-[-0.8px] mb-4 text-white">{craft.title}</h3>
                    <p className="text-zinc-400 text-[15px] leading-relaxed flex-1">{craft.description}</p>

                    <div className="mt-8 flex items-center text-sm text-zinc-500 group-hover:text-white transition-colors">
                      Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Latest Work Section */}
      <section className="border-t border-zinc-900 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-10">
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">RECENT WORK</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Latest</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Latest Essay */}
            <Reveal>
              <Link href="/writing" className="group">
                <TiltCard className="card h-full rounded-3xl p-8 flex flex-col">
                  <div className="text-xs uppercase tracking-[2px] text-zinc-500 font-mono mb-4">ESSAY</div>
                  <h3 className="font-serif text-3xl tracking-[-0.6px] mb-4 text-white group-hover:underline decoration-zinc-700 underline-offset-4">
                    A Forgotten 1787 Society Reveals the True Beginnings of US Democracy
                  </h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed flex-1 mb-6">
                   The hidden roots of American democracy trace back to an obscure society of the late 18th century.
                  </p>
                  <div className="flex items-center text-sm text-zinc-500 group-hover:text-white transition-colors">
                    Read Essay <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </TiltCard>
              </Link>
            </Reveal>

            {/* Latest Project */}
            <Reveal delay={0.08}>
              <Link href="/projects" className="group">
                <TiltCard className="card h-full rounded-3xl p-8 flex flex-col">
                  <div className="text-xs uppercase tracking-[2px] text-zinc-500 font-mono mb-4">PROJECT</div>
                  <h3 className="font-serif text-3xl tracking-[-0.6px] mb-4 text-white group-hover:underline decoration-zinc-700 underline-offset-4">
                    Shivank Pandey Portfolio
                  </h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed flex-1 mb-6">
                    Personal portfolio website you are looking at, Showcasing my work and projects.
                  </p>
                  <div className="flex items-center text-sm text-zinc-500 group-hover:text-white transition-colors">
                    View Project <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Aixor Studio Section */}
      <section className="border-t border-zinc-900 py-16 bg-zinc-950/50">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="mb-8">
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">STUDIO</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Aixor Studio</h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-3xl">
            <p className="text-[17px] leading-relaxed text-zinc-300 mb-6">
              Aixor Studio is my personal creative studio. I work with clients on thoughtful writing, strategic copywriting,
              web development, and building AI agents. I approach every project with care, clarity, and an emphasis on
              creating work that feels intentional rather than rushed.
            </p>

            <p className="text-[17px] leading-relaxed text-zinc-300 mb-8">
              I&apos;m currently expanding into AI agent development while deepening my skills in code and systems thinking.
            </p>

            <a
              href="https://aixor.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 transition-colors group"
            >
              Visit Aixor Studio
              <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="border-t border-zinc-900 py-16">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-lg text-zinc-400 tracking-[-0.2px]">
            I move between the ring, the page, the terminal, and the studio — searching for rhythm in each.
          </p>
        </Reveal>
      </section>
    </div>
  );
}