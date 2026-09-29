import {LuArrowRight} from "react-icons/lu";
import {AuroraBackground} from "./AuroraBackground";

const AuroraBackgroundExample = () => (
    <AuroraBackground>
        <div className="relative max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-600/15 bg-white/60 px-3 py-1 text-xs font-medium text-emerald-800 backdrop-blur dark:border-emerald-300/20 dark:bg-slate-900/50 dark:text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>
                Version 2.0 is out
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                Notes that write back
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">
                Nightfall links every meeting note to the tasks, docs and people it mentions, then reminds you before anything slips.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                    href="#download"
                    onClick={(event) => event.preventDefault()}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-950"
                >
                    Download for Mac
                    <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                </a>
                <a
                    href="#changelog"
                    onClick={(event) => event.preventDefault()}
                    className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-200 dark:hover:bg-white/10"
                >
                    Read what's new
                </a>
            </div>
        </div>
    </AuroraBackground>
);

export default AuroraBackgroundExample;
