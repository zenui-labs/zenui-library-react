import {useState} from "react";
import {SuccessModal} from "./SuccessModal";

const SuccessModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            <SuccessModal open={open} onClose={() => setOpen(false)}/>
        </>
    );
};

export default SuccessModalExample;
