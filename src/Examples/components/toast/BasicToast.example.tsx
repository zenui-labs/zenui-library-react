import {toast} from "./toast";
import {Toaster} from "./Toaster";

// Every demo on this page has its own toaster, so each toast names it with toasterId.
// With one <Toaster /> in your app, leave toasterId out.
const TOASTER = "basic";

const BasicToastExample = () => (
    <div className="flex flex-wrap justify-center gap-2">
        <button
            type="button"
            onClick={() => toast.success("Changes saved", {description: "Your changes have been saved.", toasterId: TOASTER})}
            className="px-4 py-1.5 text-sm rounded bg-green-500 text-white hover:opacity-90 transition-opacity"
        >
            Success
        </button>
        <button
            type="button"
            onClick={() => toast.error("Could not save", {description: "Something went wrong.", toasterId: TOASTER})}
            className="px-4 py-1.5 text-sm rounded bg-red-500 text-white hover:opacity-90 transition-opacity"
        >
            Error
        </button>
        <button
            type="button"
            onClick={() => toast.warning("Check your input", {description: "Please review your input.", toasterId: TOASTER})}
            className="px-4 py-1.5 text-sm rounded bg-yellow-500 text-white hover:opacity-90 transition-opacity"
        >
            Warning
        </button>
        <button
            type="button"
            onClick={() => toast.info("Update available", {description: "A new version is ready.", toasterId: TOASTER})}
            className="px-4 py-1.5 text-sm rounded bg-blue-500 text-white hover:opacity-90 transition-opacity"
        >
            Info
        </button>
        <Toaster position="bottom-right" toasterId={TOASTER}/>
    </div>
);

export default BasicToastExample;
