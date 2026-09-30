import {useCallback, useEffect, useId, useLayoutEffect, useRef} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {useInView, useReducedMotion} from "framer-motion";

export interface LiquidGaugeProps {
    value: number;
    max: number;
    /** Unit after the numbers, e.g. "L" or "GB". */
    unit?: string;
    /** Accessible name of the meter, e.g. "Water today". */
    label: string;
    /** Decimal places for the value line. */
    precision?: number;
    /** Marks printed on the glass, in the same unit as `value`. Defaults to quarters of `max`. */
    marks?: number[];
    /** Liquid colors, top then bottom. */
    colors?: [string, string];
    className?: string;
}

// Geometry in the SVG's own units. A round-bottomed flask: a circle with a neck on top.
const VIEW_W = 220;
const VIEW_H = 256;
const CX = 110;
const CY = 150;
const R_OUT = 80;
const R_IN = 74;
const NECK_OUT = 24;
const NECK_IN = 18;
const NECK_TOP = 16;
const COLUMNS = 36;
const STEP = 1 / 60;
const BUBBLES = 16;

const JOIN_OUT = CY - Math.sqrt(R_OUT * R_OUT - NECK_OUT * NECK_OUT);
const JOIN_IN = CY - Math.sqrt(R_IN * R_IN - NECK_IN * NECK_IN);
const GLASS = `M${CX - NECK_OUT} ${NECK_TOP} L${CX - NECK_OUT} ${JOIN_OUT} A${R_OUT} ${R_OUT} 0 1 0 ${CX + NECK_OUT} ${JOIN_OUT} L${CX + NECK_OUT} ${NECK_TOP}`;
const INSIDE = `M${CX - NECK_IN} ${NECK_TOP} L${CX - NECK_IN} ${JOIN_IN} A${R_IN} ${R_IN} 0 1 0 ${CX + NECK_IN} ${JOIN_IN} L${CX + NECK_IN} ${NECK_TOP} Z`;
const COLUMN_X = Array.from({length: COLUMNS}, (_, i) => CX - R_IN - 2 + ((2 * R_IN + 4) * i) / (COLUMNS - 1));

// The bulb is round, so a quarter full is not a quarter of the height. Solve the circular segment area
// for the height that holds the right share of the volume.
const levelFor = (fraction: number) => {
    const f = Math.min(1, Math.max(0, fraction));
    const area = (h: number) => R_IN * R_IN * Math.acos((R_IN - h) / R_IN) - (R_IN - h) * Math.sqrt(Math.max(0, 2 * R_IN * h - h * h));
    const total = Math.PI * R_IN * R_IN;
    let low = 0;
    let high = 2 * R_IN;
    for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2;
        if (area(mid) / total < f) low = mid;
        else high = mid;
    }
    return CY + R_IN - (low + high) / 2;
};

interface Bubble {
    x: number;
    y: number;
    r: number;
    vy: number;
    phase: number;
    alive: boolean;
}

interface Liquid {
    h: Float64Array;
    v: Float64Array;
    level: number;
    levelV: number;
    target: number;
    slope: number;
    slopeV: number;
    fx: number;
    fy: number;
    fvx: number;
    fvy: number;
    ax: number;
    drag: {pointerId: number; startX: number; startY: number; fromX: number; fromY: number; scale: number} | null;
    hover: {x: number; t: number} | null;
    bubbles: Bubble[];
    time: number;
    still: number;
}

const createLiquid = (level: number, target: number): Liquid => ({
    h: new Float64Array(COLUMNS),
    v: new Float64Array(COLUMNS),
    level,
    levelV: 0,
    target,
    slope: 0,
    slopeV: 0,
    fx: 0,
    fy: 0,
    fvx: 0,
    fvy: 0,
    ax: 0,
    drag: null,
    hover: null,
    bubbles: Array.from({length: BUBBLES}, () => ({x: 0, y: 0, r: 0, vy: 0, phase: 0, alive: false})),
    time: 0,
    still: 0,
});

const surfaceAt = (liquid: Liquid, x: number, index: number) => liquid.level + liquid.slope * (x - CX) + liquid.h[index];

const spawnBubble = (liquid: Liquid) => {
    const bubble = liquid.bubbles.find((b) => !b.alive);
    if (!bubble) return;
    const depth = CY + R_IN - liquid.level;
    if (depth < 14) return;
    const y = CY + R_IN - 6 - Math.random() * Math.min(20, depth * 0.3);
    const half = Math.sqrt(Math.max(0, R_IN * R_IN - (y - CY) * (y - CY))) - 6;
    bubble.x = CX + (Math.random() * 2 - 1) * half;
    bubble.y = y;
    bubble.r = 1 + Math.random() * 2.2;
    bubble.vy = -12 - Math.random() * 16;
    bubble.phase = Math.random() * Math.PI * 2;
    bubble.alive = true;
};

const step = (liquid: Liquid) => {
    liquid.time += STEP;
    const {h, v} = liquid;

    // The flask: follows the pointer while dragged, otherwise springs back to its stand.
    const previousVx = liquid.fvx;
    if (!liquid.drag) {
        liquid.fvx += (-110 * liquid.fx - 11 * liquid.fvx) * STEP;
        liquid.fvy += (-140 * liquid.fy - 13 * liquid.fvy) * STEP;
        liquid.fx += liquid.fvx * STEP;
        liquid.fy += liquid.fvy * STEP;
    } else {
        // Pointer events stop when the hand stops, so bleed off the drag velocity. Stopping short then sloshes.
        liquid.fvx *= 0.8;
        liquid.fvy *= 0.8;
    }
    liquid.ax += ((liquid.fvx - previousVx) / STEP - liquid.ax) * 0.35;

    // An accelerating container tips its surface by a/g. The slope then rings as a damped pendulum,
    // which is the slosh.
    const tilt = Math.max(-0.55, Math.min(0.55, liquid.ax / 2200));
    liquid.slopeV += (-70 * (liquid.slope - tilt) - 1.7 * liquid.slopeV) * STEP;
    liquid.slope = Math.max(-0.7, Math.min(0.7, liquid.slope + liquid.slopeV * STEP));

    liquid.levelV += (14 * (liquid.target - liquid.level) - 6.5 * liquid.levelV) * STEP;
    liquid.level += liquid.levelV * STEP;

    // Spring-mass surface: each column springs to rest and passes some of its motion to its neighbours.
    v[0] -= liquid.slopeV * 0.05;
    v[COLUMNS - 1] += liquid.slopeV * 0.05;
    for (let i = 0; i < COLUMNS; i++) {
        v[i] += -0.03 * h[i] - 0.035 * v[i];
        h[i] += v[i];
    }
    for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < COLUMNS; i++) {
            if (i > 0) v[i - 1] += 0.2 * (h[i] - h[i - 1]);
            if (i < COLUMNS - 1) v[i + 1] += 0.2 * (h[i] - h[i + 1]);
        }
    }

    let energy = Math.abs(liquid.slopeV) * 40 + Math.abs(liquid.slope - tilt) * 40 + Math.abs(liquid.fx) + Math.abs(liquid.fy) + Math.abs(liquid.fvx) * 0.1 + Math.abs(liquid.target - liquid.level) + Math.abs(liquid.levelV);
    let waves = 0;
    for (let i = 0; i < COLUMNS; i++) waves += Math.abs(h[i]) + Math.abs(v[i]);
    energy += waves;

    // Shaking traps air, so bubbles appear in proportion to how agitated the liquid is.
    const agitation = waves * 0.012 + Math.abs(liquid.slopeV) * 0.3;
    if (agitation > 0.04 && Math.random() < Math.min(0.5, agitation)) spawnBubble(liquid);

    liquid.bubbles.forEach((bubble) => {
        if (!bubble.alive) return;
        energy += 1;
        bubble.vy = Math.max(-80, bubble.vy - 40 * STEP);
        bubble.y += bubble.vy * STEP;
        bubble.x += Math.sin(liquid.time * 7 + bubble.phase) * 0.18;
        const column = Math.round(((bubble.x - COLUMN_X[0]) / (COLUMN_X[COLUMNS - 1] - COLUMN_X[0])) * (COLUMNS - 1));
        const index = Math.max(0, Math.min(COLUMNS - 1, column));
        if (bubble.y - bubble.r < surfaceAt(liquid, bubble.x, index)) {
            bubble.alive = false;
            v[index] -= 0.25 * bubble.r;
        }
    });

    liquid.still = energy < 0.6 && !liquid.drag ? liquid.still + 1 : 0;
};

interface Parts {
    group: SVGGElement | null;
    front: SVGPathElement | null;
    back: SVGPathElement | null;
    line: SVGPathElement | null;
    clip: SVGPathElement | null;
    shadow: SVGEllipseElement | null;
    bubbles: (SVGCircleElement | null)[];
}

const draw = (liquid: Liquid, parts: Parts) => {
    const bottom = CY + R_IN + 4;
    let front = "";
    let back = "";
    for (let i = 0; i < COLUMNS; i++) {
        const x = COLUMN_X[i];
        const y = surfaceAt(liquid, x, i);
        // The far side of the surface: tilted less, rippling in mirror image and sitting a little higher,
        // so a thin band of it shows and the surface reads as having depth.
        const by = liquid.level + liquid.slope * 0.4 * (x - CX) - liquid.h[COLUMNS - 1 - i] * 0.6 - 3.5;
        front += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)} `;
        back += `${i ? "L" : "M"}${x.toFixed(2)} ${by.toFixed(2)} `;
    }
    const close = `L${COLUMN_X[COLUMNS - 1]} ${bottom} L${COLUMN_X[0]} ${bottom} Z`;
    parts.front?.setAttribute("d", front + close);
    parts.clip?.setAttribute("d", front + close);
    parts.back?.setAttribute("d", back + close);
    parts.line?.setAttribute("d", front);
    parts.group?.setAttribute("transform", `translate(${liquid.fx.toFixed(2)} ${liquid.fy.toFixed(2)})`);
    if (parts.shadow) {
        // Lifting the flask shrinks and fades its shadow on the shelf.
        const lift = Math.max(0, -liquid.fy);
        parts.shadow.setAttribute("cx", (CX + liquid.fx * 1.05).toFixed(2));
        parts.shadow.setAttribute("rx", (58 - lift * 0.5).toFixed(2));
        parts.shadow.setAttribute("opacity", Math.max(0.15, 1 - lift / 40).toFixed(2));
    }
    liquid.bubbles.forEach((bubble, index) => {
        const circle = parts.bubbles[index];
        if (!circle) return;
        circle.setAttribute("opacity", bubble.alive ? "1" : "0");
        if (!bubble.alive) return;
        circle.setAttribute("cx", bubble.x.toFixed(2));
        circle.setAttribute("cy", bubble.y.toFixed(2));
        circle.setAttribute("r", bubble.r.toFixed(2));
    });
};

/**
 * A round-bottomed flask filled to a value. The surface is a damped spring-mass wave that sloshes when the flask is
 * dragged, shaken with the keyboard or stirred by a passing pointer, and the reading inverts where the liquid covers it.
 */
export const LiquidGauge = ({
    value,
    max,
    unit = "",
    label,
    precision = 1,
    marks,
    colors = ["#38bdf8", "#0369a1"],
    className = "",
}: LiquidGaugeProps) => {
    const uid = useId().replace(/:/g, "");
    const wrapRef = useRef<HTMLDivElement>(null);
    const inView = useInView(wrapRef);
    const reduceMotion = useReducedMotion() ?? false;
    const fraction = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
    const target = levelFor(fraction);
    const liquidRef = useRef<Liquid | null>(null);
    const frameRef = useRef(0);
    const activeRef = useRef(false);
    const partsRef = useRef<Parts>({group: null, front: null, back: null, line: null, clip: null, shadow: null, bubbles: []});
    const active = inView && !reduceMotion;

    const wake = useCallback(() => {
        const liquid = liquidRef.current;
        if (!liquid) return;
        liquid.still = 0;
        if (frameRef.current || !activeRef.current) return;
        let last = performance.now();
        let pending = 0;
        const tick = (now: number) => {
            pending += Math.min(0.05, (now - last) / 1000);
            last = now;
            while (pending >= STEP) {
                step(liquid);
                pending -= STEP;
            }
            draw(liquid, partsRef.current);
            if (liquid.still > 30) {
                frameRef.current = 0;
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, []);

    // The first time, start empty so the flask fills when it scrolls into view. After that, pour to the new level.
    useLayoutEffect(() => {
        const liquid = liquidRef.current;
        if (!liquid) {
            liquidRef.current = createLiquid(reduceMotion ? target : CY + R_IN + 2, target);
        } else if (reduceMotion) {
            liquid.level = liquid.target = target;
        } else if (target !== liquid.target) {
            const rising = target < liquid.target;
            liquid.target = target;
            if (rising) {
                const middle = Math.floor(COLUMNS / 2);
                for (let i = -3; i <= 3; i++) liquid.v[middle + i] += 1.6 * (1 - Math.abs(i) / 4);
                for (let i = 0; i < 6; i++) spawnBubble(liquid);
            }
        }
        draw(liquidRef.current!, partsRef.current);
        wake();
    }, [target, reduceMotion, wake]);

    useEffect(() => {
        activeRef.current = active;
        if (active) wake();
        return () => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = 0;
        };
    }, [active, wake]);

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
        const liquid = liquidRef.current;
        if (!liquid || reduceMotion || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = event.currentTarget.getBoundingClientRect();
        liquid.drag = {pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, fromX: liquid.fx, fromY: liquid.fy, scale: VIEW_W / rect.width};
        wake();
    };

    const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
        const liquid = liquidRef.current;
        if (!liquid || reduceMotion) return;
        const {drag} = liquid;
        if (drag && drag.pointerId === event.pointerId) {
            const x = Math.max(-60, Math.min(60, drag.fromX + (event.clientX - drag.startX) * drag.scale));
            const y = Math.max(-36, Math.min(10, drag.fromY + (event.clientY - drag.startY) * drag.scale));
            liquid.fvx = (x - liquid.fx) / STEP;
            liquid.fvy = (y - liquid.fy) / STEP;
            liquid.fx = x;
            liquid.fy = y;
            wake();
            return;
        }
        if (event.pointerType !== "mouse") return;
        // Hovering stirs the surface near the pointer in proportion to how fast it moves.
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * VIEW_W - liquid.fx;
        const previous = liquid.hover;
        liquid.hover = {x, t: event.timeStamp};
        if (!previous) return;
        const dt = Math.max(8, event.timeStamp - previous.t) / 1000;
        const speed = Math.max(-900, Math.min(900, (x - previous.x) / dt));
        if (Math.abs(speed) < 30) return;
        for (let i = 0; i < COLUMNS; i++) {
            const falloff = Math.max(0, 1 - Math.abs(COLUMN_X[i] - x) / 30);
            liquid.v[i] += speed * 0.001 * falloff * (COLUMN_X[i] < x ? -1 : 1);
        }
        liquid.slopeV += speed * 0.00012;
        wake();
    };

    const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
        const liquid = liquidRef.current;
        if (liquid?.drag?.pointerId !== event.pointerId) return;
        liquid.drag = null;
        wake();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const liquid = liquidRef.current;
        if (!liquid || reduceMotion) return;
        const push = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : event.key === "Enter" || event.key === " " ? (liquid.fx > 0 ? -1 : 1) : 0;
        if (!push) return;
        event.preventDefault();
        liquid.fvx += push * 240;
        wake();
    };

    const percent = Math.round(fraction * 100);
    const reading = `${value.toFixed(precision)} / ${max.toFixed(precision)}${unit ? ` ${unit}` : ""}`;
    const tickValues = marks ?? [max * 0.25, max * 0.5, max * 0.75];

    const readingText = (className: string) => (
        <>
            <text x={CX} y={CY + 8} textAnchor="middle" className={`text-[38px] font-semibold tabular-nums tracking-tight ${className}`}>
                {percent}
                <tspan className="text-[20px]" dx={1}>%</tspan>
            </text>
            <text x={CX} y={CY + 28} textAnchor="middle" className={`font-mono text-[9.5px] tabular-nums tracking-wide ${className}`}>
                {reading}
            </text>
        </>
    );

    return (
        <div ref={wrapRef} className={`relative mx-auto w-full max-w-[260px] ${className}`}>
            <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${reading}, ${percent}%`}>
                <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} aria-hidden="true" className="block h-auto w-full overflow-visible">
                    <defs>
                        <clipPath id={`${uid}-inside`}>
                            <path d={INSIDE}/>
                        </clipPath>
                        <clipPath id={`${uid}-liquid`}>
                            <path ref={(node) => { partsRef.current.clip = node; }}/>
                        </clipPath>
                        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor={colors[0]}/>
                            <stop offset="1" stopColor={colors[1]}/>
                        </linearGradient>
                        <radialGradient id={`${uid}-shadow`}>
                            <stop offset="0" stopColor="#0f172a" stopOpacity="0.28"/>
                            <stop offset="1" stopColor="#0f172a" stopOpacity="0"/>
                        </radialGradient>
                    </defs>

                    <ellipse ref={(node) => { partsRef.current.shadow = node; }} cx={CX} cy={CY + R_OUT + 12} rx={58} ry={7} fill={`url(#${uid}-shadow)`}/>

                    <g ref={(node) => { partsRef.current.group = node; }}>
                        <path d={GLASS} className="fill-white/60 dark:fill-white/[0.04]"/>
                        {readingText("fill-slate-800 dark:fill-slate-100")}

                        <g clipPath={`url(#${uid}-inside)`}>
                            <path ref={(node) => { partsRef.current.back = node; }} fill={colors[0]} opacity={0.45}/>
                            <path ref={(node) => { partsRef.current.front = node; }} fill={`url(#${uid}-fill)`}/>
                            <path ref={(node) => { partsRef.current.line = node; }} fill="none" stroke="white" strokeOpacity={0.55} strokeWidth={1.2}/>
                            <g clipPath={`url(#${uid}-liquid)`}>
                                {readingText("fill-white")}
                                {Array.from({length: BUBBLES}, (_, index) => (
                                    <circle key={index} ref={(node) => { partsRef.current.bubbles[index] = node; }} opacity={0} fill="white" fillOpacity={0.18} stroke="white" strokeOpacity={0.7} strokeWidth={0.6}/>
                                ))}
                            </g>
                        </g>

                        {/* Graduations, spaced by volume, so they bunch up near the widest part of the bulb. */}
                        {tickValues.map((mark) => {
                            const y = levelFor(max > 0 ? mark / max : 0);
                            const half = Math.sqrt(Math.max(0, R_IN * R_IN - (y - CY) * (y - CY)));
                            return (
                                <g key={mark} className="fill-slate-500 stroke-slate-400 dark:fill-slate-400 dark:stroke-slate-500">
                                    <line x1={CX + half - 12} x2={CX + half - 3} y1={y} y2={y} strokeWidth={0.8}/>
                                    <text x={CX + half - 15} y={y + 2.5} textAnchor="end" stroke="none" className="font-mono text-[7px] tabular-nums">{mark.toFixed(precision)}</text>
                                </g>
                            );
                        })}

                        <path d={GLASS} fill="none" strokeWidth={1.6} strokeLinejoin="round" className="stroke-slate-300 dark:stroke-slate-600"/>
                        <rect x={CX - NECK_OUT - 4} y={NECK_TOP - 6} width={(NECK_OUT + 4) * 2} height={7} rx={3.5} strokeWidth={1.2} className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-600"/>
                        {/* Specular highlights from a light above and to the left. */}
                        <path d={`M${CX - R_OUT + 14} ${CY - 18} A${R_OUT - 14} ${R_OUT - 14} 0 0 1 ${CX - 30} ${CY - R_OUT + 20}`} fill="none" strokeWidth={4} strokeLinecap="round" className="stroke-white/80 dark:stroke-white/20"/>
                        <circle cx={CX - R_OUT + 20} cy={CY + 4} r={2} className="fill-white/80 dark:fill-white/20"/>
                        <line x1={CX - NECK_OUT + 6} x2={CX - NECK_OUT + 6} y1={NECK_TOP + 8} y2={JOIN_OUT - 6} strokeWidth={2.5} strokeLinecap="round" className="stroke-white/70 dark:stroke-white/15"/>
                    </g>
                </svg>
            </div>

            <button
                type="button"
                aria-label={`Swirl the ${label.toLowerCase()} flask`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={() => {
                    if (liquidRef.current) liquidRef.current.hover = null;
                }}
                onKeyDown={handleKeyDown}
                className={`absolute inset-x-[8%] bottom-[6%] top-0 touch-none rounded-[40%] outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${reduceMotion ? "cursor-default" : "cursor-grab active:cursor-grabbing"}`}
            />
        </div>
    );
};
