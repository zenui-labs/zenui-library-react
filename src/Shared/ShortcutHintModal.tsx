import {motion} from "framer-motion";
import {LuKeyboard, LuX} from "react-icons/lu";

/** One-time hint about the shortcut sheet. App decides when to show it. */
const ShortcutHintModal = ({setIsOpen, onOpenSheet}: {setIsOpen: (open: boolean) => void; onOpenSheet: () => void}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 12}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
            role="status"
            className="fixed bottom-[72px] right-5 z-[700] hidden w-[300px] items-start gap-3 rounded-panel border border-hairline bg-surface p-3.5 shadow-float 1024px:flex"
        >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted">
                <LuKeyboard className="size-4"/>
            </span>
            <div className="text-[0.82rem] leading-relaxed text-ink-muted">
                <p className="font-medium text-ink">Keyboard shortcuts</p>
                <p>
                    Press <kbd className="kbd">Shift</kbd> <kbd className="kbd">Space</kbd> to{" "}
                    <button onClick={onOpenSheet} className="text-ink underline decoration-hairline-strong underline-offset-2 hover:decoration-ink">see them all</button>.
                </p>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Dismiss" className="ml-auto rounded-md p-1 text-ink-subtle hover:bg-raised hover:text-ink">
                <LuX className="size-3.5"/>
            </button>
        </motion.div>
    );
};

export default ShortcutHintModal;
