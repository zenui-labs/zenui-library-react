import type {ComponentType} from "react";
import {MdOutlineEmail} from "react-icons/md";

export interface TaskListItem {
    label: string;
    /** Icon before the label. Defaults to an envelope. */
    icon?: ComponentType<{className?: string}>;
}

export interface TaskListCardProps {
    title: string;
    items: TaskListItem[];
    /** Small line above the title. */
    eyebrow?: string;
    ctaLabel?: string;
    onItemSelect?: (item: TaskListItem, index: number) => void;
    onContinue?: () => void;
    className?: string;
}

/** A card with a title, a list of selectable rows with icons and a full width continue button. */
export const TaskListCard = ({
    title,
    items,
    eyebrow = "Reading task",
    ctaLabel = "Continue",
    onItemSelect,
    onContinue,
    className = "",
}: TaskListCardProps) => (
    <div className={`bg-white dark:bg-slate-800 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-md w-full md:max-w-[80%] px-2 ${className}`}>
        <div className="py-5 px-3">
            <span className="text-[0.9rem] dark:text-[#abc2d3] text-gray-400 font-[300]">{eyebrow}</span>
            <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-semibold leading-[28px] mt-2">{title}</h2>
        </div>

        <ul className="flex flex-col">
            {items.map((item, index) => {
                const Icon = item.icon ?? MdOutlineEmail;
                return (
                    <li key={item.label}>
                        <button
                            type="button"
                            onClick={() => onItemSelect?.(item, index)}
                            className="w-full text-left flex items-start gap-[8px] dark:hover:bg-slate-700 py-3 hover:bg-gray-100 px-3 rounded-md cursor-pointer"
                        >
                            <Icon className="text-[1.3rem] dark:text-[#abc2d3]/90 mt-[3px] shrink-0"/>
                            <span className="text-[1.1rem] dark:text-[#abc2d3]/90">{item.label}</span>
                        </button>
                    </li>
                );
            })}
        </ul>

        <div className="mx-3">
            <button
                type="button"
                onClick={onContinue}
                className="w-full mx-auto dark:bg-slate-700 dark:text-[#abc2d3] py-2.5 px-6 text-center bg-[#e9e1ff] text-[#7949ff] my-5 rounded-md"
            >
                {ctaLabel}
            </button>
        </div>
    </div>
);
