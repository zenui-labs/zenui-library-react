import {motion} from "framer-motion";

export interface DirectionLockDragProps {
    src: string;
    alt: string;
    /** How far the image follows the pointer past its resting place, from 0 to 1. */
    elastic?: number;
    /** Stiffness of the spring that pulls the image back when released. */
    bounceStiffness?: number;
    className?: string;
}

/**
 * A draggable image that locks to the first direction you drag in, horizontal or vertical,
 * and springs back to where it started when released.
 */
export const DirectionLockDrag = ({
    src,
    alt,
    elastic = 0.5,
    bounceStiffness = 600,
    className = "",
}: DirectionLockDragProps) => (
    <motion.img
        src={src}
        alt={alt}
        className={`w-[200px] dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-xl p-6 ${className}`}
        drag
        dragDirectionLock
        dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
        dragTransition={{bounceStiffness, bounceDamping: 20}}
        dragElastic={elastic}
        whileTap={{cursor: "grabbing"}}
    />
);
