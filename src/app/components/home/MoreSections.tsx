import type { ReactNode } from "react";
import Image from "next/image";
import { previewMore, type WorkItem } from "@/lib/previewMore";
import type { Lang } from "@/lib/translations";
import { BODY, DIVIDER, ITEM, LEAD, SHELL, SMALL, TITLE } from "./designTokens";
import { Reveal } from "./Reveal";
import { ExternalIcon } from "@/app/components/ExternalIcon";

const rowGrid = "grid gap-1 md:grid-cols-[10rem_1fr] md:gap-6";

const WORK_STYLE: Record<
    string,
    { accent: string; panel: string; width: number; height: number }
> = {
    Perky: { accent: "text-amber-300", panel: "bg-[#4a3212]", width: 500, height: 1082 },
    Torga: { accent: "text-sky-400", panel: "bg-[#12324a]", width: 1200, height: 934 },
    "Gaia Protocol": { accent: "text-red-400", panel: "bg-[#4a1518]", width: 1920, height: 1080 },
};

// Every tile is the same: a colour panel with the whole image centred inside.
function WorkTile({ item }: { item: WorkItem }) {
    const style = WORK_STYLE[item.name];

    return (
        <li>
            <div
                className={`relative aspect-[4/3] overflow-hidden rounded-3xl ${style.panel}`}
            >
                <div className='absolute inset-0 flex items-center justify-center gap-3 p-5'>
                    {item.phoneScreens ? (
                        item.phoneScreens.map((screen) => (
                            <Image
                                key={screen.src}
                                src={screen.src}
                                alt={screen.alt}
                                width={style.width}
                                height={style.height}
                                sizes='160px'
                                className='h-full w-auto rounded-xl'
                            />
                        ))
                    ) : (
                        <Image
                            src={item.image}
                            alt={item.alt}
                            width={style.width}
                            height={style.height}
                            sizes='(max-width: 768px) 100vw, 320px'
                            className='max-h-full w-auto max-w-full rounded-xl'
                        />
                    )}
                </div>
            </div>
            <h3
                className={`mt-4 text-lg font-medium tracking-[-0.01em] ${style.accent}`}
            >
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
                            className={`font-medium transition-opacity hover:opacity-80 ${style.accent}`}
                        >
                            {link.label}<ExternalIcon />
                        </a>
                    </span>
                ))}
            </p>
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
                    <ul className='mx-auto mt-8 grid w-full max-w-5xl gap-10 px-6 md:grid-cols-3 md:gap-6'>
                        {more.work.map((item) => (
                            <WorkTile key={item.name} item={item} />
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
                            <div
                                key={group.category}
                                className='md:grid md:grid-cols-[10rem_1fr] md:gap-6'
                            >
                                <dt className={`${SMALL} inline leading-6 md:block`}>
                                    {group.category}
                                    <span className='md:hidden'>: </span>
                                </dt>
                                <dd className={`${BODY} inline md:block`}>
                                    {group.items}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </AboutGroup>
            </section>
        </>
    );
}
