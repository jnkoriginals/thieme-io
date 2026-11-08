"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PhoneFrame } from "@/app/components/PhoneFrame";
import { previewContent } from "@/lib/previewContent";
import type { Lang } from "@/lib/translations";

// The public demo menu, rendered at a real phone width and scaled to the mockup.
const MENU_PATH = "m/6YsieOfuFFpclvEPQmIc/ck7eYSZYpl0Ey2iYsGYf";
const MENU_WIDTH = 390;
const MENU_HEIGHT = 800;

export function SimpliShowcase({ lang }: { lang: Lang }) {
    const text = previewContent[lang].simpli.text;
    const screen = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.65);

    useEffect(() => {
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
                    src='/simpli-editor.webp'
                    alt={text.editorAlt}
                    width={2000}
                    height={1330}
                    sizes='1000px'
                    className='hidden w-[92%] h-auto rounded-2xl border border-zinc-800 md:block'
                />
                <div className='mx-auto w-full max-w-[18rem] md:absolute md:-bottom-8 md:right-0 md:mx-0 md:w-[17rem]'>
                    <PhoneFrame screenClass='bg-[#faf1e6]'>
                        <div
                            ref={screen}
                            className='relative overflow-hidden'
                            style={{
                                aspectRatio: `${MENU_WIDTH} / ${MENU_HEIGHT}`,
                            }}
                        >
                            <iframe
                                src={`https://www.simpli.menu/${lang}/${MENU_PATH}`}
                                title={text.menuTitle}
                                loading='lazy'
                                sandbox='allow-scripts allow-same-origin'
                                className='absolute left-0 top-0 border-0'
                                style={{
                                    width: MENU_WIDTH,
                                    height: MENU_HEIGHT,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "top left",
                                }}
                            />
                        </div>
                    </PhoneFrame>
                </div>
            </div>
            <p className='mt-5 text-center text-sm text-zinc-300 md:mt-6 md:text-left'>
                {text.menuHint}
            </p>
        </div>
    );
}
