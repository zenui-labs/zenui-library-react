import {StatCounters, type Stat} from "./NumberTicker";

const stats: Stat[] = [
    {label: "Monthly revenue", value: 48250, prefix: "$"},
    {label: "Active users", value: 12.8, suffix: "k", decimals: 1},
    {label: "Uptime", value: 99.98, suffix: "%", decimals: 2},
];

const NumberTickerExample = () => <StatCounters items={stats}/>;

export default NumberTickerExample;
