import {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

const manifesto =
    "We believe software should feel calm. Fewer settings, clearer defaults and interfaces that get out of the way. Every feature we ship has to earn its place, and every screen has to answer one question well. That is how a tool becomes something people trust with their work.";

// Words highlighted in the accent color once they are read.
const accent = new Set(["calm.", "earn", "trust"]);

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

// Each word owns a small slice of the scroll range and fades from faint to full during it.
const Word = ({children, progress, range}: WordProps) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [4, 0]);
    const highlighted = accent.has(children);
    return (
        <motion.span
            style={{opacity, y}}
            className={`inline-block ${highlighted ? "text-violet-600 dark:text-violet-400" : "text-gray-900 dark:text-white"}`}
        >
            {children}
        </motion.span>
    );
};

const ScrollWordReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    // Progress runs from when the paragraph top reaches 80% of the panel to when its bottom reaches 45%.
    const {scrollYProgress} = useScroll({container: containerRef, target: textRef, offset: ["start 0.8", "end 0.45"]});
    const words = manifesto.split(" ");

    return (
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label="Our principles, scroll to read"
                className="relative h-[420px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
            >
                <div className="flex h-[260px] flex-col justify-end px-6 pb-8 sm:px-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Our principles</p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">Scroll to read</p>
                </div>

                <p ref={textRef} className="px-6 text-2xl font-semibold leading-snug tracking-tight sm:px-10 sm:text-4xl sm:leading-tight">
                    <span className="sr-only">{manifesto}</span>
                    <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
                        {words.map((word, index) => {
                            const start = index / words.length;
                            return (
                                <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                                    {word}
                                </Word>
                            );
                        })}
                    </span>
                </p>

                <div className="flex h-[300px] items-end px-6 pb-8 sm:px-10">
                    <p className="text-sm text-gray-500 dark:text-slate-400">Linnea Holm and Daniel Osei, founders of Stillwater</p>
                </div>
            </div>
        </div>
    );
};

export default ScrollWordReveal;
