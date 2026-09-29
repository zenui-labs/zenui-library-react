import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuPlane} from "react-icons/lu";

export interface Flight {
    /** Flight number, for example "TP 1452". */
    code: string;
    /** Destination shown on the flaps. Use capital letters, since the flaps flip through A to Z. */
    city: string;
    gate: string;
    time: string;
}

export interface SplitFlapLabels {
    flight: string;
    gate: string;
    departs: string;
}

const defaultLabels: SplitFlapLabels = {flight: "Flight", gate: "Gate", departs: "Departs"};

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface SplitFlapTileProps {
    /** The character this flap should land on. */
    target: string;
    /** Wait before flipping, in milliseconds. */
    delay?: number;
    /** Swap the character without flipping, for reduced motion. */
    instant?: boolean;
}

// One flap. When its letter changes it flips through two random letters before landing,
// the way mechanical boards do. Tiles whose letter stays the same do not move.
export const SplitFlapTile = ({target, delay = 0, instant = false}: SplitFlapTileProps) => {
    const [flap, setFlap] = useState({char: target, key: 0});
    const shown = useRef(target);

    useEffect(() => {
        // Only flip when the letter actually changes.
        if (shown.current === target) return;
        shown.current = target;
        const show = (char: string) => setFlap((current) => ({char, key: current.key + 1}));
        if (instant) {
            show(target);
            return;
        }
        const random = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const steps = [random(), random(), target];
        const timers = steps.map((char, index) => window.setTimeout(() => show(char), delay + index * 90));
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, [target, delay, instant]);

    return (
        <span className="relative block h-11 w-7 overflow-hidden rounded-md bg-gradient-to-b from-slate-800 to-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.3)] [perspective:300px] sm:h-14 sm:w-10">
            <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                    key={flap.key}
                    initial={{rotateX: -90, opacity: 0.4}}
                    animate={{rotateX: 0, opacity: 1}}
                    exit={{rotateX: 90, opacity: 0.4}}
                    transition={{duration: 0.08, ease: "easeIn"}}
                    style={{transformOrigin: "50% 50%"}}
                    className="absolute inset-0 flex items-center justify-center font-mono text-xl font-semibold text-amber-300 sm:text-3xl"
                >
                    {flap.char}
                </motion.span>
            </AnimatePresence>
            {/* The seam between the upper and lower flap. */}
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-px bg-black/60"/>
        </span>
    );
};

export interface SplitFlapBoardProps {
    flights: Flight[];
    /** Board heading, also used to start the screen reader summary. */
    title?: string;
    /** Small text on the right of the heading. */
    subtitle?: string;
    /** Labels for the detail row under the flaps. */
    labels?: Partial<SplitFlapLabels>;
    /** Icon next to the heading. */
    icon?: ComponentType<{className?: string}>;
    /** Time each flight stays on the board, in milliseconds. */
    interval?: number;
    className?: string;
}

// A departures board whose destination changes on split-flap tiles every few seconds.
// Rotation pauses on hover and while the board is off screen.
export const SplitFlapBoard = ({
    flights,
    title = "Departures",
    subtitle = "Terminal 1",
    labels,
    icon: Icon = LuPlane,
    interval = 3400,
    className = "",
}: SplitFlapBoardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const count = flights.length;
    const text = {...defaultLabels, ...labels};

    useEffect(() => {
        if (!inView || hovered) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), interval);
        return () => window.clearInterval(timer);
    }, [inView, hovered, count, interval]);

    const width = Math.max(...flights.map((item) => item.city.length));
    const flight = flights[index % count];
    const letters = flight.city.padEnd(width, " ").split("");

    return (
        <div
            ref={ref}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            className={`w-full max-w-lg rounded-3xl bg-slate-950 p-4 shadow-2xl shadow-slate-900/30 ring-1 ring-slate-800 dark:shadow-black/50 dark:ring-slate-700 sm:p-6 ${className}`}
        >
            <p className="sr-only">
                {title}: {flights.map((item) => `${item.code} to ${item.city.toLowerCase()}, gate ${item.gate}, ${item.time}`).join("; ")}.
            </p>
            <div aria-hidden="true">
                <div className="flex items-center justify-between">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                        <Icon className="h-4 w-4"/>
                        {title}
                    </p>
                    {subtitle && <p className="font-mono text-xs text-slate-400">{subtitle}</p>}
                </div>

                <div className="mt-5 flex justify-center gap-[3px] sm:gap-1">
                    {letters.map((char, position) => (
                        <SplitFlapTile key={position} target={char} delay={position * 55} instant={Boolean(reduceMotion)}/>
                    ))}
                </div>

                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4 font-mono text-xs">
                    {[
                        [text.flight, flight.code],
                        [text.gate, flight.gate],
                        [text.departs, flight.time],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <dt className="text-[10px] uppercase tracking-wider text-slate-500">{label}</dt>
                            <dd className="relative mt-1 h-5 overflow-hidden text-sm text-slate-100">
                                <AnimatePresence initial={false} mode="popLayout">
                                    <motion.span
                                        key={value}
                                        initial={{y: "100%", opacity: 0}}
                                        animate={{y: "0%", opacity: 1}}
                                        exit={{y: "-100%", opacity: 0}}
                                        transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.3}}
                                        className="absolute inset-0"
                                    >
                                        {value}
                                    </motion.span>
                                </AnimatePresence>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};
