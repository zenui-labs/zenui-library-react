import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {useInView, useReducedMotion} from "framer-motion";

export type DotMatrixEffect = "scroll" | "blink" | "wipe" | "static";

export interface DotMatrixMessage {
    text: string;
    /** How the message arrives. Defaults to "scroll". */
    effect?: DotMatrixEffect;
    /** Seconds the finished message stays up before the next one. Ignored by "scroll". */
    hold?: number;
}

export interface DotMatrixSignProps {
    /** Played in order, then repeated. */
    messages: DotMatrixMessage[];
    /** Fixed, inverted block on the left for a route number or counter. It never scrolls. */
    badge?: string;
    color?: "amber" | "green" | "red";
    /** Width of the message area in dots. */
    columns?: number;
    /** Columns per second for scrolling and wipes. */
    speed?: number;
    /** Accessible name for the sign. */
    label?: string;
    className?: string;
}

// A 5 x 7 font. Each glyph is seven rows, top to bottom; bit 4 is the leftmost dot.
const FONT: Record<string, number[]> = {
    " ": [0, 0, 0, 0, 0, 0, 0],
    A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
    B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
    C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
    D: [0x1c, 0x12, 0x11, 0x11, 0x11, 0x12, 0x1c],
    E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
    F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
    G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f],
    H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
    I: [0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
    J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
    K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
    L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
    M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
    N: [0x11, 0x11, 0x19, 0x15, 0x13, 0x11, 0x11],
    O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
    P: [0x1e, 0x11, 0x11, 0x1e, 0x10, 0x10, 0x10],
    Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
    R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
    S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
    T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
    U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
    V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
    W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x15, 0x0a],
    X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
    Y: [0x11, 0x11, 0x11, 0x0a, 0x04, 0x04, 0x04],
    Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
    0: [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e],
    1: [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
    2: [0x0e, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1f],
    3: [0x1f, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0e],
    4: [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02],
    5: [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x11, 0x0e],
    6: [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e],
    7: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
    8: [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e],
    9: [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
    ".": [0, 0, 0, 0, 0, 0x0c, 0x0c],
    ",": [0, 0, 0, 0, 0x0c, 0x04, 0x08],
    ":": [0, 0x0c, 0x0c, 0, 0x0c, 0x0c, 0],
    "·": [0, 0, 0, 0x0c, 0x0c, 0, 0],
    "-": [0, 0, 0, 0x1f, 0, 0, 0],
    "/": [0, 0x01, 0x02, 0x04, 0x08, 0x10, 0],
    "'": [0x0c, 0x04, 0x08, 0, 0, 0, 0],
    "!": [0x04, 0x04, 0x04, 0x04, 0x04, 0, 0x04],
    "?": [0x0e, 0x11, 0x01, 0x02, 0x04, 0, 0x04],
    ">": [0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08],
    "<": [0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02],
    "+": [0, 0x04, 0x04, 0x1f, 0x04, 0x04, 0],
    "&": [0x0c, 0x12, 0x14, 0x08, 0x15, 0x12, 0x0d],
    "#": [0x0a, 0x0a, 0x1f, 0x0a, 0x1f, 0x0a, 0x0a],
};

// Punctuation is set proportionally, like real sign fonts; letters and digits keep the full 5 columns.
const NARROW = new Set([".", ",", ":", "·", "'", "!"]);

const ROWS = 7;
// One unlit row above and below the text.
const PAD = 1;

const PALETTE = {
    amber: {dot: [255, 170, 30], core: [255, 236, 190], off: "rgba(255,170,30,0.075)", face: "#0d0904"},
    green: {dot: [70, 255, 120], core: [220, 255, 225], off: "rgba(70,255,120,0.065)", face: "#040b06"},
    red: {dot: [255, 55, 35], core: [255, 210, 190], off: "rgba(255,55,35,0.08)", face: "#0e0504"},
};

// Turns text into a list of 7-bit column masks, bit 0 being the top row.
const rasterize = (text: string): number[] => {
    const clean = text.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
    const columns: number[] = [];
    for (const char of clean) {
        const glyph = FONT[char] ?? FONT[" "];
        let glyphColumns = [0, 1, 2, 3, 4].map((x) => glyph.reduce((mask, row, y) => mask | (((row >> (4 - x)) & 1) << y), 0));
        if (char === " ") glyphColumns = [0, 0, 0];
        else if (NARROW.has(char)) glyphColumns = glyphColumns.filter((mask) => mask !== 0);
        if (columns.length) columns.push(0);
        columns.push(...glyphColumns);
    }
    return columns;
};

const FULL = (1 << ROWS) - 1;

interface Frame {
    columns: number[];
    done: boolean;
}

// What the message area shows t seconds into a message. Everything moves in whole columns, as a real
// controller would, never by sub-dot amounts.
const frameAt = (message: DotMatrixMessage, glyphs: number[], width: number, t: number, speed: number, still: boolean): Frame => {
    const hold = message.hold ?? 2.5;
    const effect = still ? "static" : message.effect ?? "scroll";
    const start = Math.max(0, Math.floor((width - glyphs.length) / 2));
    const centered = (column: number) => glyphs[column - start] ?? 0;
    const columns = new Array<number>(width).fill(0);

    if (effect === "scroll") {
        const x = width - Math.floor(t * speed);
        for (let c = 0; c < width; c += 1) columns[c] = glyphs[c - x] ?? 0;
        return {columns, done: x + glyphs.length < 0};
    }
    if (effect === "blink") {
        const blinking = t < 2.4;
        const lit = !blinking || Math.floor(t / 0.4) % 2 === 0;
        for (let c = 0; c < width; c += 1) columns[c] = lit ? centered(c) : 0;
        return {columns, done: t > 2.4 + hold};
    }
    if (effect === "wipe") {
        const rate = speed * 1.6;
        const reveal = width / rate;
        if (t < reveal) {
            const edge = Math.floor(t * rate);
            for (let c = 0; c < width; c += 1) columns[c] = c < edge ? centered(c) : c === edge ? FULL : 0;
            return {columns, done: false};
        }
        const edge = Math.floor((t - reveal - hold) * rate);
        for (let c = 0; c < width; c += 1) columns[c] = c < edge ? 0 : c === edge ? FULL : centered(c);
        return {columns, done: edge > width};
    }
    for (let c = 0; c < width; c += 1) columns[c] = centered(c);
    return {columns, done: t > hold};
};

// A soft round LED: bright core, coloured body, and a halo that spills onto the neighbours.
const makeSprite = (pitch: number, dot: number[], core: number[]) => {
    const size = Math.ceil(pitch * 3);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return canvas;
    const middle = size / 2;
    const halo = context.createRadialGradient(middle, middle, 0, middle, middle, pitch * 1.4);
    halo.addColorStop(0, `rgba(${dot.join(",")},0.45)`);
    halo.addColorStop(0.35, `rgba(${dot.join(",")},0.12)`);
    halo.addColorStop(1, `rgba(${dot.join(",")},0)`);
    context.fillStyle = halo;
    context.fillRect(0, 0, size, size);
    const body = context.createRadialGradient(middle - pitch * 0.06, middle - pitch * 0.08, 0, middle, middle, pitch * 0.36);
    body.addColorStop(0, `rgb(${core.join(",")})`);
    body.addColorStop(0.45, `rgb(${dot.join(",")})`);
    body.addColorStop(1, `rgba(${dot.join(",")},0.9)`);
    context.fillStyle = body;
    context.beginPath();
    context.arc(middle, middle, pitch * 0.36, 0, Math.PI * 2);
    context.fill();
    return canvas;
};

/**
 * An LED dot-matrix sign drawn on a canvas with its own 5 x 7 font. Lit dots bloom into their neighbours,
 * unlit dots stay faintly visible, and messages arrive by scrolling, blinking or wiping. It stops while off screen.
 */
export const DotMatrixSign = ({
    messages,
    badge,
    color = "amber",
    columns = 72,
    speed = 22,
    label = "Sign",
    className = "",
}: DotMatrixSignProps) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inView = useInView(wrapRef);
    const reduceMotion = useReducedMotion() ?? false;
    const [width, setWidth] = useState(0);
    const palette = PALETTE[color];

    const badgeGlyphs = useMemo(() => (badge ? rasterize(badge) : []), [badge]);
    // An inverted badge: two lit columns either side of the number, then a dark gutter before the message.
    const badgeWidth = badge ? badgeGlyphs.length + 4 : 0;
    const gutter = badge ? 2 : 0;
    const total = 1 + badgeWidth + gutter + columns + 1;
    const rows = ROWS + PAD * 2;
    const rasters = useMemo(() => messages.map((message) => rasterize(message.text)), [messages]);

    useLayoutEffect(() => {
        const node = wrapRef.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Playback position survives pauses, so scrolling picks up where it stopped when the sign returns to view.
    const playback = useRef({index: 0, time: 0});

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context || width === 0 || messages.length === 0) return;

        const ratio = window.devicePixelRatio || 1;
        const pitch = width / total;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(pitch * rows * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const sprite = makeSprite(pitch * ratio, palette.dot, palette.core);
        const spriteSize = sprite.width / ratio;
        // Real LEDs are never perfectly matched; each dot gets its own fixed brightness.
        const variance = Array.from({length: total * rows}, (_, index) => 0.82 + (((index * 2654435761) >>> 0) % 1000) / 5500);

        // The unlit grid never changes, so it is drawn once and stamped each frame.
        const base = document.createElement("canvas");
        base.width = canvas.width;
        base.height = canvas.height;
        const baseContext = base.getContext("2d");
        if (baseContext) {
            baseContext.setTransform(ratio, 0, 0, ratio, 0, 0);
            baseContext.fillStyle = palette.off;
            for (let x = 0; x < total; x += 1) {
                for (let y = 0; y < rows; y += 1) {
                    baseContext.beginPath();
                    baseContext.arc((x + 0.5) * pitch, (y + 0.5) * pitch, pitch * 0.34, 0, Math.PI * 2);
                    baseContext.fill();
                }
            }
        }

        const lit = (x: number, y: number) => {
            context.globalAlpha = variance[y * total + x];
            context.drawImage(sprite, (x + 0.5) * pitch - spriteSize / 2, (y + 0.5) * pitch - spriteSize / 2, spriteSize, spriteSize);
        };

        let last = "";
        const draw = (frame: number[]) => {
            // Skip the repaint when no dot changed, which is most frames at sign speeds.
            const key = frame.join(",");
            if (key === last) return;
            last = key;
            context.globalCompositeOperation = "source-over";
            context.globalAlpha = 1;
            context.clearRect(0, 0, width, pitch * rows);
            context.drawImage(base, 0, 0, width, pitch * rows);
            context.globalCompositeOperation = "lighter";
            if (badge) {
                for (let c = 0; c < badgeWidth; c += 1) {
                    const mask = badgeGlyphs[c - 2] ?? 0;
                    for (let y = 0; y < rows; y += 1) {
                        const inside = y >= PAD && y < PAD + ROWS;
                        if (!inside || !((mask >> (y - PAD)) & 1)) lit(1 + c, y);
                    }
                }
            }
            const offset = 1 + badgeWidth + gutter;
            frame.forEach((mask, c) => {
                for (let y = 0; y < ROWS; y += 1) if ((mask >> y) & 1) lit(offset + c, y + PAD);
            });
        };

        const step = (seconds: number) => {
            const state = playback.current;
            state.time += seconds;
            let current = frameAt(messages[state.index % messages.length], rasters[state.index % messages.length], columns, state.time, speed, reduceMotion);
            if (current.done) {
                state.index = (state.index + 1) % messages.length;
                state.time = 0;
                current = frameAt(messages[state.index], rasters[state.index], columns, 0, speed, reduceMotion);
            }
            draw(current.columns);
        };

        step(0);
        if (!inView) return;

        let frameId = 0;
        let previous = performance.now();
        const tick = (now: number) => {
            step(Math.min(0.1, (now - previous) / 1000));
            previous = now;
            frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [width, total, rows, palette, badge, badgeGlyphs, badgeWidth, gutter, columns, messages, rasters, speed, reduceMotion, inView]);

    const height = width ? (width / total) * rows : undefined;

    return (
        <div
            role="marquee"
            aria-label={label}
            className={`relative w-full max-w-3xl rounded-[14px] bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-400 p-[7px] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-1px_0_rgba(0,0,0,0.15)_inset,0_18px_30px_-18px_rgba(0,0,0,0.45)] dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 dark:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_18px_36px_-18px_rgba(0,0,0,0.95)] ${className}`}
        >
            {/* Corner screws: slotted, each at its own angle. */}
            {["left-[3px] top-[3px] rotate-12", "right-[3px] top-[3px] -rotate-45", "bottom-[3px] left-[3px] rotate-45", "bottom-[3px] right-[3px] rotate-[70deg]"].map((position) => (
                <span
                    key={position}
                    aria-hidden="true"
                    className={`absolute h-[5px] w-[5px] rounded-full bg-zinc-500 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:-translate-y-1/2 after:bg-zinc-700 dark:bg-zinc-600 dark:after:bg-zinc-900 ${position}`}
                />
            ))}
            <div className="relative overflow-hidden rounded-[8px] p-[6px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9)]" style={{backgroundColor: palette.face}}>
                <div ref={wrapRef} className="relative w-full" style={{height}}>
                    <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full"/>
                </div>
                {/* Tinted front window with a single angled reflection. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_38%,transparent_38.2%)]"/>
            </div>
            <p className="sr-only">
                {badge ? `${badge}: ` : ""}
                {messages.map((message) => message.text).join(". ")}
            </p>
        </div>
    );
};
