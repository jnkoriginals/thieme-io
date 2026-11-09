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
    tryIt: string;
    swipeIt: string;
    music: { intro: string; track: string; play: string; spotify: string; title: string; close: string };
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
const GAIA_PAGE = "https://dendree.com/de/products/gaia-protocol";
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
        website: "Visit Simpli",
        tryIt: "Try it out!",
        swipeIt: "Swipe me!",
        music: {
            intro: "I also make music",
            track: "“Mission Success” from Gaia Protocol",
            play: "I also make music. Play “Mission Success” from Gaia Protocol",
            spotify: "Spotify",
            title: "Mission Success from the Gaia Protocol score on SoundCloud",
            close: "Close player",
        },
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
                image: "/real/torga-window.webp",
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
                    "Worked directly with international markets during the worldwide rollout, including live demos.",
                    "Full-stack development of an internal web application with Angular and Python.",
                    "Responsible for a large part of its DevOps setup on AWS, Docker and Kubernetes.",
                ],
                tags: MERCEDES_TAGS,
            },
            {
                title: "Software Development Intern",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "Sep 2025 – Feb 2026",
                detail: [
                    "Planned and led the German-market go-live and supported the worldwide rollout.",
                    "Developed new features for an internal web application.",
                    "Built and operated its production environment.",
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
                period: "Sep 2023 – expected 2027",
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
        website: "Zu Simpli",
        tryIt: "Probier's aus!",
        swipeIt: "Einfach wischen!",
        music: {
            intro: "Ich mache auch Musik",
            track: "„Mission Success“ aus Gaia Protocol",
            play: "Ich mache auch Musik. „Mission Success“ aus Gaia Protocol abspielen",
            spotify: "Spotify",
            title: "„Mission Success“ aus dem Soundtrack von Gaia Protocol auf SoundCloud",
            close: "Player schließen",
        },
        workHeading: "Weitere Projekte",
        work: [
            {
                name: "Perky",
                type: "Studienprojekt",
                body: "Digitale Stempelkarten für Cafés und Restaurants, ganz ohne Papier und App-Installation. Zu sechst entwickelt, mein Teil war die QR-Scan-Logik.",
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
                        alt: "Shop-Ansicht in Perky mit Stempelkarte und Scan-Button",
                    },
                ],
                links: [],
            },
            {
                name: "Torga",
                type: "Auftragsprojekt",
                body: "Allein entwickelte SaaS-Plattform für Handwerksbetriebe: von der Besichtigung über das Angebot bis zur gesetzeskonformen E-Rechnung.",
                stack: "Java 21 · Spring Boot · React · PostgreSQL · Docker",
                image: "/real/torga-window.webp",
                alt: "Torga-Kalender mit Besichtigungen und Aufträgen",
                links: [],
            },
            {
                name: "Gaia Protocol",
                type: "Teamprojekt bei Dendree",
                body: "Ein kooperatives VR-Survival-Spiel, 2026 auf der gamescom ausgestellt. Den gesamten Audio-Bereich habe ich allein verantwortet: Sounddesign, Soundtrack, Audio-Systeme und Lokalisierung.",
                stack: "Unity · C# · VR · Sounddesign",
                image: "/gaia-protocol-poster.png",
                alt: "Poster des Spiels Gaia Protocol",
                links: [
                    { label: "Soundtrack anhören", href: SOUNDTRACK },
                    { label: "Projektseite", href: GAIA_PAGE },
                    { label: "gamescom", href: GAMESCOM },
                ],
            },
        ],
        aboutHeading: "Über mich",
        about: "Ich bin Full-Stack-Entwickler und studiere Mobile Medien an der HdM Stuttgart. Praxiserfahrung habe ich in Web, Mobile und DevOps. Bei Mercedes-Benz arbeite ich an Systemen im Produktivbetrieb, daneben laufen meine eigenen SaaS- und Game-Audio-Projekte.",
        experienceLabel: "Erfahrung",
        experience: [
            {
                title: "Werkstudent Softwareentwicklung",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "seit März 2026",
                detail: [
                    "Zusammenarbeit mit internationalen Märkten beim weltweiten Rollout, inklusive Live-Demos.",
                    "Full-Stack-Entwicklung einer internen Webanwendung mit Angular und Python.",
                    "Verantwortlich für einen großen Teil des DevOps-Setups (AWS, Docker, Kubernetes).",
                ],
                tags: MERCEDES_TAGS,
            },
            {
                title: "Praktikant Softwareentwicklung",
                place: "Mercedes-Benz AG, Stuttgart",
                period: "Sep. 2025 – Feb. 2026",
                detail: [
                    "Go-live für den deutschen Markt geplant und geleitet, weltweiten Rollout begleitet.",
                    "Neue Features für eine interne Webanwendung entwickelt.",
                    "Produktivumgebung aufgebaut und betrieben.",
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
                period: "Sep. 2023 – voraussichtlich 2027",
            },
            {
                title: "Medizintechnik (1 Jahr, dann Studienwechsel)",
                place: "Eberhard Karls Universität Tübingen und Universität Stuttgart",
                period: "Sep. 2022 – Juli 2023",
            },
        ],
        skillsLabel: "Skills",
        skills: [
            { category: "Programmiersprachen", items: "Java, Kotlin, Swift, TypeScript/JavaScript, Python, C#, HTML, CSS, SQL" },
            { category: "Frameworks", items: "React, Next.js, Angular, React Native, Ionic, Spring Boot" },
            { category: "Cloud & DevOps", items: "AWS, Google Cloud, Firebase, Docker, Kubernetes, GitHub Actions, GitLab CI" },
            { category: "Datenbanken", items: "PostgreSQL, MySQL, Firestore, MongoDB" },
            { category: "Testing & Tools", items: "Jest, Playwright, JUnit, Git, Figma, Illustrator, Photoshop" },
            { category: "Sprachen", items: "Deutsch (Muttersprache), Englisch (fließend), Spanisch (gute Kenntnisse), Französisch (Grundkenntnisse)" },
        ],
    },
};
