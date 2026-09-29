import {toast} from "./toast";
import {Toaster} from "./Toaster";

// Every demo on this page has its own toaster, so each toast names it with toasterId.
// With one <Toaster /> in your app, leave toasterId out.
const TOASTER = "promise";

// Stand-ins for real requests, such as fetch("/api/upload", {method: "POST", body: file}).
const succeedAfter = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const failAfter = (ms: number) => new Promise<void>((_, reject) => setTimeout(() => reject(new Error("Request failed")), ms));

const PromiseToastExample = () => (
    <div className="flex flex-wrap justify-center gap-3">
        <button
            type="button"
            onClick={() => toast.promise(
                succeedAfter(2000),
                {loading: "Uploading file…", success: "Upload complete", error: "Upload failed"},
                {toasterId: TOASTER},
            )}
            className="px-5 py-2 text-sm rounded bg-[#0FABCA] text-white hover:opacity-90 transition-opacity"
        >
            Upload (succeeds)
        </button>
        <button
            type="button"
            onClick={() => toast.promise(
                failAfter(2000),
                {loading: "Saving…", success: "Saved", error: "Save failed"},
                {toasterId: TOASTER},
            )}
            className="px-5 py-2 text-sm rounded bg-red-500 text-white hover:opacity-90 transition-opacity"
        >
            Save (fails)
        </button>
        <Toaster position="bottom-right" toasterId={TOASTER}/>
    </div>
);

export default PromiseToastExample;
