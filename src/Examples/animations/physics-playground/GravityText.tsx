import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {useInView, useReducedMotion} from "framer-motion";
import {LuArrowDownToLine, LuUndo2} from "react-icons/lu";

export interface GravityTextProps {
    /** The headline. Screen readers get it as plain text; the falling letters are decoration. */
    text: string;
    /** Small line above the stage, e.g. an error code and path. */
    eyebrow?: ReactNode;
    /** Sentence under the headline. Letters fall over it but it stays readable. */
    caption?: ReactNode;
    /** Height of the stage the letters fall into, in px. */
    height?: number;
    className?: string;
}

type GlyphState = "home" | "free" | "return";

interface Circle {
    ox: number;
    oy: number;
    r: number;
}

interface Glyph {
    // Home center and half extents, from the laid out headline.
    hx: number;
    hy: number;
    hw: number;
    hh: number;
    x: number;
    y: number;
    a: number;
    vx: number;
    vy: number;
    va: number;
    invMass: number;
    invInertia: number;
    reach: number;
    circles: Circle[];
    state: GlyphState;
    releaseAt: number;
    returnAt: number;
}

interface Grab {
    index: number;
    pointerId: number;
    lx: number;
    ly: number;
    tx: number;
    ty: number;
}

interface World {
    glyphs: Glyph[];
    width: number;
    height: number;
    time: number;
    grab: Grab | null;
    pointer: {x: number; y: number; vx: number; vy: number; inside: boolean; last: number};
    still: number;
}

const STEP = 1 / 120;
const GRAVITY = 2600;
const RESTITUTION = 0.28;
const FRICTION = 0.55;
const ITERATIONS = 4;
const POINTER_RADIUS = 18;
const CORNERS = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

const applyImpulse = (g: Glyph, jx: number, jy: number, rx: number, ry: number) => {
    g.vx += jx * g.invMass;
    g.vy += jy * g.invMass;
    g.va += (rx * jy - ry * jx) * g.invInertia;
};

// Impulse against an immovable surface with normal (nx, ny) at offset (rx, ry) from the glyph's center.
const contactStatic = (g: Glyph, rx: number, ry: number, nx: number, ny: number, surfaceVx = 0, surfaceVy = 0, bounce = RESTITUTION) => {
    const vn = (g.vx - g.va * ry - surfaceVx) * nx + (g.vy + g.va * rx - surfaceVy) * ny;
    if (vn >= 0) return;
    const rn = rx * ny - ry * nx;
    const j = (-(1 + (vn < -140 ? bounce : 0)) * vn) / (g.invMass + rn * rn * g.invInertia);
    applyImpulse(g, j * nx, j * ny, rx, ry);
    const tx = -ny;
    const ty = nx;
    const vt = (g.vx - g.va * ry - surfaceVx) * tx + (g.vy + g.va * rx - surfaceVy) * ty;
    const rt = rx * ty - ry * tx;
    const limit = FRICTION * j;
    const jt = Math.max(-limit, Math.min(limit, -vt / (g.invMass + rt * rt * g.invInertia)));
    applyImpulse(g, jt * tx, jt * ty, rx, ry);
};

// Walls and floor use the four corners of the glyph box, so letters come to rest flat on a side.
const collideBounds = (g: Glyph, world: World) => {
    const cos = Math.cos(g.a);
    const sin = Math.sin(g.a);
    let floor = 0;
    let left = 0;
    let right = 0;
    for (const [sx, sy] of CORNERS) {
        const lx = sx * g.hw;
        const ly = sy * g.hh;
        const rx = lx * cos - ly * sin;
        const ry = lx * sin + ly * cos;
        const px = g.x + rx;
        const py = g.y + ry;
        if (py > world.height) {
            contactStatic(g, rx, ry, 0, -1);
            floor = Math.max(floor, py - world.height);
        }
        if (px < 0) {
            contactStatic(g, rx, ry, 1, 0);
            left = Math.max(left, -px);
        }
        if (px > world.width) {
            contactStatic(g, rx, ry, -1, 0);
            right = Math.max(right, px - world.width);
        }
    }
    g.y -= floor * 0.8;
    g.x += left * 0.8 - right * 0.8;
};

// Glyph against glyph, approximated by a row of circles along each glyph's long side.
const collidePair = (a: Glyph, b: Glyph) => {
    const cx = b.x - a.x;
    const cy = b.y - a.y;
    const reach = a.reach + b.reach;
    if (cx * cx + cy * cy > reach * reach) return;
    const cosA = Math.cos(a.a);
    const sinA = Math.sin(a.a);
    const cosB = Math.cos(b.a);
    const sinB = Math.sin(b.a);
    for (const ca of a.circles) {
        const ax = a.x + ca.ox * cosA - ca.oy * sinA;
        const ay = a.y + ca.ox * sinA + ca.oy * cosA;
        for (const cb of b.circles) {
            const bx = b.x + cb.ox * cosB - cb.oy * sinB;
            const by = b.y + cb.ox * sinB + cb.oy * cosB;
            const dx = bx - ax;
            const dy = by - ay;
            const radii = ca.r + cb.r;
            const d2 = dx * dx + dy * dy;
            if (d2 >= radii * radii || d2 === 0) continue;
            const distance = Math.sqrt(d2);
            const nx = dx / distance;
            const ny = dy / distance;
            const px = ax + nx * ca.r;
            const py = ay + ny * ca.r;
            const rax = px - a.x;
            const ray = py - a.y;
            const rbx = px - b.x;
            const rby = py - b.y;
            const rvx = b.vx - b.va * rby - (a.vx - a.va * ray);
            const rvy = b.vy + b.va * rbx - (a.vy + a.va * rax);
            const vn = rvx * nx + rvy * ny;
            if (vn < 0) {
                const ran = rax * ny - ray * nx;
                const rbn = rbx * ny - rby * nx;
                const k = a.invMass + b.invMass + ran * ran * a.invInertia + rbn * rbn * b.invInertia;
                const j = (-(1 + (vn < -140 ? RESTITUTION : 0)) * vn) / k;
                applyImpulse(a, -j * nx, -j * ny, rax, ray);
                applyImpulse(b, j * nx, j * ny, rbx, rby);
                const tx = -ny;
                const ty = nx;
                const tvx = b.vx - b.va * rby - (a.vx - a.va * ray);
                const tvy = b.vy + b.va * rbx - (a.vy + a.va * rax);
                const vt = tvx * tx + tvy * ty;
                const rat = rax * ty - ray * tx;
                const rbt = rbx * ty - rby * tx;
                const kt = a.invMass + b.invMass + rat * rat * a.invInertia + rbt * rbt * b.invInertia;
                const limit = FRICTION * j;
                const jt = Math.max(-limit, Math.min(limit, -vt / kt));
                applyImpulse(a, -jt * tx, -jt * ty, rax, ray);
                applyImpulse(b, jt * tx, jt * ty, rbx, rby);
            }
            const total = a.invMass + b.invMass;
            if (!total) continue;
            const correction = ((radii - distance) * 0.6) / total;
            a.x -= nx * correction * a.invMass;
            a.y -= ny * correction * a.invMass;
            b.x += nx * correction * b.invMass;
            b.y += ny * correction * b.invMass;
        }
    }
};

const setMass = (g: Glyph, free: boolean) => {
    const mass = g.hw * g.hh * 4;
    g.invMass = free ? 1 / mass : 0;
    g.invInertia = free ? 1 / ((mass * (4 * g.hw * g.hw + 4 * g.hh * g.hh)) / 12) : 0;
};

const makeCircles = (hw: number, hh: number): Circle[] => {
    const long = Math.max(hw, hh);
    const short = Math.min(hw, hh);
    const count = Math.max(1, Math.round(long / short));
    // Slightly smaller than the box so tightly tracked neighbours do not start out overlapping.
    const r = short * 0.9;
    const span = long - short;
    return Array.from({length: count}, (_, i) => {
        const offset = count === 1 ? 0 : -span + (2 * span * i) / (count - 1);
        return hw >= hh ? {ox: offset, oy: 0, r} : {ox: 0, oy: offset, r};
    });
};

const step = (world: World) => {
    world.time += STEP;
    const {glyphs, grab, pointer} = world;
    let returning = false;
    let moving = false;

    glyphs.forEach((g) => {
        if (g.state === "home" && world.time >= g.releaseAt) {
            g.state = "free";
            g.releaseAt = Infinity;
            setMass(g, true);
            g.va = (Math.random() - 0.5) * 3;
            g.vy = -40 - Math.random() * 120;
        }
        if (g.state === "free") {
            g.vy += GRAVITY * STEP;
            g.vx *= 0.999;
            g.va *= 0.995;
        }
        if (g.state === "return" && world.time >= g.returnAt) {
            // A slightly underdamped spring home, so each letter overshoots its slot by a hair.
            // Unwrap first so a letter that tumbled three times does not spin back three times.
            g.a = Math.atan2(Math.sin(g.a), Math.cos(g.a));
            g.vx += (170 * (g.hx - g.x) - 16 * g.vx) * STEP;
            g.vy += (170 * (g.hy - g.y) - 16 * g.vy) * STEP;
            g.va += (170 * -g.a - 16 * g.va) * STEP;
            g.x += g.vx * STEP;
            g.y += g.vy * STEP;
            g.a += g.va * STEP;
            const settled = Math.abs(g.hx - g.x) < 0.4 && Math.abs(g.hy - g.y) < 0.4 && Math.abs(g.a) < 0.004 && Math.hypot(g.vx, g.vy) < 6;
            if (settled) {
                g.state = "home";
                g.x = g.hx;
                g.y = g.hy;
                g.a = g.vx = g.vy = g.va = 0;
                setMass(g, false);
            }
        }
        if (g.state === "return") returning = true;
    });

    if (grab) {
        // A soft mouse joint at the grabbed point, so the letter dangles and swings from where it was picked up.
        const g = glyphs[grab.index];
        const cos = Math.cos(g.a);
        const sin = Math.sin(g.a);
        const rx = grab.lx * cos - grab.ly * sin;
        const ry = grab.lx * sin + grab.ly * cos;
        const dvx = (grab.tx - (g.x + rx)) * 22 - (g.vx - g.va * ry);
        const dvy = (grab.ty - (g.y + ry)) * 22 - (g.vy + g.va * rx);
        const k = g.invMass + (rx * rx + ry * ry) * g.invInertia;
        applyImpulse(g, (dvx / k) * 0.25, (dvy / k) * 0.25, rx, ry);
        g.va *= 0.97;
    }

    glyphs.forEach((g) => {
        if (g.state !== "free") return;
        g.x += g.vx * STEP;
        g.y += g.vy * STEP;
        g.a += g.va * STEP;
    });

    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
        for (let i = 0; i < glyphs.length; i++) {
            const a = glyphs[i];
            if (a.state === "return") continue;
            if (a.state === "free") collideBounds(a, world);
            for (let j = i + 1; j < glyphs.length; j++) {
                const b = glyphs[j];
                if (b.state === "return" || (a.state !== "free" && b.state !== "free")) continue;
                collidePair(a, b);
            }
        }
    }

    // A fast pointer sweeping through the pile kicks letters like a solid finger.
    const pointerSpeed = Math.hypot(pointer.vx, pointer.vy);
    if (pointer.inside && !grab && pointerSpeed > 80) {
        glyphs.forEach((g) => {
            if (g.state !== "free") return;
            const cos = Math.cos(g.a);
            const sin = Math.sin(g.a);
            for (const c of g.circles) {
                const cx = g.x + c.ox * cos - c.oy * sin;
                const cy = g.y + c.ox * sin + c.oy * cos;
                const dx = cx - pointer.x;
                const dy = cy - pointer.y;
                const distance = Math.hypot(dx, dy);
                const radii = c.r + POINTER_RADIUS;
                if (distance >= radii || distance === 0) continue;
                const nx = dx / distance;
                const ny = dy / distance;
                contactStatic(g, cx - nx * c.r - g.x, cy - ny * c.r - g.y, nx, ny, pointer.vx, pointer.vy, 0.4);
                g.x += nx * (radii - distance) * 0.5;
                g.y += ny * (radii - distance) * 0.5;
            }
        });
    }
    pointer.vx *= 0.85;
    pointer.vy *= 0.85;

    glyphs.forEach((g) => {
        if (g.state !== "free") return;
        const speed = Math.hypot(g.vx, g.vy);
        // Resting contact damping. Without it a pile keeps buzzing on the last pixel forever.
        if (speed < 14 && Math.abs(g.va) < 0.3) {
            g.vx *= 0.9;
            g.va *= 0.9;
        }
        if (speed > 6 || Math.abs(g.va) > 0.12) moving = true;
    });
    glyphs.forEach((g) => {
        if (g.releaseAt !== Infinity) moving = true;
    });

    world.still = moving || returning || grab ? 0 : world.still + 1;
};

const render = (world: World, spans: (HTMLSpanElement | null)[]) => {
    world.glyphs.forEach((g, index) => {
        const span = spans[index];
        if (!span) return;
        if (g.state === "home") {
            span.style.transform = "";
            span.style.textShadow = "";
            return;
        }
        span.style.transform = `translate(${(g.x - g.hx).toFixed(2)}px, ${(g.y - g.hy).toFixed(2)}px) rotate(${g.a.toFixed(4)}rad)`;
        // Keep the drop shadow pointing down whichever way the glyph is turned.
        const sx = 3 * Math.sin(g.a);
        const sy = 3 * Math.cos(g.a);
        span.style.textShadow = `${sx.toFixed(2)}px ${sy.toFixed(2)}px 0 rgba(0,0,0,0.12)`;
    });
};

/**
 * A headline whose letters drop into a pile as rigid bodies with rotation, friction and restitution. Letters can be
 * thrown, swept with a fast pointer and flown back into place with springs.
 */
export const GravityText = ({text, eyebrow, caption, height = 360, className = ""}: GravityTextProps) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const worldRef = useRef<World | null>(null);
    const frameRef = useRef(0);
    const activeRef = useRef(false);
    const inView = useInView(stageRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [scattered, setScattered] = useState(false);
    const active = inView && !reduceMotion;

    const words = text.split(/\s+/).filter(Boolean);
    let glyphIndex = 0;

    const measure = useCallback(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const spans = spanRefs.current.slice(0, Array.from(text.replace(/\s+/g, "")).length);
        const previous = worldRef.current;
        // offsetLeft/offsetTop ignore transforms, so homes stay correct even while letters lie in the pile.
        const glyphs = spans.map((span, index): Glyph => {
            const hw = (span?.offsetWidth ?? 0) / 2;
            const hh = (span?.offsetHeight ?? 0) / 2;
            const hx = (span?.offsetLeft ?? 0) + hw;
            const hy = (span?.offsetTop ?? 0) + hh;
            const old = previous?.glyphs[index];
            const glyph: Glyph = old
                ? {...old, hx, hy, hw, hh}
                : {hx, hy, hw, hh, x: hx, y: hy, a: 0, vx: 0, vy: 0, va: 0, invMass: 0, invInertia: 0, reach: 0, circles: [], state: "home", releaseAt: Infinity, returnAt: 0};
            if (glyph.state === "home") {
                glyph.x = hx;
                glyph.y = hy;
            }
            glyph.circles = makeCircles(hw, hh);
            glyph.reach = Math.hypot(hw, hh);
            setMass(glyph, glyph.state === "free");
            return glyph;
        });
        worldRef.current = {
            glyphs,
            width: stage.clientWidth,
            // The ruler along the bottom is 8px tall; letters land on top of it.
            height: stage.clientHeight - 8,
            time: previous?.time ?? 0,
            grab: previous?.grab ?? null,
            pointer: previous?.pointer ?? {x: 0, y: 0, vx: 0, vy: 0, inside: false, last: 0},
            still: 0,
        };
    }, [text]);

    const wake = useCallback(() => {
        const world = worldRef.current;
        if (!world) return;
        world.still = 0;
        if (frameRef.current || !activeRef.current) return;
        let last = performance.now();
        let pending = 0;
        const tick = (now: number) => {
            pending += Math.min(0.05, (now - last) / 1000);
            last = now;
            const current = worldRef.current!;
            while (pending >= STEP) {
                step(current);
                pending -= STEP;
            }
            render(current, spanRefs.current);
            if (current.still > 45) {
                frameRef.current = 0;
                return;
            }
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, []);

    useLayoutEffect(() => {
        measure();
        const stage = stageRef.current;
        if (!stage) return;
        let width = stage.clientWidth;
        const observer = new ResizeObserver(() => {
            if (stage.clientWidth === width) return;
            width = stage.clientWidth;
            measure();
            wake();
        });
        observer.observe(stage);
        // Web fonts can change the glyph widths after the first layout.
        document.fonts?.ready.then(measure);
        return () => observer.disconnect();
    }, [measure, wake]);

    useEffect(() => {
        activeRef.current = active;
        if (active) wake();
        return () => {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = 0;
        };
    }, [active, wake]);

    const release = (indices: number[], stagger: number) => {
        const world = worldRef.current;
        if (!world) return;
        indices.forEach((index, order) => {
            const g = world.glyphs[index];
            if (g.state !== "home") return;
            g.releaseAt = world.time + order * stagger;
        });
        setScattered(true);
        wake();
    };

    const drop = () => {
        const world = worldRef.current;
        if (!world) return;
        release(world.glyphs.map((_, index) => index), 0.028);
    };

    const reassemble = () => {
        const world = worldRef.current;
        if (!world) return;
        world.grab = null;
        world.glyphs.forEach((g, index) => {
            g.releaseAt = Infinity;
            if (g.state === "home") return;
            g.state = "return";
            g.returnAt = world.time + index * 0.022;
            // A small hop out of the pile before the spring takes over.
            g.vx = 0;
            g.vy = -260;
            g.va = 0;
        });
        setScattered(false);
        wake();
    };

    const toStage = (event: PointerEvent) => {
        const rect = stageRef.current!.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const world = worldRef.current;
        if (!world || reduceMotion || event.button !== 0) return;
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-glyph]");
        if (!target) return;
        const index = Number(target.dataset.glyph);
        const g = world.glyphs[index];
        if (g.state === "home") {
            release([index], 0);
            return;
        }
        if (g.state !== "free") return;
        const point = toStage(event);
        const dx = point.x - g.x;
        const dy = point.y - g.y;
        const cos = Math.cos(-g.a);
        const sin = Math.sin(-g.a);
        world.grab = {index, pointerId: event.pointerId, lx: dx * cos - dy * sin, ly: dx * sin + dy * cos, tx: point.x, ty: point.y};
        event.currentTarget.setPointerCapture(event.pointerId);
        wake();
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const world = worldRef.current;
        if (!world || reduceMotion) return;
        const point = toStage(event);
        const now = event.timeStamp;
        const {pointer} = world;
        const dt = Math.max(1, now - pointer.last) / 1000;
        if (pointer.inside && dt < 0.1) {
            pointer.vx = (point.x - pointer.x) / dt;
            pointer.vy = (point.y - pointer.y) / dt;
        }
        pointer.x = point.x;
        pointer.y = point.y;
        pointer.last = now;
        pointer.inside = true;
        if (world.grab?.pointerId === event.pointerId) {
            world.grab.tx = point.x;
            world.grab.ty = point.y;
        }
        if (world.grab || (scattered && Math.hypot(pointer.vx, pointer.vy) > 80)) wake();
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
        const world = worldRef.current;
        if (world?.grab?.pointerId !== event.pointerId) return;
        world.grab = null;
        wake();
    };

    const handlePointerLeave = () => {
        if (worldRef.current) worldRef.current.pointer.inside = false;
    };

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 dark:border-zinc-800 dark:bg-zinc-950 ${className}`}>
            <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-5 py-3 dark:border-zinc-800">
                <div className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.16em] text-stone-500 dark:text-zinc-500">{eyebrow}</div>
                {!reduceMotion && (
                    <button
                        type="button"
                        onClick={scattered ? reassemble : drop}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-800 shadow-sm transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
                    >
                        {scattered ? <LuUndo2 className="h-3.5 w-3.5" aria-hidden="true"/> : <LuArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true"/>}
                        {scattered ? "Reassemble" : "Drop"}
                    </button>
                )}
            </div>

            <div
                ref={stageRef}
                style={{height}}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                className="relative select-none overflow-hidden px-5 pt-10 sm:px-8"
            >
                <h2 className="text-[clamp(44px,10vw,104px)] font-black uppercase leading-[0.74] tracking-[-0.035em] text-stone-900 dark:text-zinc-50">
                    <span className="sr-only">{text}</span>
                    <span aria-hidden="true">
                        {words.map((word, wordIndex) => (
                            <span key={`${word}-${wordIndex}`}>
                                <span className="my-[0.07em] inline-block whitespace-nowrap">
                                    {Array.from(word).map((char) => {
                                        const index = glyphIndex++;
                                        return (
                                            <span
                                                key={index}
                                                ref={(node) => { spanRefs.current[index] = node; }}
                                                data-glyph={index}
                                                className={`relative z-10 inline-block touch-none will-change-transform ${reduceMotion ? "" : scattered ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </span>
                                {wordIndex < words.length - 1 && " "}
                            </span>
                        ))}
                    </span>
                </h2>
                {caption && <p className="mt-5 max-w-md text-sm leading-relaxed text-stone-500 dark:text-zinc-400">{caption}</p>}

                {/* Floor ruler, so the pile has something to land on. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2 border-t border-stone-300 bg-[repeating-linear-gradient(90deg,rgba(120,113,108,0.35)_0_1px,transparent_1px_12px)] dark:border-zinc-700 dark:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0_1px,transparent_1px_12px)]"/>
                {!reduceMotion && !scattered && (
                    <p className="pointer-events-none absolute bottom-4 right-5 font-mono text-[10px] text-stone-400 dark:text-zinc-600">Click a letter to knock it loose</p>
                )}
            </div>
        </div>
    );
};
