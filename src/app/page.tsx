"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const ref = useRef(null);

    const isDark = useIsDarkMode();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const background = useTransform(
        scrollYProgress,
        [0, 1],
        isDark
            ? [
                  "linear-gradient(to bottom, #000000 25%, #0b7d79)",
                  "linear-gradient(to bottom, #000000 80%, #5d14a6)",
              ]
            : [
                  "linear-gradient(to bottom, #ffffff 25%, #61e8e4)",
                  "linear-gradient(to bottom, #ffffff 80%, #a560eb)",
              ]
    );

    const contentBackground = useTransform(
        scrollYProgress,
        [0, 1],
        isDark ? ["#0b7d79", "#5d14a6"] : ["#61e8e4", "#a560eb"]
    );

    // Animations
    const hiX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-100vw"]);
    const smileX = useTransform(scrollYProgress, [0, 0.7], ["0%", "100vw"]);
    const jannikScale = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const jannikOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

    const revealOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const revealY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);

    return (
        <>
            <div ref={ref} className=''>
                <motion.div
                    style={{ background }}
                    className='fixed inset-0 h-[100dvh] -z-10'
                />
                <div className='h-[200vh]'>
                    <div className='sticky top-0 h-screen flex justify-center items-center'>
                        <div className='absolute overflow-y-hidden w-full justify-center flex flex-row items-center gap-4'>
                            <motion.h1
                                style={{ x: hiX }}
                                className='text-5xl md:text-9xl'
                            >
                                👋🏻
                            </motion.h1>
                            <motion.h3
                                style={{ x: smileX }}
                                className='text-5xl md:text-9xl font-serif italic'
                            >
                                Hi
                            </motion.h3>
                        </div>
                        <div className='absolute flex'>
                            <motion.h2
                                style={{
                                    scale: jannikScale,
                                    opacity: jannikOpacity,
                                }}
                                className='flex flex-row items-baseline gap-2 md:gap-4 text-xl md:text-5xl pointer-events-none font-light'
                            >
                                I'm{" "}
                                <p className='font-serif italic text-5xl md:text-9xl'>
                                    Jannik
                                </p>
                            </motion.h2>
                            {/* <motion.div
                                style={{
                                    opacity: revealOpacity,
                                    y: revealY,
                                }}
                                className='absolute top-[140%] w-full flex justify-center text-center'
                            >
                                <p className='text-md md:text-2xl w-full font-medium text-left'>
                                    Computer science student based in Stuttgart
                                    - Germany.
                                </p>
                            </motion.div> */}
                        </div>
                    </div>

                    <footer className='fixed bottom-0 left-0 w-full py-4 text-center text-sm text-foreground'>
                        &copy; 2025 Jannik Thieme
                    </footer>
                </div>
                {/* <div className='relative -top-24 py-14 z-10 px-8 sm:px-20 text-center'>
                    <h2 className='text-3xl md:text-5xl font-serif italic font-bold mb-6'>
                        My Skills
                    </h2>
                    <div className='border rounded-2xl bg-neutral-800/25'>
                        React, NextJS, Java
                    </div>
                </div> */}
            </div>
        </>
    );
}

function useIsDarkMode() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mq.matches);
        mq.addEventListener("change", (e) => setIsDark(e.matches));
        return () => mq.removeEventListener("change", () => {});
    }, []);

    return isDark;
}
