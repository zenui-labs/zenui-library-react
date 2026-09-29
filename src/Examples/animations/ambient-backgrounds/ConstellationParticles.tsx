import {useEffect, useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {useReducedMotion} from "framer-motion";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export interface ConstellationParticlesProps {
    /** Content shown above the particles. Give it pointer-events-none so the pointer reaches the canvas. */
    children?: ReactNode;
    /** Particles closer than this many pixels are joined by a line. */
    linkDistance?: number;
    /** Radius in pixels around the pointer that pushes particles and draws lines to them. */
    pointerRadius?: number;
    /** Square pixels of area per particle. Lower values give a denser field. */
    areaPerParticle?: number;
    /** Upper limit on the particle count, whatever the section size. */
    maxParticles?: number;
    /** Tailwind text color classes for particles and the lines between them. */
    dotClassName?: string;
    /** Tailwind text color classes for the lines drawn to the pointer. */
    accentClassName?: string;
    /** Tailwind classes for the soft glow layer behind the particles. */
    glowClassName?: string;
    className?: string;
}

// Floating particles drift and link up with thin lines when they come close.
// The pointer gently pushes particles away and draws lines to the ones around it.
export const ConstellationParticles = ({
    children,
    linkDistance = 120,
    pointerRadius = 150,
    areaPerParticle = 9000,
    maxParticles = 90,
    dotClassName = "text-slate-400 dark:text-slate-500",
    accentClassName = "text-indigo-500 dark:text-sky-400",
    glowClassName = "bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.12),transparent_60%)]",
    className = "",
}: ConstellationParticlesProps) => {
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
            const count = Math.min(maxParticles, Math.round((width * height) / areaPerParticle));
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
                    if (distance < pointerRadius && distance > 0.1) {
                        const push = (1 - distance / pointerRadius) * 0.0009 * delta;
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
                    if (dx > linkDistance || dx < -linkDistance) continue;
                    const distance = Math.hypot(dx, a.y - b.y);
                    if (distance > linkDistance) continue;
                    context.globalAlpha = (1 - distance / linkDistance) * 0.35;
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
                    if (distance > pointerRadius * 1.2) continue;
                    context.globalAlpha = (1 - distance / (pointerRadius * 1.2)) * 0.7;
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
    }, [reduceMotion, linkDistance, pointerRadius, areaPerParticle, maxParticles]);

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
            className={`relative isolate flex min-h-[460px] w-full items-center overflow-hidden bg-slate-50 px-6 py-16 dark:bg-[#070b18] sm:px-12 ${className}`}
        >
            <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 -z-10 h-full w-full ${dotClassName}`}/>
            <span ref={accentRef} aria-hidden="true" className={`hidden ${accentClassName}`}/>
            <div aria-hidden="true" className={`absolute inset-0 -z-10 ${glowClassName}`}/>

            {children}
        </section>
    );
};
