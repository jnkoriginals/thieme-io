import type { ReactNode } from "react";
import Image from "next/image";
import { previewMore, type WorkItem } from "@/lib/previewMore";
import type { Lang } from "@/lib/translations";

const heading =
    "text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100";

function WorkRow({ item }: { item: WorkItem }) {
    return (
        <li className='grid gap-5 py-8 md:grid-cols-2 md:items-center md:gap-10'>
            <div className='md:order-2'>
                <div className='flex flex-wrap items-baseline gap-x-3'>
                    <h3 className='text-xl font-semibold tracking-tight text-zinc-100'>
                        {item.name}
                    </h3>
                    <p className='text-sm text-zinc-400'>{item.type}</p>
                </div>
                <p className='mt-2 text-base leading-relaxed text-zinc-300'>
                    {item.body}
                </p>
                <p className='mt-2 text-sm text-zinc-400'>{item.stack}</p>
                {item.links.length > 0 && (
                    <div className='mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm'>
                        {item.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-zinc-300 underline underline-offset-4 decoration-1 transition-colors hover:text-zinc-100'
                            >
                                {link.label} ↗
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <div className='relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 md:order-1'>
                {item.phoneScreens ? (
                    <div className='absolute inset-0 flex items-center justify-center gap-4 p-4'>
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
                        sizes='(max-width: 768px) 100vw, 400px'
                        className='object-cover object-top'
                    />
                )}
            </div>
        </li>
    );
}

function AboutGroup({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className='grid gap-3 py-6 md:grid-cols-[9rem_1fr] md:gap-6'>
            <h3 className='text-base font-medium text-zinc-400'>{label}</h3>
            <div>{children}</div>
        </div>
    );
}

function AboutEntry({
    title,
    place,
    period,
    detail,
    tags,
}: (typeof previewMore)[Lang]["education"][number]) {
    return (
        <div>
            <div className='flex items-baseline justify-between gap-4'>
                <p className='text-base font-medium text-zinc-100'>{title}</p>
                <p className='shrink-0 text-sm text-zinc-400'>{period}</p>
            </div>
            <p className='text-sm text-zinc-400'>{place}</p>
            {detail && (
                <ul className='mt-2 flex list-disc flex-col gap-1.5 pl-4 text-base leading-relaxed text-zinc-300 marker:text-zinc-600'>
                    {detail.map((point) => (
                        <li key={point.slice(0, 32)}>{point}</li>
                    ))}
                </ul>
            )}
            {tags && (
                <p className='mt-2 text-sm text-zinc-400'>{tags.join(" · ")}</p>
            )}
        </div>
    );
}

export function MoreSections({ lang }: { lang: Lang }) {
    const more = previewMore[lang];

    return (
        <>
            <section className='mx-auto w-full max-w-3xl px-6 py-14 md:py-20'>
                <h2 className={heading}>{more.workHeading}</h2>
                <ul className='mt-3 divide-y divide-zinc-800'>
                    {more.work.map((item) => (
                        <WorkRow key={item.name} item={item} />
                    ))}
                </ul>
            </section>

            <section className='mx-auto w-full max-w-3xl px-6 py-14 md:py-20'>
                <h2 className={heading}>{more.aboutHeading}</h2>
                <p className='mt-4 text-lg leading-relaxed text-zinc-300'>
                    {more.about}
                </p>
                <div className='mt-4 divide-y divide-zinc-800'>
                    <AboutGroup label={more.experienceLabel}>
                        <div className='flex flex-col gap-6'>
                            {more.experience.map((entry) => (
                                <AboutEntry
                                    key={`${entry.place}-${entry.title}`}
                                    {...entry}
                                />
                            ))}
                        </div>
                    </AboutGroup>
                    <AboutGroup label={more.educationLabel}>
                        <div className='flex flex-col gap-4'>
                            {more.education.map((entry) => (
                                <AboutEntry key={entry.title} {...entry} />
                            ))}
                        </div>
                    </AboutGroup>
                    <AboutGroup label={more.skillsLabel}>
                        <dl className='flex flex-col gap-3'>
                            {more.skills.map((group) => (
                                <div key={group.category}>
                                    <dt className='text-base font-medium text-zinc-100'>
                                        {group.category}
                                    </dt>
                                    <dd className='text-base text-zinc-300'>
                                        {group.items}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </AboutGroup>
                </div>
            </section>
        </>
    );
}
