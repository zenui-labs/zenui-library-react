import {useState} from "react";
import {motion} from "framer-motion";

const items = [
    {
        id: "4",
        title: "Blockchain",
        description: "Decentralized, secure transaction systems",
        color: "bg-pink-500",
        image: "https://img.freepik.com/free-photo/blockchain-technology-background-gradient-blue_53876-124648.jpg",
    },
    {
        id: "5",
        title: "Biotechnology",
        description: "Engineering biological systems for medical advances",
        color: "bg-purple-500",
        image: "https://img.freepik.com/free-vector/flat-design-biotechnology-concept-illustrated_23-2148893192.jpg",
    },
    {
        id: "6",
        title: "Space Exploration",
        description: "Pushing the boundaries of human reach beyond Earth",
        color: "bg-red-500",
        image: "https://img.freepik.com/free-vector/astronaut-space-city_1308-35226.jpg",
    },
];

const DominoTransitionExample = () => {
    const [isGrid, setIsGrid] = useState(false);

    const toggleView = () => setIsGrid(!isGrid);

    return (
        <div className="w-full">
            <div className="flex justify-end items-end mb-10">
                <button
                    onClick={toggleView}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isGrid ? "Switch to List" : "Switch to Grid"}
                </button>
            </div>

            <div className={isGrid ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"}>
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={false}
                        animate={{
                            rotateY: [0, isGrid ? 90 : -90, 0],
                            transition: {
                                duration: 0.8,
                                times: [0, 0.5, 1],
                                delay: isGrid ? i * 0.15 : (items.length - i - 1) * 0.15,
                            }
                        }}
                        className={`rounded-md bg-gray-100 dark:bg-slate-800 overflow-hidden transform-gpu`}
                        style={{transformOrigin: isGrid ? "left center" : "right center"}}
                    >
                        <motion.div
                            layout
                            className={`${isGrid ? "p-5" : "p-4 flex items-center"}`}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: isGrid ? (i * 0.15) + 0.4 : ((items.length - i - 1) * 0.15) + 0.4
                            }}
                        >
                            <motion.img
                                layout
                                src={item.image}
                                alt={item.title}
                                className={`rounded-lg ${isGrid ? "w-full h-[200px] md:h-[280px] mb-5" : "w-24 h-24 mr-4 flex-shrink-0 object-cover"}`}
                            />
                            <div>
                                <motion.h3 layout
                                           className={`${isGrid ? "text-[1.4rem]" : "text-[1.1rem]"} font-bold text-gray-800 dark:text-[#d2e5f5]`}>{item.title}</motion.h3>
                                <motion.p layout
                                          className="text-gray-500 mt-1 dark:text-[#abc2d3]/80">{item.description}</motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DominoTransitionExample