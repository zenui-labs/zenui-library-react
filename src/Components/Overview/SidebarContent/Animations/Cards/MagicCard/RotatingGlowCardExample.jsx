import {useRef, useState} from "react";
import {motion} from "framer-motion";
import useZenuiStore from "../../../../../../Store/Index.js";

const RotatingGlowCardExample = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const cardRef = useRef(null);

    const {theme} = useZenuiStore()

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            });
        }
    };

    const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;
    const rotateX = isHovered ? (0.5 - mousePosition.y) * 20 : 0;

    const spotlightX = `${mousePosition.x * 100}%`;
    const spotlightY = `${mousePosition.y * 100}%`;

    return (
        <div
            className="relative w-64 h-64 perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            <motion.div
                className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl cursor-pointer"
                animate={{
                    rotateY: rotateY,
                    rotateX: rotateX,
                    boxShadow: isHovered
                        ? theme === 'dark' ? "0px 10px 25px rgba(0, 0, 0, 0.2), 0 0 30px rgba(100, 100, 255, 0.4)" : "0px 10px 25px rgb(152, 0, 255, 0.15), 0 0 30px rgb(152, 0, 255, 0.15)"
                        : "0px 5px 15px rgba(0, 0, 0, 0.1)"
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
            >
                <div className="flex flex-col items-center justify-center h-full p-4 z-10">
                    <h3 className="mb-2 text-lg font-bold text-white">Rotating Glow Card</h3>
                    <p className="text-sm text-center text-gray-300">Move your mouse over the card to see the 3D effect.</p>
                </div>

                {isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        style={{
                            background: `radial-gradient(circle at ${spotlightX} ${spotlightY}, ${theme ==='dark' ? 'rgba(255, 255, 255, 1)' : 'rgb(152, 0, 255, 3)'} 0%, transparent 70%)`
                        }}
                    />
                )}

                {isHovered && (
                    <motion.div
                        className="absolute inset-0 border-2 border-[rgb(152,0,255,0.6)] dark:border-blue-400 rounded-lg pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            boxShadow: '0 0 15px rgba(66, 153, 225, 0.5)'
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}

export default RotatingGlowCardExample;