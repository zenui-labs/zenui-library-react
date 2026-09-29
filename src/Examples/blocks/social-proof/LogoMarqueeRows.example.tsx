import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

interface Logo {
    name: string;
    mark: ReactNode;
}

const markClass = "h-5 w-5 shrink-0";

// Simple geometric marks drawn with SVG so the block has no image dependencies.
const marks = {
    ring: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3"/></svg>,
    triangle: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M12 3 21 20H3Z" fill="currentColor"/></svg>,
    squares: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/></svg>,
    arc: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M3 19a9 9 0 0 1 18 0h-5a4 4 0 0 0-8 0Z" fill="currentColor"/></svg>,
    bolt: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7Z" fill="currentColor"/></svg>,
    hex: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7Z" fill="currentColor"/></svg>,
    wave: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M2 14c3-6 6 6 10 0s7 6 10 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>,
    plus: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" fill="currentColor"/></svg>,
    dots: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><circle cx="6" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/><circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.3"/></svg>,
};

interface RowData {
    label: string;
    speed: number;
    direction: 1 | -1;
    logos: Logo[];
}

const rows: RowData[] = [
    {
        label: "Fintech",
        speed: 28,
        direction: -1,
        logos: [
            {name: "Ferrox", mark: marks.bolt},
            {name: "Northbeam Bank", mark: marks.arc},
            {name: "Ledgerly", mark: marks.squares},
            {name: "Coinstack", mark: marks.hex},
            {name: "Paylane", mark: marks.wave},
            {name: "Tallyhouse", mark: marks.dots},
        ],
    },
    {
        label: "Healthcare",
        speed: 22,
        direction: 1,
        logos: [
            {name: "Halcyon Health", mark: marks.ring},
            {name: "Brightline", mark: marks.plus},
            {name: "Carewell", mark: marks.arc},
            {name: "Medora", mark: marks.triangle},
            {name: "Pulsewise", mark: marks.wave},
            {name: "Vitalis", mark: marks.hex},
        ],
    },
    {
        label: "Retail",
        speed: 34,
        direction: -1,
        logos: [
            {name: "Arcadia Goods", mark: marks.triangle},
            {name: "Parcelly", mark: marks.hex},
            {name: "Quillo", mark: marks.squares},
            {name: "Mercato", mark: marks.dots},
            {name: "Fernhill", mark: marks.ring},
            {name: "Stitchery", mark: marks.bolt},
        ],
    },
];

interface MarqueeRowProps {
    row: RowData;
    running: boolean;
}

const MarqueeRow = ({row, running}: MarqueeRowProps) => {
    const x = useMotionValue(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    // Moves the track by speed px/s and wraps at half its width, where the duplicate copy lines up.
    useAnimationFrame((_, delta) => {
        if (!running || hovered || !trackRef.current) return;
        const half = trackRef.current.scrollWidth / 2;
        if (half === 0) return;
        let next = x.get() + (row.direction * row.speed * delta) / 1000;
        if (next <= -half) next += half;
        if (next > 0) next -= half;
        x.set(next);
    });

    const list = (copy: boolean) => (
        <ul className="flex shrink-0 gap-3 pr-3" aria-hidden={copy || undefined}>
            {row.logos.map((logo) => (
                <li
                    key={logo.name}
                    className="flex h-14 shrink-0 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
                >
                    {logo.mark}
                    <span className="whitespace-nowrap text-base font-semibold tracking-tight">{logo.name}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="flex items-center gap-4">
            <span className="hidden w-24 shrink-0 text-right text-xs font-medium uppercase tracking-wider text-slate-400 md:block">{row.label}</span>
            <div
                className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <motion.div ref={trackRef} style={{x}} className="flex w-max">
                    {list(false)}
                    {list(true)}
                </motion.div>
            </div>
        </div>
    );
};

const LogoMarqueeRows = () => {
    const reduceMotion = useReducedMotion();
    const [paused, setPaused] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef);

    useEffect(() => {
        const onVisibility = () => setPageVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    const running = !paused && !reduceMotion && inView && pageVisible;
    const logoCount = rows.reduce((sum, row) => sum + row.logos.length, 0);

    return (
        <section ref={sectionRef} className="w-full overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-end sm:px-8">
                <div className="max-w-xl">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Customers</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Regulated industries run on Keystone
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        More than 12,000 teams in finance, healthcare and retail, including {logoCount} of the companies below.
                    </p>
                </div>
                {!reduceMotion && (
                    <button
                        type="button"
                        aria-pressed={paused}
                        onClick={() => setPaused((p) => !p)}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {paused ? <LuPlay className="h-4 w-4"/> : <LuPause className="h-4 w-4"/>}
                        {paused ? "Play logos" : "Pause logos"}
                    </button>
                )}
            </div>

            {reduceMotion ? (
                <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-3 px-4 sm:px-8">
                    {rows.flatMap((row) => row.logos).map((logo) => (
                        <li key={logo.name}
                            className="flex h-14 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                            {logo.mark}
                            <span className="text-base font-semibold tracking-tight">{logo.name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mx-auto mt-12 max-w-7xl space-y-3 sm:px-8">
                    {rows.map((row) => <MarqueeRow key={row.label} row={row} running={running}/>)}
                </div>
            )}
        </section>
    );
};

export default LogoMarqueeRows;
