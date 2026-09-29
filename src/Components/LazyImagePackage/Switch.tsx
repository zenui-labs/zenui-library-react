import {cn} from "@utils/Style.ts";

/** A settings row with a label and a toggle. The whole row is the button. */
const Switch = ({label, description, checked, onChange}) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className="group flex w-full items-center justify-between gap-4 text-left"
        >
            <span className="min-w-0">
                <span className="block text-[0.85rem] font-medium text-ink">{label}</span>
                {description && <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-subtle">{description}</span>}
            </span>
            <span
                className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200",
                    checked ? "bg-accent" : "bg-hairline-strong"
                )}
            >
                <span
                    className={cn(
                        "size-4 rounded-full bg-white shadow-card transition-transform duration-300 ease-out-expo",
                        checked ? "translate-x-[18px]" : "translate-x-0.5"
                    )}
                />
            </span>
        </button>
    );
};

export default Switch;
