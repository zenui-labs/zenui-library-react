import type {Example} from "../../types.ts";
import ProductSpotlightAd from "./ProductSpotlightAd.example.tsx";
import productSpotlightAdSource from "./ProductSpotlightAd.example.tsx?raw";
import productSpotlightAdComponentSource from "./ProductSpotlightAd.tsx?raw";
import ProductLaunchBanner from "./ProductLaunchBanner.example.tsx";
import productLaunchBannerSource from "./ProductLaunchBanner.example.tsx?raw";
import productLaunchBannerComponentSource from "./ProductLaunchBanner.tsx?raw";
import DealImageBanner from "./DealImageBanner.example.tsx";
import dealImageBannerSource from "./DealImageBanner.example.tsx?raw";
import dealImageBannerComponentSource from "./DealImageBanner.tsx?raw";
import PromoPosterCard from "./PromoPosterCard.example.tsx";
import promoPosterCardSource from "./PromoPosterCard.example.tsx?raw";
import promoPosterCardComponentSource from "./PromoPosterCard.tsx?raw";
import OverlayOfferBanner from "./OverlayOfferBanner.example.tsx";
import overlayOfferBannerSource from "./OverlayOfferBanner.example.tsx?raw";
import overlayOfferBannerComponentSource from "./OverlayOfferBanner.tsx?raw";
import DiscountBanner from "./DiscountBanner.example.tsx";
import discountBannerSource from "./DiscountBanner.example.tsx?raw";
import discountBannerComponentSource from "./DiscountBanner.tsx?raw";

const examples: Example[] = [
    {
        id: "ads_card_1",
        title: "Product spotlight ad",
        description: "A centered product ad with an image, a short pitch, the price and a full-width shop button. Use it in a sidebar or between product rows.",
        component: ProductSpotlightAd,
        source: productSpotlightAdSource,
        files: [{name: "ProductSpotlightAd.tsx", source: productSpotlightAdComponentSource}],
    },
    {
        id: "ads_card_2",
        title: "Product launch banner",
        description: "A wide banner that introduces a new product, with a tag, copy and a button on the left and the product image on the right. It stacks on small screens.",
        component: ProductLaunchBanner,
        source: productLaunchBannerSource,
        files: [{name: "ProductLaunchBanner.tsx", source: productLaunchBannerComponentSource}],
    },
    {
        id: "ads_card_3",
        title: "Deal image banner",
        description: "An image banner with a deal tag in the top left corner and a pill button in the bottom right. Good for category promotions.",
        component: DealImageBanner,
        source: dealImageBannerSource,
        files: [{name: "DealImageBanner.tsx", source: dealImageBannerComponentSource}],
    },
    {
        id: "ads_card_4",
        title: "Promo poster card",
        description: "A tall promo card with a centered title, a button and a large product image below.",
        component: PromoPosterCard,
        source: promoPosterCardSource,
        files: [{name: "PromoPosterCard.tsx", source: promoPosterCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "ads_card_5",
        title: "Overlay offer banner",
        description: "An image banner with the offer text and a text link laid over its left side.",
        component: OverlayOfferBanner,
        source: overlayOfferBannerSource,
        files: [{name: "OverlayOfferBanner.tsx", source: overlayOfferBannerComponentSource}],
    },
    {
        id: "ads_card_6",
        title: "Discount banner",
        description: "A dark sale banner with a discount tag, the offer copy and a product image in the corner.",
        component: DiscountBanner,
        source: discountBannerSource,
        files: [{name: "DiscountBanner.tsx", source: discountBannerComponentSource}],
    },
];

export default examples;
