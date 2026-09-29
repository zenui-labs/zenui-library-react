import {useCallback, useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuChevronLeft, LuChevronRight, LuPause, LuPlay, LuQuote} from "react-icons/lu";

export interface CarouselTestimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    /** Headline number in the side panel, for example "4.2x". */
    metric: string;
    /** Text under the metric that says what it measures. */
    metricLabel: string;
    initials: string;
    /** Tailwind gradient classes for the initials avatar, for example "from-orange-400 to-rose-500". */
    avatar: string;
}

export interface TestimonialCarouselProps {
    testimonials: CarouselTestimonial[];
    eyebrow?: string;
    title?: string;
    /** Accessible name of the carousel region. */
    carouselLabel?: string;
    /** Milliseconds each story stays on screen during autoplay. */
    interval?: number;
    /** Starts with autoplay on. Autoplay never runs when reduced motion is on. */
    autoplay?: boolean;
    /** Index of the story on screen. Pass it with `onIndexChange` to control the carousel. */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    className?: string;
}

/**
 * One story at a time with a headline metric and company tabs. Autoplay pauses on hover, on focus,
 * when the carousel is off screen and when the browser tab is hidden. Arrow keys move between stories.
 */
export const TestimonialCarousel = ({
    testimonials,
    eyebrow = "Customer stories",
    title = "Teams that ship behind a flag sleep better",
    carouselLabel = "Customer stories",
    interval = 7000,
    autoplay = true,
    index: indexProp,
    defaultIndex = 0,
    onIndexChange,
    className = "",
}: TestimonialCarouselProps) => {
    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const [direction, setDirection] = useState(1);
    const [playing, setPlaying] = useState(autoplay);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, {amount: 0.4});
    const reduceMotion = useReducedMotion();
    const controlled = indexProp !== undefined;
    const index = controlled ? indexProp : internalIndex;
    const count = testimonials.length;

    // Kept in refs so a new callback from the parent does not restart the autoplay timer.
    const onIndexChangeRef = useRef(onIndexChange);
    const controlledRef = useRef(controlled);
    useEffect(() => {
        onIndexChangeRef.current = onIndexChange;
        controlledRef.current = controlled;
    });

    const go = useCallback((next: number, dir: number) => {
        const target = (next + count) % count;
        setDirection(dir);
        if (!controlledRef.current) setInternalIndex(target);
        onIndexChangeRef.current?.(target);
    }, [count]);

    useEffect(() => {
        const onVisibility = () => setPageVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    // Autoplay only while the carousel is on screen, visible, and not being read or hovered.
    const running = playing && !reduceMotion && !hovered && !focused && inView && pageVisible;

    useEffect(() => {
        if (!running) return;
        const id = window.setTimeout(() => go(index + 1, 1), interval);
        return () => window.clearTimeout(id);
    }, [running, index, go, interval]);

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") go(index + 1, 1);
        else if (event.key === "ArrowLeft") go(index - 1, -1);
    };

    const current = testimonials[index];
    if (!current) return null;

    return (
        <section ref={sectionRef} className={`w-full bg-gradient-to-b from-orange-50/60 to-white px-4 py-16 sm:px-8 sm:py-24 dark:from-slate-900 dark:to-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">{eyebrow}</p>
                        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPlaying((p) => !p)}
                            aria-pressed={!playing}
                            aria-label={playing ? "Pause automatic rotation" : "Resume automatic rotation"}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            {playing ? <LuPause className="h-4 w-4"/> : <LuPlay className="h-4 w-4"/>}
                        </button>
                        <button
                            type="button"
                            onClick={() => go(index - 1, -1)}
                            aria-label="Previous story"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <LuChevronLeft className="h-5 w-5"/>
                        </button>
                        <button
                            type="button"
                            onClick={() => go(index + 1, 1)}
                            aria-label="Next story"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                        >
                            <LuChevronRight className="h-5 w-5"/>
                        </button>
                    </div>
                </div>

                <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={carouselLabel}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-orange-900/5 outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                >
                    <div className="relative min-h-[380px]" aria-live={running ? "off" : "polite"}>
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                            <motion.figure
                                key={index}
                                custom={direction}
                                variants={{
                                    enter: (dir: number) => ({opacity: 0, x: reduceMotion ? 0 : dir * 48}),
                                    center: {opacity: 1, x: 0},
                                    exit: (dir: number) => ({opacity: 0, x: reduceMotion ? 0 : dir * -48}),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                                aria-roledescription="slide"
                                aria-label={`${index + 1} of ${count}`}
                                className="flex flex-col justify-between gap-8 p-6 sm:p-10 md:grid md:grid-cols-[minmax(0,1fr)_16rem] md:gap-10"
                            >
                                <div className="flex flex-col justify-between gap-8">
                                    <LuQuote className="h-8 w-8 text-orange-400" aria-hidden="true"/>
                                    <blockquote className="text-xl font-medium leading-relaxed tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                                        {current.quote}
                                    </blockquote>
                                    <figcaption className="flex items-center gap-3">
                                        <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${current.avatar}`}>
                                            {current.initials}
                                        </span>
                                        <span>
                                            <span className="block font-semibold text-slate-900 dark:text-white">{current.name}</span>
                                            <span className="block text-sm text-slate-500 dark:text-slate-400">{current.role}, {current.company}</span>
                                        </span>
                                    </figcaption>
                                </div>
                                <div className="flex flex-col justify-end rounded-2xl bg-gradient-to-br from-orange-50 to-rose-50 p-6 dark:from-orange-500/10 dark:to-rose-500/10">
                                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{current.company}</p>
                                    <p className="mt-auto pt-10 text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">{current.metric}</p>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{current.metricLabel}</p>
                                </div>
                            </motion.figure>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {testimonials.map((t, i) => {
                        const active = i === index;
                        return (
                            <button
                                key={t.name}
                                type="button"
                                onClick={() => go(i, i > index ? 1 : -1)}
                                aria-label={`Show story from ${t.name}, ${t.company}`}
                                aria-current={active ? "true" : undefined}
                                className={`group relative overflow-hidden rounded-xl border px-3 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 ${active
                                    ? "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900"
                                    : "border-slate-200 hover:bg-white dark:border-slate-800 dark:hover:bg-slate-900"}`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white ${t.avatar}`}>
                                        {t.initials}
                                    </span>
                                    <span className={`truncate text-sm font-medium ${active ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                                        {t.company}
                                    </span>
                                </span>
                                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-100 dark:bg-slate-800">
                                    {active && (
                                        <motion.span
                                            key={`${index}-${running ? "run" : "hold"}`}
                                            className="block h-full origin-left bg-orange-500"
                                            initial={{scaleX: running ? 0 : 1}}
                                            animate={{scaleX: 1}}
                                            transition={{duration: running ? interval / 1000 : 0, ease: "linear"}}
                                        />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
