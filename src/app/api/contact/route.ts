import { createHash, randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16_000;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

type Inquiry = {
  fullName: string;
  email: string;
  phone?: string;
  projectType?: string;
  estimatedBudget?: string;
  timeline?: string;
  message: string;
  website?: string;
};

function clientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const raw = forwardedFor || request.headers.get('x-real-ip') || 'unknown';
  return createHash('sha256').update(raw).digest('hex');
}

function isRateLimited(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    requestBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    console.error('SMTP delivery is not configured');
    return NextResponse.json(
      { error: 'Contact service unavailable', message: 'Please contact the studio by phone or email.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'Please wait a minute before trying again.' },
      { status: 429, headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const raw = (await request.json()) as Partial<Inquiry>;
    if (raw.website) {
      return NextResponse.json({ status: 202 }, { status: 202 });
    }

    const inquiry: Inquiry = {
      fullName: singleLine(clean(raw.fullName, 120)),
      email: clean(raw.email, 254).toLowerCase(),
      phone: singleLine(clean(raw.phone, 40)),
      projectType: singleLine(clean(raw.projectType, 100)),
      estimatedBudget: singleLine(clean(raw.estimatedBudget, 100)),
      timeline: singleLine(clean(raw.timeline, 100)),
      message: clean(raw.message, 5_000),
    };

    const errors: string[] = [];
    if (inquiry.fullName.length < 2) errors.push('Please enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) errors.push('Please enter a valid email address.');
    if (inquiry.message.length < 10) errors.push('Please provide a project brief of at least 10 characters.');

    if (errors.length) {
      return NextResponse.json(
        { error: 'Validation failed', message: errors.join(' ') },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const ticketId = `AURA-${randomUUID().split('-')[0].toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: smtpPort,
      secure: process.env.SMTP_SECURE !== 'false' && smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 12_000,
      tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
    });

    const text = [
      `New AURA project inquiry (${ticketId})`,
      '',
      `Name: ${inquiry.fullName}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || 'Not provided'}`,
      `Project type: ${inquiry.projectType || 'Not provided'}`,
      `Estimated budget: ${inquiry.estimatedBudget || 'Not provided'}`,
      `Timeline: ${inquiry.timeline || 'Not provided'}`,
      `Submitted: ${submittedAt}`,
      '',
      'Project brief:',
      inquiry.message,
    ].join('\n');

    await transporter.sendMail({
      from: { name: 'AURA Website', address: smtpUser },
      to: process.env.SMTP_TO || smtpUser,
      replyTo: { name: inquiry.fullName, address: inquiry.email },
      subject: `[${ticketId}] New inquiry from ${inquiry.fullName}`,
      text,
      html: `<h2>New AURA project inquiry</h2>
        <p><strong>Reference:</strong> ${ticketId}</p>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.fullName)}<br>
        <strong>Email:</strong> ${escapeHtml(inquiry.email)}<br>
        <strong>Phone:</strong> ${escapeHtml(inquiry.phone || 'Not provided')}<br>
        <strong>Project type:</strong> ${escapeHtml(inquiry.projectType || 'Not provided')}<br>
        <strong>Estimated budget:</strong> ${escapeHtml(inquiry.estimatedBudget || 'Not provided')}<br>
        <strong>Timeline:</strong> ${escapeHtml(inquiry.timeline || 'Not provided')}<br>
        <strong>Submitted:</strong> ${submittedAt}</p>
        <h3>Project brief</h3>
        <p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`,
    });

    return NextResponse.json(
      { status: 201, message: 'Inquiry received successfully.', ticketId },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Contact submission failed', error);
    return NextResponse.json(
      { error: 'Submission failed', message: 'Please try again or contact the studio directly.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
