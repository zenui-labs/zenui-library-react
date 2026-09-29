import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, MutableRefObject, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {PanInfo} from "framer-motion";
import type {IconType} from "react-icons";
import {LuArrowLeft, LuArrowRight, LuMountainSnow, LuSailboat, LuSun, LuTreePine} from "react-icons/lu";

interface Postcard {
    id: string;
    place: string;
    country: string;
    note: string;
    date: string;
    icon: IconType;
    art: string;
}

const postcards: Postcard[] = [
    {id: "lofoten", place: "Lofoten", country: "Norway", note: "Midnight sun over Reine. Hiked Reinebringen at 1 am.", date: "Jun 21", icon: LuMountainSnow, art: "from-sky-400 via-indigo-500 to-violet-600"},
    {id: "kyoto", place: "Kyoto", country: "Japan", note: "Arashiyama before the crowds, then tofu at the market.", date: "Apr 3", icon: LuTreePine, art: "from-emerald-400 via-teal-500 to-cyan-700"},
    {id: "amalfi", place: "Amalfi", country: "Italy", note: "Ferry to Positano, lemons everywhere, swam at Fornillo.", date: "Aug 12", icon: LuSailboat, art: "from-cyan-300 via-sky-500 to-blue-700"},
    {id: "atacama", place: "Atacama", country: "Chile", note: "Salt flats at sunset and the clearest night sky yet.", date: "Nov 8", icon: LuSun, art: "from-amber-300 via-orange-500 to-rose-600"},
];

type Direction = 1 | -1;
const THRESHOLD = 110;

interface CardProps {
    postcard: Postcard;
    depth: number;
    total: number;
    onSent: () => void;
    flingRef: MutableRefObject<((direction: Direction) => void) | null>;
    reduceMotion: boolean;
}

const Card = ({postcard, depth, total, onSent, flingRef, reduceMotion}: CardProps) => {
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
        if (Math.abs(info.offset.x) > THRESHOLD || Math.abs(info.velocity.x) > 600) {
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

// A stack of postcards. Drag or fling the top card to send it to the back. It also tilts toward the pointer.
// Arrow keys and the buttons do the same for keyboard users.
const SwipeTiltStack = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const [order, setOrder] = useState<string[]>(postcards.map((card) => card.id));
    const flingRef = useRef<((direction: Direction) => void) | null>(null);
    const top = postcards.find((card) => card.id === order[0]) ?? postcards[0];

    const next = (direction: Direction = 1) => flingRef.current?.(direction);
    const previous = () => setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            next(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous();
        }
    };

    return (
        <div className="flex w-full flex-col items-center">
            <div
                role="group"
                aria-roledescription="card stack"
                aria-label={`Postcard ${postcards.indexOf(top) + 1} of ${postcards.length}: ${top.place}, ${top.country}`}
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
                            flingRef={flingRef}
                            reduceMotion={reduceMotion}
                            onSent={() => setOrder((current) => [...current.slice(1), current[0]])}
                        />
                    );
                })}
            </div>

            <div className="mt-14 flex items-center gap-3">
                <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous postcard"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                </button>
                <p className="min-w-[4rem] text-center text-sm tabular-nums text-gray-500 dark:text-slate-400" aria-hidden="true">
                    {postcards.indexOf(top) + 1} / {postcards.length}
                </p>
                <button
                    type="button"
                    onClick={() => next(1)}
                    aria-label="Next postcard"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
};

export default SwipeTiltStack;
