import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { previewContent } from "@/lib/previewContent";
import { previewMore } from "@/lib/previewMore";
import { translations, type Lang } from "@/lib/translations";
import { ContactSection } from "./ContactSection";
import { MoreSections } from "./MoreSections";
import { NearbyStack } from "./NearbyStack";
import { SimpliShowcase } from "./SimpliShowcase";

export const metadata: Metadata = {
    title: "Preview — Jannik Thieme",
    robots: { index: false, follow: false },
};

type Props = {
    params: Promise<{ lang: string }>;
};

const linkClass = "underline underline-offset-4 decoration-1 transition-colors";

export default async function PreviewPage({ params }: Props) {
    const { lang: rawLang } = await params;
    const lang: Lang = rawLang in translations ? (rawLang as Lang) : "de";
    const content = previewContent[lang];

    return (
        <main>
            <section className='mx-auto w-full max-w-3xl px-6 pt-36 md:pt-44 pb-20 md:pb-24'>
                <Image
                    src='/avatar.png'
                    alt='Jannik Thieme'
                    width={144}
                    height={144}
                    priority
                    className='h-16 w-16 rounded-full object-cover'
                />
                <p className='mt-8 text-3xl md:text-[2.75rem] font-medium tracking-tight leading-[1.2] text-zinc-100'>
                    {content.intro.before}
                    <a
                        href='#simpli'
                        className={`${linkClass} text-indigo-400 hover:text-indigo-300`}
                    >
                        {content.intro.simpli}
                    </a>
                    {content.intro.middle}
                    {content.intro.mercedes}
                    {content.intro.after}
                </p>
                <p className='mt-6 text-base text-zinc-400'>
                    {content.intro.note}
                </p>
            </section>

            <section id='simpli' className='scroll-mt-20'>
                <div className='mx-auto w-full max-w-3xl px-6'>
                    <h2 className='sr-only'>Simpli</h2>
                    <Image
                        src='/logo-simpli-light.svg'
                        alt=''
                        width={441}
                        height={215}
                        className='-ml-1 h-14 w-auto'
                    />
                    <p className='mt-4 text-2xl font-medium leading-snug tracking-tight text-zinc-100'>
                        {content.simpli.headline}
                    </p>
                    <p className='mt-5 text-lg leading-relaxed text-zinc-300'>
                        {content.simpli.body}
                    </p>
                    <div className='mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base'>
                        <Link
                            href={`/${lang}/work/simpli`}
                            className={`${linkClass} font-medium text-indigo-400 hover:text-indigo-300`}
                        >
                            {content.simpli.caseStudy}
                        </Link>
                        <a
                            href={`https://www.dashboard.simpli.menu/demo.html?lng=${lang}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${linkClass} text-zinc-300 hover:text-zinc-100`}
                        >
                            {content.simpli.demo} ↗
                        </a>
                        <a
                            href='https://simpli.menu'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={`${linkClass} text-zinc-300 hover:text-zinc-100`}
                        >
                            {previewMore[lang].website} ↗
                        </a>
                    </div>
                </div>
                <div className='mx-auto mt-10 w-full max-w-6xl px-6 md:mt-14'>
                    <SimpliShowcase lang={lang} />
                </div>
            </section>

            <div className='mx-auto w-full max-w-3xl px-6'>
                <section className='mt-16 md:mt-24 py-14 md:py-20 overflow-x-clip'>
                    <div className='grid gap-10 md:grid-cols-[1fr_18rem] md:gap-16 md:items-start'>
                        <div>
                            <div className='flex items-center gap-3'>
                                <Image
                                    src='/logo-nearby.svg'
                                    alt=''
                                    width={56}
                                    height={56}
                                    className='h-12 w-12 md:h-14 md:w-14'
                                />
                                <h2 className='text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100'>
                                    nearby
                                </h2>
                            </div>
                            <p className='mt-6 text-2xl font-medium leading-snug tracking-tight text-zinc-100'>
                                {content.nearby.tagline}
                            </p>
                            <div className='mt-5 flex flex-col gap-4'>
                                {content.nearby.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 32)}
                                        className='text-base md:text-lg leading-relaxed text-zinc-300'
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <NearbyStack lang={lang} />
                    </div>

                    <div className='mt-8 md:mt-10'>
                        <h3 className='text-xl font-semibold tracking-tight text-zinc-100'>
                            {content.nearby.storyHeading}
                        </h3>
                        <p className='mt-3 text-base md:text-lg leading-relaxed text-zinc-300'>
                            {content.nearby.story}
                        </p>
                        <div className='mt-4 text-base'>
                            <a
                                href='https://www.edit-magazin.de/tindern-fuer-cafes-co.html'
                                target='_blank'
                                rel='noopener noreferrer'
                                className={`${linkClass} text-zinc-300 hover:text-zinc-100`}
                            >
                                {content.nearby.press} ↗
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <MoreSections lang={lang} />
            <ContactSection lang={lang} />
            <div className='mt-8'>
                <Footer footer={translations[lang].footer} lang={lang} />
            </div>
        </main>
    );
}
