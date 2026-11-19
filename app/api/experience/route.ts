import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { ExperienceSchema } from '@/lib/validations/schemas';

// GET /api/experience
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ isCurrent: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    console.error('Experience GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

// POST /api/experience (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = ExperienceSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: experience }, { status: 201 });
  } catch (error) {
    console.error('Experience POST error:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
