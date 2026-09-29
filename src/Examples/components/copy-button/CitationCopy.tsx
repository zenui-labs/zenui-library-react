import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuClipboardCopy, LuQuote} from "react-icons/lu";

export type CitationStyle = "apa" | "mla" | "chicago" | "bibtex";

export interface Author {
    first: string;
    last: string;
}

export interface Paper {
    /** At least one author, in the order they appear on the paper. */
    authors: Author[];
    title: string;
    journal: string;
    year: number;
    volume: number;
    issue: number;
    /** Page range with a hyphen, for example "118-134". */
    pages: string;
    /** DOI without the https://doi.org/ prefix. */
    doi: string;
}

const styles: {id: CitationStyle; label: string}[] = [
    {id: "apa", label: "APA"},
    {id: "mla", label: "MLA"},
    {id: "chicago", label: "Chicago"},
    {id: "bibtex", label: "BibTeX"},
];

const initial = (name: string) => `${name[0]}.`;

// "A", "A, & B", "A, B, & C": APA keeps the comma before the ampersand.
const apaAuthors = (authors: Author[]) => {
    const names = authors.map((person) => `${person.last}, ${initial(person.first)}`);
    return names.length > 1 ? `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}` : names[0];
};

// MLA names the first author and adds "et al." from three authors on. The result ends with a period.
const mlaAuthors = ([first, second, ...rest]: Author[]) => {
    const lead = `${first.last}, ${first.first}`;
    if (rest.length) return `${lead}, et al.`;
    if (second) return `${lead}, and ${second.first} ${second.last}.`;
    return `${lead}.`;
};

// Chicago inverts the first name only and joins the last one with "and".
const chicagoAuthors = ([first, ...rest]: Author[]) => {
    const lead = `${first.last}, ${first.first}`;
    if (!rest.length) return lead;
    const others = rest.map((person) => `${person.first} ${person.last}`);
    return `${[lead, ...others.slice(0, -1)].join(", ")}, and ${others[others.length - 1]}`;
};

// Each style returns plain text for the clipboard and a formatted version for the preview.
const cite = (paper: Paper, style: CitationStyle): {text: string; view: ReactNode} => {
    const pageRange = paper.pages;
    if (style === "apa") {
        const authors = apaAuthors(paper.authors);
        const text = `${authors} (${paper.year}). ${paper.title}. ${paper.journal}, ${paper.volume}(${paper.issue}), ${pageRange}. https://doi.org/${paper.doi}`;
        return {
            text,
            view: (
                <>
                    {authors} ({paper.year}). {paper.title}. <i>{paper.journal}, {paper.volume}</i>({paper.issue}), {pageRange}. https://doi.org/{paper.doi}
                </>
            ),
        };
    }
    if (style === "mla") {
        const authors = mlaAuthors(paper.authors);
        const text = `${authors} "${paper.title}." ${paper.journal}, vol. ${paper.volume}, no. ${paper.issue}, ${paper.year}, pp. ${pageRange}.`;
        return {
            text,
            view: (
                <>
                    {authors} “{paper.title}.” <i>{paper.journal}</i>, vol. {paper.volume}, no. {paper.issue}, {paper.year}, pp. {pageRange}.
                </>
            ),
        };
    }
    if (style === "chicago") {
        const authors = chicagoAuthors(paper.authors);
        const text = `${authors}. "${paper.title}." ${paper.journal} ${paper.volume}, no. ${paper.issue} (${paper.year}): ${pageRange}. https://doi.org/${paper.doi}.`;
        return {
            text,
            view: (
                <>
                    {authors}. “{paper.title}.” <i>{paper.journal}</i> {paper.volume}, no. {paper.issue} ({paper.year}): {pageRange}. https://doi.org/{paper.doi}.
                </>
            ),
        };
    }
    const text = [
        `@article{${paper.authors[0].last.toLowerCase()}${paper.year},`,
        `  author  = {${paper.authors.map((person) => `${person.last}, ${person.first}`).join(" and ")}},`,
        `  title   = {${paper.title}},`,
        `  journal = {${paper.journal}},`,
        `  year    = {${paper.year}},`,
        `  volume  = {${paper.volume}},`,
        `  number  = {${paper.issue}},`,
        `  pages   = {${paper.pages.replace("-", "--")}},`,
        `  doi     = {${paper.doi}}`,
        "}",
    ].join("\n");
    return {text, view: <span className="block whitespace-pre font-mono text-xs leading-5">{text}</span>};
};

export interface CitationCopyProps {
    paper: Paper;
    /** Selected style. Pass it with `onChange` to control the tabs. */
    value?: CitationStyle;
    defaultValue?: CitationStyle;
    onChange?: (style: CitationStyle) => void;
    title?: string;
    icon?: ComponentType<{className?: string}>;
    copyLabel?: string;
    copiedLabel?: string;
    /** Called with the plain text citation and its style after a successful copy. */
    onCopy?: (text: string, style: CitationStyle) => void;
    /** How long the copied state stays, in milliseconds. */
    resetAfter?: number;
    className?: string;
}

/** A citation card with APA, MLA, Chicago and BibTeX tabs. Copies plain text while the preview keeps its formatting. */
export const CitationCopy = ({
    paper,
    value,
    defaultValue = "apa",
    onChange,
    title = "Cite this article",
    icon: Icon = LuQuote,
    copyLabel = "Copy citation",
    copiedLabel = "Citation copied",
    onCopy,
    resetAfter = 1800,
    className = "",
}: CitationCopyProps) => {
    const [innerStyle, setInnerStyle] = useState<CitationStyle>(defaultValue);
    const style = value ?? innerStyle;
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    const tabRefs = useRef(new Map<CitationStyle, HTMLButtonElement>());
    const reduceMotion = useReducedMotion();
    const id = useId();

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const citation = cite(paper, style);

    const setStyle = (next: CitationStyle) => {
        setInnerStyle(next);
        onChange?.(next);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(citation.text);
            setCopied(true);
            onCopy?.(citation.text, style);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), resetAfter);
        } catch {
            setCopied(false);
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const index = styles.findIndex((item) => item.id === style);
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const next = styles[(index + step + styles.length) % styles.length].id;
        setStyle(next);
        setCopied(false);
        tabRefs.current.get(next)?.focus();
    };

    return (
        <div className={`w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex items-start gap-3 px-5 pt-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300" aria-hidden>
                    <Icon className="size-4"/>
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                    <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">{paper.journal}, {paper.year}</p>
                </div>
            </div>

            <div role="tablist" aria-label="Citation style" className="mx-5 mt-4 grid grid-cols-4 rounded-lg bg-zinc-100 p-0.5 dark:bg-white/[0.06]">
                {styles.map((item) => (
                    <button
                        key={item.id}
                        ref={(element) => {
                            if (element) tabRefs.current.set(item.id, element);
                            else tabRefs.current.delete(item.id);
                        }}
                        type="button"
                        role="tab"
                        aria-selected={style === item.id}
                        tabIndex={style === item.id ? 0 : -1}
                        onClick={() => {
                            setStyle(item.id);
                            setCopied(false);
                        }}
                        onKeyDown={onKeyDown}
                        className="relative rounded-md py-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 aria-selected:text-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:aria-selected:text-white"
                    >
                        {style === item.id && (
                            <motion.span
                                layoutId={`${id}-style`}
                                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-zinc-700"
                                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 38}}
                            />
                        )}
                        <span className="relative">{item.label}</span>
                    </button>
                ))}
            </div>

            <div role="tabpanel" aria-label={`${styles.find((item) => item.id === style)?.label} citation`} className="px-5 py-4">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={style}
                        className="max-h-56 overflow-auto rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 font-serif text-[15px] leading-relaxed text-zinc-800 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-zinc-200"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.15}}
                    >
                        {citation.view}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-5 py-3 dark:border-white/[0.06]">
                <p className="truncate font-mono text-xs text-zinc-400 dark:text-zinc-500">doi:{paper.doi}</p>
                <button
                    type="button"
                    onClick={copy}
                    className={`relative inline-flex h-9 shrink-0 items-center gap-2 overflow-hidden rounded-lg px-3.5 text-sm font-medium text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 active:scale-[0.98] dark:focus-visible:ring-offset-zinc-900 ${
                        copied ? "bg-emerald-600" : "bg-zinc-900 hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    }`}
                >
                    {copied ? <LuCheck className="size-4" aria-hidden/> : <LuClipboardCopy className="size-4" aria-hidden/>}
                    <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
                </button>
            </div>
        </div>
    );
};
