"use client";

import React, { useState } from 'react';
import { ProjectModal, Project } from '@/components/ProjectModal';
import { ArrowRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Shivank Pandey Portfolio",
    shortDesc: "Personal portfolio website you are looking at, Showcasing my work and projects.",
    longDesc: "",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/shivankpndy/shivankpndy.me",
    live: "https://shivankpndy.me",
    role: "SOLO PROJECT • 2026",
  },

];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      document.body.style.overflow = 'visible';
    }, 200);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-14 max-w-2xl">
        <div className="uppercase tracking-[3px] text-xs text-zinc-500 font-mono mb-4">BUILDING</div>
        <h1 className="font-serif text-6xl tracking-[-2px] mb-4">Projects</h1>
        <p className="text-xl text-zinc-400">Tools and experiments shaped by the disciplines I practice.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => openProject(project)}
            className="card group text-left rounded-3xl p-8 md:p-9 flex flex-col h-full transition-all hover:border-zinc-700 active:scale-[0.985]"
          >
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[2.5px] text-zinc-500 font-mono mb-4">{project.role}</div>
              <h3 className="font-serif text-4xl tracking-[-1px] mb-4 text-white pr-4 group-hover:underline decoration-zinc-700 underline-offset-8">{project.title}</h3>
              <p className="text-zinc-400 text-[15px] leading-relaxed pr-6">{project.shortDesc}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between text-sm">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="rounded-full bg-zinc-900 px-3 py-px text-xs text-zinc-500">{t}</span>
                ))}
                {project.tech.length > 3 && <span className="text-xs text-zinc-600 px-1">+{project.tech.length - 3}</span>}
              </div>
              <div className="text-zinc-500 group-hover:text-white flex items-center gap-1 transition-colors">
                View details <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}
