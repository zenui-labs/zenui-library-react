import {useState} from "react";
import {TopConsentDrawer} from "./TopConsentDrawer";

const TopConsentDrawerExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                aria-haspopup="dialog"
                className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded-md"
                onClick={() => setOpen(true)}
            >
                Open drawer
            </button>
            <TopConsentDrawer open={open} onClose={() => setOpen(false)}/>
        </>
    );
};

export default TopConsentDrawerExample;
