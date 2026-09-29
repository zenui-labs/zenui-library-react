import type {Example} from "../../types.ts";
import CategoryOfferGrid from "./CategoryOfferGrid.example.tsx";
import categoryOfferGridSource from "./CategoryOfferGrid.example.tsx?raw";
import categoryOfferGridComponentSource from "./CategoryOfferGrid.tsx?raw";
import DarkOfferGrid from "./DarkOfferGrid.example.tsx";
import darkOfferGridSource from "./DarkOfferGrid.example.tsx?raw";
import darkOfferGridComponentSource from "./DarkOfferGrid.tsx?raw";
import ProductShowcaseGrid from "./ProductShowcaseGrid.example.tsx";
import productShowcaseGridSource from "./ProductShowcaseGrid.example.tsx?raw";
import productShowcaseGridComponentSource from "./ProductShowcaseGrid.tsx?raw";
import CountdownOffer from "./CountdownOffer.example.tsx";
import countdownOfferSource from "./CountdownOffer.example.tsx?raw";
import countdownOfferComponentSource from "./CountdownOffer.tsx?raw";
import ProductPromoBanner from "./ProductPromoBanner.example.tsx";
import productPromoBannerSource from "./ProductPromoBanner.example.tsx?raw";
import productPromoBannerComponentSource from "./ProductPromoBanner.tsx?raw";

const examples: Example[] = [
    {
        id: "offer_grid_1",
        title: "Offer grid 1",
        description: "A tall category card next to two smaller ones, each with a shop link. Use it to send shoppers to your main store sections.",
        component: CategoryOfferGrid,
        source: categoryOfferGridSource,
        files: [{name: "CategoryOfferGrid.tsx", source: categoryOfferGridComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "offer_grid_2",
        title: "Offer grid 2",
        description: "A dark promo grid with a large product tile, a wide collection tile and two small tiles. Use it to feature top deals and collections together.",
        component: DarkOfferGrid,
        source: darkOfferGridSource,
        files: [{name: "DarkOfferGrid.tsx", source: darkOfferGridComponentSource}],
        layout: "full",
        minHeight: 480,
    },
    {
        id: "offer_grid-3",
        title: "Offer grid 3",
        description: "A product showcase with a lead card, a tall featured card with a shop button and two small tiles. Use it to present premium brands on a store home page.",
        component: ProductShowcaseGrid,
        source: productShowcaseGridSource,
        files: [{name: "ProductShowcaseGrid.tsx", source: productShowcaseGridComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "offer_grid_4",
        title: "Offer grid 4",
        description: "An image next to a promotion panel with a live countdown to the end of the offer. Use it for time limited discounts.",
        component: CountdownOffer,
        source: countdownOfferSource,
        files: [{name: "CountdownOffer.tsx", source: countdownOfferComponentSource}],
        layout: "full",
        minHeight: 480,
    },
    {
        id: "offer_grid_5",
        title: "Offer grid 5",
        description: "A wide banner for a single product with a savings badge, a price bubble and a shop button. Use it to promote one product between other sections.",
        component: ProductPromoBanner,
        source: productPromoBannerSource,
        files: [{name: "ProductPromoBanner.tsx", source: productPromoBannerComponentSource}],
        layout: "full",
        minHeight: 360,
    },
];

export default examples;
