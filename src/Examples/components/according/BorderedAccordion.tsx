import {useId, useState} from "react";
import type {ReactNode} from "react";
import {FaPlus} from "react-icons/fa6";

export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
}

export interface BorderedAccordionProps {
    items: AccordionItem[];
    /** Id of the open item, or null when all are closed. Pass it with `onValueChange` to control the accordion. */
    value?: string | null;
    /** Item open on first render when uncontrolled. All items start closed by default. */
    defaultValue?: string | null;
    /** Called with the id of the item that opened, or null when the open item closed. */
    onValueChange?: (value: string | null) => void;
    className?: string;
}

/** An accordion of bordered cards that opens one item at a time. The plus icon turns into a close icon when open. */
export const BorderedAccordion = ({
    items,
    value,
    defaultValue,
    onValueChange,
    className = "",
}: BorderedAccordionProps) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState<string | null>(
        defaultValue ?? null,
    );
    const openId = value !== undefined ? value : internalValue;

    const toggle = (id: string) => {
        const next = openId === id ? null : id;
        setInternalValue(next);
        onValueChange?.(next);
    };

    return (
        <div className={`flex gap-3 flex-col w-full ${className}`}>
            {items.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `${baseId}-button-${index}`;
                const panelId = `${baseId}-panel-${index}`;

                return (
                    <article key={item.id} className="border dark:border-slate-700 border-[#e5eaf2] rounded p-3">
                        <h3>
                            <button
                                type="button"
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="flex gap-2 cursor-pointer items-center justify-between w-full text-left"
                                onClick={() => toggle(item.id)}
                            >
                                <span className="text-[#3B9DF8] font-[600] text-[1.2rem]">{item.title}</span>
                                <FaPlus
                                    aria-hidden
                                    className={`shrink-0 text-[1.3rem] dark:text-slate-600 transition-all duration-300 ${
                                        isOpen ? "rotate-[45deg] !text-[#3B9DF8]" : "text-[#424242]"
                                    }`}
                                />
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                                isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 invisible"
                            }`}
                        >
                            <div className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem] overflow-hidden">
                                {item.content}
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};
