import {useState} from "react";
import {AlertDialog} from "./AlertDialog";

const AlertDialogExample = () => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
        <div className="flex items-center flex-col gap-5">
            <button
                type="button"
                className="px-6 py-2 border border-[#3B9DF8] rounded text-[#3B9DF8]"
                onClick={() => setOpen(true)}
            >
                Open alert dialog
            </button>
            <p className="text-sm text-gray-500 dark:text-slate-400">{deleted ? "The item was deleted." : "The item is still here."}</p>

            <AlertDialog open={open} onClose={() => setOpen(false)} onConfirm={() => setDeleted(true)}/>
        </div>
    );
};

export default AlertDialogExample;
