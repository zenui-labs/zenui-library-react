import {toast} from "./toast";
import {Toaster} from "./Toaster";

// Every demo on this page has its own toaster, so each toast names it with toasterId.
// With one <Toaster /> in your app, leave toasterId out.
const TOASTER = "action";

// Replace these with your own logic.
const restoreFile = () => toast.success("File restored", {toasterId: TOASTER});
const refreshSession = () => toast.success("Session extended", {toasterId: TOASTER});

const ToastWithActionExample = () => (
    <div className="flex flex-wrap justify-center gap-3">
        <button
            type="button"
            onClick={() => toast.info("File deleted", {
                description: "report.pdf was moved to trash.",
                action: {label: "Undo", onClick: restoreFile},
                toasterId: TOASTER,
            })}
            className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity"
        >
            Delete file
        </button>
        <button
            type="button"
            onClick={() => toast.warning("Session expiring", {
                description: "You will be logged out in 5 minutes.",
                duration: 6000,
                action: {label: "Stay logged in", onClick: refreshSession},
                toasterId: TOASTER,
            })}
            className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity"
        >
            Expire session
        </button>
        <Toaster position="bottom-right" toasterId={TOASTER}/>
    </div>
);

export default ToastWithActionExample;
