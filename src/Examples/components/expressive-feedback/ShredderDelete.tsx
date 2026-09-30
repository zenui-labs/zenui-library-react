import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {animate, motion, motionValue, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import type {AnimationPlaybackControls, MotionValue} from "framer-motion";
import {LuTrash2, LuUndo2} from "react-icons/lu";

export interface ShredderDocument {
    id: string;
    /** File name, e.g. "INV-2041_Halvorsen.pdf". */
    name: string;
    /** Secondary line such as size and date. */
    meta: string;
    /** Right-aligned figure such as the invoice total. */
    amount?: string;
}

export interface ShredderDeleteProps {
    documents: ShredderDocument[];
    title?: string;
    subtitle?: string;
    /** Seconds the undo toast stays up before a shred becomes final. */
    undoSeconds?: number;
    /** Text printed on the shredder head. */
    model?: string;
    /** Called once the undo window has closed and the document is gone for good. */
    onShred?: (document: ShredderDocument) => void;
    onRestore?: (document: ShredderDocument) => void;
    className?: string;
}

// Positions are measured once per shred, relative to the root, so the overlay can pick the row up exactly where it was.
interface Geometry {
    left: number;
    top: number;
    width: number;
    height: number;
    slotY: number;
    binLeft: number;
    binHeight: number;
}

interface Shred {
    key: string;
    doc: ShredderDocument;
    /** Null with reduced motion, where nothing flies and the row simply fades. */
    geometry: Geometry | null;
    seed: number;
    /** 0 is the row in the list, 1 is strips resting in the bin. Undo plays the same timeline backwards. */
    t: MotionValue<number>;
    committed: boolean;
    reversing: boolean;
}

type RowStatus = "shredding" | "gone" | "restoring";

// Timeline marks on the 0..1 shred progress.
const APPROACH_END = 0.22;
const FEED_END = 0.6;
const FORWARD_SECONDS = 2.2;
const REVERSE_SECONDS = 1.5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const segment = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

// Small seeded generator, so a pile looks the same when the timeline is scrubbed backwards.
const createRandom = (seed: number) => {
    let state = seed >>> 0;
    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
};

const PdfGlyph = () => (
    <svg aria-hidden="true" viewBox="0 0 22 28" className="h-7 w-[22px] shrink-0">
        <path d="M1.5 1.5h13l6 6v19h-19z" className="fill-stone-50 stroke-stone-300 dark:fill-stone-700 dark:stroke-stone-500" strokeWidth="1"/>
        <path d="M14.5 1.5v6h6" className="fill-stone-200 stroke-stone-300 dark:fill-stone-600 dark:stroke-stone-500" strokeWidth="1"/>
        <path d="M5 12h9M5 15h11M5 18h7" className="stroke-stone-300 dark:stroke-stone-500" strokeWidth="1"/>
        <rect x="3.5" y="20.5" width="12" height="5" rx="1" className="fill-red-600 dark:fill-red-500"/>
        <text x="9.5" y="24.6" textAnchor="middle" fontSize="4.2" fontWeight="700" fill="white" fontFamily="ui-sans-serif, system-ui">PDF</text>
    </svg>
);

// The printable face of a document. The list row, the sheet in flight and every strip draw the same face,
// which is why the strips read as slices of the actual file.
const DocFace = ({doc}: {doc: ShredderDocument}) => (
    <div className="flex h-14 items-center gap-3 rounded-lg border border-stone-200 bg-white pl-3 pr-12 dark:border-stone-700 dark:bg-stone-800">
        <PdfGlyph/>
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">{doc.name}</p>
            <p className="truncate font-mono text-[11px] text-stone-500 dark:text-stone-400">{doc.meta}</p>
        </div>
        {doc.amount && <span className="shrink-0 text-sm tabular-nums text-stone-700 dark:text-stone-300">{doc.amount}</span>}
    </div>
);

const Paper = ({shred, geometry}: {shred: Shred; geometry: Geometry}) => {
    const {t, doc} = shred;
    const {top, height, slotY} = geometry;
    const y = useTransform(t, (v) => {
        if (v < APPROACH_END) return top + (slotY - height - top) * easeInOut(segment(v, 0, APPROACH_END));
        return slotY - height + height * segment(v, APPROACH_END, FEED_END);
    });
    const lift = useTransform(t, (v) => Math.sin(Math.PI * segment(v, 0, APPROACH_END)));
    const scale = useTransform(lift, (s) => 1 + s * 0.035);
    const rotate = useTransform(lift, (s) => s * -2.4);
    // The rollers grab the sheet unevenly, so it judders sideways while it feeds.
    const x = useTransform(t, (v) => (v > APPROACH_END && v < FEED_END ? Math.sin(v * 140) * 0.7 : 0));
    const boxShadow = useTransform(lift, (s) => `0 ${2 + s * 12}px ${6 + s * 22}px -4px rgba(28,25,23,${0.12 + s * 0.16})`);

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 overflow-hidden" style={{height: slotY}}>
            <motion.div
                className="absolute top-0 rounded-lg"
                style={{left: geometry.left, width: geometry.width, height, y, x, scale, rotate, boxShadow}}
            >
                <DocFace doc={doc}/>
            </motion.div>
        </div>
    );
};

interface StripParams {
    start: number;
    driftX: number;
    spin: number;
    twist: number;
    restY: number;
}

interface StripProps {
    shred: Shred;
    geometry: Geometry;
    index: number;
    stripWidth: number;
    params: StripParams;
}

const Strip = ({shred, geometry, index, stripWidth, params}: StripProps) => {
    const {t, doc} = shred;
    const {height} = geometry;
    const fall = useTransform(t, (v) => segment(v, params.start, params.start + 0.26));
    const y = useTransform(t, (v) => {
        const emerge = -height + height * segment(v, APPROACH_END, FEED_END);
        const w = segment(v, params.start, params.start + 0.26);
        if (w <= 0) return emerge;
        // Gravity for most of the drop, then a small settle as the strip lands on the pile.
        const drop = w < 0.82 ? Math.pow(w / 0.82, 2) : 1 - 0.05 * Math.sin((Math.PI * (w - 0.82)) / 0.18);
        return drop * params.restY;
    });
    const x = useTransform(fall, (w) => params.driftX * easeOut(w));
    const rotate = useTransform(fall, (w) => params.spin * easeInOut(w));
    // Twisting around the long axis while falling is what makes a flat strip read as a curling ribbon.
    const rotateY = useTransform(fall, (w) => params.twist * w + Math.sin(w * Math.PI * 2) * 26 * (1 - w));
    const scaleY = useTransform(fall, (w) => 1 - 0.14 * w);

    return (
        <motion.div
            className="absolute top-0 overflow-hidden"
            style={{
                left: geometry.left - geometry.binLeft + index * stripWidth,
                width: stripWidth + 0.5,
                height,
                y,
                x,
                rotate,
                rotateY,
                scaleY,
                transformPerspective: 360,
            }}
        >
            <div style={{width: geometry.width, marginLeft: -index * stripWidth}}>
                <DocFace doc={doc}/>
            </div>
            <div className={`absolute inset-0 ${index % 2 ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-black/[0.07] to-transparent`}/>
        </motion.div>
    );
};

const Strips = ({shred, geometry}: {shred: Shred; geometry: Geometry}) => {
    const {seed} = shred;
    const count = Math.max(8, Math.round(geometry.width / 24));
    const stripWidth = geometry.width / count;
    const [params] = useState<StripParams[]>(() => {
        const random = createRandom(seed);
        return Array.from({length: count}, (_, index) => {
            const side = random() < 0.5 ? -1 : 1;
            return {
                start: FEED_END + random() * 0.11,
                driftX: (random() - 0.5) * 44 + (index - count / 2) * 1.6,
                spin: side * (52 + random() * 44),
                twist: (random() - 0.5) * 110,
                restY: geometry.binHeight - geometry.height / 2 - 8 - random() * 18,
            };
        });
    });

    return (
        <>
            {params.map((param, index) => (
                <Strip key={index} shred={shred} geometry={geometry} index={index} stripWidth={stripWidth} params={param}/>
            ))}
        </>
    );
};

/**
 * A document list with a paper shredder underneath. Shredding lifts the row, feeds it through the slot and drops
 * it into the bin as strips cut from the same document. Undo plays the timeline backwards and the strips reassemble.
 */
export const ShredderDelete = ({
    documents,
    title = "Documents",
    subtitle,
    undoSeconds = 6,
    model = "Strip cut · P-2",
    onShred,
    onRestore,
    className = "",
}: ShredderDeleteProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const slotRef = useRef<HTMLDivElement>(null);
    const binRef = useRef<HTMLDivElement>(null);
    const undoRef = useRef<HTMLButtonElement>(null);
    const faceRefs = useRef(new Map<string, HTMLDivElement>());
    const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
    const controls = useRef(new Map<string, AnimationPlaybackControls>());
    const timer = useRef<AnimationPlaybackControls | null>(null);
    const counter = useRef(0);

    const [statuses, setStatuses] = useState<Record<string, RowStatus>>({});
    const [shreds, setShreds] = useState<Shred[]>([]);
    const [pendingKey, setPendingKey] = useState<string | null>(null);
    const [listHeight, setListHeight] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState("");

    const shake = useMotionValue(0);
    const motor = useMotionValue(0);
    const teeth = useMotionValue(0);
    const countdown = useMotionValue(1);
    const ledOpacity = useTransform(motor, [0, 1], [0, 1]);
    const teethPosition = useTransform(teeth, (v) => `${v}px 0`);

    // The list keeps its starting height so the shredder never moves while a sheet is on its way to the slot.
    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const update = () => {
            list.style.minHeight = "";
            setListHeight(list.offsetHeight);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        const running = controls.current;
        return () => {
            running.forEach((control) => control.stop());
            timer.current?.stop();
        };
    }, []);

    const pending = shreds.find((shred) => shred.key === pendingKey) ?? null;
    const visibleCount = documents.filter((doc) => !statuses[doc.id]).length;

    const commit = (key: string) => {
        timer.current?.stop();
        timer.current = null;
        setPendingKey((current) => (current === key ? null : current));
        setShreds((list) => list.map((shred) => (shred.key === key ? {...shred, committed: true} : shred)));
        const shred = shreds.find((item) => item.key === key);
        const doc = shred?.doc ?? documents.find((item) => key.startsWith(`${item.id}#`));
        if (doc) {
            setStatuses((current) => ({...current, [doc.id]: "gone"}));
            onShred?.(doc);
        }
    };

    const startUndoTimer = (key: string) => {
        timer.current?.stop();
        countdown.set(1);
        timer.current = animate(countdown, 0, {duration: undoSeconds, ease: "linear", onComplete: () => commit(key)});
    };

    // The machine follows whichever sheet is in the slot: the head shakes, the rollers turn and the motor lamp lights.
    const driveMachine = (t: MotionValue<number>) => t.on("change", (v) => {
        const feeding = v > APPROACH_END && v < FEED_END + 0.02;
        shake.set(feeding ? Math.sin(v * 1100) * 0.9 : 0);
        motor.set(feeding ? 1 : 0);
        teeth.set(v * 420);
    });

    const moveFocusFrom = (id: string) => {
        const order = documents.filter((doc) => doc.id === id || !statuses[doc.id]);
        const index = order.findIndex((doc) => doc.id === id);
        const next = order[index + 1] ?? order[index - 1];
        requestAnimationFrame(() => {
            const target = next && next.id !== id ? buttonRefs.current.get(next.id) : undoRef.current;
            target?.focus();
        });
    };

    const handleShred = (doc: ShredderDocument) => {
        if (pending) commit(pending.key);
        counter.current += 1;
        const key = `${doc.id}#${counter.current}`;
        setMessage(`${doc.name} shredded. Undo is available for ${undoSeconds} seconds.`);
        moveFocusFrom(doc.id);

        if (reduceMotion) {
            setStatuses((current) => ({...current, [doc.id]: "shredding"}));
            setShreds((list) => [...list, {key, doc, geometry: null, seed: 0, t: motionValue(1), committed: false, reversing: false}]);
            setPendingKey(key);
            startUndoTimer(key);
            return;
        }

        const root = rootRef.current?.getBoundingClientRect();
        const face = faceRefs.current.get(doc.id)?.getBoundingClientRect();
        const slot = slotRef.current?.getBoundingClientRect();
        const bin = binRef.current?.getBoundingClientRect();
        if (!root || !face || !slot || !bin) return;

        const geometry: Geometry = {
            left: face.left - root.left,
            top: face.top - root.top,
            width: face.width,
            height: face.height,
            slotY: slot.top - root.top + slot.height / 2,
            binLeft: bin.left - root.left,
            binHeight: bin.height,
        };
        const t = motionValue(0);
        const unsubscribe = driveMachine(t);
        const shred: Shred = {key, doc, geometry, seed: counter.current * 7919 + doc.id.length * 131, t, committed: false, reversing: false};

        setStatuses((current) => ({...current, [doc.id]: "shredding"}));
        setShreds((list) => [...list, shred]);
        setPendingKey(key);
        controls.current.set(key, animate(t, 1, {duration: FORWARD_SECONDS, ease: "linear", onComplete: unsubscribe}));
        startUndoTimer(key);
    };

    const handleUndo = () => {
        if (!pending) return;
        const {key, doc, t} = pending;
        timer.current?.stop();
        timer.current = null;
        setMessage(`${doc.name} restored.`);
        setStatuses((current) => ({...current, [doc.id]: "restoring"}));
        onRestore?.(doc);

        const finish = () => {
            controls.current.delete(key);
            setShreds((list) => list.filter((shred) => shred.key !== key));
            setPendingKey((current) => (current === key ? null : current));
            setStatuses((current) => {
                const next = {...current};
                delete next[doc.id];
                return next;
            });
            requestAnimationFrame(() => buttonRefs.current.get(doc.id)?.focus());
        };

        if (reduceMotion) {
            finish();
            return;
        }

        setShreds((list) => list.map((shred) => (shred.key === key ? {...shred, reversing: true} : shred)));
        controls.current.get(key)?.stop();
        const unsubscribe = driveMachine(t);
        controls.current.set(key, animate(t, 0, {
            duration: REVERSE_SECONDS * Math.max(0.3, t.get()),
            ease: "linear",
            onComplete: () => {
                unsubscribe();
                finish();
            },
        }));
    };

    return (
        <div
            ref={rootRef}
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm dark:border-stone-800 dark:bg-stone-900 ${className}`}
        >
            <div className="flex items-baseline justify-between px-6 pb-3 pt-5">
                <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
                <span className="font-mono text-[11px] tabular-nums text-stone-500 dark:text-stone-400">
                    {subtitle ?? `${visibleCount} ${visibleCount === 1 ? "file" : "files"}`}
                </span>
            </div>

            <ul ref={listRef} className="relative px-6 pb-3" style={{minHeight: listHeight}}>
                {documents.map((doc) => {
                    const status = statuses[doc.id];
                    const collapsed = status === "shredding" || status === "gone";
                    return (
                        <motion.li
                            key={doc.id}
                            initial={false}
                            animate={collapsed ? {height: 0, opacity: reduceMotion ? 0 : 1} : {height: "auto", opacity: 1}}
                            transition={{
                                height: {duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: collapsed && !reduceMotion ? 0.18 : 0},
                                opacity: {duration: 0.25},
                            }}
                            className="overflow-hidden"
                        >
                            <div className="relative pb-2" style={{visibility: status && !reduceMotion ? "hidden" : "visible"}}>
                                <div ref={(node) => {
                                    if (node) faceRefs.current.set(doc.id, node);
                                    else faceRefs.current.delete(doc.id);
                                }}>
                                    <DocFace doc={doc}/>
                                </div>
                                <button
                                    ref={(node) => {
                                        if (node) buttonRefs.current.set(doc.id, node);
                                        else buttonRefs.current.delete(doc.id);
                                    }}
                                    type="button"
                                    disabled={Boolean(status)}
                                    onClick={() => handleShred(doc)}
                                    aria-label={`Shred ${doc.name}`}
                                    className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-500 dark:hover:bg-stone-700 dark:hover:text-stone-100 dark:focus-visible:ring-stone-100"
                                >
                                    <LuTrash2 className="h-4 w-4" aria-hidden="true"/>
                                </button>
                            </div>
                        </motion.li>
                    );
                })}
                {visibleCount === 0 && !pending && (
                    <li className="absolute inset-x-6 top-0 flex h-14 items-center justify-center rounded-lg border border-dashed border-stone-300 font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400 dark:border-stone-700 dark:text-stone-500">
                        Tray empty
                    </li>
                )}
            </ul>

            {/* Shredder head. The slot sits a little wider than the rows so the sheet never scrapes the edges. */}
            <motion.div
                aria-hidden="true"
                style={{x: shake}}
                className="relative z-20 mx-2 h-16 rounded-xl bg-gradient-to-b from-stone-700 to-stone-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_18px_-12px_rgba(0,0,0,0.6)] dark:from-stone-700/80 dark:to-stone-950"
            >
                <div ref={slotRef} className="absolute inset-x-3 top-4 h-2 rounded-full bg-stone-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.16)]">
                    <motion.div
                        className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 opacity-60"
                        style={{backgroundImage: "repeating-linear-gradient(90deg, rgba(214,211,209,0.55) 0 1px, transparent 1px 5px)", backgroundPosition: teethPosition}}
                    />
                </div>
                <div className="absolute inset-x-4 bottom-2.5 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400">{model}</span>
                    <span className="relative h-1.5 w-1.5 rounded-full bg-stone-600">
                        <motion.span className="absolute inset-0 rounded-full bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.7)]" style={{opacity: ledOpacity}}/>
                    </span>
                </div>
            </motion.div>

            {/* Bin. Strips are clipped to its tapered outline, and the shadow under the head sits on top of them. */}
            <div
                ref={binRef}
                aria-hidden="true"
                className="relative mx-5 h-36 overflow-hidden bg-stone-200/80 dark:bg-stone-800/70"
                style={{
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 12px 100%)",
                    backgroundImage: "repeating-linear-gradient(90deg, transparent 0 13px, rgba(120,113,108,0.16) 13px 14px)",
                }}
            >
                {shreds.map((shred) => shred.geometry && <Strips key={shred.key} shred={shred} geometry={shred.geometry}/>)}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-stone-900/30 to-transparent dark:from-black/60"/>
            </div>

            {shreds.map((shred) => shred.geometry && !shred.committed && <Paper key={shred.key} shred={shred} geometry={shred.geometry}/>)}

            <div className="flex h-16 items-center px-5">
                {pending && !pending.reversing ? (
                    <div
                        onPointerEnter={() => timer.current?.pause()}
                        onPointerLeave={() => timer.current?.play()}
                        onFocus={() => timer.current?.pause()}
                        onBlur={() => timer.current?.play()}
                        className="relative flex w-full items-center gap-3 overflow-hidden rounded-lg bg-stone-900 py-2.5 pl-3.5 pr-2 text-stone-100 shadow-lg dark:bg-stone-100 dark:text-stone-900"
                    >
                        <p className="min-w-0 flex-1 truncate text-[13px]">
                            <span className="text-stone-400 dark:text-stone-500">Shredded </span>
                            {pending.doc.name}
                        </p>
                        <button
                            ref={undoRef}
                            type="button"
                            onClick={handleUndo}
                            className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-amber-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 dark:text-amber-700 dark:hover:bg-black/5 dark:focus-visible:ring-amber-700"
                        >
                            <LuUndo2 className="h-3.5 w-3.5" aria-hidden="true"/>
                            Undo
                        </button>
                        <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-amber-300/70 dark:bg-amber-600/70" style={{scaleX: countdown}}/>
                    </div>
                ) : (
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                        {shreds.length === 0 ? "Bin empty" : `${shreds.length} shredded this session`}
                    </p>
                )}
            </div>

            <p className="sr-only" aria-live="polite">{message}</p>
        </div>
    );
};
