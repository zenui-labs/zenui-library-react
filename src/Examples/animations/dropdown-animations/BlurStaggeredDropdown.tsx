import {useEffect, useId, useState} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {BsChevronDown} from "react-icons/bs";

export interface BlurStaggeredDropdownProps {
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
    open: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {type: "spring", stiffness: 300, damping: 24},
    },
    closed: {
        opacity: 0,
        scale: 0.3,
        filter: "blur(20px)",
        transition: {duration: 0.2},
    },
};

/** A dropdown whose items scale up and come into focus from a blur, one after another. */
export const BlurStaggeredDropdown = ({
    items,
    label = "Menu",
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onSelect,
    stagger = 0.1,
    className = "",
}: BlurStaggeredDropdownProps) => {
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
                    style={{originY: 0.55}}
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
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.5,
                                    delayChildren: 0.3,
                                    staggerChildren: stagger,
                                },
                            },
                            closed: {
                                height: 0,
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                    staggerDirection: -1,
                                    staggerChildren: 0.06,
                                },
                            },
                        }}
                        style={{overflow: "hidden"}}
                        className="bg-white dark:bg-slate-900 rounded-md flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2"
                    >
                        {items.map((item, index) => (
                            <motion.li key={`${index}-${item}`} variants={itemVariants}>
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
