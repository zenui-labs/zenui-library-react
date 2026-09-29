import {useEffect, useId, useState} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {BsChevronDown} from "react-icons/bs";

export interface YAxisStaggeredDropdownProps {
    items: string[];
    /** Text on the trigger button. */
    label?: string;
    /** Controlled open state. Leave it out to let the dropdown manage itself. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Called when an item is picked. The menu closes afterwards. */
    onSelect?: (item: string, index: number) => void;
    /** Seconds between one item and the next as they appear. */
    stagger?: number;
    className?: string;
}

const itemVariants: Variants = {
    open: ({index, stagger}: {index: number; stagger: number}) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: index * stagger,
        },
    }),
    closed: {
        opacity: 0,
        y: -20,
        transition: {duration: 0.15},
    },
};

/** A dropdown whose items drop into place from above, one after another, once the menu has opened. */
export const YAxisStaggeredDropdown = ({
    items,
    label = "Menu",
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onSelect,
    stagger = 0.05,
    className = "",
}: YAxisStaggeredDropdownProps) => {
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const isOpen = openProp ?? innerOpen;
    const menuId = useId();

    const setOpen = (next: boolean) => {
        if (openProp === undefined) setInnerOpen(next);
        onOpenChange?.(next);
    };

    // Escape closes the menu from anywhere while it is open.
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            if (openProp === undefined) setInnerOpen(false);
            onOpenChange?.(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, openProp, onOpenChange]);

    return (
        <div className={`w-full md:w-[70%] mx-auto ${className}`}>
            <motion.button
                type="button"
                whileTap={{scale: 0.97}}
                onClick={() => setOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={menuId}
                className="border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] bg-white border-[#e5eaf2] px-6 py-2 w-full rounded-md flex items-center gap-2 justify-between"
            >
                {label}
                <motion.span
                    aria-hidden
                    animate={{rotate: isOpen ? 180 : 0}}
                    transition={{duration: 0.2}}
                    style={{originX: 0.55}}
                >
                    <BsChevronDown/>
                </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.ul
                        id={menuId}
                        key="dropdown"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: {
                                height: "auto",
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                    when: "beforeChildren",
                                },
                            },
                            closed: {
                                height: 0,
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    when: "afterChildren",
                                },
                            },
                        }}
                        style={{overflow: "hidden"}}
                        className="bg-white dark:bg-slate-900 rounded-md flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2"
                    >
                        {items.map((item, index) => (
                            <motion.li key={`${index}-${item}`} custom={{index, stagger}} variants={itemVariants}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onSelect?.(item, index);
                                        setOpen(false);
                                    }}
                                    className="w-full text-left text-[1rem] font-normal py-2 px-3 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50 dark:text-[#d2e5f5] dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800"
                                >
                                    {item}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
