import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import FilterSortExample from "./FilterSortExample.jsx";
import BubbleSortExample from "./BubbleSortExample.jsx";
import ShuffleSortExample from "./ShuffleSortExample.jsx";
import {SortingAnimationContents} from "@utils/ContentsConfig/AnimationContents/LayoutContents.js";

const Index = () => {
    const sectionIds = SortingAnimationContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [suffleSortingPreview, setSuffleSortingPreview] = useState(true);
    const [suffleSortingCode, setSuffleSortingCode] = useState(false);

    const [filterSortingPreview, setFilterSortingPreview] = useState(true);
    const [filterSortingCode, setFilterSortingCode] = useState(false);

    const [bubbleSortingPreview, setBubbleSortingPreview] = useState(true);
    const [bubbleSortingCode, setBubbleSortingCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"shuffle sorting"} id={"shuffle-sorting"}/>

                <ComponentDescription
                    text='Shuffle sorting randomly rearranges elements in a list, ensuring a new unpredictable order each time.'/>

                <ToggleTab setCode={setSuffleSortingCode} code={suffleSortingCode}
                           setPreview={setSuffleSortingPreview} preview={suffleSortingPreview}/>

                <ComponentWrapper>
                    {suffleSortingPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ShuffleSortExample/>
                        </div>
                    )}

                    {suffleSortingCode &&
                        <ShowCode code='
import {useEffect, useState} from "react";

// framer motion
import {AnimatePresence, motion} from "framer-motion";

// react icons
import {IoShuffle} from "react-icons/io5";
import {TbSortAscendingNumbers, TbSortDescendingNumbers} from "react-icons/tb";

const ShuffleSort = () => {
    const colors = ["bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400", "bg-purple-400", "bg-red-400"];
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
        <div className="w-full">
            <div className="flex gap-3 flex-wrap mb-10">
                <button
                    onClick={shuffle}
                    className="border-[#3B9DF8] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 flex items-center gap-2 border bg-[#3B9DF8]/20 hover:bg-[#3B9DF8]/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <IoShuffle className="text-[1.3rem]"/>
                    Shuffle
                </button>
                <button
                    onClick={sortAscending}
                    className="border-[#3B9DF8] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 flex items-center gap-2 border bg-[#3B9DF8]/20 hover:bg-[#3B9DF8]/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <TbSortAscendingNumbers className="text-[1.2rem]"/>
                    Ascending
                </button>
                <button
                    onClick={sortDescending}
                    className="border-[#3B9DF8] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 flex items-center gap-2 border bg-[#3B9DF8]/20 hover:bg-[#3B9DF8]/50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <TbSortDescendingNumbers className="text-[1.2rem]"/>
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

export default ShuffleSort;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"filter sorting"} id={"filter-sorting"}/>
                </div>

                <ComponentDescription
                    text='Filter sorting selects items based on conditions before sorting the filtered results.'/>

                <ToggleTab setCode={setFilterSortingCode} code={filterSortingCode}
                           setPreview={setFilterSortingPreview} preview={filterSortingPreview}/>

                <ComponentWrapper>
                    {filterSortingPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <FilterSortExample/>
                        </div>
                    )}

                    {filterSortingCode &&
                        <ShowCode code='
import {useState} from "react";

// framer motion
import {AnimatePresence, motion} from "framer-motion";

const FilterSort = () => {
    const categories = ["All", "Work", "Personal", "Urgent"];
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("priority");

    const [items, setItems] = useState([
        {id: "1", title: "Complete report", category: "Work", priority: 3, color: "bg-blue-400"},
        {id: "2", title: "Buy groceries", category: "Personal", priority: 2, color: "bg-green-400"},
        {id: "3", title: "Call client", category: "Work", priority: 4, color: "bg-yellow-400"},
        {id: "4", title: "Fix bug in code", category: "Work", priority: 5, color: "bg-pink-400"},
        {id: "5", title: "Doctor appointment", category: "Personal", priority: 4, color: "bg-purple-400"},
        {id: "6", title: "Submit proposal", category: "Urgent", priority: 5, color: "bg-red-400"},
        {id: "7", title: "Gym workout", category: "Personal", priority: 1, color: "bg-indigo-400"},
        {id: "8", title: "Team meeting", category: "Work", priority: 3, color: "bg-teal-400"}
    ]);

    const filteredItems = activeCategory === "All"
        ? items
        : items.filter(item => item.category === activeCategory);

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === "priority") {
            return b.priority - a.priority;
        } else {
            return a.title.localeCompare(b.title);
        }
    });

    return (
        <div className="w-full">
            <div className="flex items-center flex-wrap gap-y-4 justify-between w-full mb-10">
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-md text-sm font-medium ${
                                activeCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 border-gray-200 text-gray-700 hover:bg-gray-200"
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
                        className="px-3 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] rounded-lg text-sm"
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

export default FilterSort;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"bubble sorting"} id={"bubble-sorting"}/>
                </div>

                <ComponentDescription
                    text='Bubble sorting repeatedly swaps adjacent elements if they are in the wrong order, bubbling larger values to the end.'/>

                <ToggleTab setCode={setBubbleSortingCode} code={bubbleSortingCode}
                           setPreview={setBubbleSortingPreview} preview={bubbleSortingPreview}/>

                <ComponentWrapper>
                    {bubbleSortingPreview && (
                        <div className="p-5 640px:p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BubbleSortExample/>
                        </div>
                    )}

                    {bubbleSortingCode &&
                        <ShowCode code='
import {useState, useEffect} from "react";

// framer motion
import {motion} from "framer-motion";

// react icons
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
        <div className="w-full">
            <div className="flex space-x-4 mb-28">
                <button
                    onClick={bubbleSort}
                    disabled={isSorting}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors ${
                        isSorting ? "bg-gray-200 text-gray-400 dark:bg-slate-700 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    <FaPlay className={`${isSorting ? "text-gray-400" : "text-white"}`}/>
                    {isSorting ? "Sorting..." : "Start Sorting"}
                </button>
                <button
                    onClick={resetSort}
                    disabled={isSorting}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isSorting ? "bg-gray-200 dark:bg-slate-700 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                >
                    <VscDebugRestart className={`text-[1.3rem] ${isSorting ? "text-gray-400" : "text-white"}`}/>
                </button>
            </div>

            <div className="flex items-end justify-center h-64 rounded-lg">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: 1,
                            y: 0,
                            backgroundColor: item.active ? "#d908d5" : "#0FABCA"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                        className="mx-2 w-4 640px:w-8 rounded-t-md"
                        style={{
                            height: `${item.height}%`,
                            backgroundColor: item.active ? "#d908d5" : "#0FABCA"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BubbleSortExample;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/magnet-card' backName='magnet card'
                                forwardUrl='/animations/layout-switcher' forwardName='layout switcher'/>
            </div>

            <ContentNavbar contents={SortingAnimationContents} activeSection={activeSection}/>

            <Helmet>
                <title>Layouts - Sorting Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
