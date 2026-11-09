"use client";
import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/translations";

const navLabels: Record<Lang, { experience: string; projects: string; skills: string; contact: string }> = {
    de: { experience: "Erfahrung", projects: "Projekte", skills: "Skills", contact: "Kontakt" },
    en: { experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
};

export function Navbar({ lang }: { lang: Lang }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    // On the page with the large portrait, HeroAvatar drives this while scrolling.
    const heroPage = pathname === `/${lang}/preview`;
    const avatarProgress = `var(--avatar-progress, ${heroPage ? 0 : 1})`;

    const isHome = pathname === `/${lang}` || pathname === `/${lang}/preview`;
    const sectionPrefix = isHome ? "" : `/${lang}`;

    const labels = navLabels[lang];
    const navLinks = [
        { href: `${sectionPrefix}#experience`, label: labels.experience },
        { href: `${sectionPrefix}#projects`, label: labels.projects },
        { href: `${sectionPrefix}#skills`, label: labels.skills },
        { href: `${sectionPrefix}#contact`, label: labels.contact },
    ];
    const otherLang: Lang = lang === "de" ? "en" : "de";
    const otherLangHref = `/${otherLang}${pathname?.replace(new RegExp(`^/${lang}`), "") ?? ""}`;

    return (
        <header className="fixed inset-x-0 top-3 z-50 px-3">
            <nav
                className="mx-auto flex h-12 max-w-3xl items-center justify-between rounded-full pr-3 bg-zinc-800/55 ring-1 ring-white/15 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.45)]"
                style={{ paddingLeft: `calc(20px - 12px * ${avatarProgress})` }}
            >
                <Link href={`/${lang}`} className="flex items-center text-sm font-bold tracking-[-0.02em] text-zinc-50">
                    <span
                        className="shrink-0 overflow-hidden"
                        style={{ width: `calc(42px * ${avatarProgress})` }}
                    >
                        {!heroPage && (
                            <Image
                                src="/avatar.png"
                                alt=""
                                width={64}
                                height={64}
                                className="h-8 w-8 max-w-none rounded-full object-cover"
                            />
                        )}
                    </span>
                    Jannik Thieme
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-zinc-200 hover:text-white transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* Language switcher */}
                    <Link
                        href={otherLangHref}
                        className="text-xs font-medium text-zinc-200 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-800"
                        aria-label={`Switch to ${otherLang === "en" ? "English" : "Deutsch"}`}
                    >
                        {otherLang.toUpperCase()}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="md:hidden p-2 rounded-full hover:bg-zinc-800 transition-colors"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <HiXMark className="w-5 h-5" />
                        ) : (
                            <HiBars3 className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden mx-auto mt-2 max-w-3xl rounded-3xl bg-zinc-800/55 ring-1 ring-white/15 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.45)]">
                    <div className="px-5 py-3 flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-base text-zinc-300 hover:text-zinc-50 transition-colors py-2.5"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
