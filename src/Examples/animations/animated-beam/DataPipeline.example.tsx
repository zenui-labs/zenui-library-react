import {Fragment, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCheck, LuDatabase, LuDownload, LuFilter, LuSparkles} from "react-icons/lu";

interface Stage {
    id: string;
    label: string;
    detail: string;
    icon: IconType;
}

const stages: Stage[] = [
    {id: "ingest", label: "Ingest", detail: "12,480 events", icon: LuDownload},
    {id: "clean", label: "Clean", detail: "164 dropped", icon: LuFilter},
    {id: "enrich", label: "Enrich", detail: "+ geo, plan", icon: LuSparkles},
    {id: "load", label: "Load", detail: "to warehouse", icon: LuDatabase},
];

// The run moves through steps: even steps process a stage, odd steps send a packet down a connector.
const STEP_MS = 850;
const LAST_STEP = stages.length * 2 - 2;

type StageState = "idle" | "running" | "done";

const stageState = (index: number, step: number): StageState => {
    if (step > index * 2) return "done";
    if (step === index * 2) return "running";
    return "idle";
};

interface ConnectorProps {
    active: boolean;
    filled: boolean;
    animated: boolean;
    runKey: number;
}

// A connector that is horizontal from the md breakpoint and vertical below it.
const Connector = ({active, filled, animated, runKey}: ConnectorProps) => (
    <div aria-hidden="true" className="relative mx-auto h-8 w-0.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800 md:mx-0 md:h-0.5 md:w-auto md:flex-1">
        <motion.span
            className="absolute inset-0 origin-top bg-indigo-500/40 md:origin-left dark:bg-indigo-400/40"
            initial={false}
            animate={{opacity: filled ? 1 : 0}}
            transition={{duration: 0.4}}
        />
        {active && animated && (
            <Fragment key={runKey}>
                <motion.span
                    className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-indigo-400 to-cyan-300 md:hidden"
                    initial={{y: "-100%"}}
                    animate={{y: "200%"}}
                    transition={{duration: STEP_MS / 1000, ease: [0.45, 0, 0.55, 1]}}
                />
                <motion.span
                    className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-transparent via-indigo-400 to-cyan-300 md:block"
                    initial={{x: "-100%"}}
                    animate={{x: "200%"}}
                    transition={{duration: STEP_MS / 1000, ease: [0.45, 0, 0.55, 1]}}
                />
            </Fragment>
        )}
    </div>
);

// An ETL run that moves through four stages. Each stage spins while it works, then a packet
// travels down the connector to the next one. The run repeats while the diagram is on screen.
const DataPipeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {amount: 0.4});
    const reduceMotion = useReducedMotion();
    const [step, setStep] = useState(0);
    const [run, setRun] = useState(1);

    useEffect(() => {
        if (!inView) return;
        // Hold on the finished state a little longer before the next run starts.
        const delay = step > LAST_STEP ? 2200 : STEP_MS;
        const timer = window.setTimeout(() => {
            if (step > LAST_STEP) {
                setStep(0);
                setRun((value) => value + 1);
            } else {
                setStep((value) => value + 1);
            }
        }, delay);
        return () => window.clearTimeout(timer);
    }, [inView, step]);

    const finished = step > LAST_STEP;
    const animated = !reduceMotion;

    return (
        <figure ref={ref} className="w-full max-w-3xl">
            <div className="mx-auto flex max-w-sm flex-col items-stretch gap-2 md:max-w-none md:flex-row md:items-center md:gap-3">
                {stages.map((stage, index) => {
                    const state = stageState(index, step);
                    const Icon = stage.icon;
                    return (
                        <Fragment key={stage.id}>
                            <div
                                className={`relative flex items-center gap-3 rounded-2xl border bg-white p-3 transition-colors duration-500 dark:bg-slate-900 md:w-36 md:flex-col md:items-start ${
                                    state === "idle" ? "border-gray-200 dark:border-slate-800" : "border-indigo-200 dark:border-indigo-500/40"
                                }`}
                            >
                                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                                    <span
                                        className={`absolute inset-0 rounded-xl transition-colors duration-500 ${
                                            state === "idle" ? "bg-gray-100 dark:bg-slate-800" : "bg-indigo-50 dark:bg-indigo-500/15"
                                        }`}
                                    />
                                    {state === "running" && animated && (
                                        <motion.span
                                            className="absolute -inset-1 rounded-[14px] border-2 border-transparent border-t-indigo-500 dark:border-t-indigo-400"
                                            animate={{rotate: 360}}
                                            transition={{duration: 0.8, repeat: Infinity, ease: "linear"}}
                                        />
                                    )}
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={state === "done" ? "done" : "icon"}
                                            initial={{scale: 0.4, opacity: 0}}
                                            animate={{scale: 1, opacity: 1}}
                                            exit={{scale: 0.4, opacity: 0}}
                                            transition={{type: "spring", stiffness: 500, damping: 25}}
                                            className={`relative ${state === "idle" ? "text-gray-400 dark:text-slate-500" : "text-indigo-600 dark:text-indigo-300"}`}
                                        >
                                            {state === "done" ? <LuCheck className="h-5 w-5" aria-hidden="true"/> : <Icon className="h-5 w-5" aria-hidden="true"/>}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{stage.label}</p>
                                    <p className="text-xs tabular-nums text-gray-500 dark:text-slate-400">{stage.detail}</p>
                                </div>
                                <span className="ml-auto text-[11px] font-medium text-gray-400 dark:text-slate-500 md:absolute md:right-3 md:top-3">
                                    {state === "running" ? "Running" : state === "done" ? "Done" : "Queued"}
                                </span>
                            </div>
                            {index < stages.length - 1 && (
                                <Connector
                                    active={step === index * 2 + 1}
                                    filled={step > index * 2 + 1}
                                    animated={animated}
                                    runKey={run}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </div>

            <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-gray-500 dark:text-slate-400">
                <span className="font-medium text-gray-900 dark:text-white">Nightly sync, run #{1840 + run}</span>
                <span aria-live="polite">{finished ? "12,316 rows loaded in 3.4s" : `Working on ${stages[Math.min(stages.length - 1, Math.floor(step / 2))].label.toLowerCase()}`}</span>
            </figcaption>
        </figure>
    );
};

export default DataPipeline;
