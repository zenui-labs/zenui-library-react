import {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const MagicHoverCardExample = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            className="relative py-4 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            Open Magic Hover Card

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute top-0 left-0 z-50 w-80 rounded-xl backdrop-blur-lg dark:bg-slate-900/40 bg-white/60 border border-white/20 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: mousePosition.x - 160,
                            y: mousePosition.y - 100,
                        }}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <div className="p-5">
                            <img alt='zenui banner' src='https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67' className='object-cover rounded-xl'/>
                            <h3 className="mb-1 text-lg font-bold dark:text-darkSubTextColor text-gray-700 mt-4">ZenUI Library</h3>
                            <p className="text-sm text-gray-500 dark:text-darkSubTextColor font-[400]">
                                Elevate your project with free UI components, customizable icons, and a color palette. No dependencies required 🤫
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MagicHoverCardExample;
