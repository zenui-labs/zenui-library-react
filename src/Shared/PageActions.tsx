import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuChevronDown, LuCopy} from "react-icons/lu";
import ChatgptIcon from "@/SvgIcons/chatgpt-icon.tsx";
import ClaudeIcon from "@/SvgIcons/claude-icon.tsx";
import V0Icon from "@/SvgIcons/v0-icon.tsx";

const promptFor = (url) => `Read the ZenUI documentation page at ${url} and help me use the components on it in my React and Tailwind CSS project.`;

const assistants = [
    {id: "chatgpt", label: "Open in ChatGPT", icon: ChatgptIcon, href: (q) => `https://chat.openai.com/?q=${q}`},
    {id: "claude", label: "Open in Claude", icon: ClaudeIcon, href: (q) => `https://claude.ai/new?q=${q}`},
    {id: "v0", label: "Open in v0", icon: V0Icon, href: (q) => `https://v0.app/?q=${q}`},
];

/** "Copy page" plus shortcuts that open the page in an AI assistant. */
export const PageActions = () => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
        const onKey = (event) => event.key === "Escape" && setOpen(false);
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const copyPage = async () => {
        const content = document.querySelector<HTMLElement>(".docs-page")?.innerText ?? "";
        await navigator.clipboard.writeText(`${document.title}\n${window.location.href}\n\n${content}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    const openAssistant = (assistant) => {
        window.open(assistant.href(encodeURIComponent(promptFor(window.location.href))), "_blank", "noopener");
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative hidden shrink-0 640px:block">
            <div className="flex h-8 items-stretch overflow-hidden rounded-lg border border-hairline bg-surface text-[0.8rem] text-ink-muted shadow-card">
                <button onClick={copyPage} className="flex items-center gap-1.5 px-2.5 transition-colors hover:bg-raised hover:text-ink">
                    {copied ? <LuCheck className="size-3.5 text-accent-strong"/> : <LuCopy className="size-3.5"/>}
                    {copied ? "Copied" : "Copy page"}
                </button>
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="More page actions"
                    aria-expanded={open}
                    className="flex items-center border-l border-hairline px-1.5 transition-colors hover:bg-raised hover:text-ink"
                >
                    <LuChevronDown className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}/>
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: -4, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -4, scale: 0.98}}
                        transition={{duration: 0.14}}
                        className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 rounded-xl border border-hairline bg-surface p-1 shadow-float"
                    >
                        {assistants.map((assistant) => (
                            <button
                                key={assistant.id}
                                onClick={() => openAssistant(assistant)}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.82rem] text-ink-muted hover:bg-raised hover:text-ink"
                            >
                                <assistant.icon/>
                                {assistant.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
