import {useCallback, useEffect, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

type Point = {x: number; y: number};

interface Crumb {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    spin: number;
    w: number;
    h: number;
    life: number;
    maxLife: number;
    color: string;
}

export interface ScratchCardProps {
    merchant: string;
    /** Small line under the merchant name. */
    tagline?: string;
    /** Face value, printed large. */
    amount: string;
    /** Printed on the card. Only the last four digits are shown. */
    cardNumber: string;
    /** Printed under the foil. */
    pin: string;
    expires?: string;
    /** Text stamped into the foil. */
    foilLabel?: string;
    /** Share of the foil (0 to 1) that has to be scratched before the rest flakes off by itself. */
    threshold?: number;
    /** Brush diameter in px. */
    brushSize?: number;
    onReveal?: () => void;
    className?: string;
}

const EXTRA_FALL = 170; // room under the card for crumbs to fall into

// Brushed silver: banded gradient, streaks, grain, then the label pressed in with a highlight.
const drawFoil = (ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number, label: string) => {
    ctx.globalCompositeOperation = "source-over";
    const band = ctx.createLinearGradient(0, 0, w, h * 1.8);
    [[0, "#9ea3aa"], [0.16, "#e3e6e9"], [0.33, "#a2a7ae"], [0.5, "#d8dbdf"], [0.68, "#9a9fa6"], [0.84, "#eaecee"], [1, "#a9aeb4"]]
        .forEach(([offset, color]) => band.addColorStop(offset as number, color as string));
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < h * 1.4; i++) {
        const y = Math.random() * h;
        const x = Math.random() * w;
        const length = w * (0.08 + Math.random() * 0.35);
        ctx.strokeStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.28)" : "rgba(55,60,66,0.14)";
        ctx.lineWidth = (0.4 + Math.random() * 0.6) * dpr;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length, y + length * 0.015);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgba(70,74,80,0.07)";
    ctx.lineWidth = dpr;
    for (let x = -h; x < w; x += 7 * dpr) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + h, h);
        ctx.stroke();
    }

    const image = ctx.getImageData(0, 0, w, h);
    const data = image.data;
    for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * 24;
        data[i] += grain;
        data[i + 1] += grain;
        data[i + 2] += grain + 1.5;
    }
    ctx.putImageData(image, 0, 0);

    ctx.font = `600 ${11 * dpr}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) (ctx as CanvasRenderingContext2D & {letterSpacing: string}).letterSpacing = `${2.6 * dpr}px`;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText(label.toUpperCase(), w / 2, h / 2 + dpr);
    ctx.fillStyle = "rgba(72,76,82,0.72)";
    ctx.fillText(label.toUpperCase(), w / 2, h / 2);
};

/**
 * A gift card with a scratch-off PIN. The foil is a canvas: scratching erases it with a rough round brush,
 * each stroke sheds crumbs in the foil's own color, and progress comes from sampling the canvas alpha.
 * Past the threshold, whatever foil is left breaks into crumbs and falls off the card.
 */
export const ScratchCard = ({
    merchant,
    tagline,
    amount,
    cardNumber,
    pin,
    expires,
    foilLabel = "Scratch to reveal",
    threshold = 0.6,
    brushSize = 28,
    onReveal,
    className = "",
}: ScratchCardProps) => {
    const reduceMotion = useReducedMotion();
    const cardRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const foilRef = useRef<HTMLCanvasElement>(null);
    const dustRef = useRef<HTMLCanvasElement>(null);
    const size = useRef({width: 0, height: 0, dpr: 1});
    const last = useRef<Point | null>(null);
    const stripOffset = useRef<Point>({x: 0, y: 0});
    const crumbs = useRef<Crumb[]>([]);
    const frame = useRef(0);
    const lastMeasure = useRef(0);
    const revealedRef = useRef(false);
    const [percent, setPercent] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const foilContext = () => foilRef.current?.getContext("2d", {willReadFrequently: true}) ?? null;

    // Sizes the foil to the strip. On resize the scratched foil is scaled over instead of being redrawn.
    const paint = useCallback((preserve: boolean) => {
        const canvas = foilRef.current;
        const strip = stripRef.current;
        const ctx = foilContext();
        if (!canvas || !strip || !ctx) return;
        const {width, height} = strip.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        let snapshot: HTMLCanvasElement | null = null;
        if (preserve && canvas.width > 0) {
            snapshot = document.createElement("canvas");
            snapshot.width = canvas.width;
            snapshot.height = canvas.height;
            snapshot.getContext("2d")?.drawImage(canvas, 0, 0);
        }
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (snapshot) ctx.drawImage(snapshot, 0, 0, canvas.width, canvas.height);
        else drawFoil(ctx, canvas.width, canvas.height, dpr, foilLabel);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        size.current = {width, height, dpr};

        const dust = dustRef.current;
        const card = cardRef.current;
        if (dust && card) {
            const box = card.getBoundingClientRect();
            dust.width = Math.round(box.width * dpr);
            dust.height = Math.round((box.height + EXTRA_FALL) * dpr);
            dust.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }, [foilLabel]);

    useEffect(() => {
        paint(false);
        const strip = stripRef.current;
        if (!strip) return;
        let first = true;
        const observer = new ResizeObserver(() => {
            if (first) {
                first = false;
                return;
            }
            paint(true);
        });
        observer.observe(strip);
        return () => observer.disconnect();
    }, [paint]);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    const tick = () => {
        const canvas = dustRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const {dpr} = size.current;
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        const floor = canvas.height / dpr;
        crumbs.current = crumbs.current.filter((crumb) => {
            crumb.vy += 0.16;
            crumb.vx *= 0.985;
            crumb.x += crumb.vx;
            crumb.y += crumb.vy;
            crumb.angle += crumb.spin;
            crumb.life += 1;
            const fade = Math.min(1, (crumb.maxLife - crumb.life) / (crumb.maxLife * 0.35));
            if (fade <= 0 || crumb.y > floor) return false;
            ctx.save();
            ctx.globalAlpha = fade;
            ctx.translate(crumb.x, crumb.y);
            ctx.rotate(crumb.angle);
            // Flakes flip as they fall, so their visible width pulses.
            ctx.scale(1, Math.abs(Math.cos(crumb.angle * 1.7)) * 0.8 + 0.2);
            ctx.fillStyle = crumb.color;
            ctx.fillRect(-crumb.w / 2, -crumb.h / 2, crumb.w, crumb.h);
            ctx.restore();
            return true;
        });
        frame.current = crumbs.current.length > 0 ? requestAnimationFrame(tick) : 0;
    };

    const shed = (at: Point, rgb: [number, number, number], count: number, spread: number) => {
        if (reduceMotion) return;
        for (let i = 0; i < count; i++) {
            const shade = (Math.random() - 0.5) * 70;
            const tone = rgb.map((c) => Math.max(0, Math.min(255, Math.round(c + shade))));
            crumbs.current.push({
                x: stripOffset.current.x + at.x + (Math.random() - 0.5) * spread,
                y: stripOffset.current.y + at.y + (Math.random() - 0.5) * spread,
                vx: (Math.random() - 0.5) * 2.4,
                vy: -Math.random() * 1.8,
                angle: Math.random() * Math.PI,
                spin: (Math.random() - 0.5) * 0.35,
                w: 1 + Math.random() * 3,
                h: 0.8 + Math.random() * 1.8,
                life: 0,
                maxLife: 50 + Math.random() * 50,
                color: `rgb(${tone[0]},${tone[1]},${tone[2]})`,
            });
        }
        if (crumbs.current.length > 600) crumbs.current.splice(0, crumbs.current.length - 600);
        if (!frame.current) frame.current = requestAnimationFrame(tick);
    };

    const updateStripOffset = () => {
        const card = cardRef.current?.getBoundingClientRect();
        const strip = stripRef.current?.getBoundingClientRect();
        if (card && strip) stripOffset.current = {x: strip.left - card.left, y: strip.top - card.top};
    };

    const reveal = () => {
        if (revealedRef.current) return;
        revealedRef.current = true;
        setRevealed(true);
        setPercent(100);
        const ctx = foilContext();
        const canvas = foilRef.current;
        if (ctx && canvas && !reduceMotion) {
            // What foil is left breaks up: sample it on a grid and turn each solid cell into crumbs.
            updateStripOffset();
            const {dpr} = size.current;
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const step = Math.round(9 * dpr);
            for (let y = Math.round(step / 2); y < canvas.height; y += step) {
                for (let x = Math.round(step / 2); x < canvas.width; x += step) {
                    const index = (y * canvas.width + x) * 4;
                    if (data[index + 3] > 160 && Math.random() > 0.35) {
                        shed({x: x / dpr, y: y / dpr}, [data[index], data[index + 1], data[index + 2]], 2, 8);
                    }
                }
            }
        }
        onReveal?.();
    };

    const measure = () => {
        const ctx = foilContext();
        const canvas = foilRef.current;
        if (!ctx || !canvas || revealedRef.current) return;
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const step = 6;
        let cleared = 0;
        let total = 0;
        for (let y = step / 2; y < canvas.height; y += step) {
            for (let x = step / 2; x < canvas.width; x += step) {
                total++;
                if (data[(y * canvas.width + x) * 4 + 3] < 100) cleared++;
            }
        }
        const share = total ? cleared / total : 0;
        setPercent(Math.round(share * 100));
        if (share >= threshold) reveal();
    };

    const scratch = (to: Point) => {
        const ctx = foilContext();
        if (!ctx) return;
        const from = last.current ?? to;
        const {dpr} = size.current;
        const pixel = ctx.getImageData(Math.round(to.x * dpr), Math.round(to.y * dpr), 1, 1).data;
        const hadFoil = pixel[3] > 120;

        // Only alpha matters with destination-out, so both styles must be fully opaque.
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x + 0.01, to.y);
        ctx.stroke();
        // Nicks along the edge, so the scratch looks chipped rather than cut with a compass.
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.hypot(dx, dy) || 1;
        const nx = -dy / length;
        const ny = dx / length;
        for (let i = 0; i < 4; i++) {
            const t = Math.random();
            const side = Math.random() > 0.5 ? 1 : -1;
            const r = 1.5 + Math.random() * 3.5;
            ctx.beginPath();
            ctx.arc(from.x + dx * t + nx * side * brushSize * 0.48, from.y + dy * t + ny * side * brushSize * 0.48, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";

        if (hadFoil) shed(to, [pixel[0], pixel[1], pixel[2]], Math.min(9, 2 + Math.ceil(length / 5)), brushSize * 0.6);
        last.current = to;
        const now = performance.now();
        if (now - lastMeasure.current > 140) {
            lastMeasure.current = now;
            measure();
        }
    };

    const pointFrom = (event: PointerEvent<HTMLCanvasElement>): Point => {
        const rect = event.currentTarget.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
        if (revealedRef.current) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        updateStripOffset();
        last.current = null;
        scratch(pointFrom(event));
    };

    const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
        if (!last.current || revealedRef.current) return;
        scratch(pointFrom(event));
    };

    const handlePointerUp = () => {
        if (!last.current) return;
        last.current = null;
        measure();
    };

    const coverAgain = () => {
        revealedRef.current = false;
        setRevealed(false);
        setPercent(0);
        paint(false);
    };

    const lastFour = cardNumber.replace(/\s/g, "").slice(-4);

    return (
        <div className={`w-full max-w-[360px] ${className}`}>
            <div ref={cardRef} className="relative">
                <div className="relative aspect-[1.586] w-full overflow-hidden rounded-[18px] bg-[#f2ece1] text-[#1d2a25] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_22px_40px_-22px_rgba(40,32,20,0.55),0_2px_5px_rgba(40,32,20,0.12)] dark:bg-[#18211e] dark:text-[#ebe3d3] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_22px_40px_-18px_rgba(0,0,0,0.8)]">
                    {/* Guilloche rosette, the fine-line print used on vouchers and banknotes. */}
                    <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 text-[#1d2a25] opacity-[0.09] dark:text-[#ebe3d3] dark:opacity-[0.08]">
                        {Array.from({length: 24}, (_, i) => (
                            <ellipse key={i} cx="100" cy="100" rx="92" ry="38" fill="none" stroke="currentColor" strokeWidth="0.6" transform={`rotate(${i * 7.5} 100 100)`}/>
                        ))}
                    </svg>

                    <div className="relative flex h-full flex-col p-[5.5%]">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-serif text-[19px] leading-none tracking-tight">{merchant}</p>
                                {tagline && <p className="mt-1 text-[10px] text-[#1d2a25]/60 dark:text-[#ebe3d3]/55">{tagline}</p>}
                            </div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#8b2e24] dark:text-[#e0917f]">Gift card</p>
                        </div>
                        <div className="mt-auto flex items-end justify-between">
                            <p className="font-serif text-[40px] leading-none tabular-nums">{amount}</p>
                            <div className="pb-1 text-right font-mono text-[10px] leading-relaxed text-[#1d2a25]/60 dark:text-[#ebe3d3]/55">
                                <p className="tabular-nums">•••• {lastFour}</p>
                                {expires && <p className="tabular-nums">Valid to {expires}</p>}
                            </div>
                        </div>

                        <div ref={stripRef} className="relative mt-3 h-[58px] shrink-0 rounded-[10px] bg-[#e6ded0] shadow-[inset_0_1px_2px_rgba(40,32,20,0.18)] dark:bg-[#0f1513] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                            <div aria-hidden={!revealed} className="flex h-full items-center justify-between px-4">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8b2e24] dark:text-[#e0917f]">PIN</span>
                                <span className="font-mono text-[22px] font-semibold tracking-[0.18em] tabular-nums">{pin}</span>
                            </div>
                            <canvas
                                ref={foilRef}
                                aria-hidden="true"
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={handlePointerUp}
                                onPointerCancel={handlePointerUp}
                                className={`absolute inset-0 h-full w-full touch-none rounded-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.12)] transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "cursor-crosshair opacity-100"}`}
                            />
                        </div>
                    </div>
                </div>
                <canvas
                    ref={dustRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 w-full"
                    style={{height: `calc(100% + ${EXTRA_FALL}px)`}}
                />
            </div>

            <div className="mt-5 flex items-center gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between text-[11px] text-stone-500 dark:text-stone-400">
                        <span>{revealed ? "PIN revealed" : "Scratched"}</span>
                        <span className="font-mono tabular-nums">{percent}%</span>
                    </div>
                    <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                        <div
                            className="h-full origin-left rounded-full bg-stone-500 transition-transform duration-300 dark:bg-stone-400"
                            style={{transform: `scaleX(${Math.min(1, percent / (threshold * 100))})`}}
                        />
                    </div>
                </div>
                {revealed ? (
                    <button
                        type="button"
                        onClick={coverAgain}
                        className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-stone-300 px-3.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
                    >
                        <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                        Cover again
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={reveal}
                        className="inline-flex h-9 shrink-0 items-center rounded-full bg-stone-900 px-3.5 text-xs font-medium text-stone-50 transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-offset-stone-950"
                    >
                        Reveal PIN
                    </button>
                )}
            </div>
            <p className="sr-only" aria-live="polite">{revealed ? `PIN ${pin}` : ""}</p>
        </div>
    );
};
