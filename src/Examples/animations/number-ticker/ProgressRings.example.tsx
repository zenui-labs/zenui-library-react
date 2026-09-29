import {useId, useState} from "react";
import type {ChangeEvent} from "react";
import {ProgressRings, type RingColors, type RingItem} from "./ProgressRings";

const growth: RingColors = ["#0ea5e9", "#10b981", "#10b981"];
const warning: RingColors = ["#10b981", "#f59e0b", "#ef4444"];

const rings: RingItem[] = [
    {label: "Weekly goal", value: 88, detail: "22 of 25 tasks", colors: growth},
    {label: "Reviews done", value: 64, detail: "16 of 25 files"},
    {label: "Seats used", value: 45, detail: "9 of 20 seats"},
];

// The storage ring follows the slider and turns amber, then red, as it fills.
const ProgressRingsExample = () => {
    const [storage, setStorage] = useState(72);
    const sliderId = useId();

    return (
        <ProgressRings
            description="Northwind design team, September"
            primary={{label: "Storage", value: storage, detail: `${((storage / 100) * 200).toFixed(0)} GB of 200 GB`, colors: warning}}
            items={rings}
            primaryFooter={
                <>
                    <label htmlFor={sliderId} className="sr-only">Storage used</label>
                    <input
                        id={sliderId}
                        type="range"
                        min={0}
                        max={100}
                        value={storage}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setStorage(Number(event.target.value))}
                        className="mt-4 w-44 accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:accent-indigo-400 dark:focus-visible:ring-offset-slate-950"
                    />
                </>
            }
        />
    );
};

export default ProgressRingsExample;
