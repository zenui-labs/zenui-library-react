import {useState} from "react";
import {LuCalendarDays, LuGanttChart, LuKanban, LuLayoutList} from "react-icons/lu";
import {SegmentedControl, type SegmentOption} from "./ViewSwitcher";

type View = "board" | "list" | "calendar" | "timeline";
type Scope = "mine" | "team" | "all";

const views: SegmentOption<View>[] = [
    {value: "board", label: "Board", icon: LuKanban},
    {value: "list", label: "List", icon: LuLayoutList},
    {value: "calendar", label: "Calendar", icon: LuCalendarDays},
    {value: "timeline", label: "Timeline", icon: LuGanttChart},
];

const scopes: SegmentOption<Scope>[] = [
    {value: "mine", label: "Assigned to me"},
    {value: "team", label: "My team"},
    {value: "all", label: "Everyone"},
];

const issueCount: Record<Scope, number> = {mine: 8, team: 31, all: 142};

const ViewSwitcherExample = () => {
    const [view, setView] = useState<View>("board");
    const [scope, setScope] = useState<Scope>("team");

    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5">
            <SegmentedControl label="Layout" options={views} value={view} onChange={(next) => setView(next)}/>
            <SegmentedControl label="Show issues" options={scopes} value={scope} onChange={(next) => setScope(next)} size="sm"/>
            <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
                Showing <span className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{issueCount[scope]} issues</span> as a{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{view}</span>
            </p>
        </div>
    );
};

export default ViewSwitcherExample;
