import {EditableTable, type Product} from "./EditableTable";

const products: Product[] = [
    {id: "p1", name: "Linen overshirt", sku: "LN-OVR-01", price: 118, stock: 42, status: "Active"},
    {id: "p2", name: "Merino crew sock", sku: "MR-SCK-03", price: 24, stock: 6, status: "Active"},
    {id: "p3", name: "Waxed field jacket", sku: "WX-JKT-02", price: 295, stock: 14, status: "Draft"},
    {id: "p4", name: "Canvas tote", sku: "CV-TOT-05", price: 38, stock: 0, status: "Archived"},
    {id: "p5", name: "Selvedge denim", sku: "SV-DNM-11", price: 165, stock: 27, status: "Active"},
];

// Stand-in for a network request.
const save = () => new Promise<void>((resolve) => window.setTimeout(resolve, 700));

const EditableTableExample = () => <EditableTable rows={products} onSave={save}/>;

export default EditableTableExample;
