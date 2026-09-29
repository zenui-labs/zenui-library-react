import type {Example} from "../../types.ts";
import ProductFilterPage from "./ProductFilterPage.example.tsx";
import productFilterPageSource from "./ProductFilterPage.example.tsx?raw";
import productFilterPageComponentSource from "./ProductFilterPage.tsx?raw";

const examples: Example[] = [
    {
        id: "empty_page_1",
        title: "Product filter",
        description: "A product grid with category, price, brand and tag filters in a sidebar, plus search and sort controls above the results. Use it for shop and category pages with more than a handful of products.",
        component: ProductFilterPage,
        source: productFilterPageSource,
        files: [{name: "ProductFilterPage.tsx", source: productFilterPageComponentSource}],
        layout: "full",
        minHeight: 1300,
    },
];

export default examples;
