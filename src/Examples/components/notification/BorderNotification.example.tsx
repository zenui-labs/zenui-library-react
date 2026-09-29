import {useState} from "react";
import {BorderNotification} from "./BorderNotification";

const BorderNotificationExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full overflow-hidden text-center">
            <button type="button" className="mt-24 rounded bg-[#3B9DF8] px-4 py-2 text-white" onClick={() => setOpen(true)}>
                Click me
            </button>

            <BorderNotification open={open} onClose={() => setOpen(false)}>
                Click me again to close
            </BorderNotification>
        </div>
    );
};

export default BorderNotificationExample;
