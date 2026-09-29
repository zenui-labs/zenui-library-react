import {useEffect, useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {useReducedMotion} from "framer-motion";

interface Ripple {
    x: number;
    y: number;
    start: number;
}

const RIPPLE_SPEED = 0.32; // px per ms
const RIPPLE_WIDTH = 34;
const RIPPLE_LIFE = 2600; // ms

export interface DotWaveProps {
    /** Content shown above the grid. Give it pointer-events-none so clicks reach the grid. */
    children?: ReactNode;
    /** Distance between dots in pixels. */
    spacing?: number;
    /** Milliseconds between automatic pulses. */
    pulseInterval?: number;
    /** Tailwind text color classes for resting dots. */
    dotClassName?: string;
    /** Tailwind text color classes for lit dots. */
    accentClassName?: string;
    className?: string;
}

// A dot grid drawn on a canvas. Pulses spread from random points and from every click,
// and dots near the pointer light up. Drawing stops while the section is off screen.
export const DotWave = ({
    children,
    spacing = 22,
    pulseInterval = 2800,
    dotClassName = "text-slate-300 dark:text-slate-700",
    accentClassName = "text-indigo-500 dark:text-indigo-400",
    className = "",
}: DotWaveProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const accentRef = useRef<HTMLSpanElement>(null);
    const ripplesRef = useRef<Ripple[]>([]);
    const pointerRef = useRef<{x: number; y: number} | null>(null);
    const wakeRef = useRef<() => void>(() => undefined);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const accent = accentRef.current;
        const context = canvas?.getContext("2d");
        if (!container || !canvas || !accent || !context) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = false;
        let lastPulse = 0;
        let lastColorRead = -Infinity;
        // Colors come from Tailwind classes on the canvas and a hidden span, so dark mode just works.
        let baseColor = "";
        let accentColor = "";

        const readColors = (now: number) => {
            if (now - lastColorRead < 1000) return;
            lastColorRead = now;
            baseColor = getComputedStyle(canvas).color;
            accentColor = getComputedStyle(accent).color;
        };

        const resize = () => {
            const rect = container.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const draw = (now: number) => {
            readColors(now);
            context.clearRect(0, 0, width, height);

            if (!reduceMotion && now - lastPulse > pulseInterval) {
                lastPulse = now;
                ripplesRef.current.push({x: Math.random() * width, y: Math.random() * height, start: now});
            }
            ripplesRef.current = ripplesRef.current.filter((ripple) => now - ripple.start < RIPPLE_LIFE);

            const pointer = pointerRef.current;
            const offsetX = (width % spacing) / 2 + spacing / 2;
            const offsetY = (height % spacing) / 2 + spacing / 2;

            // All resting dots in one path, then lit dots one by one on top.
            context.fillStyle = baseColor;
            context.beginPath();
            const lit: {x: number; y: number; strength: number}[] = [];

            for (let x = offsetX; x < width; x += spacing) {
                for (let y = offsetY; y < height; y += spacing) {
                    let strength = 0;
                    for (const ripple of ripplesRef.current) {
                        const age = now - ripple.start;
                        const radius = age * RIPPLE_SPEED;
                        const distance = Math.hypot(x - ripple.x, y - ripple.y);
                        const band = Math.exp(-((distance - radius) ** 2) / (2 * RIPPLE_WIDTH ** 2));
                        strength = Math.max(strength, band * (1 - age / RIPPLE_LIFE));
                    }
                    if (pointer) {
                        const distance = Math.hypot(x - pointer.x, y - pointer.y);
                        strength = Math.max(strength, Math.max(0, 1 - distance / 110) * 0.9);
                    }

                    context.moveTo(x + 1.2, y);
                    context.arc(x, y, 1.2, 0, Math.PI * 2);
                    if (strength > 0.04) lit.push({x, y, strength});
                }
            }
            context.fill();

            context.fillStyle = accentColor;
            for (const dot of lit) {
                context.globalAlpha = dot.strength;
                context.beginPath();
                context.arc(dot.x, dot.y, 1.2 + dot.strength * 1.6, 0, Math.PI * 2);
                context.fill();
            }
            context.globalAlpha = 1;
        };

        const loop = (now: number) => {
            draw(now);
            // With reduced motion there are no automatic pulses, so only draw when the pointer moves.
            const busy = !reduceMotion || ripplesRef.current.length > 0;
            frame = visible && busy ? requestAnimationFrame(loop) : 0;
        };

        const start = () => {
            if (!frame) frame = requestAnimationFrame(loop);
        };

        wakeRef.current = () => {
            if (visible) start();
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
            if (visible) start();
        });
        intersectionObserver.observe(container);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, [reduceMotion, spacing, pulseInterval]);

    const localPoint = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    return (
        <div
            ref={containerRef}
            onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                pointerRef.current = localPoint(event);
                wakeRef.current();
            }}
            onPointerLeave={() => {
                pointerRef.current = null;
                wakeRef.current();
            }}
            onPointerDown={(event) => {
                if (reduceMotion) return;
                ripplesRef.current.push({...localPoint(event), start: performance.now()});
                wakeRef.current();
            }}
            className={`relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-white px-6 dark:bg-slate-950 ${className}`}
        >
            <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 ${dotClassName}`}/>
            <span ref={accentRef} aria-hidden="true" className={`hidden ${accentClassName}`}/>

            {/* Fade the grid toward the edges. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_85%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#020617_85%)]"
            />

            {children}
        </div>
    );
};
