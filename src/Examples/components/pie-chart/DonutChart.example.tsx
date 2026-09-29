import {DonutChart, type DonutChartDatum} from "./DonutChart";

const departments: DonutChartDatum[] = [
    {name: "Marketing", value: 15.2},
    {name: "Sales", value: 18.2},
    {name: "Finance", value: 12.1},
    {name: "Human Resources", value: 9.1},
    {name: "IT", value: 24.2},
    {name: "Operations", value: 21.2},
];

const DonutChartExample = () => <DonutChart data={departments} label="Budget share by department"/>;

export default DonutChartExample;
