import React, {useState} from "react";
import {motion, AnimatePresence, LayoutGroup} from "framer-motion";

const accordionData = [
    {
        id: 1,
        title: "Mountain Retreat",
        description:
            "Escape to the serene mountain landscapes with breathtaking views and adventure trails.",
        imageUrl:
            "https://img.freepik.com/free-photo/small-house-built-peaceful-green-hill-high-up-mountains_181624-8241.jpg",
    },
    {
        id: 2,
        title: "Beach Paradise",
        description:
            "Relax on pristine beaches with crystal clear waters and golden sands.",
        imageUrl: "https://img.freepik.com/free-photo/sea-beach_1203-3728.jpg",
    },
    {
        id: 3,
        title: "Forest Adventure",
        description:
            "Explore dense forests with diverse wildlife and lush greenery.",
        imageUrl:
            "https://img.freepik.com/free-photo/wide-shot-person-walking-around-narrow-pathway-middle-trees-plants-forest_181624-5497.jpg",
    },
    {
        id: 4,
        title: "Desert Expedition",
        description:
            "Experience the vast expanse of sand dunes and stunning sunsets.",
        imageUrl:
            "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg",
    },
];

const HorizontalExpanableExample = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="w-full h-[450px]">
            <LayoutGroup>
                <div className="flex w-full h-full gap-2">
                    {accordionData.map((item, index) => {
                        const isExpanded = index === expandedIndex;

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={false}
                                onMouseOver={() =>
                                    setExpandedIndex(index)
                                }
                                className="relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                                animate={{
                                    flex: isExpanded ? 3 : 1,
                                }}
                                transition={{duration: 1.5, ease: [0.25, 1, 0.5, 1]}}
                            >
                                <motion.img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    animate={{
                                        scale: isExpanded ? 1 : 1.05,
                                        filter: isExpanded
                                            ? "brightness(0.9)"
                                            : "brightness(0.6)",
                                    }}
                                    transition={{duration: 0.5}}
                                />

                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-5 text-white z-20"
                                    layout="position"
                                    initial={false}
                                >
                                    <motion.h3
                                        layout="position"
                                        className="font-bold text-lg mb-1"
                                        animate={{fontSize: isExpanded ? "1.5rem" : "1.2rem"}}
                                        transition={{duration: 0.3}}
                                    >
                                        {item.title}
                                    </motion.h3>

                                    {
                                        isExpanded && (
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-25% to-50% from-black/30 w-full to-transparent z-[-1]"/>
                                        )
                                    }

                                    <AnimatePresence mode='wait' initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                key="details"
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={{
                                                    visible: {
                                                        transition: {
                                                            staggerChildren: 0.1,
                                                            delayChildren: 0.1,
                                                        },
                                                    },
                                                    hidden: {},
                                                }}
                                                className="relative"
                                            >
                                                <motion.p
                                                    className="text-sm mb-2"
                                                    variants={{
                                                        hidden: {opacity: 0, y: 50},
                                                        visible: {
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {type: 'spring', stiffness: 150, damping: 12}
                                                        },
                                                    }}
                                                    transition={{duration: 0.3}}
                                                >
                                                    {item.description}
                                                </motion.p>

                                                <motion.button
                                                    className="px-4 py-2 mt-3 rounded bg-white text-black text-sm font-semibold"
                                                    variants={{
                                                        hidden: {opacity: 0, y: 50},
                                                        visible: {
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {type: 'spring', stiffness: 150, damping: 12},
                                                        },
                                                    }}
                                                    transition={{duration: 0.3}}
                                                    whileHover={{scale: 1.05}}
                                                    whileTap={{scale: 0.95}}
                                                >
                                                    View Details
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        </div>
    );
};

export default HorizontalExpanableExample;
