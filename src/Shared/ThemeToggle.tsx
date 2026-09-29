import {AnimatePresence, motion} from "framer-motion";
import {LuMoon, LuSun} from "react-icons/lu";
import useZenuiStore from "@/Store/Index.ts";
import {cn} from "@utils/Style.ts";

const ThemeToggle = ({className}: {className?: string}) => {
    const {theme, toggleTheme} = useZenuiStore();
    const Icon = theme === "dark" ? LuMoon : LuSun;

    return (
        <button
            onClick={toggleTheme}
            className={cn("icon-btn overflow-hidden", className)}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title="Toggle theme (Alt Z T)"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{y: 14, rotate: -45, opacity: 0}}
                    animate={{y: 0, rotate: 0, opacity: 1}}
                    exit={{y: -14, rotate: 45, opacity: 0}}
                    transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
                    className="flex"
                >
                    <Icon className="size-[17px]"/>
                </motion.span>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
