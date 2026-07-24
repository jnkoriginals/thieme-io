import type { Metadata } from "next";
import Link from "next/link";
import { translations, type Lang } from "@/lib/translations";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = translations[(lang as Lang) in translations ? (lang as Lang) : "de"];

    return {
        title: `${t.legal.title} — Jannik Thieme`,
        alternates: {
            canonical: `https://thieme.io/${lang}/impressum`,
            languages: {
                de: "https://thieme.io/de/impressum",
                en: "https://thieme.io/en/impressum",
            },
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function ImpressumPage({ params }: Props) {
    const { lang } = await params;
    const validLang = (lang as Lang) in translations ? (lang as Lang) : "de";
    const t = translations[validLang];
    const l = t.legal;

    return (
        <main className='min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-14'>
            <div className='px-6 md:px-16 lg:px-24 max-w-3xl mx-auto py-24 md:py-32'>
                <h1 className='text-3xl md:text-4xl font-semibold tracking-tight mb-2'>
                    {l.title}
                </h1>
                <p className='text-sm text-neutral-400 mb-16'>{l.lastUpdated}</p>

                <div className='flex flex-col gap-10'>
                    <LegalSection title={l.section1Title}>
                        <p>{l.name}</p>
                        <p>{l.address}</p>
                        <p>{l.city}</p>
                        <p>{l.country}</p>
                    </LegalSection>

                    <LegalSection title={l.section2Title}>
                        <p>{l.contactText}</p>
                        <p>
                            <Link
                                href={`/${validLang}#contact`}
                                className='underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors'
                            >
                                {l.contactLinkLabel}
                            </Link>
                        </p>
                        <p>{l.website}</p>
                    </LegalSection>

                    <LegalSection title={l.section3Title}>
                        <p>{l.responsible}</p>
                    </LegalSection>

                    <LegalSection title={l.section4Title}>
                        <p>{l.disclaimer1}</p>
                    </LegalSection>

                    <LegalSection title={l.section5Title}>
                        <p>{l.copyright}</p>
                    </LegalSection>
                </div>

                <Link
                    href={`/${validLang}`}
                    className='inline-block mt-16 text-sm font-medium underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors'
                >
                    {l.backHome}
                </Link>
            </div>
        </main>
    );
}

function LegalSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-1'>
                {title}
            </h2>
            <div className='flex flex-col gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                {children}
            </div>
        </section>
    );
}
