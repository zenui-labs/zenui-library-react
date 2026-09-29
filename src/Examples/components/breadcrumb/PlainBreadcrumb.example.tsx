import {PlainBreadcrumb, type BreadcrumbItem} from "./PlainBreadcrumb";

const items: BreadcrumbItem[] = [
    {label: "Home"},
    {label: "Category"},
    {label: "Sub Category"},
    {label: "Current Page"},
];

const PlainBreadcrumbExample = () => <PlainBreadcrumb items={items}/>;

export default PlainBreadcrumbExample;
