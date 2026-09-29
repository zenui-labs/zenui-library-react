import {LuPackage, LuReceipt, LuUser} from "react-icons/lu";
import {SearchPopover, type NavLink, type SearchCategory, type SearchHit, type StatTile} from "./SearchPopover";

const items: SearchHit[] = [
    {id: "o-10482", category: "orders", title: "Order #10482", meta: "Priya Nair, $248.00", badge: {label: "Paid", tone: "green"}},
    {id: "o-10479", category: "orders", title: "Order #10479", meta: "Lucas Moreau, $96.50", badge: {label: "Unfulfilled", tone: "amber"}},
    {id: "o-10471", category: "orders", title: "Order #10471", meta: "Hana Sato, $1,120.00", badge: {label: "Refunded", tone: "zinc"}},
    {id: "c-priya", category: "customers", title: "Priya Nair", meta: "14 orders, customer since 2023"},
    {id: "c-lucas", category: "customers", title: "Lucas Moreau", meta: "3 orders, Lyon, France"},
    {id: "c-hana", category: "customers", title: "Hana Sato", meta: "22 orders, wholesale account"},
    {id: "p-mug", category: "products", title: "Stoneware mug, sand", meta: "SKU MUG-012, $28.00", badge: {label: "124 in stock", tone: "green"}},
    {id: "p-tote", category: "products", title: "Canvas tote, natural", meta: "SKU TOT-004, $36.00", badge: {label: "6 left", tone: "amber"}},
    {id: "p-lamp", category: "products", title: "Linen table lamp", meta: "SKU LMP-201, $149.00", badge: {label: "Sold out", tone: "zinc"}},
];

const categories: SearchCategory[] = [
    {value: "orders", label: "Orders", icon: LuReceipt},
    {value: "customers", label: "Customers", icon: LuUser},
    {value: "products", label: "Products", icon: LuPackage},
];

const navItems: NavLink[] = [{label: "Home"}, {label: "Orders"}, {label: "Products"}, {label: "Customers"}];

const stats: StatTile[] = [
    {label: "Sales today", value: "$3,284"},
    {label: "Open orders", value: "17"},
    {label: "Visitors", value: "1,942"},
];

const SearchPopoverExample = () => (
    <SearchPopover
        brand="Fernhill Goods"
        navItems={navItems}
        stats={stats}
        items={items}
        categories={categories}
        defaultRecent={["tote", "Hana Sato", "#10471"]}
        placeholder="Search orders, customers, products"
        label="Search the store"
        emptyHint="Check the spelling or search by SKU."
        recentEmptyText="No recent searches. Try an order number or a product name."
        hint="Try searching for “tote”, “Hana” or “104”."
    />
);

export default SearchPopoverExample;
