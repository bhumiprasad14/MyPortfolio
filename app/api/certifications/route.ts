import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { CertificationSchema } from '@/lib/validations/schemas';

// GET /api/certifications
export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: [{ order: 'asc' }, { issueDate: 'desc' }],
    });
    return NextResponse.json({ success: true, count: certifications.length, data: certifications });
  } catch (error) {
    console.error('Certifications GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

// POST /api/certifications (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = CertificationSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const cert = await prisma.certification.create({
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: cert }, { status: 201 });
  } catch (error) {
    console.error('Certification POST error:', error);
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
  }
}
