import {useEffect, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuRocket} from "react-icons/lu";

interface Star {
    x: number;
    y: number;
    z: number;
}

const STAR_COUNT = 420;
const CRUISE = 0.00009; // depth per ms
const WARP = 0.0011;

const spawn = (z = Math.random()): Star => ({x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.max(0.02, z)});

// Stars fly toward the viewer from a vanishing point that shifts with the pointer, which gives parallax.
// The warp button speeds everything up and stretches stars into streaks.
const StarfieldWarp = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointer = useRef({x: 0, y: 0});
    const warpRef = useRef(false);
    const [warp, setWarp] = useState(false);
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
        let speed = CRUISE;
        let color = "";
        let lastColorRead = -Infinity;
        const center = {x: 0, y: 0};
        const stars = Array.from({length: STAR_COUNT}, () => spawn());

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
            speed += ((warpRef.current ? WARP : CRUISE) - speed) * Math.min(1, delta * 0.003);
            center.x += (pointer.current.x * width * 0.12 - center.x) * 0.05;
            center.y += (pointer.current.y * height * 0.12 - center.y) * 0.05;
            const cx = width / 2 - center.x;
            const cy = height / 2 - center.y;
            const scale = Math.max(width, height) * 0.5;
            const stretch = (speed - CRUISE) / (WARP - CRUISE);

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
    }, [reduceMotion]);

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
            className="relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#f8fafc,#e2e8f0)] px-6 py-16 dark:bg-[radial-gradient(ellipse_at_center,#111827,#030712)]"
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full text-slate-700 dark:text-white"/>

            <div className="relative max-w-md text-center">
                <p className="font-mono text-sm font-medium text-slate-500 dark:text-slate-400">Error 404</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    This page drifted out of range
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                    The link may be old, or the page moved. Head back home, or take a short detour first.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="#home"
                        onClick={(event) => event.preventDefault()}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                        Back to home
                    </a>
                    <button
                        type="button"
                        onClick={() => setWarp((value) => !value)}
                        aria-pressed={warp}
                        disabled={Boolean(reduceMotion)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-800 backdrop-blur transition hover:bg-white aria-pressed:border-indigo-500 aria-pressed:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:aria-pressed:border-indigo-400 dark:aria-pressed:text-indigo-300"
                    >
                        <LuRocket className="h-4 w-4" aria-hidden="true"/>
                        Warp speed
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StarfieldWarp;
