import {useMemo, useRef} from "react";
import type {ReactNode} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

interface Meteor {
    id: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
    length: number;
}

const createMeteors = (count: number, speed: number): Meteor[] =>
    Array.from({length: count}, (_, id) => ({
        id,
        top: Math.random() * 45 - 10,
        left: Math.random() * 110,
        delay: Math.random() * 6,
        duration: (2.4 + Math.random() * 2.2) / speed,
        length: 60 + Math.random() * 90,
    }));

const createStars = (count: number) =>
    Array.from({length: count}, (_, id) => ({
        id,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() > 0.8 ? 2 : 1,
    }));

export interface MeteorShowerProps {
    /** Content shown above the meteors, such as a hero message. */
    children?: ReactNode;
    /** Number of meteors falling at once. */
    meteorCount?: number;
    /** Number of fixed background stars. */
    starCount?: number;
    /** Speed multiplier. 2 falls twice as fast, 0.5 half as fast. */
    speed?: number;
    /** Fall angle in degrees. Negative values fall toward the bottom left. */
    angle?: number;
    /** Tailwind classes for the background stars. */
    starClassName?: string;
    className?: string;
}

// Streaks fall at a fixed angle from random points near the top edge.
// Meteors are only rendered while the section is on screen.
export const MeteorShower = ({
    children,
    meteorCount = 18,
    starCount = 60,
    speed = 1,
    angle = -35,
    starClassName = "bg-slate-400/50 dark:bg-white/60",
    className = "",
}: MeteorShowerProps) => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const meteors = useMemo(() => createMeteors(meteorCount, speed), [meteorCount, speed]);
    const stars = useMemo(() => createStars(starCount), [starCount]);

    return (
        <section
            ref={ref}
            className={`relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 to-white px-6 dark:from-slate-950 dark:to-indigo-950 ${className}`}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {stars.map((star) => (
                    <span
                        key={star.id}
                        className={`absolute rounded-full ${starClassName}`}
                        style={{top: `${star.top}%`, left: `${star.left}%`, width: star.size, height: star.size}}
                    />
                ))}

                {inView && !reduceMotion && meteors.map((meteor) => (
                    // The wrapper sets the angle; the streak travels along its own x axis.
                    <div
                        key={meteor.id}
                        className="absolute"
                        style={{top: `${meteor.top}%`, left: `${meteor.left}%`, transform: `rotate(${angle}deg)`}}
                    >
                        <motion.span
                            className="relative block h-px rounded-full bg-gradient-to-r from-slate-500 to-transparent dark:from-white"
                            style={{width: meteor.length}}
                            initial={{x: 0, opacity: 0}}
                            animate={{x: -700, opacity: [0, 1, 1, 0]}}
                            transition={{
                                duration: meteor.duration,
                                delay: meteor.delay,
                                ease: "linear",
                                repeat: Infinity,
                                repeatDelay: 1 + meteor.delay / 2,
                                opacity: {times: [0, 0.1, 0.7, 1], duration: meteor.duration, delay: meteor.delay, repeat: Infinity, repeatDelay: 1 + meteor.delay / 2},
                            }}
                        >
                            {/* Bright head at the leading end. */}
                            <span className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-slate-600 shadow-[0_0_6px_2px_rgba(100,116,139,0.4)] dark:bg-white dark:shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"/>
                        </motion.span>
                    </div>
                ))}
            </div>

            {children}
        </section>
    );
};
