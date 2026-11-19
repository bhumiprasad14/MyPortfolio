import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionFromRequest } from '@/lib/auth/jwt';
import { ContactMessageSchema } from '@/lib/validations/schemas';

// GET /api/contact (Admin only - fetch messages)
export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.contactMessage.count({
      where: { isRead: false },
    });

    return NextResponse.json({
      success: true,
      unreadCount,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST /api/contact (Public - submit contact form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ContactMessageSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid message data', details: validated.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validated.data;

    // Basic spam filter check
    const spamWords = ['buy cheap crypto', 'casino online', 'viagra', 'seo ranking blast'];
    const lowerMessage = (subject + ' ' + message).toLowerCase();
    const isSpam = spamWords.some((w) => lowerMessage.includes(w));

    const contactEntry = await prisma.contactMessage.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        subject,
        message,
        isSpam,
      },
    });

    // Optional email dispatch via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_NOTIFICATION_EMAIL || 'prasad14bhumi@gmail.com',
            subject: `[Portfolio Inquiry] ${subject} from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });
      } catch (err) {
        console.warn('Resend notification skipped/failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: { id: contactEntry.id },
    }, { status: 201 });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
