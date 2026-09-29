import {useState} from "react";
import {DeleteConfirmModal} from "./DeleteConfirmModal";

const DeleteConfirmModalExample = () => {
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return (
        <div className="flex flex-col items-center gap-3">
            <button
                type="button"
                className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded"
                onClick={() => {
                    setDeleted(false);
                    setOpen(true);
                }}
            >
                Open modal
            </button>
            {deleted && <p className="text-sm text-gray-500 dark:text-slate-400">The item was deleted.</p>}
            <DeleteConfirmModal open={open} onClose={() => setOpen(false)} onConfirm={() => setDeleted(true)}/>
        </div>
    );
};

export default DeleteConfirmModalExample;
