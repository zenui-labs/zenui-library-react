import {useId} from 'react';
import type {Dispatch, SetStateAction} from "react";
import {motion} from "framer-motion";
import {LuCode2, LuEye} from "react-icons/lu";

import useZenuiStore from "@/Store/Index.ts";
import {cn} from "@utils/Style.ts";

const tabs = [
    {id: "preview", label: "Preview", icon: LuEye},
    {id: "code", label: "Code", icon: LuCode2},
];

/** Copy the example with or without Tailwind `dark:` classes. Shared by every example on the site. */
export const DarkClassesSwitch = () => {
    const {withDarkClasses, handleToggle} = useZenuiStore();

    return (
        <button
            role="switch"
            aria-checked={withDarkClasses}
            onClick={handleToggle}
            title="Include dark: classes when copying code"
            className="group flex h-8 items-center gap-2 rounded-lg px-2 text-[0.78rem] text-ink-muted transition-colors hover:bg-raised hover:text-ink"
        >
            <span className="hidden 425px:inline">Copy with</span>
            <code className="font-mono text-[0.75rem] text-ink">dark:</code>
            <span
                className={cn(
                    "relative h-[18px] w-8 rounded-full border transition-colors duration-200",
                    withDarkClasses ? "border-accent bg-accent" : "border-hairline-strong bg-raised"
                )}
            >
                <span
                    className={cn(
                        "absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-white shadow transition-[left] duration-200 ease-out-expo",
                        withDarkClasses ? "left-[15px]" : "left-[2px]"
                    )}
                />
            </span>
        </button>
    );
};

interface ToggleTabProps {
    preview: boolean;
    setPreview: Dispatch<SetStateAction<boolean>>;
    setCode: Dispatch<SetStateAction<boolean>>;
    /** Kept for older call sites; the active tab is derived from `preview`. */
    code?: boolean;
}

const ToggleTab = ({preview, setPreview, setCode}: ToggleTabProps) => {
    const id = useId();
    const active = preview ? "preview" : "code";

    const select = (tab) => {
        setPreview(tab === "preview");
        setCode(tab === "code");
    };

    return (
        <div className="mt-5 flex w-full items-center justify-between gap-3">
            <div role="tablist" aria-label="Example view" className="flex items-center rounded-[10px] bg-raised p-0.5">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active === tab.id}
                        onClick={() => select(tab.id)}
                        className={cn(
                            "relative flex h-8 items-center gap-1.5 rounded-lg px-3 text-[0.82rem] font-medium transition-colors",
                            active === tab.id ? "text-ink" : "text-ink-subtle hover:text-ink-muted"
                        )}
                    >
                        {active === tab.id && (
                            <motion.span
                                layoutId={`${id}-tab`}
                                className="absolute inset-0 rounded-lg border border-hairline bg-surface shadow-card"
                                transition={{type: "spring", stiffness: 520, damping: 38}}
                            />
                        )}
                        <tab.icon className="relative size-3.5"/>
                        <span className="relative">{tab.label}</span>
                    </button>
                ))}
            </div>

            <DarkClassesSwitch/>
        </div>
    );
};

export default ToggleTab;
