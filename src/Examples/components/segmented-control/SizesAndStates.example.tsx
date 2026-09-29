import type {ReactNode} from "react";
import {LuLock} from "react-icons/lu";
import {Segmented, type SegmentedOption} from "./SizesAndStates";

type Interval = "1h" | "24h" | "7d" | "30d";
type Plan = "hobby" | "pro" | "enterprise";
type Branch = "main" | "staging";

const intervals: SegmentedOption<Interval>[] = [
    {value: "1h", label: "1h"},
    {value: "24h", label: "24h"},
    {value: "7d", label: "7d"},
    {value: "30d", label: "30d"},
];

const plans: SegmentedOption<Plan>[] = [
    {value: "hobby", label: "Hobby"},
    {value: "pro", label: "Pro"},
    {value: "enterprise", label: "Enterprise", disabled: true, reason: "Enterprise needs a sales contract. Contact sales to enable it."},
];

const branches: SegmentedOption<Branch>[] = [
    {value: "main", label: "main"},
    {value: "staging", label: "staging"},
];

const Row = ({title, detail, children}: {title: string; detail: string; children: ReactNode}) => (
    <div className="grid gap-3 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-start sm:gap-6">
        <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>
        </div>
        <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
);

const SizesAndStatesExample = () => (
    <div className="w-full max-w-xl divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white px-5 dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
        <Row title="Sizes" detail="Small, medium and large">
            <Segmented label="Interval, small" options={intervals} defaultValue="24h" size="sm"/>
            <Segmented label="Interval, medium" options={intervals} defaultValue="7d"/>
            <Segmented label="Interval, large" options={intervals} defaultValue="30d" size="lg"/>
        </Row>
        <Row title="Disabled option" detail="Skipped by the arrow keys">
            <Segmented label="Plan" options={plans} defaultValue="pro"/>
        </Row>
        <Row title="Disabled control" detail="Read only for your role">
            <Segmented label="Production branch" options={branches} defaultValue="main" disabled/>
            <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <LuLock className="size-3" aria-hidden/>
                Only workspace admins can change the production branch.
            </p>
        </Row>
    </div>
);

export default SizesAndStatesExample;
