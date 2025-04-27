import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {IoShuffle} from "react-icons/io5";
import {TbSortAscendingNumbers, TbSortDescendingNumbers} from "react-icons/tb";

const ShuffleSortExample = () => {
    const colors = ['bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-pink-400', 'bg-purple-400', 'bg-red-400'];
    const [items, setItems] = useState([]);

    useEffect(() => {
        const initialItems = Array.from({length: 12}, (_, i) => ({
            id: String(i + 1),
            value: Math.floor(Math.random() * 100),
            color: colors[i % colors.length]
        }));
        setItems(initialItems);
    }, []);

    const shuffle = () => {
        const newItems = [...items];
        for (let i = newItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
        }
        setItems(newItems);
    };

    const sortAscending = () => {
        const newItems = [...items].sort((a, b) => a.value - b.value);
        setItems(newItems);
    };

    const sortDescending = () => {
        const newItems = [...items].sort((a, b) => b.value - a.value);
        setItems(newItems);
    };

    return (
        <div className='w-full'>
            <div className="flex space-x-3 flex-wrap mb-10">
                <button
                    onClick={shuffle}
                    className="border-primary flex items-center gap-2 border bg-primary/20 hover:bg-primary/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <IoShuffle className='text-[1.3rem]'/>
                    Shuffle
                </button>
                <button
                    onClick={sortAscending}
                    className="border-primary flex items-center gap-2 border bg-primary/20 hover:bg-primary/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <TbSortAscendingNumbers className='text-[1.2rem]'/>
                    Ascending
                </button>
                <button
                    onClick={sortDescending}
                    className="border-primary flex items-center gap-2 border bg-primary/20 hover:bg-primary/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <TbSortDescendingNumbers className='text-[1.2rem]'/>
                    Descending
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`shuffle-${item.id}`}
                            className={`${item.color} p-4 rounded-lg flex items-center justify-center h-24`}
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        >
                            <span className="text-white text-[1.2rem] font-bold">{item.value}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ShuffleSortExample