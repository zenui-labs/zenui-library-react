import {useEffect, useState} from "react";
import {StripedProgressBar} from "./StripedProgressBar";

const buttonClass =
    "text-[0.8rem] px-2 py-1 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 transition-colors duration-300 hover:text-white after:absolute after:inset-0 after:-z-10 after:bg-[#3B9DF8] after:-translate-x-full after:transition-transform after:duration-300 after:ease-in-out hover:after:translate-x-0";

const StripedProgressBarExample = () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [run, setRun] = useState(0);

    // Fakes a task that climbs to 90% so the demo has progress to show.
    useEffect(() => {
        if (!loading) return;
        const timer = window.setInterval(() => setProgress((current) => Math.min(current + 1, 90)), 30);
        return () => window.clearInterval(timer);
    }, [loading]);

    useEffect(() => {
        if (progress >= 90) setLoading(false);
    }, [progress]);

    const startLoading = () => {
        setRun((current) => current + 1);
        setProgress(0);
        setLoading(true);
    };

    return (
        <div className="flex w-full flex-col items-center gap-5">
            {/* A new key on each start makes the bar snap back to zero instead of shrinking. */}
            <StripedProgressBar key={run} value={progress} className="max-w-[80%]"/>

            <button type="button" onClick={startLoading} className={buttonClass}>
                Start loading
            </button>
        </div>
    );
};

export default StripedProgressBarExample;
