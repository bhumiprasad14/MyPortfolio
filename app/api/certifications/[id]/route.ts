import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { CertificationSchema } from '@/lib/validations/schemas';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const validated = CertificationSchema.partial().safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.certification.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Certification PUT error:', error);
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.certification.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    console.error('Certification DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
