import {useId, useRef, useState} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuCpu, LuPower} from "react-icons/lu";

interface Trace {
    id: string;
    d: string;
    /** Inbound traces run from a pad into the chip, outbound traces from the chip out to a pad. */
    direction: "in" | "out";
    /** The pad at the far end of the trace. */
    pad: [number, number];
}

// Drawn on a 400 by 300 grid. The chip sits between x 160 to 240 and y 110 to 190.
const traces: Trace[] = [
    {id: "l1", direction: "in", pad: [24, 60], d: "M 24 60 H 80 L 100 80 V 120 L 110 130 H 160"},
    {id: "l2", direction: "in", pad: [24, 150], d: "M 24 150 H 160"},
    {id: "l3", direction: "in", pad: [24, 244], d: "M 24 244 H 70 L 100 214 V 180 L 110 170 H 160"},
    {id: "t1", direction: "in", pad: [140, 24], d: "M 140 24 V 50 L 180 90 V 110"},
    {id: "t2", direction: "in", pad: [200, 24], d: "M 200 24 V 110"},
    {id: "t3", direction: "in", pad: [260, 24], d: "M 260 24 V 50 L 220 90 V 110"},
    {id: "r1", direction: "out", pad: [376, 60], d: "M 240 130 H 290 L 300 120 V 80 L 320 60 H 376"},
    {id: "r2", direction: "out", pad: [376, 150], d: "M 240 150 H 376"},
    {id: "r3", direction: "out", pad: [376, 244], d: "M 240 170 H 290 L 300 180 V 214 L 330 244 H 376"},
    {id: "b1", direction: "out", pad: [140, 276], d: "M 180 190 V 210 L 140 250 V 276"},
    {id: "b2", direction: "out", pad: [200, 276], d: "M 200 190 V 276"},
    {id: "b3", direction: "out", pad: [260, 276], d: "M 220 190 V 210 L 260 250 V 276"},
];

// A controller chip on a circuit board. Sensor data pulses in along the traces on the left and top,
// and commands pulse out to the right and bottom. The power key starts and stops the board.
const CircuitBoard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [powered, setPowered] = useState(true);
    const patternId = `grid-${useId().replace(/:/g, "")}`;
    const animated = powered && inView && !reduceMotion;

    return (
        <figure className="w-full max-w-xl">
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
                        <LuCpu className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true"/>
                        <span className="mt-0.5 text-[9px] font-semibold tracking-wide sm:text-xs">Halo R2</span>
                        <span className={`hidden text-[10px] tabular-nums sm:block ${powered ? "text-cyan-300" : ""}`}>{powered ? "2.1 TOPS" : "Off"}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setPowered((value) => !value)}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                    <LuPower className={`h-3.5 w-3.5 ${powered ? "text-emerald-500" : "text-gray-400 dark:text-slate-500"}`} aria-hidden="true"/>
                    {powered ? "Turn off" : "Turn on"}
                </button>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-500"/>
                    Sensor input
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500"/>
                    Motor commands
                </span>
            </figcaption>
        </figure>
    );
};

export default CircuitBoard;
