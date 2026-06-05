import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Alle Felder erforderlich." }, { status: 400 });
    }

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            replyTo: email,
            subject: `Neue Nachricht von ${name}`,
            text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Fehler beim Senden." }, { status: 500 });
    }
}
