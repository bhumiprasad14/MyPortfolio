# Bhumi Prasad — Premium Interactive 3D Software Engineer Portfolio

An award-winning, futuristic, interactive 3D personal portfolio website engineered for **Bhumi Prasad**, Software Engineer, Full Stack Backend Architect, and AI/ML Enthusiast.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js**, **React Three Fiber (@react-three/fiber)**, **@react-three/drei**, **Framer Motion**, **Prisma ORM**, and **PostgreSQL / SQLite**.

---

## 🌟 Key Features & Architecture

### 1. Interactive 3D Hero Section
- **Procedural 3D WebGL Core**: Real-time rotating cybernetic sphere with dynamic mesh distortion (`MeshDistortMaterial`), glowing wireframe layers, and three orbital particle rings.
- **Dynamic Starfield & Floating Particles**: 1,000+ procedural glowing particles rendered via Three.js `bufferGeometry` and additive blending.
- **Mouse-Responsive Parallax Rig**: Camera smoothly tracks cursor movement in real time with mathematical interpolation (`THREE.MathUtils.lerp`).
- **Zero Hydration Mismatch**: Dynamically loaded with Next.js dynamic client boundary (`ssr: false`) and a cybernetic spinner fallback.

### 2. High-Performance Design System
- **Futuristic Digital Laboratory Aesthetic**: Deep charcoal & obsidian background (`#05070f`), electric blue (`#00f0ff`), cyber neon (`#38bdf8`), and violet (`#8b5cf6`) accents.
- **Glassmorphism & Glow Physics**: Custom blur cards, glowing borders (`shadow-glow-cyan`, `shadow-glow-violet`), and responsive typography.
- **Interactive Matrix Background**: 3D star grid background for the contact and footer sections.

### 3. Vertical Engineering Timelines & Certifications
- **Work Experience**: Production internships at the **National Informatics Centre (NIC)** (Dearness Allowance Management System with ASP.NET Core, C#, PostgreSQL, Angular) and **ARMB** (College ERP Portal with Java, Spring Boot, REST APIs, React Native).
- **Academic Foundation**: MCKV Institute of Engineering (B.Tech CSE with **9.7 YGPA**), Agrasain Balika Siksha Sadan (**96.2% ISC, 95.7% ICSE**).
- **Achievements & Honors**: HexaFalls Hackathon Finalist (*Justicia.ai*), IEEE Member (2025), ENIGMA Technical Podium Winner, and Oracle Certified Java Foundations Associate.

### 4. Dynamic Project Showcase & Deep Dives
- Filterable projects across **AI / GenAI**, **Full Stack**, **Backend**, and **Machine Learning**.
- Deep dive case study pages (`/projects/[slug]`) highlighting:
  - Executive Overview
  - The Engineering Challenge (Problem Statement)
  - The Engineered Solution
  - System Architecture & Data Flow
  - Key Technical Capabilities
  - Interactive Tech Stack Badges
  - Live Deployment and GitHub Source Links

### 5. Secure Admin Control Center (`/admin`)
- **JWT & HTTP-Only Cookie Authentication**: Secure bcrypt password hashing, session tokens, and route protection.
- **Full CRUD Management**:
  - **Projects**: Add, edit, delete, toggle featured status, manage technologies.
  - **Skills**: Add, update proficiency badges, reorder, delete.
  - **Experience & Education**: Update production milestones and academics.
  - **Contact Inquiries**: Review inbound inquiries, mark as read, spam filtering.
  - **Site Settings & Profile**: Update hero headlines, availability status, resume link, and SEO metadata.

### 6. Interactive Contact System
- Fully validated with **Zod** and **React Hook Form**.
- Integrated with SQLite/PostgreSQL database storage.
- Optional email notification dispatch via **Resend**.
- Celebratory particle confetti (`canvas-confetti`) upon transmission.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14.2 (App Router, Server & Client Components) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| **3D & Canvas** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| **Animations** | Framer Motion, GSAP |
| **Icons** | Lucide React |
| **ORM & Database** | Prisma ORM 5.22, SQLite (Local Dev) / PostgreSQL (Neon, Supabase, Railway) |
| **Authentication** | JWT (`jsonwebtoken`), BCrypt (`bcryptjs`), HTTP-only Cookies |
| **Validation** | Zod 3.23, React Hook Form, `@hookform/resolvers` |

---

## 🚀 Quick Start & Local Execution

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (Node.js 22 supported)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone or navigate to the directory
cd d:/BHUMIDOC/MYpOrTfolio

# Install dependencies
npm install
```

### 3. Initialize Database & Seed Real Resume Data
The project is pre-configured with SQLite for zero-setup local execution (no external services needed):
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to SQLite database (dev.db)
npm run prisma:push

# Seed database with Bhumi Prasad's actual resume, projects, and credentials
npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Admin Portal Access

- **URL**: `http://localhost:3000/admin/login`
- **Default Email**: `admin@bhumiprasad.dev`
- **Default Password**: `Admin@SecurePortfolio2026!`

*(Credentials are configurable via environment variables in `.env`)*

---

## 🌍 Production Deployment Guide

### Deploying to Vercel with PostgreSQL (Supabase / Neon)

1. **Create a PostgreSQL Database**:
   - Create a free project on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
   - Copy your connection string (e.g. `postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/portfolio?sslmode=require`).

2. **Configure Environment Variables**:
   In your Vercel Project Dashboard or `.env.production`:
   ```ini
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="generate-a-strong-random-secret-key"
   ADMIN_EMAIL="admin@bhumiprasad.dev"
   ADMIN_PASSWORD="YourStrongProductionPassword"
   ADMIN_NAME="Bhumi Prasad"
   NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
   
   # Optional
   RESEND_API_KEY="re_..."
   CONTACT_NOTIFICATION_EMAIL="prasad14bhumi@gmail.com"
   CLOUDINARY_CLOUD_NAME="your-cloud"
   CLOUDINARY_API_KEY="your-key"
   CLOUDINARY_API_SECRET="your-secret"
   ```

3. **Switch Prisma Provider**:
   In `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Deploy**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   vercel --prod
   ```

---

## 📁 Project Directory Structure

```text
├── app/
│   ├── admin/               # Admin Control Center & Secure Login
│   │   ├── login/page.tsx   # Admin Authentication Gate
│   │   └── page.tsx         # Full CRUD Management Interface
│   ├── api/                 # RESTful API Endpoints
│   │   ├── auth/            # /login, /logout, /me
│   │   ├── projects/        # Project CRUD & Slugs
│   │   ├── skills/          # Skills & Categories CRUD
│   │   ├── experience/      # Experience Timeline CRUD
│   │   ├── education/       # Education Records CRUD
│   │   ├── certifications/  # Certifications & Honors CRUD
│   │   ├── contact/         # Contact Inbound & Status
│   │   ├── profile/         # Engineer Profile Data
│   │   ├── settings/        # Hero & Availability Settings
│   │   └── upload/          # File & Asset Upload Endpoint
│   ├── projects/[slug]/     # Dynamic Case Study Detail Page
│   ├── layout.tsx           # SEO Metadata, OpenGraph & JSON-LD
│   ├── page.tsx             # Server-Rendered Public Portfolio
│   ├── globals.css          # Cybernetic styles & animations
│   ├── sitemap.ts           # Dynamic XML Sitemap
│   └── robots.ts            # Robots.txt Directive
├── components/
│   ├── 3d/
│   │   ├── HeroScene.tsx    # Interactive R3F Cybernetic Core & Particle Grid
│   │   └── MatrixBackground.tsx # Ambient Star Grid
│   ├── navigation/
│   │   ├── Navbar.tsx       # Glassmorphism Sticky Nav & Mobile Drawer
│   │   └── Footer.tsx       # Footer, Quick Links & Status Beacon
│   └── sections/
│       ├── HeroSection.tsx  # Hero Presentation & Stats
│       ├── AboutSection.tsx # Profile Card, Terminal & Mission
│       ├── SkillsSection.tsx# Filterable 3D Tech Showcase
│       ├── ProjectsSection.tsx # Interactive Project Grid
│       ├── ExperienceSection.tsx # Vertical Timeline (NIC, ARMB, Academics)
│       ├── CertificationsSection.tsx # Hackathons & Awards
│       ├── ResumeSection.tsx# Verified Resume & CTA
│       └── ContactSection.tsx# Validated Contact Form
├── lib/
│   ├── auth/jwt.ts          # Session tokens & BCrypt hashing
│   ├── db/prisma.ts         # Global Prisma Client instance
│   ├── utils/cn.ts          # Tailwind Class merging
│   └── validations/schemas.ts # Zod Validation Schemas
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── schema.postgresql.prisma # PostgreSQL reference schema
│   └── seed.js              # Database seed script with Bhumi Prasad's resume
├── public/
│   └── resume.pdf           # Downloadable Software Engineer CV
└── types/index.ts           # TypeScript interfaces & types
```

---

## 👩‍💻 Developer

**Bhumi Prasad**  
- **Email**: [prasad14bhumi@gmail.com](mailto:prasad14bhumi@gmail.com)  
- **LinkedIn**: [linkedin.com/in/bhumiprasad](https://linkedin.com/in/bhumiprasad)  
- **GitHub**: [github.com/bhumiprasad14](https://github.com/bhumiprasad14)  
- **Education**: MCKV Institute of Engineering (B.Tech CSE, 9.7 YGPA)
