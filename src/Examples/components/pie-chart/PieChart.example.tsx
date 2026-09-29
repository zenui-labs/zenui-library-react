import {PieChart, type PieChartDatum} from "./PieChart";

const departments: PieChartDatum[] = [
    {name: "Marketing", value: 15.2},
    {name: "Sales", value: 18.2},
    {name: "Finance", value: 12.1},
    {name: "Human Resources", value: 9.1},
    {name: "IT", value: 24.2},
    {name: "Operations", value: 21.2},
];

const PieChartExample = () => <PieChart data={departments} label="Budget share by department"/>;

export default PieChartExample;
