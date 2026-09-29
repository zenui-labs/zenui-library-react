import {useEffect, useRef} from "react";
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

const LIFE = 900; // ms
const SPACING = 6; // px between particles along the pointer path
const MAX_PARTICLES = 260;

// Particles are dropped along the pointer path, drift outward, shrink and fade. The canvas only
// draws while particles are alive and the area is on screen. With reduced motion nothing is emitted.
const ParticleTrail = () => {
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
        let hue = 250;

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
            particles = particles.filter((particle) => now - particle.born < LIFE);
            for (const particle of particles) {
                const age = (now - particle.born) / LIFE;
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
            hue = (hue + 1.2) % 360;
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.3 + Math.random() * 0.7;
            particles.push({x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size: 2 + Math.random() * 4, hue, born: now});
            if (particles.length > MAX_PARTICLES) particles.shift();
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
    }, [reduceMotion]);

    return (
        <div
            ref={areaRef}
            className="relative flex min-h-[340px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950"
        >
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.25),transparent_60%)]"/>
            <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0"/>

            <div className="pointer-events-none relative max-w-md text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Launch week, day 3</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Every edit, live for everyone</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-400">
                    Multiplayer cursors are now in every workspace.{" "}
                    {reduceMotion ? "The trail is off because reduced motion is on." : "Move your pointer here to leave a trail."}
                </p>
            </div>
        </div>
    );
};

export default ParticleTrail;
