import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuCheck, LuCopy} from "react-icons/lu";

export type Harmony = "complementary" | "analogous" | "triadic" | "split";

/** One color of the palette, in the order it is shown. */
export interface HarmonyColor {
    role: string;
    /** Hue in degrees, 0–359. */
    hue: number;
    /** HSL lightness, 30–92. */
    lightness: number;
    hex: string;
}

export interface HarmonyWheelProps {
    /** Hue of the base color in degrees. */
    defaultHue?: number;
    /** HSL lightness of every color, from 30 (rim) to 92 (center). */
    defaultLightness?: number;
    defaultHarmony?: Harmony;
    /** HSL saturation shared by the wheel and every color. */
    saturation?: number;
    onChange?: (colors: HarmonyColor[]) => void;
    className?: string;
}

const HARMONIES: Record<Harmony, {label: string; role: string; offsets: number[]}> = {
    complementary: {label: "Complement", role: "Complement", offsets: [180]},
    analogous: {label: "Analogous", role: "Analog", offsets: [-30, 30]},
    triadic: {label: "Triad", role: "Triad", offsets: [120, -120]},
    split: {label: "Split", role: "Split", offsets: [150, -150]},
};
const HARMONY_KEYS = Object.keys(HARMONIES) as Harmony[];

const RAD = Math.PI / 180;
const wrap = (deg: number) => ((deg % 360) + 360) % 360;
const shortest = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180;

// The wheel paints white over the inner half and black over the outer half. Mixing an HSL color with
// white or black keeps its hue and saturation and moves lightness linearly, so these two lines are exact.
const lightnessAt = (r: number) => (r < 0.5 ? 92 - 84 * r : 70 - 40 * r);
const radiusFor = (l: number) => (l >= 50 ? (92 - l) / 84 : (70 - l) / 40);

const toHex = (h: number, s: number, l: number) => {
    const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
    const channel = (n: number) => {
        const k = (n + h / 30) % 12;
        const c = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(c * 255).toString(16).padStart(2, "0");
    };
    return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

const polar = (deg: number, r: number) => ({x: 50 + 50 * r * Math.sin(deg * RAD), y: 50 - 50 * r * Math.cos(deg * RAD)});

interface LinkedHandleProps {
    angle: number;
    from: number;
    radius: number;
    saturation: number;
    still: boolean;
    offset: number;
    label: string;
}

// A linked handle chases its target angle on a spring, so it travels around the wheel instead of cutting
// across it, and trails the base handle slightly while dragging.
const LinkedHandle = ({angle, from, radius, saturation, still, offset, label}: LinkedHandleProps) => {
    const a = useSpring(from, {stiffness: 190, damping: 21});
    const r = useSpring(radius, {stiffness: 260, damping: 26});
    useEffect(() => {
        if (still) {
            a.jump(angle);
            r.jump(radius);
        } else {
            a.set(angle);
            r.set(radius);
        }
    }, [a, r, angle, radius, still]);

    const left = useTransform([a, r], ([deg, rr]: number[]) => `${polar(deg, rr).x}%`);
    const top = useTransform([a, r], ([deg, rr]: number[]) => `${polar(deg, rr).y}%`);
    const x2 = useTransform([a, r], ([deg, rr]: number[]) => polar(deg, rr).x);
    const y2 = useTransform([a, r], ([deg, rr]: number[]) => polar(deg, rr).y);
    const fill = useTransform([a, r], ([deg, rr]: number[]) => `hsl(${wrap(deg)} ${saturation}% ${lightnessAt(rr)}%)`);

    return (
        <>
            <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <motion.line x1="50" y1="50" x2={x2} y2={y2} stroke="white" strokeOpacity="0.7" strokeWidth="0.5" strokeDasharray="1.2 1.2"/>
            </svg>
            <motion.span
                data-offset={offset}
                aria-hidden="true"
                title={label}
                initial={{scale: 0}}
                animate={{scale: 1}}
                exit={{scale: 0}}
                transition={{type: "spring", stiffness: 420, damping: 24}}
                className="absolute z-10 -ml-2.5 -mt-2.5 h-5 w-5 cursor-grab rounded-full border-[2.5px] border-white shadow-[0_1px_3px_rgba(0,0,0,0.35)] active:cursor-grabbing"
                style={{left, top, backgroundColor: fill}}
            />
        </>
    );
};

const CopyButton = ({hex}: {hex: string}) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!copied) return;
        const id = window.setTimeout(() => setCopied(false), 1400);
        return () => window.clearTimeout(id);
    }, [copied]);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? `Copied ${hex}` : `Copy ${hex}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/20 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus-visible:ring-white/25"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{scale: 0.6, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.6, opacity: 0}}
                    transition={{duration: 0.14}}
                >
                    {copied ? <LuCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400"/> : <LuCopy className="h-4 w-4"/>}
                </motion.span>
            </AnimatePresence>
        </button>
    );
};

/**
 * A color wheel for building a small palette. Drag the base handle for hue (angle) and lightness (distance
 * from the rim); the linked handles follow the chosen harmony. Arrow keys rotate the hue.
 */
export const HarmonyWheel = ({
    defaultHue = 162,
    defaultLightness = 42,
    defaultHarmony = "complementary",
    saturation = 62,
    onChange,
    className = "",
}: HarmonyWheelProps) => {
    const uid = useId().replace(/:/g, "");
    const still = useReducedMotion() ?? false;
    // Hue is kept unwrapped (it can pass 360 or go below 0) so springs always take the short way round.
    const [hue, setHue] = useState(defaultHue);
    const [radius, setRadius] = useState(radiusFor(defaultLightness));
    const [harmony, setHarmony] = useState<Harmony>(defaultHarmony);
    const [offsets, setOffsets] = useState(HARMONIES[defaultHarmony].offsets);
    const wheelRef = useRef<HTMLDivElement>(null);
    const drag = useRef<{offset: number} | null>(null);
    const hueRef = useRef(hue);
    hueRef.current = hue;

    const lightness = Math.round(lightnessAt(radius));
    const role = HARMONIES[harmony].role;
    const colors: HarmonyColor[] = [0, ...offsets].map((offset, index) => {
        const h = Math.round(wrap(hue + offset));
        const sign = shortest(0, offset) > 0 ? "+" : "−";
        return {
            role: index === 0 ? "Base" : `${role} ${sign}${Math.abs(Math.round(shortest(0, offset)))}°`,
            hue: h,
            lightness,
            hex: toHex(h, saturation, lightness),
        };
    });
    const signature = colors.map((color) => color.hex).join();

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;
    useEffect(() => {
        onChangeRef.current?.(colors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signature]);

    const chooseHarmony = (next: Harmony) => {
        setHarmony(next);
        // Each linked handle leaves from where it already is (or from its sibling) and takes the shortest arc.
        setOffsets((previous) =>
            HARMONIES[next].offsets.map((target, index) => {
                const start = previous[index] ?? previous[previous.length - 1] ?? 0;
                return start + shortest(start, target);
            }),
        );
    };

    const fromPointer = (clientX: number, clientY: number) => {
        const rect = wheelRef.current?.getBoundingClientRect();
        if (!rect || !drag.current) return;
        const dx = clientX - (rect.left + rect.width / 2);
        const dy = clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(dx, -dy) / RAD;
        const target = angle - drag.current.offset;
        setHue(hueRef.current + shortest(hueRef.current, target));
        setRadius(Math.min(1, Math.max(0.06, Math.hypot(dx, dy) / (rect.width / 2))));
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        event.preventDefault();
        const linked = (event.target as HTMLElement).closest<HTMLElement>("[data-offset]");
        drag.current = {offset: linked ? Number(linked.dataset.offset) : 0};
        event.currentTarget.setPointerCapture(event.pointerId);
        fromPointer(event.clientX, event.clientY);
    };

    const handleHueKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 15 : 1;
        const delta: Record<string, number> = {ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: 30, PageDown: -30};
        if (event.key in delta) {
            event.preventDefault();
            setHue((h) => h + delta[event.key]);
        }
    };

    const handleHarmonyKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const move = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
        if (!move) return;
        event.preventDefault();
        const next = HARMONY_KEYS[(HARMONY_KEYS.indexOf(harmony) + move + HARMONY_KEYS.length) % HARMONY_KEYS.length];
        chooseHarmony(next);
        event.currentTarget.querySelector<HTMLElement>(`[data-harmony="${next}"]`)?.focus();
    };

    const conic = Array.from({length: 13}, (_, i) => `hsl(${i * 30} ${saturation}% 50%) ${i * 30}deg`).join(", ");
    const base = polar(hue, radius);

    return (
        <div className={`grid w-full max-w-2xl items-center gap-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-[minmax(0,260px)_1fr] sm:p-8 ${className}`}>
            <div className="relative mx-auto aspect-square w-full max-w-[260px] p-4">
                {/* A protractor rim: a hairline every 15°, labels at the quarters. */}
                <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full text-stone-400 dark:text-stone-600">
                    {Array.from({length: 24}, (_, i) => {
                        const deg = i * 15;
                        const outer = polar(deg, 1);
                        const inner = polar(deg, i % 6 === 0 ? 0.955 : 0.97);
                        return <line key={deg} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} stroke="currentColor" strokeWidth={i % 6 === 0 ? 0.5 : 0.3}/>;
                    })}
                </svg>
                <div
                    ref={wheelRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={(event) => drag.current && fromPointer(event.clientX, event.clientY)}
                    onPointerUp={() => (drag.current = null)}
                    onPointerCancel={() => (drag.current = null)}
                    className="relative h-full w-full cursor-crosshair touch-none select-none rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.08),0_18px_40px_-18px_rgba(0,0,0,0.45)]"
                    style={{background: `radial-gradient(closest-side, rgba(255,255,255,0.84), rgba(255,255,255,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4)), conic-gradient(${conic})`}}
                >
                    <svg viewBox="0 0 100 100" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                        <circle cx="50" cy="50" r={50 * radius} fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="0.35"/>
                        <line x1="50" y1="50" x2={base.x} y2={base.y} stroke="white" strokeWidth="0.6"/>
                        <circle cx="50" cy="50" r="1.1" fill="white"/>
                    </svg>

                    <AnimatePresence>
                        {offsets.map((offset, index) => (
                            <LinkedHandle
                                key={index}
                                angle={hue + offset}
                                from={hue + (offsets[index - 1] ?? 0)}
                                radius={radius}
                                saturation={saturation}
                                still={still}
                                offset={offset}
                                label={colors[index + 1].role}
                            />
                        ))}
                    </AnimatePresence>

                    <div
                        role="slider"
                        tabIndex={0}
                        data-offset={0}
                        aria-label="Base hue"
                        aria-valuemin={0}
                        aria-valuemax={359}
                        aria-valuenow={colors[0].hue}
                        aria-valuetext={`${colors[0].hue} degrees, ${colors[0].hex}`}
                        onKeyDown={handleHueKey}
                        className="absolute z-20 -ml-4 -mt-4 h-8 w-8 cursor-grab rounded-full border-[3px] border-white shadow-[0_2px_6px_rgba(0,0,0,0.35),inset_0_0_0_1px_rgba(0,0,0,0.12)] outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-white active:cursor-grabbing"
                        style={{left: `${base.x}%`, top: `${base.y}%`, backgroundColor: colors[0].hex}}
                    />
                </div>
            </div>

            <div className="min-w-0">
                <div
                    role="radiogroup"
                    aria-label="Harmony"
                    onKeyDown={handleHarmonyKey}
                    className="grid grid-cols-4 rounded-xl bg-stone-200/70 p-1 dark:bg-stone-800/70"
                >
                    {HARMONY_KEYS.map((key) => {
                        const active = key === harmony;
                        return (
                            <button
                                key={key}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                tabIndex={active ? 0 : -1}
                                data-harmony={key}
                                onClick={() => chooseHarmony(key)}
                                className={`relative rounded-lg px-1 py-1.5 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-white/30 ${active ? "text-stone-900 dark:text-white" : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"}`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId={`${uid}-pill`}
                                        transition={{type: "spring", stiffness: 480, damping: 36}}
                                        className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] dark:bg-stone-700"
                                    />
                                )}
                                <span className="relative">{HARMONIES[key].label}</span>
                            </button>
                        );
                    })}
                </div>

                <ul className="mt-5 divide-y divide-stone-200 dark:divide-stone-800">
                    <AnimatePresence initial={false}>
                        {colors.map((color, index) => (
                            <motion.li
                                key={index}
                                layout="position"
                                initial={{opacity: 0, y: -6}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.2}}
                                className="flex items-center gap-3 py-2.5"
                            >
                                <span
                                    className="h-9 w-9 shrink-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-colors duration-150 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                                    style={{backgroundColor: color.hex}}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium text-stone-900 dark:text-stone-100">{color.role}</span>
                                    <span className="block font-mono text-[11px] tabular-nums text-stone-500 dark:text-stone-400">
                                        hsl({color.hue} {saturation}% {color.lightness}%)
                                    </span>
                                </span>
                                <span className="font-mono text-[13px] tabular-nums tracking-wide text-stone-700 dark:text-stone-300">{color.hex}</span>
                                <CopyButton hex={color.hex}/>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                <label className="mt-4 block">
                    <span className="flex justify-between text-[11px] font-medium uppercase tracking-[0.08em] text-stone-500 dark:text-stone-400">
                        Lightness
                        <span className="font-mono tabular-nums normal-case tracking-normal">{lightness}%</span>
                    </span>
                    <input
                        type="range"
                        min={30}
                        max={92}
                        value={lightness}
                        onChange={(event) => setRadius(radiusFor(Number(event.target.value)))}
                        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/25 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-white/30 dark:focus-visible:ring-offset-stone-950 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-stone-900 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-stone-900 [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                        style={{background: `linear-gradient(to right, hsl(${colors[0].hue} ${saturation}% 30%), hsl(${colors[0].hue} ${saturation}% 60%), hsl(${colors[0].hue} ${saturation}% 92%))`}}
                    />
                </label>
            </div>
        </div>
    );
};
