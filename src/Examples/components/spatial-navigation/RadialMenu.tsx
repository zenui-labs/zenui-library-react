import {useCallback, useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuCommand} from "react-icons/lu";

export type RadialIcon = ComponentType<{className?: string}>;

export interface RadialItem {
    id: string;
    label: string;
    icon: RadialIcon;
    /** Shown in the hub while the wedge is highlighted, e.g. "V" or "⇧ C". */
    shortcut?: string;
    /** Items for the outer ring. They fan out around this wedge while it is highlighted. */
    children?: RadialItem[];
}

export interface RadialMenuProps {
    /** Two to eight items. The first sits at twelve o'clock and the rest follow clockwise. */
    items: RadialItem[];
    /** Id of the current item, marked with a dot on its wedge. */
    value?: string;
    onSelect?: (item: RadialItem, parent?: RadialItem) => void;
    /** Milliseconds the pointer is held down before the menu opens. */
    holdDelay?: number;
    /** Accessible name of the surface the menu opens over. */
    label?: string;
    /** Content of the surface, drawn under the menu. */
    children?: ReactNode;
    className?: string;
}

type Mode = "closed" | "drag" | "click";

interface Highlight {
    index: number;
    /** Index in the outer ring, or -1 while the main ring is in use. */
    child: number;
}

// Geometry in unscaled px. The whole menu is scaled down as one piece on narrow surfaces.
const HUB = 34;
const R_IN = 44;
const R_OUT = 120;
const SUB_IN = 128;
const SUB_OUT = 176;
const DEAD = 22;
const GAP = 10;
const VIEW = SUB_OUT + 10;
const NONE: Highlight = {index: -1, child: -1};

const DIRECTIONS: Record<string, [number, number]> = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (deg: number) => ((deg % 360) + 360) % 360;
const angleDiff = (a: number, b: number) => {
    const d = wrap(a - b);
    return d > 180 ? d - 360 : d;
};
// 0 degrees points up and angles grow clockwise, the way a clock (and a marking menu) reads.
const polar = (r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return {x: r * Math.sin(rad), y: -r * Math.cos(rad)};
};
const angleOf = (x: number, y: number) => wrap((Math.atan2(x, -y) * 180) / Math.PI);
const subStep = (count: number) => Math.min(30, 240 / count);
const childAngle = (parentAngle: number, count: number, k: number) => parentAngle + (k - (count - 1) / 2) * subStep(count);

// An annular sector with a constant pixel gap to its neighbours, so gaps stay parallel instead of wedge-shaped.
const sectorPath = (r0: number, r1: number, a0: number, a1: number) => {
    const p0 = ((GAP / 2 / r0) * 180) / Math.PI;
    const p1 = ((GAP / 2 / r1) * 180) / Math.PI;
    const os = polar(r1, a0 + p1);
    const oe = polar(r1, a1 - p1);
    const ie = polar(r0, a1 - p0);
    const is = polar(r0, a0 + p0);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M${os.x} ${os.y}A${r1} ${r1} 0 ${large} 1 ${oe.x} ${oe.y}L${ie.x} ${ie.y}A${r0} ${r0} 0 ${large} 0 ${is.x} ${is.y}Z`;
};

// Selection goes by direction, not by what is under the pointer: anywhere past the dead zone counts, even far
// outside the ring. Past the main ring the open outer ring wins while the pointer stays over its arc.
const pick = (x: number, y: number, items: RadialItem[], current: Highlight): Highlight => {
    const dist = Math.hypot(x, y);
    if (dist < DEAD) return NONE;
    const angle = angleOf(x, y);
    const slice = 360 / items.length;
    const parent = current.index >= 0 ? items[current.index] : null;
    if (parent?.children?.length && dist > R_OUT + 2) {
        const count = parent.children.length;
        const step = subStep(count);
        const d = angleDiff(angle, current.index * slice);
        if (Math.abs(d) <= (count / 2) * step + step * 0.4) {
            return {index: current.index, child: clamp(Math.round(d / step + (count - 1) / 2), 0, count - 1)};
        }
    }
    return {index: Math.round(angle / slice) % items.length, child: -1};
};

const findValue = (items: RadialItem[], id?: string) => {
    for (let index = 0; index < items.length; index++) {
        if (items[index].id === id) return {item: items[index], index};
        const child = items[index].children?.find((c) => c.id === id);
        if (child) return {item: child, index};
    }
    return null;
};

/**
 * A marking menu. Hold anywhere on the surface (or right-click, or press Space) and flick toward a tool;
 * letting go picks it. The wedge is chosen by direction, so a practised flick works without looking.
 */
export const RadialMenu = ({items, value, onSelect, holdDelay = 260, label = "Canvas", children, className = ""}: RadialMenuProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const baseId = `radial-${useId().replace(/:/g, "")}`;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const surfaceRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<Mode>("closed");
    const modeRef = useRef<Mode>("closed");
    const [origin, setOrigin] = useState({x: 0, y: 0});
    const originRef = useRef({x: 0, y: 0});
    const [hi, setHi] = useState<Highlight>(NONE);
    const hiRef = useRef<Highlight>(NONE);
    const [pending, setPending] = useState<{x: number; y: number} | null>(null);
    const pendingRef = useRef<{x: number; y: number; timer: number} | null>(null);
    const [committed, setCommitted] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const heldKeys = useRef(new Set<string>());
    const slice = 360 / items.length;

    // The aim vector in unscaled px from the menu centre. Springs smooth it for the ink stroke and the hub notch.
    const aimX = useMotionValue(0);
    const aimY = useMotionValue(0);
    const springX = useSpring(aimX, {stiffness: 700, damping: 42});
    const springY = useSpring(aimY, {stiffness: 700, damping: 42});
    const inkPath = useTransform([springX, springY], ([x, y]: number[]) => {
        const d = Math.hypot(x, y);
        if (d < HUB + 4) return "M0 0";
        const start = (HUB + 4) / d;
        const end = Math.min(d, SUB_OUT + 6) / d;
        return `M${x * start} ${y * start}L${x * end} ${y * end}`;
    });
    const inkEndX = useTransform([springX, springY], ([x, y]: number[]) => x * Math.min(1, (SUB_OUT + 6) / Math.max(1, Math.hypot(x, y))));
    const inkEndY = useTransform([springX, springY], ([x, y]: number[]) => y * Math.min(1, (SUB_OUT + 6) / Math.max(1, Math.hypot(x, y))));
    const aimOpacity = useTransform([springX, springY], ([x, y]: number[]) => clamp((Math.hypot(x, y) - DEAD * 0.6) / (DEAD * 0.8), 0, 1));
    const notchRotate = useTransform([springX, springY], ([x, y]: number[]) => angleOf(x, y));

    useEffect(() => {
        const el = surfaceRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setScale(clamp((entry.contentRect.width - 16) / (VIEW * 2), 0.62, 1));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const highlight = useCallback((next: Highlight) => {
        const current = hiRef.current;
        if (current.index === next.index && current.child === next.child) return;
        hiRef.current = next;
        setHi(next);
    }, []);

    const aimAt = useCallback((h: Highlight) => {
        if (h.index < 0) {
            aimX.set(0);
            aimY.set(0);
            return;
        }
        const parentAngle = h.index * slice;
        const count = items[h.index].children?.length ?? 0;
        const p = h.child >= 0
            ? polar((SUB_IN + SUB_OUT) / 2, childAngle(parentAngle, count, h.child))
            : polar((R_IN + R_OUT) / 2, parentAngle);
        aimX.set(p.x);
        aimY.set(p.y);
    }, [aimX, aimY, items, slice]);

    const close = useCallback(() => {
        modeRef.current = "closed";
        setMode("closed");
        heldKeys.current.clear();
        if (menuRef.current?.contains(document.activeElement)) surfaceRef.current?.focus({preventScroll: true});
    }, []);

    const open = useCallback((x: number, y: number, nextMode: Mode, fromKeyboard: boolean) => {
        const rect = surfaceRef.current?.getBoundingClientRect();
        if (!rect) return;
        // Keep the main ring inside the surface. The pointer may end up off centre, which is fine because the
        // aim is measured from the pointer to the menu centre.
        const margin = (R_OUT + 12) * scale;
        const cx = rect.width > margin * 2 ? clamp(x, margin, rect.width - margin) : rect.width / 2;
        const cy = rect.height > margin * 2 ? clamp(y, margin, rect.height - margin) : rect.height / 2;
        originRef.current = {x: cx, y: cy};
        setOrigin({x: cx, y: cy});
        setCommitted(null);
        hiRef.current = NONE;
        setHi(NONE);
        const start = fromKeyboard ? {index: Math.max(0, findValue(items, value)?.index ?? 0), child: -1} : NONE;
        const vx = (x - cx) / scale;
        const vy = (y - cy) / scale;
        springX.jump(fromKeyboard ? 0 : vx);
        springY.jump(fromKeyboard ? 0 : vy);
        if (fromKeyboard) {
            highlight(start);
            aimAt(start);
        } else {
            aimX.set(vx);
            aimY.set(vy);
            highlight(pick(vx, vy, items, NONE));
        }
        modeRef.current = nextMode;
        setMode(nextMode);
    }, [aimAt, aimX, aimY, highlight, items, scale, springX, springY, value]);

    const commit = useCallback((h: Highlight) => {
        const parent = items[h.index];
        const item = h.child >= 0 && parent.children ? parent.children[h.child] : parent;
        setCommitted(item.id);
        close();
        onSelect?.(item, h.child >= 0 ? parent : undefined);
    }, [close, items, onSelect]);

    const isLeaf = (h: Highlight) => h.index >= 0 && (h.child >= 0 || !items[h.index].children?.length);

    const cancelPending = () => {
        if (!pendingRef.current) return false;
        window.clearTimeout(pendingRef.current.timer);
        pendingRef.current = null;
        setPending(null);
        return true;
    };

    useEffect(() => () => {
        if (pendingRef.current) window.clearTimeout(pendingRef.current.timer);
    }, []);

    const isOpen = mode !== "closed";

    useEffect(() => {
        if (!isOpen) return;
        menuRef.current?.focus({preventScroll: true});
        const onDown = (event: globalThis.PointerEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) close();
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [isOpen, close]);

    const local = (event: PointerEvent<HTMLElement>) => {
        const rect = surfaceRef.current!.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    const aimFromEvent = (event: PointerEvent<HTMLElement>) => {
        const p = local(event);
        const vx = (p.x - originRef.current.x) / scale;
        const vy = (p.y - originRef.current.y) / scale;
        aimX.set(vx);
        aimY.set(vy);
        highlight(pick(vx, vy, items, hiRef.current));
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (modeRef.current === "click") {
            aimFromEvent(event);
            const h = hiRef.current;
            if (h.index < 0) close();
            else if (isLeaf(h)) commit(h);
            return;
        }
        if (event.button !== 0 || modeRef.current !== "closed") return;
        const p = local(event);
        const target = event.currentTarget;
        const pointerId = event.pointerId;
        const timer = window.setTimeout(() => {
            pendingRef.current = null;
            setPending(null);
            try {
                target.setPointerCapture(pointerId);
            } catch {
                // The pointer was released in the same frame; the menu then stays open in click mode.
            }
            open(p.x, p.y, "drag", false);
        }, holdDelay);
        pendingRef.current = {x: p.x, y: p.y, timer};
        setPending(p);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const held = pendingRef.current;
        if (held) {
            const p = local(event);
            if (Math.hypot(p.x - held.x, p.y - held.y) > 8) cancelPending();
            return;
        }
        if (modeRef.current === "drag" || (modeRef.current === "click" && event.pointerType === "mouse")) aimFromEvent(event);
    };

    const handlePointerUp = () => {
        if (cancelPending()) return;
        if (modeRef.current !== "drag") return;
        const h = hiRef.current;
        if (isLeaf(h)) {
            commit(h);
        } else {
            // Let go in the dead zone or on a group: keep the menu open and switch to clicking.
            modeRef.current = "click";
            setMode("click");
        }
    };

    const handleContextMenu = (event: ReactMouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (modeRef.current !== "closed") return;
        cancelPending();
        const rect = event.currentTarget.getBoundingClientRect();
        open(event.clientX - rect.left, event.clientY - rect.top, "click", false);
    };

    const openFromKeyboard = () => {
        const rect = surfaceRef.current?.getBoundingClientRect();
        if (rect) open(rect.width / 2, rect.height / 2, "click", true);
    };

    const handleSurfaceKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget || modeRef.current !== "closed") return;
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            openFromKeyboard();
        }
    };

    const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const h = hiRef.current;
        const move = (next: Highlight) => {
            highlight(next);
            aimAt(next);
        };
        if (event.key in DIRECTIONS) {
            event.preventDefault();
            // Held arrows add up like a d-pad, so Up and Right together aim at the diagonal wedge.
            heldKeys.current.add(event.key);
            let x = 0;
            let y = 0;
            heldKeys.current.forEach((key) => {
                x += DIRECTIONS[key][0];
                y += DIRECTIONS[key][1];
            });
            if (!x && !y) return;
            const angle = angleOf(x, y);
            const parent = h.index >= 0 ? items[h.index] : null;
            if (h.child >= 0 && parent?.children) {
                const count = parent.children.length;
                const d = angleDiff(angle, h.index * slice);
                if (Math.abs(d) <= (count / 2) * subStep(count) + subStep(count)) {
                    move({index: h.index, child: clamp(Math.round(d / subStep(count) + (count - 1) / 2), 0, count - 1)});
                    return;
                }
            }
            move({index: Math.round(angle / slice) % items.length, child: -1});
            return;
        }
        if (event.key === "Tab") {
            event.preventDefault();
            const delta = event.shiftKey ? -1 : 1;
            const siblings = h.child >= 0 ? items[h.index].children!.length : items.length;
            const current = h.child >= 0 ? h.child : h.index;
            const next = (Math.max(current, 0) + delta + siblings) % siblings;
            move(h.child >= 0 ? {index: h.index, child: next} : {index: next, child: -1});
            return;
        }
        if (/^[1-9]$/.test(event.key)) {
            const n = Number(event.key) - 1;
            if (h.child >= 0 && n < (items[h.index].children?.length ?? 0)) move({index: h.index, child: n});
            else if (h.child < 0 && n < items.length) move({index: n, child: -1});
            return;
        }
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (h.index < 0) move({index: 0, child: -1});
            else if (isLeaf(h)) commit(h);
            else {
                const inside = items[h.index].children!.findIndex((c) => c.id === value);
                move({index: h.index, child: Math.max(0, inside)});
            }
            return;
        }
        if (event.key === "Escape" || event.key === "Backspace") {
            event.preventDefault();
            if (h.child >= 0) move({index: h.index, child: -1});
            else close();
        }
    };

    const active = hi.index >= 0 ? items[hi.index] : null;
    const activeChild = active && hi.child >= 0 ? active.children?.[hi.child] : null;
    const shown = activeChild ?? active;
    const current = findValue(items, value);
    const CurrentIcon = current?.item.icon;

    const enter = (dx: number, dy: number, order: number) => ({
        initial: reduceMotion ? {opacity: 0} : {opacity: 0, x: -dx * 22, y: -dy * 22},
        transition: {
            type: "spring" as const,
            stiffness: 620,
            damping: 34,
            opacity: {duration: 0.16, delay: reduceMotion ? 0 : order * 0.018},
        },
    });

    return (
        <div ref={wrapperRef} className={`w-full max-w-3xl ${className}`}>
            <div
                ref={surfaceRef}
                role="application"
                aria-label={`${label}. Press Space for the tool menu.`}
                aria-describedby={`${baseId}-hint`}
                tabIndex={0}
                onKeyDown={handleSurfaceKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                    cancelPending();
                    if (modeRef.current === "drag") close();
                }}
                onContextMenu={handleContextMenu}
                className="relative h-[420px] w-full touch-none select-none overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 outline-none [-webkit-touch-callout:none] focus-visible:ring-2 focus-visible:ring-orange-500/60 dark:border-zinc-800 dark:bg-zinc-950"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(24,24,27,0.13)_1px,transparent_1.2px)] [background-size:18px_18px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1.2px)]"
                />
                {children}

                <AnimatePresence>
                    {pending && (
                        <motion.svg
                            key="hold"
                            aria-hidden="true"
                            viewBox="0 0 40 40"
                            className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 -rotate-90"
                            style={{left: pending.x, top: pending.y}}
                            initial={{opacity: 0, scale: 0.6}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, transition: {duration: 0.1}}}
                        >
                            <circle cx="20" cy="20" r="15" fill="none" strokeWidth="2.5" className="stroke-zinc-900/10 dark:stroke-white/15"/>
                            <motion.circle
                                cx="20"
                                cy="20"
                                r="15"
                                fill="none"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                className="stroke-orange-500"
                                initial={{pathLength: 0}}
                                animate={{pathLength: 1}}
                                transition={{duration: holdDelay / 1000, ease: [0.3, 0, 0.6, 1]}}
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="menu"
                            className="absolute h-0 w-0"
                            style={{left: origin.x, top: origin.y}}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.55, rotate: -16}}
                            animate={{opacity: 1, scale: 1, rotate: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.9, transition: {duration: 0.18, ease: [0.4, 0, 1, 1]}}}
                            transition={{type: "spring", stiffness: 480, damping: 30, mass: 0.7}}
                        >
                            <div
                                ref={menuRef}
                                role="menu"
                                aria-label="Tools"
                                tabIndex={-1}
                                aria-activedescendant={shown ? `${baseId}-${shown.id}` : undefined}
                                onKeyDown={handleMenuKeyDown}
                                onKeyUp={(event) => heldKeys.current.delete(event.key)}
                                onBlur={() => heldKeys.current.clear()}
                                className="absolute outline-none"
                                style={{width: VIEW * 2, height: VIEW * 2, left: -VIEW, top: -VIEW, transform: `scale(${scale})`}}
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox={`${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}`}
                                    className="absolute inset-0 h-full w-full overflow-visible [filter:drop-shadow(0_14px_22px_rgba(24,24,27,0.16))_drop-shadow(0_2px_3px_rgba(24,24,27,0.10))] dark:[filter:drop-shadow(0_14px_24px_rgba(0,0,0,0.55))]"
                                >
                                    {items.map((item, index) => {
                                        const angle = index * slice;
                                        const dir = polar(1, angle);
                                        const on = hi.index === index;
                                        const d = sectorPath(R_IN, R_OUT, angle - slice / 2, angle + slice / 2);
                                        const motionProps = enter(dir.x, dir.y, index);
                                        return (
                                            <motion.g
                                                key={item.id}
                                                {...motionProps}
                                                animate={{opacity: 1, x: on && !reduceMotion ? dir.x * 5 : 0, y: on && !reduceMotion ? dir.y * 5 : 0}}
                                                exit={committed === item.id ? {opacity: 0, x: dir.x * 16, y: dir.y * 16, transition: {duration: 0.22}} : {opacity: 0, transition: {duration: 0.12}}}
                                            >
                                                <path d={d} strokeWidth={7} strokeLinejoin="round" className="fill-zinc-200 stroke-zinc-200 dark:fill-zinc-700/80 dark:stroke-zinc-700/80"/>
                                                <path
                                                    d={d}
                                                    strokeWidth={5}
                                                    strokeLinejoin="round"
                                                    className={`transition-[fill,stroke] duration-150 ${on ? "fill-zinc-900 stroke-zinc-900 dark:fill-zinc-100 dark:stroke-zinc-100" : "fill-white stroke-white dark:fill-zinc-900 dark:stroke-zinc-900"}`}
                                                />
                                                {item.children?.length ? [-5, 0, 5].map((offset) => {
                                                    const dot = polar(R_OUT - 7, angle + offset);
                                                    return <circle key={offset} cx={dot.x} cy={dot.y} r={1.3} className={on ? "fill-white/50 dark:fill-zinc-900/40" : "fill-zinc-300 dark:fill-zinc-600"}/>;
                                                }) : null}
                                            </motion.g>
                                        );
                                    })}

                                    <AnimatePresence>
                                        {active?.children?.length ? (
                                            <motion.g key={active.id} exit={{opacity: 0, transition: {duration: 0.1}}}>
                                                {active.children.map((child, k) => {
                                                    const count = active.children!.length;
                                                    const a = childAngle(hi.index * slice, count, k);
                                                    const step = subStep(count);
                                                    const dir = polar(1, a);
                                                    const on = hi.child === k;
                                                    const d = sectorPath(SUB_IN, SUB_OUT, a - step / 2, a + step / 2);
                                                    return (
                                                        <motion.g
                                                            key={child.id}
                                                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: -dir.x * 14, y: -dir.y * 14}}
                                                            animate={{opacity: 1, x: on && !reduceMotion ? dir.x * 4 : 0, y: on && !reduceMotion ? dir.y * 4 : 0}}
                                                            exit={committed === child.id ? {opacity: 0, x: dir.x * 14, y: dir.y * 14, transition: {duration: 0.22}} : {opacity: 0}}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 620,
                                                                damping: 34,
                                                                opacity: {duration: 0.14, delay: reduceMotion ? 0 : Math.abs(k - (count - 1) / 2) * 0.03},
                                                            }}
                                                        >
                                                            <path d={d} strokeWidth={7} strokeLinejoin="round" className="fill-zinc-200 stroke-zinc-200 dark:fill-zinc-700/80 dark:stroke-zinc-700/80"/>
                                                            <path
                                                                d={d}
                                                                strokeWidth={5}
                                                                strokeLinejoin="round"
                                                                className={`transition-[fill,stroke] duration-150 ${on ? "fill-orange-500 stroke-orange-500" : "fill-white stroke-white dark:fill-zinc-900 dark:stroke-zinc-900"}`}
                                                            />
                                                        </motion.g>
                                                    );
                                                })}
                                            </motion.g>
                                        ) : null}
                                    </AnimatePresence>

                                    {!reduceMotion && (
                                        <g>
                                            <motion.path d={inkPath} strokeWidth={2} strokeLinecap="round" className="fill-none stroke-orange-500" style={{opacity: aimOpacity}}/>
                                            <motion.circle cx={inkEndX} cy={inkEndY} r={3.5} className="fill-orange-500" style={{opacity: aimOpacity}}/>
                                        </g>
                                    )}

                                    <circle r={HUB} className="fill-white stroke-zinc-200 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth={1}/>
                                </svg>

                                {items.map((item, index) => {
                                    const angle = index * slice;
                                    const p = polar((R_IN + R_OUT) / 2 + 2, angle);
                                    const dir = polar(1, angle);
                                    const on = hi.index === index;
                                    const Icon = item.icon;
                                    const isCurrent = current?.index === index;
                                    return (
                                        <div key={item.id} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2" style={{left: VIEW + p.x, top: VIEW + p.y}}>
                                            <motion.div
                                                id={`${baseId}-${item.id}`}
                                                role="menuitem"
                                                aria-haspopup={item.children?.length ? "menu" : undefined}
                                                aria-expanded={item.children?.length ? on : undefined}
                                                aria-keyshortcuts={item.shortcut}
                                                {...enter(dir.x, dir.y, index)}
                                                animate={{opacity: 1, x: on && !reduceMotion ? dir.x * 5 : 0, y: on && !reduceMotion ? dir.y * 5 : 0}}
                                                exit={committed === item.id ? {opacity: 0, x: dir.x * 16, y: dir.y * 16, transition: {duration: 0.22}} : {opacity: 0, transition: {duration: 0.12}}}
                                                className={`flex w-16 flex-col items-center gap-1 transition-colors duration-150 ${on ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-300"}`}
                                            >
                                                <span className="relative">
                                                    <Icon className="h-[18px] w-[18px]" aria-hidden="true"/>
                                                    {isCurrent && <span className="absolute -right-1.5 -top-1 h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-white dark:ring-zinc-900"/>}
                                                </span>
                                                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                                            </motion.div>
                                        </div>
                                    );
                                })}

                                <AnimatePresence>
                                    {active?.children?.length ? active.children.map((child, k) => {
                                        const count = active.children!.length;
                                        const a = childAngle(hi.index * slice, count, k);
                                        const p = polar((SUB_IN + SUB_OUT) / 2, a);
                                        const on = hi.child === k;
                                        const Icon = child.icon;
                                        return (
                                            <motion.div
                                                key={child.id}
                                                id={`${baseId}-${child.id}`}
                                                role="menuitem"
                                                aria-keyshortcuts={child.shortcut}
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: {delay: reduceMotion ? 0 : 0.04 + Math.abs(k - (count - 1) / 2) * 0.03}}}
                                                exit={{opacity: 0, transition: {duration: 0.1}}}
                                                className={`pointer-events-none absolute flex w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5 transition-colors duration-150 ${on ? "text-white" : "text-zinc-600 dark:text-zinc-300"}`}
                                                style={{left: VIEW + p.x, top: VIEW + p.y}}
                                            >
                                                <Icon className="h-4 w-4" aria-hidden="true"/>
                                                <span className="text-[9px] font-medium tracking-wide">{child.label}</span>
                                            </motion.div>
                                        );
                                    }) : null}
                                </AnimatePresence>

                                <motion.div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute"
                                    style={{left: VIEW - HUB, top: VIEW - HUB, width: HUB * 2, height: HUB * 2, rotate: notchRotate, opacity: aimOpacity}}
                                >
                                    <span className="absolute left-1/2 top-[-7px] h-0 w-0 -translate-x-1/2 border-x-[5px] border-b-[6px] border-x-transparent border-b-orange-500"/>
                                </motion.div>

                                <div aria-hidden="true" className="pointer-events-none absolute flex flex-col items-center justify-center text-center" style={{left: VIEW - HUB, top: VIEW - HUB, width: HUB * 2, height: HUB * 2}}>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.span
                                            key={shown?.id ?? "none"}
                                            initial={{opacity: 0, y: 3}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: -3}}
                                            transition={{duration: 0.12}}
                                            className="flex flex-col items-center"
                                        >
                                            <span className={`max-w-[60px] truncate text-[11px] font-semibold leading-tight ${shown ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500"}`}>
                                                {shown?.label ?? "Tools"}
                                            </span>
                                            <span className="mt-0.5 font-mono text-[9.5px] leading-none text-zinc-400 dark:text-zinc-500">{shown?.shortcut ?? "Esc"}</span>
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => (isOpen ? close() : openFromKeyboard())}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 font-medium text-zinc-700 shadow-sm outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-orange-500/60 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                    <LuCommand className="h-3.5 w-3.5" aria-hidden="true"/>
                    Tools
                    <kbd className="rounded border border-zinc-200 px-1 font-mono text-[10px] text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">Space</kbd>
                </button>
                <p id={`${baseId}-hint`} className="hidden text-zinc-500 dark:text-zinc-400 sm:block">
                    Hold anywhere or right-click, flick toward a tool, let go. Arrows aim, two at once for diagonals.
                </p>
                <p aria-live="polite" className="flex min-w-0 items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    {CurrentIcon && <CurrentIcon className="h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden="true"/>}
                    <span className="truncate font-medium text-zinc-900 dark:text-white">{current?.item.label ?? "No tool"}</span>
                    {current?.item.shortcut && <span className="font-mono text-[10px] text-zinc-400">{current.item.shortcut}</span>}
                </p>
            </div>
        </div>
    );
};
