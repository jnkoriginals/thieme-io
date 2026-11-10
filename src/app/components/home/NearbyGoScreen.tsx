"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    APP_FONT,
    BookmarkIcon,
    BookmarkOutlineIcon,
    CategoryIcon,
    CloseIcon,
    EASE_OUT,
    NavigateIcon,
    PlaceFacts,
    PRIMARY,
    WalkIcon,
    categoryLabels,
    walkingMinutes,
    type Place,
} from "./nearbyPlaces";

// GoScreen.tsx and GoScreen.css from the app: the backdrop fades in, the chosen
// card lands (from the right after a swipe, rising after the button), then the
// rest follows piece by piece.
const FADE = 0.6;
const CONTENT = 0.65;
const START = 0.35;
const STAGGER = 0.09;

export type ChosenVia = "swipe" | "button";

export function NearbyGoScreen({
    place,
    via,
    saved,
    onToggleSave,
    onClose,
    onKeepLooking,
    routeNote,
}: {
    place: Place;
    via: ChosenVia;
    saved: boolean;
    onToggleSave: () => void;
    onClose: () => void;
    onKeepLooking: () => void;
    /** Shown instead of leaving the site: the demo only says where the app would go. */
    routeNote: string;
}) {
    const reduceMotion = useReducedMotion();
    const root = useRef<HTMLDivElement>(null);
    const minutes = walkingMinutes(place.distance);
    const [noteShown, setNoteShown] = useState(false);
    const noteTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    useEffect(() => () => clearTimeout(noteTimer.current), []);

    const showRouteNote = () => {
        setNoteShown(true);
        clearTimeout(noteTimer.current);
        noteTimer.current = setTimeout(() => setNoteShown(false), 2600);
    };

    useEffect(() => {
        root.current?.focus();
    }, []);

    const step = (n: number) => ({
        initial: { opacity: 0, y: "0.75em" },
        animate: { opacity: 1, y: 0 },
        transition: reduceMotion
            ? { duration: 0 }
            : {
                  duration: CONTENT,
                  ease: EASE_OUT,
                  delay: START + 0.2 + n * STAGGER,
              },
    });

    const cardFrom =
        via === "swipe"
            ? { opacity: 0, x: "24%", rotate: 5, scale: 0.95 }
            : { opacity: 0, y: "1.5em", scale: 0.96 };

    return (
        <motion.div
            ref={root}
            role='dialog'
            aria-modal='true'
            aria-labelledby='nearby-go-title'
            tabIndex={-1}
            onKeyDown={(event) => {
                if (event.key === "Escape") onClose();
            }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.25 } }}
            // The screen capture is 402pt wide, so 1em is 16pt at any size.
            style={{
                fontFamily: APP_FONT,
                fontSize: "calc(100cqw * 16 / 402)",
            }}
            className='absolute inset-0 z-40 flex flex-col text-[#0c0c0c] outline-none'
        >
            <motion.div
                aria-hidden='true'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: reduceMotion ? 0 : FADE,
                    ease: "easeInOut",
                }}
                className='absolute inset-0 -z-10 bg-[#fffefe]'
            />

            <motion.div {...step(5)} className='flex px-[1em] pt-[0.5em]'>
                <button
                    type='button'
                    aria-label='Zurück zur Karte'
                    onClick={onClose}
                    className='grid h-[2.5em] w-[2.5em] place-items-center rounded-full bg-[#f3f1f7] active:scale-90 transition-transform'
                >
                    <CloseIcon className='h-[1.375em] w-[1.375em]' />
                </button>
            </motion.div>

            <div className='flex min-h-0 flex-1 flex-col gap-[1.5em] px-[1.5em] pt-[0.5em]'>
                <motion.div
                    initial={cardFrom}
                    animate={{
                        opacity: [0, 1, 1],
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                    }}
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : {
                                  duration: CONTENT + 0.15,
                                  ease: EASE_OUT,
                                  delay: START,
                                  opacity: {
                                      duration: CONTENT + 0.15,
                                      times: [0, 0.4, 1],
                                      delay: START,
                                  },
                              }
                    }
                    className='relative min-h-[10em] flex-1 overflow-hidden rounded-[1.5em] bg-[#f3f1f7] shadow-[0_10px_30px_rgba(20,10,45,0.12),0_2px_6px_rgba(20,10,45,0.06)]'
                >
                    <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes='740px'
                        className={`object-cover ${place.capture ? "object-top" : "object-[30%_center]"}`}
                    />
                    <span className='absolute left-[1.333em] top-[1.333em] inline-flex items-center gap-[0.5em] rounded-full bg-black/35 py-[0.417em] pl-[0.5em] pr-[0.833em] text-[0.75em] font-semibold text-white backdrop-blur-[10px]'>
                        <span className='flex gap-[0.333em]'>
                            {place.categories.map((category) => (
                                <CategoryIcon
                                    key={category.icon}
                                    category={category}
                                    className='h-[1.5em] w-[1.5em]'
                                />
                            ))}
                        </span>
                        {categoryLabels(place)}
                    </span>
                </motion.div>

                <div className='flex flex-col gap-[0.375em]'>
                    <motion.p
                        {...step(1)}
                        style={{ color: PRIMARY }}
                        className='text-[0.9375em] font-extrabold'
                    >
                        Auf geht&apos;s!
                    </motion.p>
                    <motion.h2
                        {...step(2)}
                        id='nearby-go-title'
                        className='text-[2em] font-extrabold leading-[1.1] tracking-[-0.025em]'
                    >
                        {place.name}
                    </motion.h2>
                    <motion.p
                        {...step(3)}
                        className='text-[0.9375em] text-[#666]'
                    >
                        {place.address}
                    </motion.p>
                    <motion.div
                        {...step(4)}
                        className='mt-[0.375em] flex flex-wrap items-center gap-[0.375em]'
                    >
                        <span
                            style={{ color: PRIMARY }}
                            className='inline-flex items-center gap-[0.385em] rounded-full bg-[rgba(52,18,116,0.12)] px-[0.769em] py-[0.385em] text-[0.8125em] font-semibold leading-none whitespace-nowrap'
                        >
                            <WalkIcon className='h-[1.154em] w-[1.154em]' />≈{" "}
                            {minutes} Min. zu Fuß
                        </span>
                        <PlaceFacts place={place} />
                    </motion.div>
                </div>
            </div>

            <motion.div
                {...step(5)}
                className='grid gap-[0.5em] px-[1.5em] pb-[1em] pt-[1.5em]'
            >
                <button
                    type='button'
                    onClick={showRouteNote}
                    style={{ backgroundColor: PRIMARY }}
                    className='flex h-[3.5em] items-center justify-center gap-[0.5em] rounded-full font-semibold text-[#fffefe] shadow-[0_6px_20px_rgba(20,10,45,0.18)] transition-transform active:scale-[0.97]'
                >
                    <NavigateIcon className='h-[1.25em] w-[1.25em]' />
                    Route starten
                </button>
                <button
                    type='button'
                    aria-pressed={saved}
                    onClick={onToggleSave}
                    style={saved ? { color: PRIMARY } : undefined}
                    className='flex h-[3.5em] items-center justify-center gap-[0.5em] rounded-full bg-[#f3f1f7] font-semibold transition-transform active:scale-[0.97]'
                >
                    {saved ? (
                        <motion.span
                            key='saved'
                            initial={{ scale: 1 }}
                            animate={
                                reduceMotion
                                    ? undefined
                                    : { scale: [1, 1.35, 1] }
                            }
                            transition={{ duration: 0.25, ease: EASE_OUT }}
                        >
                            <BookmarkIcon className='h-[1.25em] w-[1.25em]' />
                        </motion.span>
                    ) : (
                        <BookmarkOutlineIcon className='h-[1.25em] w-[1.25em]' />
                    )}
                    {saved ? "Gemerkt" : "Für später merken"}
                </button>
                <button
                    type='button'
                    onClick={onKeepLooking}
                    className='h-[3em] rounded-full font-semibold text-[#666] transition-colors active:bg-[#f3f1f7]'
                >
                    Doch weitersuchen
                </button>
            </motion.div>
            <AnimatePresence>
                {noteShown && (
                    <motion.p
                        role='status'
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className='absolute inset-x-[1.5em] bottom-[13.5em] z-10 rounded-[1em] bg-[#0c0c0c]/85 px-[1em] py-[0.75em] text-center text-[0.875em] font-medium text-white backdrop-blur-md'
                    >
                        {routeNote}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
