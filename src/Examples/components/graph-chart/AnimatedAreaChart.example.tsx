import {AnimatedAreaChart, type ChartDatum} from "./AnimatedAreaChart";

const data: ChartDatum[] = [
    {label: "Jan", value: 400},
    {label: "Feb", value: 520},
    {label: "Mar", value: 480},
    {label: "Apr", value: 650},
    {label: "May", value: 580},
    {label: "Jun", value: 720},
];

const AnimatedAreaChartExample = () => <AnimatedAreaChart data={data}/>;

export default AnimatedAreaChartExample;
