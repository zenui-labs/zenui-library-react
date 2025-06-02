import React, { useState, useRef } from 'react';

// framer motion
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// react icons
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineDone} from "react-icons/md";

export default function BasicSwipeCardExample() {
    const [isLeftRevealed, setIsLeftRevealed] = useState(false);
    const [isRightRevealed, setIsRightRevealed] = useState(false);
    const x = useMotionValue(0);
    const isDragging = useRef(false);

    const leftActionsOpacity = useTransform(x, [-80, -40, 0], [1, 0.5, 0]);
    const rightActionsOpacity = useTransform(x, [0, 40, 80], [0, 0.5, 1]);

    const handleDragEnd = () => {
        const xValue = x.get();
        isDragging.current = false;

        if (xValue < -40) {
            setIsRightRevealed(true);
            setIsLeftRevealed(false);
        } else if (xValue > 40) {
            setIsLeftRevealed(true);
            setIsRightRevealed(false);
        } else {
            setIsLeftRevealed(false);
            setIsRightRevealed(false);
        }
    };

    const resetCard = () => {
        setIsLeftRevealed(false);
        setIsRightRevealed(false);
        x.set(0);
    };

    const handleAction = (action) => {
        console.log(`Executing action: ${action}`);
        resetCard();
    };

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-full overflow-hidden bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">

                {/* Left Actions */}
                <div
                    className="absolute top-0 left-0 h-full flex items-center justify-start pl-[19px] bg-green-600 w-1/3"
                    style={{ opacity: leftActionsOpacity }}
                >
                    <button
                        onClick={() => handleAction('Mark as Read')}
                        className="p-2 mr-1 bg-green-700/70 text-white rounded-full"
                    >
                        <MdOutlineDone className='text-[1.5rem]'/>
                    </button>
                </div>

                {/* Right Actions */}
                <div
                    className="absolute top-0 right-0 h-full flex items-center justify-end pr-[19px] bg-red-500 w-1/3"
                    style={{opacity: rightActionsOpacity}}
                >
                <button
                        onClick={() => handleAction('Delete')}
                        className="p-2 bg-red-600 text-white rounded-full"
                    >
                        <AiOutlineDelete className='text-[1.5rem]'/>
                    </button>
                </div>

                {/* Main Card */}
                <AnimatePresence initial={false}>
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => (isDragging.current = true)}
                        onDragEnd={handleDragEnd}
                        initial={{ x: 0 }}
                        animate={{
                            x: isLeftRevealed ? 80 : isRightRevealed ? -80 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 250,
                            damping: 25,
                        }}
                        style={{ x }}
                    >
                        <div
                            className="flex items-center cursor-grab active:cursor-grabbing"
                            onClick={() => {
                                if (!isDragging.current) resetCard();
                            }}
                        >
                            <div
                                className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-darkSubTextColor rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                                JD
                            </div>
                            <div className="ml-3 flex-grow">
                                <h3 className="text-base dark:text-darkTextColor font-medium text-gray-800">John
                                    Doe</h3>
                                <p className="text-gray-600 text-xs dark:text-darkSubTextColor">Swipe to see actions</p>
                            </div>
                            <div className="text-gray-500 dark:text-darkSubTextColor text-xs">3:45 PM</div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
