import type { ReactNode } from "react";

export function PhoneFrame({
    children,
    screenClass = "bg-white",
}: {
    children: ReactNode;
    screenClass?: string;
}) {
    return (
        <div className='w-full rounded-[2.75rem] border-[9px] border-zinc-800 bg-zinc-800'>
            <div
                className={`overflow-hidden rounded-[2.2rem] pt-5 pb-4 ${screenClass}`}
            >
                {children}
            </div>
        </div>
    );
}
