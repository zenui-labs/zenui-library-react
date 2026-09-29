import type {Example} from "../../types.ts";
import PlainBreadcrumb from "./PlainBreadcrumb.example.tsx";
import plainBreadcrumbSource from "./PlainBreadcrumb.example.tsx?raw";
import plainBreadcrumbComponentSource from "./PlainBreadcrumb.tsx?raw";
import LinkBreadcrumb from "./LinkBreadcrumb.example.tsx";
import linkBreadcrumbSource from "./LinkBreadcrumb.example.tsx?raw";
import linkBreadcrumbComponentSource from "./LinkBreadcrumb.tsx?raw";
import DropdownBreadcrumb from "./DropdownBreadcrumb.example.tsx";
import dropdownBreadcrumbSource from "./DropdownBreadcrumb.example.tsx?raw";
import dropdownBreadcrumbComponentSource from "./DropdownBreadcrumb.tsx?raw";
import ColoredBreadcrumb from "./ColoredBreadcrumb.example.tsx";
import coloredBreadcrumbSource from "./ColoredBreadcrumb.example.tsx?raw";
import coloredBreadcrumbComponentSource from "./ColoredBreadcrumb.tsx?raw";
import PageHeaderBreadcrumb from "./PageHeaderBreadcrumb.example.tsx";
import pageHeaderBreadcrumbSource from "./PageHeaderBreadcrumb.example.tsx?raw";
import pageHeaderBreadcrumbComponentSource from "./PageHeaderBreadcrumb.tsx?raw";

const examples: Example[] = [
    {
        id: "non_clickable_breadcrumb",
        title: "Non-clickable breadcrumb",
        description: "A breadcrumb that shows the path to the current page as plain text, without links.",
        component: PlainBreadcrumb,
        source: plainBreadcrumbSource,
        files: [{name: "PlainBreadcrumb.tsx", source: plainBreadcrumbComponentSource}],
    },
    {
        id: "clickable_breadcrumb",
        title: "Clickable breadcrumb",
        description: "A breadcrumb with links for moving back to earlier pages or sections.",
        component: LinkBreadcrumb,
        source: linkBreadcrumbSource,
        files: [{name: "LinkBreadcrumb.tsx", source: linkBreadcrumbComponentSource}],
    },
    {
        id: "dropdown_breadcrumb",
        title: "Dropdown breadcrumb",
        description: "A breadcrumb that collapses the deeper links into a dropdown once the path passes a set length.",
        component: DropdownBreadcrumb,
        source: dropdownBreadcrumbSource,
        files: [{name: "DropdownBreadcrumb.tsx", source: dropdownBreadcrumbComponentSource}],
        minHeight: 340,
    },
    {
        id: "customizable_breadcrumb",
        title: "Customizable breadcrumb",
        description: "A breadcrumb on a tinted bar. Pick a preset color or pass your own background, text and current item classes.",
        component: ColoredBreadcrumb,
        source: coloredBreadcrumbSource,
        files: [{name: "ColoredBreadcrumb.tsx", source: coloredBreadcrumbComponentSource}],
    },
    {
        id: "modern_breadcrumb",
        title: "Breadcrumb with back button and title",
        description: "A page header with a back button, a page title and breadcrumb links built with React Router. Useful for detail pages.",
        component: PageHeaderBreadcrumb,
        source: pageHeaderBreadcrumbSource,
        files: [{name: "PageHeaderBreadcrumb.tsx", source: pageHeaderBreadcrumbComponentSource}],
    },
];

export default examples;
