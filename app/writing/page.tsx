import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface WritingPiece {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  mediumUrl: string;
}

const pieces: WritingPiece[] = [
  {
    slug: "a-forgotten-1787-society-reveals-the-true-beginnings-of-us-democracy",
    title: "A Forgotten 1787 Society Reveals the True Beginnings of US Democracy",
    excerpt: "The hidden roots of American democracy trace back to an obscure society of the late 18th century.",
    date: "Jun 9, 2026",
    readTime: "10 min",
    category: "Essay",
    mediumUrl: "https://nonprofitquarterly.org/a-forgotten-1787-society-reveals-the-true-beginnings-of-us-democracy/",
  },
  {
    slug: "a-crushed-1891-strike-by-black-farmer-cooperatives-holds-keys-to-economic-justice-today",
    title: "A Crushed 1891 Strike by Black Farmer Cooperatives Holds Keys to Economic Justice Today",
    excerpt: "The untold story of a pivotal moment in American labor history and its relevance to contemporary struggles.",
    date: "Jul 16, 2026",
    readTime: "12 min",
    category: "Essay",
    mediumUrl: "https://nonprofitquarterly.org/a-crushed-1891-strike-by-black-farmer-cooperatives-holds-keys-to-economic-justice-today/",
  },

];

export default function Writing() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal className="mb-14">
        <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-4">WORDS</div>
        <h1 className="font-serif text-6xl tracking-[-2px] mb-4">Writing</h1>
        <p className="max-w-lg text-xl text-zinc-400">Essays, dispatches, and observations written between rounds.</p>
      </Reveal>

      <div className="space-y-4">
        {pieces.map((piece, index) => (
          <Reveal key={index} delay={index * 0.08}>
            <a
              href={piece.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12 hover:border-zinc-700 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-block rounded-full bg-zinc-900 px-3 py-0.5 text-xs tracking-widest text-zinc-400 font-mono">{piece.category}</span>
                    <span className="text-xs text-zinc-500">{piece.date} · {piece.readTime}</span>
                  </div>

                  <h3 className="font-serif text-3xl tracking-[-0.6px] text-white mb-4 group-hover:underline decoration-zinc-700 underline-offset-4">{piece.title}</h3>

                  <p className="text-zinc-400 leading-relaxed pr-4">{piece.excerpt}</p>
                </div>

                <div className="flex-shrink-0 self-start md:self-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-5 py-2 text-sm text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                    Read
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a 
          href="https://medium.com/@shivankpndy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
        >
          View all writing on Medium <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
        </a>
        <p className="mt-3 text-[10px] text-zinc-600">All pieces are published on Medium • Update links as new work appears</p>
      </div>
    </div>
  );
}
