import {useEffect, useRef} from "react";
import {useReducedMotion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

interface Blob {
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

const blobs: Blob[] = [
    {className: "h-[70%] w-[55%] bg-emerald-300/70 dark:bg-emerald-500/40", x: 0.15, y: 0.1, driftX: 0.12, driftY: 0.08, period: 23, phase: 0},
    {className: "h-[60%] w-[50%] bg-cyan-300/70 dark:bg-cyan-500/40", x: 0.45, y: 0.0, driftX: 0.14, driftY: 0.1, period: 29, phase: 1.7},
    {className: "h-[65%] w-[45%] bg-violet-300/70 dark:bg-violet-600/45", x: 0.7, y: 0.2, driftX: 0.1, driftY: 0.12, period: 19, phase: 3.1},
    {className: "h-[50%] w-[40%] bg-pink-300/60 dark:bg-fuchsia-600/35", x: 0.3, y: 0.45, driftX: 0.16, driftY: 0.06, period: 31, phase: 4.4},
];

// Soft blurred color fields drift on slow, out-of-sync loops, like the northern lights.
// The blobs only move with transforms, and the loop stops when the section is hidden or off screen.
const AuroraBackground = () => {
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
            const seconds = time / 1000;
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
    }, [reduceMotion]);

    return (
        <section
            ref={containerRef}
            className="relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-white px-6 py-20 dark:bg-slate-950"
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

            <div className="relative max-w-2xl text-center">
                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-600/15 bg-white/60 px-3 py-1 text-xs font-medium text-emerald-800 backdrop-blur dark:border-emerald-300/20 dark:bg-slate-900/50 dark:text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                    Version 2.0 is out
                </p>
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                    Notes that write back
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
                    Nightfall links every meeting note to the tasks, docs and people it mentions, then reminds you before anything slips.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                        href="#download"
                        onClick={(event) => event.preventDefault()}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                    >
                        Download for Mac
                        <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                    </a>
                    <a
                        href="#changelog"
                        onClick={(event) => event.preventDefault()}
                        className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                        Read what's new
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AuroraBackground;
