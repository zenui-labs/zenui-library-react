import {useRef, useState} from "react";
import type {MouseEvent} from "react";
import {motion} from "framer-motion";

export interface MagnetTiltCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    primaryLabel?: string;
    onPrimaryClick?: () => void;
    secondaryLabel?: string;
    onSecondaryClick?: () => void;
    /** How far the card follows the pointer, in px. */
    strength?: number;
    className?: string;
}

const ROTATION_FACTOR = 1;
const HOVER_SCALE = 1.05;

/** A card that is pulled toward the pointer, tilts in 3D and grows slightly while hovered. */
export const MagnetTiltCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    primaryLabel = "Explore",
    onPrimaryClick,
    secondaryLabel = "Docs",
    onSecondaryClick,
    strength = 35,
    className = "",
}: MagnetTiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const {left, top, width, height} = cardRef.current.getBoundingClientRect();
        // Pointer offset from the center, from -1 to 1 on each axis.
        const x = (event.clientX - (left + width / 2)) / (width / 2);
        const y = (event.clientY - (top + height / 2)) / (height / 2);
        setPosition({x: x * strength, y: y * strength});
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({x: 0, y: 0});
    };

    return (
        <motion.div
            ref={cardRef}
            className={`relative w-full md:w-96 cursor-pointer dark:bg-slate-900 dark:border-slate-700 rounded-md bg-white shadow-[2px_1px_15px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-200 ${className}`}
            animate={{
                x: position.x,
                y: position.y,
                rotateX: position.y * ROTATION_FACTOR,
                rotateY: position.x * -ROTATION_FACTOR,
                scale: isHovered ? HOVER_SCALE : 1,
            }}
            transition={{type: "spring", stiffness: 250, damping: 20, mass: 1}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="w-full overflow-hidden">
                    <img src={imageSrc} alt={imageAlt} className="object-cover w-full h-full"/>
                </div>

                <div className="flex flex-col p-5 space-y-2 flex-grow">
                    <h3 className="text-xl font-semibold dark:text-[#abc2d3] text-gray-800">{title}</h3>
                    <p className="text-sm dark:text-[#abc2d3]/80 text-gray-500">{description}</p>
                    <div className="mt-auto pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onPrimaryClick}
                            className="flex-1 py-2 rounded-lg bg-[#3B9DF8] text-white text-sm font-medium hover:bg-[#3B9DF8]/90 transition"
                        >
                            {primaryLabel}
                        </button>
                        <button
                            type="button"
                            onClick={onSecondaryClick}
                            className="flex-1 py-2 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                            {secondaryLabel}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
