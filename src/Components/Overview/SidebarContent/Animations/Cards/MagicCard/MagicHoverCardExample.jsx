import {useState, useRef} from 'react';
import {motion} from 'framer-motion';

const MagicHoverCardExample = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    return (
        <div
            className="relative py-3 px-8 bg-gray-200 text-[rem] font-medium rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            Open Magic Hover Card

            {isHovered && (
                <motion.div
                    className="absolute top-0 left-0 z-10 w-72 bg-white rounded-lg shadow-xl overflow-hidden"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: mousePosition.x - 144,
                        y: mousePosition.y - 100,
                    }}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                >
                    <div className="p-4">
                        <div
                            className="w-full h-32 mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md"></div>
                        <h3 className="mb-1 text-lg font-bold">Magic Hover Card</h3>
                        <p className="text-sm text-gray-600">This card follows your mouse with smooth spring
                            animations.</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default MagicHoverCardExample;