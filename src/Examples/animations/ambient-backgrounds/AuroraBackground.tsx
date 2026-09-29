import {useEffect, useRef} from "react";
import type {ReactNode} from "react";
import {useReducedMotion} from "framer-motion";

export interface AuroraBlob {
    /** Tailwind size, color and opacity classes for the blob. */
    className: string;
    /** Resting position as a share of the container, and how far the blob drifts from it. */
    x: number;
    y: number;
    driftX: number;
    driftY: number;
    /** Seconds for one full drift cycle. Different periods keep the pattern from repeating. */
    period: number;
    phase: number;
}

const defaultBlobs: AuroraBlob[] = [
    {className: "h-[70%] w-[55%] bg-emerald-300/70 dark:bg-emerald-500/40", x: 0.15, y: 0.1, driftX: 0.12, driftY: 0.08, period: 23, phase: 0},
    {className: "h-[60%] w-[50%] bg-cyan-300/70 dark:bg-cyan-500/40", x: 0.45, y: 0.0, driftX: 0.14, driftY: 0.1, period: 29, phase: 1.7},
    {className: "h-[65%] w-[45%] bg-violet-300/70 dark:bg-violet-600/45", x: 0.7, y: 0.2, driftX: 0.1, driftY: 0.12, period: 19, phase: 3.1},
    {className: "h-[50%] w-[40%] bg-pink-300/60 dark:bg-fuchsia-600/35", x: 0.3, y: 0.45, driftX: 0.16, driftY: 0.06, period: 31, phase: 4.4},
];

export interface AuroraBackgroundProps {
    /** Content shown above the aurora, such as a hero message. */
    children?: ReactNode;
    /** Color fields that drift behind the content. Keep the array stable (define it outside the component). */
    blobs?: AuroraBlob[];
    /** Speed multiplier. 2 drifts twice as fast, 0.5 half as fast. */
    speed?: number;
    className?: string;
}

// Soft blurred color fields drift on slow, out-of-sync loops, like the northern lights.
// The blobs only move with transforms, and the loop stops when the section is hidden or off screen.
export const AuroraBackground = ({children, blobs = defaultBlobs, speed = 1, className = ""}: AuroraBackgroundProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let frame = 0;
        let visible = false;
        let width = container.offsetWidth;
        let height = container.offsetHeight;

        const place = (time: number) => {
            const seconds = (time / 1000) * speed;
            blobs.forEach((blob, index) => {
                const element = blobRefs.current[index];
                if (!element) return;
                const angle = (seconds / blob.period) * Math.PI * 2 + blob.phase;
                const x = (blob.x + Math.sin(angle) * blob.driftX) * width;
                const y = (blob.y + Math.cos(angle * 0.8) * blob.driftY) * height;
                const scale = 1 + Math.sin(angle * 1.3) * 0.12;
                element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
            });
        };

        const loop = (time: number) => {
            place(time);
            frame = requestAnimationFrame(loop);
        };

        const update = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (reduceMotion || !visible || document.hidden) {
                place(0);
                return;
            }
            frame = requestAnimationFrame(loop);
        };

        const resizeObserver = new ResizeObserver(() => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            if (!frame) place(0);
        });
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        });
        intersectionObserver.observe(container);
        document.addEventListener("visibilitychange", update);
        place(0);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, [reduceMotion, blobs, speed]);

    return (
        <section
            ref={containerRef}
            className={`relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-white px-6 py-20 dark:bg-slate-950 ${className}`}
        >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                {blobs.map((blob, index) => (
                    <div
                        key={index}
                        ref={(element) => {
                            blobRefs.current[index] = element;
                        }}
                        className={`absolute left-0 top-0 rounded-full blur-3xl will-change-transform ${blob.className}`}
                    />
                ))}
                {/* A thin bright band gives the aurora its curtain-like edge. */}
                <div className="absolute inset-x-0 top-[38%] h-24 -skew-y-6 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-2xl dark:via-emerald-200/10"/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white dark:via-slate-950/30 dark:to-slate-950"/>
            </div>

            {children}
        </section>
    );
};
