import React from 'react';

export default function MusicLab() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-28 text-center">
      <div className="mb-6">
        <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-3">SOUND</div>
        <h1 className="font-serif text-6xl tracking-[-2px] mb-4">Music Lab</h1>
        <p className="max-w-xl mx-auto text-lg text-zinc-400">A quiet place where rhythm sleeps and ideas hum.</p>
      </div>

      <div className="mt-12 rounded-3xl border border-zinc-900/70 bg-gradient-to-b from-zinc-950/60 to-zinc-900/40 p-12">
        <h2 className="font-serif text-2xl text-white mb-4">He was too lazy to model this page.</h2>
        <p className="text-zinc-400 mb-6">Something familiar sits behind the curtains — a half-finished synth, a notebook with a verse torn out, and a coffee cup gone cold. Shivank left a note: <em>"I'll get to it when the beat drops."</em></p>
        <div className="text-xs text-zinc-500">Come back later — or send an encouraging message from the Connect page.</div>
      </div>
    </div>
  );
}
