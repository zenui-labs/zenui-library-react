import {useEffect, useRef} from "react";
import type {ReactNode} from "react";
import {createPortal} from "react-dom";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@utils/Style.ts";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

// Locks page scroll without the layout shift from the disappearing scrollbar.
const lockScroll = () => {
    const {body, documentElement} = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const previous = {overflow: body.style.overflow, paddingRight: body.style.paddingRight};
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => Object.assign(body.style, previous);
};

/**
 * Accessible modal shell: portal, backdrop, scroll lock, Escape to close,
 * focus trap and focus restore. Content decides its own layout.
 */
interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    label: string;
    className?: string;
    align?: "center" | "top";
}

const Dialog = ({open, onClose, children, label, className, align = "center"}: DialogProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef(onClose);
    closeRef.current = onClose;

    useEffect(() => {
        if (!open) return;
        const returnFocus = document.activeElement as HTMLElement | null;
        const unlock = lockScroll();

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                closeRef.current?.();
                return;
            }
            if (event.key !== "Tab" || !panelRef.current) return;
            const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
            if (!nodes.length) return;
            const first = nodes[0];
            const last = nodes[nodes.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        requestAnimationFrame(() => {
            const target = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
            target?.focus({preventScroll: true});
        });

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            unlock();
            returnFocus?.focus?.({preventScroll: true});
        };
    }, [open]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <div
                    className={cn(
                        "pointer-events-none fixed inset-0 z-[1000] flex justify-center px-4",
                        align === "top" ? "items-start pt-[12vh]" : "items-center py-6"
                    )}
                >
                    <motion.div
                        aria-hidden="true"
                        onClick={onClose}
                        className="pointer-events-auto absolute inset-0 bg-[rgb(8_9_13/0.42)] backdrop-blur-[3px]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, pointerEvents: "none"}}
                        transition={{duration: 0.2}}
                    />
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={label}
                        className={cn(
                            "pointer-events-auto relative w-full overflow-hidden rounded-shell bg-surface text-ink shadow-overlay",
                            className
                        )}
                        initial={{opacity: 0, y: 10, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 6, scale: 0.98, pointerEvents: "none", transition: {duration: 0.15}}}
                        transition={{type: "spring", stiffness: 420, damping: 34}}
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Dialog;
