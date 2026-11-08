import Link from "next/link";
import type { Lang } from "@/lib/translations";

export function Footer({
    footer,
    lang,
}: {
    footer: { text: string; imprint: string };
    lang: Lang;
}) {
    return (
        <footer className='page-shell'>
            <div className='py-8 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
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
