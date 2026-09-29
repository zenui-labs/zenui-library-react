import {useId, useState} from "react";
import {AnimatePresence, LayoutGroup, motion, MotionConfig} from "framer-motion";
import {LuArrowRight, LuCheck} from "react-icons/lu";

interface Plan {
    id: string;
    name: string;
    price: number;
    seats: string;
    highlights: string[];
}

const plans: Plan[] = [
    {id: "basic", name: "Basic", price: 9, seats: "1 editor", highlights: ["5 active boards", "Version history, 7 days"]},
    {id: "team", name: "Team", price: 24, seats: "Up to 10 editors", highlights: ["Unlimited boards", "Version history, 90 days", "Shared libraries"]},
    {id: "scale", name: "Scale", price: 49, seats: "Unlimited editors", highlights: ["Everything in Team", "SSO and audit log", "Dedicated success manager"]},
];

// A glow travels to the chosen plan. The glow and the ring share a layout id, so they glide between cards
// instead of fading out in one and back in another. A fainter glow previews the card under the pointer.
const PlanPickerGlow = () => {
    const [selected, setSelected] = useState("team");
    const [hovered, setHovered] = useState<string | null>(null);
    const groupId = useId();
    const plan = plans.find((item) => item.id === selected) ?? plans[0];

    return (
        <MotionConfig transition={{type: "spring", stiffness: 260, damping: 30}} reducedMotion="user">
            <LayoutGroup id={groupId}>
                <div className="w-full max-w-4xl">
                    <fieldset>
                        <legend className="mb-5 w-full text-center text-sm font-medium text-gray-600 dark:text-slate-400">Choose a plan for your team</legend>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" onPointerLeave={() => setHovered(null)}>
                            {plans.map((item) => {
                                const isSelected = item.id === selected;
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
                                            onChange={() => setSelected(item.id)}
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
                                                <span className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">${item.price}</span>
                                                <span className="text-sm text-gray-500 dark:text-slate-400">per editor / month</span>
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
                            <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span> at ${plan.price} per editor, billed monthly.
                        </p>
                        <motion.button
                            type="button"
                            whileHover={{x: 2}}
                            whileTap={{scale: 0.97}}
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                        >
                            Continue with {plan.name}
                            <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                        </motion.button>
                    </div>
                </div>
            </LayoutGroup>
        </MotionConfig>
    );
};

export default PlanPickerGlow;
