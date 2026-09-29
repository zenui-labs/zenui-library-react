import {useEffect, useRef, useState} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuLock} from "react-icons/lu";

const words = ["backups", "API keys", "customer data", "audit logs", "secrets"];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";
const INTERVAL = 3200;
const DURATION = 900; // ms for one decode
const LONGEST = Math.max(...words.map((word) => word.length));

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Each rotation decodes the next word: characters cycle through random glyphs and lock in
// from left to right. The text is written straight to the DOM from requestAnimationFrame,
// so React does not re-render on every frame.
const ScrambleWords = () => {
    const ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [replay, setReplay] = useState(0);

    useEffect(() => {
        if (!inView || hovered) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), INTERVAL);
        return () => window.clearInterval(timer);
    }, [inView, hovered]);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;
        const target = words[index];
        if (reduceMotion) {
            element.textContent = target;
            return;
        }

        const from = element.textContent ?? "";
        const length = Math.max(from.length, target.length);
        // Each position locks at its own moment, left to right with a little jitter.
        const lockAt = Array.from({length}, (_, position) => (position / length) * DURATION * 0.75 + Math.random() * DURATION * 0.25);
        let frame = 0;
        let lastSwap = 0;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            // Swap glyphs about every 45ms so the noise is readable as characters, not a blur.
            if (now - lastSwap > 45 || elapsed >= DURATION) {
                lastSwap = now;
                let output = "";
                for (let position = 0; position < length; position++) {
                    const final = target[position] ?? "";
                    if (elapsed >= lockAt[position]) output += final;
                    else output += final === " " ? " " : randomGlyph();
                }
                element.textContent = output;
            }
            if (elapsed < DURATION) frame = requestAnimationFrame(tick);
            else element.textContent = target;
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [index, reduceMotion, replay]);

    return (
        <div
            ref={ref}
            onPointerEnter={() => {
                setHovered(true);
                setReplay((value) => value + 1);
            }}
            onPointerLeave={() => setHovered(false)}
            className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-10"
        >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                <LuLock className="h-5 w-5" aria-hidden="true"/>
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                <span className="sr-only">Encrypt your backups, API keys, customer data, audit logs and secrets.</span>
                <span aria-hidden="true">
                    Encrypt your
                    <br/>
                    <span
                        className="inline-block whitespace-pre font-mono text-emerald-600 dark:text-emerald-400"
                        style={{minWidth: `${LONGEST}ch`}}
                    >
                        <span ref={textRef}>{words[0]}</span>
                        <span className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-emerald-500/70 dark:bg-emerald-400/70"/>
                    </span>
                </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">
                Vaultline encrypts everything on your device before it leaves, with keys only your team holds. Hover the headline to decode it again.
            </p>
        </div>
    );
};

export default ScrambleWords;
