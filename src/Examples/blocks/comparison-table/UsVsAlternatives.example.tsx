import {UsVsAlternatives, type AlternativeOption, type AlternativeRow} from "./UsVsAlternatives";

const options: AlternativeOption[] = [
    {id: "ledgerline", name: "Ledgerline", note: "Close in days"},
    {id: "spreadsheets", name: "Spreadsheets", note: "What most teams start with"},
    {id: "erp", name: "ERP add-on", note: "Bundled with your ledger"},
];

const rows: AlternativeRow[] = [
    {capability: "Bank and card reconciliation", values: {ledgerline: {support: "yes", detail: "Matches 94% automatically"}, spreadsheets: {support: "no"}, erp: {support: "partial", detail: "Bank feeds only"}}},
    {capability: "Close checklist with owners", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Manual tracking"}, erp: {support: "no"}}},
    {capability: "Flux analysis with comments", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Formulas break often"}, erp: {support: "no"}}},
    {capability: "Multi-entity consolidation", values: {ledgerline: {support: "yes", detail: "Up to 400 entities"}, spreadsheets: {support: "no"}, erp: {support: "yes"}}},
    {capability: "Audit trail for every change", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "no"}, erp: {support: "yes"}}},
    {capability: "Setup time", values: {ledgerline: {support: "yes", detail: "2 weeks"}, spreadsheets: {support: "yes", detail: "None"}, erp: {support: "partial", detail: "3 to 6 months"}}},
    {capability: "Works with NetSuite, Sage and Xero", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Exports only"}, erp: {support: "no", detail: "Its own ledger only"}}},
];

const UsVsAlternativesExample = () => (
    <UsVsAlternatives
        options={options}
        rows={rows}
        highlightId="ledgerline"
        title="Ledgerline compared with the usual month-end stack"
        description="Spreadsheets are flexible and ERP modules are thorough. Ledgerline sits between them, so the close runs on one checklist without replacing your general ledger."
        caption="Ledgerline compared with spreadsheets and ERP add-ons"
        footnote="Based on a survey of 212 finance teams, July 2026."
    />
);

export default UsVsAlternativesExample;
