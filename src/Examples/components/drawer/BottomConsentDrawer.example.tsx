import {useState} from "react";
import {BottomConsentDrawer} from "./BottomConsentDrawer";

const BottomConsentDrawerExample = () => {
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
            <BottomConsentDrawer open={open} onClose={() => setOpen(false)}/>
        </>
    );
};

export default BottomConsentDrawerExample;
