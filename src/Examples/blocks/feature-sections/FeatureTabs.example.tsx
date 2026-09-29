import {LuCalendar, LuGitBranch, LuRocket} from "react-icons/lu";
import {BoardPreview, FeatureTabs, ReleasePreview, RoadmapPreview} from "./FeatureTabs";
import type {BoardColumn, FeatureTab, RoadmapRow} from "./FeatureTabs";

const months: string[] = ["Jan", "", "Feb", "", "Mar", "", "Apr", "", "May", ""];

const roadmap: RoadmapRow[] = [
    {name: "Billing v2", start: 0, length: 5, color: "bg-violet-500"},
    {name: "SSO for teams", start: 2, length: 4, color: "bg-sky-500"},
    {name: "Mobile inbox", start: 4, length: 5, color: "bg-amber-500", badge: "+6 days"},
    {name: "Audit log", start: 6, length: 3, color: "bg-emerald-500"},
];

const board: BoardColumn[] = [
    {title: "In progress", cards: [{title: "Retry failed webhooks", number: 412}, {title: "Invoice PDF layout", number: 413}]},
    {title: "In review", cards: [{title: "Proration for seat changes", number: 419}]},
    {title: "Done", cards: [{title: "Tax ID validation", number: 426}, {title: "Card update flow", number: 427}]},
];

const notes: string[] = [
    "Seat changes are now prorated to the day",
    "Invoices include your tax ID when one is saved",
    "Failed webhooks retry up to 8 times over 24 hours",
];

const features: FeatureTab[] = [
    {
        id: "plan",
        label: "Plan",
        title: "Roadmaps that stay honest",
        body: "Drag a project and every dependent date moves with it. Slips show up in red before the review meeting.",
        icon: LuCalendar,
        preview: <RoadmapPreview columns={months} rows={roadmap}/>,
    },
    {
        id: "build",
        label: "Build",
        title: "A board that mirrors your branches",
        body: "Issues move to review when a pull request opens and close when it merges. Nobody updates tickets by hand.",
        icon: LuGitBranch,
        preview: <BoardPreview columns={board}/>,
    },
    {
        id: "ship",
        label: "Ship",
        title: "Release notes written from real work",
        body: "Lattice drafts the changelog from merged issues, so the release post takes minutes instead of an afternoon.",
        icon: LuRocket,
        preview: <ReleasePreview title="Release 3.18" notes={notes} footer="Generated from 23 merged issues across 3 teams"/>,
    },
];

const FeatureTabsExample = () => <FeatureTabs features={features}/>;

export default FeatureTabsExample;
