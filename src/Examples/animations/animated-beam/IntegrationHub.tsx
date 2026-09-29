import {useCallback, useEffect, useId, useRef, useState, type ComponentType} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

export type IconComponent = ComponentType<{className?: string}>;

export interface HubNode {
    /** Unique key, also used to match the node with its beam. */
    id: string;
    label: string;
    icon: IconComponent;
}

export interface HubCenter {
    label: string;
    icon: IconComponent;
}

export interface IntegrationHubProps {
    /** Nodes on the left. Their beams run into the hub. */
    sources: HubNode[];
    /** Nodes on the right. Their beams run out of the hub. */
    destinations: HubNode[];
    hub: HubCenter;
    /** Text under the diagram. */
    caption?: string;
    /** Three colors for the moving pulse, from left to right. */
    beamColors?: [string, string, string];
    /** Seconds one pulse takes to travel a beam. */
    duration?: number;
    className?: string;
}

interface Beam {
    id: string;
    d: string;
}

interface Point {
    x: number;
    y: number;
}

// A soft S-curve between two points, bending horizontally.
const curve = (from: Point, to: Point) => {
    const mid = from.x + (to.x - from.x) / 2;
    return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
};

interface NodeBubbleProps {
    node: HubNode;
    setRef: (element: HTMLDivElement | null) => void;
}

const NodeBubble = ({node, setRef}: NodeBubbleProps) => {
    const Icon = node.icon;
    return (
        <div className="relative flex flex-col items-center">
            <div
                ref={setRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
                <Icon className="h-5 w-5" aria-hidden="true"/>
            </div>
            <span className="absolute top-full mt-1.5 whitespace-nowrap text-xs text-gray-500 dark:text-slate-400">{node.label}</span>
        </div>
    );
};

/** Pulses travel along curved beams from the sources into a hub, then out to the destinations. */
export const IntegrationHub = ({
    sources,
    destinations,
    hub,
    caption,
    beamColors = ["#6366f1", "#a855f7", "#22d3ee"],
    duration = 2.4,
    className = "",
}: IntegrationHubProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [size, setSize] = useState({width: 0, height: 0});
    const [beams, setBeams] = useState<Beam[]>([]);

    const gradientId = `beam-${useId().replace(/:/g, "")}`;
    const inView = useInView(containerRef);
    const reduceMotion = useReducedMotion();
    const animated = inView && !reduceMotion;
    const HubIcon = hub.icon;

    // Measure node centers relative to the container and rebuild the curves.
    const measure = useCallback(() => {
        const container = containerRef.current;
        const hubElement = hubRef.current;
        if (!container || !hubElement) return;

        const box = container.getBoundingClientRect();
        const center = (element: HTMLElement): Point => {
            const rect = element.getBoundingClientRect();
            return {x: rect.left - box.left + rect.width / 2, y: rect.top - box.top + rect.height / 2};
        };
        const hubCenter = center(hubElement);
        const next: Beam[] = [];

        for (const node of sources) {
            const element = nodeRefs.current[node.id];
            if (element) next.push({id: node.id, d: curve(center(element), hubCenter)});
        }
        for (const node of destinations) {
            const element = nodeRefs.current[node.id];
            if (element) next.push({id: node.id, d: curve(hubCenter, center(element))});
        }

        setSize({width: box.width, height: box.height});
        setBeams(next);
    }, [sources, destinations]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, [measure]);

    return (
        <figure className={`w-full max-w-2xl ${className}`}>
            <div ref={containerRef} className="relative flex h-72 items-center justify-between px-2 sm:px-8">
                <svg
                    aria-hidden="true"
                    width={size.width}
                    height={size.height}
                    viewBox={`0 0 ${size.width || 1} ${size.height || 1}`}
                    className="pointer-events-none absolute inset-0"
                >
                    <defs>
                        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={size.width} y2="0">
                            <stop offset="0%" stopColor={beamColors[0]}/>
                            <stop offset="50%" stopColor={beamColors[1]}/>
                            <stop offset="100%" stopColor={beamColors[2]}/>
                        </linearGradient>
                    </defs>
                    {beams.map((beam, index) => (
                        <g key={beam.id}>
                            <path d={beam.d} fill="none" strokeWidth={2} className="stroke-gray-200 dark:stroke-slate-800"/>
                            {animated && (
                                <motion.path
                                    d={beam.d}
                                    fill="none"
                                    stroke={`url(#${gradientId})`}
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    initial={{pathLength: 0.2, pathOffset: -0.2}}
                                    animate={{pathOffset: 1}}
                                    transition={{
                                        duration,
                                        // Sources fire first, then the hub forwards to each destination.
                                        delay: index < sources.length ? index * 0.4 : 1.4 + (index - sources.length) * 0.4,
                                        ease: [0.45, 0, 0.55, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1.2,
                                    }}
                                />
                            )}
                            {reduceMotion && (
                                <path d={beam.d} fill="none" stroke={`url(#${gradientId})`} strokeWidth={2} opacity={0.5}/>
                            )}
                        </g>
                    ))}
                </svg>

                <div className="relative flex flex-col gap-10">
                    {sources.map((node) => (
                        <NodeBubble key={node.id} node={node} setRef={(element) => {
                            nodeRefs.current[node.id] = element;
                        }}/>
                    ))}
                </div>

                <div className="relative flex flex-col items-center">
                    {animated && (
                        <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-3xl bg-indigo-500/30 dark:bg-indigo-400/30"
                            initial={{scale: 1, opacity: 0.6}}
                            animate={{scale: 1.5, opacity: 0}}
                            transition={{duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1.6}}
                        />
                    )}
                    <div
                        ref={hubRef}
                        className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-950/60"
                    >
                        <HubIcon className="h-8 w-8" aria-hidden="true"/>
                    </div>
                    <span className="absolute top-full mt-2 text-sm font-medium text-gray-900 dark:text-white">{hub.label}</span>
                </div>

                <div className="relative flex flex-col gap-16">
                    {destinations.map((node) => (
                        <NodeBubble key={node.id} node={node} setRef={(element) => {
                            nodeRefs.current[node.id] = element;
                        }}/>
                    ))}
                </div>
            </div>
            {caption && (
                <figcaption className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">{caption}</figcaption>
            )}
        </figure>
    );
};
