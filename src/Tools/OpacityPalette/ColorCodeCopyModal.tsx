import {useState} from 'react';
import tinycolor from "tinycolor2";
import {LuCheck, LuCopy, LuX} from "react-icons/lu";

import Dialog from "@shared/Dialog.tsx";
import {cn} from "@utils/Style.ts";

const formats = [
    {key: 'hex', label: 'HEX'},
    {key: 'rgb', label: 'RGB'},
    {key: 'hsl', label: 'HSL'},
];

const ColorCodeCopyModal = ({open, onClose, clipboardColor}) => {
    const [copied, setCopied] = useState(null);
    const {hex, step} = clipboardColor;
    const isLight = hex ? tinycolor(hex).isLight() : true;

    const handleCopy = (key, value) => {
        window.navigator.clipboard.writeText(value);
        setCopied(key);
        setTimeout(() => setCopied((current) => (current === key ? null : current)), 1200);
    };

    return (
        <Dialog open={open} onClose={onClose} label="Copy color" className="max-w-[400px]">
            <div
                className={cn("relative flex h-32 items-end justify-between p-4", isLight ? "text-[#0b0d12]" : "text-white")}
                style={{backgroundColor: hex}}
            >
                <div>
                    {step && <p className="text-[0.75rem] font-medium opacity-70">Step {step}</p>}
                    <p className="font-mono text-[1.15rem] font-medium">{hex}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={cn(
                        "absolute right-3 top-3 flex size-8 items-center justify-center rounded-[10px] transition-colors",
                        isLight ? "hover:bg-black/10" : "hover:bg-white/15"
                    )}
                >
                    <LuX className="size-4"/>
                </button>
            </div>

            <div className="p-2">
                {formats.map(({key, label}) => {
                    const value = clipboardColor[key];
                    const done = copied === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleCopy(key, value)}
                            data-autofocus={key === 'hex' ? true : undefined}
                            className="group flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-raised"
                        >
                            <span className="w-9 shrink-0 text-[0.75rem] font-medium text-ink-subtle">{label}</span>
                            <span className="min-w-0 flex-1 truncate font-mono text-[0.88rem] text-ink">{value}</span>
                            <span className={cn(
                                "flex items-center gap-1 text-[0.75rem] transition-colors",
                                done ? "text-accent-strong" : "text-ink-subtle group-hover:text-ink"
                            )}>
                                {done ? <LuCheck className="size-3.5"/> : <LuCopy className="size-3.5"/>}
                                {done ? 'Copied' : 'Copy'}
                            </span>
                        </button>
                    );
                })}
            </div>
        </Dialog>
    );
};

export default ColorCodeCopyModal;
