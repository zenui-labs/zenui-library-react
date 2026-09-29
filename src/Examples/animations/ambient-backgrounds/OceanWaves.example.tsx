import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

interface Layer {
    className: string;
    height: number;
    amplitude: number;
    /** Number of wave crests across one tile. Whole numbers make the two ends line up. */
    crests: number;
    /** Seconds to travel one tile width. */
    period: number;
    direction: 1 | -1;
}

const layers: Layer[] = [
    {className: "fill-sky-200/70 dark:fill-sky-900/50", height: 190, amplitude: 16, crests: 2, period: 26, direction: 1},
    {className: "fill-sky-300/70 dark:fill-sky-800/60", height: 150, amplitude: 12, crests: 3, period: 18, direction: -1},
    {className: "fill-sky-500/70 dark:fill-sky-700/70", height: 110, amplitude: 10, crests: 2, period: 14, direction: 1},
    {className: "fill-sky-700 dark:fill-sky-600/80", height: 72, amplitude: 7, crests: 4, period: 10, direction: -1},
];

const TILE = 1440;

// Two identical tiles of a sine wave side by side. Sliding by one tile width loops without a seam.
const wavePath = (layer: Layer) => {
    const top = layer.amplitude + 2;
    const bottom = layer.height;
    const points: string[] = [];
    for (let x = 0; x <= TILE * 2; x += 12) {
        const y = top + Math.sin((x / TILE) * layer.crests * Math.PI * 2) * layer.amplitude;
        points.push(`${x} ${y.toFixed(1)}`);
    }
    return `M ${points.join(" L ")} V ${bottom} H 0 Z`;
};

// Layered SVG waves roll at different speeds and directions along the bottom of a newsletter signup.
// Each layer only moves with a transform, and the motion stops when the section is off screen.
const OceanWaves = () => {
    const containerRef = useRef<HTMLElement>(null);
    const layerRefs = useRef<(SVGSVGElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState("");
    const emailId = useId();
    const errorId = useId();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let frame = 0;
        let visible = false;

        const loop = (now: number) => {
            const seconds = now / 1000;
            layers.forEach((layer, index) => {
                const element = layerRefs.current[index];
                if (!element) return;
                // Progress through one tile, as a share of the SVG's own width (two tiles).
                const progress = ((seconds / layer.period) % 1) * 50;
                const x = layer.direction === 1 ? -progress : progress - 50;
                element.style.transform = `translate3d(${x}%, 0, 0)`;
            });
            frame = requestAnimationFrame(loop);
        };

        const update = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (!reduceMotion && visible && !document.hidden) frame = requestAnimationFrame(loop);
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        });
        observer.observe(container);
        document.addEventListener("visibilitychange", update);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, [reduceMotion]);

    const subscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError("Enter an email address like name@example.com.");
            return;
        }
        setError("");
        setSubscribed(true);
    };

    return (
        <section
            ref={containerRef}
            className="relative isolate flex min-h-[460px] w-full flex-col items-center overflow-hidden bg-gradient-to-b from-sky-50 to-white px-6 pb-48 pt-16 dark:from-slate-950 dark:to-slate-900"
        >
            <div className="relative w-full max-w-md text-center">
                <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Tide Notes</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    A weekly letter about the ocean
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
                    One new finding from marine science every Sunday, explained in five minutes. Read by 38,000 people.
                </p>

                <div className="mt-7 h-[76px]">
                    <AnimatePresence mode="wait" initial={false}>
                        {subscribed ? (
                            <motion.p
                                key="done"
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                role="status"
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                            >
                                <LuCheck className="h-4 w-4" aria-hidden="true"/>
                                Check your inbox to confirm
                            </motion.p>
                        ) : (
                            <motion.form key="form" exit={{opacity: 0, y: -8}} onSubmit={subscribe} noValidate className="text-left">
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <label htmlFor={emailId} className="sr-only">Email address</label>
                                    <input
                                        id={emailId}
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        aria-invalid={error ? true : undefined}
                                        aria-describedby={error ? errorId : undefined}
                                        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 backdrop-blur focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 aria-[invalid=true]:border-red-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p id={errorId} className="mt-2 h-4 text-xs text-red-600 dark:text-red-400">{error}</p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[190px]">
                {layers.map((layer, index) => (
                    <svg
                        key={index}
                        ref={(element) => {
                            layerRefs.current[index] = element;
                        }}
                        viewBox={`0 0 ${TILE * 2} ${layer.height}`}
                        preserveAspectRatio="none"
                        className={`absolute bottom-0 left-0 w-[200%] min-w-[1600px] will-change-transform ${layer.className}`}
                        style={{height: layer.height}}
                    >
                        <path d={wavePath(layer)}/>
                    </svg>
                ))}
            </div>
        </section>
    );
};

export default OceanWaves;
