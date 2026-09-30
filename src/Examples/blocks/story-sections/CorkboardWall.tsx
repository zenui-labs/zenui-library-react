import {useEffect, useId, useLayoutEffect, useMemo, useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent, ReactNode, RefObject} from "react";
import {animate, motion, motionValue, useAnimationControls, useReducedMotion, useSpring, useTransform, useVelocity} from "framer-motion";
import type {MotionValue} from "framer-motion";

export type NotePaper = "index" | "sticky" | "polaroid" | "notebook";
export type PinColor = "red" | "blue" | "yellow" | "green" | "white";

export interface CorkNote {
    id: string;
    paper: NotePaper;
    quote: string;
    name: string;
    /** Job title and company. */
    role: string;
    /** Where the pin goes, as a percentage of the board's width and height. */
    x: number;
    y: number;
    /** Resting rotation in degrees. */
    tilt: number;
    pin?: PinColor;
    /** Sticky notes only. */
    color?: "yellow" | "mint" | "pink";
    /** Polaroids only. Without a photo the frame shows the person's initials on toned paper. */
    photo?: string;
}

export interface CorkboardWallProps {
    notes: CorkNote[];
    /** Pairs of note ids joined with red yarn. */
    strings?: [string, string][];
    eyebrow?: string;
    title?: string;
    description?: string;
    className?: string;
}

// Cork: three offset dot fields in different sizes and tones, plus fractal noise, on a warm base.
const CORK: CSSProperties = {
    backgroundColor: "#c79b6b",
    backgroundImage: [
        "radial-gradient(rgba(92,55,22,0.38) 0.9px, transparent 1.5px)",
        "radial-gradient(rgba(255,238,205,0.32) 0.8px, transparent 1.4px)",
        "radial-gradient(rgba(74,42,14,0.28) 1.4px, transparent 2.3px)",
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.2 0 0 0 0 0.08 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    ].join(","),
    backgroundSize: "7px 7px, 11px 11px, 17px 17px, 220px 220px",
    backgroundPosition: "0 0, 3px 5px, 9px 2px, 0 0",
};

const PIN_TONES: Record<PinColor, [string, string]> = {
    red: ["#f87171", "#b91c1c"],
    blue: ["#7dd3fc", "#1d4ed8"],
    yellow: ["#fde68a", "#d97706"],
    green: ["#86efac", "#15803d"],
    white: ["#ffffff", "#a8a29e"],
};

const STICKY: Record<NonNullable<CorkNote["color"]>, string> = {
    yellow: "bg-[linear-gradient(180deg,#fdf0a6,#fbe486)]",
    mint: "bg-[linear-gradient(180deg,#d7f5d0,#bfeab5)]",
    pink: "bg-[linear-gradient(180deg,#fde0e6,#f9c9d4)]",
};

const WIDTH: Record<NotePaper, [number, number]> = {
    index: [236, 208],
    sticky: [200, 184],
    polaroid: [188, 172],
    notebook: [226, 204],
};

// Distance from the top of a note to its pin. Notes rotate around this point, so they swing from the pin.
const PIN_Y = 14;

const Pin = ({color, controls}: {color: PinColor; controls: ReturnType<typeof useAnimationControls>}) => {
    const id = `pin-${useId().replace(/:/g, "")}`;
    const [light, dark] = PIN_TONES[color];
    return (
        <motion.svg
            aria-hidden="true"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            animate={controls}
            className="pointer-events-none absolute left-1/2 z-10 -ml-[13px] overflow-visible"
            style={{top: PIN_Y - 13, transformOrigin: "13px 13px"}}
        >
            <defs>
                <radialGradient id={id} cx="0.35" cy="0.3" r="0.75">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.95"/>
                    <stop offset="0.18" stopColor={light}/>
                    <stop offset="1" stopColor={dark}/>
                </radialGradient>
            </defs>
            {/* The light comes from the top left, so the pin throws its shadow down and to the right. */}
            <ellipse cx="17" cy="18" rx="6.5" ry="4" fill="rgba(35,20,8,0.35)" style={{filter: "blur(1.2px)"}}/>
            <circle cx="13" cy="13" r="7" fill={`url(#${id})`}/>
            <circle cx="13" cy="13" r="7" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6"/>
        </motion.svg>
    );
};

const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

const Paper = ({note}: {note: CorkNote}): ReactNode => {
    const signature = (
        <footer className="mt-3">
            <p className="font-semibold">{note.name}</p>
            <p className="opacity-70">{note.role}</p>
        </footer>
    );

    if (note.paper === "index") {
        return (
            <div
                className="bg-[#fdfcf7] px-4 pb-4 pt-9 font-mono text-[12px] leading-[22px] text-stone-800"
                style={{backgroundImage: "linear-gradient(transparent 29px, rgba(220,38,38,0.45) 29px, rgba(220,38,38,0.45) 30px, transparent 30px), repeating-linear-gradient(transparent 0 51px, rgba(59,130,246,0.2) 51px 52px, transparent 52px 73px)"}}
            >
                <blockquote>“{note.quote}”</blockquote>
                <div className="text-[11px] leading-4">{signature}</div>
            </div>
        );
    }

    if (note.paper === "sticky") {
        return (
            <div className={`relative px-4 pb-5 pt-8 text-[14px] font-medium leading-snug text-stone-800 ${STICKY[note.color ?? "yellow"]}`}>
                <blockquote>{note.quote}</blockquote>
                <div className="text-[11px] font-normal leading-4">{signature}</div>
                {/* The adhesive strip keeps the top flat; the bottom corner lifts off the board. */}
                <span aria-hidden="true" className="absolute bottom-0 right-0 h-8 w-8 bg-[linear-gradient(135deg,transparent_50%,rgba(0,0,0,0.08)_50%,rgba(255,255,255,0.35)_100%)]"/>
            </div>
        );
    }

    if (note.paper === "polaroid") {
        return (
            <div className="bg-[#fbfbf9] p-2.5 pb-3 text-stone-800">
                <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_30%_25%,#d6c6b0,#8c7a66_70%,#5f5245)]">
                    {note.photo ? (
                        <img src={note.photo} alt="" className="h-full w-full object-cover [filter:saturate(0.8)_contrast(1.05)_sepia(0.12)]" draggable={false}/>
                    ) : (
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-serif text-5xl italic text-white/80">{initials(note.name)}</span>
                    )}
                    <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(0,0,0,0.25))]"/>
                </div>
                <blockquote className="mt-2.5 font-serif text-[14px] italic leading-snug">“{note.quote}”</blockquote>
                <p className="mt-1.5 text-[11px] leading-4"><span className="font-semibold">{note.name}</span>, {note.role}</p>
            </div>
        );
    }

    return (
        <div
            className="bg-white pb-4 pl-10 pr-4 pt-7 font-serif text-[15px] italic leading-[22px] text-stone-800"
            style={{
                backgroundImage: "linear-gradient(90deg, transparent 29px, rgba(239,68,68,0.5) 29px, rgba(239,68,68,0.5) 30px, transparent 30px), repeating-linear-gradient(transparent 0 21px, rgba(59,130,246,0.22) 21px 22px)",
                backgroundPosition: "0 0, 0 6px",
                // Ripped from a spiral: a row of half holes along the top edge.
                WebkitMaskImage: "radial-gradient(circle at 7px 0, transparent 3.5px, #000 4px)",
                maskImage: "radial-gradient(circle at 7px 0, transparent 3.5px, #000 4px)",
                WebkitMaskSize: "14px 100%",
                maskSize: "14px 100%",
            }}
        >
            <blockquote>{note.quote}</blockquote>
            <div className="font-sans text-[11px] not-italic leading-4">{signature}</div>
        </div>
    );
};

interface NoteProps {
    note: CorkNote;
    offset: {x: MotionValue<number>; y: MotionValue<number>};
    left: number;
    top: number;
    width: number;
    tilt: number;
    zIndex: number;
    boardRef: RefObject<HTMLDivElement>;
    onRaise: () => void;
}

const Note = ({note, offset, left, top, width, tilt, zIndex, boardRef, onRaise}: NoteProps) => {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const pin = useAnimationControls();
    const [lifted, setLifted] = useState(false);
    // Sideways speed tips the note around its pin, and a loose spring lets it settle back like it has weight.
    const velocity = useVelocity(offset.x);
    const swing = useSpring(useTransform(velocity, [-1600, 1600], [-12, 12], {clamp: true}), {stiffness: 170, damping: 11, mass: 0.8});
    const rotate = useTransform(swing, (value) => tilt + (reduceMotion ? 0 : value));

    const grab = () => {
        onRaise();
        setLifted(true);
        if (!reduceMotion) void pin.start({rotate: [0, -24, 16, -8, 3, 0], transition: {duration: 0.6, ease: "easeOut"}});
    };

    const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 40 : 12;
        const moves: Record<string, [number, number]> = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]};
        const move = moves[event.key];
        const board = boardRef.current?.getBoundingClientRect();
        const self = ref.current?.getBoundingClientRect();
        if (!move || !board || !self) return;
        event.preventDefault();
        onRaise();
        const dx = Math.max(board.left - self.left, Math.min(board.right - self.right, move[0]));
        const dy = Math.max(board.top - self.top, Math.min(board.bottom - self.bottom, move[1]));
        const options = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 500, damping: 35};
        animate(offset.x, offset.x.get() + dx, options);
        animate(offset.y, offset.y.get() + dy, options);
    };

    return (
        <motion.div
            ref={ref}
            role="group"
            aria-roledescription="movable note"
            aria-label={`${note.name}, ${note.role}`}
            tabIndex={0}
            drag
            dragConstraints={boardRef}
            dragElastic={0.06}
            dragTransition={{power: 0.18, timeConstant: 220}}
            onPointerDown={grab}
            onFocus={onRaise}
            onDragEnd={() => setLifted(false)}
            onPointerUp={() => setLifted(false)}
            onKeyDown={nudge}
            whileDrag={{scale: 1.035}}
            className="absolute cursor-grab touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#c79b6b] active:cursor-grabbing"
            style={{left, top: top - PIN_Y, width, marginLeft: -width / 2, x: offset.x, y: offset.y, rotate, zIndex, transformOrigin: `50% ${PIN_Y}px`}}
        >
            <div
                className="transition-shadow duration-300"
                style={{
                    boxShadow: lifted
                        ? "0 1px 1px rgba(0,0,0,0.08), 16px 26px 34px -12px rgba(38,20,6,0.55)"
                        : "0 1px 1px rgba(0,0,0,0.12), 5px 9px 14px -6px rgba(38,20,6,0.5)",
                }}
            >
                <Paper note={note}/>
            </div>
            <Pin color={note.pin ?? "red"} controls={pin}/>
        </motion.div>
    );
};

interface YarnProps {
    from: {x: number; y: number; offset: {x: MotionValue<number>; y: MotionValue<number>}};
    to: {x: number; y: number; offset: {x: MotionValue<number>; y: MotionValue<number>}};
}

const Yarn = ({from, to}: YarnProps) => {
    const refs = useRef<(SVGPathElement | null)[]>([]);
    const ends = useRef<(SVGCircleElement | null)[]>([]);
    // The string is cut a little longer than the first gap. Pull the notes apart and it goes taut; push them
    // together and it sags like a V.
    const length = Math.hypot(to.x - from.x, to.y - from.y) * 1.1;

    useEffect(() => {
        const draw = () => {
            const ax = from.x + from.offset.x.get();
            const ay = from.y + from.offset.y.get();
            const bx = to.x + to.offset.x.get();
            const by = to.y + to.offset.y.get();
            const gap = Math.hypot(bx - ax, by - ay);
            const sag = gap < length ? Math.sqrt(length * length - gap * gap) / 2 : 0;
            // A quadratic curve's midpoint sits halfway to its control point, so the control drops twice the sag.
            const d = `M ${ax} ${ay} Q ${(ax + bx) / 2} ${(ay + by) / 2 + sag * 2} ${bx} ${by}`;
            refs.current.forEach((path) => path?.setAttribute("d", d));
            ends.current[0]?.setAttribute("cx", `${ax}`);
            ends.current[0]?.setAttribute("cy", `${ay}`);
            ends.current[1]?.setAttribute("cx", `${bx}`);
            ends.current[1]?.setAttribute("cy", `${by}`);
        };
        draw();
        const stops = [from.offset.x, from.offset.y, to.offset.x, to.offset.y].map((value) => value.on("change", draw));
        return () => stops.forEach((stop) => stop());
    }, [from, to, length]);

    return (
        <g>
            <path ref={(node) => {
                refs.current[0] = node;
            }} fill="none" stroke="rgba(40,20,6,0.3)" strokeWidth={2.4} transform="translate(3 5)" style={{filter: "blur(1px)"}}/>
            <path ref={(node) => {
                refs.current[1] = node;
            }} fill="none" stroke="#b91c1c" strokeWidth={2.4} strokeLinecap="round"/>
            {/* Short light dashes along the yarn read as twisted fibres. */}
            <path ref={(node) => {
                refs.current[2] = node;
            }} fill="none" stroke="#f87171" strokeWidth={1} strokeDasharray="2 3.5" strokeLinecap="round" opacity={0.7}/>
            <circle ref={(node) => {
                ends.current[0] = node;
            }} r={2.6} fill="#991b1b"/>
            <circle ref={(node) => {
                ends.current[1] = node;
            }} r={2.6} fill="#991b1b"/>
        </g>
    );
};

/**
 * Testimonials pinned to a corkboard on different kinds of paper. Notes can be dragged around the board (or moved
 * with the arrow keys), come to the front when grabbed and swing on their pin as they move. Red yarn joins related
 * notes and follows them, sagging when they are close and pulling taut when they are far apart.
 */
export const CorkboardWall = ({
    notes,
    strings = [],
    eyebrow = "Wall of notes",
    title = "Pinned up by the people who use it",
    description = "Unedited, and handwritten where we could manage it. Drag the notes around; the red string keeps related stories together.",
    className = "",
}: CorkboardWallProps) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({width: 0, height: 0});
    const [order, setOrder] = useState(() => notes.map((note) => note.id));
    // Plain motion values rather than hooks, because the number of notes comes from props.
    const offsets = useMemo(() => new Map(notes.map((note) => [note.id, {x: motionValue(0), y: motionValue(0)}])), [notes]);
    const compact = size.width > 0 && size.width < 640;
    const twoColumns = size.width >= 460;

    useLayoutEffect(() => {
        const node = boardRef.current;
        if (!node) return;
        const measure = () => setSize({width: node.clientWidth, height: node.clientHeight});
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Switching between the wide board and the stacked phone board starts every note back on its own pin.
    useEffect(() => {
        offsets.forEach((offset) => {
            offset.x.set(0);
            offset.y.set(0);
        });
    }, [compact, twoColumns, offsets]);

    // Below 640px the notes stack down a tall board instead: two staggered columns while there is room for them
    // side by side, one gently zig-zagging column on phones. The steps keep each quote clear of the next note.
    const step = twoColumns ? 150 : 250;
    const compactHeight = 36 + (notes.length - 1) * step + (twoColumns ? 330 : 300);
    const placed = notes.map((note, index) => {
        const width = WIDTH[note.paper][compact ? 1 : 0];
        if (!compact) return {note, width, left: (note.x / 100) * size.width, top: (note.y / 100) * size.height};
        const left = size.width * (twoColumns ? (index % 2 === 0 ? 0.28 : 0.72) : index % 2 === 0 ? 0.46 : 0.54);
        return {note, width, left, top: 36 + index * step};
    });
    const byId = new Map(placed.map((item) => [item.note.id, item]));

    const raise = (id: string) => setOrder((current) => (current[current.length - 1] === id ? current : [...current.filter((item) => item !== id), id]));

    return (
        <section className={`relative w-full overflow-hidden bg-[#efe9df] px-4 py-16 text-stone-900 sm:px-8 sm:py-24 dark:bg-[#17130f] dark:text-stone-100 ${className}`}>
            <div className="relative mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">{description}</p>
                </div>

                <div className="mt-10 rounded-[20px] bg-[linear-gradient(135deg,#8a5c33,#6b4323_35%,#84592f_65%,#5a391e)] p-2.5 shadow-[0_30px_60px_-30px_rgba(60,35,10,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] sm:mt-14 sm:p-3 dark:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <div
                        ref={boardRef}
                        className="relative overflow-hidden rounded-xl shadow-[inset_0_2px_14px_rgba(40,20,5,0.55)]"
                        style={{...CORK, height: compact ? compactHeight : 600}}
                    >
                        {/* After dark, a desk lamp lights the top left of the board. */}
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_18%_0%,rgba(255,214,150,0.16),transparent_55%),linear-gradient(rgba(10,6,2,0.42),rgba(10,6,2,0.55))] dark:block"/>

                        {size.width > 0 && placed.map((item) => (
                            <Note
                                key={item.note.id}
                                note={item.note}
                                offset={offsets.get(item.note.id)!}
                                left={item.left}
                                top={item.top}
                                width={item.width}
                                tilt={item.note.tilt}
                                zIndex={order.indexOf(item.note.id) + 1}
                                boardRef={boardRef}
                                onRaise={() => raise(item.note.id)}
                            />
                        ))}

                        {size.width > 0 && (
                            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" style={{zIndex: notes.length + 2}}>
                                {strings.map(([a, b]) => {
                                    const from = byId.get(a);
                                    const to = byId.get(b);
                                    if (!from || !to) return null;
                                    return (
                                        <Yarn
                                            key={`${a}-${b}-${compact ? "c" : "w"}`}
                                            from={{x: from.left, y: from.top, offset: offsets.get(a)!}}
                                            to={{x: to.left, y: to.top, offset: offsets.get(b)!}}
                                        />
                                    );
                                })}
                            </svg>
                        )}
                    </div>
                </div>
                <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-500">Drag a note, or focus it and use the arrow keys. Hold Shift to move further.</p>
            </div>
        </section>
    );
};
