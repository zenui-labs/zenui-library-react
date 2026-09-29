import {useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {IoShuffle} from "react-icons/io5";
import {TbSortAscendingNumbers, TbSortDescendingNumbers} from "react-icons/tb";

export interface ShuffleSortItem {
    id: string;
    value: number;
    /** Tailwind background class for the tile, for example "bg-blue-400". Falls back to `colors`. */
    color?: string;
}

export interface ShuffleSortProps {
    items: ShuffleSortItem[];
    /** Tile colors used in turn for items without their own `color`. */
    colors?: string[];
    shuffleLabel?: string;
    ascendingLabel?: string;
    descendingLabel?: string;
    /** Called with the items in their new order after every shuffle or sort. */
    onChange?: (items: ShuffleSortItem[]) => void;
    className?: string;
}

const DEFAULT_COLORS = ["bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-pink-400", "bg-purple-400", "bg-red-400"];

const buttonClass =
    "border-[#3B9DF8] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 flex items-center gap-2 border bg-[#3B9DF8]/20 hover:bg-[#3B9DF8]/50 px-4 py-2 rounded-lg font-medium transition-colors";

/** A grid of number tiles that animate to their new place when you shuffle or sort them. */
export const ShuffleSort = ({
    items: initialItems,
    colors = DEFAULT_COLORS,
    shuffleLabel = "Shuffle",
    ascendingLabel = "Ascending",
    descendingLabel = "Descending",
    onChange,
    className = "",
}: ShuffleSortProps) => {
    // Prefixes layout ids so two grids on one page never animate into each other.
    const layoutPrefix = useId();
    const [items, setItems] = useState<ShuffleSortItem[]>(() =>
        initialItems.map((item, index) => ({...item, color: item.color ?? colors[index % colors.length]})),
    );

    const update = (next: ShuffleSortItem[]) => {
        setItems(next);
        onChange?.(next);
    };

    const shuffle = () => {
        const next = [...items];
        for (let i = next.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [next[i], next[j]] = [next[j], next[i]];
        }
        update(next);
    };

    const sortAscending = () => update([...items].sort((a, b) => a.value - b.value));

    const sortDescending = () => update([...items].sort((a, b) => b.value - a.value));

    return (
        <div className={`w-full ${className}`}>
            <div className="flex gap-3 flex-wrap mb-10">
                <button type="button" onClick={shuffle} className={buttonClass}>
                    <IoShuffle className="text-[1.3rem]" aria-hidden/>
                    {shuffleLabel}
                </button>
                <button type="button" onClick={sortAscending} className={buttonClass}>
                    <TbSortAscendingNumbers className="text-[1.2rem]" aria-hidden/>
                    {ascendingLabel}
                </button>
                <button type="button" onClick={sortDescending} className={buttonClass}>
                    <TbSortDescendingNumbers className="text-[1.2rem]" aria-hidden/>
                    {descendingLabel}
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={`${layoutPrefix}-shuffle-${item.id}`}
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
