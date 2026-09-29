import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface MarqueeLogo {
    name: string;
    /** Icon or SVG shown before the name. Mark it aria-hidden, the name is read instead. */
    mark: ReactNode;
}

export interface MarqueeRowData {
    /** Group name shown to the left of the row on medium screens and up, for example an industry. */
    label: string;
    /** Scroll speed in pixels per second. */
    speed: number;
    /** -1 moves the row to the left, 1 moves it to the right. */
    direction: 1 | -1;
    logos: MarqueeLogo[];
}

export interface MarqueeRowProps {
    row: MarqueeRowData;
    /** Set to false to hold the row still, for example while the section is off screen. */
    running?: boolean;
}

/** One labeled row of logos that loops endlessly and pauses while the pointer is over it. */
export const MarqueeRow = ({row, running = true}: MarqueeRowProps) => {
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

export interface LogoMarqueeRowsProps {
    rows: MarqueeRowData[];
    eyebrow?: string;
    title?: string;
    /** Text under the title. Pass a function to use the total number of logos in it. */
    description?: ReactNode | ((logoCount: number) => ReactNode);
    pauseLabel?: string;
    playLabel?: string;
    className?: string;
}

const defaultDescription = (logoCount: number) =>
    `More than 12,000 teams in finance, healthcare and retail, including ${logoCount} of the companies below.`;

/**
 * Rows of logos that move in opposite directions, with a pause button. The rows stop while the section is
 * off screen or the tab is hidden, and become a static grid when reduced motion is on.
 */
export const LogoMarqueeRows = ({
    rows,
    eyebrow = "Customers",
    title = "Regulated industries run on Keystone",
    description = defaultDescription,
    pauseLabel = "Pause logos",
    playLabel = "Play logos",
    className = "",
}: LogoMarqueeRowsProps) => {
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
    const descriptionContent = typeof description === "function" ? description(logoCount) : description;

    return (
        <section ref={sectionRef} className={`w-full overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-end sm:px-8">
                <div className="max-w-xl">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        {title}
                    </h2>
                    {descriptionContent && (
                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            {descriptionContent}
                        </p>
                    )}
                </div>
                {!reduceMotion && (
                    <button
                        type="button"
                        aria-pressed={paused}
                        onClick={() => setPaused((p) => !p)}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {paused ? <LuPlay className="h-4 w-4"/> : <LuPause className="h-4 w-4"/>}
                        {paused ? playLabel : pauseLabel}
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
