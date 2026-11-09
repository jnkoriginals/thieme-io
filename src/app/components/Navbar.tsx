"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/translations";

const navLabels: Record<Lang, { experience: string; projects: string; skills: string; contact: string }> = {
    de: { experience: "Erfahrung", projects: "Projekte", skills: "Skills", contact: "Kontakt" },
    en: { experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
};

const SECTION_IDS = ["projects", "experience", "skills", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

const PRESSABLE = "hover:bg-white/10 active:bg-white/20";

const GLASS =
    "bg-zinc-800/55 ring-1 ring-white/15 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.45)]";

export function Navbar({ lang }: { lang: Lang }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    // On the page with the large portrait, HeroAvatar drives this while scrolling.
    const heroPage = pathname === `/${lang}`;
    const avatarProgress = `var(--avatar-progress, ${heroPage ? 0 : 1})`;

    const isHome = pathname === `/${lang}`;
    const sectionPrefix = isHome ? "" : `/${lang}`;

    const labels = navLabels[lang];
    // In page order, so the active marker only ever moves to a neighbour.
    const navLinks = SECTION_IDS.map((id) => ({
        id,
        href: `${sectionPrefix}#${id}`,
        label: labels[id],
    }));

    const [activeId, setActiveId] = useState<SectionId | null>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const [marker, setMarker] = useState({ left: 0, width: 0 });

    // The active section is the last one whose top has passed this line.
    useEffect(() => {
        if (!isHome) {
            setActiveId(null);
            return;
        }
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.35;
            let current: SectionId | null = null;
            for (const id of SECTION_IDS) {
                const section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= line) {
                    current = id;
                }
            }
            setActiveId(current);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [isHome]);

    useLayoutEffect(() => {
        const measure = () => {
            const link = linksRef.current?.querySelector<HTMLElement>(
                `[data-section="${activeId}"]`
            );
            if (link) {
                setMarker({ left: link.offsetLeft, width: link.offsetWidth });
            }
        };
        measure();
        window.addEventListener("resize", measure);
        void document.fonts?.ready.then(measure);
        return () => window.removeEventListener("resize", measure);
    }, [activeId, lang]);
    const otherLang: Lang = lang === "de" ? "en" : "de";
    const otherLangHref = `/${otherLang}${pathname?.replace(new RegExp(`^/${lang}`), "") ?? ""}`;

    return (
        <header className="fixed inset-x-0 top-3 z-50 px-3">
            <nav className="mx-auto grid h-14 max-w-3xl grid-cols-[1fr_auto] items-stretch gap-2 md:grid-cols-[1fr_auto_1fr]">
                <Link
                    href={`/${lang}`}
                    className={`flex items-center justify-self-start rounded-full pr-5 text-[15px] font-bold tracking-[-0.02em] text-zinc-50 transition-colors ${GLASS} hover:bg-zinc-700/60 active:bg-zinc-600/60`}
                    style={{ paddingLeft: `calc(20px - 12px * ${avatarProgress})` }}
                >
                    <span
                        className="shrink-0 overflow-hidden"
                        style={{ width: `calc(50px * ${avatarProgress})` }}
                    >
                        {!heroPage && (
                            <Image
                                src="/avatar.png"
                                alt=""
                                width={64}
                                height={64}
                                className="h-10 w-10 max-w-none rounded-full object-cover"
                            />
                        )}
                    </span>
                    Jannik Thieme
                </Link>

                {/* Desktop links */}
                <div
                    ref={linksRef}
                    className={`relative hidden md:flex items-center rounded-full px-2 ${GLASS}`}
                >
                    <span
                        aria-hidden="true"
                        className={`absolute top-2 bottom-2 rounded-full bg-white/15 transition-[left,width,opacity] duration-300 ease-out motion-reduce:transition-none ${activeId ? "opacity-100" : "opacity-0"}`}
                        style={{ left: marker.left, width: marker.width }}
                    />
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            data-section={link.id}
                            aria-current={activeId === link.id ? "location" : undefined}
                            className={`relative rounded-full px-4 py-2 text-[15px] transition-colors hover:text-white ${activeId === link.id ? "text-white" : `text-zinc-300 ${PRESSABLE}`}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className={`flex items-center justify-self-end gap-1 rounded-full px-2 md:w-14 md:justify-center md:px-0 ${GLASS}`}>
                    {/* Language switcher */}
                    <Link
                        href={otherLangHref}
                        className={`text-sm font-medium text-zinc-200 hover:text-white transition-colors px-3 py-1.5 rounded-full ${PRESSABLE} md:flex md:h-full md:w-full md:items-center md:justify-center md:p-0`}
                        aria-label={lang === "de" ? "Zu Englisch wechseln" : "Switch to German"}
                    >
                        {otherLang.toUpperCase()}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className={`md:hidden p-2 rounded-full transition-colors ${PRESSABLE}`}
                        aria-label={lang === "de" ? "Menü öffnen oder schließen" : "Toggle menu"}
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
                <div className={`md:hidden mx-auto mt-2 max-w-3xl rounded-3xl ${GLASS}`}>
                    <div className="px-5 py-3 flex flex-col">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                aria-current={activeId === link.id ? "location" : undefined}
                                className={`text-base hover:text-zinc-50 transition-colors py-2.5 ${activeId === link.id ? "font-medium text-white" : "text-zinc-300"}`}
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
