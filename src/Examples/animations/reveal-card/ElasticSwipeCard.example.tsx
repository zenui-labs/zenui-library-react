import {useState} from "react";
import {FaRegHeart} from "react-icons/fa";
import {MdDoNotDisturbAlt} from "react-icons/md";
import {ElasticSwipeCard} from "./ElasticSwipeCard";

const ElasticSwipeCardExample = () => {
    const [status, setStatus] = useState("");

    return (
        <div className="flex w-full flex-col items-center gap-3">
            <ElasticSwipeCard
                name="John Doe"
                initials="JD"
                meta="3:45 PM"
                leftAction={{label: "Like", icon: FaRegHeart, onClick: () => setStatus("Liked")}}
                rightAction={{label: "Block", icon: MdDoNotDisturbAlt, onClick: () => setStatus("Blocked")}}
            />
            <p className="h-4 text-xs text-gray-500 dark:text-[#abc2d3]" aria-live="polite">{status}</p>
        </div>
    );
};

export default ElasticSwipeCardExample;
