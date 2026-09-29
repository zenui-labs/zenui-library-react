import {useEffect, useId, useRef, useState, type CSSProperties} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";

export interface PublishDropdownButtonProps {
    /** Options listed in the menu. The picked option becomes the main button's label. */
    options: string[];
    /** The selected option, for a controlled button. */
    value?: string;
    /** The option selected at first, for an uncontrolled button. Defaults to the first option. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called with the selected option when the main button is clicked. */
    onAction?: (value: string) => void;
    /** Background of the main button. */
    color?: string;
    /** Background of the arrow button. */
    toggleColor?: string;
    /** Accessible name of the arrow button. */
    toggleLabel?: string;
    className?: string;
}

/** A split button: the main part runs the selected option and the arrow opens a menu to pick another one. */
export const PublishDropdownButton = ({
    options,
    value,
    defaultValue,
    onChange,
    onAction,
    color = "#3B9DF8",
    toggleColor = "#005fb2",
    toggleLabel = "More publish options",
    className = "",
}: PublishDropdownButtonProps) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? options[0] ?? "");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const selected = value ?? internalValue;

    // Closes the menu on a click outside this button or on Escape.
    useEffect(() => {
        if (!open) return;
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleSelect = (option: string) => {
        setInternalValue(option);
        onChange?.(option);
        setOpen(false);
    };

    const style: CSSProperties & Record<"--split-color" | "--split-toggle-color", string> = {
        "--split-color": color,
        "--split-toggle-color": toggleColor,
    };

    return (
        <div
            ref={rootRef}
            style={style}
            className={`flex items-center rounded bg-[color:var(--split-color)] border-none outline-none text-[#fff] justify-between relative ${className}`}
        >
            <button
                type="button"
                onClick={() => onAction?.(selected)}
                className={`text-[1rem] px-6 py-1.5 transition-all duration-500 ${onAction ? "" : "cursor-auto"}`}
            >
                {selected}
            </button>

            <button
                ref={toggleRef}
                type="button"
                aria-label={toggleLabel}
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((current) => !current)}
                className="bg-[color:var(--split-toggle-color)] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r"
            >
                <MdKeyboardArrowDown className="text-[2rem]" aria-hidden="true"/>
            </button>

            <ul
                id={menuId}
                className={`${open ? "opacity-100 z-20 translate-y-0 visible" : "opacity-0 z-[-1] translate-y-[-5px] invisible"} dark:bg-slate-800 dark:text-[#abc2d3] transition-all duration-500 flex flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] bg-white absolute top-[46px] rounded right-0 text-[#424242] text-[0.9rem]`}
            >
                {options.map((option) => (
                    <li key={option}>
                        <button
                            type="button"
                            onClick={() => handleSelect(option)}
                            className="w-full text-left py-2 px-6 hover:bg-gray-50 dark:hover:bg-slate-900/40 rounded cursor-pointer"
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
