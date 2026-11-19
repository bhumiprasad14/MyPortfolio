'use client';

import React from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ProfileData, SiteSettingsData } from '@/types';

interface ResumeSectionProps {
  profile?: ProfileData | null;
  settings?: SiteSettingsData | null;
}

export default function ResumeSection({ profile, settings }: ResumeSectionProps) {
  const resumeUrl = profile?.resumeUrl || settings?.resumePdfUrl || '/resume.pdf';

  return (
    <section id="resume" className="relative py-20 w-full border-t border-slate-900 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-violet-500/20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Resume Highlights */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30">
                Curriculum Vitae
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Blueprint &{' '}
                <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                  Verified Resume.
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Review verified production internships at the National Informatics Centre (NIC) and ARMB, university academic excellence (9.7 YGPA), and production proficiencies in Java, Spring Boot, PostgreSQL, and Next.js.
              </p>

              {/* Fast verification checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span>National Informatics Centre (NIC) Intern</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span>MCKV Institute (9.7 YGPA CSE)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span>Spring Boot & ASP.NET Core APIs</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                  <span>HexaFalls Hackathon & IEEE Member</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={resumeUrl}
                  download="Bhumi_Prasad_Resume.pdf"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-violet-500/20 transform hover:-translate-y-0.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume PDF</span>
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 hover:border-violet-500/30 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-violet-300" />
                  <span>Preview in Browser</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Document Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative p-6 rounded-2xl bg-slate-950/80 border border-violet-500/20 text-slate-400 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-mono font-medium text-white">
                      Bhumi_Prasad_Resume.pdf
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-violet-300 px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30">
                    Latest Version
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-500">Degree:</span>
                    <span className="text-slate-200">B.Tech CSE (9.7 YGPA)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-500">Primary Stack:</span>
                    <span className="text-slate-200">Java, Spring Boot, PostgreSQL</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-500">Current Role:</span>
                    <span className="text-violet-300 font-medium">NIC Full Stack Intern</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-500">Total Highlights:</span>
                    <span className="text-slate-200">2 Internships, 3 Awards, 6 Projects</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Format: Verified PDF</span>
                  <span className="text-violet-300">Updated: Nov 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
