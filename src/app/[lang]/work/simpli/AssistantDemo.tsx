"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PhoneFrame } from "@/app/components/PhoneFrame";
import { previewContent } from "@/lib/previewContent";
import type { Lang } from "@/lib/translations";

// Every screen is a real frame from production; only the tap areas are added.
const FRAMES = ["typed", "thinking", "proposal", "applied", "menu-after"] as const;
type Frame = (typeof FRAMES)[number];
type Step = "typed" | "thinking" | "proposal" | "saved" | "live";
type Box = { left: string; top: string; width: string; height: string };

const FRAME_FOR_STEP: Record<Step, Frame> = {
    typed: "typed",
    thinking: "thinking",
    proposal: "proposal",
    saved: "applied",
    live: "menu-after",
};

function TapArea({
    label,
    box,
    onClick,
}: {
    label: string;
    box: Box;
    onClick: () => void;
}) {
    return (
        <button
            type='button'
            aria-label={label}
            onClick={onClick}
            style={box}
            className='absolute z-10 rounded-full animate-pulse ring-4 ring-indigo-400/70 motion-reduce:animate-none'
        />
    );
}

export function AssistantDemo({ lang }: { lang: Lang }) {
    const text = previewContent[lang].simpli.text;
    const [step, setStep] = useState<Step>("typed");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (timer.current) clearTimeout(timer.current);
        },
        []
    );

    const after = (next: Step, delay: number) => {
        timer.current = setTimeout(() => setStep(next), delay);
    };
    const send = () => {
        setStep("thinking");
        after("proposal", 1200);
    };
    const apply = () => {
        setStep("saved");
        after("live", 1100);
    };

    const frame = FRAME_FOR_STEP[step];
    const live = step === "live";

    return (
        <div className='w-full max-w-[18rem]'>
            <PhoneFrame screenClass={live ? "bg-[#faf1e6]" : "bg-white"}>
                <div className='relative aspect-[780/1688]'>
                    {FRAMES.map((name) => (
                        <Image
                            key={name}
                            src={`/real/simpli-${name}.webp`}
                            alt={name === frame ? text.alt[name] : ""}
                            fill
                            sizes='640px'
                            className={`object-cover transition-opacity duration-300 ${name === frame ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                    {step === "typed" && (
                        <TapArea
                            label={text.send}
                            onClick={send}
                            box={{
                                left: "82%",
                                top: "87.2%",
                                width: "12.4%",
                                height: "5.8%",
                            }}
                        />
                    )}
                    {step === "proposal" && (
                        <TapArea
                            label={text.apply}
                            onClick={apply}
                            box={{
                                left: "43%",
                                top: "41.4%",
                                width: "51%",
                                height: "4.6%",
                            }}
                        />
                    )}
                    {live && (
                        <span className='absolute left-[2.5%] top-[55%] h-[4.8%] w-[18%] rounded-lg ring-2 ring-indigo-500 animate-pulse motion-reduce:animate-none' />
                    )}
                </div>
            </PhoneFrame>
            <div className='mt-4 flex flex-col items-center gap-2 text-sm'>
                <p aria-live='polite' className='text-center text-zinc-300'>
                    {text.hints[step]}
                </p>
                {live && (
                    <button
                        type='button'
                        onClick={() => setStep("typed")}
                        className='text-indigo-400 underline underline-offset-4 decoration-1 transition-colors hover:text-indigo-300'
                    >
                        {text.restart}
                    </button>
                )}
                <p className='text-center text-zinc-400'>{text.replayNote}</p>
            </div>
        </div>
    );
}
