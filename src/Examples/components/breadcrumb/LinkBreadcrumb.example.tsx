import {LinkBreadcrumb, type BreadcrumbLink} from "./LinkBreadcrumb";

const items: BreadcrumbLink[] = [
    {label: "Home", href: "/"},
    {label: "Category", href: "/category"},
    {label: "Sub Category", href: "/sub-category"},
    {label: "Current Page", href: "/current-page"},
];

const LinkBreadcrumbExample = () => <LinkBreadcrumb items={items}/>;

export default LinkBreadcrumbExample;
