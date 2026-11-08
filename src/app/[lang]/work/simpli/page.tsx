import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { AssistantDemo } from "./AssistantDemo";
import { simpliCaseStudy } from "@/lib/caseStudies";
import { translations, type Lang } from "@/lib/translations";

type Props = {
    params: Promise<{ lang: string }>;
};

const resolveLang = (lang: string): Lang =>
    lang in translations ? (lang as Lang) : "de";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const content = simpliCaseStudy[resolveLang(lang)];

    return {
        title: content.metaTitle,
        description: content.metaDescription,
        alternates: {
            canonical: `https://thieme.io/${lang}/work/simpli`,
            languages: {
                de: "https://thieme.io/de/work/simpli",
                en: "https://thieme.io/en/work/simpli",
                "x-default": "https://thieme.io/de/work/simpli",
            },
        },
    };
}

export default async function SimpliCaseStudy({ params }: Props) {
    const lang = resolveLang((await params).lang);
    const content = simpliCaseStudy[lang];

    return (
        <main>
            <article className='page-shell pb-20 pt-28 md:pb-28 md:pt-36'>
                <Link
                    href={`/${lang}#projects`}
                    className='py-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300'
                >
                    {content.back}
                </Link>

                <header className='mb-20 mt-8 md:mb-28'>
                    <h1 className='mb-10 text-6xl font-bold leading-[1] tracking-[-0.045em] text-zinc-50 md:mb-14 md:text-8xl'>
                        {content.title}
                    </h1>
                    <div className='page-grid gap-y-5'>
                        <div className='md:col-span-9 md:col-start-4 md:row-start-1'>
                            <p className='max-w-2xl text-lg leading-relaxed text-zinc-100 md:text-xl'>
                                {content.intro}
                            </p>
                            <p className='mt-4 text-sm text-zinc-400'>
                                {content.stackLabel}: {content.stack}
                            </p>
                        </div>
                        <div className='flex flex-wrap gap-x-4 text-sm font-medium md:col-span-3 md:col-start-1 md:row-start-1 md:flex-col md:items-start md:pt-1'>
                            <a
                                href='https://simpli.menu'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='py-1 text-indigo-400 transition-colors hover:text-indigo-300'
                            >
                                {content.live} ↗
                            </a>
                            <a
                                href={`https://www.dashboard.simpli.menu/demo.html?lng=${lang}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='py-1 text-indigo-400 transition-colors hover:text-indigo-300'
                            >
                                {content.demo} ↗
                            </a>
                        </div>
                    </div>
                </header>

                <div className='flex flex-col gap-20 md:gap-28'>
                    {content.sections.map((section) => (
                        <section key={section.heading}>
                            <div className='page-grid gap-y-4'>
                                <h2 className='text-2xl font-bold tracking-[-0.03em] text-zinc-50 md:col-span-3'>
                                    {section.heading}
                                </h2>
                                <div className='md:col-span-9'>
                                    <div className='flex max-w-2xl flex-col gap-4'>
                                        {section.paragraphs.map((paragraph) => (
                                            <p
                                                key={paragraph.slice(0, 32)}
                                                className='leading-relaxed text-zinc-300 md:text-lg'
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                    {section.facts && (
                                        <dl className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3'>
                                            {section.facts.map((fact) => (
                                                <div key={fact.label}>
                                                    <dt className='text-3xl font-bold tracking-[-0.03em] text-zinc-50'>
                                                        {fact.value}
                                                    </dt>
                                                    <dd className='mt-1 text-sm text-zinc-400'>
                                                        {fact.label}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    )}
                                    {section.assistantDemo && (
                                        <div className='mt-12 flex justify-center md:justify-start'>
                                            <AssistantDemo lang={lang} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {section.image && (
                                <Image
                                    src={section.image.src}
                                    alt={section.image.alt}
                                    width={2000}
                                    height={1330}
                                    sizes='(max-width: 768px) 100vw, 1072px'
                                    className='mt-10 h-auto w-full rounded-2xl md:mt-14'
                                />
                            )}
                        </section>
                    ))}
                </div>
            </article>
            <Footer footer={translations[lang].footer} lang={lang} />
        </main>
    );
}
