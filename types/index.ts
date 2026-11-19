export interface Technology {
  id: string;
  name: string;
  category?: string | null;
  icon?: string | null;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  problem?: string | null;
  solution?: string | null;
  architecture?: string | null;
  features?: string | null;
  category: string;
  imageUrl: string;
  bannerUrl?: string | null;
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  featured: boolean;
  order: number;
  published: boolean;
  technologies: Technology[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillItem {
  id: string;
  name: string;
  categoryId: string;
  proficiency?: string | null;
  icon?: string | null;
  isHighlighted: boolean;
  order: number;
}

export interface SkillCategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  order: number;
  skills: SkillItem[];
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location?: string | null;
  type: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string; // JSON parsed or raw
  technologies: string;
  order: number;
}

export interface EducationData {
  id: string;
  institution: string;
  degree: string;
  specialization: string;
  score?: string | null;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  achievements?: string | null;
  order: number;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  certificateFile?: string | null;
  description?: string | null;
  skills?: string | null;
  order: number;
}

export interface ProfileData {
  id: string;
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  location: string;
  yearsExperience: string;
  currentStatus: string;
  availableForWork: boolean;
  email: string;
  phone?: string | null;
}

export interface SiteSettingsData {
  id: string;
  heroHeading: string;
  heroSubtitle: string;
  siteTitle: string;
  metaDescription: string;
  ogImage?: string | null;
  availabilityText: string;
  availableForHire: boolean;
  primaryEmail: string;
  contactPhone?: string | null;
  githubUrl: string;
  linkedinUrl: string;
  resumePdfUrl?: string | null;
}
