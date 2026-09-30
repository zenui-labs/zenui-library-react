import {useEffect, useRef, useState} from "react";
import type {ChangeEvent, CSSProperties, PointerEvent, ReactNode} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface EclipseDetail {
    value: string;
    label: string;
}

export interface EclipseHeroProps {
    eyebrow: string;
    /** Stays faint until the moon fully covers the sun, then fades in. */
    headline: ReactNode;
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    details?: EclipseDetail[];
    /** Label of the scrubber that plays the eclipse for touch and keyboard users. */
    scrubberLabel?: string;
    className?: string;
}

interface Scene {
    width: number;
    height: number;
    wide: boolean;
    sunX: number;
    sunY: number;
    radius: number;
}

const measureScene = (width: number, height: number): Scene => {
    const wide = width >= 760;
    return wide
        ? {width, height, wide, sunX: width * 0.72, sunY: height * 0.42, radius: Math.max(56, Math.min(96, width * 0.085))}
        : {width, height, wide, sunX: width / 2, sunY: 124, radius: 54};
};

const MOON_SCALE = 1.045;
/** The moon travels along this slant, lower left to upper right, like a real track across the sun. */
const PATH = {x: 0.944, y: -0.33};
const PATH_CURVE = 1.4;
const AUTO_SECONDS = 19;

const smoothstep = (edge0: number, edge1: number, value: number) => {
    const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
};

// Share of the sun's disc hidden by the moon: the lens-shaped overlap of two circles.
const coverage = (sun: number, moon: number, distance: number) => {
    if (distance >= sun + moon) return 0;
    if (distance <= moon - sun) return 1;
    const a = sun * sun * Math.acos((distance * distance + sun * sun - moon * moon) / (2 * distance * sun));
    const b = moon * moon * Math.acos((distance * distance + moon * moon - sun * sun) / (2 * distance * moon));
    const c = 0.5 * Math.sqrt((-distance + sun + moon) * (distance + sun - moon) * (distance - sun + moon) * (distance + sun + moon));
    return (a + b - c) / (Math.PI * sun * sun);
};

// Slider value (-1 to 1) to distance along the path. The curve gives totality more room on the track.
const pathOffset = (t: number, span: number) => Math.sign(t) * Math.pow(Math.abs(t), PATH_CURVE) * span;
const pathValue = (offset: number, span: number) => Math.sign(offset) * Math.pow(Math.min(1, Math.abs(offset) / span), 1 / PATH_CURVE);

const ActionLink = ({action, className, style, children}: {action: HeroAction; className: string; style?: CSSProperties; children?: ReactNode}) =>
    action.href ? (
        <a href={action.href} onClick={action.onClick} className={className} style={style}>
            {action.label}
            {children}
        </a>
    ) : (
        <button type="button" onClick={action.onClick} className={className} style={style}>
            {action.label}
            {children}
        </button>
    );

// Fixed star positions, as fractions of the frame, revealed only near totality.
const stars = [
    [0.08, 0.14, 1.4], [0.18, 0.34, 1], [0.31, 0.09, 1.2], [0.44, 0.22, 0.9], [0.52, 0.06, 1.3], [0.62, 0.18, 1],
    [0.86, 0.12, 1.6], [0.93, 0.3, 1], [0.79, 0.72, 1.1], [0.9, 0.58, 1.3], [0.56, 0.84, 0.9], [0.12, 0.8, 1.2],
];

// Beads sit at these offsets (radians) from the last sliver of sun; lunar valleys let light through there.
const BEAD_ANGLES = [-0.46, -0.27, -0.11, 0.08, 0.22, 0.39];

type Mode = "rest" | "pointer" | "auto" | "slider";

// The daylight sky. The moon paints the same gradient, lined up with the frame, so it vanishes against it.
const SKY = "bg-[linear-gradient(to_bottom,#a9c4d8,#dfe8ee_70%,#eef1ef)] dark:bg-[linear-gradient(to_bottom,#131c2b,#222c3d_70%,#2c3443)]";

/**
 * A solar eclipse hero. The moon follows the pointer with a soft lag; as it covers the sun the sky
 * darkens, Baily's beads and the diamond ring flash at the edge, the corona streams out and the
 * headline comes up fully only at totality. Touch screens play a slow loop and a scrubber
 * (keyboard friendly) controls the eclipse directly.
 */
export const EclipseHero = ({
    eyebrow,
    headline,
    description,
    primaryAction,
    secondaryAction,
    details = [],
    scrubberLabel = "Eclipse progress",
    className = "",
}: EclipseHeroProps) => {
    const rootRef = useRef<HTMLElement>(null);
    const moonRef = useRef<HTMLDivElement>(null);
    const biteRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const coronaRef = useRef<HTMLDivElement>(null);
    const diamondRef = useRef<HTMLDivElement>(null);
    const beadRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const readoutRef = useRef<HTMLSpanElement>(null);
    const phaseRef = useRef<HTMLSpanElement>(null);

    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [scene, setScene] = useState<Scene>(() => measureScene(900, 620));
    const [fine, setFine] = useState(true);

    const sim = useRef({
        mode: "rest" as Mode,
        moon: {x: 0, y: 0},
        target: {x: 0, y: 0},
        pathT: -0.8,
        autoClock: 0,
        totality: 0,
        placed: false,
        lastPercent: -1,
        lastPhase: "",
    });

    useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setFine(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const update = () => setScene(measureScene(root.clientWidth, root.clientHeight));
        update();
        const observer = new ResizeObserver(update);
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    // Touch screens get the slow automatic eclipse; reduced motion parks the moon at totality.
    useEffect(() => {
        const state = sim.current;
        if (reduceMotion) state.mode = "rest";
        else if (!fine) state.mode = "auto";
    }, [fine, reduceMotion]);

    const {sunX, sunY, radius} = scene;
    const moonRadius = radius * MOON_SCALE;
    const span = (radius + moonRadius) * 1.3;

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !inView) return;
        const state = sim.current;
        const pathPoint = (t: number) => {
            const offset = pathOffset(t, span);
            return {x: sunX + PATH.x * offset, y: sunY + PATH.y * offset};
        };

        // The first time the scene has a size, start the moon partway in and let it glide to totality.
        if (!state.placed) {
            const start = pathPoint(reduceMotion ? 0 : -0.62);
            state.moon = {...start};
            state.placed = true;
        }

        let frame = 0;
        let previous = performance.now();

        const tick = (now: number) => {
            const seconds = Math.min(0.05, (now - previous) / 1000);
            previous = now;

            if (state.mode === "auto") {
                // Ingress, a long hold at totality, egress, and a beat of daylight before it loops.
                state.autoClock = (state.autoClock + seconds) % AUTO_SECONDS;
                const clock = state.autoClock;
                state.pathT = clock < 7 ? -1 + smoothstep(0, 7, clock) : clock < 11 ? 0 : clock < 18 ? smoothstep(11, 18, clock) : 1;
            }
            if (state.mode === "auto" || state.mode === "slider") state.target = pathPoint(state.pathT);
            else if (state.mode === "rest") state.target = {x: sunX, y: sunY};

            const follow = reduceMotion ? 1 : state.mode === "pointer" ? 0.085 : state.mode === "rest" ? 0.03 : 0.2;
            state.moon.x += (state.target.x - state.moon.x) * follow;
            state.moon.y += (state.target.y - state.moon.y) * follow;

            const dx = sunX - state.moon.x;
            const dy = sunY - state.moon.y;
            const distance = Math.hypot(dx, dy);
            const covered = coverage(radius, moonRadius, distance);
            const total = distance <= moonRadius - radius;
            state.totality += ((total ? 1 : 0) - state.totality) * (reduceMotion ? 1 : 0.07);
            const totality = state.totality;
            // The sky barely dims until the last few percent; that is what makes totality so sudden.
            const darkness = Math.min(1, 0.86 * Math.pow(covered, 9) + 0.14 * totality);

            // Text flips from ink to paper over a short band of darkness, so it never sits mid-grey on a mid-grey sky.
            root.style.setProperty("--eclipse-mix", `${(smoothstep(0.34, 0.5, darkness) * 100).toFixed(1)}%`);
            root.style.setProperty("--eclipse-dark", darkness.toFixed(3));

            if (moonRef.current) {
                const left = state.moon.x - moonRadius;
                const top = state.moon.y - moonRadius;
                moonRef.current.style.transform = `translate3d(${left.toFixed(2)}px, ${top.toFixed(2)}px, 0)`;
                moonRef.current.style.backgroundPosition = `${(-left).toFixed(2)}px ${(-top).toFixed(2)}px`;
            }
            if (biteRef.current) {
                biteRef.current.style.transform = `translate3d(${(sunX - radius - state.moon.x + moonRadius).toFixed(2)}px, ${(sunY - radius - state.moon.y + moonRadius).toFixed(2)}px, 0)`;
            }
            if (glareRef.current) {
                const glare = Math.pow(1 - covered, 0.55) * (1 - totality);
                glareRef.current.style.opacity = glare.toFixed(3);
            }
            if (coronaRef.current) coronaRef.current.style.opacity = Math.min(1, 0.3 * smoothstep(0.9, 0.995, covered) + 0.8 * totality).toFixed(3);

            // Diamond ring: the last point of the limb still lit, on the far side from the moon's centre.
            const nx = distance > 0.001 ? dx / distance : 1;
            const ny = distance > 0.001 ? dy / distance : 0;
            const ring = smoothstep(0.93, 0.992, covered) * (1 - totality) * (total ? 0 : 1);
            if (diamondRef.current) {
                diamondRef.current.style.opacity = ring.toFixed(3);
                diamondRef.current.style.transform = `translate3d(${(sunX + nx * radius).toFixed(2)}px, ${(sunY + ny * radius).toFixed(2)}px, 0) scale(${(0.6 + 0.6 * ring).toFixed(3)})`;
            }
            const baseAngle = Math.atan2(ny, nx);
            beadRefs.current.forEach((bead, index) => {
                if (!bead) return;
                const angle = baseAngle + BEAD_ANGLES[index];
                const px = sunX + Math.cos(angle) * radius;
                const py = sunY + Math.sin(angle) * radius;
                // A bead shows only where that bit of limb is really uncovered, and shimmers a little.
                const exposed = Math.hypot(px - state.moon.x, py - state.moon.y) - moonRadius;
                const shimmer = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(now * 0.02 + index * 2.1);
                const opacity = smoothstep(-1.5, 1.5, exposed) * smoothstep(0.965, 0.99, covered) * shimmer;
                bead.style.opacity = opacity.toFixed(3);
                bead.style.transform = `translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;
            });

            if (headlineRef.current) {
                const reveal = Math.max(0.35 * smoothstep(0.8, 0.99, covered), totality);
                headlineRef.current.style.opacity = (0.16 + 0.84 * reveal).toFixed(3);
            }

            // Keep the scrubber and readouts in step with the moon, whatever is driving it.
            const percent = Math.round(covered * 1000) / 10;
            if (percent !== state.lastPercent) {
                state.lastPercent = percent;
                if (readoutRef.current) readoutRef.current.textContent = `${percent.toFixed(1)}%`;
                const along = (state.moon.x - sunX) * PATH.x + (state.moon.y - sunY) * PATH.y;
                const slider = sliderRef.current;
                if (slider && state.mode !== "slider") slider.value = String(Math.round(pathValue(along, span) * 100));
                const text = total ? "Totality" : covered <= 0 ? "No eclipse" : `Partial eclipse, ${Math.round(covered * 100)}% of the sun covered`;
                slider?.setAttribute("aria-valuetext", text);
            }
            const phase = total ? "Totality" : covered > 0.93 ? "Diamond ring" : covered > 0 ? "Partial" : "Daylight";
            if (phase !== state.lastPhase && phaseRef.current) {
                state.lastPhase = phase;
                phaseRef.current.textContent = phase;
            }

            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, sunX, sunY, radius, moonRadius, span]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== "mouse") return;
        // Reaching for the scrubber should not drag the moon along with the pointer.
        if (event.target instanceof Element && event.target.closest("[data-eclipse-scrubber]")) return;
        const box = event.currentTarget.getBoundingClientRect();
        sim.current.mode = "pointer";
        sim.current.target = {x: event.clientX - box.left, y: event.clientY - box.top};
    };

    // Letting go returns the moon to totality, so the page rests with the headline readable.
    const handlePointerLeave = () => {
        if (sim.current.mode === "pointer") sim.current.mode = fine || reduceMotion ? "rest" : "auto";
    };

    const handleSlider = (event: ChangeEvent<HTMLInputElement>) => {
        sim.current.mode = "slider";
        sim.current.pathT = Number(event.target.value) / 100;
    };

    // Contact points on the scrubber: first and last contact, and the edges of totality.
    const contact = (distance: number) => pathValue(distance, span);
    const outer = contact(radius + moonRadius);
    const inner = contact(moonRadius - radius);
    const marks = [
        {label: "C1", at: -outer},
        {label: "Max", at: 0},
        {label: "C4", at: outer},
    ];

    const ink = "color-mix(in srgb, #f3efe6 var(--eclipse-mix, 0%), var(--eclipse-ink-day))";
    const paper = "color-mix(in srgb, #05070c var(--eclipse-mix, 0%), var(--eclipse-paper-day))";
    const coronaSize = radius * 6.4;

    const streamers = (seed: number) => {
        const stops: string[] = [];
        let angle = 0;
        let index = 0;
        while (angle < 360) {
            const width = 4 + ((Math.sin(seed * 13.1 + index * 7.3) + 1) / 2) * 16;
            const strength = 0.25 + ((Math.sin(seed * 5.7 + index * 3.1) + 1) / 2) * 0.6;
            stops.push(`rgba(236, 241, 255, 0) ${angle.toFixed(1)}deg`, `rgba(236, 241, 255, ${strength.toFixed(2)}) ${(angle + width / 2).toFixed(1)}deg`, `rgba(236, 241, 255, 0) ${(angle + width).toFixed(1)}deg`);
            angle += width + 3 + ((Math.sin(seed * 2.3 + index * 11.9) + 1) / 2) * 14;
            index++;
        }
        return `conic-gradient(from ${seed * 40}deg, ${stops.join(", ")}, rgba(236, 241, 255, 0) 360deg)`;
    };

    const coronaMask = "radial-gradient(circle closest-side, transparent 0 29%, #000 32%, rgba(0,0,0,0.55) 50%, transparent 92%)";
    const scrubber = (
        <div data-eclipse-scrubber="" className={scene.wide ? "absolute bottom-7 right-8 z-10 w-[min(340px,36%)]" : "relative mt-9"}>
            <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]" style={{color: ink}}>
                <span ref={phaseRef} className="opacity-70">Partial</span>
                <span>
                    <span className="opacity-60">Obscured </span>
                    <span ref={readoutRef} className="tabular-nums">0.0%</span>
                </span>
            </div>
            <input
                ref={sliderRef}
                type="range"
                min={-100}
                max={100}
                step={1}
                defaultValue={reduceMotion ? 0 : -62}
                aria-label={scrubberLabel}
                onChange={handleSlider}
                className="eclipse-hero-range block h-6 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
                style={{color: ink}}
            />
            {/* Totality (second to third contact) marked on the track. */}
            <div aria-hidden="true" className="relative -mt-[13px] mb-[12px] h-[3px]">
                <span className="absolute h-full rounded-full bg-amber-400" style={{left: `${((1 - inner) / 2) * 100}%`, right: `${((1 - inner) / 2) * 100}%`}}/>
            </div>
            <div aria-hidden="true" className="relative mt-1 h-3 font-mono text-[9px] tracking-[0.12em]" style={{color: ink}}>
                {marks.map((mark) => (
                    <span key={mark.label} className="absolute -translate-x-1/2 opacity-55" style={{left: `${((mark.at + 1) / 2) * 100}%`}}>
                        {mark.label}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <section
            ref={rootRef}
            onPointerMove={fine ? handlePointerMove : undefined}
            onPointerLeave={handlePointerLeave}
            className={`relative isolate min-h-[640px] w-full overflow-hidden bg-[#04060b] [--eclipse-ink-day:#0d1522] [--eclipse-paper-day:#f3f6f8] dark:[--eclipse-ink-day:#e4e7ec] dark:[--eclipse-paper-day:#0d131e] ${fine && !reduceMotion ? "cursor-crosshair" : ""} ${className}`}
            style={{"--eclipse-mix": "0%", "--eclipse-dark": "0"} as CSSProperties}
        >
            <style>{`
                @keyframes eclipse-hero-spin { to { transform: rotate(360deg); } }
                .eclipse-hero-range::-webkit-slider-runnable-track { height: 1px; background: currentColor; }
                .eclipse-hero-range::-moz-range-track { height: 1px; background: currentColor; }
                .eclipse-hero-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; margin-top: -6.5px; border-radius: 9999px; background: currentColor; box-shadow: 0 0 0 4px rgba(128,128,128,0.18); }
                .eclipse-hero-range::-moz-range-thumb { width: 14px; height: 14px; border: 0; border-radius: 9999px; background: currentColor; }
                .eclipse-hero-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px rgba(251,191,36,0.6); }
                .eclipse-hero-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 4px rgba(251,191,36,0.6); }
            `}</style>

            {/* Daylight sky over a night sky; the day layer fades out as the moon closes in. */}
            <div
                aria-hidden="true"
                className={`absolute inset-0 -z-10 ${SKY}`}
                style={{opacity: "calc(1 - var(--eclipse-dark))"}}
            />
            {/* At totality the horizon glows all the way round, like a sunset in every direction. */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(to_top,rgba(214,120,56,0.5),rgba(120,70,90,0.18)_45%,transparent)]"
                style={{opacity: "calc(var(--eclipse-dark) * var(--eclipse-dark))"}}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10" style={{opacity: "calc((var(--eclipse-dark) - 0.7) * 3.3)"}}>
                {stars.map(([x, y, size], index) => (
                    <span key={index} className="absolute rounded-full bg-white" style={{left: `${x * 100}%`, top: `${y * 100}%`, width: size * 1.6, height: size * 1.6}}/>
                ))}
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div ref={coronaRef} className="absolute" style={{left: sunX - coronaSize / 2, top: sunY - coronaSize / 2, width: coronaSize, height: coronaSize, opacity: 0}}>
                    <div className="absolute inset-0 rounded-full" style={{background: "radial-gradient(circle closest-side, transparent 0 30%, rgba(240,244,255,0.95) 31.6%, rgba(220,230,255,0.4) 37%, rgba(200,215,255,0.08) 52%, transparent 66%)"}}/>
                    {[0, 1, 2].map((layer) => (
                        <div
                            key={layer}
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: streamers(layer + 1),
                                WebkitMaskImage: coronaMask,
                                maskImage: coronaMask,
                                filter: `blur(${3 + layer * 3}px)`,
                                transform: `scale(${1 + layer * 0.12})`,
                                animation: reduceMotion ? undefined : `eclipse-hero-spin ${140 + layer * 70}s linear infinite ${layer % 2 ? "reverse" : "normal"}`,
                            }}
                        />
                    ))}
                    {/* Prominences: small pink loops on the limb, only visible once the photosphere is gone. */}
                    {[[-0.6, 1], [2.3, 0.8]].map(([angle, size], index) => (
                        <span
                            key={index}
                            className="absolute rounded-full bg-[radial-gradient(circle,rgba(255,110,140,0.9),rgba(255,80,120,0)_70%)]"
                            style={{
                                width: radius * 0.22 * size,
                                height: radius * 0.14 * size,
                                left: coronaSize / 2 + Math.cos(angle) * radius * 1.01 - radius * 0.11 * size,
                                top: coronaSize / 2 + Math.sin(angle) * radius * 1.01 - radius * 0.07 * size,
                                transform: `rotate(${angle}rad)`,
                            }}
                        />
                    ))}
                </div>
                <div
                    className="absolute rounded-full"
                    style={{
                        left: sunX - radius,
                        top: sunY - radius,
                        width: radius * 2,
                        height: radius * 2,
                        // Limb darkening: the sun's edge is cooler and dimmer than its centre.
                        background: "radial-gradient(circle, #fffdf7 0%, #fff7e2 55%, #ffe7b8 86%, #f6c97f 100%)",
                        boxShadow: "0 0 24px 6px rgba(255,244,214,0.7)",
                    }}
                />
                {BEAD_ANGLES.map((_, index) => (
                    <span
                        key={index}
                        ref={(element) => {
                            beadRefs.current[index] = element;
                        }}
                        className="absolute left-0 top-0 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-white opacity-0 shadow-[0_0_6px_3px_rgba(255,250,235,0.9)]"
                    />
                ))}
                {/* The moon wears the sky itself, so it only shows where it bites into the sun. */}
                <div
                    ref={moonRef}
                    className={`absolute left-0 top-0 overflow-hidden rounded-full bg-no-repeat ${SKY}`}
                    style={{width: moonRadius * 2, height: moonRadius * 2, backgroundSize: `${scene.width}px ${scene.height}px`}}
                >
                    {/* A sun-sized shade inside the moon: only the part in front of the sun darkens into a silhouette. */}
                    <div ref={biteRef} className="absolute left-0 top-0 rounded-full bg-[#27313f]/45 dark:bg-black/45" style={{width: radius * 2, height: radius * 2}}/>
                    <div className="absolute inset-0 bg-[#04060b]" style={{opacity: "var(--eclipse-dark)"}}/>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(120,135,160,0.16)]"/>
                </div>
                {/* Glare scatters in the air in front of the moon, which is why the moon is invisible in daylight. */}
                <div
                    ref={glareRef}
                    className="absolute rounded-full"
                    style={{left: sunX - radius * 5, top: sunY - radius * 5, width: radius * 10, height: radius * 10, background: "radial-gradient(circle closest-side, transparent 0 17%, rgba(255,250,236,0.75) 20%, rgba(255,244,215,0.32) 34%, rgba(255,240,205,0.1) 55%, transparent 80%)"}}
                />
                <div ref={diamondRef} className="absolute left-0 top-0 opacity-0">
                    <span className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-white shadow-[0_0_14px_7px_rgba(255,255,255,0.95),0_0_60px_26px_rgba(255,246,222,0.7)]"/>
                    <span className="absolute -left-[70px] -top-px h-[2px] w-[140px] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.95),transparent)]"/>
                    <span className="absolute -left-px -top-[46px] h-[92px] w-[2px] bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.85),transparent)]"/>
                </div>
            </div>

            <div className={scene.wide ? "relative flex min-h-[640px] max-w-[28rem] flex-col justify-center py-12 pl-10 pr-4" : "relative px-5 pb-10 pt-[232px]"}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{color: ink, opacity: 0.72}}>
                    {eyebrow}
                </p>
                <h1 ref={headlineRef} className={`mt-4 text-balance font-semibold leading-[1.02] tracking-[-0.035em] ${scene.wide ? "text-[52px]" : "text-[38px]"}`} style={{color: ink, opacity: 0.16}}>
                    {headline}
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{color: ink, opacity: 0.76}}>
                    {description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                    {/* Buttons take their colours from the sky, so they stay legible from daylight to totality. */}
                    <ActionLink
                        action={primaryAction}
                        style={{background: ink, color: paper}}
                        className="group inline-flex h-11 items-center gap-2 rounded-full pl-5 pr-4 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    >
                        <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                    </ActionLink>
                    {secondaryAction && (
                        <ActionLink
                            action={secondaryAction}
                            style={{borderColor: ink, color: ink}}
                            className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        />
                    )}
                </div>
                {details.length > 0 && (
                    <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                        {details.map((detail) => (
                            <div key={detail.label} className="flex flex-col-reverse">
                                <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{color: ink, opacity: 0.6}}>{detail.label}</dt>
                                <dd className="text-lg font-semibold tabular-nums tracking-tight" style={{color: ink}}>{detail.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}
                {!scene.wide && scrubber}
            </div>
            {scene.wide && scrubber}
        </section>
    );
};
