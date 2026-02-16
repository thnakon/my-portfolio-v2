import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Send to Google Sheets (GAS)
    if (process.env.GOOGLE_SHEETS_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_URL, {
          method: "POST",
          body: JSON.stringify({ name, email, message }),
        });
      } catch (err) {
        console.error("Google Sheets Error:", err);
      }
    }

    // 2. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send Email to Owner (Developer)
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name} via Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 4. Send Thank You Email to Sender
    const mailToSender = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for reaching out!",
        text: `Hello ${name},\n\nThank you for your message! I've received it and will get back to you as soon as possible.\n\nBest regards,\nThanakon`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #333;">Hello ${name}!</h2>
            <p>Thank you for reaching out. I've received your message and I'm excited to connect with you.</p>
            <p>I'll review your message and get back to you as soon as I can.</p>
            <br />
            <p>Best regards,</p>
            <p><strong>Thanakon</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">This is an automated response to confirm I've received your inquiry.</p>
          </div>
        `,
      };

    await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
