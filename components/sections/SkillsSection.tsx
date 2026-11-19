'use client';

import React, { useState } from 'react';
import {
  Code,
  Database,
  Cpu,
  Wrench,
  Sparkles,
  Server,
  Atom
} from 'lucide-react';
import { SkillCategoryData, SkillItem } from '@/types';

interface SkillsSectionProps {
  categories?: SkillCategoryData[];
}

export default function SkillsSection({ categories = [] }: SkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Disciplines', icon: Sparkles },
    { id: 'languages', label: 'Languages', icon: Code },
    { id: 'backend', label: 'Backend Development', icon: Server },
    { id: 'frontend', label: 'Frontend & UI', icon: Atom },
    { id: 'database', label: 'Database & Storage', icon: Database },
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: Cpu },
    { id: 'tools', label: 'DevOps & Tools', icon: Wrench },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (activeTab === 'all') return true;
    return cat.slug.toLowerCase().includes(activeTab.toLowerCase()) ||
           cat.name.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <section id="skills" className="relative py-24 w-full border-t border-slate-900 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-mono font-semibold tracking-wider text-violet-300 uppercase px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 mb-3">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl mb-3">
            Skills &{' '}
            <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Core Competencies.
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            A comprehensive overview of production-tested frameworks, database systems, and software engineering tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-10 gap-1.5 no-scrollbar">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-white bg-violet-950/80 border border-violet-400/40 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-violet-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards grouped by category */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-slate-900/50 border border-violet-500/20"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span>{cat.name}</span>
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                  )}
                </div>
                <span className="text-[11px] font-mono text-violet-300 px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30">
                  {cat.skills.length} Techs
                </span>
              </div>

              {/* Grid of clean skill pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                {cat.skills.map((skill: SkillItem) => (
                  <div
                    key={skill.id}
                    className={`p-3 rounded-xl border transition-colors flex flex-col justify-between ${
                      skill.isHighlighted
                        ? 'bg-slate-900 border-violet-500/40 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-violet-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold tracking-tight text-white">
                        {skill.name}
                      </span>
                      {skill.isHighlighted && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" title="Key Highlight" />
                      )}
                    </div>
                    {skill.proficiency && (
                      <span className="text-[10px] font-mono text-slate-400 truncate">
                        {skill.proficiency}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
