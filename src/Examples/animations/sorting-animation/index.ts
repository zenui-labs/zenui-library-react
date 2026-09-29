import type {Example} from "../../types.ts";
import ShuffleSort from "./ShuffleSort.example.tsx";
import shuffleSortSource from "./ShuffleSort.example.tsx?raw";
import shuffleSortComponentSource from "./ShuffleSort.tsx?raw";
import FilterSort from "./FilterSort.example.tsx";
import filterSortSource from "./FilterSort.example.tsx?raw";
import filterSortComponentSource from "./FilterSort.tsx?raw";
import BubbleSort from "./BubbleSort.example.tsx";
import bubbleSortSource from "./BubbleSort.example.tsx?raw";
import bubbleSortComponentSource from "./BubbleSort.tsx?raw";

const examples: Example[] = [
    {
        id: "shuffle-sorting",
        title: "Shuffle sorting",
        description: "A grid of number tiles you can shuffle into a random order or sort up and down. Each tile springs to its new place.",
        component: ShuffleSort,
        source: shuffleSortSource,
        files: [{name: "ShuffleSort.tsx", source: shuffleSortComponentSource}],
        minHeight: 520,
    },
    {
        id: "filter-sorting",
        title: "Filter sorting",
        description: "Narrow a task list to one category, then sort the results by priority or name. Cards slide in, out and into their new order.",
        component: FilterSort,
        source: filterSortSource,
        files: [{name: "FilterSort.tsx", source: filterSortComponentSource}],
        minHeight: 720,
    },
    {
        id: "bubble-sorting",
        title: "Bubble sorting",
        description: "Bubble sort runs step by step on a bar chart, highlighting each pair it compares and swapping bars that are out of order.",
        component: BubbleSort,
        source: bubbleSortSource,
        files: [{name: "BubbleSort.tsx", source: bubbleSortComponentSource}],
        minHeight: 480,
    },
];

export default examples;
