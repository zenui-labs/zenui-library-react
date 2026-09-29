import {useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuLock} from "react-icons/lu";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";

// Joins words as "a, b and c" for the sentence screen readers hear.
const formatList = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join("");

export interface ScrambleWordsProps {
    /** Words that decode in turn at the end of the headline. */
    words: string[];
    /** Headline text before the decoding word. */
    lead?: string;
    /** Paragraph under the headline. */
    description?: ReactNode;
    /** Icon in the badge above the headline. */
    icon?: ComponentType<{className?: string}>;
    /** Time between words, in milliseconds. */
    interval?: number;
    /** Length of one decode, in milliseconds. */
    duration?: number;
    /** Characters the noise is drawn from. */
    glyphs?: string;
    className?: string;
}

// Each rotation decodes the next word: characters cycle through random glyphs and lock in
// from left to right. The text is written straight to the DOM from requestAnimationFrame,
// so React does not re-render on every frame.
export const ScrambleWords = ({
    words,
    lead = "Encrypt your",
    description = "Vaultline encrypts everything on your device before it leaves, with keys only your team holds. Hover the headline to decode it again.",
    icon: Icon = LuLock,
    interval = 3200,
    duration = 900,
    glyphs = GLYPHS,
    className = "",
}: ScrambleWordsProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [replay, setReplay] = useState(0);
    const count = words.length;
    const longest = Math.max(...words.map((word) => word.length));
    const target = words[index % count];

    useEffect(() => {
        if (!inView || hovered) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), interval);
        return () => window.clearInterval(timer);
    }, [inView, hovered, count, interval]);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;
        if (reduceMotion) {
            element.textContent = target;
            return;
        }

        const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];
        const from = element.textContent ?? "";
        const length = Math.max(from.length, target.length);
        // Each position locks at its own moment, left to right with a little jitter.
        const lockAt = Array.from({length}, (_, position) => (position / length) * duration * 0.75 + Math.random() * duration * 0.25);
        let frame = 0;
        let lastSwap = 0;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            // Swap glyphs about every 45ms so the noise is readable as characters, not a blur.
            if (now - lastSwap > 45 || elapsed >= duration) {
                lastSwap = now;
                let output = "";
                for (let position = 0; position < length; position++) {
                    const final = target[position] ?? "";
                    if (elapsed >= lockAt[position]) output += final;
                    else output += final === " " ? " " : randomGlyph();
                }
                element.textContent = output;
            }
            if (elapsed < duration) frame = requestAnimationFrame(tick);
            else element.textContent = target;
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, reduceMotion, replay, duration, glyphs]);

    return (
        <div
            ref={ref}
            onPointerEnter={() => {
                setHovered(true);
                setReplay((value) => value + 1);
            }}
            onPointerLeave={() => setHovered(false)}
            className={`w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-10 ${className}`}
        >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                <Icon className="h-5 w-5" aria-hidden="true"/>
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                <span className="sr-only">{`${lead} ${formatList(words)}.`}</span>
                <span aria-hidden="true">
                    {lead}
                    <br/>
                    <span
                        className="inline-block whitespace-pre font-mono text-emerald-600 dark:text-emerald-400"
                        style={{minWidth: `${longest}ch`}}
                    >
                        <span ref={textRef}>{words[0]}</span>
                        <span className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-emerald-500/70 dark:bg-emerald-400/70"/>
                    </span>
                </span>
            </h2>
            {description && (
                <p className="mt-4 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">{description}</p>
            )}
        </div>
    );
};
