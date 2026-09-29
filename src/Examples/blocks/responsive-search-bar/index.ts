import type {Example} from "../../types.ts";
import ProductSearchBar from "./ProductSearchBar.example.tsx";
import productSearchBarSource from "./ProductSearchBar.example.tsx?raw";
import productSearchBarComponentSource from "./ProductSearchBar.tsx?raw";
import ActionSearchBar from "./ActionSearchBar.example.tsx";
import actionSearchBarSource from "./ActionSearchBar.example.tsx?raw";
import actionSearchBarComponentSource from "./ActionSearchBar.tsx?raw";
import ShortcutSearchBar from "./ShortcutSearchBar.example.tsx";
import shortcutSearchBarSource from "./ShortcutSearchBar.example.tsx?raw";
import shortcutSearchBarComponentSource from "./ShortcutSearchBar.tsx?raw";

const examples: Example[] = [
    {
        id: "product_search_bar",
        title: "Product search bar",
        description: "A search field that filters a product list as you type and shows the matches in a dropdown. Use it to help shoppers find items in a store or catalog.",
        component: ProductSearchBar,
        source: productSearchBarSource,
        files: [{name: "ProductSearchBar.tsx", source: productSearchBarComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "search_bar_with_actions",
        title: "Search bar with actions",
        description: "A search field that opens a panel with removable filters, recent searches and quick actions. Use it when people refine a search or jump to a related task.",
        component: ActionSearchBar,
        source: actionSearchBarSource,
        files: [{name: "ActionSearchBar.tsx", source: actionSearchBarComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "search_bar_open_with_keypress",
        title: "Search bar opened with a keypress",
        description: "A search field that opens with Ctrl + E and lists recent searches, people and places. Use it so people can start searching without reaching for the mouse.",
        component: ShortcutSearchBar,
        source: shortcutSearchBarSource,
        files: [{name: "ShortcutSearchBar.tsx", source: shortcutSearchBarComponentSource}],
        layout: "full",
        minHeight: 840,
    },
];

export default examples;
