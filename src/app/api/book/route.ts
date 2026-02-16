import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, date, time } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 1. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Create Approval Link
    // Encoded parameters for safety
    const params = new URLSearchParams({
      name,
      email,
      date,
      time,
      token: Buffer.from(`${email}-${date}-${time}`).toString("base64"), // Simple token for validation
    });
    const approvalLink = `${baseUrl}/api/confirm-booking?${params.toString()}`;

    // 3. Send Email to Owner (Developer)
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request: 30-min chat with ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #333;">New Booking Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Requested Date:</strong> ${date}</p>
          <p><strong>Requested Time:</strong> ${time}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Click the button below to accept this booking and send a confirmation email to the user.</p>
          <a href="${approvalLink}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Accept Booking
          </a>
        </div>
      `,
    };

    await transporter.sendMail(mailToOwner);

    return NextResponse.json({ message: "Booking request sent" }, { status: 200 });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
