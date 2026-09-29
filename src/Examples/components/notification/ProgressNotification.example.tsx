import {useState} from "react";
import {ProgressNotification} from "./ProgressNotification";

const ProgressNotificationExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="rounded bg-[#3B9DF8] px-4 py-2 text-white" onClick={() => setOpen(true)}>
                Show notification
            </button>

            <ProgressNotification
                open={open}
                onClose={() => setOpen(false)}
                title="Export complete"
                message="Your report is ready to download."
            />
        </>
    );
};

export default ProgressNotificationExample;
