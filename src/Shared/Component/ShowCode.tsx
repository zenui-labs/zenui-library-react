import {useEffect, useId, useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {motion} from "framer-motion";
import {IoLogoCss3} from "react-icons/io";
import {SiJavascript, SiTypescript} from "react-icons/si";
import {LuCheck, LuChevronDown, LuCopy} from "react-icons/lu";

import useZenuiStore, {type CodeLanguage} from "@/Store/Index.ts";
import toggleThemeBaseClasses from "../../Helpers/Index.ts";
import {fileName, highlightLanguage, isScript, toJavaScript} from "@/Helpers/codeLanguage.ts";
import {cn} from "@utils/Style.ts";

export interface CodeTab {
    id: string;
    displayText?: string;
    /** "tsx" or "ts" for TypeScript sources; "css" and others are shown as they are. */
    language?: string;
    code: string;
}

interface ShowCodeProps {
    /** TypeScript source (TSX) for a single file, or several files as tabs. */
    code: string | CodeTab[];
}

const COLLAPSED_LINES = 22;

const theme = {
    ...oneDark,
    'pre[class*="language-"]': {...oneDark['pre[class*="language-"]'], background: "transparent", margin: 0, padding: "1rem 0"},
    'code[class*="language-"]': {...oneDark['code[class*="language-"]'], background: "transparent", fontFamily: '"Geist Mono", ui-monospace, monospace'},
};

const TabIcon = ({language, mode}: {language: string; mode: CodeLanguage}) => {
    if (language === "css") return <IoLogoCss3 className="size-3.5 text-sky-400"/>;
    if (!isScript(language)) return null;
    return mode === "ts"
        ? <SiTypescript className="size-3 text-[#3178c6]"/>
        : <SiJavascript className="size-3 text-yellow-400"/>;
};

const languageOptions: {id: CodeLanguage; label: string}[] = [
    {id: "ts", label: "TS"},
    {id: "js", label: "JS"},
];

/** Syntax highlighted code with file tabs, a TypeScript/JavaScript switch, copy, and a collapsed state for long files. */
const ShowCode = ({code}: ShowCodeProps) => {
    const id = useId();
    const tabs: CodeTab[] = Array.isArray(code) ? code : [{id: "default", displayText: "Component.tsx", language: "tsx", code}];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const {withDarkClasses, codeLanguage, setCodeLanguage} = useZenuiStore();

    const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
    const language = current.language ?? "tsx";
    const typescript = toggleThemeBaseClasses(current.code ?? "", withDarkClasses).trim();

    // JavaScript is generated from the TypeScript source when first needed.
    const [javascript, setJavascript] = useState<string | null>(null);
    useEffect(() => {
        if (codeLanguage !== "js" || !isScript(language)) return;
        let active = true;
        setJavascript(null);
        toJavaScript(typescript)
            .then((result) => active && setJavascript(result))
            .catch(() => active && setJavascript(typescript));
        return () => {
            active = false;
        };
    }, [codeLanguage, language, typescript]);

    const showJs = codeLanguage === "js" && isScript(language);
    const source = showJs ? javascript : typescript;
    const lineCount = (source ?? typescript).split("\n").length;
    const collapsible = lineCount > COLLAPSED_LINES + 6;

    const copy = async () => {
        if (source === null) return;
        await navigator.clipboard.writeText(source);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
    };

    return (
        <div className="code-block-wrapper dark relative w-full overflow-hidden rounded-panel border border-white/10 bg-[#0b0d12] text-[#e6e9ef]">
            <div className="flex h-11 items-center justify-between gap-2 border-b border-white/[0.08] pl-2 pr-2">
                <div className="scroll-none flex min-w-0 items-center gap-0.5 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setExpanded(false);
                            }}
                            className={cn(
                                "flex h-8 shrink-0 items-center gap-2 rounded-md px-2.5 font-mono text-[0.75rem] transition-colors",
                                tab.id === current.id ? "bg-white/[0.08] text-white" : "text-white/45 hover:text-white/80"
                            )}
                        >
                            <TabIcon language={tab.language ?? "tsx"} mode={codeLanguage}/>
                            {fileName(tab.displayText || tab.id, tab.language ?? "tsx", codeLanguage)}
                        </button>
                    ))}
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                    <div role="radiogroup" aria-label="Code language" className="flex rounded-md bg-white/[0.06] p-0.5">
                        {languageOptions.map((option) => {
                            const active = option.id === codeLanguage;
                            return (
                                <button
                                    key={option.id}
                                    role="radio"
                                    aria-checked={active}
                                    title={option.id === "ts" ? "TypeScript" : "JavaScript"}
                                    onClick={() => setCodeLanguage(option.id)}
                                    className={cn("relative h-7 rounded px-2 font-mono text-[0.7rem] font-medium transition-colors", active ? "text-white" : "text-white/45 hover:text-white/80")}
                                >
                                    {active && (
                                        <motion.span layoutId={`${id}-lang`} className="absolute inset-0 rounded bg-white/[0.12]"
                                                     transition={{type: "spring", stiffness: 520, damping: 38}}/>
                                    )}
                                    <span className="relative">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={copy}
                        disabled={source === null}
                        className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[0.75rem] font-medium text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
                        aria-label={`Copy ${showJs ? "JavaScript" : "TypeScript"} code`}
                    >
                        {copied ? <LuCheck className="size-3.5 text-emerald-400"/> : <LuCopy className="size-3.5"/>}
                        <span className="hidden 425px:inline">{copied ? "Copied" : "Copy"}</span>
                    </button>
                </div>
            </div>

            <div className={cn("zenui_code_snippet relative overflow-auto text-[13px] leading-[1.7]", collapsible && !expanded && "max-h-[420px] overflow-hidden")}>
                {source === null ? (
                    <div className="space-y-2.5 p-5" aria-label="Preparing JavaScript">
                        {[70, 45, 82, 60, 38].map((width, index) => (
                            <div key={index} className="h-3 animate-pulse rounded bg-white/[0.07]" style={{width: `${width}%`}}/>
                        ))}
                    </div>
                ) : (
                    <SyntaxHighlighter
                        language={highlightLanguage(language, codeLanguage)}
                        style={theme}
                        showLineNumbers
                        lineNumberStyle={{minWidth: "3em", paddingRight: "1.25em", color: "rgba(255,255,255,0.22)", userSelect: "none"}}
                        customStyle={{background: "transparent", fontSize: "13px"}}
                    >
                        {source}
                    </SyntaxHighlighter>
                )}

                {collapsible && !expanded && source !== null && (
                    <div className="absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/85 to-transparent pb-4">
                        <button
                            onClick={() => setExpanded(true)}
                            className="flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-[#161a22] px-3.5 text-[0.78rem] font-medium text-white/80 hover:text-white"
                        >
                            Show all {lineCount} lines
                            <LuChevronDown className="size-3.5"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowCode;
