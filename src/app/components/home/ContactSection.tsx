"use client";

import { useState, type FormEvent } from "react";
import { translations, type Lang } from "@/lib/translations";
import { BODY, SHELL, TITLE } from "./designTokens";

const fieldClass =
    "w-full border-0 bg-transparent px-5 py-4 text-base text-zinc-100 placeholder-zinc-400 outline-none focus-visible:outline-none";

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
            className={`${SHELL} grid scroll-mt-24 gap-8`}
        >
            <div>
            <h2 className={TITLE}>
                {text.heading}
            </h2>
            <p className={`mt-4 ${BODY}`}>
                {text.subtext}{" "}
                <a
                    href='https://www.linkedin.com/in/jannik-thieme-51878a354/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-indigo-400 transition-colors hover:text-indigo-300'
                >
                    LinkedIn ↗
                </a>
            </p>
            </div>
            <form onSubmit={submit} className='overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 transition-shadow focus-within:ring-white/30'>
                <div className='grid divide-y divide-white/10 border-b border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0'>
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
                <div className='flex items-center justify-end gap-4 px-3 pb-3'>
                    <button
                        type='submit'
                        disabled={
                            status === "loading" || status === "success"
                        }
                        className='order-2 rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-80 disabled:opacity-50'
                    >
                        {status === "loading"
                            ? text.sending
                            : status === "success"
                              ? text.sent
                              : `${text.send} →`}
                    </button>
                    {status === "error" && (
                        <p role='alert' className='order-1 mr-auto pl-2 text-sm text-red-400'>{text.error}</p>
                    )}
                </div>
            </form>
        </section>
    );
}
