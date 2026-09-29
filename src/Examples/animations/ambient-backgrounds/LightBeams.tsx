import {useEffect, useId, useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";

export interface LightRay {
    /** Resting angle in degrees from straight down. */
    angle: number;
    /** How far the beam sways to each side, in degrees. */
    sway: number;
    /** Seconds for one full sway. */
    period: number;
    /** Tailwind width classes for the beam. */
    width: string;
    /** Tailwind gradient start color, for example "from-amber-300/50". */
    className: string;
}

const defaultRays: LightRay[] = [
    {angle: -32, sway: 4, period: 9, width: "w-24 sm:w-40", className: "from-amber-300/50 dark:from-amber-200/25"},
    {angle: -14, sway: 3, period: 11, width: "w-16 sm:w-28", className: "from-orange-200/60 dark:from-orange-100/20"},
    {angle: 2, sway: 5, period: 13, width: "w-28 sm:w-48", className: "from-yellow-200/60 dark:from-yellow-100/25"},
    {angle: 18, sway: 3, period: 10, width: "w-14 sm:w-24", className: "from-amber-200/60 dark:from-amber-100/20"},
    {angle: 34, sway: 4, period: 12, width: "w-24 sm:w-36", className: "from-orange-300/40 dark:from-orange-200/20"},
];

export interface LightBeamsProps {
    /** Content shown above the beams. */
    children?: ReactNode;
    /** Beams that fall from the top edge. Keep the array stable (define it outside the component). */
    rays?: LightRay[];
    /** Speed multiplier for the sway. 2 sways twice as fast, 0.5 half as fast. */
    speed?: number;
    /** Draws static film grain over the beams. */
    grain?: boolean;
    className?: string;
}

// Beams of light fall from above and sway slowly, film grain sits on top,
// and a soft spotlight follows the pointer across the stage.
export const LightBeams = ({children, rays = defaultRays, speed = 1, grain = true, className = ""}: LightBeamsProps) => {
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
            const seconds = (time / 1000) * speed;
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
    }, [reduceMotion, rays, speed]);

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
            className={`relative isolate flex min-h-[460px] w-full items-center justify-center overflow-hidden bg-stone-100 px-6 py-20 dark:bg-stone-950 ${className}`}
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
                {grain && (
                    <svg className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-screen">
                        <filter id={filterId}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
                            <feColorMatrix type="saturate" values="0"/>
                        </filter>
                        <rect width="100%" height="100%" filter={`url(#${filterId})`}/>
                    </svg>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-100 to-transparent dark:from-stone-950"/>
            </div>

            {children}
        </section>
    );
};
