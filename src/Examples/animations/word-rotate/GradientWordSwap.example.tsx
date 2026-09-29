import {GradientWordSwap, type GradientWord} from "./GradientWordSwap";

const words: GradientWord[] = [
    {text: "organized", gradient: "from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400", bar: "bg-indigo-500"},
    {text: "searchable", gradient: "from-fuchsia-500 to-rose-500 dark:from-fuchsia-400 dark:to-rose-400", bar: "bg-rose-500"},
    {text: "shared", gradient: "from-amber-500 to-orange-600 dark:from-amber-300 dark:to-orange-400", bar: "bg-orange-500"},
    {text: "always in sync", gradient: "from-emerald-500 to-teal-600 dark:from-emerald-300 dark:to-teal-400", bar: "bg-teal-500"},
];

const GradientWordSwapExample = () => <GradientWordSwap words={words}/>;

export default GradientWordSwapExample;
