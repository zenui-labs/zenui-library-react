import {useState} from "react";
import {PositionedNotification, type NotificationPlacement, type NotificationVariant} from "./PositionedNotification";

const variants: Record<NotificationPlacement, NotificationVariant> = {
    top: "success",
    left: "info",
    right: "error",
    bottom: "warning",
};

const placements: NotificationPlacement[] = ["top", "left", "right", "bottom"];

const buttonClass = "rounded bg-[#3B9DF8] px-4 py-2 text-white";

const PositionedNotificationExample = () => {
    const [open, setOpen] = useState<Record<NotificationPlacement, boolean>>({top: false, left: false, right: false, bottom: false});

    const toggle = (placement: NotificationPlacement, value: boolean) => setOpen((current) => ({...current, [placement]: value}));

    return (
        <div className="relative w-full overflow-hidden text-center">
            <button type="button" className={`${buttonClass} mt-24`} onClick={() => toggle("top", true)}>
                Top
            </button>
            <div className="mx-auto flex w-[70%] items-center justify-between gap-8">
                <button type="button" className={`${buttonClass} mt-24`} onClick={() => toggle("left", true)}>
                    Left
                </button>
                <button type="button" className={`${buttonClass} mt-24`} onClick={() => toggle("right", true)}>
                    Right
                </button>
            </div>
            <button type="button" className={`${buttonClass} my-24`} onClick={() => toggle("bottom", true)}>
                Bottom
            </button>

            {placements.map((placement) => (
                <PositionedNotification
                    key={placement}
                    placement={placement}
                    variant={variants[placement]}
                    open={open[placement]}
                    onClose={() => toggle(placement, false)}
                >
                    Click the icon to close
                </PositionedNotification>
            ))}
        </div>
    );
};

export default PositionedNotificationExample;
