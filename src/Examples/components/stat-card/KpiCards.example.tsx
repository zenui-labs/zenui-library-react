import {KpiCards, type Kpi} from "./KpiCards";

const kpis: Kpi[] = [
    {label: "Monthly recurring revenue", value: "$84,120", change: 12.4, series: [52, 54, 53, 58, 57, 61, 64, 63, 68, 71, 70, 76]},
    {label: "Active workspaces", value: "3,482", change: 4.1, series: [30, 31, 33, 32, 34, 33, 35, 36, 35, 37, 38, 39]},
    {label: "Churn rate", value: "1.8%", change: -0.6, lowerIsBetter: true, series: [3.1, 2.9, 3, 2.7, 2.6, 2.7, 2.4, 2.2, 2.3, 2, 1.9, 1.8]},
    {label: "Median response time", value: "2h 14m", change: 18.2, lowerIsBetter: true, series: [96, 98, 104, 101, 110, 108, 115, 121, 118, 126, 130, 134]},
];

const KpiCardsExample = () => <KpiCards items={kpis}/>;

export default KpiCardsExample;
