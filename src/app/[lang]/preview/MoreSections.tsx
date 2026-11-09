import type { ReactNode } from "react";
import Image from "next/image";
import { previewMore, type WorkItem } from "@/lib/previewMore";
import type { Lang } from "@/lib/translations";
import { BODY, DIVIDER, ITEM, LEAD, SHELL, SMALL, TITLE } from "./designTokens";
import { Reveal } from "./Reveal";

const rowGrid = "grid gap-1 md:grid-cols-[10rem_1fr] md:gap-6";

const ACCENTS: Record<string, string> = {
    Perky: "text-amber-300",
    Torga: "text-sky-400",
    "Gaia Protocol": "text-red-400",
};

function WorkTile({ item, wide }: { item: WorkItem; wide: boolean }) {
    return (
        <li className={wide ? "md:col-span-2" : ""}>
            <div
                className={`relative overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 ${wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}
            >
                {item.phoneScreens ? (
                    <div className='absolute inset-0 flex items-center justify-center gap-4 p-5'>
                        {item.phoneScreens.map((screen) => (
                            <Image
                                key={screen.src}
                                src={screen.src}
                                alt={screen.alt}
                                width={500}
                                height={1082}
                                sizes='240px'
                                className='h-full w-auto rounded-lg'
                            />
                        ))}
                    </div>
                ) : (
                    <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes={wide ? "(max-width: 768px) 100vw, 1000px" : "(max-width: 768px) 100vw, 500px"}
                        className={`object-cover ${wide ? "object-center" : "object-top"}`}
                    />
                )}
            </div>
            <div className='mt-4 max-w-2xl'>
                <h3 className={`text-lg font-medium tracking-[-0.01em] ${ACCENTS[item.name] ?? "text-zinc-100"}`}>
                    {item.name}
                </h3>
                <p className={`mt-1 ${BODY}`}>{item.body}</p>
                <p className={`mt-2 ${SMALL}`}>
                    {item.type}
                    {item.links.map((link) => (
                        <span key={link.href}>
                            {" · "}
                            <a
                                href={link.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={`font-medium transition-opacity hover:opacity-80 ${ACCENTS[item.name] ?? "text-zinc-100"}`}
                            >
                                {link.label} ↗
                            </a>
                        </span>
                    ))}
                </p>
            </div>
        </li>
    );
}

function AboutGroup({
    label,
    id,
    children,
}: {
    label: string;
    id?: string;
    children: ReactNode;
}) {
    return (
        <div id={id} className='mt-10 scroll-mt-24'>
            <h3 className={LEAD}>{label}</h3>
            <div className='mt-4 flex flex-col gap-5'>{children}</div>
        </div>
    );
}

function AboutRow({
    title,
    place,
    period,
    detail,
}: (typeof previewMore)[Lang]["education"][number]) {
    return (
        <div className={rowGrid}>
            <p className={`${SMALL} leading-6`}>{period}</p>
            <div>
                <p className={ITEM}>
                    {title}
                    <span className='font-normal text-zinc-400'>
                        {" · "}
                        {place}
                    </span>
                </p>
                {detail && (
                    <p className={`mt-1 ${BODY}`}>{detail.join(" ")}</p>
                )}
            </div>
        </div>
    );
}

export function MoreSections({ lang }: { lang: Lang }) {
    const more = previewMore[lang];

    return (
        <>
            <hr className={DIVIDER} />
            <section>
                <Reveal>
                    <div className={SHELL}>
                        <h2 className={TITLE}>{more.workHeading}</h2>
                    </div>
                    <ul className='mx-auto mt-8 grid w-full max-w-5xl gap-10 px-6 md:grid-cols-2 md:gap-8'>
                        {more.work.map((item, index) => (
                            <WorkTile
                                key={item.name}
                                item={item}
                                wide={index === more.work.length - 1}
                            />
                        ))}
                    </ul>
                </Reveal>
            </section>

            <hr className={DIVIDER} />
            <section
                id='experience'
                className={`${SHELL} scroll-mt-24`}
            >
                <h2 className={TITLE}>{more.aboutHeading}</h2>
                <p className={`mt-4 ${BODY}`}>{more.about}</p>
                <AboutGroup label={more.experienceLabel}>
                    {more.experience.map((entry) => (
                        <AboutRow
                            key={`${entry.place}-${entry.title}`}
                            {...entry}
                        />
                    ))}
                </AboutGroup>
                <AboutGroup label={more.educationLabel}>
                    {more.education.map((entry) => (
                        <AboutRow key={entry.title} {...entry} />
                    ))}
                </AboutGroup>
                <AboutGroup label={more.skillsLabel} id='skills'>
                    <dl className='flex flex-col gap-2'>
                        {more.skills.map((group) => (
                            <div key={group.category} className={rowGrid}>
                                <dt className={`${SMALL} leading-6`}>
                                    {group.category}
                                </dt>
                                <dd className={BODY}>{group.items}</dd>
                            </div>
                        ))}
                    </dl>
                </AboutGroup>
            </section>
        </>
    );
}
