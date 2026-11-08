"use client";
import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
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

    const isHome = pathname === `/${lang}`;
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
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
            <nav className="page-shell h-14 flex items-center justify-between">
                <Link href={`/${lang}`} className="text-sm font-bold tracking-[-0.02em] text-zinc-50">
                    Jannik Thieme
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* Language switcher */}
                    <Link
                        href={otherLangHref}
                        className="text-xs font-medium text-zinc-400 hover:text-zinc-50 transition-colors px-2 py-2 rounded-lg hover:bg-zinc-800"
                        aria-label={`Switch to ${otherLang === "en" ? "English" : "Deutsch"}`}
                    >
                        {otherLang.toUpperCase()}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="md:hidden p-2.5 -mr-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
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
                <div className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-md">
                    <div className="page-shell py-3 flex flex-col">
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
