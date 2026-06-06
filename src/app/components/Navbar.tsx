"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navLinks = [
    { href: "#experience", label: "Erfahrung" },
    { href: "#projects", label: "Projekte" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Kontakt" },
];

export function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
            <nav className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 h-14 flex items-center justify-between">
                <a href="#" className="text-sm font-semibold tracking-tight">
                    Jannik Thieme
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            resolvedTheme === "dark" ? (
                                <HiSun className="w-4 h-4" />
                            ) : (
                                <HiMoon className="w-4 h-4" />
                            )
                        ) : (
                            <div className="w-4 h-4" />
                        )}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <HiXMark className="w-4 h-4" />
                        ) : (
                            <HiBars3 className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
                    <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-1"
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
