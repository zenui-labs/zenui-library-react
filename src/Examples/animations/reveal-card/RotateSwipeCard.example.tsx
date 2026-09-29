import {useState} from "react";
import {FaRegBookmark} from "react-icons/fa";
import {MdOutlineFileDownload} from "react-icons/md";
import {RotateSwipeCard} from "./RotateSwipeCard";

const RotateSwipeCardExample = () => {
    const [status, setStatus] = useState("");

    return (
        <div className="flex w-full flex-col items-center gap-3">
            <RotateSwipeCard
                name="John Doe"
                initials="JD"
                meta="3:45 PM"
                leftAction={{label: "Download", icon: MdOutlineFileDownload, onClick: () => setStatus("Downloading")}}
                rightAction={{label: "Save", icon: FaRegBookmark, onClick: () => setStatus("Saved")}}
            />
            <p className="h-4 text-xs text-gray-500 dark:text-[#abc2d3]" aria-live="polite">{status}</p>
        </div>
    );
};

export default RotateSwipeCardExample;
