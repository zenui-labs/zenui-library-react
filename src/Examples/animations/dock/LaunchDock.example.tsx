import {LuImage, LuMap, LuMusic, LuNewspaper, LuPause, LuStickyNote} from "react-icons/lu";
import {LaunchDock, type LaunchApp} from "./LaunchDock";

const notes = ["Book flights to Lisbon", "Draft Q4 roadmap review", "Pick up film from the lab", "Call Grandma on Sunday"];
const photos = ["from-sky-300 to-indigo-500", "from-amber-200 to-rose-400", "from-emerald-300 to-teal-600", "from-fuchsia-300 to-purple-600", "from-orange-200 to-amber-500", "from-slate-300 to-slate-600"];
const headlines = ["City approves new protected bike lanes on Market Street", "Local bakery wins national sourdough prize", "Warriors open the season at home tonight"];

const apps: LaunchApp[] = [
    {
        id: "notes",
        name: "Notes",
        icon: LuStickyNote,
        color: "from-amber-300 to-yellow-500",
        content: (
            <ul className="space-y-2 text-sm">
                {notes.map((note, index) => (
                    <li key={note} className="flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-2.5 text-gray-800 dark:bg-amber-500/10 dark:text-amber-50">
                        <span className={`h-4 w-4 rounded border ${index === 0 ? "border-amber-500 bg-amber-500" : "border-amber-400"}`}/>
                        {note}
                    </li>
                ))}
            </ul>
        ),
    },
    {
        id: "music",
        name: "Music",
        icon: LuMusic,
        color: "from-rose-400 to-pink-600",
        content: (
            <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 shadow-lg"/>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900 dark:text-white">Harbor Lights</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Juniper Lane</p>
                    <div className="mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-slate-700">
                        <div className="h-full w-2/5 rounded-full bg-rose-500"/>
                    </div>
                    <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-gray-500 dark:text-slate-400">
                        <span>1:24</span>
                        <span>3:38</span>
                    </div>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-900">
                    <LuPause className="h-4 w-4" aria-hidden="true"/>
                </span>
            </div>
        ),
    },
    {
        id: "photos",
        name: "Photos",
        icon: LuImage,
        color: "from-sky-400 to-indigo-600",
        content: (
            <div className="grid grid-cols-3 gap-1.5">
                {photos.map((gradient) => (
                    <div key={gradient} className={`aspect-square rounded-lg bg-gradient-to-br ${gradient}`}/>
                ))}
            </div>
        ),
    },
    {
        id: "maps",
        name: "Maps",
        icon: LuMap,
        color: "from-emerald-400 to-teal-600",
        content: (
            <div className="relative h-32 overflow-hidden rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(16,185,129,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px,transparent_1px)] [background-size:24px_24px]"/>
                <div className="absolute left-1/3 top-1/2 h-1 w-1/2 -rotate-12 rounded-full bg-sky-500"/>
                <span className="absolute left-[60%] top-[38%] h-4 w-4 rounded-full border-2 border-white bg-rose-500 shadow"/>
                <p className="absolute bottom-2 left-3 text-xs font-medium text-emerald-900 dark:text-emerald-200">12 min to Ferry Building</p>
            </div>
        ),
    },
    {
        id: "news",
        name: "News",
        icon: LuNewspaper,
        color: "from-orange-400 to-red-500",
        content: (
            <ul className="space-y-3 text-sm">
                {headlines.map((headline) => (
                    <li key={headline} className="border-b border-gray-100 pb-3 text-gray-800 last:border-0 dark:border-slate-800 dark:text-slate-200">{headline}</li>
                ))}
            </ul>
        ),
    },
];

const LaunchDockExample = () => <LaunchDock apps={apps}/>;

export default LaunchDockExample;
