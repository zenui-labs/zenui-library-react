import {motion} from "framer-motion";
import {LuAlertCircle, LuFileCode2, LuRefreshCw} from "react-icons/lu";

import ShowCode from "@shared/Component/ShowCode.tsx";

const EASE = [0.16, 1, 0.3, 1];
const SKELETON_WIDTHS = ["w-[38%]", "w-[64%]", "w-[82%]", "w-[58%]", "w-[74%]", "w-[46%]", "w-[88%]", "w-[52%]", "w-[70%]", "w-[30%]"];

/** Result panel: empty state, loading skeleton, error, then the generated config. */
const AIResponseSidebar = ({codes, isGenerating, error, prompt, onRetry, canRetry}) => (
    <section aria-labelledby="config-output-title" className="panel flex min-h-[380px] flex-1 flex-col p-5 shadow-card 640px:p-6">
        <div className="flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <h2 id="config-output-title" className="text-[0.95rem] font-semibold tracking-heading text-ink">
                Your theme
            </h2>
            {(codes || isGenerating) && prompt && (
                <p className="min-w-0 truncate text-[0.83rem] text-ink-subtle">
                    For <span className="text-ink-muted">{prompt}</span>
                </p>
            )}
        </div>

        <div className="mt-4 flex flex-1 flex-col" aria-live="polite" aria-busy={isGenerating}>
            {isGenerating ? (
                <div className="flex-1 rounded-panel border border-hairline bg-raised/50 p-5">
                    <p className="text-[0.85rem] text-ink-muted">Writing your theme. This usually takes a few seconds.</p>
                    <div className="mt-5 space-y-3.5" aria-hidden="true">
                        {SKELETON_WIDTHS.map((width, index) => (
                            <div
                                key={index}
                                className={`h-3 animate-pulse rounded-full bg-hairline ${width}`}
                                style={{animationDelay: `${index * 90}ms`}}
                            />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div role="alert" className="flex flex-1 flex-col items-center justify-center rounded-panel border border-dashed border-red-500/40 px-6 py-12 text-center">
                    <span className="flex size-10 items-center justify-center rounded-[10px] border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400">
                        <LuAlertCircle className="size-5"/>
                    </span>
                    <p className="mt-4 text-[0.95rem] font-medium text-ink">Something went wrong</p>
                    <p className="mt-1 max-w-[38ch] text-[0.85rem] leading-relaxed text-ink-muted">{error}</p>
                    {canRetry && (
                        <button type="button" onClick={onRetry} className="btn-ghost mt-5">
                            <LuRefreshCw className="size-4 text-ink-muted"/>
                            Try again
                        </button>
                    )}
                </div>
            ) : codes ? (
                <motion.div
                    initial={{opacity: 0, y: 6}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35, ease: EASE}}
                    className="min-w-0"
                >
                    <ShowCode code={[{id: "css", displayText: "index.css", language: "css", code: codes}]}/>
                    <p className="mt-3 text-[0.83rem] leading-relaxed text-ink-muted">
                        Paste this into your main CSS file. It uses Tailwind CSS v4 syntax, so it won't work with a
                        v3 tailwind.config.js setup. Results vary between runs, so read it over before you ship it.
                    </p>
                </motion.div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-panel border border-dashed border-hairline-strong px-6 py-12 text-center">
                    <span className="flex size-10 items-center justify-center rounded-[10px] border border-hairline bg-raised text-ink-muted">
                        <LuFileCode2 className="size-5"/>
                    </span>
                    <p className="mt-4 text-[0.95rem] font-medium text-ink">No theme yet</p>
                    <p className="mt-1 max-w-[36ch] text-[0.85rem] leading-relaxed text-ink-muted">
                        Describe your project and select Generate config. The CSS will show up here, ready to copy.
                    </p>
                </div>
            )}
        </div>
    </section>
);

export default AIResponseSidebar;
