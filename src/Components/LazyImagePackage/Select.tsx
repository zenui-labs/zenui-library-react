import {useId} from "react";
import {cn} from "@utils/Style.ts";

/** Segmented control for a short list of options. Arrow keys move the selection. */
const Select = ({value, label, options, onChange}) => {
    const labelId = useId();

    const onKeyDown = (event) => {
        const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const current = options.findIndex((option) => option.value === value);
        const next = options[(current + step + options.length) % options.length];
        onChange(next.value);
        event.currentTarget.querySelector(`[data-value="${next.value}"]`)?.focus();
    };

    return (
        <div>
            <p id={labelId} className="text-[0.85rem] font-medium text-ink">{label}</p>
            <div
                role="radiogroup"
                aria-labelledby={labelId}
                onKeyDown={onKeyDown}
                className="mt-2 grid gap-0.5 rounded-[10px] border border-hairline bg-raised p-0.5"
                style={{gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`}}
            >
                {options.map((option) => {
                    const active = option.value === value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            tabIndex={active ? 0 : -1}
                            data-value={option.value}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                "h-8 truncate rounded-lg px-2 text-[0.82rem] font-medium transition-colors",
                                active ? "bg-surface text-ink shadow-card" : "text-ink-subtle hover:text-ink"
                            )}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Select;
