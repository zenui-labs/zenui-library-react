import {useState} from "react";
import {InfoModal} from "./InfoModal";

const InfoModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            <InfoModal open={open} onClose={() => setOpen(false)} title="Modal header">
                <p>You are reading this text in a modal.</p>
            </InfoModal>
        </>
    );
};

export default InfoModalExample;
