import {useId, useState, type ComponentType} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuArrowRight, LuSparkles} from "react-icons/lu";

export type StageIcon = ComponentType<{className?: string}>;

export interface Stage {
    id: string;
    /** Short step number shown on the panel, for example "01". */
    step: string;
    title: string;
    icon: StageIcon;
    description: string;
    points: string[];
    /** Tailwind gradient stops for the panel, for example "from-sky-500 to-cyan-400". */
    color: string;
}

export interface AccordionPanelsProps {
    items: Stage[];
    /** Id of the open panel when controlled. */
    value?: string;
    /** Id of the panel open on first render when uncontrolled. Defaults to the first item. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    /** Text of the button in the open panel. */
    actionLabel?: (stage: Stage) => string;
    onAction?: (stage: Stage) => void;
    className?: string;
}

const defaultActionLabel = (stage: Stage) => `See how ${stage.title.toLowerCase()} works`;

// Panels share one row. The active one grows and the rest shrink to a slim label, animated with layout.
// Hover opens a panel with a mouse; click, tap and keyboard work everywhere. On small screens the row stacks.
export const AccordionPanels = ({
    items,
    value,
    defaultValue,
    onChange,
    actionLabel = defaultActionLabel,
    onAction,
    className = "",
}: AccordionPanelsProps) => {
    const uid = useId();
    const [internalId, setInternalId] = useState<string | undefined>(defaultValue ?? items[0]?.id);
    const activeId = value ?? internalId;

    const setActiveId = (id: string) => {
        if (id === activeId) return;
        if (value === undefined) setInternalId(id);
        onChange?.(id);
    };

    return (
        <MotionConfig transition={{type: "spring", stiffness: 260, damping: 32}} reducedMotion="user">
            <div className={`w-full max-w-5xl ${className}`}>
                <div className="flex flex-col gap-2 md:h-[26rem] md:flex-row">
                    {items.map((stage) => {
                        const active = stage.id === activeId;
                        const Icon = stage.icon;
                        const panelId = `${uid}-stage-panel-${stage.id}`;
                        return (
                            <motion.div
                                key={stage.id}
                                layout
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") setActiveId(stage.id);
                                }}
                                style={{borderRadius: 24}}
                                className={`relative overflow-hidden bg-gradient-to-br text-white ${stage.color} ${
                                    active ? "min-h-[17rem] md:min-h-0 md:flex-[4]" : "min-h-[4rem] md:min-h-0 md:flex-1"
                                }`}
                            >
                                {/* Soft texture so the gradients do not look flat. */}
                                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.35),transparent_45%)]"/>

                                <button
                                    type="button"
                                    aria-expanded={active}
                                    aria-controls={panelId}
                                    onClick={() => setActiveId(stage.id)}
                                    className={`absolute inset-0 z-10 w-full rounded-[24px] text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/70 ${
                                        active ? "pointer-events-none" : ""
                                    }`}
                                >
                                    <span className="sr-only">
                                        Step {stage.step}, {stage.title}
                                    </span>
                                </button>

                                {/* Collapsed label: a row on small screens, a vertical label on wide ones. */}
                                <AnimatePresence initial={false}>
                                    {!active && (
                                        <motion.div
                                            key="label"
                                            layout="position"
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1, transition: {delay: 0.12}}}
                                            exit={{opacity: 0, transition: {duration: 0.08}}}
                                            aria-hidden="true"
                                            className="absolute inset-0 flex items-center gap-3 px-5 md:flex-col md:justify-between md:px-0 md:py-6"
                                        >
                                            <Icon className="h-5 w-5 shrink-0"/>
                                            <span className="text-sm font-semibold md:[writing-mode:vertical-rl] md:rotate-180">
                                                {stage.title}
                                            </span>
                                            <span className="ml-auto text-xs font-semibold text-white/70 md:ml-0">{stage.step}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence initial={false}>
                                    {active && (
                                        <motion.div
                                            key="content"
                                            id={panelId}
                                            layout="position"
                                            initial={{opacity: 0, y: 12}}
                                            animate={{opacity: 1, y: 0, transition: {delay: 0.15, duration: 0.3}}}
                                            exit={{opacity: 0, transition: {duration: 0.08}}}
                                            className="relative z-20 flex h-full flex-col p-6 md:w-[26rem] md:max-w-full md:p-8"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                                                    <Icon className="h-5 w-5"/>
                                                </span>
                                                <span className="text-sm font-semibold text-white/80">Step {stage.step}</span>
                                            </div>
                                            <h3 className="mt-6 text-2xl font-semibold md:text-3xl">{stage.title}</h3>
                                            <p className="mt-2 max-w-sm text-sm leading-6 text-white/90">{stage.description}</p>
                                            <ul className="mt-4 space-y-1.5 text-sm">
                                                {stage.points.map((point) => (
                                                    <li key={point} className="flex items-center gap-2">
                                                        <LuSparkles className="h-3.5 w-3.5 text-white/80" aria-hidden="true"/>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                type="button"
                                                onClick={() => onAction?.(stage)}
                                                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-transform hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:mt-auto"
                                            >
                                                {actionLabel(stage)}
                                                <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </MotionConfig>
    );
};
