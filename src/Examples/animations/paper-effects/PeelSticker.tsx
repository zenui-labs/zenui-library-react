import {useEffect, useId, useRef, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {animate, useMotionValue, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuRotateCcw} from "react-icons/lu";

type Point = {x: number; y: number};
type Phase = "stuck" | "peeling" | "peeled" | "restoring";
type TipMotion = {duration: number; ease?: [number, number, number, number]} | {type: "spring"; stiffness: number; damping: number};

export interface PeelStickerProps {
    /** The printed face of the sticker. It sits inside the white die-cut border. */
    face: ReactNode;
    /** Code printed on the surface under the sticker. */
    code: string;
    /** Line under the code, for example what the code is worth. */
    offer: ReactNode;
    /** Small print under the offer. */
    note?: ReactNode;
    /** Label above the code. */
    codeLabel?: string;
    /** Sticker size in px. */
    width?: number;
    height?: number;
    /** Corner radius of the die cut in px. */
    radius?: number;
    /**
     * How far the corner has to travel before letting go peels the sticker off, as a share of the full
     * peel (0 is flat, 1 is the fold line crossing the far corner).
     */
    threshold?: number;
    onPeel?: () => void;
    className?: string;
}

const PAPER_NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Cuts a polygon with a straight line and keeps one side (one step of Sutherland-Hodgman).
const cut = (points: Point[], origin: Point, normal: Point, keep: 1 | -1): Point[] => {
    const side = (p: Point) => ((p.x - origin.x) * normal.x + (p.y - origin.y) * normal.y) * keep;
    const cross = (p: Point, q: Point, a: number, b: number): Point => {
        const t = a / (a - b);
        return {x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t};
    };
    const out: Point[] = [];
    points.forEach((current, index) => {
        const previous = points[(index + points.length - 1) % points.length];
        const a = side(previous);
        const b = side(current);
        if (b >= 0) {
            if (a < 0) out.push(cross(previous, current, a, b));
            out.push(current);
        } else if (a >= 0) {
            out.push(cross(previous, current, a, b));
        }
    });
    return out;
};

const polygon = (points: Point[]) => points.length < 3
    ? "polygon(0 0, 0 0, 0 0)"
    : `polygon(${points.map((p) => `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`).join(", ")})`;

const setLine = (element: SVGLinearGradientElement | null, from: Point, to: Point) => {
    if (!element) return;
    element.setAttribute("x1", from.x.toFixed(2));
    element.setAttribute("y1", from.y.toFixed(2));
    element.setAttribute("x2", to.x.toFixed(2));
    element.setAttribute("y2", to.y.toFixed(2));
};

/**
 * A die-cut sticker you peel off by its corner. The fold line is the perpendicular bisector between the
 * corner's resting spot and the pointer, so the geometry is exact: the stuck part is clipped along that
 * line and the flap is the same shape mirrored across it, showing the paper backing.
 */
export const PeelSticker = ({
    face,
    code,
    offer,
    note,
    codeLabel = "Your code",
    width = 260,
    height = 172,
    radius = 22,
    threshold = 0.42,
    onPeel,
    className = "",
}: PeelStickerProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion();
    const [phase, setPhase] = useState<Phase>("stuck");
    const [copied, setCopied] = useState(false);

    const boxRef = useRef<HTMLDivElement>(null);
    const frontRef = useRef<HTMLDivElement>(null);
    const flapRef = useRef<HTMLDivElement>(null);
    const flapShadowRef = useRef<HTMLDivElement>(null);
    const flightRef = useRef<HTMLDivElement>(null);
    const underRef = useRef<SVGPolygonElement>(null);
    const underGradRef = useRef<SVGLinearGradientElement>(null);
    const flapGradRef = useRef<SVGLinearGradientElement>(null);
    const foldGradRef = useRef<SVGLinearGradientElement>(null);
    const drag = useRef<{left: number; top: number; dx: number; dy: number} | null>(null);
    const direction = useRef<Point>({x: 0.6, y: 0.8});

    const rest: Point = {x: width - 9, y: height - 7};
    const hover: Point = {x: width - 30, y: height - 22};
    const diagonal = Math.hypot(width, height);

    // The flap tip. Everything else is derived from it and written straight to the DOM.
    const tipX = useMotionValue(rest.x);
    const tipY = useMotionValue(rest.y);

    useEffect(() => {
        const render = () => {
            const front = frontRef.current;
            const flap = flapRef.current;
            const flapShadow = flapShadowRef.current;
            const under = underRef.current;
            if (!front || !flap || !flapShadow || !under) return;
            // Never let the tip pass the corner, or the fold would flip to the wrong side.
            const tip = {x: Math.min(tipX.get(), width), y: Math.min(tipY.get(), height)};
            const dx = width - tip.x;
            const dy = height - tip.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 0.5) {
                front.style.clipPath = "none";
                flapShadow.style.visibility = "hidden";
                under.setAttribute("points", "");
                return;
            }
            const normal = {x: dx / distance, y: dy / distance};
            const fold = {x: (width + tip.x) / 2, y: (height + tip.y) / 2};
            const pad = 40;
            const frame = [{x: -pad, y: -pad}, {x: width + pad, y: -pad}, {x: width + pad, y: height + pad}, {x: -pad, y: height + pad}];
            const sticker = [{x: 0, y: 0}, {x: width, y: 0}, {x: width, y: height}, {x: 0, y: height}];
            const lifted = cut(sticker, fold, normal, 1);

            // The front element overhangs the sticker by the pad on every side to leave room for its shadow.
            front.style.clipPath = polygon(cut(frame, fold, normal, -1).map((p) => ({x: p.x + pad, y: p.y + pad})));
            flap.style.clipPath = polygon(lifted);
            // Reflection across the fold line: I - 2nn^T, then shifted so the fold line stays put.
            const a = 1 - 2 * normal.x * normal.x;
            const b = -2 * normal.x * normal.y;
            const d = 1 - 2 * normal.y * normal.y;
            const e = fold.x - (a * fold.x + b * fold.y);
            const f = fold.y - (b * fold.x + d * fold.y);
            flap.style.transform = `matrix(${a}, ${b}, ${b}, ${d}, ${e}, ${f})`;

            // The higher the flap, the softer and further its shadow falls.
            const lift = Math.min(1, distance / (diagonal * 0.7));
            flapShadow.style.visibility = "visible";
            flapShadow.style.filter = `drop-shadow(${(-normal.x * 2 * lift).toFixed(2)}px ${(2 + lift * 7).toFixed(2)}px ${(2 + lift * 9).toFixed(2)}px rgba(28,20,12,${(0.22 + lift * 0.14).toFixed(3)}))`;

            under.setAttribute("points", lifted.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" "));
            const reach = distance / 2;
            setLine(underGradRef.current, fold, {x: fold.x + normal.x * Math.min(26, reach), y: fold.y + normal.y * Math.min(26, reach)});
            setLine(flapGradRef.current, fold, {x: fold.x + normal.x * reach, y: fold.y + normal.y * reach});
            setLine(foldGradRef.current, fold, {x: fold.x - normal.x * 16, y: fold.y - normal.y * 16});
        };
        render();
        const stopX = tipX.on("change", render);
        const stopY = tipY.on("change", render);
        return () => {
            stopX();
            stopY();
        };
    }, [tipX, tipY, width, height, diagonal]);

    const moveTip = (target: Point, options: TipMotion) => Promise.all([
        animate(tipX, target.x, options),
        animate(tipY, target.y, options),
    ]);

    // Pushes the fold line past the far corner so the whole sticker becomes flap, then floats it away.
    const peelOff = async (slow: boolean) => {
        setPhase("peeling");
        const tip = {x: tipX.get(), y: tipY.get()};
        const dx = width - tip.x;
        const dy = height - tip.y;
        const distance = Math.hypot(dx, dy);
        const unit = distance > 24 ? {x: dx / distance, y: dy / distance} : {x: 0.62, y: 0.78};
        direction.current = unit;
        const travel = 2 * (width * unit.x + height * unit.y) + 36;
        const target = {x: width - unit.x * travel, y: height - unit.y * travel};
        if (reduceMotion) {
            tipX.set(target.x);
            tipY.set(target.y);
            if (flightRef.current) flightRef.current.style.opacity = "0";
        } else {
            await moveTip(target, {duration: slow ? 1.1 : 0.55, ease: slow ? [0.5, 0, 0.2, 1] : [0.25, 0.1, 0.2, 1]});
            if (flightRef.current) {
                await animate(flightRef.current, {
                    x: -unit.x * 70,
                    y: -46 - unit.y * 30,
                    rotate: -8,
                    scale: 1.04,
                    opacity: 0,
                }, {duration: 0.55, ease: [0.4, 0, 0.6, 1]});
            }
        }
        setPhase("peeled");
        onPeel?.();
    };

    const restick = async () => {
        setPhase("restoring");
        setCopied(false);
        if (flightRef.current) {
            if (reduceMotion) {
                flightRef.current.style.opacity = "1";
            } else {
                await animate(flightRef.current, {x: 0, y: 0, rotate: 0, scale: 1, opacity: 1}, {duration: 0.4, ease: [0.2, 0, 0, 1]});
            }
        }
        if (reduceMotion) {
            tipX.set(rest.x);
            tipY.set(rest.y);
        } else {
            await moveTip(rest, {duration: 0.8, ease: [0.3, 0, 0.1, 1]});
        }
        setPhase("stuck");
    };

    const clampTip = (x: number, y: number): Point => {
        const clamped = {x: Math.min(x, width), y: Math.min(y, height)};
        // The far corner stays stuck while dragging, so the tip cannot reach further than the diagonal.
        const reach = Math.hypot(clamped.x, clamped.y);
        if (reach > diagonal) {
            clamped.x *= diagonal / reach;
            clamped.y *= diagonal / reach;
        }
        return clamped;
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (phase !== "stuck" || !boxRef.current) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        tipX.stop();
        tipY.stop();
        const rect = boxRef.current.getBoundingClientRect();
        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;
        // Keep the grab offset so the tip does not jump to the pointer.
        drag.current = {left: rect.left, top: rect.top, dx: tipX.get() - pointerX, dy: tipY.get() - pointerY};
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const current = drag.current;
        if (!current) return;
        const tip = clampTip(event.clientX - current.left + current.dx, event.clientY - current.top + current.dy);
        tipX.set(tip.x);
        tipY.set(tip.y);
    };

    const handlePointerUp = () => {
        if (!drag.current) return;
        drag.current = null;
        const progress = Math.hypot(width - tipX.get(), height - tipY.get()) / (2 * diagonal);
        if (progress > threshold) {
            void peelOff(false);
        } else {
            // Close to critically damped, so the spring never overshoots past the corner.
            void moveTip(rest, reduceMotion ? {duration: 0} : {type: "spring", stiffness: 380, damping: 34});
        }
    };

    const handleHover = (entering: boolean) => {
        if (phase !== "stuck" || drag.current || reduceMotion) return;
        void moveTip(entering ? hover : rest, {type: "spring", stiffness: 320, damping: 30});
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    const peeled = phase === "peeled";
    const busy = phase === "peeling" || phase === "restoring";
    const inner = Math.max(0, radius - 6);

    return (
        <div
            className={`relative isolate w-full max-w-sm overflow-hidden rounded-[28px] bg-[#d6bf9c] px-6 pb-6 pt-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.08)] dark:bg-[#2c251e] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply dark:opacity-40 dark:mix-blend-screen" style={{backgroundImage: PAPER_NOISE}}/>

            <div ref={boxRef} className="relative mx-auto" style={{width, height}}>
                {/* Printed on the surface: only visible where the sticker has been lifted. */}
                <div
                    aria-hidden={!peeled}
                    className="absolute inset-0 flex flex-col items-center justify-center border border-dashed border-[#8a6a45]/45 bg-[#e3cfb0]/70 text-center dark:border-[#b89a74]/25 dark:bg-[#352c23]"
                    style={{borderRadius: radius}}
                >
                    {/* Glue residue catches the light a little. */}
                    <div className="absolute inset-[5px] bg-gradient-to-br from-white/25 via-transparent to-white/10 dark:from-white/[0.06] dark:to-white/[0.03]" style={{borderRadius: inner}}/>
                    <span className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7a5c3a] dark:text-[#b89a74]">{codeLabel}</span>
                    <span className="relative mt-1.5 font-mono text-[26px] font-semibold tracking-[0.08em] text-[#3a2a1a] dark:text-[#f1e4cf]">{code}</span>
                    <span className="relative mt-1 text-[13px] font-medium text-[#4a3826] dark:text-[#e0cfb4]">{offer}</span>
                    {note && <span className="relative mt-1 text-[10.5px] text-[#7a5c3a] dark:text-[#a88c69]">{note}</span>}
                </div>

                <svg aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} style={{clipPath: `inset(0 round ${radius}px)`}}>
                    <defs>
                        <linearGradient id={`${uid}-under`} ref={underGradRef} gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#1c140c" stopOpacity="0.34"/>
                            <stop offset="1" stopColor="#1c140c" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <polygon ref={underRef} fill={`url(#${uid}-under)`}/>
                </svg>

                <div ref={flightRef} className="absolute inset-0">
                    {/* The stuck part of the sticker. */}
                    <div ref={frontRef} className="absolute -inset-10 p-10">
                        <div className="relative h-full w-full bg-white [filter:drop-shadow(0_1px_1px_rgba(40,28,16,0.25))]" style={{borderRadius: radius}}>
                            <div className="absolute inset-[6px] overflow-hidden" style={{borderRadius: inner}}>
                                {face}
                                {/* Vinyl gloss. */}
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.22)_42%,transparent_55%)]"/>
                            </div>
                            <svg aria-hidden="true" className="pointer-events-none absolute inset-0" width={width} height={height}>
                                <defs>
                                    <linearGradient id={`${uid}-fold`} ref={foldGradRef} gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#000" stopOpacity="0.2"/>
                                        <stop offset="1" stopColor="#000" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                <rect width={width} height={height} rx={radius} fill={`url(#${uid}-fold)`}/>
                            </svg>
                        </div>
                    </div>

                    {/* The lifted flap: the same shape mirrored across the fold, showing the backing paper. */}
                    <div ref={flapShadowRef} className="pointer-events-none absolute inset-0" style={{visibility: "hidden"}}>
                        <div ref={flapRef} className="absolute left-0 top-0" style={{width, height, transformOrigin: "0 0"}}>
                            <svg width={width} height={height} className="block">
                                <defs>
                                    <linearGradient id={`${uid}-flap`} ref={flapGradRef} gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#3b2a18" stopOpacity="0.32"/>
                                        <stop offset="0.1" stopColor="#3b2a18" stopOpacity="0.1"/>
                                        <stop offset="0.38" stopColor="#ffffff" stopOpacity="0.5"/>
                                        <stop offset="0.7" stopColor="#ffffff" stopOpacity="0"/>
                                        <stop offset="1" stopColor="#3b2a18" stopOpacity="0.06"/>
                                    </linearGradient>
                                    <pattern id={`${uid}-liner`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                                        <line x1="0" y1="0" x2="0" y2="7" stroke="#b9ad98" strokeOpacity="0.18" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width={width} height={height} rx={radius} className="fill-[#faf7f1] dark:fill-[#e4ded2]"/>
                                <rect width={width} height={height} rx={radius} fill={`url(#${uid}-liner)`}/>
                                <rect width={width} height={height} rx={radius} fill={`url(#${uid}-flap)`}/>
                            </svg>
                        </div>
                    </div>
                </div>

                {phase === "stuck" && (
                    <div
                        aria-hidden="true"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onPointerEnter={(event) => event.pointerType === "mouse" && handleHover(true)}
                        onPointerLeave={(event) => event.pointerType === "mouse" && handleHover(false)}
                        className="absolute -bottom-5 -right-5 h-20 w-20 cursor-grab touch-none active:cursor-grabbing"
                    />
                )}
            </div>

            <div className="relative mt-6 flex min-h-9 items-center justify-between gap-3">
                <p className="text-xs text-[#6b5134] dark:text-[#a88c69]">
                    {peeled ? "Peeled clean. The code is yours." : "Drag the lifted corner to peel."}
                </p>
                {peeled ? (
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={copy}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#3a2a1a] px-3.5 text-xs font-medium text-[#f6ead7] transition-colors hover:bg-[#2a1e12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a2a1a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d6bf9c] dark:bg-[#f1e4cf] dark:text-[#2c251e] dark:hover:bg-white dark:focus-visible:ring-[#f1e4cf] dark:focus-visible:ring-offset-[#2c251e]"
                        >
                            {copied ? <LuCheck className="h-3.5 w-3.5" aria-hidden="true"/> : <LuCopy className="h-3.5 w-3.5" aria-hidden="true"/>}
                            {copied ? "Copied" : "Copy code"}
                        </button>
                        <button
                            type="button"
                            onClick={restick}
                            aria-label="Stick it back"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#4a3826] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a2a1a] dark:text-[#e0cfb4] dark:hover:bg-white/10 dark:focus-visible:ring-[#f1e4cf]"
                        >
                            <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => peelOff(true)}
                        className="inline-flex h-9 shrink-0 items-center rounded-full border border-[#3a2a1a]/25 px-3.5 text-xs font-medium text-[#3a2a1a] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3a2a1a] disabled:opacity-50 dark:border-[#f1e4cf]/20 dark:text-[#f1e4cf] dark:hover:bg-white/10 dark:focus-visible:ring-[#f1e4cf]"
                    >
                        Peel sticker
                    </button>
                )}
            </div>
            <p className="sr-only" aria-live="polite">{peeled ? `Sticker peeled off. ${codeLabel}: ${code}.` : ""}</p>
        </div>
    );
};
