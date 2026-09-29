import {useId, useRef, useState} from "react";
import type {MouseEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface MagicHoverCardProps {
    /** Heading inside the preview panel. */
    title: string;
    /** Short text under the heading in the preview panel. */
    description: string;
    imageSrc: string;
    imageAlt: string;
    /** Content of the trigger button. */
    label?: ReactNode;
    className?: string;
}

// Half the panel width (w-80) and a fixed lift, so the panel centers on the pointer.
const OFFSET_X = 160;
const OFFSET_Y = 100;

/** A button that shows a preview panel which follows the pointer with spring physics while hovered or focused. */
export const MagicHoverCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    label = "Hover for a preview",
    className = "",
}: MagicHoverCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const cardRef = useRef<HTMLDivElement>(null);
    const panelId = useId();

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setPosition({x: event.clientX - rect.left, y: event.clientY - rect.top});
    };

    // Keyboard users get the panel centered on the button.
    const handleFocus = () => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setPosition({x: rect.width / 2, y: rect.height / 2});
        }
        setIsOpen(true);
    };

    return (
        <div
            ref={cardRef}
            className={`relative ${className}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onMouseMove={handleMouseMove}
        >
            <button
                type="button"
                onFocus={handleFocus}
                onBlur={() => setIsOpen(false)}
                aria-describedby={isOpen ? panelId : undefined}
                className="py-4 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
                {label}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        className="absolute top-0 left-0 z-50 w-80 rounded-xl backdrop-blur-lg dark:bg-slate-900/40 bg-white/60 border border-white/20 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: position.x - OFFSET_X,
                            y: position.y - OFFSET_Y,
                        }}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                    >
                        <div className="p-5">
                            <img alt={imageAlt} src={imageSrc} className="object-cover rounded-xl"/>
                            <h3 className="mb-1 text-lg font-bold dark:text-[#abc2d3] text-gray-700 mt-4">{title}</h3>
                            <p className="text-sm text-gray-500 dark:text-[#abc2d3] font-[400]">{description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
