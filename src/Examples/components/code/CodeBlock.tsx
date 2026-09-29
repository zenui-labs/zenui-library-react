export interface CodeBlockProps {
    /** The code to show. Line breaks and indentation are kept. */
    code: string;
    className?: string;
}

/** A gray block that shows code in a monospace font with its whitespace kept. */
export const CodeBlock = ({code, className = ""}: CodeBlockProps) => (
    <pre className={`bg-[#d1d1d180] dark:bg-slate-800 dark:text-[#abc2d3] text-[#000000] rounded-md py-1 px-4 tracking-wider font-mono font-[500] overflow-x-auto ${className}`}>
        <code>{code}</code>
    </pre>
);
