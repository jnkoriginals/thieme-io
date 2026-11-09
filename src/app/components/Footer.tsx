import Link from "next/link";
import type { Lang } from "@/lib/translations";

export function Footer({
    footer,
    lang,
    shellClass = "page-shell",
    lineClass = "border-t border-zinc-800",
}: {
    footer: { text: string; imprint: string };
    lang: Lang;
    shellClass?: string;
    lineClass?: string;
}) {
    return (
        <footer className={shellClass}>
            <div
                className={`py-8 ${lineClass} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}
            >
                <p className='text-sm text-zinc-400'>{footer.text}</p>
                <Link
                    href={`/${lang}/impressum`}
                    className='text-sm text-indigo-400 transition-colors hover:text-indigo-300'
                >
                    {footer.imprint}
                </Link>
            </div>
        </footer>
    );
}
