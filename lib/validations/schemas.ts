import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ContactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const ProjectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  subtitle: z.string().optional().nullable(),
  description: z.string().min(10, 'Description is required'),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  architecture: z.string().optional().nullable(),
  features: z.string().optional().nullable(),
  category: z.string().min(2, 'Category is required'),
  imageUrl: z.string().min(2, 'Image URL is required'),
  bannerUrl: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  liveDemoUrl: z.string().url().optional().nullable().or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
  technologies: z.array(z.string()).optional(),
});

export const SkillCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  categoryId: z.string().min(1, 'Category is required'),
  proficiency: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  isHighlighted: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const ExperienceSchema = z.object({
  company: z.string().min(2, 'Company is required'),
  position: z.string().min(2, 'Position is required'),
  location: z.string().optional().nullable(),
  type: z.string().default('Internship'),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(5, 'Description is required'),
  responsibilities: z.string().min(5, 'Responsibilities are required'),
  technologies: z.string().min(1, 'Technologies are required'),
  order: z.number().int().default(0),
});

export const EducationSchema = z.object({
  institution: z.string().min(2, 'Institution is required'),
  degree: z.string().min(2, 'Degree is required'),
  specialization: z.string().min(2, 'Specialization is required'),
  score: z.string().optional().nullable(),
  startYear: z.string().min(4, 'Start year is required'),
  endYear: z.string().min(4, 'End year is required'),
  isCurrent: z.boolean().default(false),
  achievements: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const CertificationSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  issuer: z.string().min(2, 'Issuer is required'),
  issueDate: z.string().min(2, 'Issue date is required'),
  expiryDate: z.string().optional().nullable(),
  credentialId: z.string().optional().nullable(),
  credentialUrl: z.string().url().optional().nullable().or(z.literal('')),
  certificateFile: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

export const ProfileSchema = z.object({
  fullName: z.string().min(2),
  title: z.string().min(2),
  tagline: z.string().min(5),
  bio: z.string().min(10),
  avatarUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  location: z.string().min(2),
  yearsExperience: z.string().default('1+'),
  currentStatus: z.string().default('Open to Opportunities'),
  availableForWork: z.boolean().default(true),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
});

export const SiteSettingsSchema = z.object({
  heroHeading: z.string().min(5),
  heroSubtitle: z.string().min(5),
  siteTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  availabilityText: z.string().min(5),
  availableForHire: z.boolean().default(true),
  primaryEmail: z.string().email(),
  contactPhone: z.string().optional().nullable(),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resumePdfUrl: z.string().optional().nullable(),
});
