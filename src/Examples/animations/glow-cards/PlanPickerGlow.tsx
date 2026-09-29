import {useId, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, LayoutGroup, motion, MotionConfig} from "framer-motion";
import {LuArrowRight, LuCheck} from "react-icons/lu";

export interface Plan {
    id: string;
    name: string;
    /** Price per unit, shown after the currency symbol. */
    price: number;
    /** Short line under the price, for example "Up to 10 editors". */
    seats: string;
    highlights: string[];
}

export interface PlanPickerGlowProps {
    plans: Plan[];
    /** Selected plan id. Pass it with `onChange` to control the picker. */
    value?: string;
    /** Plan selected on first render when uncontrolled. Defaults to the first plan. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    /** Runs when the continue button is pressed, with the selected plan. */
    onContinue?: (plan: Plan) => void;
    legend?: string;
    currency?: string;
    /** Text after each price. */
    period?: string;
    /** Line next to the button that sums up the choice. */
    summary?: (plan: Plan) => ReactNode;
    continueLabel?: (plan: Plan) => string;
    className?: string;
}

const defaultSummary = (plan: Plan, currency: string): ReactNode => (
    <>
        <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span> at {currency}{plan.price} per editor, billed monthly.
    </>
);

// A glow travels to the chosen plan. The glow and the ring share a layout id, so they glide between cards
// instead of fading out in one and back in another. A fainter glow previews the card under the pointer.
export const PlanPickerGlow = ({
    plans,
    value,
    defaultValue,
    onChange,
    onContinue,
    legend = "Choose a plan for your team",
    currency = "$",
    period = "per editor / month",
    summary,
    continueLabel = (plan) => `Continue with ${plan.name}`,
    className = "",
}: PlanPickerGlowProps) => {
    const [internalSelected, setInternalSelected] = useState<string | undefined>(defaultValue ?? plans[0]?.id);
    const [hovered, setHovered] = useState<string | null>(null);
    const groupId = useId();
    const selected = value ?? internalSelected;
    const plan = plans.find((item) => item.id === selected) ?? plans[0];

    const select = (id: string) => {
        if (value === undefined) setInternalSelected(id);
        onChange?.(id);
    };

    if (!plan) return null;

    return (
        <MotionConfig transition={{type: "spring", stiffness: 260, damping: 30}} reducedMotion="user">
            <LayoutGroup id={groupId}>
                <div className={`w-full max-w-4xl ${className}`}>
                    <fieldset>
                        <legend className="mb-5 w-full text-center text-sm font-medium text-gray-600 dark:text-slate-400">{legend}</legend>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" onPointerLeave={() => setHovered(null)}>
                            {plans.map((item) => {
                                const isSelected = item.id === plan.id;
                                return (
                                    <label
                                        key={item.id}
                                        onPointerEnter={() => setHovered(item.id)}
                                        className="group relative flex cursor-pointer rounded-3xl"
                                    >
                                        <input
                                            type="radio"
                                            name={`${groupId}-plan`}
                                            value={item.id}
                                            checked={isSelected}
                                            onChange={() => select(item.id)}
                                            className="peer sr-only"
                                        />
                                        {hovered === item.id && !isSelected && (
                                            <motion.span
                                                layoutId="hover-glow"
                                                aria-hidden="true"
                                                className="pointer-events-none absolute -inset-2 rounded-[30px] bg-indigo-400/15 blur-xl dark:bg-indigo-400/15"
                                            />
                                        )}
                                        {isSelected && (
                                            <>
                                                <motion.span
                                                    layoutId="selected-glow"
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-3 rounded-[34px] bg-gradient-to-br from-indigo-500/40 via-violet-500/30 to-sky-400/40 blur-2xl dark:from-indigo-500/50 dark:via-violet-500/40 dark:to-sky-400/40"
                                                />
                                                <motion.span
                                                    layoutId="selected-ring"
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400"
                                                />
                                            </>
                                        )}
                                        <span
                                            className={`relative m-px flex flex-1 flex-col rounded-[23px] border bg-white p-6 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 dark:bg-slate-950 dark:peer-focus-visible:ring-offset-slate-950 ${
                                                isSelected ? "border-transparent" : "border-gray-200 group-hover:border-gray-300 dark:border-slate-800 dark:group-hover:border-slate-700"
                                            }`}
                                        >
                                            <span className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                                                        isSelected ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-slate-950" : "border-gray-300 dark:border-slate-600"
                                                    }`}
                                                >
                                                    <AnimatePresence>
                                                        {isSelected && (
                                                            <motion.span initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} className="flex">
                                                                <LuCheck className="h-3 w-3"/>
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </span>
                                            </span>
                                            <span className="mt-4 flex items-baseline gap-1">
                                                <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{currency}{item.price}</span>
                                                <span className="text-sm text-gray-500 dark:text-slate-400">{period}</span>
                                            </span>
                                            <span className="mt-1 text-xs text-gray-500 dark:text-slate-400">{item.seats}</span>
                                            <span className="mt-5 block space-y-2">
                                                {item.highlights.map((highlight) => (
                                                    <span key={highlight} className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
                                                        <LuCheck className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true"/>
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                        <p className="text-sm text-gray-600 dark:text-slate-400" aria-live="polite">
                            {summary ? summary(plan) : defaultSummary(plan, currency)}
                        </p>
                        <motion.button
                            type="button"
                            onClick={() => onContinue?.(plan)}
                            whileHover={{x: 2}}
                            whileTap={{scale: 0.97}}
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                        >
                            {continueLabel(plan)}
                            <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                        </motion.button>
                    </div>
                </div>
            </LayoutGroup>
        </MotionConfig>
    );
};
