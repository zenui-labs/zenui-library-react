import {useRef, useState} from "react";
import type {MouseEvent} from "react";
import {motion} from "framer-motion";

export interface MagnetProjectCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    /** Small pills under the description, such as the tech stack. */
    tags?: string[];
    /** Link for the filled button. Leave out to hide it. */
    previewUrl?: string;
    /** Link for the outlined button. Leave out to hide it. */
    codeUrl?: string;
    previewLabel?: string;
    codeLabel?: string;
    /** How far the card follows the pointer, in px. */
    strength?: number;
    className?: string;
}

const ROTATION_FACTOR = 0.8;
const HOVER_SCALE = 1.01;

/** A project card that is pulled gently toward the pointer and tilts a little while hovered. */
export const MagnetProjectCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    tags = [],
    previewUrl,
    codeUrl,
    previewLabel = "Live preview",
    codeLabel = "Code",
    strength = 15,
    className = "",
}: MagnetProjectCardProps) => {
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
            className={`relative w-full md:w-[70%] p-5 rounded-xl border border-[#e5eaf2] dark:border-white/20 bg-white dark:bg-white/10 backdrop-blur-lg shadow-[2px_1px_10px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden transition-colors ${className}`}
            animate={{
                x: position.x,
                y: position.y,
                rotateX: position.y * ROTATION_FACTOR,
                rotateY: position.x * -ROTATION_FACTOR,
                scale: isHovered ? HOVER_SCALE : 1,
            }}
            transition={{type: "spring", stiffness: 400, damping: 25, mass: 1}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="w-full h-40 rounded-xl shadow-[0px_2px_6px_rgba(0,0,0,0.05)] overflow-hidden mb-4">
                <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover"/>
            </div>

            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm opacity-80 mb-4 text-gray-600 dark:text-white/80">{description}</p>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs mb-6">
                    {tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-800 dark:bg-white/20 dark:text-white px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {(previewUrl || codeUrl) && (
                <div className="flex gap-3">
                    {previewUrl && (
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 text-center bg-[#3B9DF8] hover:bg-[#3B9DF8]/90 text-white rounded-lg text-sm font-medium transition"
                        >
                            {previewLabel}
                        </a>
                    )}
                    {codeUrl && (
                        <a
                            href={codeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2 text-center border border-[#3B9DF8] hover:bg-indigo-50 text-[#3B9DF8] dark:hover:bg-white/10 dark:text-white dark:border-white/30 rounded-lg text-sm font-medium transition"
                        >
                            {codeLabel}
                        </a>
                    )}
                </div>
            )}

            {/* Soft glow that follows the pointer. It ignores clicks so the links stay usable. */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                animate={{
                    opacity: isHovered ? 0.1 : 0,
                    background: isHovered
                        ? `radial-gradient(circle at ${50 + position.x / 2}% ${50 + position.y / 2}%, rgba(255,255,255,0.2), transparent 40%)`
                        : "none",
                }}
                transition={{duration: 0.3}}
            />
        </motion.div>
    );
};
