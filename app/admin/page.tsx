'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  RefreshCw,
  Star,
  Eye,
  ShieldAlert
} from 'lucide-react';
import {
  ProjectData,
  SkillCategoryData,
  ExperienceData,
  EducationData,
  CertificationData,
  ProfileData,
  SiteSettingsData
} from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [messageNotice, setMessageNotice] = useState<string | null>(null);

  // Data states
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skillsCategories, setSkillsCategories] = useState<SkillCategoryData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [educations, setEducations] = useState<EducationData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  // Modals state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);

  const [showExpModal, setShowExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Check auth
      const authRes = await fetch('/api/auth/me');
      if (!authRes.ok) {
        router.push('/admin/login');
        return;
      }

      const [projRes, skillRes, expRes, eduRes, certRes, msgRes, profRes, setRes] =
        await Promise.all([
          fetch('/api/projects?admin=true'),
          fetch('/api/skills'),
          fetch('/api/experience'),
          fetch('/api/education'),
          fetch('/api/certifications'),
          fetch('/api/contact'),
          fetch('/api/profile'),
          fetch('/api/settings'),
        ]);

      if (projRes.ok) {
        const d = await projRes.json();
        setProjects(d.data || []);
      }
      if (skillRes.ok) {
        const d = await skillRes.json();
        setSkillsCategories(d.data || []);
      }
      if (expRes.ok) {
        const d = await expRes.json();
        setExperiences(d.data || []);
      }
      if (eduRes.ok) {
        const d = await eduRes.json();
        setEducations(d.data || []);
      }
      if (certRes.ok) {
        const d = await certRes.json();
        setCertifications(d.data || []);
      }
      if (msgRes.ok) {
        const d = await msgRes.json();
        setMessages(d.data || []);
      }
      if (profRes.ok) {
        const d = await profRes.json();
        setProfile(d.data || null);
      }
      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.data || null);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const showNotification = (msg: string) => {
    setMessageNotice(msg);
    setTimeout(() => setMessageNotice(null), 3500);
  };

  // --- PROJECT CRUD ---
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = new FormData(e.currentTarget);

    const projectPayload = {
      title: form.get('title') as string,
      slug: form.get('slug') as string,
      subtitle: form.get('subtitle') as string,
      description: form.get('description') as string,
      problem: form.get('problem') as string,
      solution: form.get('solution') as string,
      architecture: form.get('architecture') as string,
      category: form.get('category') as string,
      imageUrl: form.get('imageUrl') as string,
      bannerUrl: form.get('bannerUrl') as string,
      githubUrl: form.get('githubUrl') as string,
      liveDemoUrl: form.get('liveDemoUrl') as string,
      featured: form.get('featured') === 'on',
      published: form.get('published') === 'on',
      technologies: (form.get('technologies') as string)
        ? (form.get('technologies') as string).split(',').map((s) => s.trim())
        : [],
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectPayload),
        });
        if (!res.ok) throw new Error('Update failed');
        showNotification('Project updated successfully');
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectPayload),
        });
        if (!res.ok) throw new Error('Create failed');
        showNotification('Project created successfully');
      }
      setShowProjectModal(false);
      setEditingProject(null);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      showNotification('Project deleted');
      fetchData();
    } catch {
      alert('Delete failed');
    }
  };

  // --- SKILL CRUD ---
  const handleSaveSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = new FormData(e.currentTarget);

    const skillPayload = {
      name: form.get('name') as string,
      categoryId: form.get('categoryId') as string,
      proficiency: form.get('proficiency') as string,
      isHighlighted: form.get('isHighlighted') === 'on',
      order: parseInt((form.get('order') as string) || '0', 10),
    };

    try {
      if (editingSkill) {
        await fetch(`/api/skills/${editingSkill.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skillPayload),
        });
        showNotification('Skill updated');
      } else {
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skillPayload),
        });
        showNotification('Skill created');
      }
      setShowSkillModal(false);
      setEditingSkill(null);
      fetchData();
    } catch (err: any) {
      alert('Error saving skill');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    showNotification('Skill deleted');
    fetchData();
  };

  // --- EXPERIENCE CRUD ---
  const handleSaveExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = new FormData(e.currentTarget);

    const expPayload = {
      company: form.get('company') as string,
      position: form.get('position') as string,
      location: form.get('location') as string,
      type: form.get('type') as string,
      startDate: form.get('startDate') as string,
      endDate: form.get('endDate') as string,
      isCurrent: form.get('isCurrent') === 'on',
      description: form.get('description') as string,
      responsibilities: form.get('responsibilities') as string,
      technologies: form.get('technologies') as string,
    };

    try {
      if (editingExp) {
        await fetch(`/api/experience/${editingExp.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expPayload),
        });
        showNotification('Experience updated');
      } else {
        await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expPayload),
        });
        showNotification('Experience created');
      }
      setShowExpModal(false);
      setEditingExp(null);
      fetchData();
    } catch {
      alert('Error saving experience');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Delete this experience entry?')) return;
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    showNotification('Experience deleted');
    fetchData();
  };

  // --- CONTACT MESSAGE TOGGLE & DELETE ---
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: !currentRead }),
    });
    fetchData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    showNotification('Message deleted');
    fetchData();
  };

  // --- PROFILE UPDATE ---
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      fullName: form.get('fullName') as string,
      title: form.get('title') as string,
      tagline: form.get('tagline') as string,
      bio: form.get('bio') as string,
      location: form.get('location') as string,
      currentStatus: form.get('currentStatus') as string,
      email: form.get('email') as string,
      phone: form.get('phone') as string,
      avatarUrl: form.get('avatarUrl') as string,
      resumeUrl: form.get('resumeUrl') as string,
    };

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      showNotification('Profile updated successfully');
      fetchData();
    } catch {
      alert('Profile update failed');
    } finally {
      setActionLoading(false);
    }
  };

  // --- SITE SETTINGS UPDATE ---
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    const form = new FormData(e.currentTarget);

    const payload = {
      heroHeading: form.get('heroHeading') as string,
      heroSubtitle: form.get('heroSubtitle') as string,
      siteTitle: form.get('siteTitle') as string,
      metaDescription: form.get('metaDescription') as string,
      availabilityText: form.get('availabilityText') as string,
      availableForHire: form.get('availableForHire') === 'on',
      primaryEmail: form.get('primaryEmail') as string,
      githubUrl: form.get('githubUrl') as string,
      linkedinUrl: form.get('linkedinUrl') as string,
      resumePdfUrl: form.get('resumePdfUrl') as string,
    };

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      showNotification('Site settings updated');
      fetchData();
    } catch {
      alert('Settings update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Tech', icon: Cpu },
    { id: 'experience', label: `Experience (${experiences.length})`, icon: Briefcase },
    { id: 'messages', label: `Messages (${messages.filter(m => !m.isRead).length} new)`, icon: Mail },
    { id: 'profile', label: 'Profile & Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading Management Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col selection:bg-cyber-blue selection:text-black">
      {/* Top Banner Notice */}
      {messageNotice && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-medium backdrop-blur-md shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>{messageNotice}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="border-b border-white/10 bg-surface-100/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue font-mono font-bold text-xs">
              BP
            </div>
            <div>
              <span className="font-bold text-sm text-white">Bhumi Prasad Portfolio Admin</span>
              <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Production Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-200 hover:bg-surface-300 text-xs text-slate-300 transition-colors"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-xs text-rose-400 font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyber-blue/40 text-white shadow-glow-cyan/30'
                    : 'text-slate-400 hover:text-white hover:bg-surface-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-blue' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-surface-100/70 border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Projects
                  </span>
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {projects.length}
                  </span>
                </div>
                <div className="p-5 rounded-3xl bg-surface-100/70 border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Total Skills
                  </span>
                  <span className="text-3xl font-extrabold text-cyber-blue font-mono">
                    {skillsCategories.reduce((acc, c) => acc + c.skills.length, 0)}
                  </span>
                </div>
                <div className="p-5 rounded-3xl bg-surface-100/70 border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Experiences
                  </span>
                  <span className="text-3xl font-extrabold text-cyber-violet font-mono">
                    {experiences.length}
                  </span>
                </div>
                <div className="p-5 rounded-3xl bg-surface-100/70 border border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Inquiries
                  </span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {messages.length}
                  </span>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="p-6 rounded-3xl bg-surface-100/60 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-cyber-blue" />
                    <span>Recent Contact Transmissions</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-cyber-blue hover:underline"
                  >
                    View All Inquiries
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No contact inquiries yet.</p>
                ) : (
                  <div className="divide-y divide-white/5">
                    {messages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-xs text-white">{msg.name}</span>
                            <span className="text-[11px] font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                            {!msg.isRead && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1">{msg.subject}: {msg.message}</p>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Project Catalog</h3>
                  <p className="text-xs text-slate-400">Manage case studies and live deployments</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-glow-cyan"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-surface-100/70 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-200 text-cyan-300">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300">
                            Featured
                          </span>
                        )}
                        <h4 className="text-base font-bold text-white">{proj.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{proj.description}</p>
                      <span className="text-[11px] font-mono text-slate-500">slug: /{proj.slug}</span>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-surface-200 text-slate-300 hover:text-white"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setShowProjectModal(true);
                        }}
                        className="p-2 rounded-lg bg-surface-200 text-slate-300 hover:text-cyan-400"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-surface-200 text-rose-400 hover:bg-rose-500/20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Technical Skills Showcase</h3>
                  <p className="text-xs text-slate-400">Organized into domains and competencies</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSkill(null);
                    setShowSkillModal(true);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-glow-cyan"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="space-y-6">
                {skillsCategories.map((cat) => (
                  <div key={cat.id} className="p-6 rounded-3xl bg-surface-100/60 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-cyber-blue" />
                        <span>{cat.name}</span>
                      </h4>
                      <span className="text-xs font-mono text-slate-400">{cat.skills.length} Skills</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface-200/80 border border-white/5 text-xs text-slate-200"
                        >
                          <span>{skill.name}</span>
                          {skill.proficiency && (
                            <span className="text-[10px] font-mono text-slate-400">({skill.proficiency})</span>
                          )}
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="text-slate-500 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Work Experience</h3>
                  <p className="text-xs text-slate-400">Professional internships and employment records</p>
                </div>
                <button
                  onClick={() => {
                    setEditingExp(null);
                    setShowExpModal(true);
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs shadow-glow-cyan"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-surface-100/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{exp.position}</span>
                        <span className="text-xs text-cyan-400 font-medium">@ {exp.company}</span>
                        {exp.isCurrent && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingExp(exp);
                          setShowExpModal(true);
                        }}
                        className="p-2 rounded-lg bg-surface-200 text-slate-300 hover:text-cyan-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-2 rounded-lg bg-surface-200 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Inquiries & Transmissions</h3>
                <p className="text-xs text-slate-400">Stored from the public portfolio contact form</p>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-surface-100/50 border border-white/5 text-slate-400 text-xs">
                    No messages recorded yet.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        msg.isRead
                          ? 'bg-surface-100/40 border-white/5'
                          : 'bg-surface-100/90 border-cyber-blue/30 shadow-glow-cyan/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className="text-xs font-mono text-cyan-400">&lt;{msg.email}&gt;</span>
                          {msg.isSpam && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                              Spam Flagged
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-200 mb-2">Subject: {msg.subject}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-surface-200/50 p-3 rounded-xl mb-4">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleToggleRead(msg.id, msg.isRead)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-xs text-rose-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: PROFILE & SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-10">
              {/* Profile Information */}
              <div className="p-6 rounded-3xl bg-surface-100/70 border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyber-blue" />
                  <span>Profile Information</span>
                </h3>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Full Name</label>
                      <input
                        name="fullName"
                        defaultValue={profile?.fullName || 'Bhumi Prasad'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Professional Title</label>
                      <input
                        name="title"
                        defaultValue={profile?.title || 'Software Engineer'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Tagline / Mission</label>
                    <input
                      name="tagline"
                      defaultValue={profile?.tagline || ''}
                      className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Biography</label>
                    <textarea
                      name="bio"
                      rows={4}
                      defaultValue={profile?.bio || ''}
                      className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Location</label>
                      <input
                        name="location"
                        defaultValue={profile?.location || 'Kolkata, India'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Current Status</label>
                      <input
                        name="currentStatus"
                        defaultValue={profile?.currentStatus || 'Open to Opportunities'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Email</label>
                      <input
                        name="email"
                        defaultValue={profile?.email || 'prasad14bhumi@gmail.com'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Phone</label>
                      <input
                        name="phone"
                        defaultValue={profile?.phone || '+91 62908 15479'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Avatar Image URL</label>
                    <input
                      name="avatarUrl"
                      defaultValue={profile?.avatarUrl || ''}
                      className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-xl bg-cyber-blue text-background font-bold text-xs uppercase tracking-wider"
                  >
                    Save Profile Updates
                  </button>
                </form>
              </div>

              {/* Site Settings & SEO */}
              <div className="p-6 rounded-3xl bg-surface-100/70 border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-cyber-violet" />
                  <span>Website Hero & SEO Settings</span>
                </h3>
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Hero Main Headline</label>
                    <input
                      name="heroHeading"
                      defaultValue={settings?.heroHeading || 'Building Intelligent Systems. Engineering Digital Experiences.'}
                      className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300">Hero Subtitle</label>
                    <input
                      name="heroSubtitle"
                      defaultValue={settings?.heroSubtitle || 'Software Engineer | Backend Developer | Full Stack Developer | AI/ML Enthusiast'}
                      className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Site Title</label>
                      <input
                        name="siteTitle"
                        defaultValue={settings?.siteTitle || 'Bhumi Prasad — Software Engineer'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">Availability Text</label>
                      <input
                        name="availabilityText"
                        defaultValue={settings?.availabilityText || 'Available for Roles'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">GitHub Profile URL</label>
                      <input
                        name="githubUrl"
                        defaultValue={settings?.githubUrl || 'https://github.com/bhumiprasad14'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300">LinkedIn Profile URL</label>
                      <input
                        name="linkedinUrl"
                        defaultValue={settings?.linkedinUrl || 'https://linkedin.com/in/bhumiprasad'}
                        className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="availableForHire"
                      name="availableForHire"
                      defaultChecked={settings?.availableForHire ?? true}
                      className="rounded bg-surface-200 border-white/10 text-cyber-blue"
                    />
                    <label htmlFor="availableForHire" className="text-xs text-slate-300">
                      Enable &apos;Available for Work&apos; status beacon across public portfolio
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2.5 rounded-xl bg-cyber-violet text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Save System Settings
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE/EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-surface-100 border border-white/10 shadow-2xl relative my-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Project Title *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingProject?.title || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Unique Slug *</label>
                  <input
                    name="slug"
                    required
                    defaultValue={editingProject?.slug || ''}
                    placeholder="my-cool-project"
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Category *</label>
                  <select
                    name="category"
                    defaultValue={editingProject?.category || 'AI / GenAI'}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  >
                    <option value="AI / GenAI">AI / GenAI</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Backend">Backend</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Subtitle / Tagline</label>
                  <input
                    name="subtitle"
                    defaultValue={editingProject?.subtitle || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Overview Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingProject?.description || ''}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Problem Statement</label>
                  <textarea
                    name="problem"
                    rows={2}
                    defaultValue={editingProject?.problem || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Engineered Solution</label>
                  <textarea
                    name="solution"
                    rows={2}
                    defaultValue={editingProject?.solution || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">System Architecture</label>
                <textarea
                  name="architecture"
                  rows={2}
                  defaultValue={editingProject?.architecture || ''}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Technologies (Comma-separated)</label>
                <input
                  name="technologies"
                  defaultValue={editingProject?.technologies?.map((t) => t.name).join(', ') || ''}
                  placeholder="Java, Spring Boot, PostgreSQL, React"
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Image URL *</label>
                  <input
                    name="imageUrl"
                    required
                    defaultValue={editingProject?.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Banner URL</label>
                  <input
                    name="bannerUrl"
                    defaultValue={editingProject?.bannerUrl || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">GitHub Repository URL</label>
                  <input
                    name="githubUrl"
                    defaultValue={editingProject?.githubUrl || ''}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Live Demo URL</label>
                  <input
                    name="liveDemoUrl"
                    defaultValue={editingProject?.liveDemoUrl || ''}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingProject?.featured ?? true}
                  />
                  <span>Mark as Featured</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={editingProject?.published ?? true}
                  />
                  <span>Publish to Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-200 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-glow-cyan"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE/EDIT SKILL MODAL */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-3xl bg-surface-100 border border-white/10 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingSkill ? 'Edit Skill' : 'Add Technical Skill'}
            </h3>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300">Skill Name *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingSkill?.name || ''}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Category *</label>
                <select
                  name="categoryId"
                  defaultValue={editingSkill?.categoryId || skillsCategories[0]?.id}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                >
                  {skillsCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Proficiency Tag</label>
                <input
                  name="proficiency"
                  defaultValue={editingSkill?.proficiency || 'Advanced'}
                  placeholder="e.g. Core Specialization, Production Tested"
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  name="isHighlighted"
                  defaultChecked={editingSkill?.isHighlighted ?? true}
                />
                <span>Highlight with Glow Badge</span>
              </label>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-200 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-glow-cyan"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE/EDIT EXPERIENCE MODAL */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-xl w-full p-6 rounded-3xl bg-surface-100 border border-white/10 shadow-2xl relative my-8">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingExp ? 'Edit Experience' : 'Add Experience Entry'}
            </h3>
            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Position *</label>
                  <input
                    name="position"
                    required
                    defaultValue={editingExp?.position || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Company *</label>
                  <input
                    name="company"
                    required
                    defaultValue={editingExp?.company || ''}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Start Date *</label>
                  <input
                    name="startDate"
                    required
                    defaultValue={editingExp?.startDate || 'Jul 2026'}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">End Date</label>
                  <input
                    name="endDate"
                    defaultValue={editingExp?.endDate || 'Present'}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Role Type</label>
                  <input
                    name="type"
                    defaultValue={editingExp?.type || 'Internship'}
                    className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Overview Description *</label>
                <textarea
                  name="description"
                  required
                  rows={2}
                  defaultValue={editingExp?.description || ''}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Responsibilities (JSON Array or Text)</label>
                <textarea
                  name="responsibilities"
                  required
                  rows={3}
                  defaultValue={editingExp?.responsibilities || '["Architected scalable APIs","Managed team scrums"]'}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300">Technologies Used *</label>
                <input
                  name="technologies"
                  required
                  defaultValue={editingExp?.technologies || 'Java, Spring Boot, PostgreSQL'}
                  className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  name="isCurrent"
                  defaultChecked={editingExp?.isCurrent ?? true}
                />
                <span>Currently Active Role</span>
              </label>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-200 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-glow-cyan"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
