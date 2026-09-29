export interface PlainSnippetProps {
    /** The text to show, for example "npm i @zenui". */
    command: string;
    /** Shown before the command. Pass an empty string to hide it. */
    prompt?: string;
    className?: string;
}

/** A command on a gray background, for display only. */
export const PlainSnippet = ({command, prompt = "$", className = ""}: PlainSnippetProps) => (
    <div className={`bg-[#d1d1d180] text-[#000] dark:bg-slate-800 dark:text-[#abc2d3] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4 ${className}`}>
        <code>{prompt ? `${prompt} ${command}` : command}</code>
    </div>
);
