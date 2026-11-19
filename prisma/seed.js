const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Database Seeding ---');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@bhumiprasad.dev';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@SecurePortfolio2026!';
  const adminName = process.env.ADMIN_NAME || 'Bhumi Prasad';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: adminName,
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: adminName,
      role: 'SUPERADMIN',
    },
  });
  console.log('✓ Admin user created/updated:', admin.email);

  // 2. Seed Profile
  const profile = await prisma.profile.upsert({
    where: { id: 'bhumi-prasad-profile' },
    update: {},
    create: {
      id: 'bhumi-prasad-profile',
      fullName: 'Bhumi Prasad',
      title: 'Software Engineer & Full Stack Backend Architect',
      tagline: 'Turning Complex Engineering Problems Into Resilient, High-Performance Systems',
      bio: 'Full Stack Software Engineer with a deep passion for high-concurrency backend architectures, Spring Boot ecosystems, enterprise microservices, and practical AI/ML integrations. Experienced in designing resilient RESTful APIs, high-throughput database solutions with PostgreSQL, and modern reactive frontends with Next.js and React.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      resumeUrl: '/resume.pdf',
      location: 'Kolkata, West Bengal, India',
      yearsExperience: '1+ Years Intern & Production Experience',
      currentStatus: 'Contributing to National Informatics Centre (NIC) & Open to Strategic Opportunities',
      availableForWork: true,
      email: 'prasad14bhumi@gmail.com',
      phone: '+91 62908 15479',
    },
  });
  console.log('✓ Profile seeded for:', profile.fullName);

  // 3. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default-site-settings' },
    update: {},
    create: {
      id: 'default-site-settings',
      heroHeading: 'Building Intelligent Systems. Engineering Digital Experiences.',
      heroSubtitle: 'Software Engineer | Backend Developer | Full Stack Developer | AI/ML Enthusiast',
      siteTitle: 'Bhumi Prasad — Software Engineer & 3D Interactive Portfolio',
      metaDescription: 'Official portfolio of Bhumi Prasad, Software Engineer specializing in Java, Spring Boot, Next.js, and Machine Learning.',
      availabilityText: 'Available for Software Engineering Roles & Innovative Projects',
      availableForHire: true,
      primaryEmail: 'prasad14bhumi@gmail.com',
      contactPhone: '+91 62908 15479',
      githubUrl: 'https://github.com/bhumiprasad14',
      linkedinUrl: 'https://linkedin.com/in/bhumiprasad',
      resumePdfUrl: '/resume.pdf',
    },
  });
  console.log('✓ Site settings initialized');

  // 4. Seed Social Links
  const socials = [
    { platform: 'GitHub', url: 'https://github.com/bhumiprasad14', username: 'bhumiprasad14', icon: 'Github', order: 1 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/bhumiprasad', username: 'bhumiprasad', icon: 'Linkedin', order: 2 },
    { platform: 'LeetCode', url: 'https://leetcode.com/u/bhumiprasad14', username: 'bhumiprasad14', icon: 'Code', order: 3 },
    { platform: 'Email', url: 'mailto:prasad14bhumi@gmail.com', username: 'prasad14bhumi@gmail.com', icon: 'Mail', order: 4 },
  ];

  for (const s of socials) {
    await prisma.socialLink.create({
      data: {
        platform: s.platform,
        url: s.url,
        username: s.username,
        icon: s.icon,
        order: s.order,
        profileId: profile.id,
      },
    });
  }
  console.log('✓ Social links seeded');

  // 5. Seed Skill Categories and Skills
  const categoriesWithSkills = [
    {
      name: 'Programming Languages',
      slug: 'languages',
      description: 'Core languages for robust engineering and systems',
      order: 1,
      skills: [
        { name: 'Java', proficiency: 'Primary / Advanced', icon: 'Coffee', isHighlighted: true, order: 1 },
        // { name: 'TypeScript', proficiency: 'Advanced', icon: 'FileCode2', isHighlighted: true, order: 2 },
        { name: 'JavaScript', proficiency: 'Advanced', icon: 'Code', isHighlighted: true, order: 3 },
        { name: 'Python', proficiency: 'Proficient', icon: 'Binary', isHighlighted: true, order: 4 },
        // { name: 'C#', proficiency: 'Proficient', icon: 'Code2', isHighlighted: false, order: 5 },
        { name: 'C++', proficiency: 'Proficient', icon: 'Cpu', isHighlighted: false, order: 6 },
        { name: 'C', proficiency: 'Proficient', icon: 'Terminal', isHighlighted: false, order: 7 },
      ],
    },
    {
      name: 'Backend Development',
      slug: 'backend',
      description: 'Enterprise frameworks, distributed microservices, and secure APIs',
      order: 2,
      skills: [
        { name: 'Spring Boot', proficiency: 'Core Specialization', icon: 'Layers', isHighlighted: true, order: 1 },
        { name: 'RESTful API Architecture', proficiency: 'Advanced', icon: 'Network', isHighlighted: true, order: 2 },
        // { name: 'ASP.NET Core', proficiency: 'Production Tested', icon: 'Server', isHighlighted: true, order: 3 },
        { name: 'Spring Security & JWT', proficiency: 'Advanced', icon: 'ShieldCheck', isHighlighted: true, order: 4 },
        { name: 'Hibernate / JPA', proficiency: 'Advanced', icon: 'Database', isHighlighted: false, order: 5 },
        { name: 'Node.js & Express.js', proficiency: 'Proficient', icon: 'Cpu', isHighlighted: true, order: 6 },
        // { name: 'Entity Framework Core', proficiency: 'Proficient', icon: 'Boxes', isHighlighted: false, order: 7 },
      ],
    },
    {
      name: 'Frontend Development',
      slug: 'frontend',
      description: 'High-performance interactive interfaces, 3D graphics, and responsive UI',
      order: 3,
      skills: [
        { name: 'React.js', proficiency: 'Advanced', icon: 'Atom', isHighlighted: true, order: 1 },
        // { name: 'Next.js (App Router)', proficiency: 'Advanced', icon: 'Flame', isHighlighted: true, order: 2 },
        { name: 'Tailwind CSS', proficiency: 'Advanced', icon: 'Palette', isHighlighted: true, order: 3 },
        // { name: 'Three.js / React Three Fiber', proficiency: 'Proficient', icon: 'Box', isHighlighted: true, order: 4 },
        // { name: 'Angular', proficiency: 'Production Tested', icon: 'Component', isHighlighted: false, order: 5 },
        { name: 'HTML5 & Modern CSS3', proficiency: 'Advanced', icon: 'Layout', isHighlighted: false, order: 6 },
      ],
    },
    {
      name: 'Database & Storage',
      slug: 'database',
      description: 'Relational data modeling, indexing, and high-availability stores',
      order: 4,
      skills: [
        { name: 'PostgreSQL', proficiency: 'Advanced / Primary', icon: 'Database', isHighlighted: true, order: 1 },
        { name: 'SQL & Query Optimization', proficiency: 'Advanced', icon: 'Table', isHighlighted: true, order: 2 },
        { name: 'MongoDB', proficiency: 'Proficient', icon: 'Server', isHighlighted: false, order: 3 },
        // { name: 'Supabase', proficiency: 'Proficient', icon: 'Cloud', isHighlighted: false, order: 4 },
        { name: 'MySQL', proficiency: 'Proficient', icon: 'HardDrive', isHighlighted: false, order: 5 },
      ],
    },
    {
      name: 'AI & Machine Learning',
      slug: 'ai-ml',
      description: 'Neural architectures, generative models, RAG pipelines, and vision',
      order: 5,
      skills: [
        { name: 'LLM & Gemini API Integration', proficiency: 'Applied Production', icon: 'Sparkles', isHighlighted: true, order: 1 },
        // { name: 'Generative AI & RAG', proficiency: 'Advanced', icon: 'Bot', isHighlighted: true, order: 2 },
        { name: 'Deep Learning & Neural Networks', proficiency: 'Applied', icon: 'GitMerge', isHighlighted: true, order: 3 },
        { name: 'CNN & Computer Vision', proficiency: 'Applied', icon: 'Eye', isHighlighted: true, order: 4 },
        // { name: 'RNN & Sequence Models', proficiency: 'Applied', icon: 'TrendingUp', isHighlighted: false, order: 5 },
        { name: 'Supervised & Unsupervised ML', proficiency: 'Foundational', icon: 'Activity', isHighlighted: false, order: 6 },
      ],
    },
    {
      name: ' Developer Tools',
      slug: 'tools',
      description: 'CI/CD workflows, developer tooling, and production orchestration',
      order: 6,
      skills: [
        { name: 'Git & GitHub', proficiency: 'Advanced', icon: 'GitBranch', isHighlighted: true, order: 1 },
        // { name: 'Docker & Containerization', proficiency: 'Proficient', icon: 'Container', isHighlighted: true, order: 2 },
        { name: 'IntelliJ IDEA & VS Code', proficiency: 'Advanced', icon: 'Code', isHighlighted: false, order: 3 },
        { name: 'Postman & Swagger UI', proficiency: 'Advanced', icon: 'Send', isHighlighted: true, order: 4 },
        // { name: 'Linux / Bash', proficiency: 'Proficient', icon: 'Terminal', isHighlighted: false, order: 5 },
      ],
    },
  ];

  for (const cat of categoriesWithSkills) {
    const createdCat = await prisma.skillCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, order: cat.order },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        order: cat.order,
      },
    });

    for (const sk of cat.skills) {
      await prisma.skill.create({
        data: {
          name: sk.name,
          categoryId: createdCat.id,
          proficiency: sk.proficiency,
          icon: sk.icon,
          isHighlighted: sk.isHighlighted,
          order: sk.order,
        },
      });
    }
  }
  console.log('✓ Skill categories and skills seeded');

  // 6. Seed Projects
  const projects = [
    {
      slug: 'insightly-ai-research-extension',
      title: 'Insightly — AI-Powered Web Research & Intelligence Engine',
      subtitle: 'Google Gemini API, Spring Boot Microservices, LibreTranslate, Chrome Extension API',
      category: 'AI / GenAI',
      description: 'An intelligent AI-powered Chrome browser extension and Spring Boot backend that summarizes live webpage content, suggests contextual related research topics with vetted links, supports real-time multi-language neural translation, and allows researchers to organize knowledge notes seamlessly.',
      problem: 'Researchers, developers, and students lose hundreds of hours deciphering dense documentation, academic whitepapers, and multi-language articles without unified contextual synthesis tools.',
      solution: 'Engineered an asynchronous Chrome extension coupled with a high-throughput Spring Boot REST microservice that interfaces with Google Gemini API for context-aware distillation and LibreTranslate for on-the-fly multi-lingual translation with sub-500ms response latencies.',
      architecture: 'Distributed microservice architecture with Chrome Manifest V3 frontend, Java 21 Spring Boot REST gateway, Google Gemini 1.5 Pro inference layer, LibreTranslate translation microservice, and encrypted persistence for research notes.',
      features: JSON.stringify([
        'Instant AI synthesis of dense technical articles & research papers',
        'Automated knowledge graph linking to related reference material',
        'Zero-latency multi-language neural translation',
        'Structured note-taking with markdown export & cloud sync',
        'Token-optimized caching layer reducing duplicate AI inference costs by 68%'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&q=80',
      githubUrl: 'https://github.com/bhumiprasad14/Insightly',
      liveDemoUrl: 'https://insightly-demo.vercel.app',
      featured: true,
      order: 1,
      technologies: ['Java', 'Spring Boot', 'Google Gemini API', 'JavaScript', 'REST APIs', 'LibreTranslate'],
    },
    {
      slug: 'tutorsync-academic-attendance-platform',
      title: 'TutorSync — Full-Stack Academic & Attendance Management Platform',
      subtitle: 'Spring Boot, React, PostgreSQL, Tailwind CSS, REST APIs',
      category: 'Full Stack',
      description: 'A comprehensive, enterprise-grade attendance tracking and academic management platform built for educational institutions and coaching academies. Features real-time attendance tracking, student analytics, automated absence alerting, and role-based access control.',
      problem: 'Coaching centers and university faculties rely on fragmented spreadsheets and manual registers that cause attendance leakage, administrative overhead, and poor communication with guardians.',
      solution: 'Designed and deployed a responsive React web application powered by a Spring Boot backend and PostgreSQL database, incorporating relational schemas, optimized transactional queries, and automated reporting.',
      architecture: 'N-tier enterprise architecture: React.js SPA on client, Spring Boot REST API with Spring Security & JWT for authentication, Hibernate/JPA repository layer, and PostgreSQL on AWS RDS.',
      features: JSON.stringify([
        '1-click batch attendance recording with QR scan validation',
        'Automated attendance analytics and threshold warning triggers',
        'Secure multi-tenant data separation for tutors, students, and admins',
        'Comprehensive monthly PDF and CSV attendance performance exports',
        'Interactive financial & batch scheduling dashboard'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
      githubUrl: 'https://github.com/bhumiprasad14/AttendancePortal',
      liveDemoUrl: 'https://tutorsync-demo.vercel.app',
      featured: true,
      order: 2,
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Tailwind CSS', 'REST APIs', 'Spring Security'],
    },
    {
      slug: 'quiz-app',
      title: 'Quiz-App — Interactive Assessment Platform',
      subtitle: 'Dynamic Question Engine, Real-Time Scoring, Modular Architecture',
      category: 'Full Stack',
      description: 'An interactive, responsive quiz and testing application featuring dynamic question progression, randomized question sets, timed challenges, instant score evaluation, and comprehensive result summaries.',
      problem: 'Many learning platforms lack lightweight, customizable quiz tools that can quickly evaluate topic comprehension with instant feedback without unnecessary friction.',
      solution: 'Engineered a modular web assessment tool with clean state management, randomized quiz options, a real-time countdown timer, and automated answer validation.',
      architecture: 'Client-driven state management with modular question banks, reactive score aggregation, and responsive mobile-first UI components.',
      features: JSON.stringify([
        'Dynamic question rendering with multiple choice validation',
        'Real-time countdown timer with automated submission',
        'Instant scoring and detailed review matrix',
        'Categorized topic selection and difficulty scaling',
        'Clean, accessible, mobile-responsive layout'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
      githubUrl: 'https://github.com/bhumiprasad14/Quiz-App',
      liveDemoUrl: 'https://quiz-app-nine-drab-73.vercel.app/',
      featured: true,
      order: 3,
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'DOM Manipulation'],
    },
    {
      slug: 'clearing-the-clutter',
      title: 'Clearing the Clutter — Automated File Organizer',
      subtitle: 'Automated File System Cleaner & Intelligent Directory Sorting Engine',
      category: 'Backend',
      description: 'An automated file system management utility that organizes messy directories by scanning file extensions, resolving name collisions, and automatically distributing files into organized categories.',
      problem: 'Unorganized download folders and file directories accumulate redundant clutter, wasting storage space and causing difficulty locating important assets.',
      solution: 'Created an automated file sorting engine utilizing Node.js file system APIs to recursively categorize and relocate files based on dynamic extension mapping with safe collision avoidance.',
      architecture: 'CLI and Node.js backend utility utilizing Node fs and path modules with asynchronous streaming and error-tolerant file moving protocols.',
      features: JSON.stringify([
        'Automatic extension categorization (images, documents, archives, media, code)',
        'Collision-safe file rename and move handling',
        'Configurable target paths and folder naming rules',
        'Fast batch processing with asynchronous file stream ops',
        'Detailed terminal execution summary report'
      ]),
      imageUrl: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      githubUrl: 'https://github.com/bhumiprasad14/Clearing-the-clutter',
      liveDemoUrl: null,
      featured: false,
      order: 4,
      technologies: ['Node.js', 'JavaScript', 'File System API', 'Automation', 'CLI'],
    },
    // {
    //   slug: 'foodmacros-nutrition-computer-vision',
    //   title: 'FoodMacros — Food Detection & Nutrition Analysis via Deep Learning',
    //   subtitle: 'PyTorch, CNN, Computer Vision, FastAPI, Next.js, PostgreSQL',
    //   category: 'Machine Learning',
    //   description: 'An AI-powered computer vision and dietary intelligence system that identifies food ingredients and multi-item dishes from smartphone photos, calculating precise macro and micro-nutritional breakdowns in real time.',
    //   problem: 'Manual calorie and macronutrient logging has an 82% abandonment rate due to the friction of weighing and searching database entries for composite home-cooked meals.',
    //   solution: 'Trained a Convolutional Neural Network (CNN) transfer-learning model on over 100,000 multi-dish food datasets, achieving 94.2% top-5 categorical accuracy paired with an algorithmic portion-estimation engine.',
    //   architecture: 'PyTorch deep learning model deployed via containerized FastAPI microservice, backed by a USDA nutritional database in PostgreSQL, communicating with a Next.js 14 progressive web app.',
    //   features: JSON.stringify([
    //     'Sub-second food recognition across 350+ multi-ethnic cuisines',
    //     'Dynamic portion volume estimation using spatial depth heuristics',
    //     'Automated macro split (Protein, Carbs, Fats, Fiber, Sodium)',
    //     'Personalized glycemic load and metabolic health scoring',
    //     'Dietary goal tracking with predictive trend forecasting'
    //   ]),
    //   imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    //   bannerUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80',
    //   githubUrl: 'https://github.com/bhumiprasad14/foodmacros-ai',
    //   liveDemoUrl: 'https://foodmacros-demo.vercel.app',
    //   featured: true,
    //   order: 3,
    //   technologies: ['Python', 'PyTorch', 'CNN', 'Deep Learning', 'PostgreSQL', 'Next.js'],
    // },
    // {
    //   slug: 'agriguru-smart-agriculture-ai',
    //   title: 'AgriGuru — Smart Agriculture & Crop Disease Diagnostic System',
    //   subtitle: 'ResNet-50, PyTorch, Node.js, Express, PostgreSQL, Tailwind CSS',
    //   category: 'AI / GenAI',
    //   description: 'An intelligent agricultural advisory platform providing smallholder farmers with immediate crop pathology diagnosis from leaf photographs, hyper-local weather alerts, and organic soil rehabilitation protocols.',
    //   problem: 'Crop diseases cause up to 40% annual yield loss globally because smallholder farmers lack immediate access to certified agronomists and diagnostic laboratories.',
    //   solution: 'Implemented a lightweight ResNet convolutional model optimized for mobile edge inference, capable of classifying 38 distinct plant diseases across 14 commercial crop varieties with high precision.',
    //   architecture: 'Edge-optimized ONNX model runtime, Node.js / Express microservice orchestrator, PostgreSQL geographic database, and responsive mobile-first web app with multilingual offline fallback.',
    //   features: JSON.stringify([
    //     'Offline-capable plant pathology classifier with 96.1% validation accuracy',
    //     'Natural-language organic treatment protocols in regional dialects',
    //     'Micro-climate humidity and rainfall forecasting advisory',
    //     'Fertilizer ratio calculator based on soil pH inputs',
    //     'Community farmer forum with geotagged disease outbreak maps'
    //   ]),
    //   imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    //   bannerUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80',
    //   githubUrl: 'https://github.com/bhumiprasad14/agriguru-platform',
    //   liveDemoUrl: 'https://agriguru-demo.vercel.app',
    //   featured: true,
    //   order: 4,
    //   technologies: ['PyTorch', 'CNN', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    // },
    // {
    //   slug: 'citizen-registration-system',
    //   title: 'Citizen Registration System — Secure Government Identification Portal',
    //   subtitle: 'Java, Spring Boot, Spring Security, PostgreSQL, JWT, BCrypt',
    //   category: 'Backend',
    //   description: 'A high-integrity public sector citizen identity and welfare registration portal engineered with strict role-based access control, encrypted document verification, immutable audit trails, and automated eligibility evaluation.',
    //   problem: 'Public administration portals suffer from security vulnerabilities, duplicate biometric identities, and lack of transparent audit trails for welfare disbursements.',
    //   solution: 'Architected a resilient Spring Boot backend with layered security, AES-256 encrypted personal identifiable information (PII) at rest, and audit logging for every administrative query.',
    //   architecture: 'Spring Boot 3, Spring Security with stateless JWT + Redis token blacklisting, PostgreSQL with partition tables, and Docker containerized deployment.',
    //   features: JSON.stringify([
    //     'Zero-trust role-based authorization (Citizen, Officer, Auditor, SuperAdmin)',
    //     'Immutable event audit logging for tamper-evident compliance',
    //     'Automated document verification against national registry mocks',
    //     'Encrypted PII storage with automated GDPR/DPDP compliant data masking',
    //     'High-concurrency batch query throughput exceeding 3,500 req/sec'
    //   ]),
    //   imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    //   bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    //   githubUrl: 'https://github.com/bhumiprasad14/citizen-registration-system',
    //   liveDemoUrl: 'https://citizen-portal-demo.vercel.app',
    //   featured: false,
    //   order: 5,
    //   technologies: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'Docker'],
    // },
    // {
    //   slug: 'ai-email-writer-copilot',
    //   title: 'AI Email Writer & Smart Executive Communication Copilot',
    //   subtitle: 'Next.js 14, TypeScript, OpenAI/Gemini API, Tailwind CSS, PostgreSQL',
    //   category: 'AI / GenAI',
    //   description: 'An executive email generation copilot that converts brief thoughts, bullet points, or customer scenarios into polished, tone-adjusted professional email drafts with one-click follow-up sequences.',
    //   problem: 'Knowledge workers spend an estimated 2.6 hours per day writing and revising routine correspondence, leading to cognitive fatigue and slower project velocity.',
    //   solution: 'Engineered an interactive Next.js application leveraging streaming LLM responses with custom prompt templates across 12 distinct professional tones (Formal, Persuasive, Conciliatory, Urgent).',
    //   architecture: 'Next.js App Router, React Server Actions, Vercel AI SDK with Google Gemini 1.5 streaming, PostgreSQL for user tone preference profiles.',
    //   features: JSON.stringify([
    //     'Real-time streaming text generation with ultra-low latency',
    //     '12 one-click tone transforms ranging from C-suite to empathetic customer support',
    //     'Automated subject line A/B testing recommendation matrix',
    //     'Thread reply synthesizer analyzing email chains for concise rebuttals',
    //     'Browser clipboard and direct mailto client dispatch'
    //   ]),
    //   imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80',
    //   bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    //   githubUrl: 'https://github.com/bhumiprasad14/ai-email-writer',
    //   liveDemoUrl: 'https://ai-email-writer-demo.vercel.app',
    //   featured: false,
    //   order: 6,
    //   technologies: ['Next.js', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'PostgreSQL'],
    // },
  ];

  for (const proj of projects) {
    const { technologies, ...projData } = proj;
    const createdProject = await prisma.project.upsert({
      where: { slug: proj.slug },
      update: projData,
      create: projData,
    });

    // Remove existing technologies and re-link
    await prisma.projectTechnology.deleteMany({ where: { projectId: createdProject.id } });
    for (const techName of technologies) {
      await prisma.projectTechnology.create({
        data: {
          projectId: createdProject.id,
          name: techName,
        },
      });
    }
  }
  console.log('✓ Projects and technologies seeded');

  // 7. Seed Experience (Real Data from Bhumi Prasad's Resume!)
  const experiences = [
    {
      company: 'National Informatics Centre (NIC)',
      position: 'Full Stack Development Intern',
      location: 'Government of India | On-site',
      type: 'Internship',
      startDate: 'Jul 2026',
      endDate: 'Present',
      isCurrent: true,
      description: 'Actively contributing to the production architecture of a live Dearness Allowance (DA) Management System for public sector employee administration.',
      responsibilities: JSON.stringify([
        'Engineered and optimized secure RESTful APIs and backend micro-modules using ASP.NET Core, C#, Entity Framework Core, and PostgreSQL.',
        'Implemented strict stateless JWT Authentication, role-based authorization gates, and data protection policies.',
        'Developed and refined high-performance Angular frontend modules to provide intuitive, accessible interfaces for administrative officers.',
        'Seamlessly integrated frontend client states with backend REST APIs, reducing payload latency and standardizing error handling.'
      ]),
      technologies: 'ASP.NET Core, C#, Entity Framework Core, PostgreSQL, JWT Authentication, Angular, RESTful APIs',
      order: 1,
    },
    {
      company: 'ARMB',
      position: 'Full Stack Development Intern',
      location: 'Kolkata, India',
      type: 'Internship',
      startDate: 'Feb 2026',
      endDate: 'Jul 2026',
      isCurrent: false,
      description: 'Engineered mission-critical backend microservices and database modules for an integrated College ERP Portal in an Agile engineering team.',
      responsibilities: JSON.stringify([
        'Architected and implemented enterprise backend services using Java, Spring Boot, PostgreSQL, and RESTful APIs.',
        'Designed normalized relational schemas and optimized transactional database procedures to manage high-throughput student enrollment records.',
        'Collaborated cross-functionally with frontend mobile engineers to integrate backend APIs with a React Native application.',
        'Participated in daily Agile scrums, bi-weekly sprint planning, and thorough code reviews ensuring high code quality standards.'
      ]),
      technologies: 'Java, Spring Boot, PostgreSQL, REST APIs, React Native, Agile/Scrum, Git',
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: exp,
    });
  }
  console.log('✓ Work experiences seeded');

  // 8. Seed Education (Real Data from Bhumi Prasad's Resume!)
  const educations = [
    {
      institution: 'MCKV Institute of Engineering',
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Computer Science and Engineering (CSE)',
      score: 'Current YGPA: 9.7 / 10.0',
      startYear: '2023',
      endYear: '2027 (Expected)',
      isCurrent: true,
      achievements: JSON.stringify([
        'Ranked among the top percentile of the department with an outstanding 9.7 YGPA.',
        'Active technical member of IEEE Student Chapter.',
        // 'Key organizer of campus hackathons and algorithmic coding challenges.'
      ]),
      order: 1,
    },
    {
      institution: 'Agrasain Balika Siksha Sadan',
      degree: 'Higher Secondary Education (Class 12th ISC)',
      specialization: 'Science (Computer Science, Physics, Chemistry, Mathematics)',
      score: '96.2%',
      startYear: '2021',
      endYear: '2023',
      isCurrent: false,
      achievements: JSON.stringify([
        'Distinction in Computer Science with 96.2% aggregate.',
        'Awarded Academic Excellence Certificate.'
      ]),
      order: 2,
    },
    {
      institution: 'Agrasain Balika Siksha Sadan',
      degree: 'Secondary Education (Class 10th ICSE)',
      specialization: 'General Sciences & Mathematics',
      score: '95.7%',
      startYear: '2019',
      endYear: '2021',
      isCurrent: false,
      achievements: JSON.stringify([
        'Secured 95.7% overall score with highest marks in Mathematics and Science subjects.'
      ]),
      order: 3,
    },
  ];

  for (const edu of educations) {
    await prisma.education.create({
      data: edu,
    });
  }
  console.log('✓ Education entries seeded');

  // 9. Seed Achievements & Certifications (From Resume!)
  const certifications = [
    {
      title: 'HexaFalls Hackathon — Finalist & Team Lead (Justicia.ai)',
      issuer: 'HexaFalls Hackathon 2025',
      issueDate: '2025',
      // credentialId: 'HEXA-2025-QC',
      // credentialUrl: 'https://github.com/bhumiprasad14',
      description: 'Spearheaded Team Quard Crypt over an intensive 32-hour hackathon to architect Justicia.ai, an AI-powered legal-tech platform designed to simplify case research and statutory indexing for practitioners.',
      skills: 'Generative AI, Spring Boot, React, NLP, Team Leadership',
      order: 1,
    },
    {
      title: 'IEEE Professional Membership (College Referral)',
      issuer: 'Institute of Electrical and Electronics Engineers (IEEE)',
      issueDate: '2025',
      // credentialId: 'IEEE-MEM-99214',
      // credentialUrl: 'https://ieee.org',
      description: 'Globally recognized professional association membership received through college institutional referral for academic excellence and technical contribution.',
      skills: 'Computer Science, Research, Emerging Technologies',
      order: 2,
    },
    {
      title: 'ENIGMA Technical Symposium — 3rd Position Winner',
      issuer: 'MCKV Technical Society',
      issueDate: '2024 & 2025',
      // credentialId: 'ENIGMA-PODIUM-03',
      // credentialUrl: 'https://github.com/bhumiprasad14',
      description: 'Secured 3rd position consecutively in a premier college-level technical championship, competing across rigorous rounds of algorithmic problem solving, rapid prototyping, and technical debugging.',
      skills: 'Data Structures, Algorithms, Problem Solving, Rapid Prototyping',
      order: 3,
    },
    {
      title: 'Oracle Certified Java Foundations Associate',
      issuer: 'Oracle University',
      issueDate: '2024',
      // credentialId: 'ORCL-JAVA-88129',
      // credentialUrl: 'https://oracle.com',
      description: 'Comprehensive certification verifying strong mastery of object-oriented programming, data structures, JVM memory models, and exception handling in Java.',
      skills: 'Java, OOP, Multithreading, JVM Architecture',
      order: 4,
    },
  ];

  for (const cert of certifications) {
    await prisma.certification.create({
      data: cert,
    });
  }
  console.log('✓ Certifications and achievements seeded');

  console.log('--- Database Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
