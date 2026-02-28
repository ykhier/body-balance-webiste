// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function validate(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length < 2)
    return "יש להזין שם מלא (לפחות 2 תווים).";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "יש להזין כתובת אימייל תקינה.";
  if (!data.phone || !/^[\d\+\-\s]{7,15}$/.test(data.phone))
    return "יש להזין מספר טלפון תקין.";
  if (!data.message || data.message.trim().length < 10)
    return "ההודעה קצרה מדי (לפחות 10 תווים).";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const data: ContactFormData = await req.json();

    const validationError = validate(data);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        message: data.message.trim(),
      },
    });

    // Send email (best-effort)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          tls: { rejectUnauthorized: false },
        });

        const toEmail = process.env.CONTACT_TO_EMAIL || "braahkhier@gmail.com";
        await transporter.sendMail({
          from: `"Body Balance אתר " <${process.env.SMTP_USER}>`,
          to: toEmail,
          replyTo: data.email,
          subject: `פנייה חדשה מהאתר: ${data.name}`,
          text: `שם: ${data.name}\nאימייל: ${data.email}\nטלפון: ${data.phone}\n\nהודעה:\n${data.message}`,
          html: `<div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#edf4f0;border-radius:16px;padding:32px;"><h2 style="color:#4E8B6E;">פנייה חדשה מהאתר</h2><table style="width:100%;border-collapse:collapse;"><tr><td style="padding:8px;font-weight:bold;">שם:</td><td style="padding:8px;">${data.name}</td></tr><tr style="background:#f5faf7;"><td style="padding:8px;font-weight:bold;">אימייל:</td><td style="padding:8px;">${data.email}</td></tr><tr><td style="padding:8px;font-weight:bold;">טלפון:</td><td style="padding:8px;">${data.phone}</td></tr><tr style="background:#f5faf7;"><td style="padding:8px;font-weight:bold;vertical-align:top;">הודעה:</td><td style="padding:8px;white-space:pre-wrap;">${data.message}</td></tr></table></div>`,
        });
      } catch (emailErr) {
        console.error("Email send error (non-fatal):", emailErr);
      }
    } else {
      console.log("📧 [DEV] Saved to DB:", data.name, data.email);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "אירעה שגיאה בשליחת ההודעה. נסה/י שוב מאוחר יותר." },
      { status: 500 }
    );
  }
}