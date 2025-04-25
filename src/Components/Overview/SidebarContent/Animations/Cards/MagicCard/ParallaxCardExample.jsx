import { useRef, useState } from "react";

// framer motion
import { motion } from "framer-motion";

// react icons
import {FaRegStar, FaStar} from "react-icons/fa";

const ParallaxCardExample = () => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [selectedSize, setSelectedSize] = useState(7);
    const [selectedColor, setSelectedColor] = useState("bg-red-600");

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    const getOffset = (depth = 1) => {
        const offset = 23 * depth;
        return {
            x: (mousePos.x - 0.6) * offset,
            y: (mousePos.y - 0.6) * offset,
        };
    };

    const parallax = isHovered ? getOffset(1) : { x: 0, y: 0 };
    const imageZoom = isHovered ? 1.2 : 1;

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="w-80 rounded-[12px] bg-white dark:bg-slate-900 p-5 relative shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)]"
        >
            <motion.div
                animate={{
                    x: parallax.x,
                    y: parallax.y,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                className="relative z-10"
            >
                <motion.img
                    src="https://i.ibb.co/1z7dSw8/shoe1.png"
                    alt="Brogue"
                    className="w-48 absolute top-[5px] -right-4 -translate-x-1/2 z-10 pointer-events-none"
                    animate={{
                        scale: imageZoom,
                        x: parallax.x,
                        y: parallax.y,
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                />

                <div className="relative z-20 pt-32">

                    <h2 className="text-xl font-bold dark:text-darkTextColor text-black mb-1">Brogue</h2>

                    <div className='flex items-center gap-1'>
                        <FaStar className='text-yellow-400'/>
                        <FaStar className='text-yellow-400'/>
                        <FaRegStar className='text-gray-500'/>
                        <FaRegStar className='text-gray-500'/>
                        <FaRegStar className='text-gray-500'/>
                    </div>

                    <p className="text-xs font-semibold dark:text-darkSubTextColor text-gray-500 mt-4 mb-1.5">SIZES</p>
                    <div className="flex items-center gap-2">
                        {[7, 8, 9, 10, 11].map((size) => (
                            <div
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm font-semibold ${
                                    selectedSize === size
                                        ? "bg-[#0FABCA] text-white"
                                        : "bg-gray-100 dark:bg-slate-700 dark:text-slate-400 text-gray-800"
                                }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 dark:text-darkSubTextColor mt-4 mb-1.5">COLORS</p>
                    <div className="flex items-center gap-2 mb-4">
                        {["bg-red-600", "bg-yellow-400", "bg-blue-500", "bg-cyan-400"].map(
                            (color, i) => (
                                <div
                                    key={i}
                                    onClick={()=> setSelectedColor(color)}
                                    className={`w-5 h-5 outline cursor-pointer outline-offset-1 rounded-full ${selectedColor === color ? 'outline-[#0FABCA]' : 'outline-transparent'} border-2 border-white dark:border-slate-900 ${color}`}
                                />
                            )
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-1'>
                            <p className="text-[#0FABCA] font-bold text-lg">$127</p>
                            <p className="text-[1rem] dark:text-darkTextColor/80 text-gray-500">USD</p>
                        </div>
                        <button className="bg-[#0FABCA] text-white px-4 py-2 rounded-[8px] text-sm hover:bg-[#0FABCA]/90 transition">
                            More Details
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ParallaxCardExample;
