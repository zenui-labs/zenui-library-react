import {LuCalendar, LuFolderKanban, LuInbox, LuUsers} from "react-icons/lu";
import {KanbanShell} from "./KanbanShell";
import type {KanbanCard, KanbanColumn, KanbanPerson, KanbanRailItem, KanbanTag} from "./KanbanShell";

const columns: KanbanColumn[] = [
    {id: "backlog", title: "Backlog", dot: "bg-zinc-400"},
    {id: "progress", title: "In progress", dot: "bg-amber-500"},
    {id: "review", title: "In review", dot: "bg-violet-500"},
    {id: "done", title: "Done", dot: "bg-emerald-500"},
];

const tags: Record<"web" | "ios" | "api" | "design", KanbanTag> = {
    web: {label: "Web", tone: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30"},
    ios: {label: "iOS", tone: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30"},
    api: {label: "API", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30"},
    design: {label: "Design", tone: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30"},
};

const people: Record<"AL" | "JM" | "SK" | "DO", KanbanPerson> = {
    AL: {initials: "AL", color: "bg-amber-500"},
    JM: {initials: "JM", color: "bg-sky-500"},
    SK: {initials: "SK", color: "bg-rose-500"},
    DO: {initials: "DO", color: "bg-emerald-600"},
};

const cards: KanbanCard[] = [
    {id: "PAY-214", title: "Apple Pay on the checkout sheet", tag: tags.ios, assignee: people.SK, due: "Oct 3", comments: 4, priority: "High", column: "backlog"},
    {id: "PAY-219", title: "Retry failed webhooks with backoff", tag: tags.api, assignee: people.DO, comments: 1, priority: "Medium", column: "backlog"},
    {id: "PAY-221", title: "Empty state for the payouts page", tag: tags.design, assignee: people.JM, comments: 0, priority: "Low", column: "backlog"},
    {id: "PAY-207", title: "Refund flow for partial captures", tag: tags.web, assignee: people.AL, due: "Sep 30", comments: 7, priority: "Urgent", column: "progress"},
    {id: "PAY-210", title: "Idempotency keys on POST /charges", tag: tags.api, assignee: people.DO, due: "Oct 1", comments: 2, priority: "High", column: "progress"},
    {id: "PAY-198", title: "Card form error messages in 12 languages", tag: tags.web, assignee: people.JM, comments: 5, priority: "Medium", column: "review"},
    {id: "PAY-190", title: "Dispute evidence upload", tag: tags.web, assignee: people.AL, comments: 3, priority: "Medium", column: "done"},
    {id: "PAY-188", title: "Receipt email redesign", tag: tags.design, assignee: people.SK, comments: 9, priority: "Low", column: "done"},
];

const rail: KanbanRailItem[] = [
    {label: "Inbox", icon: LuInbox},
    {label: "Boards", icon: LuFolderKanban, active: true},
    {label: "Calendar", icon: LuCalendar},
    {label: "Members", icon: LuUsers},
];

// New issues get the next PAY number, a Web tag and a Medium priority.
const createCard = (title: string, column: string, current: KanbanCard[]): KanbanCard => ({
    id: `PAY-${222 + current.length}`, title, tag: tags.web, assignee: people.AL, comments: 0, priority: "Medium", column,
});

const KanbanShellExample = () => (
    <KanbanShell
        columns={columns}
        cards={cards}
        members={Object.values(people)}
        rail={rail}
        breadcrumb="Tessera / Payments team"
        title="Sprint 42, checkout reliability"
        createCard={createCard}
    />
);

export default KanbanShellExample;
