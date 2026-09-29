import {useEffect, useId, useRef} from "react";
import type {PointerEvent} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import {LuPlay} from "react-icons/lu";

interface Ray {
    /** Resting angle in degrees from straight down, how far it sways, and how long one sway takes. */
    angle: number;
    sway: number;
    period: number;
    width: string;
    className: string;
}

const rays: Ray[] = [
    {angle: -32, sway: 4, period: 9, width: "w-24 sm:w-40", className: "from-amber-300/50 dark:from-amber-200/25"},
    {angle: -14, sway: 3, period: 11, width: "w-16 sm:w-28", className: "from-orange-200/60 dark:from-orange-100/20"},
    {angle: 2, sway: 5, period: 13, width: "w-28 sm:w-48", className: "from-yellow-200/60 dark:from-yellow-100/25"},
    {angle: 18, sway: 3, period: 10, width: "w-14 sm:w-24", className: "from-amber-200/60 dark:from-amber-100/20"},
    {angle: 34, sway: 4, period: 12, width: "w-24 sm:w-36", className: "from-orange-300/40 dark:from-orange-200/20"},
];

// Beams of light fall from above and sway slowly, film grain sits on top,
// and a soft spotlight follows the pointer across the stage.
const LightBeams = () => {
    const containerRef = useRef<HTMLElement>(null);
    const rayRefs = useRef<(HTMLDivElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const filterId = `grain-${useId().replace(/:/g, "")}`;
    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const spotX = useSpring(targetX, {stiffness: 60, damping: 20});
    const spotY = useSpring(targetY, {stiffness: 60, damping: 20});

    // Start the spotlight in the middle of the section.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        targetX.jump(container.offsetWidth / 2);
        targetY.jump(container.offsetHeight * 0.45);
        spotX.jump(container.offsetWidth / 2);
        spotY.jump(container.offsetHeight * 0.45);
    }, [targetX, targetY, spotX, spotY]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        let frame = 0;
        let visible = false;

        const place = (time: number) => {
            const seconds = time / 1000;
            rays.forEach((ray, index) => {
                const element = rayRefs.current[index];
                if (!element) return;
                const angle = ray.angle + Math.sin((seconds / ray.period) * Math.PI * 2 + index) * ray.sway;
                const opacity = 0.75 + Math.sin((seconds / (ray.period * 0.7)) * Math.PI * 2 + index * 2) * 0.25;
                element.style.transform = `translateX(-50%) rotate(${angle}deg)`;
                element.style.opacity = opacity.toFixed(3);
            });
        };

        const loop = (time: number) => {
            place(time);
            frame = requestAnimationFrame(loop);
        };

        const update = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (!reduceMotion && visible && !document.hidden) frame = requestAnimationFrame(loop);
            else place(0);
        };

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            update();
        });
        observer.observe(container);
        document.addEventListener("visibilitychange", update);
        place(0);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            document.removeEventListener("visibilitychange", update);
        };
    }, [reduceMotion]);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        targetX.set(event.clientX - rect.left);
        targetY.set(event.clientY - rect.top);
    };

    return (
        <section
            ref={containerRef}
            onPointerMove={handlePointerMove}
            className="relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-stone-100 px-6 py-20 dark:bg-stone-950"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                {rays.map((ray, index) => (
                    <div
                        key={index}
                        ref={(element) => {
                            rayRefs.current[index] = element;
                        }}
                        style={{transformOrigin: "50% 0%"}}
                        className={`absolute -top-10 left-1/2 h-[140%] bg-gradient-to-b to-transparent blur-2xl will-change-transform ${ray.width} ${ray.className}`}
                    />
                ))}

                <motion.div
                    style={{x: spotX, y: spotY}}
                    className="absolute left-0 top-0 h-[520px] w-[520px]"
                >
                    <div className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(253,230,138,0.14),transparent_60%)]"/>
                </motion.div>

                {/* Static film grain. It is drawn once, so it costs nothing per frame. */}
                <svg className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-screen">
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                        <feColorMatrix type="saturate" values="0"/>
                    </filter>
                    <rect width="100%" height="100%" filter={`url(#${filterId})`}/>
                </svg>

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-100 to-transparent dark:from-stone-950"/>
            </div>

            <div className="relative max-w-xl text-center">
                <p className="text-sm font-medium tracking-wide text-amber-700 dark:text-amber-300">Lumen Studio</p>
                <h2 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 dark:text-stone-50 sm:text-6xl">
                    Light every scene like a cinematographer
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-stone-600 dark:text-stone-400">
                    140 lighting presets built with working gaffers, from golden hour to neon alley. Drop them onto any 3D scene.
                </p>
                <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-stone-900 py-2 pl-2 pr-5 text-sm font-medium text-stone-50 shadow-xl shadow-amber-900/10 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-amber-50 dark:focus-visible:ring-offset-stone-950"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-stone-900">
                        <LuPlay className="ml-0.5 h-3.5 w-3.5" aria-hidden="true"/>
                    </span>
                    Watch the 90-second reel
                </button>
            </div>
        </section>
    );
};

export default LightBeams;
