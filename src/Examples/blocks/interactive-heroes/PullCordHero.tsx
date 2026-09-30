import {useCallback, useEffect, useId, useRef, useState} from "react";
import type {PointerEvent as ReactPointerEvent, ReactNode} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface PullCordHeroProps {
    eyebrow: string;
    headline: ReactNode;
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    /** Start with the light on. */
    defaultLit?: boolean;
    /** Called with the new state each time the light is switched. */
    onLightChange?: (lit: boolean) => void;
    className?: string;
}

interface RopePoint {
    x: number;
    y: number;
    px: number;
    py: number;
}

interface Geometry {
    width: number;
    height: number;
    lampX: number;
    wire: number;
    shadeWidth: number;
    shadeHeight: number;
    anchorX: number;
    anchorY: number;
    cord: number;
}

const SEGMENTS = 10;
const GRAVITY = 0.45;
/** How far the switch inside the lamp travels, in px, and how far it must go to click. */
const TRAVEL = 30;
const CLICK_AT = 19;

const layout = (width: number, height: number): Geometry => {
    const compact = width < 640;
    const lampX = width / 2;
    const wire = compact ? 22 : 34;
    const shadeWidth = compact ? 104 : 140;
    const shadeHeight = shadeWidth * 0.42;
    return {
        width,
        height,
        lampX,
        wire,
        shadeWidth,
        shadeHeight,
        anchorX: lampX + shadeWidth * 0.43,
        anchorY: wire + shadeHeight - 3,
        cord: compact ? 78 : 100,
    };
};

// A deterministic scatter so the dust motes land in the same places on every render.
const motes = Array.from({length: 14}, (_, index) => {
    const seed = Math.sin(index * 91.7) * 43758.5453;
    const random = seed - Math.floor(seed);
    const seed2 = Math.sin(index * 12.9 + 4.1) * 24634.6345;
    const random2 = seed2 - Math.floor(seed2);
    return {depth: 0.2 + random * 0.75, spread: random2 * 2 - 1, size: 1 + random2 * 1.6, duration: 7 + random * 9, delay: random2 * -12};
});

const ActionLink = ({action, className}: {action: HeroAction; className: string}) =>
    action.href ? (
        <a href={action.href} onClick={action.onClick} className={className} data-cast="">
            {action.label}
        </a>
    ) : (
        <button type="button" onClick={action.onClick} className={className} data-cast="">
            {action.label}
        </button>
    );

/**
 * A hero that starts in a dark room. Pull the lamp's cord past its click point and a warm cone of
 * light fills the headline; pull again to switch it off. The cord is a small verlet rope, and a
 * wall switch drives the same state for keyboard and screen reader users.
 */
export const PullCordHero = ({
    eyebrow,
    headline,
    description,
    primaryAction,
    secondaryAction,
    defaultLit = false,
    onLightChange,
    className = "",
}: PullCordHeroProps) => {
    const rootRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const beadRef = useRef<HTMLButtonElement>(null);
    const lampRef = useRef<HTMLDivElement>(null);
    const coneRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    const gradientId = useId().replace(/:/g, "");
    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [lit, setLit] = useState(defaultLit);
    const [pulled, setPulled] = useState(defaultLit);
    const [geometry, setGeometry] = useState<Geometry>(() => layout(800, 620));

    const litRef = useRef(lit);
    const onChangeRef = useRef(onLightChange);
    onChangeRef.current = onLightChange;

    const rope = useRef({
        points: [] as RopePoint[],
        dragging: false,
        scriptedUntil: 0,
        target: {x: 0, y: 0},
        travel: 0,
        lampY: 0,
        lampVelocity: 0,
        latched: false,
        running: false,
        wake: () => {},
    });

    const toggle = useCallback(() => {
        const next = !litRef.current;
        litRef.current = next;
        setLit(next);
        setPulled(true);
        rope.current.lampVelocity += 2.2;
        rope.current.wake();
        onChangeRef.current?.(next);
    }, []);

    // A short scripted yank, so the wall switch and a tap on the bead still move the cord.
    const tug = useCallback(() => {
        const state = rope.current;
        if (reduceMotion) return;
        state.scriptedUntil = performance.now() + 150;
        state.wake();
    }, [reduceMotion]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const update = () => setGeometry(layout(root.clientWidth, root.clientHeight));
        update();
        const observer = new ResizeObserver(update);
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    // Rebuild the rope hanging straight down whenever the layout changes.
    useEffect(() => {
        const {anchorX, anchorY, cord} = geometry;
        rope.current.points = Array.from({length: SEGMENTS + 1}, (_, index) => {
            const y = anchorY + (cord / SEGMENTS) * index;
            return {x: anchorX, y, px: anchorX, py: y};
        });
        rope.current.wake();
    }, [geometry]);

    // Shadows fall away from the lamp's mouth, so each button casts in its own direction.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const box = root.getBoundingClientRect();
        const mouthX = geometry.lampX;
        const mouthY = geometry.wire + geometry.shadeHeight;
        const cast = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const dx = rect.left + rect.width / 2 - box.left - mouthX;
            const dy = rect.top + rect.height / 2 - box.top - mouthY;
            const length = Math.hypot(dx, dy) || 1;
            return {x: (dx / length) * 9, y: (dy / length) * 9};
        };
        root.querySelectorAll<HTMLElement>("[data-cast]").forEach((element) => {
            const {x, y} = cast(element);
            element.style.boxShadow = lit ? `${x.toFixed(1)}px ${y.toFixed(1)}px 18px -4px rgba(62, 38, 12, 0.35)` : "";
        });
        if (headlineRef.current) {
            const {x, y} = cast(headlineRef.current);
            headlineRef.current.style.textShadow = lit ? `${(x * 0.5).toFixed(1)}px ${(y * 0.5).toFixed(1)}px 10px rgba(62, 38, 12, 0.18)` : "";
        }
    }, [lit, geometry]);

    useEffect(() => {
        const state = rope.current;
        let frame = 0;

        const draw = () => {
            const points = state.points;
            if (!points.length) return;
            let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
            for (let index = 1; index < points.length - 1; index++) {
                const midX = (points[index].x + points[index + 1].x) / 2;
                const midY = (points[index].y + points[index + 1].y) / 2;
                d += ` Q${points[index].x.toFixed(1)} ${points[index].y.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
            }
            const last = points[points.length - 1];
            d += ` L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
            pathRef.current?.setAttribute("d", d);
            if (beadRef.current) beadRef.current.style.transform = `translate(${last.x.toFixed(1)}px, ${last.y.toFixed(1)}px)`;
            if (lampRef.current) lampRef.current.style.transform = `translate3d(0, ${state.lampY.toFixed(2)}px, 0)`;
            if (coneRef.current) coneRef.current.style.transform = `translate3d(-50%, ${state.lampY.toFixed(2)}px, 0)`;
        };

        const step = (now: number) => {
            const points = state.points;
            if (!points.length) return 0;
            const {anchorX, anchorY, cord} = geometry;
            const scripted = now < state.scriptedUntil;
            const held = state.dragging || scripted;
            const lastIndex = points.length - 1;

            if (scripted) state.target = {x: anchorX + 2, y: anchorY + cord + TRAVEL};

            if (held) {
                // The cord cannot stretch, so anything past its length becomes switch travel.
                const dx = state.target.x - anchorX;
                const dy = state.target.y - anchorY;
                const distance = Math.hypot(dx, dy) || 1;
                const reach = Math.min(distance, cord + TRAVEL);
                state.travel = Math.max(0, reach - cord);
                const last = points[lastIndex];
                last.px = last.x;
                last.py = last.y;
                last.x = anchorX + (dx / distance) * reach;
                last.y = anchorY + (dy / distance) * reach;
            } else {
                state.travel *= 0.6;
            }

            if (state.dragging && state.travel >= CLICK_AT && !state.latched) {
                state.latched = true;
                toggle();
            }
            if (state.travel < CLICK_AT * 0.4) state.latched = false;

            // The lamp dips on its wire as the switch is pulled, then bobs back.
            const lampTarget = held ? state.travel * 0.22 : 0;
            state.lampVelocity = (state.lampVelocity + (lampTarget - state.lampY) * 0.18) * 0.8;
            state.lampY += state.lampVelocity;

            const anchor = points[0];
            anchor.x = anchorX;
            anchor.y = anchorY + state.lampY;
            anchor.px = anchor.x;
            anchor.py = anchor.y;

            let energy = 0;
            for (let index = 1; index < points.length; index++) {
                if (index === lastIndex && held) continue;
                const point = points[index];
                const vx = (point.x - point.px) * 0.985;
                const vy = (point.y - point.py) * 0.985;
                point.px = point.x;
                point.py = point.y;
                point.x += vx;
                point.y += vy + GRAVITY;
                energy += Math.abs(vx) + Math.abs(vy);
            }

            const segment = (cord + state.travel) / SEGMENTS;
            for (let iteration = 0; iteration < 18; iteration++) {
                for (let index = 0; index < lastIndex; index++) {
                    const a = points[index];
                    const b = points[index + 1];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const distance = Math.hypot(dx, dy) || 0.0001;
                    const weightA = index === 0 ? 0 : 1;
                    const weightB = index + 1 === lastIndex && held ? 0 : 1;
                    const total = weightA + weightB;
                    if (!total) continue;
                    const correction = (distance - segment) / distance / total;
                    a.x += dx * correction * weightA;
                    a.y += dy * correction * weightA;
                    b.x -= dx * correction * weightB;
                    b.y -= dy * correction * weightB;
                }
            }
            return energy + Math.abs(state.lampVelocity) * 10 + state.travel + (held ? 1 : 0);
        };

        const tick = (now: number) => {
            const energy = step(now);
            draw();
            // Sleep once the cord hangs still; any touch or toggle wakes it again.
            if (energy < 0.02) {
                state.running = false;
                return;
            }
            frame = requestAnimationFrame(tick);
        };

        state.wake = () => {
            if (state.running || !inView) return;
            state.running = true;
            frame = requestAnimationFrame(tick);
        };

        draw();
        state.wake();
        return () => {
            cancelAnimationFrame(frame);
            state.running = false;
            state.wake = () => {};
        };
    }, [geometry, inView, toggle]);

    const gesture = useRef({x: 0, y: 0, time: 0});

    const toLocal = (event: ReactPointerEvent) => {
        const box = rootRef.current?.getBoundingClientRect();
        return {x: event.clientX - (box?.left ?? 0), y: event.clientY - (box?.top ?? 0)};
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
        // Keeps the drag from selecting the headline text underneath.
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current = {x: event.clientX, y: event.clientY, time: performance.now()};
        const state = rope.current;
        state.dragging = true;
        state.target = toLocal(event);
        state.wake();
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
        if (!rope.current.dragging) return;
        rope.current.target = toLocal(event);
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
        const state = rope.current;
        if (!state.dragging) return;
        state.dragging = false;
        // A quick tap without a pull still works the switch.
        const moved = Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y);
        if (moved < 5 && performance.now() - gesture.current.time < 350) {
            tug();
            toggle();
        }
    };

    const switchLight = () => {
        tug();
        toggle();
    };

    const {lampX, wire, shadeWidth, shadeHeight, height} = geometry;
    const mouthY = wire + shadeHeight;
    const contentTop = geometry.anchorY + geometry.cord + 34;
    const coneWidth = Math.max(geometry.width * 1.6, 900);

    const compact = geometry.width < 640;
    const wallSwitch = (
        <button
            type="button"
            aria-pressed={lit}
            onClick={switchLight}
            className={`z-10 flex items-center gap-2.5 rounded-lg border py-1.5 pl-1.5 pr-3 text-xs font-medium transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${compact ? "mt-10" : "absolute left-6 top-6"} ${lit ? "border-stone-300 bg-white/70 text-stone-700 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300" : "border-stone-800 bg-stone-900 text-stone-400"}`}
        >
            <span className={`relative flex h-7 w-5 justify-center rounded-[5px] border p-0.5 transition-colors ${lit ? "border-stone-300 bg-stone-100 dark:border-stone-600 dark:bg-stone-800" : "border-stone-700 bg-stone-950"}`}>
                <motion.span
                    className={`block h-2.5 w-3 rounded-[3px] ${lit ? "bg-amber-400" : "bg-stone-600"}`}
                    initial={false}
                    animate={{y: lit ? 0 : 12}}
                    transition={{type: "spring", stiffness: 700, damping: 30}}
                />
            </span>
            {lit ? "Turn off the light" : "Turn on the light"}
        </button>
    );

    const flicker = reduceMotion
        ? {opacity: lit ? 1 : 0, transition: {duration: 0.2}}
        : lit
            ? {opacity: [0, 0.75, 0.3, 0.9, 1], transition: {duration: 0.55, times: [0, 0.08, 0.16, 0.3, 1], ease: "easeOut" as const}}
            : {opacity: 0, transition: {duration: 0.22, ease: "easeIn" as const}};

    const ink = lit ? "text-stone-900 dark:text-stone-50" : "text-stone-700";
    const muted = lit ? "text-stone-600 dark:text-stone-400" : "text-stone-700";

    return (
        <section
            ref={rootRef}
            className={`relative isolate min-h-[640px] w-full overflow-hidden bg-[#0e0d0c] [--cone:255_229_184] dark:[--cone:255_196_120] ${className}`}
        >
            {/* The room itself, which only exists once the light is on. */}
            <motion.div aria-hidden="true" initial={false} animate={flicker} className="absolute inset-0 -z-10 bg-[#ece4d6] dark:bg-[#18140f]"/>

            <motion.div aria-hidden="true" initial={false} animate={flicker} className="pointer-events-none absolute inset-0 -z-10">
                <div
                    ref={coneRef}
                    className="absolute"
                    style={{
                        left: lampX,
                        top: mouthY - 6,
                        width: coneWidth,
                        height: height - mouthY + 6,
                        transform: "translate3d(-50%, 0, 0)",
                        background: `conic-gradient(from 146deg at 50% 0%, rgb(var(--cone) / 0) 0deg, rgb(var(--cone) / 0.55) 9deg, rgb(var(--cone) / 0.42) 34deg, rgb(var(--cone) / 0.55) 59deg, rgb(var(--cone) / 0) 68deg, transparent 68deg)`,
                        WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 12%, rgba(0,0,0,0.55) 55%, transparent 92%)",
                        maskImage: "radial-gradient(120% 100% at 50% 0%, #000 12%, rgba(0,0,0,0.55) 55%, transparent 92%)",
                    }}
                />
                {/* A pool on the floor where the cone lands. */}
                <div
                    className="absolute bottom-0 h-40 -translate-x-1/2 translate-y-1/2 rounded-[50%] blur-2xl"
                    style={{left: lampX, width: Math.min(geometry.width * 0.9, 760), background: "rgb(var(--cone) / 0.5)"}}
                />
                {!reduceMotion && lit && motes.map((mote, index) => {
                    const y = mouthY + mote.depth * (height - mouthY) * 0.8;
                    const halfWidth = (y - mouthY) * Math.tan((31 * Math.PI) / 180);
                    return (
                        <motion.span
                            key={index}
                            className="absolute rounded-full bg-amber-50"
                            style={{left: lampX + mote.spread * halfWidth * 0.8, top: y, width: mote.size, height: mote.size}}
                            animate={{x: [0, 14 * mote.spread, -8, 0], y: [0, -18, 6, 0], opacity: [0, 0.7, 0.4, 0]}}
                            transition={{duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: "easeInOut"}}
                        />
                    );
                })}
            </motion.div>

            {/* Lamp: wire, enamel shade, and the bulb's glow on the inside of the lip. */}
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0" style={{transform: `translateX(${lampX}px)`}}>
                <div ref={lampRef}>
                    <div className="absolute left-0 top-0 w-px -translate-x-1/2 bg-stone-600" style={{height: wire + 4}}/>
                    <svg width={shadeWidth} height={shadeHeight + 14} viewBox={`0 0 ${shadeWidth} ${shadeHeight + 14}`} className="absolute overflow-visible" style={{left: -shadeWidth / 2, top: wire}}>
                        <defs>
                            <linearGradient id={`${gradientId}-enamel`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0" stopColor="#3b3631"/>
                                <stop offset="0.28" stopColor="#57504a"/>
                                <stop offset="0.55" stopColor="#2a2622"/>
                                <stop offset="1" stopColor="#161412"/>
                            </linearGradient>
                            <radialGradient id={`${gradientId}-bulb`} cx="0.5" cy="0.5" r="0.5">
                                <stop offset="0" stopColor="#fffaf0"/>
                                <stop offset="0.45" stopColor="#ffd9a0"/>
                                <stop offset="1" stopColor="#ffb35c" stopOpacity="0"/>
                            </radialGradient>
                        </defs>
                        <rect x={shadeWidth / 2 - 7} y={-5} width={14} height={9} rx={2} fill="#6b635a"/>
                        <path
                            d={`M0 ${shadeHeight} C0 ${shadeHeight * 0.32} ${shadeWidth * 0.2} 0 ${shadeWidth / 2} 0 C${shadeWidth * 0.8} 0 ${shadeWidth} ${shadeHeight * 0.32} ${shadeWidth} ${shadeHeight} Z`}
                            fill={`url(#${gradientId}-enamel)`}
                        />
                        <ellipse cx={shadeWidth / 2} cy={shadeHeight} rx={shadeWidth / 2} ry={4} fill="#0b0a09"/>
                        <motion.g initial={false} animate={flicker}>
                            <ellipse cx={shadeWidth / 2} cy={shadeHeight} rx={shadeWidth / 2 - 1.5} ry={3.2} fill="#ffe7c2"/>
                            <circle cx={shadeWidth / 2} cy={shadeHeight + 3} r={26} fill={`url(#${gradientId}-bulb)`}/>
                        </motion.g>
                        <circle cx={shadeWidth / 2} cy={shadeHeight + 2} r={lit ? 7 : 6.5} fill={lit ? "#fff6e6" : "#3a3530"}/>
                    </svg>
                </div>
            </div>

            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <path ref={pathRef} fill="none" strokeWidth={1.6} strokeLinecap="round" className={`transition-colors duration-700 ${lit ? "stroke-stone-500 dark:stroke-stone-400" : "stroke-stone-600"}`}/>
            </svg>

            <button
                ref={beadRef}
                type="button"
                aria-label={lit ? "Pull the cord to turn the light off" : "Pull the cord to turn the light on"}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={(event) => {
                    // Pointer presses are handled above; this is the keyboard path (Enter or Space).
                    if (event.detail === 0) switchLight();
                }}
                className="group absolute left-0 top-0 z-20 -ml-4 -mt-1.5 flex h-9 w-8 touch-none cursor-grab items-start justify-center rounded-full focus-visible:outline-none active:cursor-grabbing"
            >
                <span className="relative mt-0.5 block h-[18px] w-[13px] rounded-[45%] bg-[radial-gradient(circle_at_35%_30%,#d9b98f,#8a6440_55%,#4a321d)] shadow-[0_2px_4px_rgba(0,0,0,0.45)] ring-amber-300 ring-offset-2 ring-offset-transparent group-focus-visible:ring-2"/>
                {!pulled && !reduceMotion && (
                    <motion.span
                        aria-hidden="true"
                        className="absolute left-1/2 top-0.5 h-[18px] w-[13px] -translate-x-1/2 rounded-[45%] ring-1 ring-amber-200/60"
                        animate={{scale: [1, 2.2], opacity: [0.8, 0]}}
                        transition={{duration: 1.8, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6}}
                    />
                )}
                {!pulled && (
                    <span aria-hidden="true" className="absolute left-full top-1 ml-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                        pull
                    </span>
                )}
            </button>

            {/* The wall switch: the same state, reachable without the cord. Joins the content flow on narrow screens. */}
            {!compact && wallSwitch}

            <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 pb-12 text-center" style={{paddingTop: contentTop}}>
                <p className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-700 ${lit ? "text-amber-700 dark:text-amber-300/90" : "text-stone-700"}`}>
                    {eyebrow}
                </p>
                <h1 ref={headlineRef} className={`mt-4 text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] transition-colors duration-700 sm:text-6xl ${ink}`}>
                    {headline}
                </h1>
                <p className={`mt-5 max-w-lg text-[15px] leading-relaxed transition-colors duration-700 sm:text-base ${muted}`}>{description}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <ActionLink
                        action={primaryAction}
                        className={`inline-flex h-11 items-center rounded-full px-6 text-sm font-medium transition-[background-color,color,box-shadow,border-color] duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${lit ? "border border-transparent bg-stone-900 text-amber-50 hover:bg-stone-800 dark:bg-amber-100 dark:text-stone-950 dark:hover:bg-amber-50" : "border border-stone-800 text-stone-600"}`}
                    />
                    {secondaryAction && (
                        <ActionLink
                            action={secondaryAction}
                            className={`inline-flex h-11 items-center rounded-full border px-6 text-sm font-medium transition-[background-color,color,box-shadow,border-color] duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${lit ? "border-stone-300 bg-white/60 text-stone-800 hover:bg-white dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-200 dark:hover:bg-stone-900" : "border-stone-800 text-stone-700"}`}
                        />
                    )}
                </div>
                {compact && wallSwitch}
            </div>
        </section>
    );
};
