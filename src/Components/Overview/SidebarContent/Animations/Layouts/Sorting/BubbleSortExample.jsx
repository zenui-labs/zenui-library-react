import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FaPlay} from "react-icons/fa";
import {VscDebugRestart} from "react-icons/vsc";

const BubbleSortExample = () => {
    const [items, setItems] = useState([]);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        // Generate initial items
        const initialItems = Array.from({length: 10}, (_, i) => ({
            id: String(i + 1),
            height: Math.floor(Math.random() * 100) + 20,
        }));
        setItems(initialItems);
    }, []);

    const bubbleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);

        const arr = [...items];
        const n = arr.length;

        // Bubble sort animation
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight current comparison
                setItems(prev => {
                    const newItems = [...prev];
                    newItems[j] = {...newItems[j], active: true};
                    newItems[j + 1] = {...newItems[j + 1], active: true};
                    return newItems;
                });

                // Wait a moment
                await new Promise(resolve => setTimeout(resolve, 300));

                if (arr[j].height > arr[j + 1].height) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setItems([...arr.map((item, idx) => ({
                        ...item,
                        active: idx === j || idx === j + 1
                    }))]);

                    // Wait after swap
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                // Remove highlight
                setItems(prev => {
                    const newItems = [...prev];
                    newItems[j] = {...newItems[j], active: false};
                    newItems[j + 1] = {...newItems[j + 1], active: false};
                    return newItems;
                });
            }
        }

        // Final sorted state
        setItems([...arr.map(item => ({...item, active: false}))]);
        setIsSorting(false);
    };

    const resetSort = () => {
        const newItems = Array.from({length: 10}, (_, i) => ({
            id: String(i + 1),
            height: Math.floor(Math.random() * 100) + 20,
        }));
        setItems(newItems);
    };

    return (
        <div className='w-full'>
            <div className="flex space-x-4 mb-28">
                <button
                    onClick={bubbleSort}
                    disabled={isSorting}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors ${
                        isSorting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    <FaPlay className={`${isSorting ? 'text-gray-400' : 'text-white'}`}/>
                    {isSorting ? 'Sorting...' : 'Start Sorting'}
                </button>
                <button
                    onClick={resetSort}
                    disabled={isSorting}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isSorting ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                >
                    <VscDebugRestart className={`text-[1.3rem] ${isSorting ? 'text-gray-400' : 'text-white'}`}/>
                </button>
            </div>

            <div className="flex items-end justify-center h-64 rounded-lg">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: 1,
                            y: 0,
                            backgroundColor: item.active ? '#d908d5' : '#0FABCA'
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                        className="mx-2 w-8 md:w-8 rounded-t-md"
                        style={{
                            height: `${item.height}%`,
                            backgroundColor: item.active ? '#d908d5' : '#0FABCA'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BubbleSortExample;