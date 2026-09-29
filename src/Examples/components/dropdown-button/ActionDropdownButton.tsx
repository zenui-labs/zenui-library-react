import {useEffect, useId, useRef, useState, type ComponentType, type CSSProperties} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";

export interface DropdownAction {
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface ActionDropdownButtonProps {
    /** Actions listed in the menu. The picked action's label becomes the main button's label. */
    actions: DropdownAction[];
    /** Label of the selected action, for a controlled button. */
    value?: string;
    /** Label selected at first, for an uncontrolled button. Defaults to the first action. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called with the selected label when the main button is clicked. */
    onAction?: (value: string) => void;
    /** Background of the main button. */
    color?: string;
    /** Background of the arrow button. */
    toggleColor?: string;
    /** Accessible name of the arrow button. */
    toggleLabel?: string;
    className?: string;
}

/** A split button with a menu of actions, each with an icon. Picking one makes it the main action. */
export const ActionDropdownButton = ({
    actions,
    value,
    defaultValue,
    onChange,
    onAction,
    color = "#3B9DF8",
    toggleColor = "#005fb2",
    toggleLabel = "More actions",
    className = "",
}: ActionDropdownButtonProps) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? actions[0]?.label ?? "");
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
                className={`${open ? "opacity-100 z-20 translate-y-0 visible" : "opacity-0 z-[-1] translate-y-[-5px] invisible"} dark:bg-slate-800 dark:text-[#abc2d3] transition-all duration-500 flex flex-col shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] bg-white py-1 w-full absolute top-[46px] rounded right-0 text-[#424242] text-[0.9rem]`}
            >
                {actions.map(({label, icon: Icon}) => (
                    <li key={label}>
                        <button
                            type="button"
                            onClick={() => handleSelect(label)}
                            className="w-full text-left py-2 px-3 flex items-center dark:hover:bg-slate-900/40 gap-[5px] hover:bg-gray-50 rounded cursor-pointer"
                        >
                            <Icon/>
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
