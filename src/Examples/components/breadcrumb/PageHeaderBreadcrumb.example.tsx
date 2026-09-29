import {PageHeaderBreadcrumb, type BreadcrumbLink} from "./PageHeaderBreadcrumb";

const items: BreadcrumbLink[] = [
    {label: "Home", href: "/"},
    {label: "Shop", href: "/shop"},
    {label: "Electronics", href: "/shop/electronics"},
    {label: "Laptop", href: "/shop/electronics/laptop"},
];

const PageHeaderBreadcrumbExample = () => <PageHeaderBreadcrumb title="Product Detail" items={items}/>;

export default PageHeaderBreadcrumbExample;
