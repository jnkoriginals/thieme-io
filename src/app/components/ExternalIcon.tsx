/** Marks a link that leaves the site. An SVG, so no platform renders it as an emoji. */
export function ExternalIcon() {
    return (
        <svg
            viewBox='0 0 10 10'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.25'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
            className='ml-1 inline-block h-[0.65em] w-[0.65em] align-baseline'
        >
            <path d='M2 8l6-6M3.5 2H8v4.5' />
        </svg>
    );
}
