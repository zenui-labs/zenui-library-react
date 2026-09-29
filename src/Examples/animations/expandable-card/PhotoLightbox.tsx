import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuAperture, LuChevronLeft, LuChevronRight, LuX} from "react-icons/lu";

export interface Photo {
    id: string;
    /** Full size image shown in the viewer. */
    src: string;
    /** Smaller image for the grid tile. Falls back to `src`. */
    thumbnail?: string;
    alt: string;
    title: string;
    /** Credit or caption line under the title. */
    by?: string;
    /** Camera settings shown next to the aperture icon. */
    settings?: string;
}

export interface PhotoLightboxProps {
    /** The first photo gets a larger tile. */
    photos: Photo[];
    className?: string;
}

const spring = {type: "spring", stiffness: 300, damping: 34} as const;

// Photos grow from the grid into a viewer and shrink back into their tile. While browsing inside the viewer,
// tiles drop their shared layout id, so the next photo slides in instead of flying out of the grid.
export const PhotoLightbox = ({photos, className = ""}: PhotoLightboxProps) => {
    const uid = useId();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [navigated, setNavigated] = useState(false);
    const [direction, setDirection] = useState(1);
    const closeRef = useRef<HTMLButtonElement>(null);
    const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const returnTo = useRef<number | null>(null);
    const active = activeIndex === null ? null : photos[activeIndex];

    const go = (step: number) => {
        if (activeIndex === null) return;
        setDirection(step);
        setNavigated(true);
        setActiveIndex((activeIndex + step + photos.length) % photos.length);
    };

    const close = () => {
        returnTo.current = activeIndex;
        setActiveIndex(null);
    };

    useEffect(() => {
        if (activeIndex === null) return;
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") close();
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    });

    const isOpen = activeIndex !== null;
    useEffect(() => {
        if (isOpen) closeRef.current?.focus();
    }, [isOpen]);

    const openAt = (index: number) => {
        setNavigated(false);
        setActiveIndex(index);
    };

    return (
        <MotionConfig transition={spring} reducedMotion="user">
            <div className={`relative w-full max-w-2xl ${className}`}>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                    {photos.map((photo, index) => {
                        const shared = activeIndex === null || (index === activeIndex && !navigated);
                        return (
                            <li key={photo.id} className={index === 0 ? "col-span-2 sm:row-span-2" : ""}>
                                <motion.button
                                    ref={(element) => {
                                        tileRefs.current[index] = element;
                                    }}
                                    type="button"
                                    layoutId={shared ? `${uid}-${photo.id}` : undefined}
                                    onClick={() => openAt(index)}
                                    aria-label={`Open ${photo.title}`}
                                    tabIndex={activeIndex === null ? 0 : -1}
                                    style={{borderRadius: 16}}
                                    className={`group relative block w-full overflow-hidden bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-slate-800 dark:focus-visible:ring-offset-slate-950 ${
                                        index === 0 ? "aspect-[2/1] sm:aspect-square" : "aspect-square"
                                    }`}
                                >
                                    <motion.img
                                        layout
                                        src={photo.thumbnail ?? photo.src}
                                        alt={photo.alt}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </motion.button>
                            </li>
                        );
                    })}
                </ul>

                <AnimatePresence
                    onExitComplete={() => {
                        if (returnTo.current !== null) tileRefs.current[returnTo.current]?.focus();
                    }}
                >
                    {active && (
                        <motion.div
                            key="viewer"
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${active.title}, photo ${(activeIndex ?? 0) + 1} of ${photos.length}`}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, transition: {duration: 0.2, delay: 0.1}}}
                            className="absolute -inset-2 z-20 flex flex-col overflow-hidden rounded-3xl bg-gray-950/90 p-3 backdrop-blur-md sm:p-4"
                        >
                            <div className="flex items-center justify-between text-white">
                                <p className="text-xs tabular-nums text-white/60">
                                    {(activeIndex ?? 0) + 1} / {photos.length}
                                </p>
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={close}
                                    aria-label="Close viewer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <LuX className="h-4 w-4" aria-hidden="true"/>
                                </button>
                            </div>

                            <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
                                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                    <motion.div
                                        key={active.id}
                                        layoutId={`${uid}-${active.id}`}
                                        custom={direction}
                                        initial={navigated ? {opacity: 0, x: direction * 60} : false}
                                        animate={{opacity: 1, x: 0}}
                                        exit={navigated ? {opacity: 0, x: direction * -60} : undefined}
                                        style={{borderRadius: 16}}
                                        className="relative aspect-[3/2] max-h-full w-full overflow-hidden bg-gray-900"
                                    >
                                        <motion.img
                                            layout
                                            src={active.src}
                                            alt={active.alt}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label="Previous photo"
                                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <LuChevronLeft className="h-5 w-5" aria-hidden="true"/>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label="Next photo"
                                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <LuChevronRight className="h-5 w-5" aria-hidden="true"/>
                                </button>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={active.id}
                                    initial={{opacity: 0, y: 6}}
                                    animate={{opacity: 1, y: 0, transition: {delay: 0.15, duration: 0.25}}}
                                    exit={{opacity: 0, transition: {duration: 0.1}}}
                                    className="mt-3 flex flex-wrap items-end justify-between gap-2 text-white"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">{active.title}</p>
                                        {active.by && <p className="text-xs text-white/60">{active.by}</p>}
                                    </div>
                                    {active.settings && (
                                        <p className="inline-flex items-center gap-1.5 text-xs text-white/60">
                                            <LuAperture className="h-3.5 w-3.5" aria-hidden="true"/>
                                            {active.settings}
                                        </p>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
};
