import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface GlobeCity {
    id: string;
    /** Short code drawn beside the dot, e.g. "FRA". */
    code: string;
    name: string;
    lat: number;
    lon: number;
}

export interface GlobeRoute {
    /** City id where the arc starts. */
    from: string;
    /** City id where the arc lands. */
    to: string;
    /** Shown in the log when the arc lands, e.g. "142 ms". */
    label?: string;
}

export interface GlobeStat {
    value: string;
    label: string;
}

export interface DotGlobeHeroProps {
    eyebrow: string;
    headline: ReactNode;
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    cities: GlobeCity[];
    /** Arcs drawn one after another, on a loop. */
    routes: GlobeRoute[];
    stats?: GlobeStat[];
    /** Heading of the small log that lists each arc as it lands. */
    logTitle?: string;
    /** Longitude that faces the viewer first. */
    initialLongitude?: number;
    className?: string;
}

// Land at 3° resolution, 120 x 60 cells, north to south. Each hex digit holds four cells.
// Drawn from rough continent outlines, so coastlines are approximate on purpose.
const LAND = [
    "000000000000000000000000000000", "000000000000000000000000000000", "000000007e3ff00000000000000000", "0000007ffffff800f0000000000000",
    "00000ffff7fffc004001000f000000", "00001ffff07ff800000300fff00000", "03ff8ffff83ff0001c021bfffffff8", "07fffffffe3fc0007fbfffffffffff",
    "07fffffe3e1e0e01fffffffffffffe", "07fffffc300c0003dffffffffffffc", "0383fff83e000023cffffffffff0e0", "0000ffff7f0000319fffffffff80c0",
    "00007fffff8000fbffffffffffe080", "00003fffff00001fffffffffffe000", "00003ffffc00001fffffffffffd000", "00003ffff800007f7c77ffffff9000",
    "00003ffff00000707ffffffffe0000", "00001fffe000007217fffffff22000", "00000fffc000003f00fffffff2c000", "000007ff8000007ffffffffff90000",
    "000001f0800000fffffffffff00000", "000001f0000001fffffbfffff00000", "000000f0c00003ffff7f1fffc80000", "00000072280003fffffe0f1f800000",
    "0000001e000003ffffbc0e1f080000", "00000003000003fffff0060f880000", "000000009e0001fffff8060b040000", "000000003f0000fffff80204040000",
    "000000003fe00063fff0000c300000", "000000007ff00001ffe00006f00000", "000000007ff80001ffc00006e8c000", "000000007fff0000ff800003007000",
    "000000007fff8000ff800000c03800", "000000003fff0000ff800000000400", "000000003ffe0000ffc8000001d000", "000000001ffe0000ff98000007d800",
    "000000000ffe0000ff3800000ff800", "000000000ffc00007f3000003ffc00", "000000000ff000007e1000003ffe00", "000000000ff000007e0000003ffe00",
    "000000000fe000003c0000003ffe00", "000000000fc0000030000000187e00", "000000001f80000000000000001c02", "000000001e00000000000000000006",
    "000000001c00000000000000000008", "000000001c00000000000000000000", "000000001800000000000000000000", "000000000800000000000000000000",
    "000000000000000000000000000000", "000000000000000000000000000000", "000000000000000000000000000000", "000000000780000000000000000000",
    "000000000fc000007fffffffffffe0", "ffffffffffffffffffffffffffffff", "ffffffffffffffffffffffffffffff", "ffffffffffffffffffffffffffffff",
    "ffffffffffffffffffffffffffffff", "ffffffffffffffffffffffffffffff", "ffffffffffffffffffffffffffffff", "ffffffffffffffffffffffffffffff",
];

const isLand = (lat: number, lon: number) => {
    const row = Math.min(59, Math.floor(((90 - lat) / 180) * 60));
    const column = Math.min(119, Math.floor(((lon + 180) / 360) * 120));
    const nibble = parseInt(LAND[row][column >> 2], 16);
    return ((nibble >> (3 - (column & 3))) & 1) === 1;
};

const DEG = Math.PI / 180;

const toVector = (lat: number, lon: number): [number, number, number] => [
    Math.cos(lat * DEG) * Math.sin(lon * DEG),
    Math.sin(lat * DEG),
    Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

// Evenly spread points on a sphere (a Fibonacci lattice), keeping only the ones over land.
const buildLandDots = (count: number) => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const dots: number[] = [];
    for (let index = 0; index < count; index++) {
        const y = 1 - ((index + 0.5) / count) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = golden * index;
        const x = Math.sin(theta) * radius;
        const z = Math.cos(theta) * radius;
        const lat = Math.asin(y) / DEG;
        const lon = Math.atan2(x, z) / DEG;
        if (isLand(lat, lon)) dots.push(x, y, z);
    }
    return new Float32Array(dots);
};

const LAND_DOTS = buildLandDots(9000);
const ARC_SAMPLES = 64;

// Samples of a great circle between two cities, lifted off the surface more for longer hops.
const buildArc = (from: [number, number, number], to: [number, number, number]) => {
    const dot = Math.min(1, Math.max(-1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
    const omega = Math.acos(dot);
    const sine = Math.sin(omega) || 1;
    const lift = 0.06 + 0.28 * (omega / Math.PI);
    const samples = new Float32Array((ARC_SAMPLES + 1) * 3);
    for (let index = 0; index <= ARC_SAMPLES; index++) {
        const t = index / ARC_SAMPLES;
        const a = Math.sin((1 - t) * omega) / sine;
        const b = Math.sin(t * omega) / sine;
        const height = 1 + lift * Math.sin(Math.PI * t);
        samples[index * 3] = (from[0] * a + to[0] * b) * height;
        samples[index * 3 + 1] = (from[1] * a + to[1] * b) * height;
        samples[index * 3 + 2] = (from[2] * a + to[2] * b) * height;
    }
    return samples;
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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

interface LogEntry {
    key: number;
    from: string;
    to: string;
    label?: string;
}

const ARC_SECONDS = 1.7;
const ARC_GAP = 1.05;

/**
 * A hero with a dotted globe drawn on a canvas. Land comes from a small built-in bitmap sampled on a
 * Fibonacci sphere, arcs rise between cities along great circles, and the far side shows through
 * faintly. Drag or use the arrow keys to spin it; it coasts to a stop and pauses off screen.
 */
export const DotGlobeHero = ({
    eyebrow,
    headline,
    description,
    primaryAction,
    secondaryAction,
    cities,
    routes,
    stats = [],
    logTitle = "Live",
    initialLongitude = 10,
    className = "",
}: DotGlobeHeroProps) => {
    const rootRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inkRef = useRef<HTMLSpanElement>(null);
    const accentRef = useRef<HTMLSpanElement>(null);

    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [log, setLog] = useState<LogEntry[]>([]);
    const [dragged, setDragged] = useState(false);
    // Layout follows the hero's own width rather than the viewport, so it also fits narrow frames.
    const [wide, setWide] = useState(true);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const update = () => setWide(root.clientWidth >= 720);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    const view = useRef({
        yaw: -initialLongitude * DEG,
        pitch: 0.38,
        velocityYaw: 0,
        velocityPitch: 0,
        dragging: false,
        last: {x: 0, y: 0, time: 0},
        clock: 0,
        landed: -1,
    });

    const cityById = new Map(cities.map((city) => [city.id, city]));
    // The loop reads the latest arrays from a ref and restarts only when their contents change.
    const data = useRef({cities, routes});
    data.current = {cities, routes};
    const routeKey = routes.map((route) => `${route.from}-${route.to}`).join("|");
    const cityKey = cities.map((city) => `${city.id}:${city.lat}:${city.lon}`).join("|");

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap || !inView) return;
        const context = canvas.getContext("2d");
        if (!context) return;
        const {cities, routes} = data.current;

        const lookup = new Map(cities.map((city) => [city.id, city]));
        const cityVectors = cities.map((city) => ({city, vector: toVector(city.lat, city.lon)}));
        const arcs = routes.flatMap((route) => {
            const from = lookup.get(route.from);
            const to = lookup.get(route.to);
            if (!from || !to) return [];
            return [{route, samples: buildArc(toVector(from.lat, from.lon), toVector(to.lat, to.lon)), end: toVector(to.lat, to.lon)}];
        });
        const period = Math.max(6, arcs.length * ARC_GAP + ARC_SECONDS + 0.8);

        let width = 0;
        let height = 0;
        let ratio = 1;
        const resize = () => {
            ratio = Math.min(2, window.devicePixelRatio || 1);
            width = wrap.clientWidth;
            height = wrap.clientHeight;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(wrap);

        let ink = "rgb(24, 24, 27)";
        let accent = "rgb(234, 88, 12)";
        const readColors = () => {
            if (inkRef.current) ink = getComputedStyle(inkRef.current).color;
            if (accentRef.current) accent = getComputedStyle(accentRef.current).color;
        };
        readColors();

        const state = view.current;
        let frame = 0;
        let previous = performance.now();
        let frameCount = 0;

        const render = (now: number) => {
            const seconds = Math.min(0.05, (now - previous) / 1000);
            previous = now;
            // Re-read theme colours now and then, so a light/dark toggle shows up without a hook.
            if (++frameCount % 30 === 0) readColors();

            if (!state.dragging) {
                // Coast after a flick, then ease back into the slow idle spin.
                state.yaw += state.velocityYaw * seconds;
                state.pitch += state.velocityPitch * seconds;
                const decay = Math.pow(0.04, seconds);
                const idle = reduceMotion ? 0 : 0.07;
                state.velocityYaw = idle + (state.velocityYaw - idle) * decay;
                state.velocityPitch *= decay;
                state.pitch += (0.38 - state.pitch) * (reduceMotion ? 0 : 0.6 * seconds);
            }
            state.pitch = Math.min(1.1, Math.max(-1.1, state.pitch));
            if (!reduceMotion) state.clock += seconds;

            const cosYaw = Math.cos(state.yaw);
            const sinYaw = Math.sin(state.yaw);
            const cosPitch = Math.cos(state.pitch);
            const sinPitch = Math.sin(state.pitch);
            const radius = Math.min(width, height) * 0.46;
            const cx = width / 2;
            const cy = height / 2;

            const project = (x: number, y: number, z: number) => {
                const rx = x * cosYaw + z * sinYaw;
                const rz = -x * sinYaw + z * cosYaw;
                const ry = y * cosPitch - rz * sinPitch;
                const depth = y * sinPitch + rz * cosPitch;
                return {x: cx + rx * radius, y: cy - ry * radius, z: depth, hidden: depth < 0 && rx * rx + ry * ry < 1};
            };

            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, width, height);

            // Body of the sphere: a faint fill and a hairline rim, so the dots read as a ball.
            const body = context.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius);
            body.addColorStop(0, ink.replace("rgb(", "rgba(").replace(")", ", 0.05)"));
            body.addColorStop(1, ink.replace("rgb(", "rgba(").replace(")", ", 0.015)"));
            context.fillStyle = body;
            context.beginPath();
            context.arc(cx, cy, radius, 0, Math.PI * 2);
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = ink;
            context.globalAlpha = 0.12;
            context.stroke();

            context.fillStyle = ink;
            const dotSize = Math.max(1.5, radius / 135);
            for (let index = 0; index < LAND_DOTS.length; index += 3) {
                const point = project(LAND_DOTS[index], LAND_DOTS[index + 1], LAND_DOTS[index + 2]);
                // Back-facing dots show through faintly; front dots brighten toward the centre.
                const alpha = point.z < 0 ? 0.08 + 0.06 * (1 + point.z) : 0.34 + 0.6 * point.z;
                const size = point.z < 0 ? dotSize * 0.8 : dotSize * (0.85 + 0.3 * point.z);
                context.globalAlpha = alpha;
                context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
            }

            // Arcs: a head travels the great circle and a tail chases it, then the landing pings.
            const cycle = state.clock % period;
            context.strokeStyle = accent;
            context.fillStyle = accent;
            context.lineCap = "round";
            arcs.forEach((arc, arcIndex) => {
                const start = arcIndex * ARC_GAP;
                const local = cycle - start;
                let head = 1;
                let tail = 0;
                if (!reduceMotion) {
                    if (local < 0 || local > ARC_SECONDS + 0.9) return;
                    head = ease(Math.min(1, local / ARC_SECONDS));
                    tail = ease(Math.min(1, Math.max(0, (local - 0.55) / ARC_SECONDS)));
                }
                const first = Math.floor(tail * ARC_SAMPLES);
                const last = Math.ceil(head * ARC_SAMPLES);
                context.lineWidth = 1.8;
                for (let index = first; index < last; index++) {
                    const a = project(arc.samples[index * 3], arc.samples[index * 3 + 1], arc.samples[index * 3 + 2]);
                    const b = project(arc.samples[index * 3 + 3], arc.samples[index * 3 + 4], arc.samples[index * 3 + 5]);
                    // Fade the ends of the streak so it reads as a moving pulse, not a drawn line.
                    const along = (index - first) / Math.max(1, last - first);
                    const streak = reduceMotion ? 0.8 : Math.min(1, along * 3) * 0.95;
                    context.globalAlpha = (a.hidden ? 0.12 : 1) * streak;
                    context.beginPath();
                    context.moveTo(a.x, a.y);
                    context.lineTo(b.x, b.y);
                    context.stroke();
                }
                if (!reduceMotion && head < 1) {
                    const tip = Math.min(ARC_SAMPLES, last);
                    const point = project(arc.samples[tip * 3], arc.samples[tip * 3 + 1], arc.samples[tip * 3 + 2]);
                    context.globalAlpha = point.hidden ? 0.2 : 1;
                    context.beginPath();
                    context.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
                    context.fill();
                }
                if (!reduceMotion && local >= ARC_SECONDS) {
                    const ping = (local - ARC_SECONDS) / 0.9;
                    const point = project(arc.end[0], arc.end[1], arc.end[2]);
                    if (!point.hidden) {
                        context.globalAlpha = (1 - ping) * 0.9;
                        context.lineWidth = 1.2;
                        context.beginPath();
                        context.arc(point.x, point.y, 3 + ping * 14, 0, Math.PI * 2);
                        context.stroke();
                    }
                    const landing = Math.floor(state.clock / period) * 1000 + arcIndex;
                    if (state.landed !== landing) {
                        state.landed = landing;
                        const key = now;
                        const from = lookup.get(arc.route.from)?.code ?? arc.route.from;
                        const to = lookup.get(arc.route.to)?.code ?? arc.route.to;
                        setLog((entries) => [{key, from, to, label: arc.route.label}, ...entries].slice(0, 3));
                    }
                }
            });

            // Cities and their codes, front side only.
            context.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
            context.textBaseline = "middle";
            cityVectors.forEach(({city, vector}) => {
                const point = project(vector[0], vector[1], vector[2]);
                if (point.z < -0.05) return;
                const facing = Math.min(1, (point.z + 0.05) * 4);
                context.globalAlpha = facing;
                context.fillStyle = accent;
                context.beginPath();
                context.arc(point.x, point.y, 2.6, 0, Math.PI * 2);
                context.fill();
                context.globalAlpha = facing * 0.35;
                context.strokeStyle = accent;
                context.lineWidth = 1;
                context.beginPath();
                context.arc(point.x, point.y, 5.5, 0, Math.PI * 2);
                context.stroke();
                if (point.z > 0.2) {
                    context.globalAlpha = Math.min(1, (point.z - 0.2) * 4) * 0.85;
                    context.fillStyle = ink;
                    context.fillText(city.code, point.x + 9, point.y + 0.5);
                }
            });
            context.globalAlpha = 1;
        };

        const tick = (now: number) => {
            render(now);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [inView, reduceMotion, cityKey, routeKey]);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        const state = view.current;
        state.dragging = true;
        state.velocityYaw = 0;
        state.velocityPitch = 0;
        state.last = {x: event.clientX, y: event.clientY, time: performance.now()};
        if (!dragged) setDragged(true);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = view.current;
        if (!state.dragging) return;
        const size = wrapRef.current?.clientWidth ?? 400;
        const now = performance.now();
        const dx = event.clientX - state.last.x;
        const dy = event.clientY - state.last.y;
        const elapsed = Math.max(8, now - state.last.time) / 1000;
        // Scale by the globe's size so the surface tracks the finger.
        const yaw = (dx / (size * 0.46)) * 1.0;
        const pitch = (dy / (size * 0.46)) * 1.0;
        state.yaw += yaw;
        state.pitch += pitch;
        state.velocityYaw = state.velocityYaw * 0.6 + (yaw / elapsed) * 0.4;
        state.velocityPitch = state.velocityPitch * 0.6 + (pitch / elapsed) * 0.4;
        state.last = {x: event.clientX, y: event.clientY, time: now};
    };

    const handlePointerUp = () => {
        const state = view.current;
        state.dragging = false;
        if (reduceMotion) {
            state.velocityYaw = 0;
            state.velocityPitch = 0;
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const state = view.current;
        const step = event.shiftKey ? 0.6 : 0.2;
        const moves: Record<string, () => void> = {
            ArrowLeft: () => (state.yaw -= step),
            ArrowRight: () => (state.yaw += step),
            ArrowUp: () => (state.pitch -= step),
            ArrowDown: () => (state.pitch += step),
        };
        const move = moves[event.key];
        if (!move) return;
        event.preventDefault();
        move();
        if (!dragged) setDragged(true);
    };

    const cityNames = cities.map((city) => city.name).join(", ");

    return (
        <section
            ref={rootRef}
            className={`relative isolate min-h-[620px] w-full overflow-hidden bg-[#fbfaf8] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 ${className}`}
        >
            <span ref={inkRef} aria-hidden="true" className="hidden text-zinc-900 dark:text-zinc-200"/>
            <span ref={accentRef} aria-hidden="true" className="hidden text-orange-600 dark:text-orange-400"/>

            <div className={`relative z-10 flex flex-col ${wide ? "min-h-[620px] max-w-[27rem] justify-center px-10 py-12" : "px-5 pb-6 pt-10"}`}>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-orange-500 opacity-60 motion-reduce:hidden"/>
                        <span className="relative h-1.5 w-1.5 rounded-full bg-orange-600 dark:bg-orange-400"/>
                    </span>
                    {eyebrow}
                </p>
                <h1 className={`mt-5 text-balance font-semibold leading-[1.02] tracking-[-0.035em] ${wide ? "text-5xl" : "text-[38px]"}`}>{headline}</h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                    <ActionLink
                        action={primaryAction}
                        className="group inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-900 pl-5 pr-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950"
                    >
                        <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                    </ActionLink>
                    {secondaryAction && (
                        <ActionLink
                            action={secondaryAction}
                            className="inline-flex h-11 items-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700"
                        />
                    )}
                </div>

                {stats.length > 0 && (
                    <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <dt className="sr-only">{stat.label}</dt>
                                <dd className={`font-semibold tabular-nums tracking-tight ${wide ? "text-2xl" : "text-xl"}`}>{stat.value}</dd>
                                <dd aria-hidden="true" className="mt-1 text-xs leading-snug text-zinc-500 dark:text-zinc-400">{stat.label}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>

            <div
                className={`pointer-events-none aspect-square ${
                    wide ? "absolute right-[-10%] top-1/2 w-[62%] -translate-y-1/2" : "relative left-1/2 -mb-[40%] -mt-2 w-[118%] max-w-[560px] -translate-x-1/2"
                }`}
            >
                <div
                    ref={wrapRef}
                    tabIndex={0}
                    role="img"
                    aria-label={`Globe with routes between ${cityNames}. Drag or use the arrow keys to turn it.`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onKeyDown={handleKeyDown}
                    className="pointer-events-auto absolute inset-[4%] cursor-grab touch-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fbfaf8] active:cursor-grabbing dark:focus-visible:ring-offset-zinc-950"
                >
                    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full"/>
                </div>
                <AnimatePresence>
                    {!dragged && (
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className={`absolute left-1/2 -translate-x-1/2 rounded-full ${wide ? "bottom-[16%]" : "top-[6%]"} border border-zinc-200 bg-white/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-400`}
                        >
                            Drag to spin
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Arrival log: each arc adds a line when it lands. Decorative, so it is not announced. */}
            {wide && (
                <div className="absolute bottom-4 right-4 z-10 w-52 rounded-lg border border-zinc-200 bg-white/85 p-3 font-mono text-[11px] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
                    <p className="mb-2 flex items-center justify-between uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                        {logTitle}
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-600 dark:bg-orange-400"/>
                    </p>
                    <ul className="space-y-1">
                        {(reduceMotion
                            ? routes.slice(0, 3).map((route, index) => ({key: index, from: cityById.get(route.from)?.code ?? route.from, to: cityById.get(route.to)?.code ?? route.to, label: route.label}))
                            : log
                        ).map((entry, index) => (
                            <motion.li
                                key={entry.key}
                                layout={!reduceMotion}
                                initial={reduceMotion ? false : {opacity: 0, y: -6}}
                                animate={{opacity: 1 - index * 0.28, y: 0}}
                                transition={{type: "spring", stiffness: 420, damping: 34}}
                                className="flex justify-between gap-3 tabular-nums text-zinc-700 dark:text-zinc-300"
                            >
                                <span>{entry.from} <span className="text-zinc-400 dark:text-zinc-600">→</span> {entry.to}</span>
                                {entry.label && <span className="text-orange-600 dark:text-orange-400">{entry.label}</span>}
                            </motion.li>
                        ))}
                        {!reduceMotion && log.length === 0 && <li className="text-zinc-400 dark:text-zinc-600">Listening…</li>}
                    </ul>
                </div>
            )}
        </section>
    );
};
