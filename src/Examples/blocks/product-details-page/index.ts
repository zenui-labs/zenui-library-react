import type {Example} from "../../types.ts";
import ProductDetailsWithSpecs from "./ProductDetailsWithSpecs.example.tsx";
import productDetailsWithSpecsSource from "./ProductDetailsWithSpecs.example.tsx?raw";
import productDetailsWithSpecsComponentSource from "./ProductDetailsWithSpecs.tsx?raw";
import ProductDetailsWithCountdown from "./ProductDetailsWithCountdown.example.tsx";
import productDetailsWithCountdownSource from "./ProductDetailsWithCountdown.example.tsx?raw";
import productDetailsWithCountdownComponentSource from "./ProductDetailsWithCountdown.tsx?raw";
import ProductDetailsWithSizes from "./ProductDetailsWithSizes.example.tsx";
import productDetailsWithSizesSource from "./ProductDetailsWithSizes.example.tsx?raw";
import productDetailsWithSizesComponentSource from "./ProductDetailsWithSizes.tsx?raw";

const examples: Example[] = [
    {
        id: "product_details_page_1",
        title: "Product details page 1",
        description: "A product page with a thumbnail gallery, color and storage pickers, a spec grid and delivery notes. Use it for electronics and other products with technical specs.",
        component: ProductDetailsWithSpecs,
        source: productDetailsWithSpecsSource,
        files: [{name: "ProductDetailsWithSpecs.tsx", source: productDetailsWithSpecsComponentSource}],
        layout: "full",
        minHeight: 760,
    },
    {
        id: "product_details_page_2",
        title: "Product details page 2",
        description: "A product page with an image carousel, sale tags, a countdown to the end of the offer and a quantity stepper. Use it for products on a time limited sale.",
        component: ProductDetailsWithCountdown,
        source: productDetailsWithCountdownSource,
        files: [{name: "ProductDetailsWithCountdown.tsx", source: productDetailsWithCountdownComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "product_details_page_3",
        title: "Product details page 3",
        description: "A product page with side image controls, color swatches, a size picker and add to cart and checkout buttons. Use it for clothing and other products sold in sizes.",
        component: ProductDetailsWithSizes,
        source: productDetailsWithSizesSource,
        files: [{name: "ProductDetailsWithSizes.tsx", source: productDetailsWithSizesComponentSource}],
        layout: "full",
        minHeight: 720,
    },
];

export default examples;
