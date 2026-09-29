import {LuClock, LuLeaf, LuTruck} from "react-icons/lu";
import {StatsFeatures, type FeatureStat} from "./StatsFeatures";

const stats: FeatureStat[] = [
    {
        value: 31,
        suffix: "%",
        label: "fewer miles driven",
        icon: LuLeaf,
        title: "Routes that adapt to the day",
        body: "Routewise re-plans every van when traffic, weather or a late pickup changes the picture, instead of once each morning.",
        trend: [0.35, 0.42, 0.4, 0.55, 0.6, 0.72, 0.8, 0.86],
    },
    {
        value: 2.4,
        decimals: 1,
        suffix: "M",
        label: "stops planned each week",
        icon: LuTruck,
        title: "Built for fleets of any size",
        body: "Plan 12 vans or 4,000 across depots with capacity, skills and time windows, and get a plan back in under 20 seconds.",
        trend: [0.5, 0.55, 0.52, 0.6, 0.66, 0.7, 0.78, 0.92],
    },
    {
        value: 6,
        prefix: "±",
        suffix: " min",
        label: "arrival accuracy",
        icon: LuClock,
        title: "Arrival times customers believe",
        body: "Live ETAs learn from each driver's real pace, so the window in the text message is the window the doorbell rings.",
        trend: [0.9, 0.8, 0.74, 0.6, 0.52, 0.44, 0.38, 0.3],
    },
];

const StatsFeaturesExample = () => <StatsFeatures stats={stats}/>;

export default StatsFeaturesExample;
