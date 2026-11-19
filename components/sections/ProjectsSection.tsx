'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Star
} from 'lucide-react';
import { ProjectData } from '@/types';

interface ProjectsSectionProps {
  projects?: ProjectData[];
}

const categories = [
  'All',
  'AI / GenAI',
  'Full Stack',
  'Machine Learning',
  'Backend',
];

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative py-24 w-full border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 mb-3">
            Featured Systems
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mb-3">
            Projects &{' '}
            <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Case Studies.
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Real-world software engineering solutions built with Spring Boot, PostgreSQL, Next.js, and Google Gemini API.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-10 gap-1.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-violet-950/90 text-violet-100 border border-violet-400/40 font-semibold shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-colors flex flex-col justify-between overflow-hidden group shadow-sm"
            >
              {/* Image banner */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-800">
                <Image
                  src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm border border-violet-500/30 text-[10px] font-mono text-violet-300">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-mono">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span
                        key={tech.id || tech.name}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 group-hover:border-violet-500/20"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {(project.technologies?.length || 0) > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-500">
                        +{(project.technologies?.length || 0) - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-violet-300 hover:text-white transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center space-x-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        aria-label="View source on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-violet-300 transition-colors"
                        aria-label="View live deployment"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
