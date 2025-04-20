import {useRef, useState} from "react";
import {motion} from "framer-motion";

const ParallaxCardExample = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            });
        }
    };

    const getOffset = (depth = 1) => {
        const offsetFactor = 20 * depth;
        return {
            x: (mousePosition.x - 0.5) * offsetFactor,
            y: (mousePosition.y - 0.5) * offsetFactor
        };
    };

    const backgroundOffset = getOffset(0.2);
    const middleOffset = getOffset(0.6);
    const foregroundOffset = getOffset(1);

    return (
        <div
            className="relative w-64 h-64 overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gradient-to-r from-amber-500 to-pink-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            <motion.div
                className="relative w-full h-full overflow-hidden"
                animate={{
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
            >
                <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0FABCA]/30 to-[#9A04F5]/50"
                    animate={{
                        x: isHovered ? backgroundOffset.x : 0,
                        y: isHovered ? backgroundOffset.y : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }}
                >
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-orange-200 opacity-50" />
                    <div className="absolute bottom-8 right-12 w-12 h-12 rounded-full bg-pink-200 opacity-60" />
                    <div className="absolute top-20 right-6 w-8 h-8 rounded-full bg-amber-200 opacity-40" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        x: isHovered ? middleOffset.x : 0,
                        y: isHovered ? middleOffset.y : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 20
                    }}
                >
                    <div className="w-32 h-32 backdrop-blur-lg bg-white/20 rounded-lg shadow-lg flex items-center justify-center">
                        <img alt='zenui logo' src='/logo.png'/>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-x-0 bottom-0 p-4"
                    animate={{
                        x: isHovered ? foregroundOffset.x : 0,
                        y: isHovered ? foregroundOffset.y : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                >
                    <h3 className="text-lg font-bold text-white">Parallax Card</h3>
                    <p className="text-sm text-white text-opacity-80">Elements move at different speeds for a depth effect.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ParallaxCardExample