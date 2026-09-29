import {useId} from "react";

const THUMB = 16;

/** Range input with a labeled value. The native input stays on top for pointer and keyboard use. */
const Slider = ({label, value, onChange, min = 0, max = 100, step = 1, unit = ""}) => {
    const id = useId();
    const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
    // Keep the thumb inside the track at both ends, like the native thumb.
    const left = `calc(${percent}% + ${(0.5 - percent / 100) * THUMB}px)`;

    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <label htmlFor={id} className="text-[0.85rem] font-medium text-ink">{label}</label>
                <span className="font-mono text-[0.78rem] tabular-nums text-ink-muted">{value}{unit}</span>
            </div>
            <div className="relative mt-2.5 flex h-5 items-center">
                <input
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(event) => onChange(Math.round(Number(event.target.value)))}
                    className="peer absolute inset-0 z-10 w-full cursor-pointer opacity-0"
                />
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-raised ring-1 ring-inset ring-hairline">
                    <div className="h-full rounded-full bg-accent" style={{width: `${percent}%`}}/>
                </div>
                <div
                    className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-surface shadow-card peer-focus-visible:ring-4 peer-focus-visible:ring-accent/25"
                    style={{left}}
                />
            </div>
        </div>
    );
};

export default Slider;
