import React, {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const LinkPreviewExample = () => {
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPosition({x, y});
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <a
                href="https://zenui.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium dark:text-darkTextColor underline"
            >
                Hover to see ZenUI link preview
            </a>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: position.x - 100,
                            y: position.y - 40,
                        }}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{type: 'spring', stiffness: 300, damping: 20}}
                        className="absolute z-50 w-64 rounded-lg border dark:bg-slate-800 dark:border-slate-700 bg-white p-3 shadow-lg pointer-events-none"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-lg font-semibold dark:text-[#d2e5f5]">ZenUI</h4>
                        <p className="text-xs text-gray-500 dark:text-[#abc2d3] mt-1">
                            A beautiful and modern React UI component library.
                        </p>
                        <img
                            src="https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67"
                            alt="ZenUI Preview"
                            className="mt-2 w-full rounded"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LinkPreviewExample;
