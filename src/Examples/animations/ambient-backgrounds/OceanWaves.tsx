import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

export interface WaveLayer {
    /** Tailwind fill classes for this layer. */
    className: string;
    /** Height of the layer in pixels. */
    height: number;
    /** How far the crests rise and fall, in pixels. */
    amplitude: number;
    /** Number of wave crests across one tile. Whole numbers make the two ends line up. */
    crests: number;
    /** Seconds to travel one tile width. */
    period: number;
    /** 1 rolls toward the left, -1 toward the right. */
    direction: 1 | -1;
}

const defaultLayers: WaveLayer[] = [
    {className: "fill-sky-200/70 dark:fill-sky-900/50", height: 190, amplitude: 16, crests: 2, period: 26, direction: 1},
    {className: "fill-sky-300/70 dark:fill-sky-800/60", height: 150, amplitude: 12, crests: 3, period: 18, direction: -1},
    {className: "fill-sky-500/70 dark:fill-sky-700/70", height: 110, amplitude: 10, crests: 2, period: 14, direction: 1},
    {className: "fill-sky-700 dark:fill-sky-600/80", height: 72, amplitude: 7, crests: 4, period: 10, direction: -1},
];

const TILE = 1440;

// Two identical tiles of a sine wave side by side. Sliding by one tile width loops without a seam.
const wavePath = (layer: WaveLayer) => {
    const top = layer.amplitude + 2;
    const bottom = layer.height;
    const points: string[] = [];
    for (let x = 0; x <= TILE * 2; x += 12) {
        const y = top + Math.sin((x / TILE) * layer.crests * Math.PI * 2) * layer.amplitude;
        points.push(`${x} ${y.toFixed(1)}`);
    }
    return `M ${points.join(" L ")} V ${bottom} H 0 Z`;
};

export interface OceanWavesProps {
    /** Content shown above the waves. */
    children?: ReactNode;
    /** Wave layers from back to front. Keep the array stable (define it outside the component). */
    layers?: WaveLayer[];
    /** Speed multiplier. 2 rolls twice as fast, 0.5 half as fast. */
    speed?: number;
    className?: string;
}

// Layered SVG waves roll at different speeds and directions along the bottom of the section.
// Each layer only moves with a transform, and the motion stops when the section is off screen.
export const OceanWaves = ({children, layers = defaultLayers, speed = 1, className = ""}: OceanWavesProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const layerRefs = useRef<(SVGSVGElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const areaHeight = Math.max(0, ...layers.map((layer) => layer.height));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let frame = 0;
        let visible = false;

        const loop = (now: number) => {
            const seconds = (now / 1000) * speed;
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
    }, [reduceMotion, layers, speed]);

    return (
        <section
            ref={containerRef}
            className={`relative isolate flex min-h-[460px] w-full flex-col items-center overflow-hidden bg-gradient-to-b from-sky-50 to-white px-6 pb-48 pt-16 dark:from-slate-950 dark:to-slate-900 ${className}`}
        >
            {children}

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10" style={{height: areaHeight}}>
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface NewsletterFormProps {
    /** Called with the trimmed address once it passes validation. */
    onSubscribe?: (email: string) => void;
    placeholder?: string;
    buttonLabel?: string;
    /** Shown in place of the form after a valid address is sent. */
    successMessage?: string;
    /** Shown under the field when the address is not valid. */
    errorMessage?: string;
    className?: string;
}

// An email field that checks the address, then swaps to a confirmation message.
// The fixed height keeps the page from jumping when the form is replaced.
export const NewsletterForm = ({
    onSubscribe,
    placeholder = "you@example.com",
    buttonLabel = "Subscribe",
    successMessage = "Check your inbox to confirm",
    errorMessage = "Enter an email address like name@example.com.",
    className = "",
}: NewsletterFormProps) => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState("");
    const emailId = useId();
    const errorId = useId();

    const subscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const address = email.trim();
        if (!EMAIL_PATTERN.test(address)) {
            setError(errorMessage);
            return;
        }
        setError("");
        setSubscribed(true);
        onSubscribe?.(address);
    };

    return (
        <div className={`h-[76px] ${className}`}>
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
                        {successMessage}
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
                                placeholder={placeholder}
                                aria-invalid={error ? true : undefined}
                                aria-describedby={error ? errorId : undefined}
                                className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 backdrop-blur focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 aria-[invalid=true]:border-red-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                            >
                                {buttonLabel}
                            </button>
                        </div>
                        <p id={errorId} className="mt-2 h-4 text-xs text-red-600 dark:text-red-400">{error}</p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};
