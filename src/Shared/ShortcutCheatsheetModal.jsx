import {GoPlus} from "react-icons/go";
import {RxCross1} from "react-icons/rx";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useState} from "react";
import {PiOptionBold} from "react-icons/pi";

const shortcuts = [
    {keys: ["Alt", "Z", "T"], description: "Toggle theme"},
    {keys: ["Alt", "Z", "H"], description: "Go to Home page"},
    {keys: ["Alt", "Z", "M"], description: "Go to Templates"},
    {keys: ["Alt", "Z", "C"], description: "Go to Components"},
    {keys: ["Alt", "Z", "B"], description: "Go to Blocks"},
    {keys: ["Alt", "Z", "A"], description: "Go to Animations"},
    {keys: ["Alt", "Z", "R"], description: "Go to Resources"},
    {keys: ["Alt", "Z", "I"], description: "Go to Installation"},
    {keys: ["Alt", "Z", "K"], description: "Go to Custom Hooks"},
    {keys: ["Alt", "Z", "G"], description: "Open Config Generator"},
    {keys: ["Alt", "Z", "P"], description: "Open Color Palettes"},
    {keys: ["Alt", "Z", "O"], description: "Open Icons Tool"},
    {keys: ["Alt", "Z", "S"], description: "Open Shortcut Generator"},
    {keys: ["Alt", "Z", "N"], description: "Open ZenUI npm package"},
    {keys: ["Space"], description: "Show shortcut cheatsheet modal"},
];

const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
    exit: {opacity: 0},
};

const modalVariants = {
    hidden: {opacity: 0, scale: 0.95},
    visible: {opacity: 1, scale: 1},
    exit: {opacity: 0, scale: 0.95},
};

export default function ShortcutCheatsheetModal({isOpen, setIsOpen}) {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(isMacOS());
    }, []);

    function isMacOS() {
        if (typeof window === "undefined") return false;
        return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    }

    function handleModalClose() {
        document.querySelector('body').style.overflow = "auto";
        setIsOpen(false)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{type: "spring", damping: 15, stiffness: 300}}
                        className="bg-white dark:bg-slate-800 w-[95%] 640px:w-[90%] max-w-3xl max-h-[90vh] rounded-xl shadow-xl p-6 relative"
                    >
                        <button
                            className="absolute top-4 right-4 text-xl font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                            onClick={handleModalClose}
                        >
                            <RxCross1 className="text-[1rem]"/>
                        </button>
                        <h2 className="text-[1.6rem] 640px:text-2xl font-semibold mb-6 text-center dark:text-darkTextColor">
                            ZenUI Keyboard Shortcuts
                        </h2>

                        <div
                            className="rounded-normal overflow-hidden border border-border dark:border-slate-700 overflow-y-auto overflow-x-auto h-[65vh] 640px:h-[75vh] zenui_code_snippet">
                            <table className="w-full text-left min-w-[500px] text-sm dark:text-darkTextColor">
                                <thead
                                    className="border-b sticky top-0 left-0 border-border bg-gray-100 dark:bg-slate-900 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 border-r border-border dark:border-slate-700">Shortcut</th>
                                    <th className="px-6 py-4">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {shortcuts.map((item, i) => (
                                    <tr
                                        key={i}
                                        className={`${
                                            i < shortcuts.length - 1 && "border-b"
                                        } border-border dark:border-slate-700`}
                                    >
                                        <td className="px-6 py-3 border-r w-[180px] border-border dark:border-slate-700">
                                            <div className="flex items-center gap-1">
                                                {item.keys.map((key, index) => {
                                                    const displayKey = isMac && key === "Alt" ?
                                                        <PiOptionBold size={17}/> : key;
                                                    return (
                                                        <span key={index} className="flex items-center gap-1">
                                                            {index > 0 && (
                                                                <GoPlus className="text-gray-500"/>
                                                            )}
                                                            <kbd
                                                                className={`${(isMac && key === 'Alt') && 'py-[5px]'} bg-gray-300/50 font-mono text-black/60 px-2 font-semibold py-1 rounded text-[0.8rem] dark:text-darkSubTextColor dark:bg-slate-900/70`}>
                                                                {displayKey}
                                                            </kbd>
                                                        </span>
                                                    )
                                                })
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 font-medium text-black/70 dark:text-darkSubTextColor">
                                            {item.description}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
