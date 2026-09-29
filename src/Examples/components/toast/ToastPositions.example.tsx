import {useState} from "react";

import {toast} from "./toast";
import {Toaster, type ToastPosition} from "./Toaster";

// Every demo on this page has its own toaster, so each toast names it with toasterId.
// With one <Toaster /> in your app, leave toasterId out.
const TOASTER = "positions";

const POSITIONS: ToastPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

const ToastPositionsExample = () => {
    const [position, setPosition] = useState<ToastPosition>("bottom-right");

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Toast position">
                {POSITIONS.map((item) => (
                    <button
                        key={item}
                        type="button"
                        aria-pressed={position === item}
                        onClick={() => setPosition(item)}
                        className={`px-3 py-1 text-xs rounded border transition-colors ${
                            position === item
                                ? "bg-[#0FABCA] text-white border-[#0FABCA]"
                                : "border-gray-300 dark:border-slate-600 dark:text-slate-300 text-gray-600 hover:border-[#0FABCA]"
                        }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={() => toast.success(position, {description: "The toast appears here.", toasterId: TOASTER})}
                className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity"
            >
                Show toast
            </button>
            <Toaster position={position} toasterId={TOASTER}/>
        </div>
    );
};

export default ToastPositionsExample;
