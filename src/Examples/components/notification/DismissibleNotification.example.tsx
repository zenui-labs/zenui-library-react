import {useState} from "react";
import {DismissibleNotification, type NotificationVariant} from "./DismissibleNotification";

interface DemoNotification {
    variant: NotificationVariant;
    label: string;
    message: string;
}

const notifications: DemoNotification[] = [
    {variant: "error", label: "Error", message: "The upload failed. Try again."},
    {variant: "info", label: "Info", message: "A new version is available."},
    {variant: "warning", label: "Warning", message: "Your trial ends in 3 days."},
    {variant: "success", label: "Success", message: "Your changes were saved."},
];

const DismissibleNotificationExample = () => {
    const [open, setOpen] = useState<Record<NotificationVariant, boolean>>({success: false, info: false, warning: false, error: false});

    const toggle = (variant: NotificationVariant, value: boolean) => setOpen((current) => ({...current, [variant]: value}));

    return (
        <div className="relative w-full overflow-hidden text-center">
            <div className="mt-24 flex w-full flex-wrap items-center justify-center gap-3">
                {notifications.map(({variant, label}) => (
                    <button key={variant} type="button" className="rounded bg-[#3B9DF8] px-4 py-2 text-white" onClick={() => toggle(variant, true)}>
                        {label}
                    </button>
                ))}
            </div>

            {notifications.map(({variant, message}) => (
                <DismissibleNotification key={variant} variant={variant} open={open[variant]} onClose={() => toggle(variant, false)}>
                    {message}
                </DismissibleNotification>
            ))}
        </div>
    );
};

export default DismissibleNotificationExample;
