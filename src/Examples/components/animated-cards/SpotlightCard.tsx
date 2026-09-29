import {useRef, useState, type MouseEvent} from "react";

export interface SpotlightCardProps {
    title: string;
    description: string;
    /** Optional illustration floated to the bottom right. */
    imageSrc?: string;
    imageAlt?: string;
    /** Color of the title and of the glow that follows the pointer. */
    accentColor?: string;
    /** Radius of the glow in px. */
    glowRadius?: number;
    className?: string;
}

/** A bordered card with a soft glow that follows the pointer while it is over the card. */
export const SpotlightCard = ({
    title,
    description,
    imageSrc,
    imageAlt = "",
    accentColor = "#DB06F9",
    glowRadius = 50,
    className = "",
}: SpotlightCardProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({x: event.clientX - rect.left, y: event.clientY - rect.top});
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`w-full border dark:border-slate-700 relative overflow-hidden border-gray-200 rounded-lg p-[25px] cursor-pointer ${className}`}
        >
            <h2 className="text-[1.5rem] font-bold" style={{color: accentColor}}>
                {title}
            </h2>
            <p className="text-gray-600 dark:text-[#abc2d3] text-[1rem] mt-2">{description}</p>

            {imageSrc && <img src={imageSrc} alt={imageAlt} className="w-[140px] mt-3 float-right"/>}

            {isHovering && (
                <div
                    className="absolute inset-0 pointer-events-none blur-[50px]"
                    style={{
                        background: `radial-gradient(circle ${glowRadius}px at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}, transparent)`,
                    }}
                    aria-hidden
                />
            )}
        </div>
    );
};
