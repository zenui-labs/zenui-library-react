import {useEffect, useRef, useState} from "react";
import type {PointerEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

const photos = [
    "photo-1506905925346-21bda4d32df4",
    "photo-1470071459604-3b5ec3a7fe05",
    "photo-1501785888041-af3ef285b470",
    "photo-1441974231531-c6227db76b6e",
    "photo-1469474968028-56623f02e42e",
    "photo-1507525428034-b723cf961d3e",
].map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&h=400&q=70`);

interface TrailImage {
    id: number;
    src: string;
    x: number;
    y: number;
    rotate: number;
}

const STEP = 90; // px of pointer travel between images
const VISIBLE_FOR = 700; // ms each image stays before leaving
const MAX_IMAGES = 7;

// Moving the pointer drops photos along its path. Each one pops in, holds briefly and falls away.
// On touch screens a tap drops a photo instead.
const ImageTrail = () => {
    const reduceMotion = useReducedMotion();
    const [images, setImages] = useState<TrailImage[]>([]);
    const lastPoint = useRef<{x: number; y: number} | null>(null);
    const nextId = useRef(0);
    const timers = useRef(new Set<number>());

    useEffect(() => {
        // Preload so the first pass does not show empty frames.
        photos.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
        const pending = timers.current;
        return () => pending.forEach((timer) => window.clearTimeout(timer));
    }, []);

    const drop = (x: number, y: number) => {
        const id = nextId.current;
        nextId.current += 1;
        const image: TrailImage = {id, src: photos[id % photos.length], x, y, rotate: (Math.random() - 0.5) * 16};
        setImages((current) => [...current.slice(-(MAX_IMAGES - 1)), image]);
        const timer = window.setTimeout(() => {
            setImages((current) => current.filter((item) => item.id !== id));
            timers.current.delete(timer);
        }, VISIBLE_FOR);
        timers.current.add(timer);
    };

    const localPoint = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        return {x: event.clientX - rect.left, y: event.clientY - rect.top};
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;
        const point = localPoint(event);
        const last = lastPoint.current;
        const step = reduceMotion ? STEP * 2 : STEP;
        if (!last || Math.hypot(point.x - last.x, point.y - last.y) > step) {
            lastPoint.current = point;
            drop(point.x, point.y);
        }
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerDown={(event) => {
                if (event.pointerType === "mouse") return;
                const point = localPoint(event);
                drop(point.x, point.y);
            }}
            onPointerLeave={() => {
                lastPoint.current = null;
            }}
            className="relative flex min-h-[380px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-stone-50 px-6 dark:border-slate-800 dark:bg-slate-950"
        >
            <div className="pointer-events-none relative z-0 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-slate-500">Field notes, 2019 to 2026</p>
                <h2 className="mt-3 font-serif text-5xl italic tracking-tight text-gray-900 sm:text-7xl dark:text-white">Maya Chen</h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-slate-400">Landscape photography. Move your pointer here, or tap, to look through the archive.</p>
            </div>

            <AnimatePresence>
                {images.map((image) => (
                    <motion.div
                        key={image.id}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-0 z-10"
                        style={{x: image.x, y: image.y}}
                    >
                        <motion.div
                            initial={reduceMotion ? {opacity: 0, x: "-50%", y: "-50%"} : {opacity: 0, scale: 0.4, rotate: image.rotate * 2, x: "-50%", y: "-50%"}}
                            animate={{opacity: 1, scale: 1, rotate: image.rotate, x: "-50%", y: "-50%"}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85, y: "-20%", transition: {duration: 0.45, ease: [0.4, 0, 1, 1]}}}
                            transition={{type: "spring", stiffness: 380, damping: 26}}
                            className="h-40 w-32 overflow-hidden rounded-xl bg-gradient-to-br from-stone-300 to-stone-500 shadow-xl shadow-black/20 ring-1 ring-black/5 sm:h-48 sm:w-40 dark:from-slate-700 dark:to-slate-800 dark:ring-white/10"
                        >
                            <img src={image.src} alt="" className="h-full w-full object-cover" draggable={false}/>
                        </motion.div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ImageTrail;
