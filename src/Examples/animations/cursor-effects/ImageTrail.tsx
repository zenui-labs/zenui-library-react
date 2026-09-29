import {useEffect, useRef, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

interface TrailImage {
    id: number;
    src: string;
    x: number;
    y: number;
    rotate: number;
}

export interface ImageTrailProps {
    /** Image URLs, dropped in order and repeated. They are decorative, so they get empty alt text. */
    images: string[];
    /** Content shown under the images. */
    children?: ReactNode;
    /** Pointer travel in px between images. Doubled with reduced motion. */
    step?: number;
    /** How long each image stays before it leaves, in ms. */
    visibleFor?: number;
    /** Most images on screen at once. */
    maxImages?: number;
    /** Classes for the wrapper around `children`. */
    contentClassName?: string;
    className?: string;
}

// Moving the pointer drops images along its path. Each one pops in, holds briefly and falls away.
// On touch screens a tap drops an image instead.
export const ImageTrail = ({
    images,
    children,
    step = 90,
    visibleFor = 700,
    maxImages = 7,
    contentClassName = "pointer-events-none z-0 text-center",
    className = "",
}: ImageTrailProps) => {
    const reduceMotion = useReducedMotion();
    const [trail, setTrail] = useState<TrailImage[]>([]);
    const lastPoint = useRef<{x: number; y: number} | null>(null);
    const nextId = useRef(0);
    const timers = useRef(new Set<number>());

    useEffect(() => {
        // Preload so the first pass does not show empty frames.
        images.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    }, [images]);

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach((timer) => window.clearTimeout(timer));
    }, []);

    const drop = (x: number, y: number) => {
        if (images.length === 0) return;
        const id = nextId.current;
        nextId.current += 1;
        const image: TrailImage = {id, src: images[id % images.length], x, y, rotate: (Math.random() - 0.5) * 16};
        setTrail((current) => [...current.slice(-(maxImages - 1)), image]);
        const timer = window.setTimeout(() => {
            setTrail((current) => current.filter((item) => item.id !== id));
            timers.current.delete(timer);
        }, visibleFor);
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
        const spacing = reduceMotion ? step * 2 : step;
        if (!last || Math.hypot(point.x - last.x, point.y - last.y) > spacing) {
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
            className={`relative flex min-h-[380px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-stone-50 px-6 dark:border-slate-800 dark:bg-slate-950 ${className}`}
        >
            <div className={`relative ${contentClassName}`}>{children}</div>

            <AnimatePresence>
                {trail.map((image) => (
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
