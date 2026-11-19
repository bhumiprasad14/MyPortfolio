import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Bhumi Prasad — Software Engineer & 3D Interactive Portfolio',
  description:
    'Official portfolio of Bhumi Prasad, Software Engineer specializing in Java, Spring Boot, PostgreSQL, Next.js, and Machine Learning. High-concurrency systems and full-stack solutions.',
  keywords: [
    'Bhumi Prasad',
    'Software Engineer',
    'Backend Developer',
    'Spring Boot',
    'PostgreSQL',
    'Full Stack Developer',
    'Machine Learning',
    'Java Developer',
    'National Informatics Centre',
    'Next.js 3D Portfolio',
  ],
  authors: [{ name: 'Bhumi Prasad', url: 'https://github.com/bhumiprasad14' }],
  creator: 'Bhumi Prasad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bhumiprasad.dev',
    title: 'Bhumi Prasad — Software Engineer & 3D Interactive Portfolio',
    description:
      'Building Intelligent Systems. Engineering Digital Experiences. Explore production projects, technical skills, and engineering milestones.',
    siteName: 'Bhumi Prasad Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Bhumi Prasad - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhumi Prasad — Software Engineer Portfolio',
    description:
      'Explore production systems, Spring Boot microservices, Next.js frontends, and AI integrations.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bhumi Prasad',
    jobTitle: 'Software Engineer',
    url: 'https://bhumiprasad.dev',
    sameAs: [
      'https://github.com/bhumiprasad14',
      'https://linkedin.com/in/bhumiprasad',
      'https://leetcode.com/u/bhumiprasad14',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'MCKV Institute of Engineering',
    },
    knowsAbout: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'ASP.NET Core',
      'Next.js',
      'Machine Learning',
      'Microservices',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-slate-100 selection:bg-violet-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
