import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {FaPlay} from "react-icons/fa";
import {VscDebugRestart} from "react-icons/vsc";

interface Bar {
    id: string;
    /** Height as a percent of the chart. */
    height: number;
    active: boolean;
}

export interface BubbleSortProps {
    /** Starting bar heights, as a percent of the chart height. */
    values: number[];
    /** Creates the bars for the reset button. Defaults to random heights between 20 and 119. */
    createValues?: (count: number) => number[];
    /** Pause between steps in milliseconds. */
    stepDelay?: number;
    barColor?: string;
    /** Color of the two bars being compared. */
    activeColor?: string;
    startLabel?: string;
    sortingLabel?: string;
    /** Accessible name for the icon-only reset button. */
    resetLabel?: string;
    /** Called with the sorted heights when a run finishes. */
    onSorted?: (values: number[]) => void;
    className?: string;
}

const randomValues = (count: number) => Array.from({length: count}, () => Math.floor(Math.random() * 100) + 20);

const toBars = (values: number[]): Bar[] =>
    values.map((height, index) => ({id: String(index + 1), height, active: false}));

/** A bar chart that runs bubble sort step by step, highlighting each pair it compares and swapping them in place. */
export const BubbleSort = ({
    values,
    createValues = randomValues,
    stepDelay = 300,
    barColor = "#0FABCA",
    activeColor = "#d908d5",
    startLabel = "Start sorting",
    sortingLabel = "Sorting...",
    resetLabel = "Reset bars",
    onSorted,
    className = "",
}: BubbleSortProps) => {
    const [items, setItems] = useState<Bar[]>(() => toBars(values));
    const [isSorting, setIsSorting] = useState(false);
    // Stops a running sort when the component unmounts.
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const wait = () => new Promise<void>((resolve) => setTimeout(resolve, stepDelay));

    const setActive = (indexes: [number, number], active: boolean) => {
        setItems((prev) => {
            const next = [...prev];
            for (const index of indexes) next[index] = {...next[index], active};
            return next;
        });
    };

    const bubbleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);

        const arr = items.map((item) => ({...item, active: false}));
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight the pair being compared.
                setActive([j, j + 1], true);
                await wait();
                if (!mounted.current) return;

                if (arr[j].height > arr[j + 1].height) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setItems(arr.map((item, index) => ({...item, active: index === j || index === j + 1})));
                    await wait();
                    if (!mounted.current) return;
                }

                setActive([j, j + 1], false);
            }
        }

        setItems(arr.map((item) => ({...item, active: false})));
        setIsSorting(false);
        onSorted?.(arr.map((item) => item.height));
    };

    const resetSort = () => setItems(toBars(createValues(items.length)));

    return (
        <div className={`w-full ${className}`}>
            <div className="flex space-x-4 mb-28">
                <button
                    type="button"
                    onClick={bubbleSort}
                    disabled={isSorting}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors ${
                        isSorting ? "bg-gray-200 text-gray-400 dark:bg-slate-700 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    <FaPlay className={isSorting ? "text-gray-400" : "text-white"} aria-hidden/>
                    {isSorting ? sortingLabel : startLabel}
                </button>
                <button
                    type="button"
                    onClick={resetSort}
                    disabled={isSorting}
                    aria-label={resetLabel}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isSorting ? "bg-gray-200 dark:bg-slate-700 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                >
                    <VscDebugRestart className={`text-[1.3rem] ${isSorting ? "text-gray-400" : "text-white"}`} aria-hidden/>
                </button>
            </div>

            <div className="flex items-end justify-center h-64 rounded-lg" aria-hidden>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{opacity: 0, y: 20}}
                        animate={{
                            opacity: 1,
                            y: 0,
                            backgroundColor: item.active ? activeColor : barColor,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                        className="mx-2 w-4 sm:w-8 rounded-t-md"
                        style={{
                            height: `${item.height}%`,
                            backgroundColor: item.active ? activeColor : barColor,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
