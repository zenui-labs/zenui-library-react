import {ShredderDelete, type ShredderDocument} from "./ShredderDelete";

const documents: ShredderDocument[] = [
    {id: "inv-2041", name: "INV-2041_Halvorsen-Co.pdf", meta: "142 KB · 03 Sep 2026", amount: "€1,240.00"},
    {id: "inv-2038", name: "INV-2038_Nordlys-Print.pdf", meta: "98 KB · 28 Aug 2026", amount: "€386.50"},
    {id: "cn-0117", name: "Credit-note_CN-0117.pdf", meta: "61 KB · 21 Aug 2026", amount: "−€72.00"},
    {id: "inv-2029", name: "INV-2029_Brightwater-AV.pdf", meta: "210 KB · 14 Aug 2026", amount: "€4,915.20"},
    {id: "rcpt-8812", name: "Receipt_Taxi-Rotterdam.pdf", meta: "34 KB · 09 Aug 2026", amount: "€38.60"},
];

const ShredderDeleteExample = () => (
    <ShredderDelete title="Q3 vendor invoices" documents={documents} undoSeconds={6}/>
);

export default ShredderDeleteExample;
