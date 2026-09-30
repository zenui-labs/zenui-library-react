import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring} from "framer-motion";

export interface TransitStop {
    id: string;
    /** Short label above the name, usually a year. */
    year: string;
    /** Station name on the map. Two or three words read best. */
    name: string;
    /** The story, shown in the milestone card. */
    body: string;
    /** Optional figure for the card. */
    stat?: {value: string; label: string};
    /** Which line the stop sits on. Defaults to "main". */
    line?: "main" | "branch";
}

export interface TransitLine {
    name: string;
    /** Any CSS color. The line keeps it in both themes, like a printed map. */
    color: string;
}

export interface SubwayTimelineProps {
    /**
     * Stops in chronological order. One run of branch stops forks off the main stop just before it and rejoins at
     * the main stop just after it, so the first and last stop must be on the main line. Main stops may sit inside
     * the run; they carry on along the main line in parallel.
     */
    stops: TransitStop[];
    mainLine: TransitLine;
    branchLine?: TransitLine;
    eyebrow?: string;
    title?: string;
    description?: string;
    /** Label for the last stop's "you are here" marker. */
    hereLabel?: string;
    className?: string;
}

type Point = [number, number];

// Straight segments joined by quadratic corners. The train route and the drawn branch use the same helper and
// radius, so the train sits exactly on the line through every bend.
const roundedPath = (points: Point[], radius: number) => {
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length - 1; i++) {
        const [px, py] = points[i - 1];
        const [cx, cy] = points[i];
        const [nx, ny] = points[i + 1];
        const inLength = Math.hypot(cx - px, cy - py);
        const outLength = Math.hypot(nx - cx, ny - cy);
        const r = Math.min(radius, inLength / 2, outLength / 2);
        const ax = cx - ((cx - px) / inLength) * r;
        const ay = cy - ((cy - py) / inLength) * r;
        const bx = cx + ((nx - cx) / outLength) * r;
        const by = cy + ((ny - cy) / outLength) * r;
        d += ` L ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
    }
    const last = points[points.length - 1];
    return `${d} L ${last[0]} ${last[1]}`;
};

// Map geometry is worked out along the line (u) and across it (v), then turned into x/y. Swapping the axes turns
// the horizontal map into the vertical one, and 45° bends stay 45° bends.
const HORIZONTAL = {width: 1000, height: 300, pad: 46, main: 128, offset: 68, radius: 16, lineWidth: 9};
const VERTICAL = {slot: 84, pad: 34, main: 22, offset: 36, radius: 12, lineWidth: 8, lane: 78};

const useWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        const node = ref.current;
        if (!node) return;
        setWidth(node.clientWidth);
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return [ref, width] as const;
};

/**
 * Company history drawn as a transit map. A train rides the line as the section scrolls through the viewport,
 * taking the branch through its 45° bends, and stations light up behind it. Hover or focus a station for its
 * milestone card. The map turns vertical below 640px.
 */
export const SubwayTimeline = ({
    stops,
    mainLine,
    branchLine,
    eyebrow = "Line map, 2016 to today",
    title = "How we got here, one stop at a time",
    description = "Scroll to ride the line. Hover or tab to a station to read what happened there.",
    hereLabel = "You are here",
    className = "",
}: SubwayTimelineProps) => {
    const [wrapRef, width] = useWidth();
    const mapRef = useRef<HTMLDivElement>(null);
    const routeRef = useRef<SVGPathElement>(null);
    const trainRef = useRef<SVGGElement>(null);
    const reduceMotion = useReducedMotion();
    const inView = useInView(mapRef);
    const vertical = width > 0 && width < 640;
    const [active, setActive] = useState<string | null>(null);
    const [lit, setLit] = useState(reduceMotion ? stops.length : 1);

    const geometry = useMemo(() => {
        const count = stops.length;
        const first = stops.findIndex((stop) => stop.line === "branch");
        let last = -1;
        stops.forEach((stop, index) => {
            if (stop.line === "branch") last = index;
        });
        const hasBranch = Boolean(branchLine) && first > 0 && last < count - 1;
        const from = hasBranch ? first - 1 : -1;
        const to = hasBranch ? last + 1 : -1;

        const slot = vertical ? VERTICAL.slot : (HORIZONTAL.width - HORIZONTAL.pad * 2) / Math.max(1, count - 1);
        const pad = vertical ? VERTICAL.pad : HORIZONTAL.pad;
        const radius = vertical ? VERTICAL.radius : HORIZONTAL.radius;
        // The bend has to finish before the first branch stop, so tight maps get a shallower offset.
        const offset = Math.min(vertical ? VERTICAL.offset : HORIZONTAL.offset, slot - radius - 6);
        const along = stops.map((_, index) => pad + index * slot);
        const across = stops.map((stop) => (hasBranch && stop.line === "branch" ? offset : 0));
        const toXY = ([u, v]: Point): Point => (vertical ? [VERTICAL.main + v, u] : [u, HORIZONTAL.main + v]);

        const start = along[0];
        const end = along[count - 1];
        const main = roundedPath([toXY([start, 0]), toXY([end, 0])], 0);
        let branch = "";
        let route = main;
        if (hasBranch) {
            const a = along[from];
            const b = along[to];
            const bend: Point[] = [[a, 0], [a + offset, offset], [b - offset, offset], [b, 0]];
            // A short lead-in on each side lets the branch peel off the main line with a real curve.
            branch = roundedPath([[a - radius, 0] as Point, ...bend, [b + radius, 0] as Point].map(toXY), radius);
            route = roundedPath([[start, 0] as Point, ...bend, [end, 0] as Point].map(toXY), radius);
        }

        return {
            count,
            from,
            to,
            hasBranch,
            along,
            points: stops.map((_, index) => toXY([along[index], across[index]])),
            main,
            branch,
            route,
            width: vertical ? VERTICAL.lane : HORIZONTAL.width,
            height: vertical ? pad * 2 + slot * (count - 1) : HORIZONTAL.height,
            lineWidth: vertical ? VERTICAL.lineWidth : HORIZONTAL.lineWidth,
        };
    }, [stops, branchLine, vertical]);

    const {scrollYProgress} = useScroll({target: mapRef, offset: ["start 0.85", "end 0.5"]});
    const progress = useSpring(scrollYProgress, {stiffness: 60, damping: 18, mass: 0.7});

    const place = useCallback((value: number) => {
        const path = routeRef.current;
        const train = trainRef.current;
        if (!path || !train) return;
        const total = path.getTotalLength();
        const length = Math.min(1, Math.max(0, value)) * total;
        const point = path.getPointAtLength(length);
        const behind = path.getPointAtLength(Math.max(0, length - 2));
        const ahead = path.getPointAtLength(Math.min(total, length + 2));
        const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
        train.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
        const position = vertical ? point.y : point.x;
        const passed = geometry.along.filter((u) => u <= position + 2).length;
        setLit((current) => (current === passed ? current : passed));
    }, [geometry, vertical]);

    useMotionValueEvent(progress, "change", (value) => {
        if (!reduceMotion) place(value);
    });

    // Re-seat the train when the map changes orientation, and park it at the end with reduced motion.
    useLayoutEffect(() => {
        place(reduceMotion ? 1 : progress.get());
    }, [place, progress, reduceMotion]);

    useEffect(() => {
        if (!active) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    const lineFor = (stop: TransitStop) => (geometry.hasBranch && stop.line === "branch" && branchLine ? branchLine : mainLine);
    const isInterchange = (index: number) => index === geometry.from || index === geometry.to;
    const lastIndex = stops.length - 1;
    const activeIndex = stops.findIndex((stop) => stop.id === active);
    const slotShare = geometry.count > 1 ? (geometry.points[1][0] - geometry.points[0][0]) / geometry.width : 0.1;
    const unit = (value: number, size: number) => (vertical ? `${value}px` : `${(value / size) * 100}%`);

    return (
        <section className={`relative w-full overflow-hidden bg-[#f6f4ee] px-4 py-16 text-slate-900 sm:px-8 sm:py-24 dark:bg-[#0c0e12] dark:text-white ${className}`}>
            <div className="relative mx-auto max-w-6xl" ref={wrapRef}>
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-300" aria-label="Map key">
                        {[mainLine, ...(geometry.hasBranch && branchLine ? [branchLine] : [])].map((line) => (
                            <li key={line.name} className="flex items-center gap-2">
                                <span aria-hidden="true" className="h-[5px] w-6 rounded-full" style={{background: line.color}}/>
                                {line.name}
                            </li>
                        ))}
                        {geometry.hasBranch && (
                            <li className="flex items-center gap-2">
                                <span aria-hidden="true" className="h-3 w-3 rounded-full border-[2.5px] border-slate-900 bg-white dark:border-white dark:bg-[#0c0e12]"/>
                                Interchange
                            </li>
                        )}
                    </ul>
                </div>

                <div
                    ref={mapRef}
                    className="relative mt-12 sm:mt-16"
                    style={vertical ? {height: geometry.height} : {aspectRatio: `${geometry.width} / ${geometry.height}`}}
                >
                    <svg
                        aria-hidden="true"
                        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                        className="absolute left-0 top-0 overflow-visible"
                        style={vertical ? {width: geometry.width, height: geometry.height} : {width: "100%", height: "100%"}}
                    >
                        {!vertical && (
                            <path
                                d="M -40 262 C 160 228 300 292 500 256 S 820 214 1040 246"
                                fill="none"
                                strokeWidth={30}
                                strokeLinecap="round"
                                className="stroke-sky-200/50 dark:stroke-sky-400/[0.07]"
                            />
                        )}
                        <path ref={routeRef} d={geometry.route} fill="none" stroke="none"/>
                        {geometry.hasBranch && branchLine && (
                            <path d={geometry.branch} fill="none" stroke={branchLine.color} strokeWidth={geometry.lineWidth} strokeLinejoin="round"/>
                        )}
                        <path d={geometry.main} fill="none" stroke={mainLine.color} strokeWidth={geometry.lineWidth} strokeLinecap="round"/>

                        {stops.map((stop, index) => {
                            const [x, y] = geometry.points[index];
                            const onBranch = geometry.hasBranch && stop.line === "branch";
                            if (isInterchange(index) || index === lastIndex) {
                                return (
                                    <circle
                                        key={stop.id}
                                        cx={x}
                                        cy={y}
                                        r={geometry.lineWidth * 0.95}
                                        strokeWidth={geometry.lineWidth * 0.42}
                                        className="fill-white stroke-slate-900 dark:fill-[#0c0e12] dark:stroke-white"
                                    />
                                );
                            }
                            // Classic map ticks point toward the station name.
                            const reach = geometry.lineWidth * 1.25;
                            const [dx, dy] = vertical ? [onBranch ? reach : -reach, 0] : [0, onBranch ? reach : -reach];
                            return (
                                <line
                                    key={stop.id}
                                    x1={x}
                                    y1={y}
                                    x2={x + dx}
                                    y2={y + dy}
                                    stroke={lineFor(stop).color}
                                    strokeWidth={geometry.lineWidth * 0.5}
                                    style={{opacity: index < lit ? 1 : 0.45, transition: "opacity 300ms"}}
                                />
                            );
                        })}

                        {inView && !reduceMotion && (
                            <motion.circle
                                cx={geometry.points[lastIndex][0]}
                                cy={geometry.points[lastIndex][1]}
                                fill="none"
                                stroke={mainLine.color}
                                strokeWidth={2}
                                initial={{r: geometry.lineWidth, opacity: 0.8}}
                                animate={{r: geometry.lineWidth * 3, opacity: 0}}
                                transition={{duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1]}}
                            />
                        )}

                        <g ref={trainRef}>
                            <g transform={`scale(${vertical ? 0.9 : 1.3})`}>
                                <ellipse cx={1} cy={3} rx={17} ry={7} className="fill-slate-900/20 dark:fill-black/60"/>
                                <path d="M -15 -6.5 H 9 Q 16 -6.5 16 0 Q 16 6.5 9 6.5 H -15 Q -16.5 6.5 -16.5 5 V -5 Q -16.5 -6.5 -15 -6.5 Z" className="fill-white stroke-slate-900 dark:fill-slate-100 dark:stroke-black" strokeWidth={1.4}/>
                                <rect x={-12} y={-3} width={5} height={4} rx={1} className="fill-slate-800"/>
                                <rect x={-5} y={-3} width={5} height={4} rx={1} className="fill-slate-800"/>
                                <rect x={2} y={-3} width={5} height={4} rx={1} className="fill-slate-800"/>
                                <path d="M 10 -3.5 Q 13.5 -3 13.5 0 L 10 0 Z" className="fill-slate-800"/>
                                <rect x={-16.5} y={3.2} width={33} height={1.6} style={{fill: mainLine.color}}/>
                            </g>
                        </g>
                    </svg>

                    {stops.map((stop, index) => {
                        const [x, y] = geometry.points[index];
                        const onBranch = geometry.hasBranch && stop.line === "branch";
                        const passed = index < lit;
                        const describedBy = active === stop.id ? `card-${stop.id}` : undefined;
                        const common = {
                            "aria-describedby": describedBy,
                            onMouseEnter: () => setActive(stop.id),
                            onMouseLeave: () => setActive((current) => (current === stop.id ? null : current)),
                            onFocus: () => setActive(stop.id),
                            onBlur: () => setActive((current) => (current === stop.id ? null : current)),
                        };
                        const tone = passed ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600";

                        if (vertical) {
                            return (
                                <button
                                    key={stop.id}
                                    type="button"
                                    {...common}
                                    className="absolute left-0 right-0 flex h-11 items-center rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white"
                                    style={{top: y - 22, paddingLeft: VERTICAL.lane + 6}}
                                >
                                    <span className={`w-12 shrink-0 font-mono text-xs tabular-nums transition-colors duration-300 ${tone}`}>{stop.year}</span>
                                    <span className={`text-sm font-semibold transition-colors duration-300 ${tone}`}>{stop.name}</span>
                                    {index === lastIndex && (
                                        <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white" style={{background: mainLine.color}}>{hereLabel}</span>
                                    )}
                                </button>
                            );
                        }

                        return (
                            <button
                                key={stop.id}
                                type="button"
                                {...common}
                                className={`absolute flex flex-col items-center rounded-lg text-center outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white ${onBranch ? "flex-col-reverse pt-4" : "pb-4"}`}
                                style={{
                                    width: `${slotShare * 94}%`,
                                    left: unit(x, geometry.width),
                                    top: unit(y, geometry.height),
                                    transform: `translate(-50%, ${onBranch ? "0" : "-100%"})`,
                                }}
                            >
                                <span className={`text-[10px] font-semibold leading-tight transition-colors duration-300 lg:text-xs ${tone}`}>{stop.name}</span>
                                <span className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${onBranch ? "mt-0 mb-0.5" : "mt-0.5"} ${passed ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-600"}`}>{stop.year}</span>
                            </button>
                        );
                    })}

                    {!vertical && (
                        <span
                            className="pointer-events-none absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm"
                            style={{
                                left: unit(geometry.points[lastIndex][0], geometry.width),
                                top: unit(geometry.points[lastIndex][1], geometry.height),
                                transform: "translate(-100%, 70%) translateX(10px)",
                                background: mainLine.color,
                            }}
                        >
                            {hereLabel}
                        </span>
                    )}

                    <AnimatePresence>
                        {activeIndex >= 0 && (() => {
                            const stop = stops[activeIndex];
                            const [x, y] = geometry.points[activeIndex];
                            const onBranch = geometry.hasBranch && stop.line === "branch";
                            const share = x / geometry.width;
                            const line = lineFor(stop);
                            const position = vertical
                                ? {top: y + 26, left: VERTICAL.lane + 4, right: 0}
                                : {
                                    left: unit(x, geometry.width),
                                    ...(onBranch ? {bottom: `calc(${100 - (y / geometry.height) * 100}% + 18px)`} : {top: `calc(${(y / geometry.height) * 100}% + 18px)`}),
                                    transform: `translateX(${share < 0.2 ? "-28px" : share > 0.8 ? "calc(-100% + 28px)" : "-50%"})`,
                                };
                            return (
                                <div key={stop.id} className="pointer-events-none absolute z-20" style={position}>
                                    <motion.div
                                        id={`card-${stop.id}`}
                                        role="tooltip"
                                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: onBranch ? 6 : -6, scale: 0.97}}
                                        animate={{opacity: 1, y: 0, scale: 1}}
                                        exit={{opacity: 0, transition: {duration: 0.12}}}
                                        transition={{type: "spring", stiffness: 420, damping: 32}}
                                        className="w-full max-w-xs overflow-hidden rounded-xl border border-slate-900/10 bg-white text-left shadow-[0_18px_40px_-16px_rgba(15,23,42,0.35)] sm:w-72 dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]"
                                    >
                                        <div className="h-1.5" style={{background: line.color}}/>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                                <span>{line.name}</span>
                                                <span className="tabular-nums">{stop.year}</span>
                                            </div>
                                            <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{stop.name}</p>
                                            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{stop.body}</p>
                                            {stop.stat && (
                                                <p className="mt-3 flex items-baseline gap-2 border-t border-dashed border-slate-900/10 pt-3 dark:border-white/10">
                                                    <span className="text-xl font-semibold tabular-nums text-slate-900 dark:text-white">{stop.stat.value}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">{stop.stat.label}</span>
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
