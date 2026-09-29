import {useId, useRef, useState, type ComponentType} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuCpu, LuPower} from "react-icons/lu";

export interface CircuitTrace {
    id: string;
    /** SVG path on a 400 by 300 grid. The chip covers x 160 to 240 and y 110 to 190. */
    d: string;
    /** Inbound traces run from a pad into the chip, outbound traces from the chip out to a pad. */
    direction: "in" | "out";
    /** The pad at the far end of the trace, as [x, y] on the same grid. */
    pad: [number, number];
}

export interface CircuitBoardProps {
    traces: CircuitTrace[];
    chipName: string;
    /** Figure shown under the chip name while the board is on. */
    chipStat: string;
    chipIcon?: ComponentType<{className?: string}>;
    /** Controlled power state. Leave it out to let the board manage its own state. */
    powered?: boolean;
    /** Power state on first render when uncontrolled. */
    defaultPowered?: boolean;
    onPoweredChange?: (powered: boolean) => void;
    /** Legend text for the inbound (cyan) traces. */
    inputLabel?: string;
    /** Legend text for the outbound (amber) traces. */
    outputLabel?: string;
    turnOnLabel?: string;
    turnOffLabel?: string;
    /** Shown under the chip name while the board is off. */
    offLabel?: string;
    className?: string;
}

/**
 * A controller chip on a circuit board. Data pulses in along the inbound traces and commands
 * pulse out along the outbound ones. The power button starts and stops the board.
 */
export const CircuitBoard = ({
    traces,
    chipName,
    chipStat,
    chipIcon: ChipIcon = LuCpu,
    powered: poweredProp,
    defaultPowered = true,
    onPoweredChange,
    inputLabel = "Sensor input",
    outputLabel = "Motor commands",
    turnOnLabel = "Turn on",
    turnOffLabel = "Turn off",
    offLabel = "Off",
    className = "",
}: CircuitBoardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [internalPowered, setInternalPowered] = useState(defaultPowered);
    const powered = poweredProp ?? internalPowered;
    const togglePower = () => {
        const next = !powered;
        if (poweredProp === undefined) setInternalPowered(next);
        onPoweredChange?.(next);
    };
    const patternId = `grid-${useId().replace(/:/g, "")}`;
    const animated = powered && inView && !reduceMotion;

    return (
        <figure className={`w-full max-w-xl ${className}`}>
            <div
                ref={ref}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-950"
            >
                <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
                    <defs>
                        <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 H 0 V 20" fill="none" strokeWidth={0.5} className="stroke-gray-200 dark:stroke-slate-800/70"/>
                        </pattern>
                    </defs>
                    <rect width="400" height="300" fill={`url(#${patternId})`}/>

                    {traces.map((trace) => (
                        <path
                            key={trace.id}
                            d={trace.d}
                            fill="none"
                            strokeWidth={2}
                            strokeLinejoin="round"
                            className={`transition-colors duration-700 ${powered ? "stroke-gray-300 dark:stroke-slate-700" : "stroke-gray-200 dark:stroke-slate-800"}`}
                        />
                    ))}

                    {animated &&
                        traces.map((trace, index) => {
                            const inbound = trace.direction === "in";
                            // Outbound pulses leave after the inbound ones arrive, so the chip looks like it reacts.
                            const delay = inbound ? (index % 6) * 0.35 : 1.3 + (index % 6) * 0.3;
                            return (
                                <motion.path
                                    key={`${trace.id}-pulse`}
                                    d={trace.d}
                                    fill="none"
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={inbound ? "stroke-cyan-500 dark:stroke-cyan-400" : "stroke-amber-500 dark:stroke-amber-400"}
                                    initial={{pathLength: 0.18, pathOffset: -0.18, opacity: 0}}
                                    animate={{pathOffset: [-0.18, 1], opacity: [0, 1, 1, 0]}}
                                    transition={{
                                        duration: 1.2,
                                        delay,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 1.4,
                                        opacity: {duration: 1.2, delay, times: [0, 0.1, 0.85, 1], repeat: Infinity, repeatDelay: 1.4},
                                    }}
                                />
                            );
                        })}

                    {traces.map((trace) => (
                        <g key={`${trace.id}-pad`}>
                            <circle cx={trace.pad[0]} cy={trace.pad[1]} r={6} className="fill-gray-50 stroke-gray-300 dark:fill-slate-950 dark:stroke-slate-700" strokeWidth={2}/>
                            <circle
                                cx={trace.pad[0]}
                                cy={trace.pad[1]}
                                r={2.5}
                                className={`transition-colors duration-700 ${
                                    !powered ? "fill-gray-300 dark:fill-slate-700" : trace.direction === "in" ? "fill-cyan-500 dark:fill-cyan-400" : "fill-amber-500 dark:fill-amber-400"
                                }`}
                            />
                        </g>
                    ))}
                </svg>

                {/* The chip sits in the same 400 by 300 space, placed with percentages. */}
                <div className="absolute" style={{left: "40%", top: "36.667%", width: "20%", height: "26.667%"}}>
                    {animated && (
                        <motion.div
                            aria-hidden="true"
                            className="absolute -inset-3 rounded-3xl bg-cyan-400/25 blur-xl dark:bg-cyan-400/20"
                            animate={{opacity: [0.4, 1, 0.4]}}
                            transition={{duration: 2.6, repeat: Infinity, ease: "easeInOut"}}
                        />
                    )}
                    <div
                        className={`relative flex h-full w-full flex-col items-center justify-center rounded-xl border text-center transition-colors duration-700 sm:rounded-2xl ${
                            powered
                                ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-xl shadow-cyan-500/20"
                                : "border-gray-300 bg-gray-200 text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-600"
                        }`}
                    >
                        <ChipIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true"/>
                        <span className="mt-0.5 text-[9px] font-semibold tracking-wide sm:text-xs">{chipName}</span>
                        <span className={`hidden text-[10px] tabular-nums sm:block ${powered ? "text-cyan-300" : ""}`}>{powered ? chipStat : offLabel}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={togglePower}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                    <LuPower className={`h-3.5 w-3.5 ${powered ? "text-emerald-500" : "text-gray-400 dark:text-slate-500"}`} aria-hidden="true"/>
                    {powered ? turnOffLabel : turnOnLabel}
                </button>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-500"/>
                    {inputLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500"/>
                    {outputLabel}
                </span>
            </figcaption>
        </figure>
    );
};
