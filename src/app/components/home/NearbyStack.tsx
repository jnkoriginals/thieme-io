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
    type MotionValue,
} from "framer-motion";
import { previewContent } from "@/lib/previewContent";
import type { Lang } from "@/lib/translations";
import { HandIcon } from "@/app/components/HandIcon";
import { PhoneFrame } from "@/app/components/PhoneFrame";
import { NearbyGoScreen, type ChosenVia } from "./NearbyGoScreen";
import {
    APP_FONT,
    BookmarkIcon,
    BookmarkOutlineIcon,
    CategoryIcon,
    CloseIcon,
    NavigateIcon,
    EASE_OUT,
    PLACES,
    PRIMARY,
    PlaceFacts,
    SURFACE,
    categoryLabels,
    type Category,
    type Place,
} from "./nearbyPlaces";

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
// The park icon baked into the Schlossplatz capture (740x1236), for the save flight.
const CAPTURE_ICON = {
    left: `${(40 / 740) * 100}%`,
    top: `${(961 / 1236) * 100}%`,
    width: `${(40 / 740) * 100}%`,
    height: `${(40 / 1236) * 100}%`,
};

type Direction = "left" | "right";

const SWIPE_DISTANCE = 70;
/** Share of the screen width that counts as a full drag for the buttons, as in the app. */
const PROGRESS_SHARE = 0.28;
/** "Let's go" takes over while the swiped card is still leaving. */
const GO_DELAY_MS = 60;
/** How long the save button stays filled after an icon lands in it. */
const CATCH_MS = 900;
const FLIGHT_S = 0.64;

// The rebuilt cards copy PlaceCard.css from the app. The app card is 370pt wide,
// so 1em here is 16pt at that width and every size below is the app's value in em.
const CARD_FONT_SIZE = "calc(100cqw * 16 / 370)";

function Card({
    place,
    saved,
    iconRef,
}: {
    place: Place;
    saved: boolean;
    iconRef: (node: HTMLElement | null) => void;
}) {
    return (
        <article
            style={{ fontSize: CARD_FONT_SIZE, fontFamily: APP_FONT }}
            className='relative h-full w-full overflow-hidden rounded-[1.5em] bg-zinc-800 text-white select-none'
        >
            {place.capture ? (
                <>
                    <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        draggable={false}
                        sizes='740px'
                        loading='eager'
                        className='object-cover pointer-events-none'
                    />
                    <span
                        ref={iconRef}
                        aria-hidden='true'
                        className='absolute'
                        style={CAPTURE_ICON}
                    />
                </>
            ) : (
                <>
                    <Image
                        src={place.image}
                        alt=''
                        fill
                        draggable={false}
                        sizes='1020px'
                        loading='eager'
                        className='object-cover object-[30%_center] pointer-events-none'
                    />
                    <div className='absolute inset-0 bg-[linear-gradient(to_top,rgba(8,4,20,0.9)_0%,rgba(8,4,20,0.55)_32%,rgba(8,4,20,0)_60%)]' />
                    <span className='absolute right-[0.5em] top-[0.5em] max-w-[70%] truncate rounded-full bg-black/35 px-[0.5em] py-[0.125em] text-[0.6875em] backdrop-blur-[8px]'>
                        ©&nbsp;{place.name}
                    </span>
                    <div className='absolute inset-x-0 bottom-0 flex flex-col gap-[0.375em] px-[1.25em] pb-[1.25em] pt-[1.5em]'>
                        <div className='flex items-center gap-[0.5em] text-[0.8125em] font-medium opacity-90'>
                            <span className='flex gap-[0.25em]'>
                                {place.categories.map((category, i) => (
                                    <span
                                        key={category.icon}
                                        ref={i === 0 ? iconRef : undefined}
                                        className='h-[1.538em] w-[1.538em]'
                                    >
                                        <CategoryIcon
                                            category={category}
                                            className='h-full w-full'
                                        />
                                    </span>
                                ))}
                            </span>
                            <span>{categoryLabels(place)}</span>
                        </div>
                        <p className='text-[1.75em] font-extrabold leading-[1.15] tracking-[-0.02em]'>
                            {place.name}
                        </p>
                        <p className='mb-[0.4em] text-[0.9375em] opacity-85'>
                            {place.address}
                        </p>
                        <PlaceFacts place={place} glass />
                    </div>
                </>
            )}
            {saved && (
                <span className='absolute left-[1.333em] top-[1.333em] inline-flex items-center gap-[0.333em] rounded-full bg-black/35 px-[0.833em] py-[0.417em] text-[0.75em] font-semibold backdrop-blur-[10px]'>
                    <BookmarkIcon className='h-[1em] w-[1em]' />
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
    parked,
    nudge,
    iconRef,
    onSwipe,
    onTouch,
    onLeft,
    onMove,
}: {
    place: Place;
    layer: Layer;
    saved: boolean;
    leaving: Direction | null;
    /** Swiped right and waiting off screen behind the "let's go" screen. */
    parked: boolean;
    nudge: boolean;
    iconRef: (node: HTMLElement | null) => void;
    onSwipe: (direction: Direction) => void;
    onTouch: () => void;
    onLeft: (direction: Direction) => void;
    /** Reports the top card's offset, so the buttons can answer the drag. */
    onMove: (x: number) => void;
}) {
    const reduceMotion = useReducedMotion();
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-300, 300], [-10, 10]);
    const isTop = layer === "top";

    const latestOnLeft = useRef(onLeft);
    const latestOnMove = useRef(onMove);
    useEffect(() => {
        latestOnLeft.current = onLeft;
        latestOnMove.current = onMove;
    }, [onLeft, onMove]);

    useEffect(() => {
        if (!isTop) return;
        latestOnMove.current(x.get());
        return x.on("change", (value) => latestOnMove.current(value));
    }, [isTop, x]);

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

    // Back from "let's go" with the close button: the card returns to the deck.
    useEffect(() => {
        if (!isTop || parked || leaving || x.get() === 0) return;
        const animation = animate(x, 0, {
            duration: reduceMotion ? 0 : 0.4,
            ease: EASE_OUT,
        });
        return () => animation.stop();
    }, [isTop, parked, leaving, reduceMotion, x]);

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
            drag={isTop && !leaving && !parked ? "x" : false}
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
            <Card place={place} saved={saved} iconRef={iconRef} />
        </motion.div>
    );
}

type Flight = {
    id: number;
    category: Category;
    left: number;
    top: number;
    size: number;
    dx: number;
    dy: number;
    lift: number;
};

/**
 * The card's category icon is lifted and dropped into the save button in an arc,
 * like flyIntoButton in the app's SwipeDeck. The horizontal and vertical motion
 * use different easings, which bends the path.
 */
function FlyingIcon({
    flight,
    onLand,
}: {
    flight: Flight;
    onLand: () => void;
}) {
    return (
        <motion.div
            aria-hidden='true'
            className='pointer-events-none absolute z-50'
            style={{
                left: flight.left,
                top: flight.top,
                width: flight.size,
                height: flight.size,
            }}
            initial={{ x: 0 }}
            animate={{ x: flight.dx }}
            transition={{ duration: FLIGHT_S, ease: [0.4, 0, 0.6, 1] }}
        >
            <motion.div
                className='h-full w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]'
                initial={{ y: 0, scale: 0.45, rotate: 0, opacity: 0 }}
                animate={{
                    y: [0, -flight.lift, flight.dy],
                    scale: [0.45, 1.15, 0.4],
                    rotate: [0, -12, 8],
                    opacity: [0, 1, 0.6],
                }}
                transition={{
                    duration: FLIGHT_S,
                    times: [0, 0.35, 1],
                    ease: [
                        [0.22, 1, 0.36, 1],
                        [0.55, 0, 0.9, 0.4],
                    ],
                }}
                onAnimationComplete={onLand}
            >
                <CategoryIcon
                    category={flight.category}
                    className='h-full w-full'
                />
            </motion.div>
        </motion.div>
    );
}

// The deck buttons of SwipeDeck.css, drawn over the capture so they can answer
// the drag: skip grows towards a left swipe, "let's go" towards a right one.
const SCREEN_FONT_SIZE = "calc(100cqw * 16 / 402)";

function SkipButton({
    label,
    progress,
    onClick,
}: {
    label: string;
    progress: MotionValue<number>;
    onClick: () => void;
}) {
    const scale = useTransform(progress, (p) => 1 + Math.max(0, -p) * 0.15);
    return (
        <motion.div
            className='absolute'
            style={{ ...circle(88, 1548, 56), scale }}
        >
            <button
                type='button'
                aria-label={label}
                onClick={onClick}
                style={{ backgroundColor: SURFACE, fontSize: SCREEN_FONT_SIZE }}
                className='grid h-full w-full place-items-center rounded-full text-[#666] transition-transform duration-150 active:scale-[0.88]'
            >
                <CloseIcon className='h-[1.5em] w-[1.5em]' />
            </button>
        </motion.div>
    );
}

function GoButton({
    label,
    progress,
    onClick,
}: {
    label: string;
    progress: MotionValue<number>;
    onClick: () => void;
}) {
    const scale = useTransform(progress, (p) => 1 + Math.max(0, p) * 0.06);
    const boxShadow = useTransform(
        progress,
        (p) =>
            `0 0 0 ${Math.max(0, p) * 0.375}em rgba(52, 18, 116, 0.2), 0 0.375em 1.25em rgba(20, 10, 45, 0.18)`
    );
    return (
        <motion.button
            type='button'
            aria-label={label}
            onClick={onClick}
            style={{
                ...GO_BUTTON,
                scale,
                boxShadow,
                backgroundColor: PRIMARY,
                fontSize: SCREEN_FONT_SIZE,
                fontFamily: APP_FONT,
            }}
            className='absolute flex items-center justify-center gap-[0.5em] rounded-full font-semibold text-[#fffefe]'
        >
            <NavigateIcon className='h-[1.25em] w-[1.25em]' />
            Auf geht&apos;s!
        </motion.button>
    );
}

export function NearbyStack({ lang }: { lang: Lang }) {
    const text = previewContent[lang].nearby.text;
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [saved, setSaved] = useState<string[]>([]);
    const [leaving, setLeaving] = useState<Direction | null>(null);
    const [chosen, setChosen] = useState<{ place: Place; via: ChosenVia }>();
    // The swipe hint shows until the stack is first used.
    const [touched, setTouched] = useState(false);
    const screen = useRef<HTMLDivElement>(null);
    const saveButton = useRef<HTMLButtonElement>(null);
    const icons = useRef(new Map<string, HTMLElement>());
    const inView = useInView(screen, { once: true, amount: 0.6 });
    // Drag progress from -1 (skip) to 1 (go), like --swipe-progress in the app.
    const progress = useMotionValue(0);
    const trackCard = (offset: number) => {
        const width = screen.current?.offsetWidth ?? 0;
        if (!width) return;
        progress.set(
            Math.max(-1, Math.min(1, offset / (width * PROGRESS_SHARE)))
        );
    };
    const showHint = inView && !touched;

    // Save animation, as in the app: the button fills and a ring in the
    // category colour pulses out; the icon pops on every change.
    const [flight, setFlight] = useState<Flight>();
    const [caught, setCaught] = useState({ count: 0, color: "" });
    const [catching, setCatching] = useState(false);
    const [released, setReleased] = useState(0);
    const catchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const goTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    useEffect(
        () => () => {
            clearTimeout(catchTimer.current);
            clearTimeout(goTimer.current);
        },
        []
    );

    const topIndex = index % PLACES.length;
    const nextIndex = (index + 1) % PLACES.length;
    const current = PLACES[topIndex];
    const isSaved = saved.includes(current.name);

    const leave = (direction: Direction) => {
        setTouched(true);
        if (leaving || chosen) return;
        setLeaving(direction);
        if (direction === "right") {
            const place = current;
            goTimer.current = setTimeout(
                () => setChosen({ place, via: "swipe" }),
                reduceMotion ? 0 : GO_DELAY_MS
            );
        }
    };
    const finishLeaving = (direction: Direction) => {
        // A right swipe keeps the card parked until "let's go" is closed.
        if (direction === "left") setIndex((value) => value + 1);
        setLeaving(null);
    };

    const catchSaved = (color: string) => {
        setCaught((previous) => ({ count: previous.count + 1, color }));
        setCatching(true);
        clearTimeout(catchTimer.current);
        catchTimer.current = setTimeout(() => setCatching(false), CATCH_MS);
    };

    const toggleSaved = (place: Place) =>
        setSaved((names) =>
            names.includes(place.name)
                ? names.filter((name) => name !== place.name)
                : [...names, place.name]
        );

    const handleSaveButton = () => {
        setTouched(true);
        if (isSaved) {
            clearTimeout(catchTimer.current);
            setCatching(false);
            setReleased((n) => n + 1);
            toggleSaved(current);
            return;
        }
        toggleSaved(current);
        const color = current.categories[0].color;
        const icon = icons.current.get(current.name);
        const target = saveButton.current;
        const box = screen.current;
        if (reduceMotion || !icon || !target || !box) {
            catchSaved(color);
            return;
        }
        const origin = box.getBoundingClientRect();
        const from = icon.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const unit = origin.width / 402;
        const size = 48 * unit;
        const startX = from.left + from.width / 2 - origin.left;
        const startY = from.top + from.height / 2 - origin.top;
        setFlight({
            id: Date.now(),
            category: current.categories[0],
            left: startX - size / 2,
            top: startY - size / 2,
            size,
            dx: to.left + to.width / 2 - origin.left - startX,
            dy: to.top + to.height / 2 - origin.top - startY,
            lift: 72 * unit,
        });
    };

    const closeGo = () => setChosen(undefined);
    const keepLooking = () => {
        setChosen(undefined);
        setIndex((value) => value + 1);
    };

    return (
        <div className='mx-auto w-full max-w-[18rem]'>
            <PhoneFrame>
                <div
                    ref={screen}
                    className='relative aspect-[804/1748] touch-pan-y'
                    style={{ containerType: "inline-size" }}
                >
                    <Image
                        src='/real/nearby-app-screen.webp'
                        alt={text.screenAlt}
                        fill
                        sizes='804px'
                        className='object-cover'
                    />
                    <div
                        className='absolute'
                        style={{ ...CARD_AREA, containerType: "inline-size" }}
                    >
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
                                parked={chosen?.via === "swipe"}
                                nudge={showHint}
                                iconRef={(node) => {
                                    if (node) icons.current.set(place.name, node);
                                    else icons.current.delete(place.name);
                                }}
                                onSwipe={leave}
                                onTouch={() => setTouched(true)}
                                onLeft={finishLeaving}
                                onMove={trackCard}
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
                    <SkipButton
                        label={text.skip}
                        progress={progress}
                        onClick={() => leave("left")}
                    />
                    <GoButton
                        label={text.go}
                        progress={progress}
                        onClick={() => {
                            setTouched(true);
                            if (!leaving && !chosen) {
                                setChosen({ place: current, via: "button" });
                            }
                        }}
                    />
                    <button
                        ref={saveButton}
                        type='button'
                        aria-label={text.save}
                        aria-pressed={isSaved}
                        onClick={handleSaveButton}
                        style={{
                            ...circle(716, 1548, 56),
                            backgroundColor: catching ? PRIMARY : SURFACE,
                            color: catching ? "#fffefe" : PRIMARY,
                        }}
                        className='absolute grid place-items-center rounded-full transition-[transform,background-color,color] duration-200 active:scale-[0.88]'
                    >
                        <motion.span
                            key={`icon-${caught.count}-${released}`}
                            animate={
                                caught.count + released > 0 && !reduceMotion
                                    ? { scale: [1, 1.35, 1] }
                                    : undefined
                            }
                            transition={{
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            className='block h-[43%] w-[43%]'
                        >
                            {catching || isSaved ? (
                                <BookmarkIcon className='h-full w-full' />
                            ) : (
                                <BookmarkOutlineIcon className='h-full w-full' />
                            )}
                        </motion.span>
                        {caught.count > 0 && (
                            <motion.span
                                key={`ring-${caught.count}`}
                                aria-hidden='true'
                                initial={{ opacity: 0.9, scale: 0.9 }}
                                animate={{ opacity: 0, scale: 1.9 }}
                                transition={{ duration: 0.6, ease: EASE_OUT }}
                                className='pointer-events-none absolute inset-0 rounded-full border-solid'
                                style={{
                                    borderColor: caught.color,
                                    borderWidth: "calc(100cqw * 3 / 402)",
                                }}
                            />
                        )}
                    </button>
                    {flight && (
                        <FlyingIcon
                            key={flight.id}
                            flight={flight}
                            onLand={() => {
                                setFlight(undefined);
                                catchSaved(flight.category.color);
                            }}
                        />
                    )}
                    <AnimatePresence>
                        {chosen && (
                            <NearbyGoScreen
                                key={chosen.place.name}
                                place={chosen.place}
                                via={chosen.via}
                                saved={saved.includes(chosen.place.name)}
                                onToggleSave={() => toggleSaved(chosen.place)}
                                onClose={closeGo}
                                onKeepLooking={keepLooking}
                                routeNote={text.routeNote}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </PhoneFrame>
            <p className='mt-4 text-center text-xs text-white/60'>{text.hint}</p>
        </div>
    );
}
