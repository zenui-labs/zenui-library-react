import {useRef, useState} from "react";
import type {ComponentType} from "react";
import {motion, useMotionValue, useTransform} from "framer-motion";

export interface SwipeAction {
    /** Read by screen readers, for example "Download". */
    label: string;
    icon: ComponentType<{className?: string}>;
    onClick?: () => void;
}

export interface RotateSwipeCardProps {
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
    /** Largest rotation in degrees while dragging. */
    maxRotate?: number;
    className?: string;
}

type Side = "left" | "right" | null;

/** A list row that rotates and shrinks slightly as it slides aside to reveal an action on either side. */
export const RotateSwipeCard = ({
    name,
    initials,
    subtitle = "Swipe to see actions",
    meta,
    leftAction,
    rightAction,
    maxRotate = 5,
    className = "",
}: RotateSwipeCardProps) => {
    const [open, setOpen] = useState<Side>(null);
    const x = useMotionValue(0);
    // Set when the pointer drags, so the click that ends a drag does not close the card again.
    const dragged = useRef(false);

    const rotate = useTransform(x, [-100, 0, 100], [-maxRotate, 0, maxRotate]);
    const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

    const handleDragEnd = () => {
        const xValue = x.get();
        if (xValue < -30) setOpen("right");
        else if (xValue > 30) setOpen("left");
        else setOpen(null);
    };

    const handleAction = (action: SwipeAction) => {
        action.onClick?.();
        setOpen(null);
    };

    const LeftIcon = leftAction.icon;
    const RightIcon = rightAction.icon;

    return (
        <div className={`flex items-center justify-center w-full max-w-md mx-auto ${className}`}>
            <div className="relative w-full overflow-hidden dark:bg-slate-900 bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">
                <div className="absolute inset-y-0 left-0 flex items-center bg-blue-500 px-3">
                    <button
                        type="button"
                        aria-label={leftAction.label}
                        onClick={() => handleAction(leftAction)}
                        onFocus={() => setOpen("left")}
                        className="p-1 text-white"
                    >
                        <LeftIcon className="text-[1.5rem]"/>
                    </button>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center bg-purple-500 px-3.5">
                    <button
                        type="button"
                        aria-label={rightAction.label}
                        onClick={() => handleAction(rightAction)}
                        onFocus={() => setOpen("right")}
                        className="p-1 text-white"
                    >
                        <RightIcon className="text-[1.1rem]"/>
                    </button>
                </div>

                <motion.div
                    className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onPointerDown={() => {
                        dragged.current = false;
                    }}
                    onDragStart={() => {
                        dragged.current = true;
                    }}
                    onDragEnd={handleDragEnd}
                    animate={{x: open === "left" ? 60 : open === "right" ? -60 : 0}}
                    transition={{type: "spring", stiffness: 400, damping: 25}}
                    style={{x, rotate, scale}}
                    onClick={() => {
                        if (!dragged.current) setOpen(null);
                    }}
                >
                    <div className="flex items-center cursor-grab active:cursor-grabbing">
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
