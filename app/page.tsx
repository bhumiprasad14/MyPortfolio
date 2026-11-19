import React from 'react';
import prisma from '@/lib/db/prisma';
import Navbar from '@/components/navigation/Navbar';
import GeminiAmbientGlow from '@/components/ui/GeminiAmbientGlow';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/navigation/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch real data from Prisma database
  let profile = null;
  let settings = null;
  let categories: any[] = [];
  let projects: any[] = [];
  let experiences: any[] = [];
  let educations: any[] = [];
  let certifications: any[] = [];

  try {
    const [p, s, c, pr, ex, ed, ce] = await Promise.all([
      prisma.profile.findFirst({
        include: { socialLinks: { orderBy: { order: 'asc' } } },
      }),
      prisma.siteSettings.findFirst(),
      prisma.skillCategory.findMany({
        orderBy: { order: 'asc' },
        include: { skills: { orderBy: { order: 'asc' } } },
      }),
      prisma.project.findMany({
        where: { published: true },
        orderBy: [{ featured: 'desc' }, { order: 'asc' }],
        include: { technologies: true },
      }),
      prisma.experience.findMany({
        orderBy: [{ isCurrent: 'desc' }, { order: 'asc' }],
      }),
      prisma.education.findMany({
        orderBy: [{ isCurrent: 'desc' }, { order: 'asc' }],
      }),
      prisma.certification.findMany({
        orderBy: { order: 'asc' },
      }),
    ]);

    profile = p;
    settings = s;
    categories = c;
    projects = pr;
    experiences = ex;
    educations = ed;
    certifications = ce;
  } catch (error) {
    console.error('Database fetch fallback:', error);
  }

  return (
      <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-violet-500 selection:text-white">
        {/* Dynamic Gemini-style Ambient Glow Background */}
        <GeminiAmbientGlow />

        {/* Top Fixed Navigation */}
        <Navbar
          availableForHire={settings?.availableForHire ?? true}
          availabilityText={settings?.availabilityText || 'Available for Roles'}
        />

          {/* Main Content Sections */}
          <main className="flex-1 w-full relative z-10">
            {/* 1. Subtle, Impactful Hero */}
            <HeroSection settings={settings} profile={profile} />

            {/* 2. Professional About Me */}
            <AboutSection profile={profile} />

            {/* 3. Technical Skills Showcase */}
            <SkillsSection categories={categories} />

            {/* 4. Projects Showcase & Deep Dives */}
            <ProjectsSection projects={projects} />

            {/* 5. Work Experience & Education Vertical Timeline */}
            <ExperienceSection experiences={experiences} educations={educations} />

            {/* 6. Achievements & Certifications */}
            <CertificationsSection certifications={certifications} />

            {/* 7. Resume & Executive Call to Action */}
            <ResumeSection profile={profile} settings={settings} />

            {/* 8. Fully Functional Contact Section */}
            <ContactSection profile={profile} settings={settings} />
          </main>

          {/* Footer */}
          <Footer />
      </div>
      );
}
