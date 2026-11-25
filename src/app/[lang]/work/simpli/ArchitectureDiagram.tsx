type NodeContent = { title: string; text: string };

export type ArchitectureDiagramContent = {
    firebase: string;
    site: NodeContent;
    shared: NodeContent;
    dashboard: NodeContent;
    data: NodeContent;
    functions: NodeContent;
    services: NodeContent;
    uses: string;
    reads: string;
    writes: string;
    triggers: string;
    calls: string;
};

/** Points right on md+ and down below, `flip` reverses it, `vertical` keeps it down. */
function Arrow({
    both,
    vertical,
    flip,
}: {
    both?: boolean;
    vertical?: boolean;
    flip?: boolean;
}) {
    const turn = flip ? "-rotate-90 md:rotate-180" : vertical ? "rotate-90" : "rotate-90 md:rotate-0";
    return (
        <svg
            viewBox='0 0 32 12'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
            className={`h-3 w-8 shrink-0 text-zinc-500 ${turn}`}
        >
            <path d='M2 6h28M25 2l5 4-5 4' />
            {both && <path d='M7 2 2 6l5 4' />}
        </svg>
    );
}

function Link({
    label,
    both,
    vertical,
    flip,
}: {
    label: string;
    both?: boolean;
    vertical?: boolean;
    flip?: boolean;
}) {
    return (
        <div
            className={`flex shrink-0 items-center justify-center gap-3 py-3 ${vertical ? "" : "md:flex-col md:gap-1 md:px-1 md:py-0"}`}
        >
            <Arrow both={both} vertical={vertical} flip={flip} />
            <span className='text-xs text-zinc-400'>{label}</span>
        </div>
    );
}

function Node({ title, text, muted }: NodeContent & { muted?: boolean }) {
    return (
        <div
            className={`min-w-0 flex-1 rounded-xl p-3 ring-1 ${muted ? "ring-white/5" : "bg-zinc-900 ring-white/10"}`}
        >
            <p className='text-sm font-medium text-zinc-100'>{title}</p>
            <p className='mt-1 text-xs leading-relaxed text-zinc-400'>{text}</p>
        </div>
    );
}

/** The two apps, the package they share, and the Firebase project behind them. */
export function ArchitectureDiagram({
    content,
}: {
    content: ArchitectureDiagramContent;
}) {
    return (
        <div className='mt-8 flex flex-col'>
            <div className='flex flex-col md:flex-row md:items-stretch'>
                <Node {...content.site} />
                <Link label={content.uses} />
                <Node {...content.shared} muted />
                <Link flip label={content.uses} />
                <Node {...content.dashboard} />
            </div>

            <div className='grid grid-cols-2'>
                <Link vertical both label={content.reads} />
                <Link vertical both label={content.writes} />
            </div>

            <div className='rounded-2xl border border-dashed border-white/15 p-3'>
                <p className='mb-3 text-sm text-zinc-300'>{content.firebase}</p>
                <div className='flex flex-col'>
                    <Node {...content.data} />
                    <Link vertical label={content.triggers} />
                    <div className='flex flex-col md:flex-row md:items-stretch'>
                        <Node {...content.functions} />
                        <Link label={content.calls} />
                        <Node {...content.services} muted />
                    </div>
                </div>
            </div>
        </div>
    );
}
