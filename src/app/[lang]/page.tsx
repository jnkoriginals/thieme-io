"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { translations, type Lang } from "@/lib/translations";

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
            { name: "C#" },
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

type ProjectTag = { name: string; icon?: IconType };

const projectStaticData = [
    {
        name: "Simpli",
        tags: [
            { name: "Next.js 14", icon: SiNextdotjs },
            { name: "React", icon: SiReact },
            { name: "Firebase", icon: SiFirebase },
            { name: "Google Vertex AI", icon: SiGooglecloud },
            { name: "Stripe", icon: SiStripe },
            { name: "NX", icon: SiNx },
            { name: "Vercel", icon: SiVercel },
        ] as ProjectTag[],
        images: ["/simpli-main.png", "/simpli-dashboard.png"],
        mobile: false,
        url: "https://simpli.menu",
    },
    {
        name: "Torga",
        tags: [
            { name: "Java 21", icon: FaJava },
            { name: "Spring Boot 3.5", icon: SiSpring },
            { name: "React 18", icon: SiReact },
            { name: "MySQL", icon: SiMysql },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Docker", icon: SiDocker },
        ] as ProjectTag[],
        logo: { light: "/logo-torga.png", dark: "/logo-torga.png" },
        images: ["/torga.png"],
        mobile: false,
    },
    {
        name: "nearby",
        tags: [
            { name: "Ionic", icon: SiIonic },
            { name: "React", icon: SiReact },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Capacitor" },
        ] as ProjectTag[],
        logo: { light: "/logo-nearby.svg", dark: "/logo-nearby.svg" },
        images: ["/nearby-1.png", "/nearby-2.png", "/nearby-3.png"],
        mobile: true,
        pressUrl: "https://www.edit-magazin.de/tindern-fuer-cafes-co.html",
    },
];

export default function Home() {
    const params = useParams();
    const lang =
        (params?.lang as string) in translations
            ? (params?.lang as Lang)
            : "de";
    const t = translations[lang];

    const projects = projectStaticData.map((p, i) => ({
        ...p,
        description: t.projects[i].description,
        type: t.projects[i].type,
    }));

    return (
        <main className='min-h-screen bg-[var(--background)] text-[var(--foreground)]'>
            <Hero t={t} />
            <Experience t={t} />
            <Projects
                projects={projects}
                sectionLabel={t.sections.projects}
                lang={lang}
            />
            <Skills sectionLabel={t.sections.skills} />
            <Contact t={t} />
            <Footer footer={t.footer} />
        </main>
    );
}

function Hero({ t }: { t: (typeof translations)[Lang] }) {
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
                        {t.hero.subtitle}
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
                        {t.hero.description}
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
                            {t.hero.ctaProjects}
                        </a>
                        <a
                            href='#contact'
                            className='px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-sm font-medium rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors'
                        >
                            {t.hero.ctaContact}
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={fadeUp}
                    custom={2}
                    className='shrink-0 flex justify-center md:justify-end'
                >
                    <div className='w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800'>
                        <Image
                            src='/avatar.png'
                            alt='Jannik Thieme'
                            width={256}
                            height={256}
                            className='w-full h-full object-cover'
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Experience({ t }: { t: (typeof translations)[Lang] }) {
    return (
        <section
            id='experience'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label={t.sections.experience} />
            <div className='flex flex-col gap-4'>
                {t.experience.map((job, i) => (
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

type Project = (typeof projectStaticData)[0] & {
    description: string;
    type: string;
};

function Projects({
    projects,
    sectionLabel,
    lang,
}: {
    projects: Project[];
    sectionLabel: string;
    lang: Lang;
}) {
    return (
        <section
            id='projects'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label={sectionLabel} />
            <div className='flex flex-col gap-6'>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        index={i}
                        lang={lang}
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    lang,
}: {
    project: Project;
    index: number;
    lang: Lang;
}) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const getIsDark = () =>
            document.documentElement.classList.contains("dark") ||
            (window.matchMedia?.("(prefers-color-scheme: dark)").matches ??
                false);

        setIsDark(getIsDark());

        const obs = new MutationObserver(() => setIsDark(getIsDark()));
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
        const mqHandler = (event: MediaQueryListEvent) =>
            setIsDark(event.matches);
        if (mql) mql.addEventListener("change", mqHandler);

        return () => {
            obs.disconnect();
            mql?.removeEventListener("change", mqHandler);
        };
    }, []);

    const logoSrc = isDark
        ? (project.logo?.dark ?? project.logo?.light)
        : (project.logo?.light ?? project.logo?.dark);

    const liveLabel = lang === "de" ? "Live" : "Live";
    const pressLabel = lang === "de" ? "Presse" : "Press";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className='border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-neutral-900/30'
        >
            <div className='bg-neutral-100 dark:bg-neutral-900'>
                {project.mobile ? (
                    <div className='px-6 pt-8 pb-8 flex gap-4 overflow-x-auto justify-start md:justify-center scrollbar-none'>
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
                    <div className='p-6 flex gap-3 overflow-x-auto scrollbar-none'>
                        {project.images?.map((src, i) => (
                            <div
                                key={i}
                                className={`rounded-xl overflow-hidden shrink-0 ${project.images.length === 1 ? "w-full" : "w-4/5 md:flex-1 md:w-auto"}`}
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

            <div className='p-8 md:p-10'>
                <div className='flex items-center gap-3 mb-3'>
                    {logoSrc && (
                        <div className='w-7 h-7 relative shrink-0'>
                            <Image
                                src={logoSrc}
                                alt={`${project.name} logo`}
                                fill
                                className='object-contain'
                            />
                        </div>
                    )}
                    <h3 className='text-xl md:text-2xl font-semibold'>
                        {project.name}
                    </h3>
                    <span className='text-xs text-neutral-400 border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 rounded-full'>
                        {project.type}
                    </span>
                    {("url" in project || "pressUrl" in project) && (
                        <div className='ml-auto flex items-center gap-3'>
                            {"url" in project && project.url && (
                                <a
                                    href={project.url as string}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                                >
                                    {liveLabel} <ArrowUpRight />
                                </a>
                            )}
                            {"pressUrl" in project && project.pressUrl && (
                                <a
                                    href={project.pressUrl as string}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors'
                                >
                                    {pressLabel} <ArrowUpRight />
                                </a>
                            )}
                        </div>
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

function Skills({ sectionLabel }: { sectionLabel: string }) {
    return (
        <section
            id='skills'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label={sectionLabel} />
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

function Contact({ t }: { t: (typeof translations)[Lang] }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

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

    const ct = t.contact;

    return (
        <section
            id='contact'
            className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-24 md:py-32'
        >
            <SectionLabel label={t.sections.contact} />
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-12'>
                <div className='md:max-w-sm'>
                    <h2 className='text-3xl md:text-4xl font-semibold tracking-tight mb-4'>
                        {ct.heading}
                    </h2>
                    <p className='text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8'>
                        {ct.subtext}
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

                <form
                    onSubmit={handleSubmit}
                    className='flex-1 flex flex-col gap-4'
                >
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>
                            {ct.nameLabel}
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder={ct.namePlaceholder}
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition'
                        />
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>
                            {ct.emailLabel}
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={ct.emailPlaceholder}
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition'
                        />
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-[0.15em] text-neutral-400 mb-2'>
                            {ct.messageLabel}
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={5}
                            placeholder={ct.messagePlaceholder}
                            className='w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition resize-none'
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={status === "loading" || status === "success"}
                        className='self-start px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:opacity-75 transition-opacity disabled:opacity-50'
                    >
                        {status === "loading"
                            ? ct.sending
                            : status === "success"
                              ? ct.sent
                              : ct.send}
                    </button>
                    {status === "error" && (
                        <p className='text-sm text-red-500'>{ct.error}</p>
                    )}
                </form>
            </div>
        </section>
    );
}

function Footer({ footer }: { footer: string }) {
    return (
        <footer className='px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-8 border-t border-neutral-200 dark:border-neutral-800'>
            <p className='text-xs text-neutral-400'>{footer}</p>
        </footer>
    );
}

function ArrowUpRight() {
    return (
        <svg
            width='10'
            height='10'
            viewBox='0 0 10 10'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M2 8L8 2M8 2H3M8 2V7' />
        </svg>
    );
}

function SectionLabel({ label }: { label: string }) {
    return (
        <h2 className='text-xs uppercase tracking-[0.2em] text-neutral-400 mb-12 font-normal'>
            {label}
        </h2>
    );
}
