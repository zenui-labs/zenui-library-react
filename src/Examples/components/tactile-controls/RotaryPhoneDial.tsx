import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

export interface RotaryDialCard {
    /** Small caps line at the top of the paper card. */
    eyebrow?: string;
    title: string;
    caption?: string;
}

export interface RotaryPhoneDialProps {
    /** Heading next to the dial. */
    label?: string;
    /** Number of digits in the code. */
    length?: number;
    /** Checks the finished code. Return true to accept it. */
    validate?: (code: string) => boolean;
    onComplete?: (code: string, accepted: boolean) => void;
    /** The paper card in the middle of the dial. */
    card?: RotaryDialCard;
    /** Degrees per second the dial returns at. A real governor runs at about 10 pulses, or 300 degrees, a second. */
    returnSpeed?: number;
    acceptedText?: string;
    rejectedText?: string;
    className?: string;
}

// Holes sit 30 degrees apart. Each one travels (n + 1) * 30 degrees clockwise to reach the finger stop, so
// "1" turns 60 degrees and "0" (hole 10) turns 330. The 30 extra degrees are the dead zone before pulsing starts.
const STEP = 30;
const STOP_AT = 60;
const HOLE_RING = 102;
const HOLE_R = 18.5;
const LETTERS = ["", "", "ABC", "DEF", "GHI", "JKL", "MNO", "PRS", "TUV", "WXY", "OPER"];

const holeOf = (digit: string) => (digit === "0" ? 10 : Number(digit));
const travelOf = (hole: number) => (hole + 1) * STEP;
const restAngle = (hole: number) => STOP_AT - travelOf(hole);
const polar = (deg: number, radius: number) => {
    const rad = (deg * Math.PI) / 180;
    return {x: 150 + radius * Math.cos(rad), y: 150 + radius * Math.sin(rad)};
};
const holes = Array.from({length: 10}, (_, index) => index + 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * A rotary telephone dial for entering a short numeric code. Put a finger in a hole and drag it round to the
 * finger stop; the digit only counts once the governor has wound the dial back home, one pulse at a time.
 * Typing digits dials them automatically, Backspace deletes and Escape clears.
 */
export const RotaryPhoneDial = ({
    label = "Enter the code",
    length = 4,
    validate,
    onComplete,
    card = {title: "Dial"},
    returnSpeed = 320,
    acceptedText = "Accepted",
    rejectedText = "Wrong code, try again",
    className = "",
}: RotaryPhoneDialProps) => {
    const reduceMotion = useReducedMotion();
    const uid = useId().replace(/:/g, "");
    const hintId = `${uid}-hint`;
    const [digits, setDigits] = useState("");
    const [status, setStatus] = useState<"idle" | "accepted" | "rejected">("idle");

    const rotation = useMotionValue(0);
    const lamp = useMotionValue(0.12);
    const knock = useMotionValue(0);
    // The stop gets pushed along the direction the wheel travels, which at 72 degrees is down and to the left.
    const knockX = useTransform(knock, (k) => -0.95 * k);
    const knockY = useTransform(knock, (k) => 0.31 * k);

    const wheelRef = useRef<HTMLDivElement>(null);
    const digitsRef = useRef("");
    const queue = useRef<string[]>([]);
    const busy = useRef(false);
    const running = useRef<AnimationPlaybackControls | null>(null);
    const drag = useRef<{hole: number; angle: number; reached: boolean} | null>(null);

    useEffect(() => () => running.current?.stop(), []);

    const run = (controls: AnimationPlaybackControls) => {
        running.current = controls;
        return controls.then(() => undefined);
    };

    const hitStop = () => {
        if (reduceMotion) return;
        animate(knock, [0, 1.4, 0], {duration: 0.16, ease: "easeOut"});
    };

    const append = (digit: string) => {
        const next = (digitsRef.current + digit).slice(0, length);
        digitsRef.current = next;
        setDigits(next);
        if (next.length < length) return;
        const accepted = validate ? validate(next) : true;
        setStatus(accepted ? "accepted" : "rejected");
        onComplete?.(next, accepted);
    };

    // The governor: a constant angular speed back to rest. Each 30 degrees crossed after the dead zone is one
    // line pulse, which flashes the lamp, and the digit lands only after the wheel knocks against its rest.
    const spinBack = async (digit: string | null) => {
        const from = rotation.get();
        if (from <= 0.01) return;
        if (reduceMotion) {
            rotation.set(0);
        } else {
            let lastStep = Math.ceil(from / STEP - 1e-6);
            const unsubscribe = rotation.on("change", (value) => {
                const step = Math.ceil(value / STEP - 1e-6);
                if (step >= lastStep) return;
                lastStep = step;
                if (digit && step >= 1) animate(lamp, [1, 0.12], {duration: 0.07, ease: "easeIn"});
            });
            await run(animate(rotation, 0, {duration: from / returnSpeed, ease: "linear"}));
            unsubscribe();
            await run(animate(rotation, [0, 1.6, 0], {duration: 0.2, ease: "easeOut"}));
        }
        if (digit) append(digit);
    };

    const autoDial = async (digit: string) => {
        const travel = travelOf(holeOf(digit));
        await run(animate(rotation, travel, {duration: 0.2 + travel / 900, ease: [0.45, 0, 0.2, 1]}));
        hitStop();
        await wait(90);
        await spinBack(digit);
    };

    const pump = () => {
        if (busy.current) return;
        const next = queue.current.shift();
        if (next === undefined) return;
        busy.current = true;
        const work = reduceMotion ? Promise.resolve(append(next)) : autoDial(next);
        work.then(() => {
            busy.current = false;
            pump();
        });
    };

    // Clear the display a moment after a wrong code, and a little later after a right one so it can be tried again.
    useEffect(() => {
        if (status === "idle") return;
        const timer = setTimeout(() => {
            digitsRef.current = "";
            setDigits("");
            setStatus("idle");
        }, status === "rejected" ? 1100 : 3200);
        return () => clearTimeout(timer);
    }, [status]);

    const full = () => digitsRef.current.length + queue.current.length + (busy.current ? 1 : 0) >= length;

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (/^[0-9]$/.test(event.key)) {
            event.preventDefault();
            if (status !== "idle" || full()) return;
            queue.current.push(event.key);
            pump();
        } else if (event.key === "Backspace" && status === "idle") {
            event.preventDefault();
            if (queue.current.length) queue.current.pop();
            else {
                digitsRef.current = digitsRef.current.slice(0, -1);
                setDigits(digitsRef.current);
            }
        } else if (event.key === "Escape" && status === "idle") {
            queue.current = [];
            digitsRef.current = "";
            setDigits("");
        }
    };

    const pointerAngle = (x: number, y: number) => {
        const rect = wheelRef.current!.getBoundingClientRect();
        return (Math.atan2(y - (rect.top + rect.height / 2), x - (rect.left + rect.width / 2)) * 180) / Math.PI;
    };

    const handleHoleDown = (event: PointerEvent<SVGCircleElement>, hole: number) => {
        if (event.button !== 0 || busy.current || status !== "idle" || full()) return;
        event.preventDefault();
        wheelRef.current?.parentElement?.focus();
        wheelRef.current?.setPointerCapture(event.pointerId);
        busy.current = true;
        drag.current = {hole, angle: pointerAngle(event.clientX, event.clientY), reached: false};
    };

    const handleMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = drag.current;
        if (!state) return;
        const now = pointerAngle(event.clientX, event.clientY);
        let delta = now - state.angle;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        state.angle = now;
        const travel = travelOf(state.hole);
        const next = Math.min(travel, Math.max(0, rotation.get() + delta));
        rotation.set(next);
        if (next >= travel - 0.5 && !state.reached) {
            state.reached = true;
            hitStop();
        }
    };

    const handleUp = () => {
        const state = drag.current;
        if (!state) return;
        drag.current = null;
        const digit = state.reached ? String(state.hole % 10) : null;
        spinBack(digit).then(() => {
            busy.current = false;
            pump();
        });
    };

    const slotTone =
        status === "accepted"
            ? "text-emerald-700 border-emerald-600/40 dark:text-emerald-400 dark:border-emerald-400/30"
            : status === "rejected"
                ? "text-red-700 border-red-600/40 dark:text-red-400 dark:border-red-400/30"
                : "text-stone-900 border-stone-300 dark:text-stone-100 dark:border-stone-700";

    return (
        <div
            className={`flex w-full max-w-2xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center
                [--pd-plate-a:#f4ecda] [--pd-plate-b:#dccfb1] [--pd-wheel-a:#f8f2e4] [--pd-wheel-b:#e3d6b8] [--pd-ink:#3a2f22] [--pd-rim:rgba(90,70,40,0.35)] [--pd-bezel:#c9b995]
                dark:[--pd-plate-a:#26231f] dark:[--pd-plate-b:#0d0c0b] dark:[--pd-wheel-a:#1f1c19] dark:[--pd-wheel-b:#070706] dark:[--pd-ink:#d8ceb6] dark:[--pd-rim:rgba(0,0,0,0.8)] dark:[--pd-bezel:#2e2a25] ${className}`}
        >
            <div
                tabIndex={0}
                role="group"
                aria-label={`Rotary dial. ${label}`}
                aria-describedby={hintId}
                onKeyDown={handleKeyDown}
                className="relative aspect-square w-full max-w-[300px] shrink-0 select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-amber-600/60 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
                <div aria-hidden="true" className="absolute inset-[3%] translate-y-[3%] rounded-full bg-black/25 blur-xl dark:bg-black/70"/>

                {/* Number plate. The digits are printed here, under the wheel, and show through its holes. */}
                <svg aria-hidden="true" viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
                    <defs>
                        <radialGradient id={`${uid}-plate`} cx="38%" cy="30%" r="80%">
                            <stop offset="0%" style={{stopColor: "var(--pd-plate-a)"}}/>
                            <stop offset="100%" style={{stopColor: "var(--pd-plate-b)"}}/>
                        </radialGradient>
                    </defs>
                    <circle cx={150} cy={150} r={148} style={{fill: "var(--pd-bezel)"}}/>
                    <circle cx={150} cy={150} r={143} fill={`url(#${uid}-plate)`}/>
                    <circle cx={150} cy={150} r={136} fill="none" strokeWidth={1} style={{stroke: "var(--pd-rim)"}}/>
                    {holes.map((hole) => {
                        const at = polar(restAngle(hole), HOLE_RING);
                        return (
                            <g key={hole} style={{fill: "var(--pd-ink)"}}>
                                <text x={at.x} y={at.y + (LETTERS[hole] ? 1 : 5)} textAnchor="middle" fontSize={15} fontWeight={600} fontFamily="ui-sans-serif, system-ui">
                                    {hole % 10}
                                </text>
                                {LETTERS[hole] && (
                                    <text x={at.x} y={at.y + 10} textAnchor="middle" fontSize={6.5} letterSpacing={1} fontFamily="ui-sans-serif, system-ui" opacity={0.75}>
                                        {LETTERS[hole]}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Finger wheel. A mask punches the holes, so it is one solid disc that simply rotates. */}
                <motion.div
                    ref={wheelRef}
                    className="absolute inset-0 touch-none"
                    style={{rotate: rotation}}
                    onPointerMove={handleMove}
                    onPointerUp={handleUp}
                    onPointerCancel={handleUp}
                >
                    <svg viewBox="0 0 300 300" className="h-full w-full">
                        <defs>
                            <linearGradient id={`${uid}-wheel`} x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" style={{stopColor: "var(--pd-wheel-a)"}}/>
                                <stop offset="100%" style={{stopColor: "var(--pd-wheel-b)"}}/>
                            </linearGradient>
                            <mask id={`${uid}-holes`}>
                                <circle cx={150} cy={150} r={131} fill="white"/>
                                {holes.map((hole) => {
                                    const at = polar(restAngle(hole), HOLE_RING);
                                    return <circle key={hole} cx={at.x} cy={at.y} r={HOLE_R} fill="black"/>;
                                })}
                            </mask>
                        </defs>
                        <g mask={`url(#${uid}-holes)`}>
                            <circle cx={150} cy={150} r={131} fill={`url(#${uid}-wheel)`}/>
                            <circle cx={150} cy={150} r={130} fill="none" strokeWidth={2} style={{stroke: "var(--pd-rim)"}}/>
                        </g>
                        {holes.map((hole) => {
                            const at = polar(restAngle(hole), HOLE_RING);
                            return (
                                <g key={hole}>
                                    <circle cx={at.x} cy={at.y} r={HOLE_R} fill="none" strokeWidth={1.5} style={{stroke: "var(--pd-rim)"}}/>
                                    <circle
                                        cx={at.x}
                                        cy={at.y}
                                        r={HOLE_R + 2}
                                        fill="transparent"
                                        className="cursor-grab active:cursor-grabbing"
                                        onPointerDown={(event) => handleHoleDown(event, hole)}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </motion.div>

                {/* Static gloss, card and finger stop. The highlight does not turn with the wheel, like a real reflection. */}
                <svg aria-hidden="true" viewBox="0 0 300 300" className="pointer-events-none absolute inset-0 h-full w-full">
                    <defs>
                        <radialGradient id={`${uid}-gloss`} cx="32%" cy="22%" r="55%">
                            <stop offset="0%" stopColor="white" stopOpacity={0.38}/>
                            <stop offset="100%" stopColor="white" stopOpacity={0}/>
                        </radialGradient>
                        <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fafafa"/>
                            <stop offset="45%" stopColor="#a1a1aa"/>
                            <stop offset="55%" stopColor="#71717a"/>
                            <stop offset="100%" stopColor="#e4e4e7"/>
                        </linearGradient>
                    </defs>
                    <ellipse cx={120} cy={95} rx={110} ry={80} fill={`url(#${uid}-gloss)`} className="dark:opacity-40"/>
                    <circle cx={150} cy={150} r={60} fill={`url(#${uid}-chrome)`}/>
                    <circle cx={150} cy={150} r={56} className="fill-[#fbf7ec] dark:fill-[#e6dcc6]"/>
                    <circle cx={150} cy={150} r={50} fill="none" strokeWidth={0.6} strokeDasharray="1.5 2" className="stroke-stone-400"/>
                    {card.eyebrow && (
                        <text x={150} y={130} textAnchor="middle" fontSize={7} letterSpacing={2} fontFamily="ui-sans-serif, system-ui" className="fill-stone-500">
                            {card.eyebrow.toUpperCase()}
                        </text>
                    )}
                    <text x={150} y={155} textAnchor="middle" fontSize={17} fontWeight={600} fontFamily="ui-serif, Georgia, serif" className="fill-stone-800">
                        {card.title}
                    </text>
                    {card.caption && (
                        <text x={150} y={172} textAnchor="middle" fontSize={7.5} fontFamily="ui-sans-serif, system-ui" className="fill-stone-500">
                            {card.caption}
                        </text>
                    )}
                    <motion.g style={{x: knockX, y: knockY}}>
                        <g transform={`rotate(${STOP_AT + 12} 150 150)`}>
                            <rect x={262} y={144} width={36} height={12} rx={5} fill={`url(#${uid}-chrome)`} stroke="rgba(0,0,0,0.35)" strokeWidth={0.6}/>
                            <circle cx={290} cy={150} r={2.2} className="fill-zinc-500"/>
                        </g>
                    </motion.g>
                </svg>
            </div>

            <div className="flex w-full max-w-[260px] flex-col items-center gap-4 sm:items-start">
                <div className="flex w-full items-center justify-between gap-3">
                    <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200">{label}</h3>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-500">
                        <motion.span aria-hidden="true" style={{opacity: lamp}} className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.9)]"/>
                        Line
                    </span>
                </div>
                <motion.div
                    className="flex gap-2"
                    animate={status === "rejected" && !reduceMotion ? {x: [0, -7, 6, -4, 3, 0]} : {x: 0}}
                    transition={{duration: 0.42, ease: "easeOut"}}
                >
                    {Array.from({length}, (_, index) => (
                        <span
                            key={index}
                            className={`flex h-14 w-11 items-center justify-center rounded-md border bg-white/70 font-mono text-2xl tabular-nums shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] transition-colors duration-300 dark:bg-stone-900/70 ${slotTone}`}
                        >
                            {digits[index] ?? <span className="h-px w-3 bg-stone-300 dark:bg-stone-700"/>}
                        </span>
                    ))}
                </motion.div>
                <p id={hintId} aria-live="polite" className="min-h-[2.5rem] text-center text-xs leading-relaxed text-stone-500 sm:text-left dark:text-stone-400">
                    {status === "accepted" && <span className="font-medium text-emerald-700 dark:text-emerald-400">{acceptedText}</span>}
                    {status === "rejected" && <span className="font-medium text-red-700 dark:text-red-400">{rejectedText}</span>}
                    {status === "idle" && (
                        <>
                            Put a finger in a hole and turn it to the metal stop, or type the digits.
                            <span className="sr-only"> {digits.length} of {length} digits entered.</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};
