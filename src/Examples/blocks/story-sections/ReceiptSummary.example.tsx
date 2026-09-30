import {ReceiptSummary, type ReceiptSection} from "./ReceiptSummary";

const sections: ReceiptSection[] = [
    {
        title: "Written",
        lines: [
            {label: "Docs published", value: "3,412"},
            {label: "Comments resolved", value: "18,907"},
            {label: "Specs approved", value: "286"},
        ],
    },
    {
        title: "Replaced",
        lines: [
            {label: "Status meetings", value: "212"},
            {label: "avg. 38 min, 9 people", value: "", detail: true},
            {label: "Slack threads", value: "4,630"},
            {label: "Lost links", value: "0"},
        ],
    },
    {
        title: "Saved",
        lines: [
            {label: "Hours saved", value: "1,284"},
            {label: "Searches answered", value: "41,380"},
        ],
    },
];

const ReceiptSummaryExample = () => (
    <ReceiptSummary
        merchant="Halden"
        header={["Workspace: Acme Robotics", "Year in review · 2025"]}
        meta={[
            {label: "Date", value: "31/12/25"},
            {label: "Time", value: "23:59"},
            {label: "Seats", value: "64"},
            {label: "Order", value: "#2025"},
        ]}
        sections={sections}
        total={{label: "Time returned", value: "160 days"}}
        footer={["Thank you for writing it down", "See you in 2026"]}
        barcode="ACME2025"
        title="Your year at Acme, itemised"
        description="Everything the team wrote, fixed and skipped in 2025, printed on one receipt. Share it in the all-hands, or reprint it for the fridge."
        footnote="Figures for the Acme Robotics workspace, 1 January to 31 December 2025. Time returned counts 8-hour workdays."
    />
);

export default ReceiptSummaryExample;
