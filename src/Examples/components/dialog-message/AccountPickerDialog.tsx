import {useEffect, useId, useRef} from "react";
import {RxCross1} from "react-icons/rx";
import {FaUser} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";

export interface AccountPickerDialogProps {
    open: boolean;
    /** Called when the dialog should close: the close button, a click on the backdrop, Escape, or after a pick. */
    onClose: () => void;
    /** Account names or email addresses to choose from. */
    accounts: string[];
    onSelect?: (account: string) => void;
    /** Called when the add account row is picked. Leave it out to hide that row. */
    onAddAccount?: () => void;
    title?: string;
    addAccountLabel?: string;
    /** Accessible name of the close button. */
    closeLabel?: string;
    className?: string;
}

/** A modal dialog that lists accounts to pick from, with an optional row for adding a new one. */
export const AccountPickerDialog = ({
    open,
    onClose,
    accounts,
    onSelect,
    onAddAccount,
    title = "Set backup account",
    addAccountLabel = "Add account",
    closeLabel = "Close",
    className = "",
}: AccountPickerDialogProps) => {
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    // Kept in a ref so a new onClose function on each render does not rerun the focus effect.
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    });

    // Moves focus into the dialog, closes it on Escape, and returns focus to the opener when it closes.
    useEffect(() => {
        if (!open) return;
        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        panelRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            opener?.focus();
        };
    }, [open]);

    if (!open) return null;

    const handleSelect = (account: string) => {
        onSelect?.(account);
        onClose();
    };

    const handleAddAccount = () => {
        onAddAccount?.();
        onClose();
    };

    return (
        <div className="bg-[#00000027] z-[200000000000] fixed flex items-center justify-center top-0 left-0 w-full h-screen">
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                onClick={onClose}
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`w-[300px] h-auto py-3 dark:bg-slate-800 bg-white rounded relative z-10 focus:outline-none ${className}`}
            >
                <div className="w-full flex items-end justify-end px-3">
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="rounded-full">
                        <RxCross1
                            aria-hidden="true"
                            className="text-[2rem] dark:text-slate-200 dark:bg-slate-900/40 p-2 bg-[#3d3d3d18] text-[#222222] rounded-full cursor-pointer"
                        />
                    </button>
                </div>
                <h2 id={titleId} className="text-[1.2rem] text-[#424242] dark:text-[#abc2d3] font-[500] px-6 py-3">
                    {title}
                </h2>
                {accounts.map((account) => (
                    <button
                        key={account}
                        type="button"
                        onClick={() => handleSelect(account)}
                        className="w-full text-left flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                    >
                        <span aria-hidden="true">
                            <FaUser className="text-[2rem] text-[#1b703f] p-2 dark:bg-green-800/30 dark:text-green-500 rounded-full bg-[#15a7522d]"/>
                        </span>
                        {account}
                    </button>
                ))}
                {onAddAccount && (
                    <button
                        type="button"
                        onClick={handleAddAccount}
                        className="w-full text-left flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                    >
                        <span aria-hidden="true">
                            <FaPlus className="text-[2rem] text-[#303030] p-2 dark:text-gray-300 dark:bg-gray-700 rounded-full bg-[#3d3d3d2c]"/>
                        </span>
                        {addAccountLabel}
                    </button>
                )}
            </div>
        </div>
    );
};
