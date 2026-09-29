import {useState} from "react";
import {RatingCard} from "./RatingCard";

const RatingCardExample = () => {
    const [open, setOpen] = useState(true);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="py-2 px-6 bg-[#3B9DF8] border border-[#3B9DF8] text-white rounded font-[500]"
            >
                Show rating card
            </button>
        );
    }

    return (
        <RatingCard
            description={
                <>
                    Jonah Noah delivered your order from <b>Nanica Homemade Pies</b>, today at 19:47 (7 min ahead of
                    schedule).
                </>
            }
            onClose={() => setOpen(false)}
        />
    );
};

export default RatingCardExample;
