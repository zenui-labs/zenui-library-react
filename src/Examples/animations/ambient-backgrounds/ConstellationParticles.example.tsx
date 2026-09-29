import {useEffect, useRef} from "react";
import type {PointerEvent} from "react";
import {useReducedMotion} from "framer-motion";
import {LuCalendarDays, LuMapPin} from "react-icons/lu";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

const LINK_DISTANCE = 120;
const POINTER_RADIUS = 150;

// Floating particles drift and link up with thin lines when they come close.
// The pointer gently pushes particles away and draws lines to the ones around it.
const ConstellationParticles = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const accentRef = useRef<HTMLSpanElement>(null);
    const pointer = useRef<{x: number; y: number} | null>(null);
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
        let last = performance.now();
        let particles: Particle[] = [];
        let dotColor = "";
        let accentColor = "";
        let lastColorRead = -Infinity;

        const readColors = (now: number) => {
            if (now - lastColorRead < 1000) return;
            lastColorRead = now;
            dotColor = getComputedStyle(canvas).color;
            accentColor = getComputedStyle(accent).color;
        };

        // Density follows the area, so small screens are not crowded and large ones are not empty.
        const seed = () => {
            const count = Math.min(90, Math.round((width * height) / 9000));
            particles = Array.from({length: count}, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.02,
                vy: (Math.random() - 0.5) * 0.02,
                size: 1 + Math.random() * 1.4,
            }));
        };

        const resize = () => {
            const rect = container.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const reseed = Math.abs(rect.width - width) > 80 || Math.abs(rect.height - height) > 80;
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            if (reseed || particles.length === 0) seed();
        };

        const step = (delta: number) => {
            const target = pointer.current;
            for (const particle of particles) {
                if (target) {
                    const dx = particle.x - target.x;
                    const dy = particle.y - target.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance < POINTER_RADIUS && distance > 0.1) {
                        const push = (1 - distance / POINTER_RADIUS) * 0.0009 * delta;
                        particle.vx += (dx / distance) * push;
                        particle.vy += (dy / distance) * push;
                    }
                }
                // Friction settles pushed particles back to a slow drift.
                const speed = Math.hypot(particle.vx, particle.vy);
                if (speed > 0.03) {
                    particle.vx *= 0.96;
                    particle.vy *= 0.96;
                }
                particle.x += particle.vx * delta;
                particle.y += particle.vy * delta;
                if (particle.x < -10) particle.x = width + 10;
                if (particle.x > width + 10) particle.x = -10;
                if (particle.y < -10) particle.y = height + 10;
                if (particle.y > height + 10) particle.y = -10;
            }
        };

        const draw = (now: number) => {
            readColors(now);
            context.clearRect(0, 0, width, height);

            context.strokeStyle = dotColor;
            context.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue;
                    const distance = Math.hypot(dx, a.y - b.y);
                    if (distance > LINK_DISTANCE) continue;
                    context.globalAlpha = (1 - distance / LINK_DISTANCE) * 0.35;
                    context.beginPath();
                    context.moveTo(a.x, a.y);
                    context.lineTo(b.x, b.y);
                    context.stroke();
                }
            }

            const target = pointer.current;
            if (target) {
                context.strokeStyle = accentColor;
                for (const particle of particles) {
                    const distance = Math.hypot(particle.x - target.x, particle.y - target.y);
                    if (distance > POINTER_RADIUS * 1.2) continue;
                    context.globalAlpha = (1 - distance / (POINTER_RADIUS * 1.2)) * 0.7;
                    context.beginPath();
                    context.moveTo(target.x, target.y);
                    context.lineTo(particle.x, particle.y);
                    context.stroke();
                }
            }

            context.globalAlpha = 1;
            context.fillStyle = dotColor;
            context.beginPath();
            for (const particle of particles) {
                context.moveTo(particle.x + particle.size, particle.y);
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            }
            context.fill();
        };

        const loop = (now: number) => {
            const delta = Math.min(50, now - last);
            last = now;
            step(delta);
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
            last = performance.now();
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
        if (event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    return (
        <section
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointer.current = null;
            }}
            className="relative isolate flex min-h-[460px] w-full items-center overflow-hidden bg-slate-50 px-6 py-16 dark:bg-[#070b18] sm:px-12"
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full text-slate-400 dark:text-slate-500"/>
            <span ref={accentRef} aria-hidden="true" className="hidden text-indigo-500 dark:text-sky-400"/>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.12),transparent_60%)]"/>

            <div className="pointer-events-none relative max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-sky-400">Relay Summit 2026</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Two days with the people building the open web
                </h2>
                <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:gap-6">
                    <span className="inline-flex items-center gap-2">
                        <LuCalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true"/>
                        October 14 and 15
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <LuMapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true"/>
                        LX Factory, Lisbon
                    </span>
                </div>
                <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                    <a
                        href="#tickets"
                        onClick={(event) => event.preventDefault()}
                        className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:text-slate-950 dark:shadow-sky-500/20 dark:hover:bg-sky-400 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-[#070b18]"
                    >
                        Get tickets
                    </a>
                    <a
                        href="#speakers"
                        onClick={(event) => event.preventDefault()}
                        className="rounded-full border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-800 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                        See the 42 speakers
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ConstellationParticles;
