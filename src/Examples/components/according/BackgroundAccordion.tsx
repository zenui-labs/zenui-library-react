import {useId, useState} from "react";
import type {ReactNode} from "react";

export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
}

export interface BackgroundAccordionProps {
    items: AccordionItem[];
    /** Id of the open item, or null when all are closed. Pass it with `onValueChange` to control the accordion. */
    value?: string | null;
    /** Item open on first render when uncontrolled. All items start closed by default. */
    defaultValue?: string | null;
    /** Called with the id of the item that opened, or null when the open item closed. */
    onValueChange?: (value: string | null) => void;
    className?: string;
}

/** An accordion with dark headers and a light panel, so each item stays distinct while it opens and closes. */
export const BackgroundAccordion = ({
    items,
    value,
    defaultValue,
    onValueChange,
    className = "",
}: BackgroundAccordionProps) => {
    const baseId = useId();
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
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
                    <article key={item.id} className="bg-[#e5eaf2] dark:bg-transparent rounded">
                        <h3>
                            <button
                                type="button"
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className={`${
                                    isOpen ? "rounded-t-sm" : "rounded"
                                } flex gap-2 cursor-pointer items-center justify-between dark:bg-slate-800 w-full bg-gray-700 p-3 text-left`}
                                onClick={() => toggle(item.id)}
                            >
                                <span className="dark:text-[#abc2d3] text-white font-[600] text-[1.2rem]">{item.title}</span>
                                {/* A plus sign whose bars rotate into a minus when the item opens. */}
                                <svg
                                    aria-hidden
                                    className="dark:fill-[#abc2d3] fill-[#ffffff] shrink-0 ml-8"
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center transition duration-200 ease-out ${
                                            isOpen ? "!rotate-180" : ""
                                        }`}
                                    />
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                            isOpen ? "!rotate-180" : ""
                                        }`}
                                    />
                                </svg>
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-all duration-300 dark:bg-slate-900 overflow-hidden ease-in-out bg-gray-100 ${
                                isOpen ? "grid-rows-[1fr] opacity-100 px-3 py-3" : "grid-rows-[0fr] opacity-0 px-3 invisible"
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
