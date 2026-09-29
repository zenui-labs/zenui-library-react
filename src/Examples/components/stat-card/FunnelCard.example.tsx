import {FunnelCard, type FunnelStep} from "./FunnelCard";

const steps: FunnelStep[] = [
    {label: "Viewed pricing", count: 24_810, median: "Entry point"},
    {label: "Started trial", count: 3_720, median: "2 min after viewing pricing"},
    {label: "Activated", count: 1_860, median: "1.4 days after starting"},
    {label: "Paid", count: 612, median: "11 days after activating"},
];

// The headline rate runs from "Started trial" to "Paid".
const FunnelCardExample = () => <FunnelCard steps={steps} conversion={{from: 1, to: 3}}/>;

export default FunnelCardExample;
