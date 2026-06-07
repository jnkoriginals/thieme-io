import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import { Navbar } from "@/app/components/Navbar";
import { translations, type Lang } from "@/lib/translations";

type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = translations[(lang as Lang) in translations ? (lang as Lang) : "de"];

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        alternates: {
            canonical: `https://thieme.io/${lang}`,
            languages: {
                de: "https://thieme.io/de",
                en: "https://thieme.io/en",
            },
        },
        openGraph: {
            title: t.metadata.title,
            description: t.metadata.description,
            url: `https://thieme.io/${lang}`,
            siteName: "Jannik Thieme",
            type: "website",
            locale: lang === "de" ? "de_DE" : "en_US",
            images: [
                {
                    url: "/avatar.jpg",
                    width: 800,
                    height: 800,
                    alt: "Jannik Thieme",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t.metadata.title,
            description: t.metadata.description,
            images: ["/avatar.jpg"],
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
    const validLang = (lang as Lang) in translations ? (lang as Lang) : "de";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Jannik Thieme",
        url: "https://thieme.io",
        jobTitle: "Full-Stack Developer",
        image: "https://thieme.io/avatar.jpg",
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Hochschule der Medien Stuttgart",
        },
        sameAs: ["https://www.linkedin.com/in/jannik-thieme-51878a354/"],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Providers>
                <Navbar lang={validLang} />
                {children}
            </Providers>
        </>
    );
}
