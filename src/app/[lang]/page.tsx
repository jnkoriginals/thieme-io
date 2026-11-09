import Image from "next/image";
import Link from "next/link";
import { previewContent } from "@/lib/previewContent";
import { previewMore } from "@/lib/previewMore";
import { translations, type Lang } from "@/lib/translations";
import { ClosingFooter } from "@/app/components/home/ClosingFooter";
import { ContactSection } from "@/app/components/home/ContactSection";
import { HeroAvatar } from "@/app/components/home/HeroAvatar";
import { MoreSections } from "@/app/components/home/MoreSections";
import { MusicPlayer } from "@/app/components/home/MusicPlayer";
import { NearbyStack } from "@/app/components/home/NearbyStack";
import {
    BODY,
    DIVIDER,
    ITEM,
    LEAD,
    SECONDARY_LINK,
    SHELL,
    SMALL,
    TITLE,
} from "@/app/components/home/designTokens";
import { Reveal } from "@/app/components/home/Reveal";
import { SimpliShowcase } from "@/app/components/home/SimpliShowcase";
import { TrySketch } from "@/app/components/home/TrySketch";

type Props = {
    params: Promise<{ lang: string }>;
};

const NEARBY_BODY = "text-base leading-relaxed text-white/85";

export default async function PreviewPage({ params }: Props) {
    const { lang: rawLang } = await params;
    const lang: Lang = rawLang in translations ? (rawLang as Lang) : "de";
    const content = previewContent[lang];
    const [firstParagraph, ...moreParagraphs] = content.nearby.paragraphs;

    // The name is the heading now, so the greeting sentence is dropped.
    const introStart = content.intro.before
        .slice(content.intro.before.indexOf(". ") + 2);

    return (
        <main>
            <section className={`${SHELL} pt-36 md:pt-44`}>
                <HeroAvatar />
                <h1 className='mt-8 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-50'>
                    Jannik Thieme
                </h1>
                <p className='mt-3 text-xl font-medium tracking-[-0.015em] text-zinc-400'>
                    {content.intro.role}
                </p>
                <p className='mt-6 text-2xl leading-snug tracking-[-0.015em] text-zinc-300'>
                    {introStart}
                    <a
                        href='#projects'
                        className='text-zinc-50 underline decoration-indigo-400 decoration-2 underline-offset-4 transition-colors hover:text-indigo-300'
                    >
                        {content.intro.simpli}
                    </a>
                    {content.intro.middle}
                    {content.intro.mercedes}
                    {content.intro.after}
                </p>
                <p className={`mt-6 ${SMALL}`}>
                    {content.intro.note}
                </p>
                <MusicPlayer lang={lang} />
            </section>

            <hr className={DIVIDER} />

            <section id='projects' className='scroll-mt-24'>
                <Reveal>
                    <div className={SHELL}>
                        <h2 className='sr-only'>Simpli</h2>
                        <Image
                            src='/logo-simpli-light.svg'
                            alt=''
                            width={441}
                            height={215}
                            className='-ml-1 h-16 w-auto'
                        />
                        <p className={`mt-4 ${LEAD}`}>
                            {content.simpli.headline}
                        </p>
                        <p className={`mt-3 ${BODY}`}>
                            {content.simpli.body}
                        </p>
                        <p className={`mt-3 ${BODY}`}>
                            {content.simpli.story}
                        </p>
                        <div className='mt-4 flex flex-wrap gap-x-6 gap-y-2'>
                            <Link
                                href={`/${lang}/work/simpli`}
                                className='text-base font-medium text-indigo-400 transition-colors hover:text-indigo-300'
                            >
                                {content.simpli.caseStudy} →
                            </Link>
                            <a
                                href={`https://www.dashboard.simpli.menu/demo.html?lng=${lang}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={SECONDARY_LINK}
                            >
                                {content.simpli.demo} ↗
                            </a>
                            <a
                                href='https://simpli.menu'
                                target='_blank'
                                rel='noopener noreferrer'
                                className={SECONDARY_LINK}
                            >
                                {previewMore[lang].website} ↗
                            </a>
                        </div>
                    </div>
                </Reveal>
                <div className='mx-auto mt-10 w-full max-w-5xl px-6'>
                    <Reveal>
                        <SimpliShowcase lang={lang} />
                    </Reveal>
                </div>
            </section>

            <hr className={DIVIDER} />

            <section className='mx-auto w-full max-w-5xl overflow-x-clip px-3 md:px-6'>
                <div className='rounded-3xl bg-[#341274] px-6 py-10 md:px-14 md:py-14'>
                <Reveal>
                    <div className='grid md:grid-cols-[minmax(0,1fr)_18rem] md:grid-rows-[auto_1fr] md:gap-x-16'>
                        <div>
                            <div className='flex items-center gap-3'>
                                <Image
                                    src='/logo-nearby.svg'
                                    alt=''
                                    width={56}
                                    height={56}
                                    className='h-12 w-12'
                                />
                                <h2 className={TITLE}>nearby</h2>
                            </div>
                            <p className={`mt-6 ${LEAD}`}>
                                {content.nearby.tagline}
                            </p>
                            <p className={`mt-3 ${NEARBY_BODY}`}>
                                {firstParagraph}
                            </p>
                        </div>
                        {/* On phones the demo comes right after the pitch. */}
                        <div className='relative mx-auto mt-24 w-full max-w-[18rem] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-[4.7rem]'>
                            <TrySketch
                                label={previewMore[lang].swipeIt}
                                className='text-white'
                                loop
                            />
                            <NearbyStack lang={lang} />
                        </div>
                        <div className='mt-8 md:col-start-1 md:row-start-2 md:mt-3'>
                            <div className='flex flex-col gap-3'>
                                {moreParagraphs.map((text) => (
                                    <p
                                        key={text.slice(0, 32)}
                                        className={NEARBY_BODY}
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                            <h3 className={`mt-6 ${ITEM}`}>
                                {content.nearby.storyHeading}
                            </h3>
                            <p className={`mt-1 ${NEARBY_BODY}`}>
                                {content.nearby.story}
                            </p>
                            <a
                                href='https://www.edit-magazin.de/tindern-fuer-cafes-co.html'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-4 inline-block text-base font-medium text-white transition-opacity hover:opacity-80'
                            >
                                {content.nearby.press} ↗
                            </a>
                        </div>
                    </div>
                </Reveal>
                </div>
            </section>

            <MoreSections lang={lang} />
            <hr className={DIVIDER} />
            <ContactSection lang={lang} />
            <ClosingFooter lang={lang} />
        </main>
    );
}
