import type { ReactNode } from "react";

export function PhoneFrame({
    children,
    screenClass = "bg-white pt-5 pb-4",
}: {
    children: ReactNode;
    screenClass?: string;
}) {
    return (
        <div className='w-full rounded-[2.75rem] border-[8px] border-zinc-800 bg-zinc-800 shadow-2xl shadow-black/60 ring-1 ring-white/10'>
            <div
                className={`overflow-hidden rounded-[2.2rem] ${screenClass}`}
            >
                {children}
            </div>
        </div>
    );
}
