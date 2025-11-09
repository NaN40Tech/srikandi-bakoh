import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json(); // <-- product dihapus

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, msg: "All fields are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: `${name} <${email}>`,
      to: process.env.EMAIL_TO,
      subject: subject || "New Contact Message",
      text: message,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({
      success: true,
      msg: "Message sent successfully!",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, msg: "Error sending message." },
      { status: 500 }
    );
  }
}
