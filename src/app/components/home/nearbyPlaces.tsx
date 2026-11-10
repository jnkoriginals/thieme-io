// Shared pieces of the nearby demo, copied from the app's PlaceCard, PlaceFacts and GoScreen.
// The app screen itself is German, so the demo stays German in both languages.

export type Category = { label: string; icon: string; color: string };

export type Place = {
    name: string;
    categories: Category[];
    address: string;
    open: boolean;
    distance: number;
    rating: string;
    image: string;
    /** A real card capture with its text baked in, instead of a photo. */
    capture?: boolean;
};

const PARK: Category = { label: "Park", icon: "park", color: "#0f9219" };
const BAR: Category = { label: "Bar", icon: "bar", color: "#6207cd" };
const CLUB: Category = { label: "Club", icon: "club", color: "#d81daf" };

export const PLACES: Place[] = [
    {
        name: "Schlossplatz",
        categories: [PARK],
        address: "Schloßpl. · Stuttgart",
        open: true,
        distance: 34,
        rating: "4.6",
        image: "/real/nearby-card-schlossplatz.webp",
        capture: true,
    },
    {
        name: "Mata Hari",
        categories: [BAR],
        address: "Geißstraße 3 · Stuttgart",
        open: true,
        distance: 445,
        rating: "4.4",
        image: "/nearby-card-1.webp",
    },
    {
        name: "Schräglage Club",
        categories: [CLUB, BAR],
        address: "Hirschstraße 14 · Stuttgart",
        open: false,
        distance: 444,
        rating: "3.1",
        image: "/nearby-card-2.webp",
    },
];

export const PRIMARY = "#341274";
export const SURFACE = "#f3f1f7";
export const APP_FONT =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif";
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Same rule as the app: ≈ 4.8 km/h, streets 30 % longer than the straight line. */
export const walkingMinutes = (meters: number) =>
    Math.max(1, Math.round((meters * 1.3) / 80));

export const categoryLabels = (place: Place) =>
    place.categories.map((category) => category.label).join(" · ");

export function CategoryIcon({
    category,
    className = "",
}: {
    category: Category;
    className?: string;
}) {
    const mask = `url(/nearby-icon-${category.icon}.svg) center / contain no-repeat`;
    return (
        <span
            aria-hidden='true'
            className={`block shrink-0 ${className}`}
            style={{
                backgroundColor: category.color,
                mask,
                WebkitMask: mask,
            }}
        />
    );
}

function Ionicon({ d, className }: { d: string; className: string }) {
    return (
        <svg
            viewBox='0 0 512 512'
            fill='currentColor'
            aria-hidden='true'
            className={className}
        >
            <path d={d} />
        </svg>
    );
}

export const StarIcon = ({ className }: { className: string }) => (
    <Ionicon
        className={className}
        d='M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z'
    />
);

export const BookmarkIcon = ({ className }: { className: string }) => (
    <Ionicon
        className={className}
        d='M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64 64 0 0164-64h192a64 64 0 0164 64v368a16 16 0 01-16 16z'
    />
);

export const NavigateIcon = ({ className }: { className: string }) => (
    <Ionicon
        className={className}
        d='M272 464a16 16 0 0 1-16-16.42V264.13a8 8 0 0 0-8-8H64.41a16.31 16.31 0 0 1-15.49-10.65 16 16 0 0 1 8.41-19.87l384-176.15a16 16 0 0 1 21.22 21.19l-176 384A16 16 0 0 1 272 464'
    />
);

export const CloseIcon = ({ className }: { className: string }) => (
    <Ionicon
        className={className}
        d='m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34Z'
    />
);

export function BookmarkOutlineIcon({ className }: { className: string }) {
    return (
        <svg viewBox='0 0 512 512' aria-hidden='true' className={className}>
            <path
                d='M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='32'
            />
        </svg>
    );
}

export function WalkIcon({ className }: { className: string }) {
    return (
        <svg
            viewBox='0 0 512 512'
            aria-hidden='true'
            className={className}
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
        >
            <path d='m314.21 482.32-56.77-114.74-44.89-57.39a72.8 72.8 0 0 1-10.13-37.05V144h15.67a40.22 40.22 0 0 1 40.23 40.22v183.36M127.9 293.05v-74.52S165.16 144 202.42 144M370.1 274.42 304 231M170.53 478.36 224 400' />
            <circle cx='258.32' cy='69.48' r='37.26' />
        </svg>
    );
}

/** The opening, distance and rating pills of PlaceFacts.tsx. */
export function PlaceFacts({
    place,
    glass,
}: {
    place: Place;
    glass?: boolean;
}) {
    const pill = `inline-flex items-center gap-[0.385em] rounded-full px-[0.769em] py-[0.385em] text-[0.8125em] font-medium leading-none whitespace-nowrap ${
        glass
            ? "bg-white/[0.18] text-white backdrop-blur-[12px]"
            : "bg-[#f3f1f7] text-[#0c0c0c]"
    }`;
    return (
        <ul className='flex flex-wrap gap-[0.375em]'>
            <li className={pill}>
                <span
                    className={`h-[0.538em] w-[0.538em] rounded-full ${place.open ? "bg-[#63a938] shadow-[0_0_0_0.23em_rgba(99,169,56,0.25)]" : "bg-[#e53935]"}`}
                />
                {place.open ? "Jetzt geöffnet" : "Geschlossen"}
            </li>
            <li className={pill}>{place.distance} m</li>
            <li className={pill}>
                <StarIcon className='h-[1.077em] w-[1.077em] text-[#f5c518]' />
                {place.rating}
            </li>
        </ul>
    );
}
