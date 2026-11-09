"use client";

import { useState } from "react";
import { previewMore } from "@/lib/previewMore";
import type { Lang } from "@/lib/translations";

const SPOTIFY_URL = "https://open.spotify.com/artist/7MABHmoRroJdBAYLz0OQSj";
const TRACK_URL = "https://soundcloud.com/jnkoriginals/mission-success-6";

// SoundCloud only loads, and sound only starts, after the visitor clicks play.
export function MusicPlayer({ lang }: { lang: Lang }) {
    const text = previewMore[lang].music;
    const [open, setOpen] = useState(false);
    const playerUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(TRACK_URL)}&auto_play=true&color=%234f46e5&show_comments=false&show_reposts=false&show_teaser=false&visual=false`;

    const spotifyLink = (
        <a
            href={SPOTIFY_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300'
        >
            {text.spotify} ↗
        </a>
    );

    if (open) {
        return (
            <div className='mt-6'>
                <iframe
                    src={playerUrl}
                    title={text.title}
                    allow='autoplay'
                    className='h-[166px] w-full rounded-2xl border-0'
                />
                <div className='mt-2 flex flex-wrap gap-x-5 gap-y-1'>
                    <button
                        type='button'
                        onClick={() => setOpen(false)}
                        className='text-sm text-zinc-400 transition-colors hover:text-zinc-100'
                    >
                        {text.close}
                    </button>
                    {spotifyLink}
                </div>
            </div>
        );
    }

    return (
        <div className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-2'>
        <button
            type='button'
            onClick={() => setOpen(true)}
            className='group inline-flex items-center gap-3 text-left text-sm text-zinc-300 transition-colors hover:text-zinc-50'
        >
            <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 transition-transform group-hover:scale-105 motion-reduce:transform-none'>
                <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    aria-hidden='true'
                    className='ml-0.5 h-4 w-4'
                >
                    <path d='M7 4.5v15l13-7.5z' />
                </svg>
            </span>
            {text.play}
        </button>
        {spotifyLink}
        </div>
    );
}
