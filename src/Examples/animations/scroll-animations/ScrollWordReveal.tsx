import {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
    highlighted: boolean;
}

// Each word owns a small slice of the scroll range and fades from faint to full during it.
const Word = ({children, progress, range, highlighted}: WordProps) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [4, 0]);
    return (
        <motion.span
            style={{opacity, y}}
            className={`inline-block ${highlighted ? "text-violet-600 dark:text-violet-400" : "text-gray-900 dark:text-white"}`}
        >
            {children}
        </motion.span>
    );
};

export interface ScrollWordRevealProps {
    /** The paragraph to reveal. Words are split on spaces. */
    text: string;
    /** Words drawn in the accent color, matched exactly including punctuation, for example "calm.". */
    highlightWords?: string[];
    /** Small label above the paragraph. */
    eyebrow?: string;
    /** Hint shown under the label. */
    hint?: string;
    /** Line shown after the paragraph, such as the authors. */
    attribution?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

export const ScrollWordReveal = ({
    text,
    highlightWords = [],
    eyebrow = "Our principles",
    hint = "Scroll to read",
    attribution,
    ariaLabel = "Our principles, scroll to read",
    className = "",
}: ScrollWordRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    // Progress runs from when the paragraph top reaches 80% of the panel to when its bottom reaches 45%.
    const {scrollYProgress} = useScroll({container: containerRef, target: textRef, offset: ["start 0.8", "end 0.45"]});
    const words = text.split(" ");
    const accent = new Set(highlightWords);

    return (
        <div className={`w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                className="relative h-[420px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
            >
                <div className="flex h-[260px] flex-col justify-end px-6 pb-8 sm:px-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">{eyebrow}</p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">{hint}</p>
                </div>

                <p ref={textRef} className="px-6 text-2xl font-semibold leading-snug tracking-tight sm:px-10 sm:text-4xl sm:leading-tight">
                    <span className="sr-only">{text}</span>
                    <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
                        {words.map((word, index) => {
                            const start = index / words.length;
                            return (
                                <Word
                                    key={`${word}-${index}`}
                                    progress={scrollYProgress}
                                    range={[start, start + 1 / words.length]}
                                    highlighted={accent.has(word)}
                                >
                                    {word}
                                </Word>
                            );
                        })}
                    </span>
                </p>

                <div className="flex h-[300px] items-end px-6 pb-8 sm:px-10">
                    {attribution && <p className="text-sm text-gray-500 dark:text-slate-400">{attribution}</p>}
                </div>
            </div>
        </div>
    );
};
