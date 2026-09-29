import {useRef} from "react";
import type {ReactNode} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuMountain, LuTent, LuTrees} from "react-icons/lu";
import type {IconType} from "react-icons";

interface Trail {
    name: string;
    distance: string;
    climb: string;
    icon: IconType;
}

const trails: Trail[] = [
    {name: "Larch Lake loop", distance: "9.4 km", climb: "410 m", icon: LuTrees},
    {name: "Grey Ridge traverse", distance: "16.2 km", climb: "1,080 m", icon: LuMountain},
    {name: "Cedar Flats camp", distance: "5.8 km", climb: "120 m", icon: LuTent},
];

interface LayerProps {
    progress: MotionValue<number>;
    /** Pixels the layer sinks while the hero scrolls away. Far layers sink more than near ones. */
    depth: number;
    still: boolean;
    className: string;
    children: ReactNode;
}

const Layer = ({progress, depth, still, className, children}: LayerProps) => {
    const y = useTransform(progress, [0, 1], [0, depth]);
    return (
        <motion.div aria-hidden="true" style={{y: still ? 0 : y}} className={`absolute inset-x-0 ${className}`}>
            {children}
        </motion.div>
    );
};

const Ridge = ({d, className}: {d: string; className: string}) => (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" className={`block w-full ${className}`}>
        <path d={d} fill="currentColor"/>
    </svg>
);

// Each layer of the scene moves at its own speed as the hero scrolls out of the panel.
// The title sinks behind the ridges because they come later in the markup.
// With reduced motion the scene stays still and only the title fades.
const ParallaxLayers = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const {scrollYProgress} = useScroll({container: containerRef, target: heroRef, offset: ["start start", "end start"]});

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 220]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label="Trail guide, scroll to explore"
                className="relative h-[440px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500"
            >
                <section ref={heroRef} className="relative h-[440px] overflow-hidden bg-gradient-to-b from-sky-300 via-orange-100 to-rose-100 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950">
                    <Layer progress={scrollYProgress} depth={180} still={reduceMotion} className="top-16 flex justify-end pr-[18%]">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-b from-amber-200 to-orange-400 shadow-[0_0_80px_rgba(251,146,60,0.7)] dark:from-slate-100 dark:to-slate-300 dark:shadow-[0_0_60px_rgba(226,232,240,0.4)]"/>
                    </Layer>

                    <motion.div style={{y: reduceMotion ? 0 : titleY, opacity: titleOpacity}} className="relative px-6 pt-12 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 dark:text-orange-300">Summer 2026 trail guide</p>
                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Into the high country</h2>
                        <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">Scroll to walk down the valley</p>
                    </motion.div>

                    <Layer progress={scrollYProgress} depth={130} still={reduceMotion} className="bottom-24">
                        <Ridge className="h-40 text-indigo-300 dark:text-indigo-900" d="M0 120 L0 60 L40 38 L80 58 L130 12 L175 50 L215 30 L260 64 L310 20 L360 52 L400 34 L400 120 Z"/>
                    </Layer>
                    <Layer progress={scrollYProgress} depth={80} still={reduceMotion} className="bottom-8">
                        <Ridge className="h-36 text-indigo-500 dark:text-indigo-800" d="M0 120 L0 70 L55 40 L100 72 L150 34 L205 78 L250 46 L300 80 L350 44 L400 66 L400 120 Z"/>
                    </Layer>
                    <Layer progress={scrollYProgress} depth={36} still={reduceMotion} className="-bottom-px">
                        <Ridge className="h-28 text-slate-700 dark:text-slate-800" d="M0 120 L0 80 L30 62 L60 78 L95 50 L140 86 L185 64 L230 90 L270 58 L320 84 L360 66 L400 82 L400 120 Z"/>
                    </Layer>
                    <Layer progress={scrollYProgress} depth={8} still={reduceMotion} className="-bottom-px">
                        <Ridge className="h-16 text-white dark:text-slate-950" d="M0 120 L0 90 C 60 70, 120 96, 190 82 C 260 68, 330 94, 400 80 L400 120 Z"/>
                    </Layer>
                </section>

                <section className="px-6 pb-10 pt-4 sm:px-10">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Three routes for this weekend</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">Snow has cleared below 2,000 m. Trailheads open at 6 am.</p>
                    <ul className="mt-5 space-y-3">
                        {trails.map((trail) => {
                            const Icon = trail.icon;
                            return (
                                <li key={trail.name} className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-800">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                                        <Icon className="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{trail.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">{trail.distance}, {trail.climb} climb</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default ParallaxLayers;
