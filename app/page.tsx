"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Code2, Music, Gamepad2, ExternalLink, Sword } from 'lucide-react';

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
    title: "Records",
    description: "Original music, compositions, and explorations in sound.",
    href: "/records",
    icon: Music,
  },
  {
    title: "Boxing",
    description: "Amateur boxer focused on technique, strategy, and the mental game inside and outside the ring.",
    href: "#",
    icon: Sword,
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)]">
      {/* Hero Section */}
      <section className="relative flex min-h-[92vh] items-center justify-center px-6 pt-12 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 px-4 py-1 text-xs tracking-[3px] text-zinc-500 font-mono">
              DELHI / INDIA
            </div>

            <h1 className="font-serif text-[72px] md:text-[92px] leading-[0.92] tracking-[-3.2px] text-white mb-6">
              Shivank<br />Pandey
            </h1>

            <p className="max-w-[620px] mx-auto text-2xl md:text-3xl tracking-[-0.4px] text-zinc-400 mb-10 font-light">
              A place for the things I&apos;m building.<br />
              Projects, writing, and notes from the journey.<br />
              <span className="text-zinc-500">
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
              <Link href="/about" className="btn px-8 py-3 text-base">
                About me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Crafts Section */}
      <section id="crafts" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">DISCIPLINES</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Crafts</h2>
          </div>
          <p className="hidden md:block max-w-xs text-right text-sm text-zinc-500">
            Four distinct practices. One integrated life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {crafts.map((craft, index) => {
            const Icon = craft.icon;
            return (
              <Link href={craft.href} key={index} className="group">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="card h-full rounded-3xl p-8 flex flex-col border border-transparent hover:border-zinc-800"
                >
                  <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-serif text-3xl tracking-[-0.8px] mb-4 text-white">{craft.title}</h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed flex-1">{craft.description}</p>

                  <div className="mt-8 flex items-center text-sm text-zinc-500 group-hover:text-white transition-colors">
                    Explore <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest Work Section */}
      <section className="border-t border-zinc-900 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">RECENT WORK</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Latest</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Latest Essay */}
            <Link href="/writing" className="group">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card h-full rounded-3xl p-8 flex flex-col"
              >
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
              </motion.div>
            </Link>

            {/* Latest Project */}
            <Link href="/projects" className="group">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card h-full rounded-3xl p-8 flex flex-col"
              >
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
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Aixor Studio Section */}
      <section className="border-t border-zinc-900 py-16 bg-zinc-950/50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8">
            <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">STUDIO</div>
            <h2 className="font-serif text-5xl tracking-[-1.6px]">Aixor Studio</h2>
          </div>

          <div className="max-w-3xl">
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
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="border-t border-zinc-900 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-lg text-zinc-400 tracking-[-0.2px]">
            I move between the ring, the page, the terminal, and the studio — searching for rhythm in each.
          </p>
        </div>
      </section>
    </div>
  );
}