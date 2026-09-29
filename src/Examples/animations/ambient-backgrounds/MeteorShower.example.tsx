import {useMemo, useRef} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

interface Meteor {
    id: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
    length: number;
}

const createMeteors = (count: number): Meteor[] =>
    Array.from({length: count}, (_, id) => ({
        id,
        top: Math.random() * 45 - 10,
        left: Math.random() * 110,
        delay: Math.random() * 6,
        duration: 2.4 + Math.random() * 2.2,
        length: 60 + Math.random() * 90,
    }));

const createStars = (count: number) =>
    Array.from({length: count}, (_, id) => ({
        id,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() > 0.8 ? 2 : 1,
    }));

// Streaks fall at a fixed angle from random points near the top edge.
// Meteors are only rendered while the section is on screen.
const MeteorShower = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const meteors = useMemo(() => createMeteors(18), []);
    const stars = useMemo(() => createStars(60), []);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 to-white px-6 dark:from-slate-950 dark:to-indigo-950"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {stars.map((star) => (
                    <span
                        key={star.id}
                        className="absolute rounded-full bg-slate-400/50 dark:bg-white/60"
                        style={{top: `${star.top}%`, left: `${star.left}%`, width: star.size, height: star.size}}
                    />
                ))}

                {inView && !reduceMotion && meteors.map((meteor) => (
                    // The wrapper sets the angle; the streak travels along its own x axis.
                    <div
                        key={meteor.id}
                        className="absolute rotate-[-35deg]"
                        style={{top: `${meteor.top}%`, left: `${meteor.left}%`}}
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

            <div className="relative max-w-lg text-center">
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Launch week, day 3</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Edge functions now run in 34 regions
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                    Deploy once and serve every request from the region closest to your users.
                </p>
                <div className="mt-8 flex justify-center gap-3">
                    <button
                        type="button"
                        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        Read the changelog
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MeteorShower;
