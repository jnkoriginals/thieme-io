import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/app/components/Navbar";
import { translations, type Lang } from "@/lib/translations";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
};

// Only /de and /en exist; anything else (e.g. /avatar.jpg) must 404 instead of rendering the homepage.
export const dynamicParams = false;

const isLang = (lang: string): lang is Lang => lang in translations;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = translations[isLang(lang) ? lang : "de"];

    return {
        metadataBase: new URL("https://thieme.io"),
        title: t.metadata.title,
        description: t.metadata.description,
        alternates: {
            canonical: `https://thieme.io/${lang}`,
            languages: {
                de: "https://thieme.io/de",
                en: "https://thieme.io/en",
                "x-default": "https://thieme.io/de",
            },
        },
        openGraph: {
            title: t.metadata.title,
            description: t.metadata.description,
            url: `https://thieme.io/${lang}`,
            siteName: "Jannik Thieme",
            type: "profile",
            locale: lang === "de" ? "de_DE" : "en_US",
            alternateLocale: lang === "de" ? "en_US" : "de_DE",
            images: [
                {
                    url: "/avatar.png",
                    width: 640,
                    height: 640,
                    alt: "Jannik Thieme",
                },
            ],
        },
        twitter: {
            card: "summary",
            title: t.metadata.title,
            description: t.metadata.description,
            images: ["/avatar.png"],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export function generateStaticParams() {
    return [{ lang: "de" }, { lang: "en" }];
}

export default async function LangLayout({ children, params }: Props) {
    const { lang } = await params;
    if (!isLang(lang)) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Jannik Thieme",
        url: "https://thieme.io",
        jobTitle: "Full-Stack Developer",
        description: translations[lang].metadata.description,
        image: "https://thieme.io/avatar.png",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Stuttgart",
            addressCountry: "DE",
        },
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Hochschule der Medien Stuttgart",
        },
        knowsAbout: [
            "Full-Stack Development",
            "React",
            "Next.js",
            "Angular",
            "TypeScript",
            "Spring Boot",
            "Mobile App Development",
            "DevOps",
            "AWS",
            "Kubernetes",
        ],
        sameAs: [
            "https://www.linkedin.com/in/jannik-thieme-51878a354/",
            "https://soundcloud.com/jnkoriginals",
        ],
    };

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Providers>
                    <Navbar lang={lang} />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
