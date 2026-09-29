import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuPause, LuPlay, LuRotateCcw} from "react-icons/lu";

interface Product {
    id: string;
    name: string;
    color: string;
    units: number[];
}

const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"];

// Units sold per quarter, in order of the quarters above.
const products: Product[] = [
    {id: "runner", name: "Trail runner", color: "bg-sky-500", units: [4200, 5100, 6300, 5400, 6100, 7400, 8800, 8100]},
    {id: "hoodie", name: "Merino hoodie", color: "bg-violet-500", units: [5600, 3900, 3100, 7900, 6800, 4200, 3900, 9600]},
    {id: "shell", name: "Rain shell", color: "bg-emerald-500", units: [3100, 4800, 2600, 3500, 5200, 6900, 4100, 4700]},
    {id: "daypack", name: "Daypack 22L", color: "bg-amber-500", units: [2400, 3300, 5800, 3600, 3900, 5100, 7200, 5600]},
    {id: "mug", name: "Camp mug", color: "bg-rose-500", units: [1900, 2500, 3400, 4600, 2800, 3300, 4600, 6400]},
    {id: "socks", name: "Wool socks", color: "bg-teal-500", units: [3800, 3000, 2700, 6100, 4400, 3700, 3300, 7100]},
];

const STEP_MS = 1700;

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
const BarRace = () => {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLElement>(null);
    const seen = useInView(ref, {once: true, amount: 0.4});
    const onScreen = useInView(ref);
    const pageVisible = usePageVisible();
    const [quarter, setQuarter] = useState(0);
    const [playing, setPlaying] = useState(false);
    const sliderId = useId();
    const titleId = useId();
    const atEnd = quarter === quarters.length - 1;

    // Start playing the first time the chart is seen, unless reduced motion is preferred.
    useEffect(() => {
        if (seen && !reduceMotion) setPlaying(true);
    }, [seen, reduceMotion]);

    useEffect(() => {
        if (!playing || !onScreen || !pageVisible) return;
        const timer = window.setInterval(() => {
            setQuarter((current) => Math.min(current + 1, quarters.length - 1));
        }, STEP_MS);
        return () => window.clearInterval(timer);
    }, [playing, onScreen, pageVisible]);

    // Stop on the last quarter; the button then offers a replay.
    useEffect(() => {
        if (atEnd) setPlaying(false);
    }, [atEnd]);

    const togglePlay = () => {
        if (atEnd) {
            setQuarter(0);
            setPlaying(true);
            return;
        }
        setPlaying((value) => !value);
    };

    const ranked = [...products].sort((a, b) => b.units[quarter] - a.units[quarter]);
    const leader = ranked[0].units[quarter];
    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 110, damping: 20};

    return (
        <section ref={ref} aria-labelledby={titleId} className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-sm font-medium text-gray-500 dark:text-slate-400">Top sellers, units per quarter</h3>
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
                                {quarters[quarter]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={atEnd ? "Replay" : playing ? "Pause" : "Play"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                >
                    {atEnd ? <LuRotateCcw className="h-4 w-4" aria-hidden="true"/> : playing ? <LuPause className="h-4 w-4" aria-hidden="true"/> : <LuPlay className="ml-0.5 h-4 w-4" aria-hidden="true"/>}
                </button>
            </header>

            <ol className="mt-5 space-y-2.5" aria-label={`Ranking for ${quarters[quarter]}`}>
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
                                animate={{scaleX: seen || reduceMotion ? product.units[quarter] / leader : 0}}
                                transition={spring}
                            />
                        </span>
                        <span className="text-right tabular-nums text-gray-900 dark:text-white">
                            <AnimatedNumber value={product.units[quarter]} instant={Boolean(reduceMotion)}/>
                        </span>
                    </motion.li>
                ))}
            </ol>

            <div className="mt-6">
                <label htmlFor={sliderId} className="sr-only">Quarter</label>
                <input
                    id={sliderId}
                    type="range"
                    min={0}
                    max={quarters.length - 1}
                    step={1}
                    value={quarter}
                    aria-valuetext={quarters[quarter]}
                    onChange={(event) => {
                        setPlaying(false);
                        setQuarter(Number(event.target.value));
                    }}
                    className="w-full accent-sky-500"
                />
                <div className="mt-1 flex justify-between text-[11px] text-gray-400 dark:text-slate-500" aria-hidden="true">
                    <span>{quarters[0]}</span>
                    <span>{quarters[quarters.length - 1]}</span>
                </div>
            </div>
        </section>
    );
};

export default BarRace;
