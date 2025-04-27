import { motion } from "framer-motion";
import { useRef, useState } from "react";

const ThreedMagnetCardExample = () => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const magnetStrength = 35;
    const rotationFactor = 1;
    const scaleFactor = 1.05;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) / (width / 2);
        const y = (clientY - centerY) / (height / 2);

        setPosition({
            x: x * magnetStrength,
            y: y * magnetStrength,
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-96 cursor-pointer dark:bg-slate-900 dark:border-slate-700 rounded-md bg-white shadow-[2px_1px_15px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-200"
            animate={{
                x: position.x,
                y: position.y,
                rotateX: position.y * rotationFactor,
                rotateY: position.x * -rotationFactor,
                scale: isHovered ? scaleFactor : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
                mass: 1,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div className="flex flex-col justify-between h-full">
                {/* Image */}
                <div className="w-full overflow-hidden">
                    <img
                        src="https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67"
                        alt="Product Preview"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 space-y-2 flex-grow">
                    <h3 className="text-xl font-semibold dark:text-darkSubTextColor text-gray-800">ZenUI Library</h3>
                    <p className="text-sm dark:text-darkSubTextColor/80 text-gray-500">
                        A UI library for React with modern components and elegant animations.
                    </p>
                    <div className="mt-auto pt-4 flex gap-3">
                        <button className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition">
                            Explore
                        </button>
                        <button className="flex-1 py-2 dark:border-slate-700 dark:text-darkSubTextColor dark:hover:bg-slate-800 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                            Docs
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ThreedMagnetCardExample;
