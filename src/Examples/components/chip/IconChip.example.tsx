import {useState} from "react";
import {MdDone} from "react-icons/md";
import {IoMdNotifications} from "react-icons/io";
import {TbPointFilled} from "react-icons/tb";
import {IconChip} from "./IconChip";

const IconChipExample = () => {
    const [dismissed, setDismissed] = useState(false);

    return (
        <div className="flex flex-wrap items-start gap-5 justify-center">
            <IconChip variant="success" icon={MdDone}>ZenUI</IconChip>
            <IconChip variant="accent" icon={IoMdNotifications}>ZenUI</IconChip>
            <IconChip variant="neutral" icon={TbPointFilled}>ZenUI</IconChip>
            {dismissed ? (
                <button
                    type="button"
                    onClick={() => setDismissed(false)}
                    className="px-4 py-1.5 text-[0.9rem] font-[500] text-[#424242] dark:text-[#abc2d3] underline"
                >
                    Show chip again
                </button>
            ) : (
                <IconChip variant="neutral" onDismiss={() => setDismissed(true)} dismissLabel="Remove ZenUI">
                    ZenUI
                </IconChip>
            )}
        </div>
    );
};

export default IconChipExample;
