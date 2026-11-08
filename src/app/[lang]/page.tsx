"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { translations, type Lang } from "@/lib/translations";

// Hero content stays opaque in the server-rendered HTML (crawlers, LCP); it only slides in.
const fadeUp = {
    hidden: { y: 20 },
    visible: (i: number = 0) => ({
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

// indigo-600 keeps white text above 4.5:1, so hover goes darker rather than lighter.
const primaryButton =
    "inline-flex h-11 items-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700";

const skillGroups: { category: string; items: string[] }[] = [
    {
        category: "Frontend",
        items: ["React", "Next.js", "Angular", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["Swift", "Ionic", "Capacitor"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Spring Boot", "Python"],
    },
    {
        category: "Infrastructure",
        items: ["Firebase", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    },
];

const projectStaticData = [
    {
        name: "Simpli",
        tags: ["Next.js 14", "React", "Firebase", "Gemini", "Stripe", "NX", "Vercel"],
        logo: {
            light: "/logo-simpli-dark.svg",
            dark: "/logo-simpli-light.svg",
        },
        images: ["/simpli-home.webp", "/simpli-editor.webp", "/simpli-assistant.webp"],
        mobile: false,
        url: "https://simpli.menu",
        demoUrl: "https://dashboard.simpli.menu/demo",
        caseStudyPath: "work/simpli",
    },
    {
        name: "Torga",
        tags: ["Java 21", "Spring Boot 3.5", "React 18", "MySQL", "PostgreSQL", "Docker"],
        logo: { light: "/logo-torga.png", dark: "/logo-torga.png" },
        images: ["/torga.png"],
        mobile: false,
    },
    {
        name: "nearby",
        tags: ["Ionic", "React", "TypeScript", "Capacitor"],
        logo: { light: "/logo-nearby.svg", dark: "/logo-nearby.svg" },
        images: ["/nearby-1.png", "/nearby-2.png", "/nearby-3.png"],
        mobile: true,
        pressUrl: "https://www.edit-magazin.de/tindern-fuer-cafes-co.html",
    },
    {
        name: "Perky",
        tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Socket.IO", "Docker"],
        images: ["/perky-1.webp", "/perky-2.webp", "/perky-3.webp"],
        mobile: true,
        framed: true,
    },
    {
        name: "Gaia Protocol",
        tags: ["Unity", "C#", "Audio Implementation", "Localization", "VR", "Sound Design"],
        logo: {
            light: "/logo-gaia-protocol.png",
            dark: "/logo-gaia-protocol.png",
        },
        images: [
            "/gaia-protocol-poster.png",
            "/gaia-protocol-1.png",
            "/gaia-protocol-2.png",
        ],
        video: "PVTPaY90tQo",
        mobile: false,
        pageUrl: "https://dendree.de/de/products/gaia-protocol",
        soundtrackUrl:
            "https://soundcloud.com/jnkoriginals/sets/gaia-protocol-original-game",
        gamescomUrl: "https://www.gamescom.global/de/product/gaiaprotocol",
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
        <MotionConfig reducedMotion='user'>
            <main className='min-h-screen'>
                <Hero t={t} />
                <Experience t={t} />
                <Projects
                    projects={projects}
                    sectionLabel={t.sections.projects}
                    lang={lang}
                />
                <Skills sectionLabel={t.sections.skills} />
                <Contact t={t} />
                <Footer footer={t.footer} lang={lang} />
            </main>
        </MotionConfig>
    );
}

function Hero({ t }: { t: (typeof translations)[Lang] }) {
    return (
        <section className='page-shell flex min-h-[92dvh] flex-col justify-center pb-16 pt-28'>
            <div className='page-grid items-center gap-y-12'>
                <div className='md:col-span-8'>
                    <motion.p
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={0}
                        className='mb-6 text-sm text-zinc-400 md:text-base'
                    >
                        {t.hero.subtitle}
                    </motion.p>
                    <motion.h1
                        initial='hidden'
                        animate='visible'
                        variants={fadeUp}
                        custom={1}
                        className='mb-8 text-6xl font-bold leading-[1] tracking-[-0.045em] text-zinc-50 md:text-8xl lg:text-[7.5rem]'
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
                        className='mb-10 max-w-lg text-lg leading-relaxed text-zinc-300 md:text-xl'
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
                        <a href='#projects' className={primaryButton}>
                            {t.hero.ctaProjects}
                        </a>
                        <a
                            href='#contact'
                            className='inline-flex h-11 items-center rounded-xl border border-zinc-700 px-5 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900'
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
                    className='md:col-span-4 md:justify-self-end'
                >
                    <div className='h-40 w-40 overflow-hidden rounded-3xl md:h-56 md:w-56 lg:h-72 lg:w-72'>
                        <Image
                            src='/avatar.png'
                            alt='Jannik Thieme'
                            width={288}
                            height={288}
                            className='h-full w-full object-cover'
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
        <section id='experience' className='page-shell py-20 md:py-28'>
            <SectionLabel label={t.sections.experience} />
            <ol>
                {t.experience.map((job, i) => {
                    const current = /^(current|aktuell)$/i.test(job.period);
                    const dot = `absolute top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-zinc-950 ${current ? "bg-indigo-400" : "bg-zinc-600"}`;
                    const last = i === t.experience.length - 1;

                    return (
                        <motion.li
                            key={`${job.company}-${job.role}`}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.45, delay: i * 0.05 }}
                            className={`page-grid relative border-l border-zinc-800 pl-6 md:border-l-0 md:pl-0 ${last ? "" : "pb-12 md:pb-0"}`}
                        >
                            <span
                                aria-hidden='true'
                                className={`${dot} -left-[5px] md:hidden`}
                            />
                            <p
                                className={`mb-2 text-sm tabular-nums md:col-span-3 md:mb-0 md:pt-1 ${current ? "font-medium text-indigo-400" : "text-zinc-400"}`}
                            >
                                {job.period}
                            </p>
                            <div
                                className={`relative md:col-span-9 md:border-l md:border-zinc-800 md:pl-10 ${last ? "" : "md:pb-16"}`}
                            >
                                <span
                                    aria-hidden='true'
                                    className={`${dot} -left-[5px] hidden md:block`}
                                />
                                <h3 className='text-xl font-semibold tracking-[-0.02em] text-zinc-50 md:text-2xl'>
                                    {job.role}
                                </h3>
                                <p className='mt-1 text-sm text-zinc-400 md:text-base'>
                                    {job.company}
                                </p>
                                <p className='mt-4 max-w-2xl leading-relaxed text-zinc-300'>
                                    {job.description}
                                </p>
                                <p className='mt-4 text-sm text-zinc-400'>
                                    {job.tags.join(" · ")}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
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
        <section id='projects' className='page-shell py-20 md:py-28'>
            <SectionLabel label={sectionLabel} />
            <div className='flex flex-col gap-20 md:gap-32'>
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

type Slide =
    | { type: "image"; src: string }
    | { type: "video"; videoId: string };

function MediaSlideshow({
    projectName,
    slides,
}: {
    projectName: string;
    slides: Slide[];
}) {
    const [index, setIndex] = useState(0);

    const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
    const arrow =
        "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/70 text-zinc-50 opacity-0 transition-opacity hover:bg-zinc-950 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100";

    return (
        <div className='group absolute inset-0'>
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                        i === index
                            ? "z-10 opacity-100"
                            : "pointer-events-none opacity-0"
                    }`}
                >
                    {slide.type === "image" ? (
                        <Image
                            src={slide.src}
                            alt={`${projectName} screenshot ${i + 1}`}
                            fill
                            sizes='(max-width: 768px) 100vw, 1072px'
                            className='object-cover object-top'
                        />
                    ) : (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${slide.videoId}`}
                            title={`${projectName} gameplay video`}
                            className='absolute inset-0 h-full w-full'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                        />
                    )}
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    <button
                        type='button'
                        onClick={() => goTo(index - 1)}
                        aria-label='Previous slide'
                        className={`${arrow} left-3`}
                    >
                        <ChevronIcon direction='left' />
                    </button>
                    <button
                        type='button'
                        onClick={() => goTo(index + 1)}
                        aria-label='Next slide'
                        className={`${arrow} right-3`}
                    >
                        <ChevronIcon direction='right' />
                    </button>
                    <div className='absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full bg-zinc-950/70 px-1'>
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type='button'
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index ? "true" : undefined}
                                className='group/dot flex h-7 w-6 items-center justify-center rounded-full'
                            >
                                <span
                                    className={`h-2 w-2 rounded-full transition-colors ${
                                        i === index
                                            ? "bg-zinc-50"
                                            : "bg-zinc-50/40 group-hover/dot:bg-zinc-50/70"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
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
    const logoSrc = project.logo?.dark ?? project.logo?.light;

    const {
        url,
        demoUrl,
        pressUrl,
        pageUrl,
        soundtrackUrl,
        gamescomUrl,
        caseStudyPath,
    } =
        project as Project &
            Partial<
                Record<
                    | "caseStudyPath"
                    | "url"
                    | "demoUrl"
                    | "pressUrl"
                    | "pageUrl"
                    | "soundtrackUrl"
                    | "gamescomUrl",
                    string
                >
            >;
    const links = [
        { href: url, label: "Live" },
        { href: demoUrl, label: "Demo" },
        { href: pressUrl, label: lang === "de" ? "Presse" : "Press" },
        {
            href: pageUrl,
            label: lang === "de" ? "Projektseite" : "Project Page",
        },
        { href: soundtrackUrl, label: "Soundtrack" },
        { href: gamescomUrl, label: "gamescom 2026" },
    ].filter((link) => link.href);
    const framed = "framed" in project && project.framed;
    // The first project is the flagship and gets more visual weight.
    const featured = index === 0;
    const linkClass =
        "group/link inline-flex items-center gap-1.5 py-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300";

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
        >
            {/* Every project sits in the same media frame. */}
            {project.mobile ? (
                <div className='relative overflow-hidden rounded-2xl bg-zinc-900 md:aspect-[16/10]'>
                    <div className='scrollbar-none flex h-full items-center justify-start gap-4 overflow-x-auto px-6 py-8 md:justify-center md:gap-8'>
                        {project.images?.map((src, i) => (
                            <div
                                key={i}
                                className={`shrink-0 overflow-hidden ${framed ? "w-[98px] rounded-[1.5rem] border-[5px] border-neutral-700 bg-black md:w-[154px] md:rounded-[2rem] md:border-[6px] lg:w-[196px] lg:rounded-[2.5rem] lg:border-[8px]" : "w-28 rounded-xl md:w-44 lg:w-56"}`}
                            >
                                <Image
                                    src={src}
                                    alt={`${project.name} screenshot ${i + 1}`}
                                    width={224}
                                    height={466}
                                    sizes='(max-width: 768px) 112px, 224px'
                                    className='h-auto w-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900'>
                    <MediaSlideshow
                        projectName={project.name}
                        slides={[
                            ...project.images.map(
                                (src): Slide => ({ type: "image", src })
                            ),
                            ...("video" in project && project.video
                                ? [
                                      {
                                          type: "video" as const,
                                          videoId: project.video,
                                      },
                                  ]
                                : []),
                        ]}
                    />
                </div>
            )}

            <div className='page-grid mt-6 gap-y-5 md:mt-8'>
                <div className='md:col-span-3'>
                    <div className='flex items-center gap-3'>
                        {logoSrc && (
                            <div
                                className={`relative shrink-0 ${featured ? "h-10 w-24" : "h-8 w-8"}`}
                            >
                                <Image
                                    src={logoSrc}
                                    alt={`${project.name} logo`}
                                    fill
                                    className='object-contain object-left'
                                />
                            </div>
                        )}
                        {/* Simpli's logo is a wordmark, so the name would repeat it. */}
                        <h3
                            className={
                                featured
                                    ? "sr-only"
                                    : "text-2xl font-bold tracking-[-0.03em] text-zinc-50"
                            }
                        >
                            {project.name}
                        </h3>
                    </div>
                    <p className='mt-2 text-sm text-zinc-400'>{project.type}</p>
                    {links.length > 0 && (
                        <div className='mt-3 flex flex-wrap gap-x-4 md:flex-col md:items-start'>
                            {caseStudyPath && (
                                <Link
                                    href={`/${lang}/${caseStudyPath}`}
                                    className={linkClass}
                                >
                                    Case Study <ArrowUpRight />
                                </Link>
                            )}
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={linkClass}
                                >
                                    {link.label} <ArrowUpRight />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div className='md:col-span-9'>
                    <p
                        className={`max-w-2xl leading-relaxed ${featured ? "text-lg text-zinc-100 md:text-xl" : "text-base text-zinc-300 md:text-lg"}`}
                    >
                        {project.description}
                    </p>
                    <p className='mt-4 text-sm text-zinc-400'>
                        {project.tags.join(" · ")}
                    </p>
                </div>
            </div>
        </motion.article>
    );
}

function Skills({ sectionLabel }: { sectionLabel: string }) {
    return (
        <section id='skills' className='page-shell py-20 md:py-28'>
            <SectionLabel label={sectionLabel} />
            <dl className='border-b border-zinc-800'>
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className='page-grid gap-y-1 border-t border-zinc-800 py-5'
                    >
                        <dt className='text-sm text-zinc-400 md:col-span-3 md:pt-1'>
                            {group.category}
                        </dt>
                        <dd className='text-lg text-zinc-100 md:col-span-9'>
                            {group.items.join(", ")}
                        </dd>
                    </motion.div>
                ))}
            </dl>
        </section>
    );
}

function Contact({ t }: { t: (typeof translations)[Lang] }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [website, setWebsite] = useState(""); // honeypot, hidden from humans
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
                body: JSON.stringify({ name, email, message, website }),
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
    const fieldClass =
        "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-50 placeholder-zinc-400 transition-colors hover:border-zinc-500";
    const labelClass = "mb-2 block text-sm text-zinc-400";

    return (
        <section id='contact' className='page-shell py-20 md:py-28'>
            <SectionLabel label={t.sections.contact} />
            <div className='page-grid gap-y-8'>
                <div className='md:col-span-9 md:col-start-4 md:row-start-1'>
                    <h3 className='mb-4 text-3xl font-bold tracking-[-0.03em] text-zinc-50 md:text-5xl'>
                        {ct.heading}
                    </h3>
                    <p className='max-w-xl leading-relaxed text-zinc-300'>
                        {ct.subtext}
                    </p>
                </div>
                <div className='md:col-span-3 md:col-start-1 md:row-start-1 md:pt-3'>
                    <a
                        href='https://www.linkedin.com/in/jannik-thieme-51878a354/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='py-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300'
                    >
                        LinkedIn ↗
                    </a>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='flex max-w-2xl flex-col gap-4 md:col-span-9 md:col-start-4'
                >
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                            <label htmlFor='contact-name' className={labelClass}>
                                {ct.nameLabel}
                            </label>
                            <input
                                id='contact-name'
                                name='name'
                                type='text'
                                autoComplete='name'
                                maxLength={100}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder={ct.namePlaceholder}
                                className={fieldClass}
                            />
                        </div>
                        <div>
                            <label htmlFor='contact-email' className={labelClass}>
                                {ct.emailLabel}
                            </label>
                            <input
                                id='contact-email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                maxLength={200}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder={ct.emailPlaceholder}
                                className={fieldClass}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor='contact-message' className={labelClass}>
                            {ct.messageLabel}
                        </label>
                        <textarea
                            id='contact-message'
                            name='message'
                            maxLength={5000}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={5}
                            placeholder={ct.messagePlaceholder}
                            className={`${fieldClass} resize-none`}
                        />
                    </div>
                    <input
                        type='text'
                        name='website'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        tabIndex={-1}
                        autoComplete='off'
                        aria-hidden='true'
                        className='hidden'
                    />
                    <button
                        type='submit'
                        disabled={status === "loading" || status === "success"}
                        className={`${primaryButton} self-start disabled:opacity-60`}
                    >
                        {status === "loading"
                            ? ct.sending
                            : status === "success"
                              ? ct.sent
                              : ct.send}
                    </button>
                    {status === "error" && (
                        <p className='text-sm text-red-400'>{ct.error}</p>
                    )}
                </form>
            </div>
        </section>
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
            aria-hidden='true'
            className='transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5'
        >
            <path d='M2 8L8 2M8 2H3M8 2V7' />
        </svg>
    );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
        >
            <path d={direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"} />
        </svg>
    );
}

function SectionLabel({ label }: { label: string }) {
    return (
        <h2 className='mb-10 text-3xl font-bold tracking-[-0.03em] text-zinc-50 md:mb-14 md:text-4xl'>
            {label}
        </h2>
    );
}
