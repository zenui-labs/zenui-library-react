import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const accordionData = [
    {
        id: 1,
        title: "Mountain Retreat",
        description: "Escape to the serene mountain landscapes with breathtaking views and adventure trails.",
        longDescription: "Discover hidden valleys, pristine lakes, and breathtaking peaks. ",
        imageUrl: "https://img.freepik.com/free-photo/small-house-built-peaceful-green-hill-high-up-mountains_181624-8241.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-blue-500",
        accentColor: "#3B82F6"
    },
    {
        id: 2,
        title: "Beach Paradise",
        description: "Relax on pristine beaches with crystal clear waters and golden sands.",
        longDescription: "White sand beaches stretch as far as the eye can see, with turquoise waters and spectacular sunsets.",
        imageUrl: "https://img.freepik.com/free-photo/sea-beach_1203-3728.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-yellow-500",
        accentColor: "#EAB308"
    },
    {
        id: 3,
        title: "Forest Adventure",
        description: "Explore dense forests with diverse wildlife and lush greenery.",
        longDescription: "Ancient trees form a canopy overhead as you walk through dappled sunlight. ",
        imageUrl: "https://img.freepik.com/free-photo/wide-shot-person-walking-around-narrow-pathway-middle-trees-plants-forest_181624-5497.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-green-500",
        accentColor: "#22C55E"
    },
    {
        id: 4,
        title: "Desert Expedition",
        description: "Experience the vast expanse of sand dunes and stunning sunsets.",
        longDescription: "Marvel at the ever-changing landscape of golden dunes sculpted by the wind.",
        imageUrl: "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-orange-500",
        accentColor: "#F97316"
    }
];

const CircleExpenableExample = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="relative flex gap-4 py-4">
            {accordionData.map((item, index) => {
                const isExpanded = index === expandedIndex;

                return (
                    <motion.div
                        key={item.id}
                        className="relative cursor-pointer overflow-hidden rounded-full border-4"
                        style={{borderColor: isExpanded ? '#fff' : 'rgba(209, 213, 219, 0.5)'}}
                        animate={{
                            width: isExpanded ? "300px" : "80px",
                            height: isExpanded ? "300px" : "80px",
                            zIndex: isExpanded ? 10 : 0,
                            boxShadow: isExpanded ? "0 10px 25px rgba(0,0,0,0.2)" : "0 4px 6px rgba(0,0,0,0.1)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 15,
                            mass: 1
                        }}
                        onClick={() => setExpandedIndex(index)}
                        whileHover={{
                            scale: isExpanded ? 1 : 1.05,
                            borderColor: '#fff'
                        }}
                        initial={{
                            width: index === 0 ? "300px" : "80px",
                            height: index === 0 ? "300px" : "80px"
                        }}
                    >
                        <motion.img
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            animate={{
                                scale: isExpanded ? 1 : 1.2,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: isExpanded
                                    ? `radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)`
                                    : `radial-gradient(circle, transparent 10%, ${item.accentColor}99 100%)`
                            }}
                            transition={{duration: 0.6}}
                        />

                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3, delay: 0.2}}
                                    className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center"
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: {opacity: 0},
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    staggerChildren: 0.12
                                                }
                                            }
                                        }}
                                    >
                                        <motion.h3
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1}
                                            }}
                                            className="text-2xl font-bold mb-3"
                                        >
                                            {item.title}
                                        </motion.h3>

                                        <motion.p
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1}
                                            }}
                                            className="text-sm mb-4"
                                        >
                                            {item.longDescription}
                                        </motion.p>

                                        <motion.button
                                            variants={{
                                                hidden: {y: 20, opacity: 0},
                                                visible: {y: 0, opacity: 1}
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                backgroundColor: "rgba(255,255,255,0.95)"
                                            }}
                                            whileTap={{scale: 0.95}}
                                            className="px-4 py-2 bg-white text-black rounded-full font-medium mt-2"
                                        >
                                            View Details
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <motion.span
                                        className="text-white font-bold"
                                        animate={{scale: [0.9, 1, 0.9], opacity: [0.7, 1, 0.7]}}
                                        transition={{repeat: Infinity, duration: 2}}
                                    >
                                        {index + 1}
                                    </motion.span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default CircleExpenableExample;