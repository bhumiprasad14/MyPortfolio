'use client';

import React from 'react';
import {
  Server,
  Database,
  Cpu,
  Layout,
  MapPin,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';
import { ProfileData } from '@/types';

interface AboutSectionProps {
  profile?: ProfileData | null;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const name = profile?.fullName || 'Bhumi Prasad';
  const location = profile?.location || 'Kolkata, West Bengal, India';

  const capabilities = [
    {
      icon: Server,
      title: 'Backend Engineering',
      desc: 'Robust RESTful APIs, Spring Boot microservices, and ASP.NET Core with secure JWT authentication.',
    },
    {
      icon: Database,
      title: 'Database Architecture',
      desc: 'Normalized schema modeling, indexing strategies, and high-integrity storage with PostgreSQL.',
    },
    {
      icon: Cpu,
      title: 'AI & LLM Integration',
      desc: 'Practical integration of Google Gemini API, RAG pipelines, and deep learning vision models.',
    },
    {
      icon: Layout,
      title: 'Full Stack Frontend',
      desc: 'Performant, accessible web interfaces crafted with Next.js 14, React, Angular, and Tailwind CSS.',
    },
  ];

  return (
    <section id="about" className="relative py-24 w-full border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
            Turning Complex Problems Into{' '}
            <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Scalable Solutions.
            </span>
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card & Academic Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-violet-500/20 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{name}</h3>
                <p className="text-sm text-violet-300 font-medium mt-1">
                  {profile?.title || 'Software Engineer & Full Stack Backend Architect'}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 flex items-center space-x-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span>{location}</span>
                </p>
              </div>

              {/* Clean Highlight Badges */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
                    <GraduationCap className="w-4 h-4 text-violet-400" />
                    <span>B.Tech Computer Science</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono">
                    9.7 YGPA
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span>Production Experience</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    NIC & ARMB
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Class 12th (ISC)</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">
                    96.2%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clear, Focused Narrative & 4 Clean Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3.5">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Engineering with Rigor & High Standards
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I am a Full Stack Software Engineer focused on architecting resilient backend microservices, high-integrity database systems, and responsive modern web applications.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Currently contributing to production administrative systems at the <strong className="text-white font-medium">National Informatics Centre (NIC)</strong> with ASP.NET Core and PostgreSQL, alongside prior experience building university ERP modules at <strong className="text-white font-medium">ARMB</strong> using Java and Spring Boot.
              </p>
            </div>

            {/* 4 Clean Pillars with legible typography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {capabilities.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-violet-500/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
