import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface KineticWeightHeroProps {
    eyebrow: string;
    /** One string per line. Every letter reacts to the pointer on its own. */
    headline: string[];
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    /** Lightest and heaviest weight of the font's wght axis. Geist covers 300 to 800. */
    weightRange?: [number, number];
    /** Radius of the lens as a multiple of the headline's font size. */
    lensSize?: number;
    /** A variable font with a wght axis. Defaults to Geist, which the page already loads. */
    fontFamily?: string;
    /** Small print in the top right corner, e.g. glyph count and licence. */
    meta?: ReactNode;
    /** Label shown in the specimen bar beside the live weight. */
    specimenLabel?: string;
    className?: string;
}

const useFinePointer = () => {
    const [fine, setFine] = useState(true);
    useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setFine(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);
    return fine;
};

const ActionLink = ({action, className, children}: {action: HeroAction; className: string; children?: ReactNode}) =>
    action.href ? (
        <a href={action.href} onClick={action.onClick} className={className}>
            {action.label}
            {children}
        </a>
    ) : (
        <button type="button" onClick={action.onClick} className={className}>
            {action.label}
            {children}
        </button>
    );

// Geist's vertical metrics as a share of the em, used to draw the specimen guide lines.
const CAP_HEIGHT = 0.7;
const X_HEIGHT = 0.52;

interface Guide {
    top: number;
    label: string;
}

/**
 * A type-specimen hero. Each letter of the headline swells along the wght axis by its distance
 * to the pointer, like a lens dragged through the type. Touch screens get a slow wave instead,
 * and the lens can be walked across the headline with the arrow keys.
 */
export const KineticWeightHero = ({
    eyebrow,
    headline,
    description,
    primaryAction,
    secondaryAction,
    weightRange = [300, 800],
    lensSize = 0.95,
    fontFamily = "\"Geist\", \"Inter\", ui-sans-serif, system-ui, sans-serif",
    meta,
    specimenLabel = "wght",
    className = "",
}: KineticWeightHeroProps) => {
    const rootRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const baselineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const hairlineRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLSpanElement>(null);
    const readoutRef = useRef<HTMLSpanElement>(null);
    const thumbRef = useRef<HTMLSpanElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion() ?? false;
    const fine = useFinePointer();

    const [fontSize, setFontSize] = useState(96);
    // Layout follows the hero's own width, not the viewport, so it holds up in narrow frames too.
    const [wide, setWide] = useState(true);
    const [guides, setGuides] = useState<Guide[]>([]);
    const [lensPosition, setLensPosition] = useState(50);

    // Per-frame values live here so the loop never re-renders React.
    const sim = useRef({
        centers: [] as {x: number; y: number}[],
        weights: [] as number[],
        stage: {left: 0, top: 0, width: 1, height: 1},
        pointer: {x: 0, y: 0, tx: 0, ty: 0},
        hovering: false,
        keyboard: false,
        strength: 0,
    });

    const [minWeight, maxWeight] = weightRange;
    const longest = Math.max(...headline.map((line) => line.length));

    // Size the type to the container, not the viewport, so it fills whatever frame it sits in.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const update = () => {
            const width = root.clientWidth;
            setWide(width >= 600);
            const gutter = width < 600 ? 80 : 150;
            setFontSize(Math.max(44, Math.min(176, (width - gutter) / (longest * 0.52))));
        };
        // Measure once up front so the first paint already has the right layout.
        update();
        const observer = new ResizeObserver(update);
        observer.observe(root);
        return () => observer.disconnect();
    }, [longest]);

    // Letter centres are measured at rest and reused every frame, so the loop only writes styles.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const measure = () => {
            const box = stage.getBoundingClientRect();
            sim.current.stage = {left: box.left, top: box.top, width: box.width, height: box.height};
            sim.current.centers = letterRefs.current.map((letter) => {
                if (!letter) return {x: 0, y: 0};
                const rect = letter.getBoundingClientRect();
                return {x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top};
            });
            setGuides(
                baselineRefs.current.flatMap((marker, index) => {
                    if (!marker) return [];
                    const baseline = marker.getBoundingClientRect().top - box.top;
                    return [
                        {top: baseline - fontSize * CAP_HEIGHT, label: index === 0 ? "cap" : ""},
                        {top: baseline - fontSize * X_HEIGHT, label: index === 0 ? "x-height" : ""},
                        {top: baseline, label: index === 0 ? "baseline" : ""},
                    ];
                }),
            );
        };
        measure();
        document.fonts?.ready.then(measure);
        const observer = new ResizeObserver(measure);
        observer.observe(stage);
        return () => observer.disconnect();
    }, [fontSize, headline]);

    // Keyboard lens: park the pointer target on the chosen spot across the headline.
    useEffect(() => {
        const {stage, pointer} = sim.current;
        pointer.tx = (lensPosition / 100) * stage.width;
        pointer.ty = stage.height / 2;
    }, [lensPosition]);

    useEffect(() => {
        if (!inView) return;
        const state = sim.current;
        const range = maxWeight - minWeight;

        const paint = (now: number) => {
            const letters = letterRefs.current;
            const smoothing = reduceMotion ? 1 : 0.2;
            const sigma = fontSize * lensSize;
            const lensActive = state.hovering || state.keyboard;
            state.strength += ((lensActive ? 1 : 0) - state.strength) * (reduceMotion ? 1 : 0.08);
            state.pointer.x += (state.pointer.tx - state.pointer.x) * (reduceMotion ? 1 : 0.16);
            state.pointer.y += (state.pointer.ty - state.pointer.y) * (reduceMotion ? 1 : 0.16);

            // Without a mouse the wave does all the work; with one it only idles softly to invite a hover.
            const ambient = reduceMotion ? 0 : fine ? 0.4 : 1;
            letters.forEach((letter, index) => {
                if (!letter) return;
                if (state.weights[index] === undefined) state.weights[index] = minWeight;
                const center = state.centers[index] ?? {x: 0, y: 0};
                const dx = center.x - state.pointer.x;
                const dy = (center.y - state.pointer.y) * 1.4;
                const lens = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
                const phase = now * 0.0011 - center.x / (fontSize * 1.6) - center.y / (fontSize * 3);
                const wave = Math.pow(0.5 + 0.5 * Math.sin(phase), 3);
                const influence = state.strength * lens + (1 - state.strength) * ambient * wave;
                const target = minWeight + range * influence;
                const current = state.weights[index] + (target - state.weights[index]) * smoothing;
                // Skip writes that would not change a pixel; settled letters cost nothing.
                if (Math.abs(current - state.weights[index]) < 0.2 && letter.style.transform) return;
                state.weights[index] = current;
                letter.style.fontVariationSettings = `"wght" ${current.toFixed(1)}`;
                letter.style.fontWeight = current.toFixed(0);
                // Geist has no optical size axis, so a hair of vertical scale stands in for it.
                letter.style.transform = `scale(${(1 + 0.035 * influence).toFixed(4)}, ${(1 + 0.06 * influence).toFixed(4)})`;
            });
            const peak = Math.max(minWeight, ...state.weights);

            const {x, y} = state.pointer;
            if (hairlineRef.current) {
                hairlineRef.current.style.transform = `translateX(${x.toFixed(1)}px)`;
                hairlineRef.current.style.opacity = String(state.strength);
            }
            if (chipRef.current) {
                chipRef.current.style.transform = `translate(${(x + 14).toFixed(1)}px, ${(y - 34).toFixed(1)}px)`;
                chipRef.current.style.opacity = String(state.strength);
                chipRef.current.textContent = `wght ${Math.round(peak)}`;
            }
            if (readoutRef.current) readoutRef.current.textContent = String(Math.round(peak));
            if (thumbRef.current && state.stage.width > 0) {
                const share = Math.min(1, Math.max(0, x / state.stage.width));
                thumbRef.current.style.left = `${(share * 100).toFixed(2)}%`;
            }
        };

        let frame = 0;
        const tick = (now: number) => {
            paint(now);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, fine, fontSize, lensSize, minWeight, maxWeight]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== "mouse") return;
        const stage = stageRef.current;
        if (!stage) return;
        const box = stage.getBoundingClientRect();
        const state = sim.current;
        state.pointer.tx = event.clientX - box.left;
        state.pointer.ty = event.clientY - box.top;
        if (!state.hovering) {
            // Start the lens where the pointer entered instead of sliding in from the last spot.
            state.pointer.x = state.pointer.tx;
            state.pointer.y = state.pointer.ty;
            state.hovering = true;
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 20 : 5;
        const next = {ArrowLeft: lensPosition - step, ArrowDown: lensPosition - step, ArrowRight: lensPosition + step, ArrowUp: lensPosition + step, Home: 0, End: 100}[event.key];
        if (next === undefined) return;
        event.preventDefault();
        setLensPosition(Math.min(100, Math.max(0, next)));
    };

    const handleTrackPointer = (event: PointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!track) return;
        const box = track.getBoundingClientRect();
        setLensPosition(Math.round(Math.min(1, Math.max(0, (event.clientX - box.left) / box.width)) * 100));
    };

    let letterIndex = 0;
    const letterCount = headline.reduce((total, line) => total + line.length, 0);
    letterRefs.current.length = letterCount;
    sim.current.weights.length = Math.min(sim.current.weights.length, letterCount);

    return (
        <section
            ref={rootRef}
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={() => (sim.current.hovering = false)}
            className={`relative isolate flex min-h-[600px] w-full flex-col overflow-hidden bg-[#f3f1ec] text-stone-900 dark:bg-[#0d0d0c] ${wide ? "px-12 pb-10 pt-8" : "px-5 pb-8 pt-6"} dark:text-stone-100 ${className}`}
        >
            {/* Paper grain. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
                style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}
            />

            <header className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"/>
                    {eyebrow}
                </span>
                {meta && wide && <span className="text-right">{meta}</span>}
            </header>

            <div ref={stageRef} className="relative my-auto py-6" style={{fontFamily}}>
                {guides.map((guide, index) => (
                    <div key={index} aria-hidden="true" className="pointer-events-none absolute -left-12 -right-12 h-px bg-stone-900/[0.07] dark:bg-white/[0.07]" style={{top: guide.top}}>
                        {guide.label && (
                            <span className="absolute right-12 top-0 -translate-y-full pb-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500" style={{fontFamily: "ui-monospace, monospace"}}>
                                {guide.label}
                            </span>
                        )}
                    </div>
                ))}

                <div ref={hairlineRef} aria-hidden="true" className="pointer-events-none absolute -bottom-2 -top-2 left-0 w-px bg-red-600/60 opacity-0 dark:bg-red-400/60"/>
                <span
                    ref={chipRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap rounded-sm bg-stone-900 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-stone-50 opacity-0 dark:bg-stone-100 dark:text-stone-900"
                />

                <h1 className="relative leading-[0.92] tracking-[-0.035em]" style={{fontSize}}>
                    <span className="sr-only">{headline.join(" ")}</span>
                    {headline.map((line, lineIndex) => (
                        <span key={lineIndex} aria-hidden="true" className="block whitespace-nowrap">
                            {Array.from(line).map((character, characterIndex) => {
                                const index = letterIndex++;
                                return (
                                    <span
                                        key={characterIndex}
                                        ref={(element) => {
                                            letterRefs.current[index] = element;
                                        }}
                                        className="inline-block origin-bottom will-change-transform"
                                        style={{fontWeight: minWeight, fontVariationSettings: `"wght" ${minWeight}`}}
                                    >
                                        {character === " " ? " " : character}
                                    </span>
                                );
                            })}
                            <span
                                ref={(element) => {
                                    baselineRefs.current[lineIndex] = element;
                                }}
                                className="inline-block h-0 w-0 align-baseline"
                            />
                        </span>
                    ))}
                </h1>
            </div>

            <div className={`grid ${wide ? "grid-cols-[minmax(0,1fr)_minmax(0,17rem)] items-end gap-12" : "gap-8"}`}>
                <div className="max-w-md">
                    <p className="text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">{description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <ActionLink
                            action={primaryAction}
                            className="group inline-flex h-11 items-center gap-2 rounded-full bg-stone-900 pl-5 pr-4 text-sm font-medium text-stone-50 transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f1ec] dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-red-400 dark:focus-visible:ring-red-400 dark:focus-visible:ring-offset-[#0d0d0c]"
                        >
                            <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"/>
                        </ActionLink>
                        {secondaryAction && (
                            <ActionLink
                                action={secondaryAction}
                                className="inline-flex h-11 items-center rounded-full px-4 text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-300 dark:decoration-stone-600 dark:hover:decoration-stone-100 dark:focus-visible:ring-stone-100"
                            />
                        )}
                    </div>
                </div>

                {/* The specimen bar: live weight readout plus a keyboard-drivable lens position. */}
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                    <div className="mb-2 flex items-baseline justify-between">
                        <span>{specimenLabel}</span>
                        <span className="text-stone-900 dark:text-stone-100">
                            <span ref={readoutRef} className="tabular-nums">{minWeight}</span>
                            <span className="text-stone-400 dark:text-stone-500"> / {minWeight}–{maxWeight}</span>
                        </span>
                    </div>
                    <div
                        ref={trackRef}
                        role="slider"
                        tabIndex={0}
                        aria-label="Weight lens position across the headline"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={lensPosition}
                        aria-valuetext={`${lensPosition}% across`}
                        onKeyDown={handleKeyDown}
                        onFocus={() => (sim.current.keyboard = true)}
                        onBlur={() => (sim.current.keyboard = false)}
                        onPointerDown={handleTrackPointer}
                        className="relative h-7 cursor-ew-resize rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3f1ec] dark:focus-visible:ring-red-400 dark:focus-visible:ring-offset-[#0d0d0c]"
                    >
                        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-stone-300 dark:bg-stone-700"/>
                        {Array.from({length: 11}, (_, index) => (
                            <span
                                key={index}
                                aria-hidden="true"
                                className={`absolute top-1/2 w-px -translate-y-1/2 bg-stone-300 dark:bg-stone-700 ${index % 5 === 0 ? "h-3" : "h-1.5"}`}
                                style={{left: `${index * 10}%`}}
                            />
                        ))}
                        <span ref={thumbRef} aria-hidden="true" className="absolute top-1/2 h-5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 dark:bg-red-400" style={{left: "50%"}}/>
                    </div>
                    <p className="mt-2 normal-case tracking-normal text-stone-400 dark:text-stone-500">
                        {fine ? "Move through the type, or focus the bar and use arrow keys." : "Tap the bar to place the lens."}
                    </p>
                </div>
            </div>
        </section>
    );
};
