import {useState} from "react";
import {TapeMeasure, type TapeUnit} from "./TapeMeasure";

const TapeMeasureExample = () => {
    const [unit, setUnit] = useState<TapeUnit>("cm");

    return (
        <div className="flex w-full max-w-2xl flex-col gap-5">
            <div role="radiogroup" aria-label="Unit" className="flex self-end rounded-md border border-zinc-200 p-0.5 text-xs dark:border-zinc-800">
                {(["cm", "in"] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={unit === option}
                        onClick={() => setUnit(option)}
                        className={`rounded px-3 py-1 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 ${
                            unit === option ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <TapeMeasure label="Your height" min={120} max={220} defaultValue={176} unit={unit}/>
        </div>
    );
};

export default TapeMeasureExample;
