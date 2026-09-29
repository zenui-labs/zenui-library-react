import {useEffect, useRef, useState, type ComponentType, type FocusEvent, type ReactNode} from "react";
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export interface StackedToastItem {
    id: number;
    message: ReactNode;
}

export interface StackedToastsProps {
    /** Oldest first. The newest toast sits in front. */
    toasts: StackedToastItem[];
    /** Called when a toast is closed or its time runs out. Remove it from `toasts` here. */
    onDismiss: (id: number) => void;
    /** Time each toast stays, in milliseconds. 0 keeps toasts until they are closed. */
    duration?: number;
    /** How many toasts show in the collapsed stack. */
    visible?: number;
    icon?: ComponentType<{className?: string}>;
    /** Accessible label for each close button. */
    dismissLabel?: string;
    className?: string;
}

interface StackProps extends Required<Pick<StackedToastsProps, "toasts" | "onDismiss" | "visible" | "dismissLabel">> {
    icon: ComponentType<{className?: string}>;
}

const Stack = ({toasts, onDismiss, visible, icon: Icon, dismissLabel}: StackProps) => {
    // Fans the stack out while the pointer or keyboard focus is inside it.
    const [expanded, setExpanded] = useState(false);

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
    };

    return (
        <div
            className="flex flex-col items-end"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            onFocus={() => setExpanded(true)}
            onBlur={handleBlur}
        >
            {toasts.map((toast, index) => {
                const fromEnd = toasts.length - 1 - index;
                const hidden = fromEnd >= visible;
                const scale = expanded ? 1 : 1 - fromEnd * 0.04;
                const translateY = expanded ? fromEnd * -68 : fromEnd * -10;
                const opacity = hidden ? 0 : expanded ? 1 : 1 - fromEnd * 0.2;

                return (
                    <div
                        key={toast.id}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            transform: `scale(${scale}) translateY(${translateY}px)`,
                            opacity,
                            pointerEvents: hidden ? "none" : undefined,
                            transition: "all 0.3s ease",
                            zIndex: index,
                        }}
                    >
                        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg w-[280px]">
                            <Icon className="text-green-500 text-[1.1rem] shrink-0"/>
                            <p className="text-[0.85rem] dark:text-[#abc2d3] text-gray-800 flex-1">{toast.message}</p>
                            <button type="button" onClick={() => onDismiss(toast.id)} aria-label={dismissLabel}>
                                <RxCross1 className="text-gray-400 text-[0.85rem]" aria-hidden/>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

/** Toasts stacked in the style of Sonner. A few show at once, and hovering or focusing fans them out. */
export const StackedToasts = ({
    toasts,
    onDismiss,
    duration = 4000,
    visible = 3,
    icon = MdOutlineDone,
    dismissLabel = "Dismiss notification",
    className = "",
}: StackedToastsProps) => {
    const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
    // Keeps the timers pointing at the latest handler without restarting them.
    const dismissRef = useRef(onDismiss);
    useEffect(() => {
        dismissRef.current = onDismiss;
    });

    // One timer per toast. Timers of toasts that were closed early are cleared.
    useEffect(() => {
        const active = timers.current;
        const ids = new Set(toasts.map((toast) => toast.id));
        active.forEach((timer, id) => {
            if (ids.has(id)) return;
            clearTimeout(timer);
            active.delete(id);
        });
        if (duration <= 0) return;
        toasts.forEach((toast) => {
            if (active.has(toast.id)) return;
            active.set(toast.id, setTimeout(() => dismissRef.current(toast.id), duration));
        });
    }, [toasts, duration]);

    useEffect(() => {
        const active = timers.current;
        return () => {
            active.forEach(clearTimeout);
            active.clear();
        };
    }, []);

    return (
        <div aria-live="polite" className={`fixed bottom-5 right-5 z-[9999] flex flex-col items-end ${className}`}>
            {/* The stack unmounts when empty, so it never reopens already fanned out. */}
            {toasts.length > 0 && (
                <Stack toasts={toasts} onDismiss={onDismiss} visible={visible} icon={icon} dismissLabel={dismissLabel}/>
            )}
        </div>
    );
};
