import { Caveat } from "next/font/google";

const handwriting = Caveat({ subsets: ["latin"], weight: "700" });

/** Hand-drawn note above a phone. Sits in its positioned parent. */
export function TrySketch({
    label,
    className,
    loop = false,
}: {
    label: string;
    className: string;
    /** Left-aligned note with a looping arrow. */
    loop?: boolean;
}) {
    return (
        <div
            aria-hidden='true'
            className={`pointer-events-none absolute bottom-full mb-1 flex select-none items-start gap-1 ${loop ? "left-3 flex-row-reverse" : "right-3"} ${className}`}
        >
            <span
                className={`${handwriting.className} ${loop ? "rotate-3" : "-rotate-6"} whitespace-nowrap text-3xl leading-none`}
            >
                {label}
            </span>
            <svg
                viewBox='0 0 80 72'
                fill='none'
                stroke='currentColor'
                strokeWidth='3.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mt-3 h-[4.5rem] w-20'
            >
                {loop ? (
                    <>
                        <path d='M76 12C54 2 30 6 33 24c2 13 21 10 18-4C48 6 20 18 16 64' />
                        <path d='M4 50c4 6 8 12 12 16 5-5 11-11 17-14' />
                    </>
                ) : (
                    <>
                        <path d='M4 9c19-8 44-5 53 13 6 12 4 27-3 43' />
                        <path d='M40 50c3 6 9 13 13 17 6-5 14-11 21-15' />
                    </>
                )}
            </svg>
        </div>
    );
}
