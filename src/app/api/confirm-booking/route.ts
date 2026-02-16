import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    const token = searchParams.get("token");

    if (!name || !email || !date || !time || !token) {
      return new NextResponse("Invalid request parameters", { status: 400 });
    }

    // Basic token validation (re-calculating the simple token)
    const expectedToken = Buffer.from(`${email}-${date}-${time}`).toString("base64");
    if (token !== expectedToken) {
      return new NextResponse("Invalid or expired token", { status: 403 });
    }

    // 1. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Send Confirmation Email to User
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Booking Confirmed: 30-minute chat with Thanakon",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #333;">Booking Confirmed! ✅</h2>
          <p>Hello ${name},</p>
          <p>I'm happy to inform you that your booking request has been accepted. I'm looking forward to our chat!</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Appointment Details:</strong></p>
          <p>📅 <strong>Date:</strong> ${date}</p>
          <p>🕒 <strong>Time:</strong> ${time}</p>
          <p>📍 <strong>Location:</strong> Google Meet / Zoom (Link will be sent shortly)</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>See you then!</p>
          <p>Best regards,<br /><strong>Thanakon</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailToUser);

    // 3. Return a success page/message to the developer
    return new NextResponse(`
      <div style="font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
        <h1 style="color: #333;">Booking Confirmed!</h1>
        <p style="color: #666; max-width: 400px;">A confirmation email has been sent to <strong>${name}</strong> (${email}) for <strong>${date} at ${time}</strong>.</p>
        <a href="/" style="margin-top: 30px; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 6px;">Back to Website</a>
      </div>
    `, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Confirmation API Error:", error);
    return new NextResponse("An error occurred while confirming the booking.", { status: 500 });
  }
}
