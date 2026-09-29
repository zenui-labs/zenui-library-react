import {useCallback, useEffect, useRef, useState} from "react";
import type {ComponentType, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuCloud, LuMousePointer, LuSmartphone} from "react-icons/lu";

type Source = "idle" | "pointer" | "device";

// iOS asks for permission before it sends orientation events. Other browsers send them without asking.
interface OrientationPermission {
    requestPermission?: () => Promise<"granted" | "denied" | "default">;
}

const getOrientationApi = (): OrientationPermission | null =>
    typeof window !== "undefined" && "DeviceOrientationEvent" in window ? (window.DeviceOrientationEvent as unknown as OrientationPermission) : null;

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export interface HourlyForecast {
    /** Label above the icon, such as "Now" or "2 PM". */
    time: string;
    icon: ComponentType<{className?: string}>;
    /** Temperature in degrees. */
    temp: number;
}

export interface MotionSensorCardLabels {
    idle: string;
    pointer: string;
    device: string;
    reducedMotion: string;
    /** Button that asks iOS for motion access. */
    enableMotion: string;
}

const defaultLabels: MotionSensorCardLabels = {
    idle: "Floating",
    pointer: "Following pointer",
    device: "Following device tilt",
    reducedMotion: "Tilt is off because reduced motion is on",
    enableMotion: "Tilt with device motion",
};

const sourceIcons: Record<Source, ComponentType<{className?: string}>> = {
    idle: LuCloud,
    pointer: LuMousePointer,
    device: LuSmartphone,
};

interface LayerProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
    depth: number;
    className: string;
    children?: ReactNode;
}

// Deeper layers move further, which gives the card its sense of depth.
const Layer = ({x, y, depth, className, children}: LayerProps) => {
    const layerX = useTransform(x, [-1, 1], [-depth, depth]);
    const layerY = useTransform(y, [-1, 1], [-depth * 0.7, depth * 0.7]);
    return (
        <motion.div aria-hidden="true" style={{x: layerX, y: layerY}} className={className}>
            {children}
        </motion.div>
    );
};

export interface MotionSensorCardProps {
    city: string;
    /** Current temperature in degrees. */
    temperature: number;
    /** Short description of the sky, such as "Partly cloudy". */
    condition: string;
    high?: number;
    low?: number;
    /** Forecast shown in the row at the bottom. Five fit best. */
    hours: HourlyForecast[];
    /** Time without pointer or device input, in ms, before the card starts drifting on its own. */
    idleAfterMs?: number;
    labels?: Partial<MotionSensorCardLabels>;
    className?: string;
}

// Tilts with the phone's gyroscope where available, with the pointer on desktop,
// and drifts on its own after a few seconds without input.
export const MotionSensorCard = ({
    city,
    temperature,
    condition,
    high,
    low,
    hours,
    idleAfterMs = 2500,
    labels,
    className = "",
}: MotionSensorCardProps) => {
    const text = {...defaultLabels, ...labels};
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion() ?? false;
    const [source, setSource] = useState<Source>("idle");
    const [needsPermission, setNeedsPermission] = useState(false);
    const [listening, setListening] = useState(false);
    const sourceRef = useRef<Source>("idle");
    const lastInput = useRef(0);

    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const x = useSpring(targetX, {stiffness: 90, damping: 18, mass: 0.8});
    const y = useSpring(targetY, {stiffness: 90, damping: 18, mass: 0.8});
    const range = reduceMotion ? 0 : 1;
    const rotateY = useTransform(x, [-1, 1], [-16 * range, 16 * range]);
    const rotateX = useTransform(y, [-1, 1], [12 * range, -12 * range]);
    const layerX = useTransform(x, (value) => value * range);
    const layerY = useTransform(y, (value) => value * range);

    const updateSource = useCallback((next: Source) => {
        if (sourceRef.current === next) return;
        sourceRef.current = next;
        setSource(next);
    }, []);

    // Browsers that do not ask for permission can start listening right away.
    useEffect(() => {
        const api = getOrientationApi();
        if (!api) return;
        if (typeof api.requestPermission === "function") setNeedsPermission(true);
        else setListening(true);
    }, []);

    useEffect(() => {
        if (!listening) return;
        const handleOrientation = (event: DeviceOrientationEvent) => {
            // Desktop browsers may fire once with empty values. Ignore those.
            if (event.beta === null || event.gamma === null) return;
            lastInput.current = performance.now();
            targetX.set(clamp(event.gamma / 30));
            targetY.set(clamp((event.beta - 45) / 30));
            updateSource("device");
        };
        window.addEventListener("deviceorientation", handleOrientation);
        return () => window.removeEventListener("deviceorientation", handleOrientation);
    }, [listening, targetX, targetY, updateSource]);

    // Idle drift, only while the card is on screen. requestAnimationFrame also pauses in background tabs.
    useEffect(() => {
        if (!inView || reduceMotion) return;
        let frame = 0;
        const loop = (time: number) => {
            if (performance.now() - lastInput.current > idleAfterMs) {
                targetX.set(Math.sin(time / 1700) * 0.55);
                targetY.set(Math.cos(time / 2300) * 0.4);
                updateSource("idle");
            }
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, idleAfterMs, targetX, targetY, updateSource]);

    const requestMotion = async () => {
        const api = getOrientationApi();
        if (!api?.requestPermission) return;
        try {
            const result = await api.requestPermission();
            setNeedsPermission(false);
            if (result === "granted") setListening(true);
        } catch {
            setNeedsPermission(false);
        }
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "touch" && sourceRef.current === "device") return;
        const rect = event.currentTarget.getBoundingClientRect();
        lastInput.current = performance.now();
        targetX.set(clamp(((event.clientX - rect.left) / rect.width) * 2 - 1));
        targetY.set(clamp(((event.clientY - rect.top) / rect.height) * 2 - 1));
        updateSource("pointer");
    };

    const StatusIcon = sourceIcons[source];
    const dayRange = [high === undefined ? "" : `high ${high}°`, low === undefined ? "" : `low ${low}°`].filter(Boolean).join(" ");

    return (
        <div ref={ref} className={`flex w-full flex-col items-center gap-5 ${className}`}>
            <div onPointerMove={handlePointerMove} className="w-full max-w-[20rem] [perspective:1000px]">
                <motion.article
                    style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                    aria-label={`Weather in ${city}: ${temperature} degrees, ${condition.toLowerCase()}`}
                    className="relative h-[26rem] w-full select-none overflow-hidden rounded-[32px] bg-gradient-to-b from-sky-400 via-sky-300 to-indigo-200 text-white shadow-2xl shadow-sky-900/25 dark:from-indigo-950 dark:via-slate-900 dark:to-sky-950 dark:shadow-black/60"
                >
                    <Layer x={layerX} y={layerY} depth={10} className="absolute -right-10 -top-10 h-48 w-48">
                        <div className="h-full w-full rounded-full bg-amber-200/80 blur-2xl dark:bg-indigo-400/30"/>
                    </Layer>
                    <Layer x={layerX} y={layerY} depth={16} className="absolute right-8 top-10">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-[0_0_40px_rgba(253,230,138,0.9)] dark:from-slate-100 dark:to-slate-300 dark:shadow-[0_0_40px_rgba(226,232,240,0.45)]"/>
                    </Layer>
                    <Layer x={layerX} y={layerY} depth={28} className="absolute right-2 top-24">
                        <LuCloud className="h-20 w-20 fill-white/90 text-white/90 drop-shadow-lg dark:fill-slate-300/60 dark:text-slate-300/60"/>
                    </Layer>
                    <Layer x={layerX} y={layerY} depth={40} className="absolute -left-4 top-36">
                        <LuCloud className="h-14 w-14 fill-white/70 text-white/70 dark:fill-slate-400/40 dark:text-slate-400/40"/>
                    </Layer>

                    <div className="relative flex h-full flex-col p-6">
                        <p className="text-sm font-medium text-white/90">{city}</p>
                        <p className="mt-1 text-7xl font-extralight tracking-tighter">{temperature}°</p>
                        <p className="text-sm text-white/85">{dayRange ? `${condition}, ${dayRange}` : condition}</p>

                        <ul className="mt-auto grid grid-cols-5 gap-1 rounded-2xl bg-white/20 p-3 backdrop-blur-md dark:bg-white/10">
                            {hours.map((hour) => {
                                const Icon = hour.icon;
                                return (
                                    <li key={hour.time} className="flex flex-col items-center gap-1.5 text-xs">
                                        <span className="text-white/80">{hour.time}</span>
                                        <Icon className="h-4 w-4" aria-hidden="true"/>
                                        <span className="font-medium">{hour.temp}°</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </motion.article>
            </div>

            <div className="flex flex-col items-center gap-3">
                <p className="inline-flex h-8 items-center gap-2 overflow-hidden rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={source}
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -8}}
                            transition={{duration: 0.18}}
                            className="inline-flex items-center gap-2"
                        >
                            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true"/>
                            {reduceMotion ? text.reducedMotion : text[source]}
                        </motion.span>
                    </AnimatePresence>
                </p>
                {needsPermission && !reduceMotion && (
                    <button
                        type="button"
                        onClick={() => void requestMotion()}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuSmartphone className="h-4 w-4" aria-hidden="true"/>
                        {text.enableMotion}
                    </button>
                )}
            </div>
        </div>
    );
};
