"use client";

import { useState, type FormEvent } from "react";
import { translations, type Lang } from "@/lib/translations";

const fieldClass =
    "w-full rounded-xl border-0 bg-zinc-900 px-4 py-3.5 text-base text-zinc-100 placeholder-zinc-400 outline-none transition-colors hover:bg-zinc-800/70 focus:bg-zinc-800 focus-visible:outline-none";

export function ContactSection({ lang }: { lang: Lang }) {
    const text = translations[lang].contact;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState(""); // honeypot, hidden from humans
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    async function submit(event: FormEvent) {
        event.preventDefault();
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message, website }),
            });
            if (!response.ok) {
                setStatus("error");
                return;
            }
            setStatus("success");
            setName("");
            setMessage("");
        } catch {
            setStatus("error");
        }
    }

    return (
        <section
            id='contact'
            className='mx-auto w-full max-w-3xl scroll-mt-20 px-6 py-14 md:py-20'
        >
            <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100'>
                {text.heading}
            </h2>
            <p className='mt-3 text-lg text-zinc-300'>
                {text.subtext}{" "}
                <a
                    href='https://www.linkedin.com/in/jannik-thieme-51878a354/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-indigo-400 underline underline-offset-4 decoration-1 transition-colors hover:text-indigo-300'
                >
                    LinkedIn ↗
                </a>
            </p>
            <form onSubmit={submit} className='mt-8 flex flex-col gap-3'>
                <div className='flex flex-col gap-3'>
                    <input
                        name='name'
                        type='text'
                        autoComplete='name'
                        aria-label={text.nameLabel}
                        placeholder={text.namePlaceholder}
                        maxLength={100}
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={fieldClass}
                    />
                    <input
                        name='email'
                        type='email'
                        autoComplete='email'
                        aria-label={text.emailLabel}
                        placeholder={text.emailPlaceholder}
                        maxLength={200}
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={fieldClass}
                    />
                </div>
                <textarea
                    name='message'
                    aria-label={text.messageLabel}
                    placeholder={text.messagePlaceholder}
                    maxLength={5000}
                    rows={4}
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={`${fieldClass} resize-none`}
                />
                <input
                    type='text'
                    name='website'
                    tabIndex={-1}
                    autoComplete='off'
                    aria-hidden='true'
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    className='hidden'
                />
                <div className='mt-2 flex items-center gap-4'>
                    <button
                        type='submit'
                        disabled={
                            status === "loading" || status === "success"
                        }
                        className='rounded-full bg-zinc-100 px-6 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-80 disabled:opacity-50'
                    >
                        {status === "loading"
                            ? text.sending
                            : status === "success"
                              ? text.sent
                              : text.send}
                    </button>
                    {status === "error" && (
                        <p className='text-sm text-red-400'>{text.error}</p>
                    )}
                </div>
            </form>
        </section>
    );
}
