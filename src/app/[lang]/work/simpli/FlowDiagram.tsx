export type FlowDiagramContent = {
    propose: string;
    execute: string;
    toolCalls: string;
    confirm: string;
    model: { title: string; text: string };
    fn: { title: string; text: string };
    dashboard: { title: string; text: string };
    store: { title: string; text: string };
};

function Arrow({ both, accent }: { both?: boolean; accent?: boolean }) {
    return (
        <svg
            viewBox='0 0 32 12'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
            className={`h-3 w-8 shrink-0 rotate-90 md:rotate-0 ${accent ? "text-indigo-400" : "text-zinc-500"}`}
        >
            <path d='M2 6h28M25 2l5 4-5 4' />
            {both && <path d='M7 2 2 6l5 4' />}
        </svg>
    );
}

function Link({
    label,
    both,
    accent,
}: {
    label?: string;
    both?: boolean;
    accent?: boolean;
}) {
    return (
        <div className='flex shrink-0 items-center justify-center gap-3 py-3 md:flex-col md:gap-1 md:px-1 md:py-0'>
            <Arrow both={both} accent={accent} />
            {label && (
                <span
                    className={`text-xs ${accent ? "font-medium text-indigo-400" : "text-zinc-400"}`}
                >
                    {label}
                </span>
            )}
        </div>
    );
}

function Node({ title, text }: { title: string; text: string }) {
    return (
        <div className='min-w-0 flex-1 rounded-xl bg-zinc-900 p-3 ring-1 ring-white/10'>
            <p className='text-sm font-medium text-zinc-100'>{title}</p>
            <p className='mt-1 text-xs leading-relaxed text-zinc-400'>{text}</p>
        </div>
    );
}

function Zone({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className='min-w-0 flex-1 rounded-2xl border border-dashed border-white/15 p-3'>
            <p className='mb-3 text-sm text-zinc-300'>{label}</p>
            <div className='flex flex-col md:flex-row md:items-stretch'>
                {children}
            </div>
        </div>
    );
}

/** Where the model's reach ends, and where a change is actually written. */
export function FlowDiagram({ content }: { content: FlowDiagramContent }) {
    return (
        <div className='mt-8 flex flex-col md:flex-row md:items-stretch'>
            <Zone label={content.propose}>
                <Node {...content.model} />
                <Link both />
                <Node {...content.fn} />
            </Zone>
            <Link both label={content.toolCalls} />
            <Zone label={content.execute}>
                <Node {...content.dashboard} />
                <Link accent label={content.confirm} />
                <Node {...content.store} />
            </Zone>
        </div>
    );
}
