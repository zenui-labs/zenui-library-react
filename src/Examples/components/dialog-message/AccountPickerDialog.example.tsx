import {useState} from "react";
import {AccountPickerDialog} from "./AccountPickerDialog";

const accounts: string[] = ["user@gmail.com", "user02@gmail.com"];

const AccountPickerDialogExample = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Please select");

    return (
        <div className="flex items-center flex-col gap-5">
            <p className="text-[#424242] dark:text-[#abc2d3]">Selected: {selected}</p>

            <button
                type="button"
                className="px-6 py-2 border border-[#3B9DF8] rounded text-[#3B9DF8]"
                onClick={() => setOpen(true)}
            >
                Open dialog
            </button>

            <AccountPickerDialog
                open={open}
                onClose={() => setOpen(false)}
                accounts={accounts}
                onSelect={setSelected}
                onAddAccount={() => setSelected("New account")}
            />
        </div>
    );
};

export default AccountPickerDialogExample;
