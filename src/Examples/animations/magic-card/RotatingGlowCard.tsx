import {useRef, useState} from "react";
import type {MouseEvent} from "react";
import {motion} from "framer-motion";

export interface RotatingGlowCardProps {
    title: string;
    description?: string;
    /** Largest tilt in degrees, reached at the card edges. */
    maxTilt?: number;
    className?: string;
}

/**
 * A card that tilts in 3D toward the pointer, with a spotlight that follows it and a glowing border.
 * The glow colors follow the `dark` class, so the card adapts to the theme on its own.
 */
export const RotatingGlowCard = ({title, description, maxTilt = 10, className = ""}: RotatingGlowCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0.5, y: 0.5});
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: (event.clientX - rect.left) / rect.width,
            y: (event.clientY - rect.top) / rect.height,
        });
    };

    const rotateY = isHovered ? (mousePosition.x - 0.5) * maxTilt * 2 : 0;
    const rotateX = isHovered ? (0.5 - mousePosition.y) * maxTilt * 2 : 0;

    const spotlightX = `${mousePosition.x * 100}%`;
    const spotlightY = `${mousePosition.y * 100}%`;

    return (
        <div
            ref={cardRef}
            className={`relative w-64 h-[300px] [perspective:1000px] ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg cursor-pointer transition-shadow duration-300 [--spotlight:rgb(152,0,255)] dark:[--spotlight:rgb(255,255,255)] ${
                    isHovered
                        ? "shadow-[0px_10px_25px_rgba(152,0,255,0.15),0_0_30px_rgba(152,0,255,0.15)] dark:shadow-[0px_10px_25px_rgba(0,0,0,0.2),0_0_30px_rgba(100,100,255,0.4)]"
                        : "shadow-[0px_5px_15px_rgba(0,0,0,0.1)]"
                }`}
                animate={{rotateY, rotateX}}
                transition={{type: "spring", stiffness: 300, damping: 15}}
            >
                <div className="flex flex-col items-center justify-center h-full p-4 z-10">
                    <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                    {description && <p className="text-sm text-center text-gray-300">{description}</p>}
                </div>

                {isHovered && (
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 0.15}}
                        style={{
                            background: `radial-gradient(circle at ${spotlightX} ${spotlightY}, var(--spotlight) 0%, transparent 70%)`,
                        }}
                    />
                )}

                {isHovered && (
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-0 border-2 border-[rgb(152,0,255,0.6)] dark:border-blue-400 rounded-lg pointer-events-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        style={{boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)"}}
                    />
                )}
            </motion.div>
        </div>
    );
};
