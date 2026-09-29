import {BlockWipeReveal, type WipeLine, type WipeStat} from "./BlockWipeReveal";

const lines: WipeLine[] = [
    {text: "Annual report"},
    {text: "Revenue up 24%", barClassName: "bg-emerald-500 dark:bg-emerald-400", textClassName: "text-emerald-600 dark:text-emerald-400"},
    {text: "in every region"},
];

const stats: WipeStat[] = [
    {label: "Revenue", value: "$84.2M"},
    {label: "Customers", value: "12,480"},
];

const BlockWipeRevealExample = () => <BlockWipeReveal lines={lines} stats={stats}/>;

export default BlockWipeRevealExample;
