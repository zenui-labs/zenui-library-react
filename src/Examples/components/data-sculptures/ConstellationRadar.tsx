import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";

export interface ConstellationAxis {
    id: string;
    label: string;
}

export interface ConstellationProfile {
    id: string;
    label: string;
    /** One value per axis, from 0 to `max`. */
    values: number[];
}

export interface ConstellationRadarProps {
    axes: ConstellationAxis[];
    /** The first profile is always drawn. A second one can be switched on to compare. */
    profiles: ConstellationProfile[];
    max?: number;
    /** Whether the second profile is shown at first. */
    defaultCompare?: boolean;
    title?: ReactNode;
    subtitle?: ReactNode;
    /** Plain text summary for screen readers. */
    summary: string;
    className?: string;
}

// Star atlases name the stars of a constellation by brightness: α is the brightest, then β, γ and so on.
const BAYER = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ"];

const useWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return [ref, width] as const;
};

interface Star {
    axis: number;
    value: number;
    x: number;
    y: number;
    r: number;
    bayer: string;
}

interface Active {
    profile: number;
    axis: number;
}

/**
 * A radar chart drawn as a star chart. Each value is a star on its axis, sized by value and named by brightness,
 * and thin constellation lines join them. Night sky in dark mode, ink on paper in light mode.
 */
export const ConstellationRadar = ({axes, profiles, max = 100, defaultCompare = false, title, subtitle, summary, className = ""}: ConstellationRadarProps) => {
    const [measureRef, width] = useWidth();
    const viewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(viewRef, {amount: 0.3});
    const [seen, setSeen] = useState(false);
    const reduceMotion = useReducedMotion() ?? false;
    const [compare, setCompare] = useState(defaultCompare && profiles.length > 1);
    const [active, setActive] = useState<Active | null>(null);
    const uid = useId().replace(/:/g, "");

    useEffect(() => {
        if (inView) setSeen(true);
    }, [inView]);

    const size = Math.min(width, 460);
    const center = size / 2;
    const compact = size < 400;
    const radius = Math.max(0, size / 2 - (compact ? 46 : 62));
    const count = axes.length;
    const angle = (axis: number) => -Math.PI / 2 + (2 * Math.PI * axis) / count;

    const constellations = useMemo(() => profiles.slice(0, 2).map((profile) => {
        const order = profile.values.map((value, axis) => ({value, axis})).sort((a, b) => b.value - a.value);
        return profile.values.map((value, axis): Star => {
            const share = Math.max(0.06, Math.min(1, value / max));
            const r = radius * share;
            const a = -Math.PI / 2 + (2 * Math.PI * axis) / profile.values.length;
            return {
                axis,
                value,
                x: center + r * Math.cos(a),
                y: center + r * Math.sin(a),
                r: 1.4 + 4.6 * share ** 1.6,
                bayer: BAYER[order.findIndex((entry) => entry.axis === axis)] ?? "",
            };
        });
    }), [profiles, max, radius, center]);

    // Faint field stars. Seeded, so the sky is the same on every render.
    const field = useMemo(() => {
        let seed = 7 + count * 131;
        const random = () => {
            seed = (seed * 16807) % 2147483647;
            return seed / 2147483647;
        };
        return Array.from({length: 90}, () => {
            const r = Math.sqrt(random()) * (radius + (compact ? 30 : 44));
            const a = random() * Math.PI * 2;
            return {x: center + r * Math.cos(a), y: center + r * Math.sin(a), r: 0.3 + random() ** 3 * 1.1, o: 0.25 + random() * 0.5, d: random()};
        });
    }, [count, radius, center, compact]);

    // Constellation lines stop short of each star, the way printed atlases leave a little air around them.
    const segments = (stars: Star[]) => stars.map((star, i) => {
        const next = stars[(i + 1) % stars.length];
        const dx = next.x - star.x;
        const dy = next.y - star.y;
        const length = Math.hypot(dx, dy) || 1;
        const a = star.r + 4;
        const b = next.r + 4;
        if (length <= a + b) return null;
        return {
            key: `${star.axis}-${next.axis}`,
            x1: star.x + (dx * a) / length,
            y1: star.y + (dy * a) / length,
            x2: next.x - (dx * b) / length,
            y2: next.y - (dy * b) / length,
        };
    });

    const visibleProfiles = compare ? [0, 1] : [0];

    const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        let best: Active | null = null;
        let bestDistance = 20 ** 2;
        for (const profile of visibleProfiles) {
            constellations[profile]?.forEach((star) => {
                const distance = (star.x - x) ** 2 + (star.y - y) ** 2;
                if (distance < bestDistance) {
                    bestDistance = distance;
                    best = {profile, axis: star.axis};
                }
            });
        }
        setActive(best);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const current = active ?? {profile: 0, axis: -1};
        let next: Active | null = null;
        if (event.key === "ArrowRight") next = {...current, axis: (current.axis + 1) % count};
        if (event.key === "ArrowLeft") next = {...current, axis: (current.axis - 1 + count) % count};
        if ((event.key === "ArrowUp" || event.key === "ArrowDown") && compare) next = {profile: current.profile === 0 ? 1 : 0, axis: Math.max(0, current.axis)};
        if (next) {
            event.preventDefault();
            setActive(next);
        } else if (event.key === "Escape") {
            setActive(null);
        }
    };

    const activeStar = active ? constellations[active.profile]?.[active.axis] : null;
    const twinkle = !reduceMotion;
    const glowIds = [`${uid}-glow-a`, `${uid}-glow-b`];
    const coreClasses = ["fill-[#1b2330] dark:fill-[#f1f5ff]", "fill-[#b4442c] dark:fill-[#ffd79c]"];
    const lineClasses = ["stroke-[#1b2330]/70 dark:stroke-[#c9d8ff]/55", "stroke-[#b4442c]/80 dark:stroke-[#ffd79c]/55"];

    const renderConstellation = (profile: number) => {
        const stars = constellations[profile];
        if (!stars) return null;
        return (
            <motion.g
                key={profiles[profile].id}
                initial={profile === 1 ? {opacity: 0} : false}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
            >
                {segments(stars).map((segment, i) => segment && (
                    <motion.line
                        key={segment.key}
                        x1={segment.x1}
                        y1={segment.y1}
                        x2={segment.x2}
                        y2={segment.y2}
                        strokeWidth={0.8}
                        strokeLinecap="round"
                        strokeDasharray={profile === 1 ? "3 3" : undefined}
                        className={lineClasses[profile]}
                        initial={reduceMotion ? false : {pathLength: 0, opacity: 0}}
                        animate={seen || reduceMotion ? {pathLength: 1, opacity: 1} : {pathLength: 0, opacity: 0}}
                        transition={{duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.5 + i * 0.16}}
                    />
                ))}
                {stars.map((star, i) => {
                    const isActive = active?.profile === profile && active.axis === star.axis;
                    const bright = star.value / max >= 0.85;
                    const period = 2.4 + ((star.axis * 7 + profile * 3) % 5) * 0.45;
                    return (
                        <motion.g
                            key={star.axis}
                            initial={reduceMotion ? false : {opacity: 0, scale: 2.2}}
                            animate={seen || reduceMotion ? {opacity: 1, scale: 1} : {opacity: 0, scale: 2.2}}
                            transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.16}}
                            style={{originX: 0.5, originY: 0.5}}
                        >
                            {/* Glow and spikes only exist in the night sky. Paper charts print a clean disc. */}
                            <g className="opacity-0 dark:opacity-100">
                                <circle
                                    cx={star.x}
                                    cy={star.y}
                                    r={star.r * 4.2}
                                    fill={`url(#${glowIds[profile]})`}
                                    className="zs-constellation-twinkle"
                                    style={twinkle ? {animation: `zsConstellationTwinkle ${period}s ease-in-out ${-(star.axis * 0.7)}s infinite`, animationPlayState: inView ? "running" : "paused"} : undefined}
                                />
                                {bright && (
                                    <path
                                        d={`M${star.x - star.r * 3.2},${star.y}H${star.x + star.r * 3.2}M${star.x},${star.y - star.r * 3.2}V${star.y + star.r * 3.2}`}
                                        strokeWidth={0.5}
                                        className={profile === 0 ? "stroke-[#f1f5ff]/70" : "stroke-[#ffd79c]/70"}
                                    />
                                )}
                            </g>
                            <circle cx={star.x} cy={star.y} r={star.r} strokeWidth={1.5} className={`${coreClasses[profile]} stroke-[#f5f0e6] dark:stroke-transparent`}/>
                            {isActive && <circle cx={star.x} cy={star.y} r={star.r + 5} fill="none" strokeWidth={1} className="stroke-[#1b2330] dark:stroke-white"/>}
                            {profile === 0 && (
                                <text
                                    x={star.x + star.r + 3}
                                    y={star.y - star.r - 1}
                                    className="fill-[#1b2330]/70 font-serif text-[11px] italic dark:fill-[#c9d8ff]/70"
                                >
                                    {star.bayer}
                                </text>
                            )}
                        </motion.g>
                    );
                })}
            </motion.g>
        );
    };

    return (
        <figure className={`w-full max-w-xl rounded-2xl border border-[#e3dccd] bg-[#f5f0e6] p-4 text-[#1b2330] dark:border-white/10 dark:bg-[#060913] dark:bg-[radial-gradient(ellipse_at_50%_35%,#0f1830_0%,#060913_70%)] dark:text-[#e6ecff] sm:p-6 ${className}`}>
            <style>{`
                @keyframes zsConstellationTwinkle { 0%, 100% { opacity: 1; transform: scale(1); } 45% { opacity: 0.45; transform: scale(0.8); } 55% { opacity: 0.8; transform: scale(1.08); } }
                .zs-constellation-twinkle { transform-box: fill-box; transform-origin: center; }
            `}</style>
            <div className="flex flex-wrap items-start justify-between gap-3">
                {(title || subtitle) && (
                    <figcaption className="min-w-0">
                        {title && <div className="text-[11px] font-semibold uppercase tracking-[0.22em]">{title}</div>}
                        {subtitle && <div className="mt-1 text-xs text-[#1b2330]/60 dark:text-[#e6ecff]/55">{subtitle}</div>}
                    </figcaption>
                )}
                {profiles.length > 1 && (
                    <button
                        type="button"
                        aria-pressed={compare}
                        onClick={() => {
                            setCompare((value) => !value);
                            setActive(null);
                        }}
                        className="flex items-center gap-2 rounded-full border border-[#1b2330]/20 px-3 py-1.5 text-xs transition-colors hover:border-[#1b2330]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4442c]/60 aria-pressed:border-[#b4442c]/60 aria-pressed:text-[#b4442c] dark:border-white/15 dark:hover:border-white/30 dark:focus-visible:ring-[#ffd79c]/60 dark:aria-pressed:border-[#ffd79c]/50 dark:aria-pressed:text-[#ffd79c]"
                    >
                        <span className={`relative h-3 w-6 rounded-full transition-colors ${compare ? "bg-[#b4442c]/25 dark:bg-[#ffd79c]/25" : "bg-[#1b2330]/10 dark:bg-white/10"}`}>
                            <span className={`absolute top-0.5 h-2 w-2 rounded-full transition-all duration-300 ${compare ? "left-3.5 bg-[#b4442c] dark:bg-[#ffd79c]" : "left-0.5 bg-[#1b2330]/50 dark:bg-white/50"}`}/>
                        </span>
                        Compare with {profiles[1].label}
                    </button>
                )}
            </div>

            <div
                ref={viewRef}
                tabIndex={0}
                role="group"
                aria-label={`${summary} Use the left and right arrow keys to read each star${profiles.length > 1 ? ", up and down to switch profile when comparing" : ""}.`}
                onKeyDown={handleKeyDown}
                onBlur={() => setActive(null)}
                className="mt-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#1b2330]/30 dark:focus-visible:ring-white/30"
            >
                <div ref={measureRef} className="relative mx-auto w-full max-w-[460px]">
                    {size > 0 && (
                        <svg
                            width={size}
                            height={size}
                            aria-hidden="true"
                            className="mx-auto block touch-none select-none"
                            onPointerMove={handlePointerMove}
                            onPointerDown={handlePointerMove}
                            onPointerLeave={() => setActive(null)}
                        >
                            <defs>
                                <radialGradient id={glowIds[0]}>
                                    <stop offset="0%" stopColor="#dfe9ff" stopOpacity={0.9}/>
                                    <stop offset="35%" stopColor="#9fbaff" stopOpacity={0.28}/>
                                    <stop offset="100%" stopColor="#9fbaff" stopOpacity={0}/>
                                </radialGradient>
                                <radialGradient id={glowIds[1]}>
                                    <stop offset="0%" stopColor="#ffe6bf" stopOpacity={0.9}/>
                                    <stop offset="35%" stopColor="#ffb85c" stopOpacity={0.26}/>
                                    <stop offset="100%" stopColor="#ffb85c" stopOpacity={0}/>
                                </radialGradient>
                            </defs>

                            {field.map((star, i) => (
                                <circle key={i} cx={star.x} cy={star.y} r={star.r} className="fill-[#1b2330] dark:fill-white" style={{opacity: star.o * 0.6}}/>
                            ))}

                            {/* Graticule: rings every quarter, and an atlas-style scale on the rim. */}
                            {[0.25, 0.5, 0.75, 1].map((ring) => (
                                <circle
                                    key={ring}
                                    cx={center}
                                    cy={center}
                                    r={radius * ring}
                                    fill="none"
                                    strokeWidth={ring === 1 ? 0.8 : 0.5}
                                    strokeDasharray={ring === 1 ? undefined : "1 4"}
                                    className="stroke-[#1b2330]/35 dark:stroke-[#c9d8ff]/25"
                                />
                            ))}
                            <circle cx={center} cy={center} r={radius + 10} fill="none" strokeWidth={0.5} className="stroke-[#1b2330]/35 dark:stroke-[#c9d8ff]/25"/>
                            {Array.from({length: 72}, (_, i) => {
                                const a = (i / 72) * Math.PI * 2;
                                const long = i % 6 === 0;
                                const r1 = radius + 10;
                                const r2 = radius + (long ? 2 : 6);
                                return (
                                    <line
                                        key={i}
                                        x1={center + r1 * Math.cos(a)}
                                        y1={center + r1 * Math.sin(a)}
                                        x2={center + r2 * Math.cos(a)}
                                        y2={center + r2 * Math.sin(a)}
                                        strokeWidth={0.5}
                                        className="stroke-[#1b2330]/40 dark:stroke-[#c9d8ff]/30"
                                    />
                                );
                            })}
                            {[25, 50, 75].map((tick) => (
                                <text key={tick} x={center + 3} y={center - (radius * tick) / 100 - 3} className="fill-[#1b2330]/40 font-mono text-[8px] dark:fill-[#c9d8ff]/35">
                                    {Math.round((max * tick) / 100)}
                                </text>
                            ))}

                            {axes.map((axis, i) => {
                                const a = angle(i);
                                const highlighted = active?.axis === i;
                                const labelRadius = radius + (compact ? 22 : 26);
                                const cos = Math.cos(a);
                                const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
                                // 9px capitals with wide tracking run about 7.6px per letter. Labels that would leave the
                                // chart are pulled back in and lifted above their axis so they clear the rim.
                                const labelWidth = axis.label.length * 7.6;
                                const rawX = center + labelRadius * cos;
                                const x = anchor === "end" ? Math.max(rawX, labelWidth + 2) : anchor === "start" ? Math.min(rawX, size - labelWidth - 2) : rawX;
                                const y = center + labelRadius * Math.sin(a) - (x !== rawX ? 10 : 0);
                                return (
                                    <g key={axis.id}>
                                        <line
                                            x1={center}
                                            y1={center}
                                            x2={center + radius * Math.cos(a)}
                                            y2={center + radius * Math.sin(a)}
                                            strokeWidth={highlighted ? 0.9 : 0.5}
                                            className={`transition-[stroke-opacity] ${highlighted ? "stroke-[#1b2330]/60 dark:stroke-[#c9d8ff]/60" : "stroke-[#1b2330]/20 dark:stroke-[#c9d8ff]/15"}`}
                                        />
                                        <text
                                            x={x}
                                            y={y + 3}
                                            textAnchor={anchor}
                                            className={`text-[9px] font-medium uppercase tracking-[0.18em] transition-opacity ${highlighted ? "fill-current opacity-100" : "fill-current opacity-60"}`}
                                        >
                                            {axis.label}
                                        </text>
                                    </g>
                                );
                            })}

                            {renderConstellation(0)}
                            <AnimatePresence>{compare && renderConstellation(1)}</AnimatePresence>
                        </svg>
                    )}

                    <AnimatePresence>
                        {activeStar && active && (
                            <motion.div
                                key="tooltip"
                                aria-hidden="true"
                                initial={{opacity: 0, y: 4}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 4}}
                                transition={{duration: 0.16}}
                                className="pointer-events-none absolute z-10 w-40 rounded-md border border-[#1b2330]/15 bg-[#fbf8f1] px-3 py-2 text-xs shadow-[0_10px_24px_-14px_rgb(27_35_48/0.5)] transition-[left,top] duration-150 dark:border-white/10 dark:bg-[#0c1222]/95 dark:shadow-black"
                                style={{
                                    left: Math.min(size - 164, Math.max(4, activeStar.x - 80)),
                                    top: activeStar.y > center ? activeStar.y - activeStar.r - 66 : activeStar.y + activeStar.r + 12,
                                }}
                            >
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="font-medium">{axes[active.axis].label}</span>
                                    <span className="font-serif italic opacity-60">{activeStar.bayer} {profiles[active.profile].label}</span>
                                </div>
                                <div className="mt-1 flex items-baseline gap-1 font-mono tabular-nums">
                                    <span className="text-base font-semibold">{activeStar.value}</span>
                                    <span className="opacity-50">/ {max}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p aria-live="polite" className="sr-only">
                    {activeStar && active ? `${profiles[active.profile].label}, ${axes[active.axis].label}: ${activeStar.value} of ${max}.` : ""}
                </p>
            </div>

            <div aria-hidden="true" className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2">
                    <svg width={22} height={6}><line x1={1} x2={21} y1={3} y2={3} strokeWidth={1} className="stroke-[#1b2330] dark:stroke-[#c9d8ff]"/></svg>
                    {profiles[0].label}
                </span>
                {compare && profiles[1] && (
                    <span className="flex items-center gap-2 text-[#b4442c] dark:text-[#ffd79c]">
                        <svg width={22} height={6}><line x1={1} x2={21} y1={3} y2={3} strokeWidth={1} strokeDasharray="3 3" stroke="currentColor"/></svg>
                        {profiles[1].label}
                    </span>
                )}
            </div>

            <table className="sr-only">
                <caption>{summary}</caption>
                <thead>
                    <tr><th scope="col">Attribute</th>{profiles.map((profile) => <th key={profile.id} scope="col">{profile.label}</th>)}</tr>
                </thead>
                <tbody>
                    {axes.map((axis, i) => (
                        <tr key={axis.id}>
                            <th scope="row">{axis.label}</th>
                            {profiles.map((profile) => <td key={profile.id}>{profile.values[i]}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </figure>
    );
};
