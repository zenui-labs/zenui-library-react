import {useRef} from "react";
import type {ComponentType, ReactNode} from "react";
import {motion, useReducedMotion, useScroll, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

export interface Trail {
    name: string;
    /** Already formatted, for example "9.4 km". */
    distance: string;
    /** Elevation gain, already formatted, for example "410 m". */
    climb: string;
    icon: ComponentType<{className?: string}>;
}

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

export interface TrailRowProps {
    trail: Trail;
}

/** One route in the list under the hero. */
export const TrailRow = ({trail}: TrailRowProps) => {
    const Icon = trail.icon;
    return (
        <li className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-800">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                <Icon className="h-5 w-5"/>
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{trail.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{trail.distance}, {trail.climb} climb</p>
            </div>
        </li>
    );
};

export interface ParallaxLayersProps {
    trails: Trail[];
    /** Small label above the hero title. */
    eyebrow?: string;
    title?: string;
    /** Hint under the hero title. */
    hint?: string;
    /** Heading of the list under the hero. */
    listTitle?: string;
    /** Short note under the list heading. */
    listDescription?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

// Each layer of the scene moves at its own speed as the hero scrolls out of the panel.
// The title sinks behind the ridges because they come later in the markup.
// With reduced motion the scene stays still and only the title fades.
export const ParallaxLayers = ({
    trails,
    eyebrow = "Summer 2026 trail guide",
    title = "Into the high country",
    hint = "Scroll to walk down the valley",
    listTitle = "Three routes for this weekend",
    listDescription,
    ariaLabel = "Trail guide, scroll to explore",
    className = "",
}: ParallaxLayersProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const {scrollYProgress} = useScroll({container: containerRef, target: heroRef, offset: ["start start", "end start"]});

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 220]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                className="relative h-[440px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500"
            >
                <section ref={heroRef} className="relative h-[440px] overflow-hidden bg-gradient-to-b from-sky-300 via-orange-100 to-rose-100 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950">
                    <Layer progress={scrollYProgress} depth={180} still={reduceMotion} className="top-16 flex justify-end pr-[18%]">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-b from-amber-200 to-orange-400 shadow-[0_0_80px_rgba(251,146,60,0.7)] dark:from-slate-100 dark:to-slate-300 dark:shadow-[0_0_60px_rgba(226,232,240,0.4)]"/>
                    </Layer>

                    <motion.div style={{y: reduceMotion ? 0 : titleY, opacity: titleOpacity}} className="relative px-6 pt-12 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 dark:text-orange-300">{eyebrow}</p>
                        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">{title}</h2>
                        <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">{hint}</p>
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{listTitle}</h3>
                    {listDescription && <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{listDescription}</p>}
                    <ul className="mt-5 space-y-3">
                        {trails.map((trail) => (
                            <TrailRow key={trail.name} trail={trail}/>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};
