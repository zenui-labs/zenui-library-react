import {useState} from "react";
import {NumberRatingCard} from "./NumberRatingCard";

const NumberRatingCardExample = () => {
    const [sent, setSent] = useState<number | null>(null);

    return (
        <div className="flex w-full flex-col items-center">
            <NumberRatingCard onChange={() => setSent(null)} onSubmit={setSent}/>
            {sent !== null && (
                <p className="mt-3 text-center text-sm text-gray-500 dark:text-[#abc2d3]" role="status">
                    {sent ? `Thanks, you rated ${sent} out of 5.` : "Pick a number before you submit."}
                </p>
            )}
        </div>
    );
};

export default NumberRatingCardExample;
