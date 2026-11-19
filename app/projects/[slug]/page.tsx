import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Sparkles
} from 'lucide-react';
import prisma from '@/lib/db/prisma';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import GeminiAmbientGlow from '@/components/ui/GeminiAmbientGlow';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Bhumi Prasad`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      technologies: true,
    },
  });

  if (!project) {
    notFound();
  }

  let featuresList: string[] = [];
  try {
    if (project.features) {
      featuresList = JSON.parse(project.features);
    }
  } catch {
    featuresList = project.features ? [project.features] : [];
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      <GeminiAmbientGlow />
      <Navbar />

      <main className="pt-32 pb-24 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-cyber-blue transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>

          {/* Header Banner */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                  Featured Case Study
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            {project.subtitle && (
              <p className="text-base sm:text-lg text-slate-300 font-light">
                {project.subtitle}
              </p>
            )}

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-glow-cyan transition-all"
                >
                  <span>Launch Live Deployment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-surface-200 hover:bg-surface-300 text-slate-200 hover:text-white font-medium text-xs border border-white/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 bg-surface-200">
            <Image
              src={project.bannerUrl || project.imageUrl}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          {/* Technology Pills */}
          <div className="p-6 rounded-2xl bg-surface-100/60 backdrop-blur-md border border-white/10 mb-12">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
              Technical Stack & Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-3 py-1 rounded-xl bg-surface-200 border border-white/5 text-xs font-mono text-cyan-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Dive Content Sections */}
          <div className="space-y-12">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyber-blue" />
                <span>Executive Overview</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.problem && (
                  <div className="p-6 rounded-3xl bg-surface-100/60 border border-rose-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      <span>The Engineering Challenge</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-6 rounded-3xl bg-surface-100/60 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                      <Lightbulb className="w-4 h-4" />
                      <span>Engineered Solution</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <div className="p-6 rounded-3xl bg-surface-100/60 border border-white/10 space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Workflow className="w-5 h-5 text-cyber-violet" />
                  <span>System Architecture & Data Flow</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Features */}
            {featuresList.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Key Architectural Features & Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-surface-100/60 border border-white/5 flex items-start space-x-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
