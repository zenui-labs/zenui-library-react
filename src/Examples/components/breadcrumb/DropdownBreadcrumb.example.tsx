import {DropdownBreadcrumb, type BreadcrumbLink} from "./DropdownBreadcrumb";

const items: BreadcrumbLink[] = [
    {label: "Home", href: "/"},
    {label: "Category", href: "/category"},
    {label: "Sub Category", href: "/sub-category"},
    {label: "About Us", href: "/about-us"},
    {label: "Contact Us", href: "/contact-us"},
    {label: "Current Page", href: "/current-page"},
];

const DropdownBreadcrumbExample = () => <DropdownBreadcrumb items={items}/>;

export default DropdownBreadcrumbExample;
