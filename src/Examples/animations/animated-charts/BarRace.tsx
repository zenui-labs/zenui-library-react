import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuPause, LuPlay, LuRotateCcw} from "react-icons/lu";

export interface RaceItem {
    id: string;
    name: string;
    /** Tailwind background class for the bar, such as "bg-sky-500". */
    color: string;
    /** One value per period, in the same order as `periods`. */
    values: number[];
}

export interface BarRaceProps {
    /** Period names in playback order, such as quarters. */
    periods: string[];
    items: RaceItem[];
    title?: string;
    /** Time each period stays on screen while playing, in milliseconds. */
    stepMs?: number;
    /** Start playing the first time the chart scrolls into view. Reduced motion always turns this off. */
    autoPlay?: boolean;
    /** Accessible name of the period slider. */
    sliderLabel?: string;
    playLabel?: string;
    pauseLabel?: string;
    replayLabel?: string;
    className?: string;
}

// Springs toward each new value so the numbers count rather than jump.
const AnimatedNumber = ({value, instant}: {value: number; instant: boolean}) => {
    const spring = useSpring(value, {stiffness: 70, damping: 20});
    const text = useTransform(spring, (latest) => Math.round(latest).toLocaleString("en-US"));
    useEffect(() => {
        if (instant) spring.jump(value);
        else spring.set(value);
    }, [value, instant, spring]);
    return <motion.span>{text}</motion.span>;
};

// Tracks whether the tab is visible, so playback pauses in background tabs.
const usePageVisible = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const update = () => setVisible(document.visibilityState === "visible");
        update();
        document.addEventListener("visibilitychange", update);
        return () => document.removeEventListener("visibilitychange", update);
    }, []);
    return visible;
};

// A ranking that replays quarter by quarter. Rows slide to their new position as the order changes.
export const BarRace = ({
    periods,
    items,
    title = "Top sellers, units per quarter",
    stepMs = 1700,
    autoPlay = true,
    sliderLabel = "Quarter",
    playLabel = "Play",
    pauseLabel = "Pause",
    replayLabel = "Replay",
    className = "",
}: BarRaceProps) => {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const seen = useInView(ref, {once: true, amount: 0.4});
    const onScreen = useInView(ref);
    const pageVisible = usePageVisible();
    const [quarter, setPeriod] = useState(0);
    const [playing, setPlaying] = useState(false);
    const sliderId = useId();
    const titleId = useId();
    const atEnd = quarter === periods.length - 1;

    // Start playing the first time the chart is seen, unless reduced motion is preferred.
    useEffect(() => {
        if (seen && autoPlay && !reduceMotion) setPlaying(true);
    }, [seen, autoPlay, reduceMotion]);

    useEffect(() => {
        if (!playing || !onScreen || !pageVisible) return;
        const timer = window.setInterval(() => {
            setPeriod((current) => Math.min(current + 1, periods.length - 1));
        }, stepMs);
        return () => window.clearInterval(timer);
    }, [playing, onScreen, pageVisible, periods.length, stepMs]);

    // Stop on the last quarter; the button then offers a replay.
    useEffect(() => {
        if (atEnd) setPlaying(false);
    }, [atEnd]);

    const togglePlay = () => {
        if (atEnd) {
            setPeriod(0);
            setPlaying(true);
            return;
        }
        setPlaying((value) => !value);
    };

    const ranked = [...items].sort((a, b) => b.values[quarter] - a.values[quarter]);
    const leader = ranked[0]?.values[quarter] ?? 1;
    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 110, damping: 20};

    return (
        <section ref={ref} aria-labelledby={titleId} className={`w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6 ${className}`}>
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</h3>
                    <div className="relative mt-1 h-9 overflow-hidden">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.p
                                key={quarter}
                                initial={{y: 24, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: -24, opacity: 0}}
                                transition={{type: "spring", stiffness: 300, damping: 28}}
                                className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
                            >
                                {periods[quarter]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={atEnd ? replayLabel : playing ? pauseLabel : playLabel}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                >
                    {atEnd ? <LuRotateCcw className="h-4 w-4" aria-hidden="true"/> : playing ? <LuPause className="h-4 w-4" aria-hidden="true"/> : <LuPlay className="ml-0.5 h-4 w-4" aria-hidden="true"/>}
                </button>
            </header>

            <ol className="mt-5 space-y-2.5" aria-label={`Ranking for ${periods[quarter]}`}>
                {ranked.map((product, rank) => (
                    <motion.li
                        key={product.id}
                        layout={!reduceMotion}
                        transition={spring}
                        className="grid grid-cols-[1.25rem_6.5rem_1fr_3.5rem] items-center gap-2 text-sm sm:grid-cols-[1.25rem_8rem_1fr_4rem] sm:gap-3"
                    >
                        <span className="text-xs font-medium tabular-nums text-gray-400 dark:text-slate-500">{rank + 1}</span>
                        <span className="truncate font-medium text-gray-700 dark:text-slate-300">{product.name}</span>
                        <span className="h-6 overflow-hidden rounded-md bg-gray-100 dark:bg-slate-800" aria-hidden="true">
                            <motion.span
                                className={`block h-full origin-left rounded-md ${product.color}`}
                                initial={{scaleX: 0}}
                                animate={{scaleX: seen || reduceMotion ? product.values[quarter] / leader : 0}}
                                transition={spring}
                            />
                        </span>
                        <span className="text-right tabular-nums text-gray-900 dark:text-white">
                            <AnimatedNumber value={product.values[quarter]} instant={Boolean(reduceMotion)}/>
                        </span>
                    </motion.li>
                ))}
            </ol>

            <div className="mt-6">
                <label htmlFor={sliderId} className="sr-only">{sliderLabel}</label>
                <input
                    id={sliderId}
                    type="range"
                    min={0}
                    max={periods.length - 1}
                    step={1}
                    value={quarter}
                    aria-valuetext={periods[quarter]}
                    onChange={(event) => {
                        setPlaying(false);
                        setPeriod(Number(event.target.value));
                    }}
                    className="w-full accent-sky-500"
                />
                <div className="mt-1 flex justify-between text-[11px] text-gray-400 dark:text-slate-500" aria-hidden="true">
                    <span>{periods[0]}</span>
                    <span>{periods[periods.length - 1]}</span>
                </div>
            </div>
        </section>
    );
};
