// AnimatedTooltipExample.tsx
import React, {useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const users = [
    {
        name: 'Alice Johnson',
        profession: 'UI/UX Designer',
        image: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740',
    },
    {
        name: 'David Smith',
        profession: 'Frontend Developer',
        image: 'https://img.freepik.com/premium-photo/casual-young-man-shirt_146377-2992.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740',
    },
    {
        name: 'Maria Lopez',
        profession: 'Product Manager',
        image: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740',
    },
    {
        name: 'Emtiaz Lio',
        profession: 'Backend Developer',
        image: 'https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740',
    },
];

const AnimatedTooltipExample = () => {
    const containerRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (e, index) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setHoveredIndex(index);
        setTooltipPosition({x, y});
    };

    return (
        <div
            ref={containerRef}
            className="relative flex items-center gap-[-20px] px-6"
        >
            {users.map((user, index) => (
                <div
                    key={index}
                    className={`relative z-[${index}0] -ml-4`}
                    onMouseEnter={(e) => handleMouseMove(e, index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 dark:border-slate-700 border-white shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    />
                </div>
            ))}

            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: tooltipPosition.x - 70,
                            y: tooltipPosition.y - 100,
                        }}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                        }}
                        className="absolute w-max bg-white border dark:border-slate-700 dark:bg-slate-900 text-center shadow-lg px-5 rounded-lg py-2.5 pointer-events-none z-0"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-[1rem] font-semibold text-gray-800 dark:text-darkTextColor">
                            {users[hoveredIndex].name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-darkSubTextColor/80">{users[hoveredIndex].profession}</p>

                        {/* Tooltip Tail */}
                        <div
                            className="absolute left-1/2 translate-x-[-50%] top-full z-[-1] w-4 h-4 bg-white rotate-45 border-gray-200 border-r border-b dark:bg-slate-900 dark:border-slate-700 -mt-2"></div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedTooltipExample;
