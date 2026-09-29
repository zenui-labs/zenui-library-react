import {BeforeAfterSlider, MatchListPanel, SpreadsheetPanel} from "./BeforeAfterSlider";
import type {BeforeAfterMetric, MatchRow, SheetRow} from "./BeforeAfterSlider";

const sheetRows: SheetRow[] = [
    {ref: "INV-2291", payer: "Northwind Ltd", amount: "4,200.00", status: "??"},
    {ref: "INV-2292", payer: "northwind", amount: "4,200", status: "dup?", problem: true},
    {ref: "", payer: "Contoso GmbH", amount: "12,940.50", status: "check w/ Sam", problem: true},
    {ref: "INV-2295", payer: "Fabrikam", amount: "860.00", status: "paid"},
    {ref: "INV-2297", payer: "Tailspin Toys", amount: "3,115.20", status: "short 15.20", problem: true},
    {ref: "INV-2298", payer: "Litware", amount: "7,000.00", status: ""},
];

const matchRows: MatchRow[] = [
    {payer: "Northwind Ltd", invoice: "INV-2291", amount: "$4,200.00", note: "Exact match"},
    {payer: "Contoso GmbH", invoice: "INV-2293", amount: "$12,940.50", note: "Matched by amount"},
    {payer: "Fabrikam", invoice: "INV-2295", amount: "$860.00", note: "Exact match"},
    {payer: "Tailspin Toys", invoice: "INV-2297", amount: "$3,115.20", note: "Bank fee of $15.20", warn: true},
    {payer: "Litware", invoice: "INV-2298", amount: "$7,000.00", note: "Exact match"},
];

const metrics: BeforeAfterMetric[] = [
    {label: "Days to close the month", before: "9", after: "2"},
    {label: "Payments matched automatically", before: "0%", after: "96%"},
    {label: "Hours a week on follow ups", before: "14", after: "3"},
];

const BeforeAfterSliderExample = () => (
    <BeforeAfterSlider
        before={<SpreadsheetPanel fileName="Reconciliation_OCT_final_v3 (2).xlsx" rows={sheetRows}
                                  flagLabel="3 rows need a human" metaLabel="Last edited 11:48 PM"/>}
        after={<MatchListPanel title="October deposits" rows={matchRows}/>}
        metrics={metrics}
    />
);

export default BeforeAfterSliderExample;
