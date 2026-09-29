import {useId, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

interface Segment {
    id: string;
    label: string;
    value: number;
    stroke: string;
    dot: string;
}

const CAPACITY = 256;
const segments: Segment[] = [
    {id: "photos", label: "Photos", value: 82, stroke: "stroke-violet-500", dot: "bg-violet-500"},
    {id: "videos", label: "Videos", value: 61, stroke: "stroke-sky-500", dot: "bg-sky-500"},
    {id: "apps", label: "Apps", value: 38, stroke: "stroke-emerald-500", dot: "bg-emerald-500"},
    {id: "documents", label: "Documents", value: 17, stroke: "stroke-amber-500", dot: "bg-amber-500"},
    {id: "system", label: "System", value: 12, stroke: "stroke-rose-500", dot: "bg-rose-500"},
];

const used = segments.reduce((sum, segment) => sum + segment.value, 0);
const SIZE = 220;
const RADIUS = 84;
const GAP = 0.006; // Fraction of the ring left empty between segments.
const SWEEP = 1.3; // Seconds for the whole ring to draw.

// A donut that draws in one continuous sweep. Hover a segment or a legend row to focus on it.
const StorageDonut = () => {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.5});
    const [active, setActive] = useState<string | null>(null);
    const titleId = useId();
    const current = segments.find((segment) => segment.id === active) ?? null;

    let start = 0;
    const arcs = segments.map((segment) => {
        const fraction = segment.value / CAPACITY;
        const arc = {...segment, start, fraction};
        start += fraction;
        return arc;
    });

    return (
        <section aria-labelledby={titleId} className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">Storage on MacBook Pro</h3>
            <div ref={ref} className="mt-4 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
                <div className="relative shrink-0" style={{width: SIZE, height: SIZE}}>
                    <motion.svg
                        width={SIZE}
                        height={SIZE}
                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                        role="img"
                        aria-label={`${used} of ${CAPACITY} GB used. ${segments.map((segment) => `${segment.label} ${segment.value} GB`).join(", ")}.`}
                        initial={false}
                        animate={{rotate: inView || reduceMotion ? 0 : -40}}
                        transition={{type: "spring", stiffness: 60, damping: 16}}
                    >
                        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth="22" className="stroke-gray-100 dark:stroke-slate-800"/>
                        {arcs.map((arc) => {
                            const dimmed = active !== null && active !== arc.id;
                            return (
                                // Each ring starts at 12 o'clock plus the space taken by the segments before it.
                                <g key={arc.id} transform={`rotate(${arc.start * 360 - 90} ${SIZE / 2} ${SIZE / 2})`}>
                                    <motion.circle
                                        cx={SIZE / 2}
                                        cy={SIZE / 2}
                                        r={RADIUS}
                                        fill="none"
                                        strokeLinecap="butt"
                                        className={`${arc.stroke} cursor-pointer`}
                                        onPointerEnter={() => setActive(arc.id)}
                                        onPointerLeave={() => setActive(null)}
                                        initial={{pathLength: reduceMotion ? arc.fraction - GAP : 0, strokeWidth: 22}}
                                        animate={{
                                            pathLength: inView || reduceMotion ? arc.fraction - GAP : 0,
                                            strokeWidth: active === arc.id ? 30 : 22,
                                            opacity: dimmed ? 0.3 : 1,
                                        }}
                                        transition={{
                                            pathLength: reduceMotion ? {duration: 0} : {duration: arc.fraction * SWEEP * (CAPACITY / used), delay: arc.start * SWEEP * (CAPACITY / used), ease: "linear"},
                                            strokeWidth: {type: "spring", stiffness: 400, damping: 25},
                                            opacity: {duration: 0.2},
                                        }}
                                    />
                                </g>
                            );
                        })}
                    </motion.svg>

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={current?.id ?? "total"}
                                initial={{opacity: 0, y: 6, scale: 0.96}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: -6, scale: 0.96}}
                                transition={{duration: 0.16}}
                            >
                                <p className="text-3xl font-semibold tracking-tight tabular-nums text-gray-900 dark:text-white">
                                    {current ? current.value : used}
                                    <span className="ml-0.5 text-base font-medium text-gray-400 dark:text-slate-500">GB</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">
                                    {current ? `${current.label}, ${Math.round((current.value / CAPACITY) * 100)}%` : `used of ${CAPACITY} GB`}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <ul className="w-full space-y-1">
                    {arcs.map((arc, index) => (
                        <motion.li
                            key={arc.id}
                            initial={reduceMotion ? false : {opacity: 0, x: 12}}
                            animate={inView ? {opacity: 1, x: 0} : undefined}
                            transition={{delay: 0.3 + index * 0.08, type: "spring", stiffness: 260, damping: 24}}
                        >
                            <button
                                type="button"
                                onPointerEnter={() => setActive(arc.id)}
                                onPointerLeave={() => setActive(null)}
                                onFocus={() => setActive(arc.id)}
                                onBlur={() => setActive(null)}
                                aria-label={`${arc.label}: ${arc.value} GB, ${Math.round(arc.fraction * 100)} percent`}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                                    active === arc.id ? "bg-gray-100 dark:bg-slate-800" : "hover:bg-gray-50 dark:hover:bg-slate-800/60"
                                }`}
                            >
                                <span className={`h-2.5 w-2.5 rounded-full ${arc.dot}`} aria-hidden="true"/>
                                <span className="flex-1 text-gray-700 dark:text-slate-300">{arc.label}</span>
                                <span className="font-medium tabular-nums text-gray-900 dark:text-white">{arc.value} GB</span>
                            </button>
                        </motion.li>
                    ))}
                    <li className="flex items-center gap-3 px-3 py-2 text-sm">
                        <span className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-slate-700" aria-hidden="true"/>
                        <span className="flex-1 text-gray-500 dark:text-slate-400">Available</span>
                        <span className="tabular-nums text-gray-500 dark:text-slate-400">{CAPACITY - used} GB</span>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default StorageDonut;
