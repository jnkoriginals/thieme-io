import type { Lang } from "@/lib/translations";

export type WorkItem = {
    name: string;
    type: string;
    body: string;
    stack: string;
    image: string;
    alt: string;
    /** Phone projects show their screens side by side instead of one wide image. */
    phoneScreens?: { src: string; alt: string }[];
    links: { label: string; href: string }[];
};

type AboutEntry = {
    title: string;
    place: string;
    period: string;
    detail?: string[];
    tags?: string[];
};

type PreviewMore = {
    website: string;
    workHeading: string;
    work: WorkItem[];
    aboutHeading: string;
    about: string;
    experienceLabel: string;
    experience: AboutEntry[];
    educationLabel: string;
    education: AboutEntry[];
    skillsLabel: string;
    skills: { category: string; items: string }[];
};

const SOUNDTRACK =
    "https://soundcloud.com/jnkoriginals/sets/gaia-protocol-original-game";
const GAIA_PAGE = "https://dendree.de/de/products/gaia-protocol";
const GAMESCOM = "https://www.gamescom.global/de/product/gaiaprotocol";
const MERCEDES_TAGS = [
    "Angular",
    "Python",
    "AWS",
    "Kubernetes",
    "Docker",
    "GitHub Actions",
];

export const previewMore: Record<Lang, PreviewMore> = {
    en: {
        website: "simpli.menu",
        workHeading: "More work",
        work: [
            {
                name: "Perky",
                type: "University project",
                body: "Digital stamp cards for cafés and restaurants, no paper and no app to install. Built in a team of six, where I worked on the QR scan logic.",
                stack: "Next.js · TypeScript · Express · PostgreSQL · Socket.IO",
                image: "/perky-1.webp",
                alt: "Perky wallet with a stack of stamp cards",
                phoneScreens: [
                    {
                        src: "/perky-1.webp",
                        alt: "Perky wallet with a stack of stamp cards",
                    },
                    {
                        src: "/perky-3.webp",
                        alt: "Perky shop view with its stamp card and scan button",
                    },
                ],
                links: [],
            },
            {
                name: "Torga",
                type: "Client project",
                body: "A SaaS platform for tradespeople, built solo, from site visits and quotes to legally compliant e-invoices.",
                stack: "Java 21 · Spring Boot · React · PostgreSQL · Docker",
                image: "/torga.png",
                alt: "Torga calendar with site visits and jobs",
                links: [],
            },
            {
                name: "Gaia Protocol",
                type: "Team project at Dendree",
                body: "A cooperative VR survival game, exhibited at gamescom 2026. I was the sole audio designer and implementer: sound design, original score, audio systems and localization.",
                stack: "Unity · C# · VR · Sound design",
                image: "/gaia-protocol-poster.png",
                alt: "Gaia Protocol game poster",
                links: [
                    { label: "Listen to the score", href: SOUNDTRACK },
                    { label: "Project page", href: GAIA_PAGE },
                    { label: "gamescom", href: GAMESCOM },
                ],
            },
        ],
        aboutHeading: "About",
        about: "Full-stack software engineer and Mobile Media student at HdM Stuttgart, with hands-on experience across web, mobile and DevOps. I build production systems at Mercedes-Benz while running my own SaaS and game-audio projects.",
        experienceLabel: "Experience",
        experience: [
            {
                title: "Working Student, Software Development",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "Mar 2026 – Present",
                detail: [
                    "Full-stack development of an internal web application with Angular and Python.",
                    "Responsible for a large part of its DevOps setup on AWS, Docker and Kubernetes.",
                    "Worked directly with international markets during the worldwide rollout, including live demos.",
                ],
                tags: MERCEDES_TAGS,
            },
            {
                title: "Software Development Intern",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "Sep 2025 – Feb 2026",
                detail: [
                    "Developed new features for an internal web application.",
                    "Built and operated its production environment.",
                    "Planned and led the German-market go-live and supported the worldwide rollout.",
                ],
                tags: ["Angular", "TypeScript", "Python", "Docker", "Kubernetes", "AWS"],
            },
            {
                title: "Working Student, Applications",
                place: "IJUNO Business Solutions GmbH, Stuttgart",
                period: "Feb 2025 – Aug 2025",
                detail: [
                    "Built an automated solution for migrating databases into SAP systems.",
                ],
                tags: ["SAP Datasphere", "Node.js", "Automation"],
            },
        ],
        educationLabel: "Education",
        education: [
            {
                title: "B.A. Mobile Media",
                place: "Hochschule der Medien Stuttgart",
                period: "Since Sep 2023",
            },
            {
                title: "Medical Engineering, 1 year before switching programs",
                place: "Eberhard Karls Universität Tübingen and Universität Stuttgart",
                period: "Sep 2022 – Jul 2023",
            },
        ],
        skillsLabel: "Skills",
        skills: [
            { category: "Programming", items: "Java, Kotlin, Swift, TypeScript/JavaScript, Python, C#, HTML, CSS, SQL" },
            { category: "Frameworks", items: "React, Next.js, Angular, React Native, Ionic, Spring Boot" },
            { category: "Cloud & DevOps", items: "AWS, Google Cloud, Firebase, Docker, Kubernetes, GitHub Actions, GitLab CI" },
            { category: "Databases", items: "PostgreSQL, MySQL, Firestore, MongoDB" },
            { category: "Testing & tools", items: "Jest, Playwright, JUnit, Git, Figma, Illustrator, Photoshop" },
            { category: "Languages", items: "German (native), English (fluent), Spanish (proficient), French (basic)" },
        ],
    },
    de: {
        website: "simpli.menu",
        workHeading: "Weitere Projekte",
        work: [
            {
                name: "Perky",
                type: "Studienprojekt",
                body: "Digitale Stempelkarten für Cafés und Restaurants, ohne Papier und ohne App-Installation. Im Sechserteam entwickelt, mein Part war die QR-Scan-Logik.",
                stack: "Next.js · TypeScript · Express · PostgreSQL · Socket.IO",
                image: "/perky-1.webp",
                alt: "Perky-Wallet mit einem Stapel Stempelkarten",
                phoneScreens: [
                    {
                        src: "/perky-1.webp",
                        alt: "Perky-Wallet mit einem Stapel Stempelkarten",
                    },
                    {
                        src: "/perky-3.webp",
                        alt: "Perky-Shop-Ansicht mit Stempelkarte und Scan-Button",
                    },
                ],
                links: [],
            },
            {
                name: "Torga",
                type: "Auftragsprojekt",
                body: "Eine SaaS-Plattform für Handwerksbetriebe, als Soloprojekt entwickelt, von der Besichtigung über Angebote bis zur gesetzeskonformen E-Rechnung.",
                stack: "Java 21 · Spring Boot · React · PostgreSQL · Docker",
                image: "/torga.png",
                alt: "Torga-Kalender mit Besichtigungen und Aufträgen",
                links: [],
            },
            {
                name: "Gaia Protocol",
                type: "Team-Projekt bei Dendree",
                body: "Ein kooperatives VR-Survival-Game, ausgestellt auf der gamescom 2026. Ich war allein für Audio verantwortlich: Sounddesign, Original-Score, Audio-Systeme und Lokalisierung.",
                stack: "Unity · C# · VR · Sounddesign",
                image: "/gaia-protocol-poster.png",
                alt: "Poster des Spiels Gaia Protocol",
                links: [
                    { label: "Score anhören", href: SOUNDTRACK },
                    { label: "Projektseite", href: GAIA_PAGE },
                    { label: "gamescom", href: GAMESCOM },
                ],
            },
        ],
        aboutHeading: "Über mich",
        about: "Full-Stack-Softwareentwickler und Mobile-Medien-Student an der HdM Stuttgart, mit praktischer Erfahrung in Web, Mobile und DevOps. Ich baue Produktivsysteme bei Mercedes-Benz und betreibe daneben eigene SaaS- und Game-Audio-Projekte.",
        experienceLabel: "Erfahrung",
        experience: [
            {
                title: "Werkstudent Softwareentwicklung",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "März 2026 – heute",
                detail: [
                    "Full-Stack-Entwicklung einer internen Webanwendung mit Angular und Python.",
                    "Verantwortung für einen großen Teil des DevOps-Setups auf AWS, Docker und Kubernetes.",
                    "Direkter Austausch mit internationalen Märkten beim weltweiten Rollout, inklusive Live-Demos.",
                ],
                tags: MERCEDES_TAGS,
            },
            {
                title: "Praktikant Softwareentwicklung",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "Sep. 2025 – Feb. 2026",
                detail: [
                    "Neue Features für eine interne Webanwendung entwickelt.",
                    "Die Produktivumgebung aufgebaut und betrieben.",
                    "Den Go-live für den deutschen Markt geplant und geleitet und den weltweiten Rollout begleitet.",
                ],
                tags: ["Angular", "TypeScript", "Python", "Docker", "Kubernetes", "AWS"],
            },
            {
                title: "Werkstudent Applications",
                place: "IJUNO Business Solutions GmbH, Stuttgart",
                period: "Feb. 2025 – Aug. 2025",
                detail: [
                    "Automatisierte Lösung zur Migration von Datenbanken in SAP-Systeme entwickelt.",
                ],
                tags: ["SAP Datasphere", "Node.js", "Automatisierung"],
            },
        ],
        educationLabel: "Studium",
        education: [
            {
                title: "B.A. Mobile Medien",
                place: "Hochschule der Medien Stuttgart",
                period: "Seit Sep. 2023",
            },
            {
                title: "Medizintechnik, 1 Jahr vor dem Studienwechsel",
                place: "Eberhard Karls Universität Tübingen und Universität Stuttgart",
                period: "Sep. 2022 – Juli 2023",
            },
        ],
        skillsLabel: "Skills",
        skills: [
            { category: "Programmierung", items: "Java, Kotlin, Swift, TypeScript/JavaScript, Python, C#, HTML, CSS, SQL" },
            { category: "Frameworks", items: "React, Next.js, Angular, React Native, Ionic, Spring Boot" },
            { category: "Cloud & DevOps", items: "AWS, Google Cloud, Firebase, Docker, Kubernetes, GitHub Actions, GitLab CI" },
            { category: "Datenbanken", items: "PostgreSQL, MySQL, Firestore, MongoDB" },
            { category: "Testing & Tools", items: "Jest, Playwright, JUnit, Git, Figma, Illustrator, Photoshop" },
            { category: "Sprachen", items: "Deutsch (Muttersprache), Englisch (fließend), Spanisch (gut), Französisch (Grundkenntnisse)" },
        ],
    },
};
