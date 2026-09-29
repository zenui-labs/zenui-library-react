import {useCallback, useEffect, useId, useRef, useState} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuDatabase, LuFigma, LuGithub, LuMail, LuSlack, LuWorkflow} from "react-icons/lu";

interface Node {
    id: string;
    label: string;
    icon: IconType;
}

const sources: Node[] = [
    {id: "github", label: "Commits", icon: LuGithub},
    {id: "figma", label: "Designs", icon: LuFigma},
    {id: "slack", label: "Messages", icon: LuSlack},
];

const destinations: Node[] = [
    {id: "warehouse", label: "Warehouse", icon: LuDatabase},
    {id: "digest", label: "Weekly digest", icon: LuMail},
];

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
    node: Node;
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

const IntegrationHub = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [size, setSize] = useState({width: 0, height: 0});
    const [beams, setBeams] = useState<Beam[]>([]);

    const gradientId = `beam-${useId().replace(/:/g, "")}`;
    const inView = useInView(containerRef);
    const reduceMotion = useReducedMotion();
    const animated = inView && !reduceMotion;

    // Measure node centers relative to the container and rebuild the curves.
    const measure = useCallback(() => {
        const container = containerRef.current;
        const hub = hubRef.current;
        if (!container || !hub) return;

        const box = container.getBoundingClientRect();
        const center = (element: HTMLElement): Point => {
            const rect = element.getBoundingClientRect();
            return {x: rect.left - box.left + rect.width / 2, y: rect.top - box.top + rect.height / 2};
        };
        const hubCenter = center(hub);
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
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        return () => observer.disconnect();
    }, [measure]);

    return (
        <figure className="w-full max-w-2xl">
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
                            <stop offset="0%" stopColor="#6366f1"/>
                            <stop offset="50%" stopColor="#a855f7"/>
                            <stop offset="100%" stopColor="#22d3ee"/>
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
                                        duration: 2.4,
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
                        <LuWorkflow className="h-8 w-8" aria-hidden="true"/>
                    </div>
                    <span className="absolute top-full mt-2 text-sm font-medium text-gray-900 dark:text-white">Relay</span>
                </div>

                <div className="relative flex flex-col gap-16">
                    {destinations.map((node) => (
                        <NodeBubble key={node.id} node={node} setRef={(element) => {
                            nodeRefs.current[node.id] = element;
                        }}/>
                    ))}
                </div>
            </div>
            <figcaption className="mt-8 text-center text-sm text-gray-500 dark:text-slate-400">
                Relay collects events from your tools and routes them to your warehouse and inbox.
            </figcaption>
        </figure>
    );
};

export default IntegrationHub;
