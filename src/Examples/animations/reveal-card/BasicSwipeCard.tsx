import {useRef, useState} from "react";
import type {ComponentType} from "react";
import {motion, useMotionValue, useTransform} from "framer-motion";

export interface SwipeAction {
    /** Read by screen readers, for example "Delete". */
    label: string;
    icon: ComponentType<{className?: string}>;
    onClick?: () => void;
}

export interface BasicSwipeCardProps {
    name: string;
    /** Shown in the round avatar, for example "JD". */
    initials: string;
    /** Line under the name. */
    subtitle?: string;
    /** Small text on the right, such as a time. */
    meta?: string;
    /** Revealed on the left when the card is swiped right. */
    leftAction: SwipeAction;
    /** Revealed on the right when the card is swiped left. */
    rightAction: SwipeAction;
    className?: string;
}

type Side = "left" | "right" | null;

/** A list row that slides aside to reveal an action on either side. The actions fade in as the row moves. */
export const BasicSwipeCard = ({
    name,
    initials,
    subtitle = "Swipe to see actions",
    meta,
    leftAction,
    rightAction,
    className = "",
}: BasicSwipeCardProps) => {
    const [open, setOpen] = useState<Side>(null);
    const x = useMotionValue(0);
    // Set when the pointer drags, so the click that ends a drag does not close the card again.
    const dragged = useRef(false);

    const leftActionsOpacity = useTransform(x, [-80, -40, 0], [1, 0.5, 0]);
    const rightActionsOpacity = useTransform(x, [0, 40, 80], [0, 0.5, 1]);

    const handleDragEnd = () => {
        const xValue = x.get();
        if (xValue < -40) setOpen("right");
        else if (xValue > 40) setOpen("left");
        else setOpen(null);
    };

    const resetCard = () => {
        setOpen(null);
        x.set(0);
    };

    const handleAction = (action: SwipeAction) => {
        action.onClick?.();
        resetCard();
    };

    const LeftIcon = leftAction.icon;
    const RightIcon = rightAction.icon;

    return (
        <div className={`flex items-center justify-center w-full max-w-md mx-auto ${className}`}>
            <div className="relative w-full overflow-hidden bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">
                <motion.div
                    className="absolute top-0 left-0 h-full flex items-center justify-start pl-[19px] bg-green-600 w-1/3"
                    style={{opacity: leftActionsOpacity}}
                >
                    <button
                        type="button"
                        aria-label={leftAction.label}
                        onClick={() => handleAction(leftAction)}
                        onFocus={() => setOpen("left")}
                        className="p-2 mr-1 bg-green-700/70 text-white rounded-full"
                    >
                        <LeftIcon className="text-[1.5rem]"/>
                    </button>
                </motion.div>

                <motion.div
                    className="absolute top-0 right-0 h-full flex items-center justify-end pr-[19px] bg-red-500 w-1/3"
                    style={{opacity: rightActionsOpacity}}
                >
                    <button
                        type="button"
                        aria-label={rightAction.label}
                        onClick={() => handleAction(rightAction)}
                        onFocus={() => setOpen("right")}
                        className="p-2 bg-red-600 text-white rounded-full"
                    >
                        <RightIcon className="text-[1.5rem]"/>
                    </button>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    dragElastic={0.2}
                    onPointerDown={() => {
                        dragged.current = false;
                    }}
                    onDragStart={() => {
                        dragged.current = true;
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{x: open === "left" ? 80 : open === "right" ? -80 : 0}}
                    transition={{type: "spring", stiffness: 250, damping: 25}}
                    style={{x}}
                >
                    <div
                        className="flex items-center cursor-grab active:cursor-grabbing"
                        onClick={() => {
                            if (!dragged.current) resetCard();
                        }}
                    >
                        <div className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-[#abc2d3] rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                            {initials}
                        </div>
                        <div className="ml-3 flex-grow">
                            <h3 className="text-base dark:text-[#d2e5f5] font-medium text-gray-800">{name}</h3>
                            {subtitle && <p className="text-gray-600 text-xs dark:text-[#abc2d3]">{subtitle}</p>}
                        </div>
                        {meta && <div className="text-gray-500 dark:text-[#abc2d3] text-xs">{meta}</div>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
