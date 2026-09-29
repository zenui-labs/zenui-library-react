import {useCallback, useEffect, useId, useRef, useState, type ComponentType} from "react";
import {animate, AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuInbox} from "react-icons/lu";

export type IconComponent = ComponentType<{className?: string}>;

export interface InboxChannel {
    id: string;
    label: string;
    icon: IconComponent;
    /** Messages this channel delivers, shown in turn as its pulses arrive. */
    samples: string[];
}

export interface FanInInboxProps {
    /** Channels across the top. The first sample of the first channel is shown before anything arrives. */
    channels: InboxChannel[];
    /** Counter value before the first arrival. */
    startCount?: number;
    title?: string;
    /** Text after the counter. */
    countLabel?: string;
    inboxIcon?: IconComponent;
    /** Text under the diagram. */
    caption?: string;
    /** Two colors for the moving pulse, from top to bottom. */
    beamColors?: [string, string];
    /** Seconds a pulse takes to reach the inbox. */
    duration?: number;
    className?: string;
}

interface Point {
    x: number;
    y: number;
}

interface Pulse {
    id: number;
    channel: number;
}

// A vertical S-curve from a source above down into the inbox.
const curve = (from: Point, to: Point) => {
    const mid = from.y + (to.y - from.y) * 0.55;
    return `M ${from.x} ${from.y} C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
};

// Counts up without re-rendering React on every frame.
const Count = ({value}: {value: number}) => {
    const motionValue = useMotionValue(value);
    const text = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString("en-US"));
    useEffect(() => {
        const controls = animate(motionValue, value, {duration: 0.5, ease: "easeOut"});
        return () => controls.stop();
    }, [motionValue, value]);
    return <motion.span className="tabular-nums">{text}</motion.span>;
};

/**
 * Conversations from several channels travel down curved beams into one inbox.
 * Each arrival bumps the counter and shows the newest message. Nothing runs while off screen.
 */
export const FanInInbox = ({
    channels,
    startCount = 0,
    title = "Shared inbox",
    countLabel = "conversations today",
    inboxIcon: InboxIcon = LuInbox,
    caption,
    beamColors = ["#38bdf8", "#6366f1"],
    duration = 1.1,
    className = "",
}: FanInInboxProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [size, setSize] = useState({width: 0, height: 0});
    const [paths, setPaths] = useState<string[]>([]);
    const [pulses, setPulses] = useState<Pulse[]>([]);
    const [count, setCount] = useState(startCount);
    const [latest, setLatest] = useState({id: 0, text: channels[0]?.samples[0] ?? "", channel: 0});
    const hubScale = useMotionValue(1);
    const nextId = useRef(1);
    const sampleIndex = useRef<number[]>(channels.map(() => 0));

    const gradientId = `fan-${useId().replace(/:/g, "")}`;
    const inView = useInView(containerRef);
    const reduceMotion = useReducedMotion();

    const measure = useCallback(() => {
        const container = containerRef.current;
        const hub = hubRef.current;
        if (!container || !hub) return;
        const box = container.getBoundingClientRect();
        const hubRect = hub.getBoundingClientRect();
        const target: Point = {x: hubRect.left - box.left + hubRect.width / 2, y: hubRect.top - box.top};
        const next = nodeRefs.current.slice(0, channels.length).map((element) => {
            if (!element) return "";
            const rect = element.getBoundingClientRect();
            return curve({x: rect.left - box.left + rect.width / 2, y: rect.bottom - box.top}, target);
        });
        setSize({width: box.width, height: box.height});
        setPaths(next);
    }, [channels.length]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, [measure]);

    const deliver = useCallback((channelIndex: number, id: number) => {
        const channel = channels[channelIndex];
        const position = sampleIndex.current[channelIndex] ?? 0;
        sampleIndex.current[channelIndex] = position + 1;
        const sample = channel.samples[position % channel.samples.length];
        setCount((value) => value + 1);
        setLatest({id, text: sample, channel: channelIndex});
        animate(hubScale, [1.035, 1], {duration: 0.45, ease: "easeOut"});
    }, [channels, hubScale]);

    // Fire a pulse from a random channel at an uneven rhythm.
    // With reduced motion there are no beams, so messages arrive right away.
    useEffect(() => {
        if (!inView || channels.length === 0) return;
        let timer = 0;
        const schedule = () => {
            timer = window.setTimeout(() => {
                const channel = Math.floor(Math.random() * channels.length);
                const id = nextId.current++;
                if (reduceMotion) deliver(channel, id);
                else setPulses((current) => [...current, {id, channel}]);
                schedule();
            }, 550 + Math.random() * 900);
        };
        schedule();
        return () => window.clearTimeout(timer);
    }, [inView, reduceMotion, deliver, channels.length]);

    const arrive = (pulse: Pulse) => {
        setPulses((current) => current.filter((item) => item.id !== pulse.id));
        deliver(pulse.channel, pulse.id);
    };

    const LatestIcon = channels[latest.channel]?.icon;

    return (
        <figure className={`w-full max-w-xl ${className}`}>
            <div ref={containerRef} className="relative flex flex-col items-center">
                <svg
                    aria-hidden="true"
                    width={size.width}
                    height={size.height}
                    viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
                    className="pointer-events-none absolute inset-0"
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={beamColors[0]}/>
                            <stop offset="100%" stopColor={beamColors[1]}/>
                        </linearGradient>
                    </defs>
                    {paths.map((d, index) => (
                        <path key={channels[index]?.id ?? index} d={d} fill="none" strokeWidth={1.5} className="stroke-gray-200 dark:stroke-slate-800"/>
                    ))}
                    {!reduceMotion && pulses.map((pulse) => (
                        <motion.path
                            key={pulse.id}
                            d={paths[pulse.channel]}
                            fill="none"
                            stroke={`url(#${gradientId})`}
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            initial={{pathLength: 0.22, pathOffset: -0.22}}
                            animate={{pathOffset: 1}}
                            transition={{duration, ease: [0.4, 0, 0.6, 1]}}
                            onAnimationComplete={() => arrive(pulse)}
                        />
                    ))}
                </svg>

                <div className="relative flex w-full justify-between px-1 sm:px-6">
                    {channels.map((channel, index) => {
                        const Icon = channel.icon;
                        return (
                            <div key={channel.id} className="flex w-14 flex-col items-center gap-1.5">
                                <span className="text-[11px] text-gray-500 dark:text-slate-400">{channel.label}</span>
                                <div
                                    ref={(element) => {
                                        nodeRefs.current[index] = element;
                                    }}
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true"/>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <motion.div
                    ref={hubRef}
                    style={{scale: hubScale}}
                    className="relative mt-28 w-full max-w-sm rounded-2xl border border-indigo-200 bg-white p-4 shadow-xl shadow-indigo-500/10 dark:border-indigo-500/30 dark:bg-slate-900 dark:shadow-black/40"
                >
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 text-white">
                            <InboxIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                <Count value={count}/> {countLabel}
                            </p>
                        </div>
                    </div>
                    <div className="relative mt-3 h-9 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800/60">
                        <AnimatePresence initial={false}>
                            <motion.p
                                key={latest.id}
                                initial={{y: 24, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: -24, opacity: 0}}
                                transition={{type: "spring", stiffness: 380, damping: 32}}
                                className="absolute inset-0 flex items-center gap-2 px-3 text-xs text-gray-700 dark:text-slate-300"
                            >
                                {LatestIcon && <LatestIcon className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400" aria-hidden="true"/>}
                                <span className="truncate">{latest.text}</span>
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            {caption && <figcaption className="mt-4 text-center text-sm text-gray-500 dark:text-slate-400">{caption}</figcaption>}
        </figure>
    );
};
