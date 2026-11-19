'use client';

import React from 'react';
import {
  Award,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { CertificationData } from '@/types';

interface CertificationsSectionProps {
  certifications?: CertificationData[];
}

export default function CertificationsSection({
  certifications = []
}: CertificationsSectionProps) {
  return (
    <section id="certifications" className="relative py-20 w-full border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-800/40 mb-3">
            Recognitions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mb-3">
            Achievements &{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Certifications.
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Hackathon finalist awards, technical symposium podiums, and professional engineering associations.
          </p>
        </div>

        {/* Certifications Grid — Compact, self-contained cards without links or popups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between transition-colors hover:border-slate-700/80"
            >
              <div>
                {/* Header: Issuer and Date */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400">
                    <Award className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate font-medium">{cert.issuer}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 font-mono flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {cert.title}
                </h3>

                {/* Concise Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {cert.description}
                </p>

                {/* Skill Badges */}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cert.skills.split(',').map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Clean verified status badge without buttons or external links */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs mt-2">
                {cert.credentialId ? (
                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {cert.credentialId}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Credential Verified
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verified Record</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
