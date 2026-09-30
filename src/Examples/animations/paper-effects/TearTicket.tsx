import {useEffect, useMemo, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuPlane, LuRotateCcw, LuScissors} from "react-icons/lu";

export interface Airport {
    code: string;
    city: string;
}

export interface BoardingPass {
    airline: string;
    flight: string;
    passenger: string;
    from: Airport;
    to: Airport;
    /** Printed as is, for example "14 Oct". */
    date: string;
    boarding: string;
    departs: string;
    /** Flight time, for example "3h 55m". */
    duration?: string;
    gate: string;
    seat: string;
    zone: string;
    cabin: string;
    bookingRef: string;
    /** Encoded in the barcode on the stub and printed under it. */
    ticketNumber: string;
}

export interface TearTicketProps {
    pass: BoardingPass;
    /** Called once the stub has come off. */
    onCheckIn?: () => void;
    className?: string;
}

type Phase = "ready" | "tearing" | "falling" | "checked";
type Jag = {x: number; y: number};

const W = 300;
const MAIN_H = 296;
const STUB_H = 124;
const NOTCH = 11;
const CORNER = 14;

// Small seeded random generator, so the tear line and barcode are the same on every render.
const seeded = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hash = (text: string) => [...text].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261);

// One jagged line shared by both pieces, so the torn edges fit together like real paper.
const JAGS: Jag[] = (() => {
    const random = seeded(412);
    const points: Jag[] = [];
    let y = 0;
    for (let x = NOTCH; x <= W - NOTCH; x += 3 + random() * 3) {
        y = Math.max(-3.2, Math.min(3.2, y * 0.45 + (random() - 0.5) * 5.5 + (random() > 0.93 ? (random() - 0.5) * 5 : 0)));
        points.push({x, y});
    }
    return points;
})();

const tearFront = (t: number) => NOTCH + t * (W - 2 * NOTCH);

const mainPath = (t: number) => {
    const front = tearFront(t);
    const torn = JAGS.filter((p) => p.x < front).reverse();
    return [
        `M0,${CORNER} Q0,0 ${CORNER},0 L${W - CORNER},0 Q${W},0 ${W},${CORNER}`,
        `L${W},${MAIN_H - NOTCH} A${NOTCH},${NOTCH} 0 0 0 ${W - NOTCH},${MAIN_H}`,
        `L${front},${MAIN_H}`,
        ...torn.map((p) => `L${p.x.toFixed(2)},${(MAIN_H + p.y).toFixed(2)}`),
        `L${NOTCH},${MAIN_H} A${NOTCH},${NOTCH} 0 0 0 0,${MAIN_H - NOTCH} Z`,
    ].join(" ");
};

const stubPath = (t: number) => {
    const front = tearFront(t);
    const torn = JAGS.filter((p) => p.x < front);
    return [
        `M0,${NOTCH} A${NOTCH},${NOTCH} 0 0 0 ${NOTCH},0`,
        ...torn.map((p) => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`),
        `L${front},0 L${W - NOTCH},0 A${NOTCH},${NOTCH} 0 0 0 ${W},${NOTCH}`,
        `L${W},${STUB_H - CORNER} Q${W},${STUB_H} ${W - CORNER},${STUB_H} L${CORNER},${STUB_H} Q0,${STUB_H} 0,${STUB_H - CORNER} Z`,
    ].join(" ");
};

// Just the torn stretch, stroked lighter: torn paper shows its fibrous core.
const tornEdge = (t: number, offset: number) => {
    const front = tearFront(t);
    const torn = JAGS.filter((p) => p.x < front);
    if (torn.length === 0) return "";
    return `M${NOTCH},${offset} ${torn.map((p) => `L${p.x.toFixed(2)},${(offset + p.y).toFixed(2)}`).join(" ")} L${front},${offset}`;
};

const INK_MASK = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.4 2.05'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Barcode = ({value}: {value: string}) => {
    const bars = useMemo(() => {
        const random = seeded(hash(value));
        const out: {x: number; w: number}[] = [];
        let x = 0;
        // Quiet start and stop patterns, random widths in between.
        [2, 1, 1, 1].forEach((w, i) => {
            if (i % 2 === 0) out.push({x, w});
            x += w;
        });
        while (x < 150) {
            const bar = 1 + Math.floor(random() * 3);
            const gap = 1 + Math.floor(random() * 2);
            out.push({x, w: bar});
            x += bar + gap;
        }
        out.push({x, w: 2}, {x: x + 3, w: 1});
        return {bars: out, width: x + 4};
    }, [value]);

    return (
        <svg aria-hidden="true" viewBox={`0 0 ${bars.width} 10`} preserveAspectRatio="none" className="h-7 w-full fill-current">
            {bars.bars.map((bar) => <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="10"/>)}
        </svg>
    );
};

const Field = ({label, value, align = "left"}: {label: string; value: string; align?: "left" | "right"}) => (
    <div className={align === "right" ? "text-right" : ""}>
        <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{label}</p>
        <p className="mt-0.5 text-[15px] font-semibold tabular-nums tracking-tight">{value}</p>
    </div>
);

/**
 * A boarding pass with a perforated stub. Pulling the stub tears it along the perforation a little at a time
 * (the tear never heals), the loose part droops around the tear front, and once it is through the stub falls
 * away and the pass is stamped. The jagged edge is one generated line that both pieces share.
 */
export const TearTicket = ({pass, onCheckIn, className = ""}: TearTicketProps) => {
    const reduceMotion = useReducedMotion();
    const [phase, setPhase] = useState<Phase>("ready");
    const [stampTime, setStampTime] = useState("");
    const tear = useMotionValue(0);
    const bend = useMotionValue(0);
    const followX = useMotionValue(0);
    const followY = useMotionValue(0);
    const start = useRef<{x: number; y: number; tear: number} | null>(null);
    const fallRef = useRef<HTMLDivElement>(null);
    const mainFill = useRef<SVGPathElement>(null);
    const mainTorn = useRef<SVGPathElement>(null);
    const stubFill = useRef<SVGPathElement>(null);
    const stubTorn = useRef<SVGPathElement>(null);
    const perforation = useRef<SVGLineElement>(null);
    const scissors = useRef<HTMLSpanElement>(null);

    // The loose part rotates around the tear front, which walks along the perforation.
    const stubTransform = useTransform([tear, bend, followX, followY], ([t, b, fx, fy]: number[]) => {
        const hinge = tearFront(t);
        return `translate(${fx}px, ${fy + t * b * 3}px) translate(${hinge}px, 0px) rotate(${-7 * t * b}deg) translate(${-hinge}px, 0px)`;
    });

    useEffect(() => {
        const render = (t: number) => {
            mainFill.current?.setAttribute("d", mainPath(t));
            stubFill.current?.setAttribute("d", stubPath(t));
            mainTorn.current?.setAttribute("d", tornEdge(t, MAIN_H));
            stubTorn.current?.setAttribute("d", tornEdge(t, 0));
            perforation.current?.setAttribute("x1", String(Math.max(tearFront(t), NOTCH + 3)));
            if (scissors.current) scissors.current.style.opacity = String(Math.max(0, 1 - t * 8));
        };
        render(tear.get());
        return tear.on("change", render);
    }, [tear]);

    const detach = async (direction: number) => {
        start.current = null;
        setPhase("falling");
        setStampTime(new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false}));
        onCheckIn?.();
        if (fallRef.current) {
            if (reduceMotion) {
                await animate(fallRef.current, {opacity: 0}, {duration: 0.2});
            } else {
                // Gravity: slow to start, then accelerating, with a lazy spin.
                await animate(fallRef.current, {
                    y: 280,
                    x: direction * 46,
                    rotate: direction * 24,
                    opacity: [1, 1, 0],
                }, {duration: 1, ease: [0.55, 0, 1, 0.45]});
            }
        }
        setPhase("checked");
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (phase !== "ready") return;
        event.currentTarget.setPointerCapture(event.pointerId);
        tear.stop();
        start.current = {x: event.clientX, y: event.clientY, tear: tear.get()};
        animate(bend, 1, {duration: 0.15});
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const origin = start.current;
        if (!origin) return;
        const dx = event.clientX - origin.x;
        const dy = event.clientY - origin.y;
        const pull = Math.max(0, dy) + Math.abs(dx) * 0.6;
        const next = Math.min(1, Math.max(origin.tear, origin.tear + pull / 230));
        tear.set(next);
        // The stub gives a little under the finger, like paper under tension.
        followX.set(dx * 0.12);
        followY.set(Math.max(0, dy) * 0.12 + Math.min(0, dy) * 0.03);
        if (next >= 1) void detach(dx < -8 ? -1 : 1);
    };

    const handlePointerUp = () => {
        if (!start.current) return;
        start.current = null;
        const spring = {type: "spring", stiffness: 420, damping: 26} as const;
        animate(bend, 0.35, spring);
        animate(followX, 0, spring);
        animate(followY, 0, spring);
    };

    const tearWithButton = async () => {
        if (phase !== "ready") return;
        setPhase("tearing");
        if (!reduceMotion) {
            animate(bend, 1, {duration: 0.3});
            await animate(tear, 1, {duration: 1.1, ease: [0.45, 0.05, 0.55, 1]});
        } else {
            tear.set(1);
        }
        await detach(1);
    };

    const reprint = async () => {
        tear.set(0);
        bend.set(0);
        followX.set(0);
        followY.set(0);
        setPhase("ready");
        if (fallRef.current) {
            await animate(fallRef.current, {x: 0, y: reduceMotion ? 0 : -14, rotate: 0, opacity: 0}, {duration: 0});
            await animate(fallRef.current, {y: 0, opacity: 1}, {duration: reduceMotion ? 0.2 : 0.45, ease: [0.2, 0, 0, 1]});
        }
    };

    const stamped = phase === "falling" || phase === "checked";

    return (
        <div className={`flex w-[300px] flex-col items-center text-stone-900 dark:text-stone-100 ${className}`}>
            <div className="relative" style={{width: W, height: MAIN_H + STUB_H}}>
                <div ref={fallRef} className="absolute left-0 z-0" style={{top: MAIN_H, width: W, height: STUB_H}}>
                    <motion.div
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        className={`relative h-full w-full touch-none select-none ${phase === "ready" ? "cursor-grab active:cursor-grabbing" : ""}`}
                        style={{transform: stubTransform}}
                    >
                        <svg aria-hidden="true" width={W} height={STUB_H} className="absolute inset-0 overflow-visible [filter:drop-shadow(0_8px_14px_rgba(28,25,23,0.12))] dark:[filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.6))]">
                            <path ref={stubFill} d={stubPath(0)} className="fill-[#fbfaf6] stroke-black/[0.07] dark:fill-[#1f1d1a] dark:stroke-white/[0.07]" strokeWidth="1"/>
                            <path ref={stubTorn} fill="none" strokeWidth="1.2" className="stroke-stone-300 dark:stroke-stone-500"/>
                        </svg>
                        <div className="relative flex h-full flex-col px-5 pb-3.5 pt-5">
                            <div className="flex items-start justify-between">
                                <div className="text-[10.5px] leading-snug text-stone-500 dark:text-stone-400">
                                    <p className="font-semibold tracking-wide text-stone-900 dark:text-stone-100">{pass.flight} · {pass.from.code} → {pass.to.code}</p>
                                    <p className="uppercase">{pass.passenger}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Seat</p>
                                    <p className="text-[20px] font-semibold leading-none tabular-nums">{pass.seat}</p>
                                </div>
                            </div>
                            <div className="mt-auto flex items-end gap-3">
                                <div className="flex-1"><Barcode value={pass.ticketNumber}/></div>
                                <p className="font-mono text-[8.5px] leading-tight text-stone-500 [writing-mode:vertical-rl] dark:text-stone-400">{pass.bookingRef}</p>
                            </div>
                            <p className="mt-1 font-mono text-[8.5px] tracking-[0.18em] text-stone-500 tabular-nums dark:text-stone-400">{pass.ticketNumber}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute left-0 top-0 z-10" style={{width: W, height: MAIN_H}}>
                    <svg aria-hidden="true" width={W} height={MAIN_H} className="absolute inset-0 overflow-visible [filter:drop-shadow(0_10px_18px_rgba(28,25,23,0.1))] dark:[filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.6))]">
                        <path ref={mainFill} d={mainPath(0)} className="fill-[#fbfaf6] stroke-black/[0.07] dark:fill-[#1f1d1a] dark:stroke-white/[0.07]" strokeWidth="1"/>
                        <path ref={mainTorn} fill="none" strokeWidth="1.2" className="stroke-stone-300 dark:stroke-stone-500"/>
                        <line ref={perforation} x1={NOTCH + 3} y1={MAIN_H} x2={W - NOTCH - 3} y2={MAIN_H} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="0.01 6" className="stroke-stone-300 dark:stroke-stone-600"/>
                    </svg>

                    <div className="relative flex h-full flex-col px-5 pb-5 pt-5">
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em]">
                                <span className="h-3 w-1 rounded-sm bg-[#d9481f]"/>
                                {pass.airline}
                            </p>
                            <p className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">Boarding pass · {pass.cabin}</p>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <div>
                                <p className="text-[34px] font-semibold leading-none tracking-tight">{pass.from.code}</p>
                                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{pass.from.city}</p>
                            </div>
                            <div className="flex flex-1 flex-col items-center px-3 text-stone-400 dark:text-stone-500">
                                <div className="flex w-full items-center gap-1.5">
                                    <span className="h-px flex-1 border-t border-dashed border-current"/>
                                    <LuPlane className="h-3.5 w-3.5 rotate-45 text-stone-700 dark:text-stone-300" aria-hidden="true"/>
                                    <span className="h-px flex-1 border-t border-dashed border-current"/>
                                </div>
                                {pass.duration && <p className="mt-1 text-[9.5px] tabular-nums">{pass.duration}</p>}
                            </div>
                            <div className="text-right">
                                <p className="text-[34px] font-semibold leading-none tracking-tight">{pass.to.code}</p>
                                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{pass.to.city}</p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-3 border-t border-stone-200 pt-4 dark:border-stone-700/70">
                            <Field label="Flight" value={pass.flight}/>
                            <Field label="Date" value={pass.date}/>
                            <Field label="Boarding" value={pass.boarding} align="right"/>
                            <Field label="Gate" value={pass.gate}/>
                            <Field label="Seat" value={pass.seat}/>
                            <Field label="Departs" value={pass.departs} align="right"/>
                        </div>

                        <div className="mt-auto flex items-end justify-between">
                            <div>
                                <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Passenger</p>
                                <p className="mt-0.5 text-[12.5px] font-semibold uppercase tracking-wide">{pass.passenger}</p>
                            </div>
                            <p className="text-right text-[10px] text-stone-500 dark:text-stone-400" aria-live="polite">
                                {stamped ? `Checked in ${stampTime}` : `Zone ${pass.zone}`}
                            </p>
                        </div>
                    </div>

                    <span ref={scissors} aria-hidden="true" className="absolute -left-0.5 text-stone-400 dark:text-stone-500" style={{top: MAIN_H - 7}}>
                        <LuScissors className="h-3.5 w-3.5 -scale-x-100"/>
                    </span>

                    {stamped && (
                        <motion.div
                            aria-hidden="true"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 1.7, rotate: -4}}
                            animate={{opacity: 0.92, scale: 1, rotate: -9}}
                            transition={reduceMotion ? {duration: 0.2} : {type: "spring", stiffness: 520, damping: 24, mass: 0.7, delay: 0.15}}
                            className="pointer-events-none absolute right-5 top-[116px] rounded-md border-2 border-[#d9481f] px-2.5 py-1 text-center text-[#d9481f] mix-blend-multiply dark:border-[#f0714a] dark:text-[#f0714a] dark:mix-blend-screen"
                            style={{maskImage: INK_MASK, WebkitMaskImage: INK_MASK}}
                        >
                            <p className="text-[13px] font-black uppercase tracking-[0.16em]">Checked in</p>
                            <p className="font-mono text-[9px] font-semibold tracking-[0.12em] tabular-nums">{stampTime} · GATE {pass.gate}</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="mt-5">
                {phase === "checked" ? (
                    <button
                        type="button"
                        onClick={reprint}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-stone-300 px-4 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9481f] dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
                    >
                        <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                        Print a new pass
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={tearWithButton}
                        disabled={phase !== "ready"}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-stone-900 px-4 text-xs font-medium text-stone-50 transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9481f] focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-offset-stone-950"
                    >
                        <LuScissors className="h-3.5 w-3.5" aria-hidden="true"/>
                        Tear off stub
                    </button>
                )}
            </div>
        </div>
    );
};
