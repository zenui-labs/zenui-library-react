import {motion} from "framer-motion";
import {LuCode2} from "react-icons/lu";

import ShowCode from "@shared/Component/ShowCode.tsx";

const EASE = [0.16, 1, 0.3, 1];

export const KeyCap = ({children, size = "md"}) => (
    <kbd
        className={
            size === "lg"
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-[9px] border border-b-[3px] border-hairline-strong bg-surface px-3 font-mono text-[0.9rem] font-medium text-ink shadow-card"
                : "inline-flex h-7 min-w-7 items-center justify-center rounded-[7px] border border-b-2 border-hairline-strong bg-surface px-2 font-mono text-[0.78rem] font-medium text-ink"
        }
    >
        {children}
    </kbd>
);

const SKELETON_WIDTHS = ["w-[72%]", "w-[46%]", "w-[88%]", "w-[60%]", "w-[34%]", "w-[80%]", "w-[52%]", "w-[66%]"];

/** Result panel: empty state, loading skeleton, then the generated handler. */
const CodesSidebar = ({codes, isGenerating, keys = []}) => {
    const hasResult = Boolean(codes) || isGenerating;

    return (
        <section aria-labelledby="shortkey-output-title" className="panel flex min-h-[340px] flex-1 flex-col p-5 shadow-card 640px:p-6">
            <div className="flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 id="shortkey-output-title" className="text-[0.95rem] font-semibold tracking-heading text-ink">
                    Handler
                </h2>
                {hasResult && keys.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5" aria-label={`Shortcut ${keys.join(' plus ')}`}>
                        {keys.map((key, index) => (
                            <span key={`${key}-${index}`} className="flex items-center gap-1.5">
                                {index > 0 && <span aria-hidden="true" className="text-[0.8rem] text-ink-subtle">+</span>}
                                <KeyCap>{key}</KeyCap>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 flex flex-1 flex-col" aria-live="polite" aria-busy={isGenerating}>
                {isGenerating ? (
                    <div className="flex-1 rounded-panel border border-hairline bg-raised/50 p-5">
                        <span className="sr-only">Generating code</span>
                        <div className="space-y-3.5" aria-hidden="true">
                            {SKELETON_WIDTHS.map((width, index) => (
                                <div
                                    key={index}
                                    className={`h-3 animate-pulse rounded-full bg-hairline ${width}`}
                                    style={{animationDelay: `${index * 90}ms`}}
                                />
                            ))}
                        </div>
                    </div>
                ) : codes ? (
                    <motion.div
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.35, ease: EASE}}
                        className="min-w-0"
                    >
                        <ShowCode code={[{id: "js", displayText: "shortcut.js", language: "js", code: codes}]}/>
                        <p className="mt-3 text-[0.83rem] leading-relaxed text-ink-muted">
                            Replace the <code className="font-mono text-[0.8rem] text-ink">console.log</code> line with
                            what the shortcut should do. Remove the listener when the component or page unmounts.
                        </p>
                    </motion.div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-panel border border-dashed border-hairline-strong px-6 py-12 text-center">
                        <span className="flex size-10 items-center justify-center rounded-[10px] border border-hairline bg-raised text-ink-muted">
                            <LuCode2 className="size-5"/>
                        </span>
                        <p className="mt-4 text-[0.95rem] font-medium text-ink">No handler yet</p>
                        <p className="mt-1 max-w-[36ch] text-[0.85rem] leading-relaxed text-ink-muted">
                            Choose your keys and select Generate code. The handler will show up here, ready to copy.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CodesSidebar;
