'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Github, Linkedin, Code, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-violet-500/20 bg-slate-950/80 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-violet-500/10">
          {/* Logo & Info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-950/60 border border-violet-500/30 shadow-sm">
              <span className="font-mono font-bold text-sm bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                BP
              </span>
            </div>
            <div>
              <span className="font-bold text-sm text-white">Bhumi Prasad</span>
              <p className="text-[11px] font-mono text-violet-300/70">Software Engineer & Systems Architect</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/bhumiprasad14"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-violet-500/20 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/bhumiprasad"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-violet-500/20 text-slate-400 hover:text-violet-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/bhumiprasad14"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-violet-500/20 text-slate-400 hover:text-amber-400 transition-colors"
              aria-label="LeetCode"
            >
              <Code className="w-4 h-4" />
            </a>
            <a
              href="mailto:prasad14bhumi@gmail.com"
              className="p-2 rounded-lg bg-slate-900 border border-violet-500/20 text-slate-400 hover:text-violet-300 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-violet-300 transition-colors"
          >
            <span>Back to Top</span>
            <div className="w-7 h-7 rounded-lg bg-violet-950/60 border border-violet-500/30 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5 text-violet-300" />
            </div>
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Bhumi Prasad. Engineered with precision.</p>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="flex items-center space-x-1.5 text-slate-500 hover:text-violet-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>Admin Authentication</span>
            </Link>
            <span>•</span>
            <span className="text-violet-300/80">Next.js 14 • Spring Boot • PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
