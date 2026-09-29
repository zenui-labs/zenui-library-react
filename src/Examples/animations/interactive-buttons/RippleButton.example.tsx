import {useRef, useState} from "react";
import type {MouseEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuSend} from "react-icons/lu";

interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

interface RippleButtonProps {
    children: ReactNode;
    className: string;
    rippleClassName: string;
}

// Each press spreads a circle from the exact point that was clicked.
// Keyboard presses start the ripple from the center of the button.
const RippleButtonBase = ({children, className, rippleClassName}: RippleButtonProps) => {
    const reduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const nextId = useRef(0);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const fromKeyboard = event.detail === 0;
        const x = fromKeyboard ? rect.width / 2 : event.clientX - rect.left;
        const y = fromKeyboard ? rect.height / 2 : event.clientY - rect.top;
        // Large enough to reach the farthest corner from the press point.
        const size = 2 * Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
        const id = nextId.current++;
        setRipples((current) => [...current, {id, x, y, size}]);
    };

    const removeRipple = (id: number) => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
    };

    return (
        <motion.button
            type="button"
            onClick={handleClick}
            whileTap={{scale: 0.97}}
            transition={{type: "spring", stiffness: 500, damping: 30}}
            className={`relative isolate overflow-hidden ${className}`}
        >
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    aria-hidden="true"
                    className={`pointer-events-none absolute -z-10 rounded-full ${rippleClassName}`}
                    style={{left: ripple.x - ripple.size / 2, top: ripple.y - ripple.size / 2, width: ripple.size, height: ripple.size}}
                    initial={{scale: 0, opacity: 0.5}}
                    animate={{scale: 1, opacity: 0}}
                    transition={{scale: {duration: 0.6, ease: [0.16, 1, 0.3, 1]}, opacity: {duration: 0.9, ease: "easeOut"}}}
                    onAnimationComplete={() => removeRipple(ripple.id)}
                />
            ))}
            {children}
        </motion.button>
    );
};

const RippleButton = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            <RippleButtonBase
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:focus-visible:ring-offset-slate-950"
                rippleClassName="bg-white"
            >
                <LuSend className="h-4 w-4" aria-hidden="true"/>
                Send invite
            </RippleButtonBase>

            <RippleButtonBase
                className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus-visible:ring-offset-slate-950"
                rippleClassName="bg-indigo-500 dark:bg-indigo-400"
            >
                Save draft
            </RippleButtonBase>

            <RippleButtonBase
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300"
                rippleClassName="bg-gray-900 dark:bg-white"
            >
                Cancel
            </RippleButtonBase>
        </div>
    );
};

export default RippleButton;
