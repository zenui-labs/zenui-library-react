import {useState} from "react";
import {PushNotification} from "./PushNotification";

type Shown = "auto" | "manual" | null;

const PushNotificationExample = () => {
    const [shown, setShown] = useState<Shown>(null);

    return (
        <>
            <div className="flex w-full justify-center gap-[20px] text-center">
                <button type="button" className="rounded bg-[#3B9DF8] px-4 py-2 text-white" onClick={() => setShown("auto")}>
                    Auto close
                </button>
                <button type="button" className="rounded bg-[#3B9DF8] px-4 py-2 text-white" onClick={() => setShown("manual")}>
                    Close with click
                </button>
            </div>

            <PushNotification
                open={shown === "auto"}
                onClose={() => setShown(null)}
                autoCloseAfter={3000}
                dismissible={false}
                title="Changes saved"
                message="Your profile was updated."
            />

            <PushNotification
                open={shown === "manual"}
                onClose={() => setShown(null)}
                variant="error"
                title="Upload failed"
                message="The file is larger than 10 MB."
            />
        </>
    );
};

export default PushNotificationExample;
