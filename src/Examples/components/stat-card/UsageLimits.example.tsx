import {UsageLimits, type StorageSegment, type UsageMeter} from "./UsageLimits";

const storage: StorageSegment[] = [
    {label: "Video", size: 41.2, color: "bg-violet-500"},
    {label: "Images", size: 18.6, color: "bg-sky-500"},
    {label: "Documents", size: 7.9, color: "bg-emerald-500"},
    {label: "Other", size: 3.4, color: "bg-zinc-400 dark:bg-zinc-500"},
];

const meters: UsageMeter[] = [
    {label: "API calls", used: 92_400, limit: 100_000, unit: "calls", note: "Resets Oct 1"},
    {label: "Seats", used: 18, limit: 20, unit: "seats", note: "2 seats left"},
    {label: "Build minutes", used: 3_120, limit: 3_000, unit: "min", note: "Resets Oct 1", overageNote: "Extra usage is billed at $0.008 per minute."},
];

const UsageLimitsExample = () => <UsageLimits storage={storage} storageLimit={100} meters={meters}/>;

export default UsageLimitsExample;
