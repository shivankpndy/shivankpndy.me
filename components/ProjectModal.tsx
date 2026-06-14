"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  github: string;
  live?: string;
  role: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            onClick={e => e.stopPropagation()}
            className="modal w-full max-w-3xl overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-900 px-8 py-5">
              <div>
                <div className="text-xs uppercase tracking-[3px] text-zinc-500 font-mono">{project.role}</div>
                <h3 className="font-serif text-4xl tracking-[-1px] text-white pr-8">{project.title}</h3>
              </div>
              <button 
                onClick={onClose} 
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="project-modal-content p-8 md:p-10 space-y-8 text-[15px] leading-relaxed text-zinc-300">
              <div>
                <h4 className="font-mono uppercase tracking-widest text-xs text-zinc-500 mb-3">OVERVIEW</h4>
                <p>{project.longDesc}</p>
              </div>

              <div>
                <h4 className="font-mono uppercase tracking-widest text-xs text-zinc-500 mb-4">TECHNOLOGY</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 border-t border-zinc-900">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
