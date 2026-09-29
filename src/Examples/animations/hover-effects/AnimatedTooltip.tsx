import {useRef, useState, type FocusEvent, type MouseEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface TooltipPerson {
    name: string;
    /** Second line in the tooltip, for example a job title. */
    title: string;
    /** Avatar image URL. */
    image: string;
}

export interface AnimatedTooltipProps {
    people: TooltipPerson[];
    className?: string;
}

/** A row of overlapping avatars. A tooltip with the name and title follows the pointer, and shows on keyboard focus too. */
export const AnimatedTooltip = ({people, className = ""}: AnimatedTooltipProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>, index: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setActiveIndex(index);
        setPosition({x: event.clientX - rect.left, y: event.clientY - rect.top});
    };

    // Keyboard users get the tooltip over the middle of the focused avatar.
    const handleFocus = (event: FocusEvent<HTMLDivElement>, index: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const avatar = event.currentTarget.getBoundingClientRect();
        setActiveIndex(index);
        setPosition({x: avatar.left + avatar.width / 2 - rect.left, y: avatar.top + avatar.height / 2 - rect.top});
    };

    const active = activeIndex !== null ? people[activeIndex] : undefined;

    return (
        <div ref={containerRef} className={`relative flex items-center px-6 ${className}`}>
            {people.map((person, index) => (
                <div
                    key={`${person.name}-${index}`}
                    tabIndex={0}
                    className="relative -ml-4 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    onMouseEnter={(event) => handleMouseMove(event, index)}
                    onMouseMove={(event) => handleMouseMove(event, index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={(event) => handleFocus(event, index)}
                    onBlur={() => setActiveIndex(null)}
                >
                    <img
                        src={person.image}
                        alt={person.name}
                        className="w-14 h-14 rounded-full object-cover border-2 dark:border-slate-700 border-white shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    />
                </div>
            ))}

            <AnimatePresence>
                {active && (
                    <motion.div
                        role="tooltip"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1, x: position.x - 70, y: position.y - 100}}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{type: "spring", stiffness: 400, damping: 20}}
                        className="absolute w-max dark:bg-slate-800 dark:border-slate-700 bg-white border text-center shadow-lg px-5 rounded-lg py-2.5 pointer-events-none z-0"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-[1rem] font-semibold dark:text-[#d2e5f5] text-gray-800">{active.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-[#abc2d3]">{active.title}</p>

                        {/* Arrow */}
                        <div className="absolute left-1/2 translate-x-[-50%] top-full z-[-1] w-4 h-4 bg-white rotate-45 border-gray-200 border-r dark:border-slate-700 dark:bg-slate-800 border-b -mt-2"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
