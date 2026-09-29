import {LuFileText, LuVideo} from "react-icons/lu";
import {ExpandingStack, type Person} from "./ExpandingStack";

const editors: Person[] = [
    {name: "Maya Chen", detail: "Edited 4 min ago"},
    {name: "Diego Ramos", detail: "Edited 1 hour ago"},
    {name: "Aisha Bello", detail: "Edited yesterday"},
    {name: "Hana Sato", detail: "Commented yesterday"},
    {name: "Tom Becker", detail: "Viewed Sep 24"},
];

const attendees: Person[] = [
    {name: "Priya Nair", detail: "Organizer"},
    {name: "Lucas Moreau", detail: "Accepted"},
    {name: "Sofia Rossi", detail: "Accepted"},
    {name: "Kofi Mensah", detail: "Maybe"},
];

const ExpandingStackExample = () => (
    <div className="w-full max-w-md divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300" aria-hidden>
                <LuFileText className="size-5"/>
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Q4 launch plan</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">5 contributors</p>
            </div>
            <div className="basis-full pl-14 sm:basis-auto sm:pl-0">
                <ExpandingStack label="Contributors to Q4 launch plan" people={editors} size={32}/>
            </div>
        </div>
        <div className="p-5">
            <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300" aria-hidden>
                    <LuVideo className="size-5"/>
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Design review</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Thursday, 2:00 to 2:45 PM</p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-white/[0.03]">
                <ExpandingStack label="Attendees of design review" people={attendees} size={40}/>
                <span className="hidden text-xs text-zinc-500 sm:inline dark:text-zinc-400">Hover or tab to see names</span>
            </div>
        </div>
    </div>
);

export default ExpandingStackExample;
