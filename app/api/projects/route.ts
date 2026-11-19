import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { ProjectSchema } from '@/lib/validations/schemas';

// GET /api/projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const admin = searchParams.get('admin');

    const session = getSessionFromRequest(request);
    const isAdmin = Boolean(session);

    // If not admin, only return published projects
    const where: any = {};
    if (!isAdmin || admin !== 'true') {
      where.published = true;
    }
    if (category && category !== 'All') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      include: {
        technologies: true,
      },
    });

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST /api/projects (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = ProjectSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const { technologies, ...projectData } = validated.data;

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: projectData.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        ...projectData,
        technologies: technologies && technologies.length > 0 ? {
          create: technologies.map((name) => ({ name })),
        } : undefined,
      },
      include: {
        technologies: true,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
