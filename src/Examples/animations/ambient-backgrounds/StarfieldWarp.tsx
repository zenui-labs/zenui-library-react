import {useEffect, useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {useReducedMotion} from "framer-motion";

interface Star {
    x: number;
    y: number;
    z: number;
}

const CRUISE = 0.00009; // depth per ms
const WARP = 0.0011;

const spawn = (z = Math.random()): Star => ({x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.max(0.02, z)});

export interface StarfieldWarpProps {
    /** Content shown above the stars. */
    children?: ReactNode;
    /** When true, stars speed up and stretch into streaks. The change eases in and out. */
    warp?: boolean;
    /** Number of stars in the field. */
    starCount?: number;
    /** Speed multiplier for both cruise and warp. 2 flies twice as fast, 0.5 half as fast. */
    speed?: number;
    /** Tailwind text color classes for the stars. */
    starClassName?: string;
    className?: string;
}

// Stars fly toward the viewer from a vanishing point that shifts with the pointer, which gives parallax.
// Turning on warp speeds everything up and stretches stars into streaks.
export const StarfieldWarp = ({
    children,
    warp = false,
    starCount = 420,
    speed: speedScale = 1,
    starClassName = "text-slate-700 dark:text-white",
    className = "",
}: StarfieldWarpProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointer = useRef({x: 0, y: 0});
    const warpRef = useRef(warp);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        warpRef.current = warp;
    }, [warp]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!container || !canvas || !context) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = false;
        let last = performance.now();
        const cruise = CRUISE * speedScale;
        const warpSpeed = WARP * speedScale;
        let speed = cruise;
        let color = "";
        let lastColorRead = -Infinity;
        const center = {x: 0, y: 0};
        const stars = Array.from({length: starCount}, () => spawn());

        const resize = () => {
            const rect = container.getBoundingClientRect();
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
        };

        const draw = (now: number, delta: number) => {
            if (now - lastColorRead > 1000) {
                lastColorRead = now;
                color = getComputedStyle(canvas).color;
            }

            // Ease speed and the vanishing point so warp and parallax never jump.
            speed += ((warpRef.current ? warpSpeed : cruise) - speed) * Math.min(1, delta * 0.003);
            center.x += (pointer.current.x * width * 0.12 - center.x) * 0.05;
            center.y += (pointer.current.y * height * 0.12 - center.y) * 0.05;
            const cx = width / 2 - center.x;
            const cy = height / 2 - center.y;
            const scale = Math.max(width, height) * 0.5;
            const stretch = (speed - cruise) / (warpSpeed - cruise);

            context.clearRect(0, 0, width, height);
            context.fillStyle = color;
            context.strokeStyle = color;

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                const previousZ = star.z;
                star.z -= speed * delta;
                if (star.z <= 0.02) {
                    stars[i] = spawn(1);
                    continue;
                }
                const sx = cx + (star.x / star.z) * scale;
                const sy = cy + (star.y / star.z) * scale;
                if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) {
                    stars[i] = spawn(1);
                    continue;
                }
                const closeness = 1 - star.z;
                const size = 0.4 + closeness * 1.8;
                context.globalAlpha = Math.min(1, closeness * 1.4);

                if (stretch > 0.05) {
                    // During warp, draw a line from where the star was a moment ago.
                    const tailZ = Math.min(1, previousZ + speed * 40 * stretch);
                    context.lineWidth = size;
                    context.beginPath();
                    context.moveTo(cx + (star.x / tailZ) * scale, cy + (star.y / tailZ) * scale);
                    context.lineTo(sx, sy);
                    context.stroke();
                } else {
                    context.beginPath();
                    context.arc(sx, sy, size, 0, Math.PI * 2);
                    context.fill();
                }
            }
            context.globalAlpha = 1;
        };

        const loop = (now: number) => {
            const delta = Math.min(50, now - last);
            last = now;
            draw(now, delta);
            frame = requestAnimationFrame(loop);
        };

        const update = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (reduceMotion || !visible || document.hidden) {
                draw(performance.now(), 0);
                return;
            }
            last = performance.now();
            frame = requestAnimationFrame(loop);
        };

        resize();
        draw(performance.now(), 0);

        const resizeObserver = new ResizeObserver(() => {
            resize();
            draw(performance.now(), 0);
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
    }, [reduceMotion, starCount, speedScale]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
            x: (event.clientX - rect.left) / rect.width - 0.5,
            y: (event.clientY - rect.top) / rect.height - 0.5,
        };
    };

    return (
        <section
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointer.current = {x: 0, y: 0};
            }}
            className={`relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#f8fafc,#e2e8f0)] px-6 py-16 dark:bg-[radial-gradient(ellipse_at_center,#111827,#030712)] ${className}`}
        >
            <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 -z-10 h-full w-full ${starClassName}`}/>

            {children}
        </section>
    );
};
