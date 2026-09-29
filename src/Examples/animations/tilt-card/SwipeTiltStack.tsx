import {useEffect, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, MutableRefObject, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {PanInfo} from "framer-motion";
import {LuArrowLeft, LuArrowRight} from "react-icons/lu";

export interface Postcard {
    id: string;
    place: string;
    country: string;
    note: string;
    /** Shown on the postage stamp in the corner. */
    date: string;
    icon: ComponentType<{className?: string}>;
    /** Tailwind gradient stops for the artwork, such as "from-sky-400 via-indigo-500 to-violet-600". */
    art: string;
}

export interface SwipeTiltStackLabels {
    /** Name of one card, used in the screen reader label, such as "Postcard 1 of 4". */
    item: string;
    previous: string;
    next: string;
}

const defaultLabels: SwipeTiltStackLabels = {
    item: "Postcard",
    previous: "Previous postcard",
    next: "Next postcard",
};

type Direction = 1 | -1;

// Drops ids that are no longer passed in and adds new ones at the back, so the stack follows the data.
const syncOrder = (current: string[], ids: string[]) => [
    ...current.filter((id) => ids.includes(id)),
    ...ids.filter((id) => !current.includes(id)),
];

interface CardProps {
    postcard: Postcard;
    depth: number;
    total: number;
    threshold: number;
    onSent: () => void;
    flingRef: MutableRefObject<((direction: Direction) => void) | null>;
    reduceMotion: boolean;
}

const Card = ({postcard, depth, total, threshold, onSent, flingRef, reduceMotion}: CardProps) => {
    const isTop = depth === 0;
    const dragX = useMotionValue(0);
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const tiltX = useSpring(pointerX, {stiffness: 200, damping: 20});
    const tiltY = useSpring(pointerY, {stiffness: 200, damping: 20});
    const tilt = reduceMotion ? 0 : 1;
    const rotateX = useTransform(tiltY, [0, 1], [10 * tilt, -10 * tilt]);
    const rotateY = useTransform(tiltX, [0, 1], [-12 * tilt, 12 * tilt]);
    const rotate = useTransform(dragX, [-240, 240], [-14, 14]);
    // The card fades as it leaves, so it is already invisible when it drops to the back.
    const fade = useTransform(dragX, [-420, -220, 0, 220, 420], [0, 1, 1, 1, 0]);
    const flying = useRef(false);
    const Icon = postcard.icon;

    // Fly off to one side, then drop to the back of the stack.
    const fling = (direction: Direction) => {
        if (flying.current) return;
        flying.current = true;
        const done = () => {
            flying.current = false;
            onSent();
            dragX.set(0);
        };
        if (reduceMotion) {
            done();
            return;
        }
        void animate(dragX, direction * 420, {type: "spring", stiffness: 260, damping: 30, velocity: direction * 800}).then(done);
    };

    useEffect(() => {
        if (!isTop) return;
        flingRef.current = fling;
        return () => {
            if (flingRef.current === fling) flingRef.current = null;
        };
    });

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 600) {
            fling(info.offset.x > 0 ? 1 : -1);
        } else {
            void animate(dragX, 0, {type: "spring", stiffness: 400, damping: 30});
        }
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!isTop) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
    };

    return (
        <motion.div
            className="absolute inset-0 [perspective:1000px]"
            style={{zIndex: total - depth}}
            initial={false}
            animate={{y: depth * 16, scale: 1 - depth * 0.06, opacity: depth > 2 ? 0 : 1}}
            transition={{type: "spring", stiffness: 260, damping: 26, opacity: {duration: depth > 2 ? 0 : 0.3}}}
        >
            <motion.div
                drag={isTop ? "x" : false}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => {
                    pointerX.set(0.5);
                    pointerY.set(0.5);
                }}
                whileDrag={{scale: 1.03}}
                style={{x: dragX, rotate, rotateX, rotateY, opacity: fade, transformStyle: "preserve-3d"}}
                aria-hidden={!isTop}
                className={`relative flex h-full select-none flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl shadow-gray-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 ${
                    isTop ? "cursor-grab active:cursor-grabbing" : ""
                }`}
            >
                <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${postcard.art}`}>
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.45),transparent_40%)]"/>
                    <motion.span style={{z: 40}} className="relative">
                        <Icon className="h-16 w-16 text-white drop-shadow-lg" aria-hidden="true"/>
                    </motion.span>
                    {/* Postage stamp. */}
                    <span className="absolute right-3 top-3 rounded-md border-2 border-dashed border-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                        {postcard.date}
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {postcard.place}
                        <span className="font-normal text-gray-500 dark:text-slate-400">, {postcard.country}</span>
                    </h3>
                    <p className="mt-2 font-serif text-sm italic leading-6 text-gray-600 dark:text-slate-300">{postcard.note}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export interface SwipeTiltStackProps {
    postcards: Postcard[];
    /** Called with the card that comes to the top after a swipe, a button press or an arrow key. */
    onTopChange?: (postcard: Postcard) => void;
    /** How far the top card must be dragged, in px, before letting go sends it to the back. */
    swipeThreshold?: number;
    labels?: Partial<SwipeTiltStackLabels>;
    className?: string;
}

// A stack of postcards. Drag or fling the top card to send it to the back. It also tilts toward the pointer.
// Arrow keys and the buttons do the same for keyboard users.
export const SwipeTiltStack = ({postcards, onTopChange, swipeThreshold = 110, labels, className = ""}: SwipeTiltStackProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const text = {...defaultLabels, ...labels};
    const [savedOrder, setOrder] = useState<string[]>(() => postcards.map((card) => card.id));
    const flingRef = useRef<((direction: Direction) => void) | null>(null);
    const ids = postcards.map((card) => card.id);
    const order = syncOrder(savedOrder, ids);
    const top = postcards.find((card) => card.id === order[0]) ?? postcards[0];

    const onTopChangeRef = useRef(onTopChange);
    onTopChangeRef.current = onTopChange;
    const lastTopId = useRef(top?.id);
    useEffect(() => {
        if (!top || top.id === lastTopId.current) return;
        lastTopId.current = top.id;
        onTopChangeRef.current?.(top);
    }, [top]);

    const next = (direction: Direction = 1) => flingRef.current?.(direction);
    const previous = () => setOrder((current) => {
        const synced = syncOrder(current, ids);
        return [synced[synced.length - 1], ...synced.slice(0, -1)];
    });

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            next(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous();
        }
    };

    if (!top) return null;
    const position = postcards.indexOf(top) + 1;

    return (
        <div className={`flex w-full flex-col items-center ${className}`}>
            <div
                role="group"
                aria-roledescription="card stack"
                aria-label={`${text.item} ${position} of ${postcards.length}: ${top.place}, ${top.country}`}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="relative h-80 w-full max-w-[18rem] rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-8 dark:focus-visible:ring-offset-slate-950"
            >
                {order.map((id, depth) => {
                    const postcard = postcards.find((card) => card.id === id);
                    if (!postcard) return null;
                    return (
                        <Card
                            key={id}
                            postcard={postcard}
                            depth={depth}
                            total={order.length}
                            threshold={swipeThreshold}
                            flingRef={flingRef}
                            reduceMotion={reduceMotion}
                            onSent={() => setOrder((current) => {
                                const synced = syncOrder(current, ids);
                                return [...synced.slice(1), synced[0]];
                            })}
                        />
                    );
                })}
            </div>

            <div className="mt-14 flex items-center gap-3">
                <button
                    type="button"
                    onClick={previous}
                    aria-label={text.previous}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                </button>
                <p className="min-w-[4rem] text-center text-sm tabular-nums text-gray-500 dark:text-slate-400" aria-hidden="true">
                    {position} / {postcards.length}
                </p>
                <button
                    type="button"
                    onClick={() => next(1)}
                    aria-label={text.next}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
};
