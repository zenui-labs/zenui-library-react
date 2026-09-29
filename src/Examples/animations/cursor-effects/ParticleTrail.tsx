import {useEffect, useRef} from "react";
import type {ReactNode} from "react";
import {useReducedMotion} from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    born: number;
}

const SPACING = 6; // px between particles along the pointer path

export interface ParticleTrailProps {
    /** Content shown above the trail. */
    children?: ReactNode;
    /** Hue of the first particle, from 0 to 360. */
    startHue?: number;
    /** How far the hue shifts with each particle. Use 0 for a single color. */
    hueStep?: number;
    /** How long each particle lives, in ms. */
    lifetime?: number;
    /** Oldest particles are dropped past this count. */
    maxParticles?: number;
    /** Classes for the wrapper around `children`. */
    contentClassName?: string;
    className?: string;
}

// Particles are dropped along the pointer path, drift outward, shrink and fade. The canvas only
// draws while particles are alive and the area is on screen. With reduced motion nothing is emitted.
export const ParticleTrail = ({
    children,
    startHue = 250,
    hueStep = 1.2,
    lifetime = 900,
    maxParticles = 260,
    contentClassName = "pointer-events-none max-w-md text-center",
    className = "",
}: ParticleTrailProps) => {
    const areaRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const area = areaRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!area || !canvas || !context || reduceMotion) return;

        let particles: Particle[] = [];
        let frame = 0;
        let visible = true;
        let width = 0;
        let height = 0;
        let last: {x: number; y: number} | null = null;
        let hue = startHue;

        const resize = () => {
            const rect = area.getBoundingClientRect();
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
            context.clearRect(0, 0, width, height);
            particles = particles.filter((particle) => now - particle.born < lifetime);
            for (const particle of particles) {
                const age = (now - particle.born) / lifetime;
                const ease = 1 - (1 - age) ** 3;
                const px = particle.x + particle.vx * ease * 40;
                const py = particle.y + particle.vy * ease * 40 + age * age * 18;
                const radius = particle.size * (1 - age);
                context.globalAlpha = (1 - age) * 0.9;
                context.fillStyle = `hsl(${particle.hue} 90% 62%)`;
                context.beginPath();
                context.arc(px, py, radius, 0, Math.PI * 2);
                context.fill();
            }
            context.globalAlpha = 1;
        };

        const loop = (now: number) => {
            draw(now);
            frame = visible && particles.length > 0 ? requestAnimationFrame(loop) : 0;
        };

        const start = () => {
            if (!frame && visible) frame = requestAnimationFrame(loop);
        };

        const emit = (x: number, y: number, now: number) => {
            hue = (hue + hueStep) % 360;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.3 + Math.random() * 0.7;
            particles.push({x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size: 2 + Math.random() * 4, hue, born: now});
            if (particles.length > maxParticles) particles.shift();
        };

        const handleMove = (event: PointerEvent) => {
            const rect = area.getBoundingClientRect();
            const point = {x: event.clientX - rect.left, y: event.clientY - rect.top};
            const now = performance.now();
            // Fill the gap since the last event, so fast movements still leave a continuous trail.
            if (last) {
                const distance = Math.hypot(point.x - last.x, point.y - last.y);
                const steps = Math.min(24, Math.floor(distance / SPACING));
                for (let step = 1; step <= steps; step += 1) {
                    const t = step / steps;
                    emit(last.x + (point.x - last.x) * t, last.y + (point.y - last.y) * t, now);
                }
            } else {
                emit(point.x, point.y, now);
            }
            last = point;
            start();
        };

        const handleLeave = () => {
            last = null;
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(area);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
        });
        intersectionObserver.observe(area);
        area.addEventListener("pointermove", handleMove);
        area.addEventListener("pointerleave", handleLeave);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            area.removeEventListener("pointermove", handleMove);
            area.removeEventListener("pointerleave", handleLeave);
        };
    }, [reduceMotion, startHue, hueStep, lifetime, maxParticles]);

    return (
        <div
            ref={areaRef}
            className={`relative flex min-h-[340px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950 ${className}`}
        >
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.25),transparent_60%)]"/>
            <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0"/>

            <div className={`relative ${contentClassName}`}>{children}</div>
        </div>
    );
};
