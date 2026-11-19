'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileDown,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { SiteSettingsData, ProfileData } from '@/types';

interface HeroSectionProps {
  settings?: SiteSettingsData | null;
  profile?: ProfileData | null;
}

export default function HeroSection({ settings, profile }: HeroSectionProps) {
  const name = profile?.fullName || 'Bhumi Prasad';
  const resumeUrl = profile?.resumeUrl || '/resume.pdf';

  const coreTags = [
    'Java 21',
    'Spring Boot',
    'PostgreSQL',
    'ASP.NET Core',
    'Next.js 14',
    'Machine Learning',
    'REST APIs',
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] w-full flex items-center justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Subtle modern ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(167,139,250,0.12),rgba(139,92,246,0.06),transparent_70%)] pointer-events-none -z-10" />

      {/* Very faint architectural dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none -z-20"
        style={{
          backgroundImage: `radial-gradient(rgba(196, 181, 253, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center text-center">
        {/* Organization Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-violet-500/30 backdrop-blur-md mb-8 hover:border-violet-400/50 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
          </span>
          <span className="text-xs font-medium text-slate-300">
            {profile?.currentStatus || 'National Informatics Centre (NIC) Intern • Open to Opportunities'}
          </span>
        </motion.div>

        {/* Developer Title Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-2 mb-4"
        >
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-md bg-violet-950/50 border border-violet-500/30">
            {name} • Software Engineer
          </span>
        </motion.div>

        {/* Main Clean Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-4xl"
        >
          Building Intelligent Systems.{' '}
          <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Engineering Digital Experiences.
          </span>
        </motion.h1>

        {/* Subtitle / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8"
        >
          Specializing in scalable backend architectures with <span className="text-white font-medium">Spring Boot</span> and <span className="text-white font-medium">PostgreSQL</span>, resilient RESTful microservices, and practical AI integrations.
        </motion.p>

        {/* Core Stack Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl"
        >
          {coreTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg bg-slate-900/80 border border-violet-500/20 text-xs font-mono text-slate-300 hover:border-violet-400/50 hover:text-violet-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-violet-500/25"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 hover:border-violet-500/50 transition-all transform hover:-translate-y-0.5"
          >
            <FileDown className="w-4 h-4 text-violet-300" />
            <span>Download Resume</span>
          </a>

          <Link
            href="#contact"
            className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl text-slate-400 hover:text-violet-300 text-sm font-medium transition-colors"
          >
            <span>Contact</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Clean Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full"
        >
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-violet-500/20 text-left">
            <span className="block text-2xl sm:text-3xl font-bold text-violet-300 font-mono">
              9.7
            </span>
            <span className="text-xs text-slate-400 font-medium">
              B.Tech YGPA (Top 1%)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-violet-500/20 text-left">
            <span className="block text-2xl sm:text-3xl font-bold text-white font-mono">
              1+ Yr
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Production Internships
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-violet-500/20 text-left">
            <span className="block text-2xl sm:text-3xl font-bold text-purple-300 font-mono">
              6+
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Production Projects
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-violet-500/20 text-left">
            <span className="block text-2xl sm:text-3xl font-bold text-amber-300 font-mono">
              96.2%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Class 12th ISC Score
            </span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
        <span>Scroll to explore</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-violet-400" />
      </div>
    </section>
  );
}
