"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HandIcon } from "@/app/components/HandIcon";
import { PhoneFrame } from "@/app/components/PhoneFrame";
import { previewContent } from "@/lib/previewContent";
import { previewMore } from "@/lib/previewMore";
import type { Lang } from "@/lib/translations";
import { TrySketch } from "./TrySketch";

// The public demo menu, rendered at a real phone width and scaled to the mockup.
const MENU_PATH = "m/6YsieOfuFFpclvEPQmIc/ck7eYSZYpl0Ey2iYsGYf";
const MENU_WIDTH = 390;
const MENU_HEIGHT = 800;

export function SimpliShowcase({ lang }: { lang: Lang }) {
    const text = previewContent[lang].simpli.text;
    const screen = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.65);
    // Mounted after hydration so its load event can't be missed.
    const [showMenu, setShowMenu] = useState(false);
    const [menuLoaded, setMenuLoaded] = useState(false);
    // Phones: the page keeps scrolling over the menu until it is tapped.
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const element = screen.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) setMenuActive(false);
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setShowMenu(true);
        const element = screen.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) =>
            setScale(entry.contentRect.width / MENU_WIDTH)
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <div className='relative'>
                <Image
                    src='/real/simpli-editor-main.webp'
                    alt={text.editorAlt}
                    width={1500}
                    height={1330}
                    sizes='900px'
                    className='hidden w-[82%] h-auto rounded-3xl ring-1 ring-white/10 md:block'
                />
                <a
                    href='#after-simpli-menu'
                    className='sr-only focus:not-sr-only focus:absolute focus:z-10 focus:rounded-full focus:bg-zinc-100 focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-950'
                >
                    {text.skipMenu}
                </a>
                <div className='relative mx-auto mt-28 w-full max-w-[18rem] md:absolute md:-bottom-8 md:right-0 md:mx-0 md:mt-0 md:w-[17rem]'>
                    <TrySketch
                        label={previewMore[lang].tryIt}
                        className='text-indigo-400'
                    />
                    <PhoneFrame screenClass='relative bg-[#fbf3ea] pt-5'>
                        <div
                            ref={screen}
                            className='relative overflow-hidden'
                            style={{
                                aspectRatio: `${MENU_WIDTH} / ${MENU_HEIGHT}`,
                            }}
                        >
                            <Image
                                src={`/real/simpli-menu-still-${lang}.webp`}
                                alt=''
                                fill
                                sizes='272px'
                                className='object-cover object-top'
                            />
                            {showMenu && (
                                <iframe
                                    src={`https://www.simpli.menu/${lang}/${MENU_PATH}`}
                                    title={text.menuTitle}
                                    loading='lazy'
                                    sandbox='allow-scripts allow-same-origin'
                                    onLoad={() => setMenuLoaded(true)}
                                    className={`absolute left-0 top-0 border-0 transition-opacity duration-300 ${menuLoaded ? "opacity-100" : "opacity-0"}`}
                                    style={{
                                        width: MENU_WIDTH,
                                        height: MENU_HEIGHT,
                                        transform: `scale(${scale})`,
                                        transformOrigin: "top left",
                                    }}
                                />
                            )}
                        </div>
                        {!menuActive && (
                            <button
                                type='button'
                                onClick={() => setMenuActive(true)}
                                className='absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/25 md:hidden'
                            >
                                <span className='flex flex-col items-center gap-2 text-xs font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'>
                                    <HandIcon className='h-10 w-10' />
                                    {text.menuActivate}
                                </span>
                            </button>
                        )}
                    </PhoneFrame>
                </div>
            </div>
            <p
                id='after-simpli-menu'
                tabIndex={-1}
                className='mt-5 text-center text-xs text-zinc-500 md:mt-6 md:max-w-[60%] md:text-left'
            >
                {text.menuHint}
            </p>
        </div>
    );
}
