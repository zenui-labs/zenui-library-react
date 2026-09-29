import {AnimatedBarChart, type ChartDatum} from "./AnimatedBarChart";

const data: ChartDatum[] = [
    {label: "Jan", value: 400},
    {label: "Feb", value: 520},
    {label: "Mar", value: 480},
    {label: "Apr", value: 650},
    {label: "May", value: 580},
    {label: "Jun", value: 720},
];

const AnimatedBarChartExample = () => <AnimatedBarChart data={data}/>;

export default AnimatedBarChartExample;
