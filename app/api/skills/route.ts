import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { SkillSchema } from '@/lib/validations/schemas';

// GET /api/skills - returns skill categories with nested skills
export async function GET() {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        skills: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Skills GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

// POST /api/skills (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = SkillSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: validated.data,
      include: { category: true },
    });

    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (error) {
    console.error('Skills POST error:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
