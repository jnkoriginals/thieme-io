"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Only moves, never hides: content stays readable before JavaScript runs.
export function Reveal({ children }: { children: ReactNode }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{ y: reduceMotion ? 0 : 28 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
