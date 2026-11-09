import type { Metadata } from "next";
import Link from "next/link";
import { ClosingFooter } from "@/app/components/home/ClosingFooter";
import { AssistantScenes } from "./AssistantScenes";
import { FlowDiagram } from "./FlowDiagram";
import { simpliCaseStudy } from "@/lib/caseStudies";
import { translations, type Lang } from "@/lib/translations";
import { ExternalIcon } from "@/app/components/ExternalIcon";

type Props = {
    params: Promise<{ lang: string }>;
};

const SHELL = "mx-auto w-full max-w-3xl px-6";

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
            <article className={`${SHELL} pt-32 md:pt-40`}>
                <Link
                    href={`/${lang}#projects`}
                    className='text-sm text-zinc-400 transition-colors hover:text-zinc-100'
                >
                    {content.back}
                </Link>

                <header className='mb-16 mt-8 md:mb-20'>
                    <h1 className='text-4xl font-medium tracking-[-0.035em] text-zinc-50 md:text-[3.25rem]'>
                        {content.title}
                    </h1>
                    <p className='mt-6 text-lg leading-relaxed text-zinc-300'>
                        {content.intro}
                    </p>
                    <p className='mt-3 text-base leading-relaxed text-zinc-400'>
                        {content.story}
                    </p>
                    <p className='mt-3 text-sm text-zinc-400'>
                        {content.stackLabel}: {content.stack}
                    </p>
                    <div className='mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base'>
                        <a
                            href='https://simpli.menu'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-medium text-zinc-100 transition-colors hover:text-indigo-300'
                        >
                            {content.live}<ExternalIcon />
                        </a>
                        <a
                            href={`https://www.dashboard.simpli.menu/demo.html?lng=${lang}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-zinc-400 transition-colors hover:text-zinc-100'
                        >
                            {content.demo}<ExternalIcon />
                        </a>
                    </div>
                </header>

                <div className='flex flex-col gap-16 md:gap-20'>
                    {content.sections.map((section) => (
                        <section key={section.heading}>
                            <h2 className='text-2xl font-medium tracking-[-0.02em] text-zinc-100'>
                                {section.heading}
                            </h2>
                            <div className='mt-4 flex flex-col gap-4'>
                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 32)}
                                        className='text-base leading-relaxed text-zinc-300 md:text-lg'
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                            {section.facts && (
                                <dl className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3'>
                                    {section.facts.map((fact) => (
                                        <div
                                            key={fact.label}
                                            className='flex flex-col-reverse justify-end gap-1'
                                        >
                                            <dt className='text-sm text-zinc-400'>
                                                {fact.label}
                                            </dt>
                                            <dd className='text-2xl font-medium tracking-[-0.02em] text-zinc-100'>
                                                {fact.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                            {section.diagram && (
                                <FlowDiagram content={section.diagram} />
                            )}
                            {section.assistantDemo && (
                                <div className='mt-10'>
                                    <AssistantScenes lang={lang} />
                                </div>
                            )}
                        </section>
                    ))}
                </div>
            </article>
            <ClosingFooter lang={lang} />
        </main>
    );
}
