"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    SiReact,
    SiNextdotjs,
    SiAngular,
    SiTypescript,
    SiTailwindcss,
    SiIonic,
    SiAndroid,
    SiSpring,
    SiPython,
    SiNodedotjs,
    SiDocker,
    SiKubernetes,
    SiGithubactions,
    SiGitlab,
    SiFirebase,
    SiVercel,
    SiStripe,
    SiMysql,
    SiPostgresql,
    SiGooglecloud,
    SiNx,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

type SkillItem = { name: string; icon?: IconType; color?: string };

const skillGroups: { category: string; items: SkillItem[] }[] = [
    {
        category: "Frontend",
        items: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
            { name: "Angular", icon: SiAngular, color: "#DD0031" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        ],
    },
    {
        category: "Mobile",
        items: [
            { name: "Ionic", icon: SiIonic, color: "#3880FF" },
            { name: "React Native", icon: SiReact, color: "#61DAFB" },
            { name: "Android", icon: SiAndroid, color: "#3DDC84" },
            { name: "Capacitor" },
        ],
    },
    {
        category: "Backend",
        items: [
            { name: "Java", icon: FaJava, color: "#F89820" },
            { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        ],
    },
    {
        category: "DevOps & Cloud",
        items: [
            { name: "AWS", icon: FaAws, color: "#FF9900" },
            { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            {
                name: "GitHub Actions",
                icon: SiGithubactions,
                color: "currentColor",
            },
            { name: "GitLab CI", icon: SiGitlab, color: "#FC6D26" },
        ],
    },
];

const projects = [
    {
        name: "Simpli",
        description:
            "SaaS-Plattform für digitale Speisekarten — Restaurants erstellen in Minuten eine QR-Code-Karte, Gäste öffnen sie direkt im Browser ohne App. Mit KI-gestützter Übersetzung in 6 Sprachen, Echtzeit-Updates, Stripe-Abonnements und individuellem QR-Code-Generator.",
        tags: [
            { name: "Next.js 14", icon: SiNextdotjs },
            { name: "React", icon: SiReact },
            { name: "Firebase", icon: SiFirebase },
            { name: "Google Vertex AI", icon: SiGooglecloud },
            { name: "Stripe", icon: SiStripe },
            { name: "NX", icon: SiNx },
            { name: "Vercel", icon: SiVercel },
        ],
        type: "Eigenprojekt",
        logo: {
            light: "/logo-simpli-light.svg",
            dark: "/logo-simpli-dark.svg",
        },
        images: ["/simpli-main.png", "/simpli-dashboard.png"],
        mobile: false,
        url: "https://simpli.menu",
    },
    {
        name: "Torga",
        description:
            "SaaS-Plattform für Handwerksbetriebe — als Soloprojekt entwickelt. Deckt den gesamten Geschäftsprozess ab: von der Erstbesichtigung über Angebote bis zur gesetzeskonformen E-Rechnung (ZUGFeRD / XRechnung). Mit Multi-Tenancy, GPS-Zeiterfassung, Echtzeit-Updates via WebSocket und modularem Feature-Subscription-System.",
        tags: [
            { name: "Java 21", icon: FaJava },
            { name: "Spring Boot 3.5", icon: SiSpring },
            { name: "React 18", icon: SiReact },
            { name: "MySQL", icon: SiMysql },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Docker", icon: SiDocker },
        ],
        type: "Eigenprojekt",
        logo: { light: "/logo-torga.png", dark: "/logo-torga.png" },
        images: ["/torga.png"],
        mobile: false,
    },
    {
        name: "nearby",
        description:
            "Mobile App gegen die Entscheidungslähmung: Statt langer Listen wird immer nur ein Ort angezeigt — per Swipe (wie bei Tinder) weitergehen oder direkt loslaufen. Für Touristen und Einheimische, nativ auf iOS & Android.",
        tags: [
            { name: "Ionic", icon: SiIonic },
            { name: "React", icon: SiReact },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Capacitor" },
        ],
        type: "Studienprojekt",
        logo: { light: "/logo-nearby.svg", dark: "/logo-nearby.svg" },
        images: ["/nearby-1.png", "/nearby-2.png", "/nearby-3.png"],
        mobile: true,
    },
];

const experience = [
    {
        role: "Werkstudent Softwareentwicklung",
        company: "Mercedes-Benz AG",
        period: "aktuell",
        description:
            "Fullstack-Entwicklung einer internen Angular-Anwendung mit Python-Backend. Verantwortlich für den Großteil der DevOps-Infrastruktur: GitHub Actions, AWS (Setup & Betrieb), Docker und Kubernetes.",
        tags: [
            "Angular",
            "Python",
            "AWS",
            "Kubernetes",
            "Docker",
            "GitHub Actions",
        ],
    },
    {
        role: "Pflichtpraktikum",
        company: "Mercedes-Benz AG",
        period: "½ Jahr",
        description:
            "Praktikum im Bereich Softwareentwicklung — direkter Einstieg in die gleiche technische Umgebung, die später zur Werkstudentenstelle geführt hat.",
        tags: ["Angular", "Python", "Docker"],
    },
    {
        role: "Werkstudent Softwareentwicklung",
        company: "IJUNO Business Solutions GmbH",
        period: "2025",
        description:
            "Entwicklung einer automatisierten Lösung zur Migration von Datenbanken in SAP-Systeme. Die Lösung reduziert den manuellen Aufwand signifikant und beschleunigt Migrationsprozesse erheblich.",
        tags: ["SAP Datasphere", "Node.js", "Automatisierung"],
    },
];

export default function Home() {
    return (
        <main className='min-h-screen bg-[--color-background] text-[--color-foreground]'>
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
        </main>
    );
}

function Hero() {
    return (
        <section className='min-h-[100dvh] flex flex-col justify-center pt-14 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-12'>
                <div className='flex-1'>
                    <motion.p
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={0}
                        className='text-xs uppercase tracking-[0.2em] text-neutral-400 mb-8'
                    >
                        Mobile-Medien · HdM Stuttgart
                    </motion.p>
                    <motion.h1
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={1}
                        className='text-6xl md:text-7xl lg:text-[6rem] font-semibold tracking-tight leading-[1.05] mb-8'
                    >
                        Jannik
                        <br />
                        Thieme.
                    </motion.h1>
                    <motion.p
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={2}
                        className='text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-md mb-12 leading-relaxed'
                    >
                        Full-Stack Developer mit Fokus auf Web und Mobile — von
                        der Idee bis zur fertigen App.
                    </motion.p>
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={3}
                        className='flex flex-wrap gap-3'
                    >
                        <a
                            href='#projects'
                            className='px-5 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:opacity-75 transition-opacity'
                        >
                            Projekte
                        </a>
                        <a
                            href='#contact'
                            className='px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-sm font-medium rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors'
                        >
                            Kontakt
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Experience() {
    return (
        <section
            id='experience'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label='Erfahrung' />
            <div className='flex flex-col gap-4'>
                {experience.map((job, i) => (
                    <motion.div
                        key={`${job.company}-${job.role}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: i * 0.05 }}
                        className='border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 md:p-10 bg-white dark:bg-neutral-900/30 shadow-sm'
                    >
                        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4'>
                            <div>
                                <h3 className='text-xl font-semibold'>
                                    {job.role}
                                </h3>
                                <p className='text-neutral-500 dark:text-neutral-400 text-sm mt-1'>
                                    {job.company}
                                </p>
                            </div>
                            <span className='text-xs text-neutral-400 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 rounded-full self-start shrink-0'>
                                {job.period}
                            </span>
                        </div>
                        <p className='text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-2xl mb-6 leading-relaxed'>
                            {job.description}
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {job.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className='text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded-full'
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function Projects() {
    return (
        <section
            id='projects'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label='Projekte' />
            <div className='flex flex-col gap-6'>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        index={i}
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const getIsDark = () =>
            document.documentElement.classList.contains("dark") ||
            (window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDark(getIsDark());

        const obs = new MutationObserver(() => setIsDark(getIsDark()));
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const mql =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)");
        const mqHandler = (e: MediaQueryListEvent | MediaQueryList) =>
            setIsDark((e as any).matches);
        if (mql) {
            if (mql.addEventListener)
                mql.addEventListener("change", mqHandler as any);
            else if ((mql as any).addListener)
                (mql as any).addListener(mqHandler as any);
        }

        return () => {
            obs.disconnect();
            if (mql) {
                if (mql.removeEventListener)
                    mql.removeEventListener("change", mqHandler as any);
                else if ((mql as any).removeListener)
                    (mql as any).removeListener(mqHandler as any);
            }
        };
    }, []);

    const logoSrc = isDark
        ? (project.logo?.dark ?? project.logo?.light)
        : (project.logo?.light ?? project.logo?.dark);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className='border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-neutral-900/30'
        >
            {/* Screenshots */}
            <div className='bg-neutral-100 dark:bg-neutral-900'>
                {project.mobile ? (
                    <div className='px-8 pt-8 pb-8 flex gap-4 justify-center'>
                        {project.images?.map((src, i) => (
                            <div
                                key={i}
                                className='w-28 md:w-36 rounded-xl overflow-hidden shrink-0'
                            >
                                <Image
                                    src={src}
                                    alt={`${project.name} screenshot ${i + 1}`}
                                    width={144}
                                    height={300}
                                    className='w-full h-auto object-cover'
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`p-6 flex gap-3`}>
                        {project.images?.map((src, i) => (
                            <div
                                key={i}
                                className={`rounded-xl overflow-hidden  ${project.images.length === 1 ? "w-full" : "flex-1"}`}
                            >
                                <Image
                                    src={src}
                                    alt={`${project.name} screenshot ${i + 1}`}
                                    width={800}
                                    height={500}
                                    className='w-full h-auto object-cover'
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className='p-8 md:p-10'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-7 h-7 relative shrink-0'>
                        {logoSrc && (
                            <Image
                                src={logoSrc}
                                alt={`${project.name} logo`}
                                fill
                                className='object-contain'
                            />
                        )}
                    </div>
                    <h3 className='text-xl md:text-2xl font-semibold'>
                        {project.name}
                    </h3>
                    <span className='text-xs text-neutral-400 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 rounded-full'>
                        {project.type}
                    </span>
                    {project.url && (
                        <a
                            href={project.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                        >
                            Live ↗
                        </a>
                    )}
                </div>
                <p className='text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-2xl mb-6 leading-relaxed'>
                    {project.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                        <span
                            key={tag.name}
                            className='inline-flex items-center gap-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-1.5 rounded-full'
                        >
                            {tag.icon && (
                                <tag.icon className='w-3 h-3 shrink-0' />
                            )}
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function Skills() {
    return (
        <section
            id='skills'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label='Skills' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                        <p className='text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4'>
                            {group.category}
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {group.items.map((skill) => (
                                <div
                                    key={skill.name}
                                    className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-sm text-neutral-700 dark:text-neutral-300 shadow-sm'
                                >
                                    {skill.icon && (
                                        <skill.icon
                                            className='w-4 h-4 shrink-0'
                                            style={{ color: skill.color }}
                                        />
                                    )}
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            if (res.ok) {
                setStatus("success");
                setName("");
                setMessage("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section
            id='contact'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label='Kontakt' />
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-12'>
                <div className='md:max-w-sm'>
                    <h2 className='text-3xl md:text-4xl font-semibold tracking-tight mb-4'>
                        Let&apos;s work together.
                    </h2>
                    <p className='text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8'>
                        Schreib mir — ich melde mich schnellstmöglich zurück.
                    </p>
                    <a
                        href='https://www.linkedin.com/in/jannik-thieme-51878a354/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm font-medium underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors'
                    >
                        LinkedIn ↗
                    </a>
                </div>

                <form onSubmit={handleSubmit} className='flex-1 flex flex-col gap-4'>
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Dein Name'
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition'
                        />
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>E-Mail</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='deine@email.de'
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition'
                        />
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>Nachricht</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={5}
                            placeholder='Wie kann ich dir helfen?'
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition resize-none'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={status === "loading" || status === "success"}
                        className='self-start px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:opacity-75 transition-opacity disabled:opacity-50'
                    >
                        {status === "loading" ? "Senden..." : status === "success" ? "Gesendet ✓" : "Senden"}
                    </button>
                    {status === "error" && (
                        <p className='text-sm text-red-500'>Etwas ist schiefgelaufen. Bitte versuch es erneut.</p>
                    )}
                </form>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-8 border-t border-neutral-200 dark:border-neutral-800'>
            <p className='text-xs text-neutral-400'>© 2026 Jannik Thieme</p>
        </footer>
    );
}

function SectionLabel({ label }: { label: string }) {
    return (
        <p className='text-xs uppercase tracking-[0.2em] text-neutral-400 mb-12'>
            {label}
        </p>
    );
}
