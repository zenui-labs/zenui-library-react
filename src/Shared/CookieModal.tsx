import {useEffect} from "react";
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";

const STORAGE_KEY = "zenUICookiesAccepted";

const CookieModal = ({isModalOpen, setisModalOpen}: {isModalOpen: boolean; setisModalOpen: (open: boolean) => void}) => {
    useEffect(() => {
        let saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch { /* storage blocked */ }
        if (saved) return;
        const timer = setTimeout(() => setisModalOpen(true), 6000);
        return () => clearTimeout(timer);
    }, [setisModalOpen]);

    const close = (choice) => {
        try {
            localStorage.setItem(STORAGE_KEY, choice);
        } catch { /* storage blocked */ }
        setisModalOpen(false);
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 16}}
                    transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                    role="dialog"
                    aria-label="Cookie notice"
                    className="fixed bottom-4 left-4 right-4 z-[750] rounded-panel border border-hairline bg-surface p-4 shadow-float 640px:right-auto 640px:w-[380px]"
                >
                    <p className="text-[0.875rem] font-medium text-ink">Cookies</p>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">
                        We use cookies for analytics so we can see which components people use.
                        Read the <Link to="/privacy-policy" className="text-ink underline underline-offset-2">privacy policy</Link>.
                    </p>
                    <div className="mt-3.5 flex gap-2">
                        <button onClick={() => close("true")} className="btn-primary h-9 flex-1">Accept</button>
                        <button onClick={() => close("declined")} className="btn-ghost h-9 flex-1">Decline</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieModal;
