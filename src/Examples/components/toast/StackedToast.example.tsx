import {useRef, useState} from "react";

import {StackedToasts, type StackedToastItem} from "./StackedToast";

// Older toasts beyond this count are dropped.
const LIMIT = 5;

const StackedToastExample = () => {
    const [toasts, setToasts] = useState<StackedToastItem[]>([]);
    const count = useRef(0);

    const push = () => {
        const id = ++count.current;
        setToasts((prev) => [...prev.slice(-(LIMIT - 1)), {id, message: `Notification #${id}`}]);
    };

    return (
        <>
            <button
                type="button"
                onClick={push}
                className="px-5 py-2 rounded bg-[#0FABCA] text-white text-sm hover:opacity-90 transition-opacity"
            >
                Push toast
            </button>
            <StackedToasts toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))}/>
        </>
    );
};

export default StackedToastExample;
