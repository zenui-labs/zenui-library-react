import {LuCalendarDays, LuMapPin} from "react-icons/lu";
import {ConstellationParticles} from "./ConstellationParticles";

const ConstellationParticlesExample = () => (
    <ConstellationParticles>
        <div className="pointer-events-none relative max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-sky-400">Relay Summit 2026</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Two days with the people building the open web
            </h2>
            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                    <LuCalendarDays className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true"/>
                    October 14 and 15
                </span>
                <span className="inline-flex items-center gap-2">
                    <LuMapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true"/>
                    LX Factory, Lisbon
                </span>
            </div>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <a
                    href="#tickets"
                    onClick={(event) => event.preventDefault()}
                    className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:text-slate-950 dark:shadow-sky-500/20 dark:hover:bg-sky-400 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-[#070b18]"
                >
                    Get tickets
                </a>
                <a
                    href="#speakers"
                    onClick={(event) => event.preventDefault()}
                    className="rounded-full border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-800 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                    See the 42 speakers
                </a>
            </div>
        </div>
    </ConstellationParticles>
);

export default ConstellationParticlesExample;
