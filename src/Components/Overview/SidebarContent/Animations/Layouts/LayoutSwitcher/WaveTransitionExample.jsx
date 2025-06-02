import {useState} from "react";
import {motion} from "framer-motion";

const items = [
    {
        id: '1',
        title: 'Quantum Computing',
        description: 'Breaking computational barriers with quantum mechanics',
        color: 'bg-blue-500',
        image: 'https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149226910.jpg',
    },
    {
        id: '2',
        title: 'Neural Networks',
        description: 'Mimicking brain function for advanced AI systems',
        color: 'bg-green-500',
        image: 'https://img.freepik.com/free-photo/abstract-futuristic-digital-technology-background_53876-104787.jpg',
    },
    {
        id: '3',
        title: 'Augmented Reality',
        description: 'Blending digital and physical worlds seamlessly',
        color: 'bg-yellow-500',
        image: 'https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg',
    },
];

const WaveTransitionExample = () => {
    const [isGrid, setIsGrid] = useState(false);

    const toggleView = () => setIsGrid(!isGrid);

    return (
        <div className='w-full'>
            <div className="flex justify-end items-end mb-10">
                <button
                    onClick={toggleView}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isGrid ? 'Switch to List' : 'Switch to Grid'}
                </button>
            </div>

            <div className={isGrid ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"}>
                {items.map((item, i) => {
                    const waveDelay = isGrid
                        ? (i % 3) * 0.1 + Math.floor(i / 3) * 0.1
                        : i * 0.1;

                    return (
                        <motion.div
                            key={item.id}
                            layout
                            initial={false}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0.5, 1],
                                scale: [1, 0.95, 1],
                                transition: {
                                    duration: 0.6,
                                    times: [0, 0.5, 1],
                                    delay: waveDelay,
                                }
                            }}
                            className={`rounded-md dark:bg-slate-800 bg-gray-100 overflow-hidden`}
                        >
                            <motion.div
                                layout
                                className={`${isGrid ? 'p-5' : 'p-4 flex items-center'}`}
                                transition={{type: "spring", stiffness: 300, damping: 25, delay: waveDelay + 0.3}}
                            >
                                <motion.img
                                    layout
                                    src={item.image}
                                    alt={item.title}
                                    className={`rounded-lg ${isGrid ? 'w-full h-[200px] 640px:h-[280px] mb-5' : 'w-24 h-24 mr-4 flex-shrink-0 object-cover'}`}
                                />
                                <div>
                                    <motion.h3 layout
                                               className={`${isGrid ? 'text-[1.4rem]' : 'text-[1.1rem]'} font-bold text-gray-800 dark:text-darkTextColor`}>{item.title}</motion.h3>
                                    <motion.p layout
                                              className="text-gray-500 dark:text-darkSubTextColor/80 mt-1">{item.description}</motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default WaveTransitionExample;
