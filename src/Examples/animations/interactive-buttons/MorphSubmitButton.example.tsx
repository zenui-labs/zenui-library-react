import {useId, useState} from "react";
import {MorphSubmitButton} from "./MorphSubmitButton";

// Stands in for a real request: waits 1.6 seconds, then succeeds or fails.
const fakeSave = (fail: boolean) =>
    new Promise<void>((resolve, reject) => {
        window.setTimeout(() => (fail ? reject(new Error("Network error")) : resolve()), 1600);
    });

const MorphSubmitButtonExample = () => {
    const [failNext, setFailNext] = useState(false);
    const toggleId = useId();

    return (
        <div className="flex flex-col items-center gap-5">
            <MorphSubmitButton onSubmit={() => fakeSave(failNext)}/>
            <label htmlFor={toggleId} className="inline-flex cursor-pointer items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
                <input
                    id={toggleId}
                    type="checkbox"
                    checked={failNext}
                    onChange={(event) => setFailNext(event.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                />
                Simulate a failed request
            </label>
        </div>
    );
};

export default MorphSubmitButtonExample;
