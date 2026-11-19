import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { EducationSchema } from '@/lib/validations/schemas';

// GET /api/education
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: [{ isCurrent: 'desc' }, { order: 'asc' }, { startYear: 'desc' }],
    });
    return NextResponse.json({ success: true, count: education.length, data: education });
  } catch (error) {
    console.error('Education GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

// POST /api/education (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = EducationSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const item = await prisma.education.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('Education POST error:', error);
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
  }
}
