import {useEffect, useRef, useState} from "react";
import {MdOutlineDone} from "react-icons/md";
import {GoCopy} from "react-icons/go";

export type SnippetTone = "accent" | "neutral";

const tones: Record<SnippetTone, string> = {
    accent: "border border-[#3B9DF8] dark:border-blue-800 text-[#3B9DF8]",
    neutral: "border border-[#e5eaf2] dark:border-slate-700 dark:text-[#abc2d3] text-[#424242]",
};

export interface BorderedSnippetProps {
    /** The text that is shown and copied, for example "npm i @zenui". */
    command: string;
    /** Shown before the command but not copied. Pass an empty string to hide it. */
    prompt?: string;
    /** Called with the copied text after a successful copy. */
    onCopy?: (text: string) => void;
    /** How long the done icon stays, in milliseconds. */
    resetAfter?: number;
    copyLabel?: string;
    copiedLabel?: string;
    /** "accent" draws a blue border and text, "neutral" a gray one. */
    tone?: SnippetTone;
    className?: string;
}

/** A command in an outlined box with a button that copies it. */
export const BorderedSnippet = ({
    command,
    prompt = "$",
    onCopy,
    resetAfter = 1000,
    copyLabel = "Copy command",
    copiedLabel = "Copied",
    tone = "accent",
    className = "",
}: BorderedSnippetProps) => {
    const [isCopy, setIsCopy] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(command);
            setIsCopy(true);
            onCopy?.(command);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setIsCopy(false), resetAfter);
        } catch {
            setIsCopy(false);
        }
    };

    return (
        <div className={`${tones[tone]} rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4 ${className}`}>
            <code>{prompt ? `${prompt} ${command}` : command}</code>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={isCopy ? copiedLabel : copyLabel}
                className="flex items-center rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
                <GoCopy
                    aria-hidden
                    className={`${isCopy ? " opacity-0 hidden" : " opacity-100 flex"} transition-all duration-300`}
                />
                <MdOutlineDone
                    aria-hidden
                    className={`${isCopy ? " opacity-100 flex" : " opacity-0 hidden"} transition-all duration-300`}
                />
            </button>
            <span className="sr-only" aria-live="polite">{isCopy ? copiedLabel : ""}</span>
        </div>
    );
};
