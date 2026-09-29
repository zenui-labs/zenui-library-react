import {useState} from "react";
import {AlertModal} from "./AlertModal";

const AlertModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            <AlertModal open={open} onClose={() => setOpen(false)}/>
        </>
    );
};

export default AlertModalExample;
