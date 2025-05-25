import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import VerticalExpanableExample from "@animations/Layouts/AnimatedAccordion/VerticalExpanableExample.jsx";
import CircleExpenableExample from "@animations/Layouts/AnimatedAccordion/CircleExpenableExample.jsx";
import HorizontalExpanableExample from "@animations/Layouts/AnimatedAccordion/HorizontalExpanableExample.jsx";
import TextAccordionWithProgressbarExample
    from "@animations/Layouts/AnimatedAccordion/TextAccordionWithProgressbarExample.jsx";

const Index = () => {

    const [clickableVerticalAccordionPreview, setClickableVerticalAccordionPreview] = useState(true);
    const [clickableVerticalAccordionCode, setClickableVerticalAccordionCode] = useState(false);

    const [circleAccordionPreview, setCircleAccordionPreview] = useState(true);
    const [circleAccordionCode, setCircleAccordionCode] = useState(false);

    const [hoveredHorizontalAccordionPreview, setHoveredHorizontalAccordionPreview] = useState(true);
    const [hoveredHorizontalAccordionCode, setHoveredHorizontalAccordionCode] = useState(false);

    const [staggeredTextWithProgressBarPreview, setStaggeredTextWithProgressBarPreview] = useState(true);
    const [staggeredTextWithProgressBarCode, setStaggeredTextWithProgressBarCode] = useState(false);

    return (
        <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"clickable vertical accordion"} id={"clickable-vertical-accordion"}/>

                <BlockDescription
                    text='A clickable vertical accordion displays stacked sections that expand or collapse vertically when clicked, revealing or hiding content interactively.'/>

                <BlockToggleTab preview={clickableVerticalAccordionPreview}
                                setPreview={setClickableVerticalAccordionPreview}
                                code={clickableVerticalAccordionCode}
                                setCode={setClickableVerticalAccordionCode}/>

                <BlockWrapper>
                    {clickableVerticalAccordionPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <VerticalExpanableExample/>
                        </div>
                    )}

                    {clickableVerticalAccordionCode && <BlocksShowCode code='
import React, {useState, useEffect} from "react";
import {motion, AnimatePresence, useAnimation} from "framer-motion";

// data
const accordionData = [
    {
        id: 1,
        title: "Mountain Retreat",
        description: "Escape to the serene mountain landscapes with breathtaking views and adventure trails.",
        longDescription: "Discover hidden valleys, pristine lakes, and breathtaking peaks. Our mountain retreats offer the perfect balance of adventure and relaxation in nature embrace.",
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
        longDescription: "Marvel at the ever-changing landscape of golden dunes sculpted by the wind. By night, the desert transforms into one of the world best locations for stargazing.",
        imageUrl: "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
        color: "bg-orange-500",
        accentColor: "#F97316"
    }
];

const VerticalExpanable = () => {
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

export default VerticalExpanable;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"circle accordion"} id={"circle-accordion"}/>
                </div>

                <BlockDescription
                    text='A circle accordion expands and collapses content panels arranged in a circular layout, creating an interactive radial menu effect.'/>

                <BlockToggleTab preview={circleAccordionPreview} setPreview={setCircleAccordionPreview}
                                code={circleAccordionCode}
                                setCode={setCircleAccordionCode}/>

                <BlockWrapper>
                    {circleAccordionPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CircleExpenableExample/>
                        </div>
                    )}

                    {circleAccordionCode && <BlocksShowCode code='
import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

// data
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

const CircleExpenable = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="relative flex flex-wrap gap-4 py-4">
            {accordionData.map((item, index) => {
                const isExpanded = index === expandedIndex;

                return (
                    <motion.div
                        key={item.id}
                        className="relative cursor-pointer overflow-hidden rounded-full border-4"
                        style={{borderColor: isExpanded ? "#fff" : "rgba(209, 213, 219, 0.5)"}}
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
                            borderColor: "#fff"
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

export default CircleExpenable;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"hovered horizontal accordion"} id={"hovered-horizontal-accordion"}/>
                </div>

                <BlockDescription
                    text='A hovered horizontal accordion expands content panels side-by-side as you hover over them, smoothly revealing details without clicks.'/>

                <BlockToggleTab preview={hoveredHorizontalAccordionPreview}
                                setPreview={setHoveredHorizontalAccordionPreview}
                                code={hoveredHorizontalAccordionCode}
                                setCode={setHoveredHorizontalAccordionCode}/>

                <BlockWrapper>
                    {hoveredHorizontalAccordionPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <HorizontalExpanableExample/>
                        </div>
                    )}

                    {hoveredHorizontalAccordionCode && <BlocksShowCode code='
import React, {useState} from "react";
import {motion, AnimatePresence, LayoutGroup} from "framer-motion";

// data
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

const HorizontalExpanable = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="w-full h-[380px] md:h-[450px]">
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

                                    <AnimatePresence mode="wait" initial={false}>
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
                                                            transition: {type: "spring", stiffness: 150, damping: 12}
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
                                                            transition: {type: "spring", stiffness: 150, damping: 12},
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

export default HorizontalExpanable;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Staggered text with progress bar"} id={"staggered-text-with-progress-bar"}/>
                </div>

                <BlockDescription
                    text='Staggered text with progress bar animates each text element sequentially while a progress bar visually tracks the animation’s completion.'/>

                <BlockToggleTab preview={staggeredTextWithProgressBarPreview}
                                setPreview={setStaggeredTextWithProgressBarPreview}
                                code={staggeredTextWithProgressBarCode}
                                setCode={setStaggeredTextWithProgressBarCode}/>

                <BlockWrapper>
                    {staggeredTextWithProgressBarPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <TextAccordionWithProgressbarExample/>
                        </div>
                    )}

                    {staggeredTextWithProgressBarCode && <BlocksShowCode code='
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {HiChevronDown} from "react-icons/hi";

// data
const accordionItems = [
    {
        id: 1,
        title: "Cloud Computing",
        content: "Cloud computing provides on-demand availability of computer system resources without direct active management by the user. It enables global access to shared pools of configurable resources.",
        color: "from-blue-400 to-cyan-300"
    },
    {
        id: 2,
        title: "Internet of Things",
        content: "IoT describes physical objects with sensors, processing ability, and software that connect and exchange data with other devices over the Internet, enabling seamless integration between physical and digital worlds.",
        color: "from-green-400 to-emerald-300"
    },
    {
        id: 3,
        title: "Augmented Reality",
        content: "Augmented reality overlays digital content onto the real world, enhancing users perception of their surroundings with computer-generated information across multiple sensory modalities.",
        color: "from-amber-400 to-yellow-300"
    },
    {
        id: 4,
        title: "Bioinformatics",
        content: "Bioinformatics combines biology, computer science, and statistics to analyze and interpret biological data, particularly when dealing with large genomic datasets.",
        color: "from-purple-400 to-pink-300"
    }
];

const TextAccordionWithProgressbar = () => {
    const [activeId, setActiveId] = useState(1);

    const toggleAccordion = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="w-full max-w-2xl space-y-3">
            {accordionItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="rounded-lg dark:bg-slate-800 dark:border-slate-700 bg-gray-50 border border-gray-200 overflow-hidden"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1, duration: 0.5}}
                    layout
                >
                    <motion.div
                        className="w-full"
                    >
                        <motion.button
                            className={`${activeId === item.id ? "text-gray-800 dark:text-[#d2e5f5]" : "text-gray-600 dark:text-[#d2e5f5]/60"} w-full p-4 text-left font-medium text-lg flex justify-between items-center`}
                            onClick={() => toggleAccordion(item.id)}
                        >
                            <motion.span
                                className="font-bold"
                                animate={{
                                    scale: activeId === item.id ? 1.05 : 1,
                                }}
                                transition={{duration: 0.2}}
                            >
                                {item.title}
                            </motion.span>
                            <motion.div
                                animate={{
                                    rotate: activeId === item.id ? 180 : 0,
                                }}
                                transition={{duration: 0.3}}
                                className="text-2xl"
                            >
                                <HiChevronDown/>
                            </motion.div>
                        </motion.button>
                    </motion.div>

                    <AnimatePresence>
                        {activeId === item.id && (
                            <motion.div
                                className="overflow-hidden dark:bg-slate-800 bg-gray-50"
                                initial={{height: 0}}
                                animate={{height: "auto"}}
                                exit={{height: 0}}
                                transition={{duration: 0.3}}
                            >
                                <div className="px-3 pb-6 dark:text-[#d2e5f5] text-gray-800 relative">
                                    {item.content.split(" ").map((word, wordIndex) => (
                                        <motion.span
                                            key={wordIndex}
                                            className="inline-block mr-1"
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{
                                                delay: wordIndex * 0.02,
                                                duration: 0.3
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: {duration: 0.1}
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.color}`}
                                        initial={{width: 0}}
                                        animate={{width: "100%"}}
                                        transition={{duration: 1, delay: 0.3}}
                                        exit={{width: 0, transition: {duration: 0.2}}}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}

export default TextAccordionWithProgressbar;
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/animations/drag-animations' backName='drag animations'
                              forwardUrl='/animations/reaction-trail' forwardName='reaction trail'/>
            </div>

            <Helmet>
                <title>Layouts - Animated Accordion</title>
            </Helmet>
        </aside>
    );
};

export default Index;
