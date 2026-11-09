"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const END_SIZE = 40;
// The picture ends 8px inside the floating navigation pill.
const NAV_INSET = 8;
// Gap the picture keeps below the pill while the text squashes it.
const NAV_GAP = 8;

/**
 * Portrait that the rising text squashes against the navbar.
 * It stops under the pill and shrinks as the text below it pushes up; at its
 * smallest the text carries it the last few pixels into the pill.
 */
export function HeroAvatar() {
    const slot = useRef<HTMLDivElement>(null);
    const picture = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slotElement = slot.current;
        const pictureElement = picture.current;
        const nav = document.querySelector("header nav");
        if (!slotElement || !pictureElement || !nav) return;

        const root = document.documentElement;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        let frame = 0;

        const update = () => {
            frame = 0;
            const rect = slotElement.getBoundingClientRect();
            const startSize = rect.width;
            const navRect = nav.getBoundingClientRect();
            const endLeft = navRect.left + NAV_INSET;
            const endTop = navRect.top + NAV_INSET;
            const pinTop = navRect.bottom + NAV_GAP;

            // rect follows the page, so its bottom is the edge of the text below.
            let size = Math.min(
                startSize,
                Math.max(END_SIZE, rect.bottom - pinTop)
            );
            let top = Math.max(endTop, rect.bottom - size);

            if (reduceMotion) {
                const docked = rect.top <= endTop;
                size = docked ? END_SIZE : startSize;
                top = docked ? endTop : rect.top;
            }

            const shrink = (startSize - size) / (startSize - END_SIZE);
            const left = rect.left + (endLeft - rect.left) * shrink;
            // The name only makes room while the picture enters the pill.
            const entering = Math.min(
                1,
                Math.max(0, (pinTop - top) / (pinTop - endTop))
            );

            pictureElement.style.position = "fixed";
            pictureElement.style.left = "0";
            pictureElement.style.top = "0";
            pictureElement.style.width = `${startSize}px`;
            pictureElement.style.height = `${startSize}px`;
            pictureElement.style.transformOrigin = "top left";
            pictureElement.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${size / startSize})`;
            // Stays under the header until it docks, so the open menu covers it.
            pictureElement.style.zIndex = entering > 0 ? "60" : "40";
            root.style.setProperty("--avatar-progress", String(entering));
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            root.style.removeProperty("--avatar-progress");
        };
    }, []);

    return (
        <div ref={slot} className='h-24 w-24 md:h-28 md:w-28'>
            <div
                ref={picture}
                className='pointer-events-none relative h-full w-full'
            >
                <Image
                    src='/avatar.png'
                    alt='Jannik Thieme'
                    width={224}
                    height={224}
                    priority
                    className='h-full w-full rounded-full object-cover ring-1 ring-white/10'
                />
            </div>
        </div>
    );
}
