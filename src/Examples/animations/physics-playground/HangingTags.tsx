import {useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {useInView, useReducedMotion} from "framer-motion";

export interface HangingTag {
    id: string;
    firstName: string;
    lastName: string;
    company: string;
    /** Printed on the strip at the bottom of the badge, e.g. "Speaker". */
    role: string;
    /** Short code in mono next to the role, e.g. a badge number. */
    code: string;
    /** Strip color. Give the accent to the one role that matters and keep the rest neutral. */
    tone?: "accent" | "ink" | "plain";
}

export interface HangingTagsProps {
    tags: HangingTag[];
    /** Event name printed at the top of every badge. */
    event: string;
    /** Second line under the event name, e.g. dates and city. */
    eventDetail?: string;
    /** Small label painted on the wall above the rail. */
    railLabel?: string;
    /** Height of the wall in px. */
    height?: number;
    className?: string;
}

const TAG_W = 128;
const TAG_H = 176;
// Center of the eyelet, measured from the top of the badge. The badge rotates around this point.
const HOLE_Y = 14;
const SEGMENTS = 10;
const RAIL_Y = 44;
const GRAVITY = 1700;
const STEP = 1 / 120;
const ITERATIONS = 12;
const AIR = 0.993;
const MIN_SPACING = 104;
const SETTLE_STEPS = 90;
// Different string lengths so the badges hang at staggered heights, like a real pickup wall.
const DROPS = [54, 88, 68, 100, 60, 92, 76];
// First swing when the wall scrolls into view, in radians.
const INTRO_ANGLES = [0.5, -0.36, 0.28, -0.55, 0.42, -0.3, 0.48];

const tones = {
    accent: "bg-orange-600 text-white",
    ink: "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900",
    plain: "bg-stone-100 text-stone-600 dark:bg-zinc-800 dark:text-zinc-300",
};

interface Strand {
    // Point 0 is pinned to the rail, point SEGMENTS is the eyelet, the last point is the badge's center of mass.
    x: Float64Array;
    y: Float64Array;
    px: Float64Array;
    py: Float64Array;
    invMass: Float64Array;
    segment: number;
    body: number;
    radius: number;
}

interface Drag {
    index: number;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    targetX: number;
    targetY: number;
}

interface Sim {
    strands: Strand[];
    width: number;
    height: number;
    scale: number;
    drag: Drag | null;
    still: number;
}

const BODY = SEGMENTS + 1;

const createSim = (width: number, height: number, count: number, swing: boolean): Sim => {
    const spacing = width / count;
    const scale = Math.min(1, (spacing * 0.84) / TAG_W);
    const body = (TAG_H / 2 - HOLE_Y) * scale;
    const strands: Strand[] = [];
    for (let i = 0; i < count; i++) {
        const anchor = spacing * (i + 0.5);
        const room = height - RAIL_Y - TAG_H * scale - 18;
        const drop = Math.max(24, Math.min(DROPS[i % DROPS.length], room));
        const segment = drop / SEGMENTS;
        const angle = swing ? INTRO_ANGLES[i % INTRO_ANGLES.length] : 0;
        const size = SEGMENTS + 2;
        const x = new Float64Array(size);
        const y = new Float64Array(size);
        const invMass = new Float64Array(size).fill(1);
        for (let k = 0; k <= SEGMENTS; k++) {
            x[k] = anchor + Math.sin(angle) * segment * k;
            y[k] = RAIL_Y + Math.cos(angle) * segment * k;
        }
        x[BODY] = x[SEGMENTS] + Math.sin(angle * 1.25) * body;
        y[BODY] = y[SEGMENTS] + Math.cos(angle * 1.25) * body;
        invMass[0] = 0;
        // The card is much heavier than the string, so the string stays taut instead of the card being dragged around by it.
        invMass[BODY] = 0.2;
        strands.push({x, y, px: x.slice(), py: y.slice(), invMass, segment, body, radius: (TAG_W * scale) / 2});
    }
    return {strands, width, height, scale, drag: null, still: 0};
};

// Distance constraint. A string can go slack but never stretch; the eyelet-to-center link is rigid both ways.
const solve = (strand: Strand, a: number, b: number, length: number, slack: boolean, pinB: boolean) => {
    const wa = strand.invMass[a];
    const wb = pinB ? 0 : strand.invMass[b];
    const total = wa + wb;
    if (!total) return;
    const dx = strand.x[b] - strand.x[a];
    const dy = strand.y[b] - strand.y[a];
    const distance = Math.hypot(dx, dy) || 0.0001;
    if (slack && distance <= length) return;
    const diff = (distance - length) / distance / total;
    strand.x[a] += dx * diff * wa;
    strand.y[a] += dy * diff * wa;
    strand.x[b] -= dx * diff * wb;
    strand.y[b] -= dy * diff * wb;
};

const step = (sim: Sim) => {
    const gravity = GRAVITY * STEP * STEP;
    const {strands, drag} = sim;
    let motion = 0;

    strands.forEach((strand, index) => {
        for (let k = 1; k <= BODY; k++) {
            if (drag && drag.index === index && k === BODY) {
                // Easing towards the pointer instead of snapping keeps the release velocity smooth.
                strand.px[k] = strand.x[k];
                strand.py[k] = strand.y[k];
                strand.x[k] += (drag.targetX - strand.x[k]) * 0.3;
                strand.y[k] += (drag.targetY - strand.y[k]) * 0.3;
                continue;
            }
            const vx = (strand.x[k] - strand.px[k]) * AIR;
            const vy = (strand.y[k] - strand.py[k]) * AIR;
            strand.px[k] = strand.x[k];
            strand.py[k] = strand.y[k];
            strand.x[k] += vx;
            strand.y[k] += vy + gravity;
        }
    });

    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
        strands.forEach((strand, index) => {
            const pinned = drag?.index === index;
            for (let k = 1; k <= SEGMENTS; k++) solve(strand, k - 1, k, strand.segment, true, false);
            solve(strand, SEGMENTS, BODY, strand.body, false, pinned);
        });

        // Neighbours bump softly: push the two centers apart, half the overlap per pass.
        for (let i = 0; i < strands.length - 1; i++) {
            const a = strands[i];
            const b = strands[i + 1];
            const dx = b.x[BODY] - a.x[BODY];
            const dy = b.y[BODY] - a.y[BODY];
            const distance = Math.hypot(dx, dy) || 0.0001;
            const min = (a.radius + b.radius) * 0.94;
            if (distance >= min) continue;
            const wa = drag?.index === i ? 0 : 1;
            const wb = drag?.index === i + 1 ? 0 : 1;
            if (!wa && !wb) continue;
            const push = ((min - distance) / distance) * 0.5 / (wa + wb);
            a.x[BODY] -= dx * push * wa;
            a.y[BODY] -= dy * push * wa;
            b.x[BODY] += dx * push * wb;
            b.y[BODY] += dy * push * wb;
        }

        strands.forEach((strand) => {
            const edge = strand.radius * 0.7;
            strand.x[BODY] = Math.min(sim.width - edge, Math.max(edge, strand.x[BODY]));
            const floor = sim.height - (TAG_H / 2) * sim.scale - 4;
            if (strand.y[BODY] > floor) strand.y[BODY] = floor;
        });
    }

    strands.forEach((strand) => {
        for (let k = 1; k <= BODY; k++) {
            const dx = strand.x[k] - strand.px[k];
            const dy = strand.y[k] - strand.py[k];
            motion += dx * dx + dy * dy;
        }
    });
    sim.still = motion < 0.0015 * strands.length ? sim.still + 1 : 0;
};

const draw = (
    sim: Sim,
    ropes: (SVGPathElement | null)[],
    shadows: (SVGPathElement | null)[],
    cards: (HTMLElement | null)[],
) => {
    sim.strands.forEach((strand, index) => {
        const {x, y} = strand;
        // Quadratic curves through the midpoints turn the ten straight links into one smooth cord.
        let d = `M${x[0].toFixed(1)} ${y[0].toFixed(1)}`;
        for (let k = 1; k < SEGMENTS; k++) {
            d += ` Q${x[k].toFixed(1)} ${y[k].toFixed(1)} ${((x[k] + x[k + 1]) / 2).toFixed(1)} ${((y[k] + y[k + 1]) / 2).toFixed(1)}`;
        }
        d += ` L${x[SEGMENTS].toFixed(1)} ${y[SEGMENTS].toFixed(1)}`;
        ropes[index]?.setAttribute("d", d);
        shadows[index]?.setAttribute("d", d);

        const card = cards[index];
        if (!card) return;
        const hx = x[SEGMENTS];
        const hy = y[SEGMENTS];
        const angle = -Math.atan2(x[BODY] - hx, y[BODY] - hy);
        card.style.transform = `translate(${(hx - TAG_W / 2).toFixed(2)}px, ${(hy - HOLE_Y).toFixed(2)}px) rotate(${angle.toFixed(4)}rad) scale(${sim.scale})`;
        // The light sits above and to the left of the wall. Counter-rotate the shadow offset so it keeps
        // falling down and to the right however the badge is turned.
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const sx = 6 * cos + 11 * sin;
        const sy = -6 * sin + 11 * cos;
        card.style.boxShadow = `${sx.toFixed(1)}px ${sy.toFixed(1)}px 18px -6px rgba(28,25,23,0.3), 0 1px 1px rgba(28,25,23,0.08)`;
    });
};

/**
 * Conference badges hanging from a rail on strings. Each string is a ten-link verlet rope; drag a badge and let go
 * and it swings, bumps its neighbours and settles. The simulation sleeps once everything is still and while off screen.
 */
export const HangingTags = ({tags, event, eventDetail, railLabel, height = 380, className = ""}: HangingTagsProps) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const inView = useInView(stageRef);
    const reduceMotion = useReducedMotion() ?? false;
    const uid = useId().replace(/:/g, "");
    const hintId = `${uid}-hint`;
    const [width, setWidth] = useState(0);
    const simRef = useRef<Sim | null>(null);
    const frameRef = useRef(0);
    const activeRef = useRef(false);
    const introRef = useRef(true);
    const ropeRefs = useRef<(SVGPathElement | null)[]>([]);
    const shadowRefs = useRef<(SVGPathElement | null)[]>([]);
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const count = width ? Math.max(1, Math.min(tags.length, Math.floor(width / MIN_SPACING))) : 0;
    const shown = tags.slice(0, count);
    const active = inView && !reduceMotion;

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
        observer.observe(stage);
        return () => observer.disconnect();
    }, []);

    const render = useCallback(() => {
        if (simRef.current) draw(simRef.current, ropeRefs.current, shadowRefs.current, cardRefs.current);
    }, []);

    const wake = useCallback(() => {
        const sim = simRef.current;
        if (!sim) return;
        sim.still = 0;
        if (frameRef.current || !activeRef.current) return;
        let last = performance.now();
        let pending = 0;
        const tick = (now: number) => {
            pending += Math.min(0.05, (now - last) / 1000);
            last = now;
            while (pending >= STEP) {
                step(sim);
                pending -= STEP;
            }
            render();
            if (sim.still > SETTLE_STEPS && !sim.drag) {
                frameRef.current = 0;
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, [render]);

    // Build the rig before paint so badges never flash at the top-left corner. Only the first build swings in.
    useLayoutEffect(() => {
        if (!width || !count) return;
        simRef.current = createSim(width, height, count, introRef.current && !reduceMotion);
        introRef.current = false;
        render();
    }, [width, height, count, reduceMotion, render]);

    useEffect(() => {
        activeRef.current = active;
        if (active) wake();
        return () => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = 0;
        };
    }, [active, wake, width, height, count]);

    const toStage = (event: PointerEvent) => {
        const rect = stageRef.current!.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    const handlePointerDown = (index: number) => (event: PointerEvent<HTMLButtonElement>) => {
        const sim = simRef.current;
        if (!sim || reduceMotion || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const point = toStage(event);
        const strand = sim.strands[index];
        sim.drag = {
            index,
            pointerId: event.pointerId,
            offsetX: strand.x[BODY] - point.x,
            offsetY: strand.y[BODY] - point.y,
            targetX: strand.x[BODY],
            targetY: strand.y[BODY],
        };
        wake();
    };

    const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
        const drag = simRef.current?.drag;
        if (!drag || drag.pointerId !== event.pointerId) return;
        const strand = simRef.current!.strands[drag.index];
        const point = toStage(event);
        let dx = point.x + drag.offsetX - strand.x[0];
        let dy = point.y + drag.offsetY - strand.y[0];
        // Never pull further than the string reaches, or the solver would fight the pointer.
        const reach = strand.segment * SEGMENTS + strand.body - 1;
        const distance = Math.hypot(dx, dy);
        if (distance > reach) {
            dx *= reach / distance;
            dy *= reach / distance;
        }
        drag.targetX = strand.x[0] + dx;
        drag.targetY = strand.y[0] + dy;
    };

    const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
        const sim = simRef.current;
        if (sim?.drag?.pointerId !== event.pointerId) return;
        sim.drag = null;
        wake();
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
        const sim = simRef.current;
        if (!sim || reduceMotion) return;
        const direction = event.key === "ArrowLeft" ? -1 : ["ArrowRight", "Enter", " "].includes(event.key) ? 1 : 0;
        if (!direction) return;
        event.preventDefault();
        // Verlet stores velocity as the gap to the previous position, so moving that back is an impulse.
        sim.strands[index].px[BODY] -= direction * 4.5;
        wake();
    };

    return (
        <div
            ref={stageRef}
            style={{height}}
            className={`relative w-full max-w-3xl select-none overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 bg-[radial-gradient(circle,rgba(120,113,108,0.2)_1px,transparent_1.6px)] bg-[length:18px_18px] dark:border-zinc-800 dark:bg-zinc-950 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1.6px)] ${className}`}
        >
            {railLabel && (
                <p className="absolute left-5 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-zinc-500">
                    {railLabel}
                </p>
            )}

            {/* Rail with brackets at both ends. */}
            <div aria-hidden="true" className="absolute inset-x-3 h-[6px] rounded-full bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 shadow-[0_3px_4px_rgba(0,0,0,0.15)] dark:from-zinc-500 dark:via-zinc-300 dark:to-zinc-600" style={{top: RAIL_Y - 3}}/>
            <div aria-hidden="true" className="absolute left-2 h-4 w-2 rounded-sm bg-zinc-400 dark:bg-zinc-600" style={{top: RAIL_Y - 8}}/>
            <div aria-hidden="true" className="absolute right-2 h-4 w-2 rounded-sm bg-zinc-400 dark:bg-zinc-600" style={{top: RAIL_Y - 8}}/>

            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <defs>
                    <filter id={`${uid}-blur`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.6"/>
                    </filter>
                </defs>
                <g transform="translate(4 7)" filter={`url(#${uid}-blur)`}>
                    {shown.map((tag, index) => (
                        <path key={tag.id} ref={(node) => { shadowRefs.current[index] = node; }} fill="none" strokeWidth={2} className="stroke-stone-900/15 dark:stroke-black/60"/>
                    ))}
                </g>
            </svg>

            {shown.map((tag, index) => (
                <button
                    key={tag.id}
                    ref={(node) => { cardRefs.current[index] = node; }}
                    type="button"
                    aria-label={`${tag.firstName} ${tag.lastName}, ${tag.role}, ${tag.company}`}
                    aria-describedby={reduceMotion ? undefined : hintId}
                    onPointerDown={handlePointerDown(index)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={handleKeyDown(index)}
                    style={{width: TAG_W, height: TAG_H, transformOrigin: `${TAG_W / 2}px ${HOLE_Y}px`}}
                    className={`absolute left-0 top-0 flex touch-none flex-col overflow-hidden rounded-[10px] border border-stone-200 bg-white text-left outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950 ${reduceMotion ? "" : "cursor-grab active:cursor-grabbing"}`}
                >
                    {/* Punched eyelet. Its fill matches the wall so it reads as a hole. */}
                    <span className="mx-auto mt-[9px] h-[10px] w-[10px] shrink-0 rounded-full border-2 border-zinc-400 bg-stone-100 shadow-[inset_0_1px_1px_rgba(0,0,0,0.25)] dark:border-zinc-500 dark:bg-zinc-950"/>
                    <span className="mt-2.5 px-3 font-mono text-[8.5px] font-medium uppercase tracking-[0.18em] text-stone-800 dark:text-zinc-200">{event}</span>
                    {eventDetail && <span className="px-3 font-mono text-[8px] uppercase tracking-[0.12em] text-stone-400 dark:text-zinc-500">{eventDetail}</span>}
                    <span className="mt-auto px-3 text-[17px] font-semibold leading-[1.1] tracking-tight text-stone-900 dark:text-zinc-50">
                        {tag.firstName}
                        <br/>
                        {tag.lastName}
                    </span>
                    <span className="mt-1 truncate px-3 text-[10px] text-stone-500 dark:text-zinc-400">{tag.company}</span>
                    <span className={`mt-3 flex items-center justify-between px-3 py-1.5 ${tones[tag.tone ?? "plain"]}`}>
                        <span className="text-[8.5px] font-semibold uppercase tracking-[0.2em]">{tag.role}</span>
                        <span className="font-mono text-[8.5px] tabular-nums opacity-80">{tag.code}</span>
                    </span>
                </button>
            ))}

            {/* Cords are drawn above the badges so they visibly thread into each eyelet. */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                {shown.map((tag, index) => (
                    <g key={tag.id}>
                        <path ref={(node) => { ropeRefs.current[index] = node; }} fill="none" strokeWidth={1.4} strokeLinecap="round" className="stroke-stone-500 dark:stroke-zinc-400"/>
                        <circle cx={(width / count) * (index + 0.5)} cy={RAIL_Y} r={3.5} fill="none" strokeWidth={1.5} className="stroke-zinc-500 dark:stroke-zinc-300"/>
                    </g>
                ))}
            </svg>

            {!reduceMotion && (
                <p id={hintId} className="absolute bottom-3 right-4 font-mono text-[10px] text-stone-400 dark:text-zinc-600">
                    Drag a badge and let go · arrow keys nudge
                </p>
            )}
        </div>
    );
};
