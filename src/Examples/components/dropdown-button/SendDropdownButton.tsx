import {useEffect, useId, useRef, useState, type ComponentType, type CSSProperties} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";

export interface SendOption {
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface SendDropdownButtonProps {
    /** Other ways to send, listed in the menu. The picked option's label becomes the main button's label. */
    options: SendOption[];
    /** Label of the selected option, for a controlled button. */
    value?: string;
    /** Label shown at first, for an uncontrolled button. It does not need to be one of the options. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called with the current label when the main button is clicked. */
    onAction?: (value: string) => void;
    /** Background of the main button, also used for the menu icons. */
    color?: string;
    /** Background of the arrow button. */
    toggleColor?: string;
    /** Accessible name of the arrow button. */
    toggleLabel?: string;
    className?: string;
}

/** A send button with an arrow that opens a menu of other sending options, drawn with a pointer on top. */
export const SendDropdownButton = ({
    options,
    value,
    defaultValue = "Send",
    onChange,
    onAction,
    color = "#3B9DF8",
    toggleColor = "#005fb2",
    toggleLabel = "More sending options",
    className = "",
}: SendDropdownButtonProps) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue);
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

    const handleSelect = (label: string) => {
        setInternalValue(label);
        onChange?.(label);
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
                className={`${open ? "opacity-100 z-20 translate-y-4 visible" : "opacity-0 z-[-1] translate-y-[-20px] invisible"} transition-all duration-500 flex flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] bg-white py-1 w-max dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] absolute top-[46px] rounded border border-[#e6e6e6] right-0 text-[#424242] text-[0.9rem]`}
            >
                {/* The pointer is a rotated square with two borders, placed over the menu's top edge. */}
                <li
                    aria-hidden="true"
                    className="absolute -top-[8px] dark:bg-slate-800 dark:border-slate-700 right-3 border-l border-b border-[#e6e6e6] bg-white w-[15px] h-[15px] rotate-[135deg]"
                />
                {options.map(({label, icon: Icon}) => (
                    <li key={label} className="z-20">
                        <button
                            type="button"
                            onClick={() => handleSelect(label)}
                            className="w-full text-left py-2 px-3 dark:hover:bg-slate-900/40 flex items-center gap-[8px] hover:bg-gray-50 rounded cursor-pointer"
                        >
                            <span className="text-[color:var(--split-color)]">
                                <Icon/>
                            </span>
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
