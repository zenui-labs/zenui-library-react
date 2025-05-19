import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence, useAnimation, useMotionValue, useTransform} from 'framer-motion';

// Enhanced sample data for the accordions with more detailed content
const accordionData = [
    {
        id: 1,
        title: "Mountain Retreat",
        description: "Escape to the serene mountain landscapes with breathtaking views and adventure trails.",
        longDescription: "Discover hidden valleys, pristine lakes, and breathtaking peaks. Our mountain retreats offer the perfect balance of adventure and relaxation in nature's embrace.",
        imageUrl: "https://img.freepik.com/free-photo/small-house-built-peaceful-green-hill-high-up-mountains_181624-8241.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-blue-500",
        accentColor: "#3B82F6"
    },
    {
        id: 2,
        title: "Beach Paradise",
        description: "Relax on pristine beaches with crystal clear waters and golden sands.",
        longDescription: "White sand beaches stretch as far as the eye can see, with turquoise waters and spectacular sunsets. An ideal destination for both relaxation and water sports.",
        imageUrl: "https://img.freepik.com/free-photo/sea-beach_1203-3728.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-yellow-500",
        accentColor: "#EAB308"
    },
    {
        id: 3,
        title: "Forest Adventure",
        description: "Explore dense forests with diverse wildlife and lush greenery.",
        longDescription: "Ancient trees form a canopy overhead as you walk through dappled sunlight. The forest is alive with birdsong and the rustle of wildlife in this untouched natural haven.",
        imageUrl: "https://img.freepik.com/free-photo/wide-shot-person-walking-around-narrow-pathway-middle-trees-plants-forest_181624-5497.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-green-500",
        accentColor: "#22C55E"
    },
    {
        id: 4,
        title: "Desert Expedition",
        description: "Experience the vast expanse of sand dunes and stunning sunsets.",
        longDescription: "Marvel at the ever-changing landscape of golden dunes sculpted by the wind. By night, the desert transforms into one of the world's best locations for stargazing.",
        imageUrl: "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-orange-500",
        accentColor: "#F97316"
    }
];

// Enhanced vertical accordion with staggered animations
const VerticalExpanableExample = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        controls.start("visible");
    }, [expandedIndex, controls]);

    return (
        <div className="flex flex-col w-full rounded-xl overflow-hidden">
            {accordionData.map((item, index) => {
                const isExpanded = index === expandedIndex;

                return (
                    <motion.div
                        key={item.id}
                        className="relative cursor-pointer overflow-hidden"
                        animate={{
                            height: isExpanded ? "300px" : "80px"
                        }}
                        initial={{height: index === 0 ? "300px" : "80px"}}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 70,
                            damping: 15
                        }}
                        onClick={() => setExpandedIndex(index)}
                        whileHover={{
                            height: isExpanded ? "300px" : "100px",
                        }}
                        layout
                    >
                        <motion.img
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            animate={{
                                scale: isExpanded ? 1 : 1.1,
                                opacity: isExpanded ? 1 : 0.8
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                            layout
                        />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: isExpanded
                                    ? `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`
                                    : `linear-gradient(to top, ${item.accentColor}CC, ${item.accentColor}99)`
                            }}
                            transition={{duration: 0.6}}
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <motion.div
                                initial="hidden"
                                animate={controls}
                                variants={{
                                    visible: {transition: {staggerChildren: 0.1}},
                                    hidden: {transition: {staggerChildren: 0.05}}
                                }}
                            >
                                <motion.h3
                                    className="text-xl font-bold"
                                    variants={{
                                        visible: {y: 0, opacity: 1},
                                        hidden: {y: -20, opacity: 0}
                                    }}
                                    transition={{duration: 0.4}}
                                    animate={{
                                        fontSize: isExpanded ? "1.875rem" : "1.25rem",
                                        marginBottom: isExpanded ? "0.75rem" : "0"
                                    }}
                                >
                                    {item.title}
                                </motion.h3>

                                <AnimatePresence mode="wait">
                                    {isExpanded && (
                                        <motion.div
                                            variants={{
                                                visible: {
                                                    height: "auto",
                                                    opacity: 1,
                                                    transition: {
                                                        when: "beforeChildren",
                                                        staggerChildren: 0.1,
                                                        delayChildren: 0.2
                                                    }
                                                },
                                                hidden: {
                                                    height: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        when: "afterChildren",
                                                        staggerChildren: 0.05
                                                    }
                                                }
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="overflow-hidden"
                                        >
                                            <motion.p
                                                variants={{
                                                    visible: {y: 0, opacity: 1},
                                                    hidden: {y: 20, opacity: 0}
                                                }}
                                                className="text-base mb-4"
                                            >
                                                {item.longDescription}
                                            </motion.p>

                                            <motion.div
                                                variants={{
                                                    visible: {y: 0, opacity: 1},
                                                    hidden: {y: 20, opacity: 0}
                                                }}
                                                className="flex space-x-2"
                                            >
                                                <motion.button
                                                    className="px-4 py-2 bg-white text-black rounded-md font-medium"
                                                >
                                                    Learn More
                                                </motion.button>

                                                <motion.button
                                                    className="px-4 py-2 border border-white text-white rounded-md font-medium"
                                                    whileHover={{
                                                        backgroundColor: "rgba(255,255,255,0.1)"
                                                    }}
                                                >
                                                    Book Now
                                                </motion.button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default VerticalExpanableExample;