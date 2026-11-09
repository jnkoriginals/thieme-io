"use client";

import { useEffect, useRef, useState } from "react";
import { previewContent } from "@/lib/previewContent";
import type { Lang } from "@/lib/translations";

const SCENES = ["prices", "soldout", "images", "translate", "design"] as const;

// Recorded from the assistant demo on simpli.menu, in a wide and a phone layout.
export function AssistantScenes({ lang }: { lang: Lang }) {
    const text = previewContent[lang].simpli.text;
    const video = useRef<HTMLVideoElement>(null);
    const visible = useRef(false);
    const [index, setIndex] = useState(0);
    const [narrow, setNarrow] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const phone = window.matchMedia("(max-width: 639px)");
        const update = () => setNarrow(phone.matches);
        update();
        phone.addEventListener("change", update);
        setReduceMotion(
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
        return () => phone.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const element = video.current;
        if (!element || reduceMotion) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                visible.current = entry.isIntersecting;
                if (entry.isIntersecting) void element.play().catch(() => {});
                else element.pause();
            },
            { threshold: 0.4 }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [reduceMotion]);

    // A new scene or layout swaps the source, which stops playback.
    useEffect(() => {
        if (visible.current && !reduceMotion) {
            void video.current?.play().catch(() => {});
        }
    }, [index, narrow, reduceMotion]);

    const scene = SCENES[index];
    const file = `/assistant/${scene}-${lang}-${narrow ? "narrow" : "wide"}`;

    return (
        <div>
            <div
                role='group'
                aria-label={text.scenesLabel}
                className='mb-4 flex flex-wrap gap-x-5 gap-y-2'
            >
                {SCENES.map((id, i) => (
                    <button
                        key={id}
                        type='button'
                        aria-pressed={i === index}
                        onClick={() => setIndex(i)}
                        className={`text-base transition-colors ${i === index ? "font-medium text-indigo-400" : "text-zinc-400 hover:text-zinc-100"}`}
                    >
                        {text.scenes[id]}
                    </button>
                ))}
            </div>
            <video
                ref={video}
                src={`${file}.mp4`}
                poster={`${file}.jpg`}
                aria-label={text.scenes[scene]}
                muted
                playsInline
                preload='metadata'
                controls={reduceMotion}
                onEnded={() => {
                    if (!reduceMotion) setIndex((i) => (i + 1) % SCENES.length);
                }}
                className={`w-full rounded-2xl bg-white ${narrow ? "mx-auto aspect-[350/763] max-w-[22rem]" : "aspect-[960/742]"}`}
            />
            <p className='mt-3 text-sm text-zinc-400'>{text.replayNote}</p>
        </div>
    );
}
