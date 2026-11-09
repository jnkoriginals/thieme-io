"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    animate,
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import { previewContent } from "@/lib/previewContent";
import type { Lang } from "@/lib/translations";
import { HandIcon } from "@/app/components/HandIcon";
import { PhoneFrame } from "@/app/components/PhoneFrame";

// Positions of the real screen's card and buttons, in percent of the 804x1748 capture.
const CARD_AREA = {
    left: "3.98%",
    top: "12.81%",
    width: "92.04%",
    height: "70.71%",
};
const GO_BUTTON = {
    left: "20.9%",
    top: "85.35%",
    width: "58.2%",
    height: "6.41%",
};
const circle = (x: number, y: number, radius: number) => ({
    left: `${((x - radius) / 804) * 100}%`,
    top: `${((y - radius) / 1748) * 100}%`,
    width: `${((radius * 2) / 804) * 100}%`,
    height: `${((radius * 2) / 1748) * 100}%`,
});

// The app screen itself is German, so the cards stay German in both languages.
const PLACES = [
    { name: "Schlossplatz", capture: "/real/nearby-card-schlossplatz.webp" },
    {
        name: "Mata Hari",
        category: "Bar",
        address: "Geißstraße 3 · Stuttgart",
        open: true,
        distance: "445 m",
        rating: "4.4",
        image: "/nearby-card-1.webp",
    },
    {
        name: "Schräglage Club",
        category: "Club · Bar",
        address: "Hirschstraße 14 · Stuttgart",
        open: false,
        distance: "444 m",
        rating: "3.1",
        image: "/nearby-card-2.webp",
    },
];

type Place = (typeof PLACES)[number];
type Direction = "left" | "right";

const SWIPE_DISTANCE = 70;
const fact =
    "inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[0.66rem] font-medium leading-none whitespace-nowrap backdrop-blur-md";

function BookmarkIcon({ className }: { className: string }) {
    return (
        <svg
            viewBox='0 0 512 512'
            fill='currentColor'
            aria-hidden='true'
            className={className}
        >
            <path d='M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64 64 0 0164-64h192a64 64 0 0164 64v368a16 16 0 01-16 16z' />
        </svg>
    );
}

function Card({ place, saved }: { place: Place; saved: boolean }) {
    return (
        <article className='relative h-full w-full overflow-hidden rounded-[1.4rem] bg-zinc-800 text-white select-none'>
            {"capture" in place && place.capture ? (
                <Image
                    src={place.capture}
                    alt={place.name}
                    fill
                    draggable={false}
                    sizes='740px'
                    loading='eager'
                    className='object-cover pointer-events-none'
                />
            ) : (
                "image" in place && (
                    <>
                        <Image
                            src={place.image as string}
                            alt=''
                            fill
                            draggable={false}
                            sizes='1020px'
                            loading='eager'
                            className='object-cover object-[30%_center] pointer-events-none'
                        />
                        <div className='absolute inset-0 bg-[linear-gradient(to_top,rgba(8,4,20,0.9)_0%,rgba(8,4,20,0.55)_32%,rgba(8,4,20,0)_60%)]' />
                        <span className='absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[0.62rem] backdrop-blur-md'>
                            © {place.name}
                        </span>
                        <div className='absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3.5'>
                            <p className='text-[0.66rem] font-medium'>
                                {place.category}
                            </p>
                            <p className='text-[1.25rem] font-extrabold leading-tight tracking-[-0.02em]'>
                                {place.name}
                            </p>
                            <p className='mb-1 text-[0.75rem] text-white/90'>
                                {place.address}
                            </p>
                            <ul className='flex flex-wrap gap-1'>
                                <li className={fact}>
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${place.open ? "bg-[#75b74f]" : "bg-[#e53935]"}`}
                                    />
                                    {place.open
                                        ? "Jetzt geöffnet"
                                        : "Geschlossen"}
                                </li>
                                <li className={fact}>{place.distance}</li>
                                <li className={fact}>
                                    <span className='text-amber-300'>★</span>
                                    {place.rating}
                                </li>
                            </ul>
                        </div>
                    </>
                )
            )}
            {saved && (
                <span className='absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[0.62rem] font-semibold backdrop-blur-md'>
                    <BookmarkIcon className='h-2.5 w-2.5' />
                    Gemerkt
                </span>
            )}
        </article>
    );
}

type Layer = "top" | "next" | "hidden";

const LAYER_CLASS: Record<Layer, string> = {
    top: "z-20 cursor-grab active:cursor-grabbing",
    next: "z-10 pointer-events-none",
    hidden: "z-0 opacity-0 pointer-events-none",
};

// Every card stays mounted and only changes layer, so no photo reloads after a swipe.
function StackCard({
    place,
    layer,
    saved,
    leaving,
    nudge,
    onSwipe,
    onTouch,
    onLeft,
}: {
    place: Place;
    layer: Layer;
    saved: boolean;
    leaving: Direction | null;
    nudge: boolean;
    onSwipe: (direction: Direction) => void;
    onTouch: () => void;
    onLeft: (direction: Direction) => void;
}) {
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-10, 10]);
    const isTop = layer === "top";

    const latestOnLeft = useRef(onLeft);
    useEffect(() => {
        latestOnLeft.current = onLeft;
    }, [onLeft]);

    useEffect(() => {
        if (!isTop || !leaving) return;
        if (reduceMotion) {
            latestOnLeft.current(leaving);
            return;
        }
        const animation = animate(x, leaving === "right" ? 460 : -460, {
            duration: 0.28,
            ease: "easeOut",
            onComplete: () => latestOnLeft.current(leaving),
        });
        return () => animation.stop();
    }, [isTop, leaving, reduceMotion, x]);

    // One small wiggle to show the card can be swiped.
    useEffect(() => {
        if (!isTop || !nudge || reduceMotion) return;
        const animation = animate(x, [0, -28, 20, 0], {
            duration: 1.1,
            delay: 0.4,
            ease: "easeInOut",
        });
        return () => animation.stop();
    }, [isTop, nudge, reduceMotion, x]);

    // Back to the centre once it is out of sight, ready for its next turn.
    useLayoutEffect(() => {
        if (layer === "hidden") x.set(0);
    }, [layer, x]);

    return (
        <motion.div
            aria-hidden={!isTop}
            drag={isTop && !leaving ? "x" : false}
            dragSnapToOrigin
            dragElastic={0.7}
            onDragStart={onTouch}
            style={{ x, rotate, touchAction: "pan-y" }}
            onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > SWIPE_DISTANCE) {
                    onSwipe(info.offset.x > 0 ? "right" : "left");
                }
            }}
            className={`absolute inset-0 ${LAYER_CLASS[layer]}`}
        >
            <Card place={place} saved={saved} />
        </motion.div>
    );
}

export function NearbyStack({ lang }: { lang: Lang }) {
    const text = previewContent[lang].nearby.text;
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [saved, setSaved] = useState<string[]>([]);
    const [status, setStatus] = useState("");
    const [leaving, setLeaving] = useState<Direction | null>(null);
    // The swipe hint shows until the stack is first used.
    const [touched, setTouched] = useState(false);
    const screen = useRef<HTMLDivElement>(null);
    const inView = useInView(screen, { once: true, amount: 0.6 });
    const showHint = inView && !touched;

    const topIndex = index % PLACES.length;
    const nextIndex = (index + 1) % PLACES.length;
    const current = PLACES[topIndex];
    const isSaved = saved.includes(current.name);

    const leave = (direction: Direction) => {
        setTouched(true);
        if (!leaving) setLeaving(direction);
    };
    const finishLeaving = (direction: Direction) => {
        setStatus(direction === "right" ? text.going(current.name) : "");
        setIndex((value) => value + 1);
        setLeaving(null);
    };

    return (
        <div className='mx-auto w-full max-w-[18rem]'>
            <PhoneFrame>
                <div
                    ref={screen}
                    className='relative aspect-[804/1748] touch-pan-y'
                >
                    <Image
                        src='/real/nearby-app-screen.webp'
                        alt={text.screenAlt}
                        fill
                        sizes='804px'
                        className='object-cover'
                    />
                    <div className='absolute' style={CARD_AREA}>
                        {PLACES.map((place, i) => (
                            <StackCard
                                key={place.name}
                                place={place}
                                layer={
                                    i === topIndex
                                        ? "top"
                                        : i === nextIndex
                                          ? "next"
                                          : "hidden"
                                }
                                saved={saved.includes(place.name)}
                                leaving={leaving}
                                nudge={showHint}
                                onSwipe={leave}
                                onTouch={() => setTouched(true)}
                                onLeft={finishLeaving}
                            />
                        ))}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    aria-hidden='true'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='pointer-events-none absolute inset-0 z-30 flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
                                >
                                    <motion.span
                                        animate={
                                            reduceMotion
                                                ? undefined
                                                : { x: [0, -14, 10, 0] }
                                        }
                                        transition={{
                                            duration: 1.1,
                                            delay: 0.4,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 1.6,
                                        }}
                                    >
                                        <HandIcon className='h-10 w-10' />
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        type='button'
                        aria-label={text.skip}
                        onClick={() => leave("left")}
                        style={circle(88, 1548, 56)}
                        className='absolute rounded-full'
                    />
                    <button
                        type='button'
                        aria-label={text.go}
                        onClick={() => leave("right")}
                        style={GO_BUTTON}
                        className='absolute rounded-full'
                    />
                    <button
                        type='button'
                        aria-label={text.save}
                        aria-pressed={isSaved}
                        onClick={() => {
                            setTouched(true);
                            setSaved((names) =>
                                names.includes(current.name)
                                    ? names.filter(
                                          (name) => name !== current.name
                                      )
                                    : [...names, current.name]
                            );
                        }}
                        style={circle(716, 1548, 56)}
                        className='absolute rounded-full'
                    >
                        {isSaved && (
                            <motion.span
                                initial={{ scale: reduceMotion ? 1 : 0.6 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 16,
                                }}
                                className='flex h-full w-full items-center justify-center rounded-full bg-[#f3f1f7] text-[#341274]'
                            >
                                <BookmarkIcon className='h-1/2 w-1/2' />
                            </motion.span>
                        )}
                    </button>
                </div>
            </PhoneFrame>
            <p
                aria-live='polite'
                className='mt-4 text-center text-xs text-white/60'
            >
                {status || text.hint}
            </p>
        </div>
    );
}
