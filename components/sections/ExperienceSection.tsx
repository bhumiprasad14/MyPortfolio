'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building2,
  MapPin,
  Award,
  Sparkles,
  CheckCircle2,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { ExperienceData, EducationData } from '@/types';

interface ExperienceSectionProps {
  experiences?: ExperienceData[];
  educations?: EducationData[];
}

type FilterType = 'all' | 'experience' | 'education';

export default function ExperienceSection({
  experiences = [],
  educations = []
}: ExperienceSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progression for the timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 80%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Normalize and combine milestones for timeline view
  const formattedExperiences = experiences.map((exp, idx) => {
    let responsibilitiesArray: string[] = [];
    try {
      responsibilitiesArray = JSON.parse(exp.responsibilities);
    } catch {
      responsibilitiesArray = exp.responsibilities ? [exp.responsibilities] : [];
    }

    const techArray = exp.technologies
      ? exp.technologies.split(',').map((t) => t.trim())
      : [];

    // Extract year for the faded typography
    const yearMatch = exp.startDate?.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : '2026';

    return {
      id: `exp-${exp.id || idx}`,
      type: 'experience' as const,
      categoryLabel: 'ENTERPRISE PRODUCTION',
      badge: exp.type || 'Internship',
      title: exp.position,
      organization: exp.company,
      location: exp.location,
      duration: `${exp.startDate} — ${exp.isCurrent ? 'Present' : exp.endDate}`,
      year,
      isCurrent: exp.isCurrent,
      description: exp.description,
      bulletPoints: responsibilitiesArray,
      technologies: techArray,
      achievement: exp.isCurrent
        ? 'Active Production Role • Mission-Critical DA System'
        : 'Enterprise High-Throughput Student Records & Transaction Procedures',
      originalOrder: exp.order || idx,
    };
  });

  const formattedEducations = educations.map((edu, idx) => {
    let achievementsArray: string[] = [];
    try {
      achievementsArray = edu.achievements ? JSON.parse(edu.achievements) : [];
    } catch {
      achievementsArray = edu.achievements ? [edu.achievements] : [];
    }

    const yearMatch = edu.endYear?.match(/\d{4}/) || edu.startYear?.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : '2027';

    return {
      id: `edu-${edu.id || idx}`,
      type: 'education' as const,
      categoryLabel: 'ACADEMIC EXCELLENCE',
      badge: edu.score || 'Honors',
      title: edu.degree,
      organization: edu.institution,
      location: edu.specialization,
      duration: `${edu.startYear} — ${edu.isCurrent ? 'Present' : edu.endYear}`,
      year,
      isCurrent: edu.isCurrent,
      description: `Comprehensive academic curriculum with deep focus on engineering rigor, high-percentile results, and foundational computer systems.`,
      bulletPoints: achievementsArray,
      technologies:
        idx === 0
          ? ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'OOP']
          : ['Mathematics', 'Computer Science', 'Physics', 'Problem Solving'],
      achievement: edu.score ? `Academic Score: ${edu.score}` : 'Top Percentile Distinction',
      originalOrder: 10 + (edu.order || idx),
    };
  });

  // Filter items according to active tab
  const allMilestones = [
    ...formattedExperiences,
    ...formattedEducations,
  ].sort((a, b) => a.originalOrder - b.originalOrder);

  const displayedMilestones =
    activeFilter === 'all'
      ? allMilestones
      : activeFilter === 'experience'
      ? formattedExperiences
      : formattedEducations;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-28 sm:py-36 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #10131B 0%, #191D29 50%, #11141D 100%)',
      }}
    >
      {/* 1. Subtle Purple & Muted Gold Ambient Lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 rounded-full bg-amber-500/[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-purple-600/[0.07] blur-[100px] pointer-events-none" />

      {/* 2. Very Faint Architectural Grid & Fine Dotted Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(rgba(167, 139, 250, 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(167, 139, 250, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(167, 139, 250, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 3. Subtle Purple Light Beams (Vertical guide accents) */}
      <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-violet-500/[0.08] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-purple-500/[0.06] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header — Editorial Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-16 sm:mb-20"
        >
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-400/20 mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-violet-200">
              Career Trajectory & Milestones
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-[1.15]">
            Engineering Experience &{' '}
            <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-amber-200 bg-clip-text text-transparent">
              Academic Milestones.
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            A chronological timeline of production contributions at government institutes,
            enterprise software architectures, and exceptional academic percentile achievements.
          </p>

          {/* Filter Pills with Editorial Styling */}
          <div className="mt-8 inline-flex p-1 rounded-xl bg-[#141724] border border-violet-400/20 shadow-inner">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-violet-950/90 text-violet-100 border border-violet-400/30 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Milestones ({allMilestones.length})
            </button>
            <button
              onClick={() => setActiveFilter('experience')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeFilter === 'experience'
                  ? 'bg-violet-950/90 text-violet-100 border border-violet-400/30 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3 h-3 text-violet-400" />
              Work Experience ({formattedExperiences.length})
            </button>
            <button
              onClick={() => setActiveFilter('education')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeFilter === 'education'
                  ? 'bg-violet-950/90 text-violet-100 border border-violet-400/30 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              Academics ({formattedEducations.length})
            </button>
          </div>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Vertical Lavender Timeline Spine */}
          {/* Desktop offset spine at center (50%) or left-offset (42%) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-[2px] bg-violet-400/15 pointer-events-none">
            {/* Scroll progression active line */}
            <motion.div
              style={{ scaleY }}
              className="origin-top w-full h-full bg-gradient-to-b from-violet-400 via-purple-300 to-amber-300/80 shadow-[0_0_12px_rgba(167,139,250,0.5)]"
            />
          </div>

          {/* Mobile & Tablet spine aligned towards left */}
          <div className="lg:hidden absolute left-5 sm:left-7 top-4 bottom-12 w-[2px] bg-violet-400/15 pointer-events-none">
            <motion.div
              style={{ scaleY }}
              className="origin-top w-full h-full bg-gradient-to-b from-violet-400 via-purple-300 to-amber-300/80 shadow-[0_0_12px_rgba(167,139,250,0.5)]"
            />
          </div>

          {/* Milestone Items List */}
          <div className="space-y-12 sm:space-y-16">
            {displayedMilestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col lg:flex-row items-stretch lg:items-center"
                >
                  {/* Glowing Violet Milestone Indicator Node */}
                  {/* Desktop Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#1B2030] border-2 border-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.6)] flex items-center justify-center">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.isCurrent ? 'bg-amber-400' : 'bg-violet-300'
                          }`}
                        />
                      </div>
                      {item.isCurrent && (
                        <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>

                  {/* Mobile/Tablet Left Node */}
                  <div className="lg:hidden absolute left-5 sm:left-7 top-8 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#1B2030] border-2 border-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)] flex items-center justify-center">
                      <div
                        className={`w-1 h-1 rounded-full ${
                          item.isCurrent ? 'bg-amber-400' : 'bg-violet-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* DESKTOP ALTERNATING LAYOUT */}
                  {/* Left Column on Desktop */}
                  <div
                    className={`w-full lg:w-1/2 ${
                      isEven
                        ? 'lg:pr-14 lg:text-right order-2 lg:order-1'
                        : 'lg:pr-14 order-2 lg:order-1'
                    }`}
                  >
                    {isEven ? (
                      /* Editorial Metadata & Oversized Year Typography on the Left */
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:flex flex-col items-end pr-2"
                      >
                        {/* Section Micro Index */}
                        <div className="flex items-center gap-2 font-mono text-[11px] text-violet-300/70 tracking-widest uppercase mb-1">
                          <span>{`0${index + 1} // ${item.categoryLabel}`}</span>
                          <span className="w-2 h-2 rounded-sm bg-violet-400/40" />
                        </div>

                        {/* Oversized Faded Year Typography */}
                        <div className="text-7xl xl:text-8xl font-mono font-black text-violet-300/10 tracking-tighter select-none leading-none mb-2">
                          {item.year}
                        </div>

                        {/* Duration Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-400/20 text-xs font-mono text-violet-200 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-violet-400" />
                          <span>{item.duration}</span>
                        </div>

                        {/* Organization / Status highlight */}
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                          {item.isCurrent && (
                            <span className="inline-flex items-center gap-1 text-amber-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              Active Production
                            </span>
                          )}
                          <span>•</span>
                          <span>{item.organization}</span>
                        </div>
                      </motion.div>
                    ) : (
                      /* Card Placed on Left for Odd Items */
                      <div className="pl-12 sm:pl-16 lg:pl-0">
                        <ExperienceCard item={item} index={index} align="left" />
                      </div>
                    )}
                  </div>

                  {/* Right Column on Desktop */}
                  <div
                    className={`w-full lg:w-1/2 ${
                      isEven
                        ? 'lg:pl-14 order-1 lg:order-2 pl-12 sm:pl-16'
                        : 'lg:pl-14 lg:text-left order-1 lg:order-2'
                    }`}
                  >
                    {isEven ? (
                      /* Card Placed on Right for Even Items */
                      <ExperienceCard item={item} index={index} align="right" />
                    ) : (
                      /* Editorial Metadata & Oversized Year Typography on the Right */
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden lg:flex flex-col items-start pl-2"
                      >
                        {/* Section Micro Index */}
                        <div className="flex items-center gap-2 font-mono text-[11px] text-violet-300/70 tracking-widest uppercase mb-1">
                          <span className="w-2 h-2 rounded-sm bg-violet-400/40" />
                          <span>{`0${index + 1} // ${item.categoryLabel}`}</span>
                        </div>

                        {/* Oversized Faded Year Typography */}
                        <div className="text-7xl xl:text-8xl font-mono font-black text-violet-300/10 tracking-tighter select-none leading-none mb-2">
                          {item.year}
                        </div>

                        {/* Duration Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-400/20 text-xs font-mono text-violet-200 mb-2">
                          <Calendar className="w-3.5 h-3.5 text-violet-400" />
                          <span>{item.duration}</span>
                        </div>

                        {/* Organization / Status highlight */}
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                          <span>{item.organization}</span>
                          {item.isCurrent && (
                            <>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1 text-amber-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Active Standing
                              </span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Subcomponent: Experience & Milestone Card
interface CardProps {
  item: {
    id: string;
    type: 'experience' | 'education';
    categoryLabel: string;
    badge: string;
    title: string;
    organization: string;
    location?: string | null;
    duration: string;
    year: string;
    isCurrent: boolean;
    description: string;
    bulletPoints: string[];
    technologies: string[];
    achievement: string;
  };
  index: number;
  align: 'left' | 'right';
}

function ExperienceCard({ item, index, align }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative rounded-[16px] p-6 sm:p-8 overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: '#1B2030',
        border: '1px solid rgba(167, 139, 250, 0.18)',
        boxShadow:
          '0 12px 36px -10px rgba(139, 92, 246, 0.12), 0 0 0 1px rgba(167, 139, 250, 0.06)',
      }}
    >
      {/* Soft Radial Ambient Gradient behind card surface */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-violet-600/[0.08] blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-amber-500/[0.04] blur-2xl pointer-events-none" />

      {/* Oversized Faded Year Behind Card Content (Always visible watermark) */}
      <div className="absolute right-5 top-3 text-6xl sm:text-7xl font-mono font-black text-violet-300/[0.05] pointer-events-none select-none tracking-tighter">
        {item.year}
      </div>

      {/* Small Geometric Decorative Crosshair */}
      <div className="absolute top-3 left-3 text-violet-400/20 text-xs font-mono pointer-events-none">
        +
      </div>
      <div className="absolute bottom-3 right-3 text-violet-400/20 text-xs font-mono pointer-events-none">
        +
      </div>

      {/* Small Lavender Accent Line */}
      <div className="h-[2px] w-12 bg-gradient-to-r from-violet-400 via-purple-300 to-amber-300/60 rounded-full mb-4" />

      {/* Header Row: Badge & Mobile Duration */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {item.type === 'experience' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-950/60 border border-violet-400/25 text-violet-200 text-xs font-mono font-medium">
              <Briefcase className="w-3 h-3 text-violet-300" />
              {item.badge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-mono font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              {item.badge}
            </span>
          )}

          {item.isCurrent && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-950/30 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Mobile Duration (visible on < lg screens) */}
        <div className="lg:hidden flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Calendar className="w-3 h-3 text-violet-400" />
          <span>{item.duration}</span>
        </div>
      </div>

      {/* Job Designation / Degree Title */}
      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
        {item.title}
      </h3>

      {/* Company Name & Location */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-violet-300 mb-3">
        <Building2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
        <span className="text-white/95 font-semibold">{item.organization}</span>
        {item.location && (
          <>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              {item.location}
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Key Responsibilities / Key Highlights */}
      {item.bulletPoints.length > 0 && (
        <div className="space-y-2 mb-4">
          <div className="text-[11px] font-mono tracking-wider text-violet-300/80 uppercase">
            {item.type === 'experience' ? 'Key Responsibilities & Impact:' : 'Academic Highlights:'}
          </div>
          <ul className="space-y-2">
            {item.bulletPoints.map((point, pIdx) => (
              <li
                key={pIdx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed"
              >
                <span className="text-violet-400 mt-1 flex-shrink-0 text-[10px]">◆</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies Used (Animated tags with subtle violet border & smooth hover) */}
      {item.technologies.length > 0 && (
        <div className="pt-3 border-t border-violet-500/15">
          <div className="text-[10px] font-mono text-violet-300/70 uppercase tracking-widest mb-2">
            Technologies & Tools
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.technologies.map((tech, tIdx) => (
              <motion.span
                key={tIdx}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-violet-200/90 bg-[#141724] border border-violet-400/20 hover:border-violet-400/50 hover:bg-violet-900/30 transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Key Achievement Badge Footer */}
      {item.achievement && (
        <div className="mt-4 pt-3 border-t border-violet-500/15 flex items-center justify-between text-xs font-mono text-amber-200/90">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{item.achievement}</span>
          </div>
          <span className="text-violet-400/40 text-[10px]">#VERIFIED</span>
        </div>
      )}
    </motion.div>
  );
}
