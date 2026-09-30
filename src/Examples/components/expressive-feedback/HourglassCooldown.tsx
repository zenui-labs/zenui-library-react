import {useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {animate, motion, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

export interface HourglassCooldownProps {
    /** Button text while the action is available. */
    label?: string;
    /** Seconds the action stays locked after it runs. */
    cooldown?: number;
    /** Start with sand already running, e.g. when a code was sent as the screen opened. */
    startCoolingDown?: boolean;
    /** Line above the button. */
    prompt?: ReactNode;
    onTrigger?: () => void;
    className?: string;
}

type Mode = "idle" | "flipping" | "slump" | "running";

// Glass profile in a 80 x 120 box: neck at y 60, rims 47 units above and below. Half-width grows like a sine to the
// shoulder, then rounds back in toward the caps.
const NECK = 60;
const RIM = 47;
const FULL = 30;
const SLUMP_MS = 420;
const halfWidth = (d: number) => (d <= 34 ? 1.6 + 20 * Math.pow(Math.sin((Math.PI / 2) * (d / 34)), 1.35) : 21.6 - 4 * Math.pow((d - 34) / 13, 2));
const inner = (d: number) => Math.max(0.4, halfWidth(d) - 1.3);

const GLASS = (() => {
    const right: string[] = [];
    const left: string[] = [];
    for (let y = NECK - RIM; y <= NECK + RIM; y += 1) {
        const w = halfWidth(Math.abs(y - NECK));
        right.push(`${(40 + w).toFixed(2)} ${y}`);
        left.unshift(`${(40 - w).toFixed(2)} ${y}`);
    }
    return `M ${right.join(" L ")} L ${left.join(" L ")} Z`;
})();

const INNER = (() => {
    const right: string[] = [];
    const left: string[] = [];
    for (let y = NECK - RIM + 1; y <= NECK + RIM - 1; y += 1) {
        const w = inner(Math.abs(y - NECK));
        right.push(`${(40 + w).toFixed(2)} ${y}`);
        left.unshift(`${(40 - w).toFixed(2)} ${y}`);
    }
    return `M ${right.join(" L ")} L ${left.join(" L ")} Z`;
})();

// A reflection down one shoulder, repeated where that shoulder lands after a half turn.
const HIGHLIGHT = (() => {
    const right: string[] = [];
    const left: string[] = [];
    for (let y = 20; y <= 44; y += 2) {
        const w = inner(Math.abs(y - NECK)) - 2.6;
        right.push(`${(40 + w).toFixed(2)} ${y}`);
        left.push(`${(40 - w).toFixed(2)} ${120 - y}`);
    }
    return `M ${right.join(" L ")} M ${left.join(" L ")}`;
})();

// Cumulative cross-section area from the neck outward, so sand levels move by volume rather than by height:
// the top drains slowly at first and races at the end, just like the real thing.
const STEP = 0.25;
const AREA = (() => {
    const table = [0];
    for (let d = STEP; d <= RIM; d += STEP) table.push(table[table.length - 1] + 2 * inner(d) * STEP);
    return table;
})();
const areaAt = (d: number) => AREA[Math.min(AREA.length - 1, Math.round(d / STEP))];
const depthFor = (area: number) => {
    let index = 0;
    while (index < AREA.length - 1 && AREA[index] < area) index += 1;
    return index * STEP;
};
const SAND = areaAt(FULL);
const BOTTOM = RIM - 1;

const pileShape = (progress: number) => {
    const depth = depthFor(areaAt(BOTTOM) - progress * SAND);
    return {level: NECK + depth, mound: 4.5 * Math.sqrt(progress)};
};

const bottomPath = (progress: number) => {
    if (progress <= 0) return "";
    const {level, mound} = pileShape(progress);
    return `M 0 ${level} L 28 ${level} Q 40 ${level - 2 * mound} 52 ${level} L 80 ${level} L 80 120 L 0 120 Z`;
};

const topPath = (progress: number) => {
    if (progress >= 1) return "";
    const level = NECK - depthFor((1 - progress) * SAND);
    // The funnel that forms over the neck once sand starts to move.
    const dip = Math.min(3.2, (NECK - level) * 0.7) * Math.min(1, progress / 0.03);
    return `M 0 ${level} L 31 ${level} Q 40 ${level + 2 * dip} 49 ${level} L 80 ${level} L 80 ${NECK + 0.5} L 0 ${NECK + 0.5} Z`;
};

// Right after the flip the old pile hangs upside down in the top bulb, then drops onto the neck.
const slumpPath = (amount: number) => {
    const {level, mound} = pileShape(1);
    const top = 120 - (NECK + RIM) + (FULL - (120 - (NECK + RIM))) * amount;
    const bottom = 120 - level + (level - NECK) * amount;
    const hang = mound * (1 - amount);
    return `M 0 ${top} L 80 ${top} L 80 ${bottom} L 52 ${bottom} Q 40 ${bottom + 2 * hang} 28 ${bottom} L 0 ${bottom} Z`;
};

const formatSeconds = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

/**
 * A rate-limited button with an hourglass for a cooldown. Pressing it flips the glass; sand drains by volume while
 * the button counts down, and it unlocks once the top bulb is empty.
 */
export const HourglassCooldown = ({
    label = "Resend code",
    cooldown = 30,
    startCoolingDown = false,
    prompt = "Didn't get it?",
    onTrigger,
    className = "",
}: HourglassCooldownProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const svgRef = useRef<SVGSVGElement>(null);
    const inView = useInView(svgRef);
    const topRef = useRef<SVGPathElement>(null);
    const bottomRef = useRef<SVGPathElement>(null);
    const streamRef = useRef<SVGLineElement>(null);
    const grainsRef = useRef<SVGGElement>(null);
    const rotation = useMotionValue(0);
    const clip = `hourglass-${useId().replace(/:/g, "")}`;

    const mode = useRef<Mode>(startCoolingDown ? "running" : "idle");
    const drainStart = useRef(0);
    const slumpStart = useRef(0);
    const deadline = useRef(0);
    const [running, setRunning] = useState(startCoolingDown);
    const [remaining, setRemaining] = useState(startCoolingDown ? cooldown : 0);
    const [message, setMessage] = useState("");

    const draw = useCallback((now: number) => {
        const top = topRef.current;
        const bottom = bottomRef.current;
        const stream = streamRef.current;
        const grains = grainsRef.current;
        if (!top || !bottom || !stream || !grains) return;
        const current = mode.current;

        if (current === "slump") {
            const amount = Math.min(1, (now - slumpStart.current) / SLUMP_MS);
            top.setAttribute("d", slumpPath(amount * amount));
            bottom.setAttribute("d", "");
            stream.style.opacity = "0";
            grains.style.opacity = "0";
            return;
        }

        const progress = current === "running"
            ? Math.min(1, Math.max(0, (now - drainStart.current) / Math.max(1, deadline.current - drainStart.current)))
            : 1;
        top.setAttribute("d", topPath(progress));
        bottom.setAttribute("d", bottomPath(progress));

        const flowing = current === "running" && progress < 1;
        const {level, mound} = pileShape(progress);
        const peak = level - mound;
        stream.setAttribute("y2", String(peak));
        stream.style.opacity = flowing ? String(Math.min(1, (1 - progress) * 30)) : "0";
        stream.style.strokeDashoffset = String(-(now / 40) % 26);
        grains.style.opacity = flowing && !reduceMotion ? "1" : "0";
        if (flowing && !reduceMotion) {
            Array.from(grains.children).forEach((grain, index) => {
                const phase = (now / 620 + index / grains.children.length) % 1;
                const y = NECK + (peak - NECK) * Math.pow(phase, 1.6);
                const x = 40 + Math.sin(index * 12.9 + now / 90) * 0.55 * phase;
                grain.setAttribute("cx", x.toFixed(2));
                grain.setAttribute("cy", y.toFixed(2));
            });
        }
    }, [reduceMotion]);

    // Starting mid-cooldown: the clock starts at mount.
    useLayoutEffect(() => {
        if (startCoolingDown) {
            drainStart.current = performance.now();
            deadline.current = drainStart.current + cooldown * 1000;
        }
        draw(performance.now());
        // Only on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Frames only while the glass is visible; the clock itself runs on timestamps, so nothing drifts off screen.
    useEffect(() => {
        if (!running || !inView) return;
        let frame = 0;
        const tick = (now: number) => {
            draw(now);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, inView, draw]);

    useEffect(() => {
        if (!running) return;
        const interval = window.setInterval(() => {
            const left = Math.max(0, Math.ceil((deadline.current - performance.now()) / 1000));
            setRemaining(left);
            if (left === 0) {
                mode.current = "idle";
                setRunning(false);
                setMessage("You can resend the code now.");
                draw(performance.now());
            }
        }, 200);
        return () => window.clearInterval(interval);
    }, [running, draw]);

    const trigger = () => {
        if (running) return;
        onTrigger?.();
        const now = performance.now();
        deadline.current = now + cooldown * 1000;
        setRunning(true);
        setRemaining(cooldown);
        setMessage(`Code sent. You can ask for another in ${cooldown} seconds.`);

        if (reduceMotion) {
            mode.current = "running";
            drainStart.current = now;
            return;
        }
        mode.current = "flipping";
        animate(rotation, 180, {
            type: "spring",
            stiffness: 70,
            damping: 11,
            restDelta: 0.5,
            onComplete: () => {
                // The glass is symmetric, so snapping back to 0 is invisible. The sand is redrawn upside down instead.
                rotation.set(0);
                mode.current = "slump";
                slumpStart.current = performance.now();
                window.setTimeout(() => {
                    if (mode.current !== "slump") return;
                    mode.current = "running";
                    drainStart.current = performance.now();
                }, SLUMP_MS);
                draw(performance.now());
            },
        });
    };

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <svg ref={svgRef} viewBox="0 0 80 120" className="h-[92px] w-[62px] shrink-0 overflow-visible" aria-hidden="true">
                <defs>
                    <clipPath id={clip}>
                        <path d={INNER}/>
                    </clipPath>
                </defs>
                <motion.g style={{rotate: rotation}}>
                    <rect x="11" y="10" width="3" height="100" rx="1" className="fill-[#5b3f2b] dark:fill-[#8a6446]"/>
                    <rect x="66" y="10" width="3" height="100" rx="1" className="fill-[#5b3f2b] dark:fill-[#8a6446]"/>
                    <path d={GLASS} strokeWidth="0.9" className="fill-white/60 stroke-stone-400/80 dark:fill-white/[0.04] dark:stroke-stone-500"/>
                    <g clipPath={`url(#${clip})`}>
                        <path ref={topRef} className="fill-[#d4b27a] dark:fill-[#c9a46a]"/>
                        <path ref={bottomRef} className="fill-[#d4b27a] dark:fill-[#c9a46a]"/>
                        <line ref={streamRef} x1="40" y1={NECK - 1} x2="40" y2="100" strokeWidth="0.9" strokeDasharray="2.2 1" className="stroke-[#c29d62] dark:stroke-[#d8b57c]" style={{opacity: 0}}/>
                        <g ref={grainsRef} className="fill-[#b8925a] dark:fill-[#e0c08a]" style={{opacity: 0}}>
                            {Array.from({length: 6}, (_, index) => <circle key={index} r="0.55" cx="40" cy={NECK}/>)}
                        </g>
                    </g>
                    {/* Highlights on both sides, so the glass looks the same either way up. */}
                    <path d={HIGHLIGHT} fill="none" strokeWidth="1.3" strokeLinecap="round" className="stroke-white/80 dark:stroke-white/20"/>
                    <rect x="6" y="5" width="68" height="8" rx="2" className="fill-[#6b4a32] dark:fill-[#9a7150]"/>
                    <rect x="6" y="107" width="68" height="8" rx="2" className="fill-[#6b4a32] dark:fill-[#9a7150]"/>
                    <rect x="8" y="6" width="64" height="1" rx="0.5" className="fill-white/20"/>
                    <rect x="8" y="108" width="64" height="1" rx="0.5" className="fill-white/20"/>
                </motion.g>
            </svg>

            <div className="min-w-0">
                <p className="text-sm text-stone-600 dark:text-stone-300">{prompt}</p>
                <button
                    type="button"
                    onClick={trigger}
                    disabled={running}
                    className="mt-2 inline-flex h-9 min-w-[150px] items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 text-[13px] font-medium text-stone-900 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-950 dark:disabled:border-stone-800 dark:disabled:bg-stone-900/60 dark:disabled:text-stone-500"
                >
                    {running ? (
                        <>
                            {label} in <span className="font-mono tabular-nums">{formatSeconds(remaining)}</span>
                        </>
                    ) : (
                        <>
                            <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                            {label}
                        </>
                    )}
                </button>
            </div>
            <p className="sr-only" aria-live="polite">{message}</p>
        </div>
    );
};
