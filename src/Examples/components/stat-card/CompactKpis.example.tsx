import {CompactKpis, type CompactKpi} from "./CompactKpis";

const kpis: CompactKpi[] = [
    {label: "Revenue", value: "$48.2k", change: 8.1, definition: "Gross sales minus refunds.", bars: [5, 6, 5, 7, 6, 8, 9]},
    {label: "Orders", value: "1,284", change: 5.4, definition: "Orders placed, including unpaid ones.", bars: [6, 7, 6, 7, 7, 8, 8]},
    {label: "Avg. order", value: "$37.54", change: 2.6, definition: "Revenue divided by paid orders.", bars: [6, 6, 7, 6, 7, 7, 7]},
    {label: "Conversion", value: "3.12%", change: -0.4, definition: "Sessions that ended in an order.", bars: [7, 7, 6, 7, 6, 6, 6]},
    {label: "Refund rate", value: "1.9%", change: -0.7, lowerIsBetter: true, definition: "Orders refunded in full or in part.", bars: [7, 6, 6, 5, 5, 4, 4]},
    {label: "New customers", value: "412", change: 11.9, definition: "First order from this email address.", bars: [4, 5, 5, 6, 7, 7, 9]},
    {label: "Returning", value: "38%", change: 1.2, definition: "Orders from customers with a previous order.", bars: [6, 6, 6, 7, 6, 7, 7]},
    {label: "Fulfillment", value: "1.6 days", change: 9.3, lowerIsBetter: true, definition: "Median time from order to shipment.", bars: [4, 5, 5, 6, 6, 7, 7]},
];

const CompactKpisExample = () => <CompactKpis items={kpis}/>;

export default CompactKpisExample;
