import {useRef, useState, type MouseEvent, type ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface LinkPreviewCard {
    title: string;
    description: string;
    /** Thumbnail image URL. */
    image?: string;
    imageAlt?: string;
}

export interface LinkPreviewProps {
    href: string;
    /** The link text. */
    children: ReactNode;
    preview: LinkPreviewCard;
    /** Opens the link in a new tab. */
    newTab?: boolean;
    className?: string;
}

/** A text link that shows a preview card with a title, description and thumbnail while it is hovered or focused. */
export const LinkPreview = ({href, children, preview, newTab = true, className = ""}: LinkPreviewProps) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition({x: event.clientX - rect.left, y: event.clientY - rect.top});
    };

    // Keyboard users get the card centered above the link.
    const handleFocus = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) setPosition({x: rect.width / 2, y: 0});
        setVisible(true);
    };

    return (
        <div
            ref={containerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={handleMouseMove}
        >
            <a
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className="font-medium dark:text-[#d2e5f5] underline"
                onFocus={handleFocus}
                onBlur={() => setVisible(false)}
            >
                {children}
            </a>

            <AnimatePresence>
                {visible && (
                    <motion.div
                        aria-hidden="true"
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{opacity: 1, scale: 1, x: position.x - 100, y: position.y - 40}}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                        className="absolute z-50 w-64 rounded-lg border dark:bg-slate-800 dark:border-slate-700 bg-white p-3 shadow-lg pointer-events-none"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-lg font-semibold dark:text-[#d2e5f5]">{preview.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-[#abc2d3] mt-1">{preview.description}</p>
                        {preview.image && <img src={preview.image} alt={preview.imageAlt ?? ""} className="mt-2 w-full rounded"/>}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
