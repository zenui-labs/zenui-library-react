import {useEffect, useRef, type ComponentType, type ReactNode} from "react";
import {motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuZap} from "react-icons/lu";

export type IconComponent = ComponentType<{className?: string}>;

export interface OrbitApp {
    id: string;
    label: string;
    icon: IconComponent;
    /** Position on the ring in degrees, 0 is to the right. */
    angle: number;
    /** Whether data flows from the hub to the app, or from the app to the hub. */
    outbound: boolean;
}

export interface OrbitRing {
    /** Diameter as a share of the whole diagram, from 0 to 1. */
    size: number;
    /** Degrees per second. Negative spins counterclockwise. */
    speed: number;
    /** Width of the spokes in the ring's 100 unit coordinate space. */
    stroke: number;
    apps: OrbitApp[];
}

export interface OrbitNetworkProps {
    innerRing: OrbitRing;
    outerRing: OrbitRing;
    hubIcon?: IconComponent;
    /** Text under the diagram. Screen readers also hear the list of connected apps. */
    caption?: ReactNode;
    className?: string;
}

const point = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    return {x: 50 + 50 * Math.cos(radians), y: 50 + 50 * Math.sin(radians)};
};

interface OrbitProps {
    ring: OrbitRing;
    rotate: MotionValue<number>;
    animated: boolean;
    /** Extra seconds before this ring's first pulse, so the rings do not fire together. */
    delayOffset: number;
}

// One ring. Lines and beams live inside the rotating layer, so they turn with the apps for free.
// Each app spins the other way to stay upright.
const Orbit = ({ring, rotate, animated, delayOffset}: OrbitProps) => {
    const counter = useTransform(rotate, (value) => -value);
    const size = `${ring.size * 100}%`;

    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            style={{width: size, height: size, x: "-50%", y: "-50%", rotate}}
        >
            <div aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-gray-300 dark:border-slate-700"/>
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                {ring.apps.map((app, index) => {
                    const end = point(app.angle);
                    const [from, to] = app.outbound ? [{x: 50, y: 50}, end] : [end, {x: 50, y: 50}];
                    return (
                        <g key={app.id}>
                            <line x1={50} y1={50} x2={end.x} y2={end.y} strokeWidth={ring.stroke} className="stroke-gray-200 dark:stroke-slate-800"/>
                            {animated && (
                                <motion.line
                                    x1={from.x}
                                    y1={from.y}
                                    x2={to.x}
                                    y2={to.y}
                                    strokeWidth={ring.stroke * 1.8}
                                    strokeLinecap="round"
                                    className={app.outbound ? "stroke-cyan-400" : "stroke-violet-500 dark:stroke-violet-400"}
                                    initial={{pathLength: 0.3, pathOffset: -0.3, opacity: 0}}
                                    animate={{pathOffset: [-0.3, 1], opacity: [0, 1, 1, 0]}}
                                    transition={{
                                        duration: 1.8,
                                        ease: [0.45, 0, 0.55, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1.4 + index * 0.5,
                                        delay: index * 0.7 + delayOffset,
                                        opacity: {duration: 1.8, times: [0, 0.15, 0.8, 1], repeat: Infinity, repeatDelay: 1.4 + index * 0.5, delay: index * 0.7 + delayOffset},
                                    }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>
            {ring.apps.map((app) => {
                const position = point(app.angle);
                const Icon = app.icon;
                return (
                    <motion.div
                        key={app.id}
                        className="absolute flex flex-col items-center"
                        style={{left: `${position.x}%`, top: `${position.y}%`, x: "-50%", y: "-50%", rotate: counter}}
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:h-11 sm:w-11">
                            <Icon className="h-[18px] w-[18px]" aria-hidden="true"/>
                        </span>
                        <span className="absolute top-full mt-1 whitespace-nowrap rounded-full bg-white/80 px-1.5 text-[10px] font-medium text-gray-500 backdrop-blur dark:bg-slate-950/70 dark:text-slate-400">
                            {app.label}
                        </span>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

/**
 * Connected apps circle a hub on two rings that turn at their own speeds.
 * Violet pulses flow into the hub and cyan pulses flow back out. Motion stops while off screen.
 */
export const OrbitNetwork = ({innerRing, outerRing, hubIcon: HubIcon = LuZap, caption, className = ""}: OrbitNetworkProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const inner = useMotionValue(0);
    const outer = useMotionValue(0);
    const animated = inView && !reduceMotion;
    const innerSpeed = innerRing.speed;
    const outerSpeed = outerRing.speed;

    useEffect(() => {
        if (!animated) return;
        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            const seconds = Math.min(0.05, (now - last) / 1000);
            last = now;
            inner.set(inner.get() + innerSpeed * seconds);
            outer.set(outer.get() + outerSpeed * seconds);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [animated, inner, outer, innerSpeed, outerSpeed]);

    const allApps = [...innerRing.apps, ...outerRing.apps];
    const appList = <span className="sr-only"> Connected apps: {allApps.map((app) => app.label).join(", ")}.</span>;

    return (
        <figure className={`w-full max-w-md ${className}`}>
            <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[400px]">
                <Orbit ring={outerRing} rotate={outer} animated={animated} delayOffset={0.35}/>
                <Orbit ring={innerRing} rotate={inner} animated={animated} delayOffset={0}/>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {animated && (
                        <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-violet-500/30"
                            animate={{scale: [1, 1.7], opacity: [0.5, 0]}}
                            transition={{duration: 2.4, repeat: Infinity, ease: "easeOut"}}
                        />
                    )}
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/40 ring-4 ring-white dark:shadow-violet-950/60 dark:ring-slate-950 sm:h-20 sm:w-20">
                        <HubIcon className="h-7 w-7" aria-hidden="true"/>
                    </span>
                </div>
            </div>
            {caption ? (
                <figcaption className="mt-4 text-center text-sm text-gray-500 dark:text-slate-400">
                    {caption}
                    {appList}
                </figcaption>
            ) : (
                <figcaption className="sr-only">{appList}</figcaption>
            )}
        </figure>
    );
};
