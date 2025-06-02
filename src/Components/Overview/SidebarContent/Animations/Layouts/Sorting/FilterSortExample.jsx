import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const FilterSortExample = () => {
    const categories = ['All', 'Work', 'Personal', 'Urgent'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('priority');

    const [items, setItems] = useState([
        {id: '1', title: 'Complete report', category: 'Work', priority: 3, color: 'bg-blue-400'},
        {id: '2', title: 'Buy groceries', category: 'Personal', priority: 2, color: 'bg-green-400'},
        {id: '3', title: 'Call client', category: 'Work', priority: 4, color: 'bg-yellow-400'},
        {id: '4', title: 'Fix bug in code', category: 'Work', priority: 5, color: 'bg-pink-400'},
        {id: '5', title: 'Doctor appointment', category: 'Personal', priority: 4, color: 'bg-purple-400'},
        {id: '6', title: 'Submit proposal', category: 'Urgent', priority: 5, color: 'bg-red-400'},
        {id: '7', title: 'Gym workout', category: 'Personal', priority: 1, color: 'bg-indigo-400'},
        {id: '8', title: 'Team meeting', category: 'Work', priority: 3, color: 'bg-teal-400'}
    ]);

    const filteredItems = activeCategory === 'All'
        ? items
        : items.filter(item => item.category === activeCategory);

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'priority') {
            return b.priority - a.priority;
        } else {
            return a.title.localeCompare(b.title);
        }
    });

    return (
        <div className='w-full'>

            <div className='flex items-center flex-wrap gap-y-4 justify-between w-full mb-10'>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-md text-sm font-medium ${
                                activeCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 border dark:bg-slate-900 dark:border-slate-700 dark:text-darkSubTextColor dark:hover:bg-slate-800 border-gray-200 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-darkSubTextColor rounded-lg text-sm"
                    >
                        <option value="priority">Sort by Priority</option>
                        <option value="name">Sort by Name</option>
                    </select>
                </div>
            </div>

            <motion.div layout className="space-y-5">
                <AnimatePresence>
                    {sortedItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20, transition: {duration: 0.2}}}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }}
                            className={`${item.color} p-4 rounded-lg shadow-md`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                    <span className="text-xs text-white text-opacity-80">{item.category}</span>
                                </div>
                                <div className="flex items-center">
                  <span className="text-white bg-black bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    Priority: {item.priority}
                  </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default FilterSortExample;