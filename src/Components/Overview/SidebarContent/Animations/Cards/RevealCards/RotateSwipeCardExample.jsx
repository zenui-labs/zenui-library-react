import React, {useState} from "react";

// framer motion
import {useMotionValue, useTransform, motion} from "framer-motion";

// react icons
import {FaRegBookmark} from "react-icons/fa";
import {MdOutlineFileDownload} from "react-icons/md";

const RotateSwipeCardExample = () => {
    const [isOpen, setIsOpen] = useState(null);
    const x = useMotionValue(0);

    const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5]);

    const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

    const handleDragEnd = () => {
        const xValue = x.get();
        if (xValue < -30) setIsOpen('right');
        else if (xValue > 30) setIsOpen('left');
        else setIsOpen(null);
    };

    return (
        <div className='flex items-center justify-center w-full max-w-md mx-auto'>
            <div className="relative w-full overflow-hidden dark:bg-slate-900 bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">
                {/* Left actions */}
                <div className="absolute inset-y-0 left-0 flex items-center bg-blue-500 px-3">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <MdOutlineFileDownload className='text-[1.5rem]'/>
                    </button>
                </div>

                {/* Right actions */}
                <div className="absolute inset-y-0 right-0 flex items-center bg-purple-500 px-3.5">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <FaRegBookmark className='text-[1.1rem]'/>
                    </button>
                </div>

                {/* Card content */}
                <motion.div
                    className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: isOpen === 'left' ? 60 : isOpen === 'right' ? -60 : 0,
                    }}
                    transition={{type: "spring", stiffness: 400, damping: 25}}
                    style={{x, rotate, scale}}
                    onClick={() => setIsOpen(null)}
                >
                    <div
                        className="flex items-center cursor-grab active:cursor-grabbing"
                    >
                        <div
                            className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-darkSubTextColor rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                            JD
                        </div>
                        <div className="ml-3 flex-grow">
                            <h3 className="text-base dark:text-darkTextColor font-medium text-gray-800">John Doe</h3>
                            <p className="text-gray-600 text-xs dark:text-darkSubTextColor">Swipe to see actions</p>
                        </div>
                        <div className="text-gray-500 dark:text-darkSubTextColor text-xs">3:45 PM</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RotateSwipeCardExample