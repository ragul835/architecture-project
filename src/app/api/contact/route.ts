import { createHash, randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { InquiryPayload } from '@/lib/types';

export const runtime = 'nodejs';
const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 20_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

function value(input: unknown, max: number) { return typeof input === 'string' ? input.trim().slice(0, max) : ''; }
function line(input: unknown, max: number) { return value(input, max).replace(/[\r\n\t]+/g, ' '); }
function html(input: string) { return input.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char] || char)); }
function clientKey(request: Request) { const address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'; return createHash('sha256').update(address).digest('hex'); }
function limited(key: string) { const now = Date.now(); const current = buckets.get(key); if (!current || current.resetAt <= now) { buckets.set(key, { count: 1, resetAt: now + WINDOW_MS }); return false; } current.count += 1; return current.count > MAX_REQUESTS; }

export async function POST(request: Request) {
  if (limited(clientKey(request))) return NextResponse.json({ message: 'Too many attempts. Please wait ten minutes and try again.' }, { status: 429, headers: { 'Retry-After': '600', 'Cache-Control': 'no-store' } });
  const size = Number(request.headers.get('content-length') || 0);
  if (size > MAX_BODY_BYTES) return NextResponse.json({ message: 'The submitted brief is too large.' }, { status: 413 });
  let raw: Partial<InquiryPayload>;
  try { raw = await request.json() as Partial<InquiryPayload>; } catch { return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 }); }
  if (raw.website) return NextResponse.json({ message: 'Accepted.' }, { status: 202 });
  const data = {
    fullName: line(raw.fullName, 120), phone: line(raw.phone, 20), email: value(raw.email, 254).toLowerCase(),
    preferredContact: line(raw.preferredContact, 20), city: line(raw.city, 80), state: line(raw.state, 80), pinCode: line(raw.pinCode, 6),
    propertyType: line(raw.propertyType, 80), requiredService: line(raw.requiredService, 80), projectStage: line(raw.projectStage, 40), area: line(raw.area, 80),
    budgetRange: line(raw.budgetRange, 80), desiredStartDate: line(raw.desiredStartDate, 20), message: value(raw.message, 5000),
    whatsappConsent: raw.whatsappConsent === true, privacyConsent: raw.privacyConsent === true,
  };
  const errors: string[] = [];
  if (data.fullName.length < 2) errors.push('Enter your full name.');
  if (!/^(?:\+?91[ -]?)?[6-9]\d{9}$/.test(data.phone.replace(/[ -]/g, ''))) errors.push('Enter a valid Indian mobile number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Enter a valid email address.');
  if (data.city.length < 2 || data.state.length < 2) errors.push('Enter the project city and state.');
  if (!/^[1-9][0-9]{5}$/.test(data.pinCode)) errors.push('Enter a valid 6-digit PIN code.');
  if (!['phone', 'email', 'whatsapp'].includes(data.preferredContact)) errors.push('Choose a preferred contact method.');
  if (!['architecture', 'interior-design', 'exterior-design', 'complete'].includes(data.requiredService)) errors.push('Choose a valid service.');
  if (!['new-construction', 'renovation'].includes(data.projectStage)) errors.push('Choose a valid project type.');
  if (data.message.length < 20) errors.push('Provide a project brief of at least 20 characters.');
  if (!data.privacyConsent) errors.push('Privacy consent is required.');
  if (errors.length) return NextResponse.json({ message: errors.join(' ') }, { status: 400, headers: { 'Cache-Control': 'no-store' } });

  const ticketId = `AURA-${randomUUID().slice(0, 8).toUpperCase()}`;
  if (process.env.CONTACT_DRY_RUN === 'true') return NextResponse.json({ message: 'Inquiry accepted in dry-run mode.', ticketId }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  const smtpUser = process.env.SMTP_USER; const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpUser || !smtpPassword) return NextResponse.json({ message: 'The email service is not configured. Please contact the studio by phone or WhatsApp.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const rows = [
    ['Name', data.fullName], ['Phone', data.phone], ['Email', data.email], ['Preferred contact', data.preferredContact],
    ['Location', `${data.city}, ${data.state} ${data.pinCode}`], ['Property type', data.propertyType], ['Service', data.requiredService],
    ['Project type', data.projectStage], ['Area', data.area || 'Not provided'], ['Budget', data.budgetRange || 'Not provided'],
    ['Desired start', data.desiredStartDate || 'Not provided'], ['WhatsApp consent', data.whatsappConsent ? 'Yes' : 'No'],
  ] as const;
  try {
    const port = Number(process.env.SMTP_PORT || 465);
    const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.zoho.com', port, secure: process.env.SMTP_SECURE !== 'false' && port === 465, auth: { user: smtpUser, pass: smtpPassword }, connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000, tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true } });
    await transport.sendMail({ from: { name: 'AURA website', address: smtpUser }, to: process.env.SMTP_TO || smtpUser, replyTo: { name: data.fullName, address: data.email }, subject: `[${ticketId}] ${data.requiredService} enquiry from ${data.city}`, text: [`New project enquiry (${ticketId})`, '', ...rows.map(([key, item]) => `${key}: ${item}`), '', 'Brief:', data.message].join('\n'), html: `<h2>New project enquiry</h2><p><strong>Reference:</strong> ${ticketId}</p>${rows.map(([key, item]) => `<p><strong>${html(key)}:</strong> ${html(item)}</p>`).join('')}<h3>Brief</h3><p>${html(data.message).replace(/\n/g, '<br>')}</p>` });
    return NextResponse.json({ message: 'Inquiry received.', ticketId }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch { console.error('Contact delivery failed'); return NextResponse.json({ message: 'We could not deliver the enquiry. Please use phone or WhatsApp.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } }); }
}
