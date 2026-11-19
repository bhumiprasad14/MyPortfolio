const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addProjects() {
  const p1 = await prisma.project.upsert({
    where: { slug: 'quiz-app' },
    update: {
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
      liveDemoUrl: null,
      featured: true,
      order: 3,
      published: true
    },
    create: {
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
      liveDemoUrl: null,
      featured: true,
      order: 3,
      published: true
    }
  });

  await prisma.projectTechnology.deleteMany({ where: { projectId: p1.id } });
  for (const tech of ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'DOM Manipulation']) {
    await prisma.projectTechnology.create({ data: { projectId: p1.id, name: tech } });
  }

  const p2 = await prisma.project.upsert({
    where: { slug: 'clearing-the-clutter' },
    update: {
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
      published: true
    },
    create: {
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
      published: true
    }
  });

  await prisma.projectTechnology.deleteMany({ where: { projectId: p2.id } });
  for (const tech of ['Node.js', 'JavaScript', 'File System API', 'Automation', 'CLI']) {
    await prisma.projectTechnology.create({ data: { projectId: p2.id, name: tech } });
  }

  console.log('✓ Successfully added Quiz-App and Clearing-the-clutter to DB!');
}

addProjects()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
