import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface FilterSortItem {
    id: string;
    title: string;
    category: string;
    /** Higher numbers come first when sorting by priority. */
    priority: number;
    /** Tailwind background class for the card, for example "bg-blue-400". */
    color: string;
}

export type FilterSortOrder = "priority" | "name";

export interface FilterSortProps {
    items: FilterSortItem[];
    /** Filter buttons after "All". Defaults to every category in `items`, in the order they first appear. */
    categories?: string[];
    /** Active category. Pass it with `onCategoryChange` to control the filter. */
    category?: string;
    defaultCategory?: string;
    onCategoryChange?: (category: string) => void;
    /** Active sort order. Pass it with `onSortChange` to control the order. */
    sortBy?: FilterSortOrder;
    defaultSortBy?: FilterSortOrder;
    onSortChange?: (sortBy: FilterSortOrder) => void;
    allLabel?: string;
    priorityOptionLabel?: string;
    nameOptionLabel?: string;
    /** Accessible name for the sort select. */
    sortLabel?: string;
    /** Text before the priority number on each card. */
    priorityLabel?: string;
    className?: string;
}

/** A list of cards you can filter by category and sort by priority or name, with cards sliding into place. */
export const FilterSort = ({
    items,
    categories,
    category,
    defaultCategory,
    onCategoryChange,
    sortBy,
    defaultSortBy = "priority",
    onSortChange,
    allLabel = "All",
    priorityOptionLabel = "Sort by priority",
    nameOptionLabel = "Sort by name",
    sortLabel = "Sort order",
    priorityLabel = "Priority",
    className = "",
}: FilterSortProps) => {
    const [internalCategory, setInternalCategory] = useState<string>(defaultCategory ?? allLabel);
    const [internalSortBy, setInternalSortBy] = useState<FilterSortOrder>(defaultSortBy);
    const activeCategory = category ?? internalCategory;
    const activeSortBy = sortBy ?? internalSortBy;

    const filters = [allLabel, ...(categories ?? Array.from(new Set(items.map((item) => item.category))))];

    const selectCategory = (next: string) => {
        setInternalCategory(next);
        onCategoryChange?.(next);
    };

    const selectSortBy = (next: FilterSortOrder) => {
        setInternalSortBy(next);
        onSortChange?.(next);
    };

    const filteredItems = activeCategory === allLabel ? items : items.filter((item) => item.category === activeCategory);

    const sortedItems = [...filteredItems].sort((a, b) =>
        activeSortBy === "priority" ? b.priority - a.priority : a.title.localeCompare(b.title),
    );

    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center flex-wrap gap-y-4 justify-between w-full mb-10">
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => selectCategory(filter)}
                            aria-pressed={activeCategory === filter}
                            className={`px-6 py-2 rounded-md text-sm font-medium ${
                                activeCategory === filter
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 border-gray-200 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    <select
                        value={activeSortBy}
                        onChange={(event) => selectSortBy(event.target.value as FilterSortOrder)}
                        aria-label={sortLabel}
                        className="px-3 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] rounded-lg text-sm"
                    >
                        <option value="priority">{priorityOptionLabel}</option>
                        <option value="name">{nameOptionLabel}</option>
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
                                        {priorityLabel}: {item.priority}
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
