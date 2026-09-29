import {useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineDone} from "react-icons/md";
import {BasicSwipeCard} from "./BasicSwipeCard";

const BasicSwipeCardExample = () => {
    const [status, setStatus] = useState("");

    return (
        <div className="flex w-full flex-col items-center gap-3">
            <BasicSwipeCard
                name="John Doe"
                initials="JD"
                meta="3:45 PM"
                leftAction={{label: "Mark as read", icon: MdOutlineDone, onClick: () => setStatus("Marked as read")}}
                rightAction={{label: "Delete", icon: AiOutlineDelete, onClick: () => setStatus("Deleted")}}
            />
            <p className="h-4 text-xs text-gray-500 dark:text-[#abc2d3]" aria-live="polite">{status}</p>
        </div>
    );
};

export default BasicSwipeCardExample;
