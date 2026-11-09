import Link from "next/link";
import { translations, type Lang } from "@/lib/translations";
import { DIVIDER, SHELL, SMALL } from "./designTokens";
import { ExternalIcon } from "@/app/components/ExternalIcon";

export function ClosingFooter({ lang }: { lang: Lang }) {
    const footer = translations[lang].footer;
    const linkClass =
        "justify-self-end transition-colors hover:text-zinc-100";

    return (
        <footer className='overflow-hidden'>
            <hr className={DIVIDER} />
            <p
                aria-hidden='true'
                className='whitespace-nowrap text-center text-[13.5vw] font-semibold leading-[0.95] tracking-[-0.05em] text-zinc-100'
            >
                Jannik Thieme
            </p>
            <div
                className={`${SHELL} ${SMALL} mt-10 grid grid-cols-[auto_auto] items-center justify-between gap-x-4 gap-y-2 pb-8 md:flex`}
            >
                <p>Stuttgart</p>
                <a
                    href='https://www.linkedin.com/in/jannik-thieme-51878a354/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={linkClass}
                >
                    LinkedIn<ExternalIcon />
                </a>
                <p className='whitespace-nowrap'>{footer.text}</p>
                <Link href={`/${lang}/impressum`} className={linkClass}>
                    {footer.imprint}
                </Link>
            </div>
        </footer>
    );
}
