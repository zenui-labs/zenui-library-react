import {useEffect, useRef} from "react";
import type {PointerEvent} from "react";
import {useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

interface Orb {
    /** Center of the orbit as a share of the canvas. */
    cx: number;
    cy: number;
    /** Orbit size, speed in radians per second, and radius as a share of the larger side. */
    rx: number;
    ry: number;
    speed: number;
    radius: number;
    phase: number;
}

const orbs: Orb[] = [
    {cx: 0.2, cy: 0.3, rx: 0.18, ry: 0.22, speed: 0.21, radius: 0.55, phase: 0},
    {cx: 0.8, cy: 0.25, rx: 0.2, ry: 0.18, speed: 0.17, radius: 0.5, phase: 2},
    {cx: 0.5, cy: 0.85, rx: 0.3, ry: 0.12, speed: 0.13, radius: 0.6, phase: 4},
    {cx: 0.75, cy: 0.75, rx: 0.15, ry: 0.2, speed: 0.24, radius: 0.45, phase: 1},
];

// The canvas is drawn at a fraction of the real size and scaled up by the browser.
// Scaling smooths the gradients into a soft mesh and keeps each frame very cheap.
const DOWNSCALE = 10;

// Fading to the same color at zero alpha avoids the gray fringe that "transparent" (black at zero alpha) can leave.
const clear = (color: string) => {
    const channels = color.match(/[\d.]+/g);
    return channels && channels.length >= 3 ? `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, 0)` : "transparent";
};

// Colored light moves around on slow orbits and the brightest one follows the pointer.
// Colors come from Tailwind classes on hidden spans, so light and dark themes each get their own palette.
const GradientMesh = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const paletteRef = useRef<HTMLDivElement>(null);
    const pointer = useRef({x: 0.5, y: 0.4, active: false});
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const palette = paletteRef.current;
        const context = canvas?.getContext("2d");
        if (!container || !canvas || !palette || !context) return;

        let frame = 0;
        let visible = false;
        let colors: string[] = [];
        let base = "";
        let lastColorRead = -Infinity;
        const follow = {x: 0.5, y: 0.4};

        const readColors = (now: number) => {
            if (now - lastColorRead < 1000) return;
            lastColorRead = now;
            colors = Array.from(palette.children).map((child) => getComputedStyle(child).color);
            base = getComputedStyle(canvas).color;
        };

        const resize = () => {
            canvas.width = Math.max(8, Math.ceil(container.offsetWidth / DOWNSCALE));
            canvas.height = Math.max(8, Math.ceil(container.offsetHeight / DOWNSCALE));
        };

        const glow = (x: number, y: number, radius: number, color: string) => {
            const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, clear(color));
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };

        const draw = (now: number) => {
            readColors(now);
            const width = canvas.width;
            const height = canvas.height;
            const size = Math.max(width, height);
            const seconds = now / 1000;

            context.globalCompositeOperation = "source-over";
            context.fillStyle = base;
            context.fillRect(0, 0, width, height);

            orbs.forEach((orb, index) => {
                const angle = seconds * orb.speed + orb.phase;
                const x = (orb.cx + Math.cos(angle) * orb.rx) * width;
                const y = (orb.cy + Math.sin(angle * 1.3) * orb.ry) * height;
                glow(x, y, orb.radius * size, colors[index] ?? base);
            });

            // The last color eases toward the pointer, or wanders on its own when the pointer is away.
            const target = pointer.current.active
                ? pointer.current
                : {x: 0.5 + Math.cos(seconds * 0.3) * 0.25, y: 0.45 + Math.sin(seconds * 0.4) * 0.2};
            follow.x += (target.x - follow.x) * 0.04;
            follow.y += (target.y - follow.y) * 0.04;
            glow(follow.x * width, follow.y * height, 0.4 * size, colors[orbs.length] ?? base);
        };

        const loop = (now: number) => {
            draw(now);
            frame = requestAnimationFrame(loop);
        };

        const update = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (reduceMotion || !visible || document.hidden) {
                draw(performance.now());
                return;
            }
            frame = requestAnimationFrame(loop);
        };

        resize();
        draw(performance.now());

        const resizeObserver = new ResizeObserver(() => {
            resize();
            draw(performance.now());
        });
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        });
        intersectionObserver.observe(container);
        document.addEventListener("visibilitychange", update);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, [reduceMotion]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, active: true};
    };

    const perks = ["Unlimited projects and guests", "Version history for 90 days", "Priority support from real people"];

    return (
        <section
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointer.current = {...pointer.current, active: false};
            }}
            className="relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden px-4 py-16"
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full text-orange-50 dark:text-slate-950"/>
            <div ref={paletteRef} aria-hidden="true" className="hidden">
                <span className="text-rose-300/90 dark:text-rose-600/60"/>
                <span className="text-amber-200/90 dark:text-indigo-600/60"/>
                <span className="text-sky-300/80 dark:text-sky-600/50"/>
                <span className="text-violet-300/80 dark:text-fuchsia-600/50"/>
                <span className="text-orange-300/90 dark:text-violet-500/60"/>
            </div>

            <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/55 p-6 shadow-2xl shadow-rose-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/40 sm:p-8">
                <p className="text-sm font-medium text-rose-600 dark:text-rose-300">Team plan</p>
                <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">$12</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">per seat, monthly</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                    {perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                                <LuCheck className="h-3 w-3" aria-hidden="true"/>
                            </span>
                            {perk}
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-900"
                >
                    Start a 14-day trial
                </button>
                <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">No card needed. Cancel anytime.</p>
            </div>
        </section>
    );
};

export default GradientMesh;
