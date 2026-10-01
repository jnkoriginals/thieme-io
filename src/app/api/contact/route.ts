import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

    // Honeypot filled in → bot. Pretend success so it doesn't retry.
    if (typeof website === "string" && website.length > 0) {
        return NextResponse.json({ success: true });
    }

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !message.trim() ||
        name.length > 100 ||
        email.length > 200 ||
        message.length > 5000 ||
        !EMAIL_RE.test(email)
    ) {
        return NextResponse.json({ error: "Alle Felder erforderlich." }, { status: 400 });
    }

    const cleanName = name.replace(/[\r\n]+/g, " ").trim();

    try {
        const { error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL!,
            replyTo: email,
            subject: `Neue Nachricht von ${cleanName}`,
            text: `Name: ${cleanName}\nE-Mail: ${email}\n\n${message}`,
        });
        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Fehler beim Senden." }, { status: 500 });
    }
}
