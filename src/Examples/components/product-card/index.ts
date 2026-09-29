import type {Example} from "../../types.ts";
import ClothingProductCard from "./ClothingProductCard.example.tsx";
import clothingProductCardSource from "./ClothingProductCard.example.tsx?raw";
import clothingProductCardComponentSource from "./ClothingProductCard.tsx?raw";
import JuiceProductCard from "./JuiceProductCard.example.tsx";
import juiceProductCardSource from "./JuiceProductCard.example.tsx?raw";
import juiceProductCardComponentSource from "./JuiceProductCard.tsx?raw";
import GroceryProductCard from "./GroceryProductCard.example.tsx";
import groceryProductCardSource from "./GroceryProductCard.example.tsx?raw";
import groceryProductCardComponentSource from "./GroceryProductCard.tsx?raw";
import DigitalProductCard from "./DigitalProductCard.example.tsx";
import digitalProductCardSource from "./DigitalProductCard.example.tsx?raw";
import digitalProductCardComponentSource from "./DigitalProductCard.tsx?raw";
import BookProductCard from "./BookProductCard.example.tsx";
import bookProductCardSource from "./BookProductCard.example.tsx?raw";
import bookProductCardComponentSource from "./BookProductCard.tsx?raw";
import GadgetDealCard from "./GadgetDealCard.example.tsx";
import gadgetDealCardSource from "./GadgetDealCard.example.tsx?raw";
import gadgetDealCardComponentSource from "./GadgetDealCard.tsx?raw";
import GadgetQuickViewCard from "./GadgetQuickViewCard.example.tsx";
import gadgetQuickViewCardSource from "./GadgetQuickViewCard.example.tsx?raw";
import gadgetQuickViewCardComponentSource from "./GadgetQuickViewCard.tsx?raw";
import ProductListCard from "./ProductListCard.example.tsx";
import productListCardSource from "./ProductListCard.example.tsx?raw";
import productListCardComponentSource from "./ProductListCard.tsx?raw";
import RatedProductListCard from "./RatedProductListCard.example.tsx";
import ratedProductListCardSource from "./RatedProductListCard.example.tsx?raw";
import ratedProductListCardComponentSource from "./RatedProductListCard.tsx?raw";

const examples: Example[] = [
    {
        id: "clothing_product_card",
        title: "Clothing product card",
        description: "A clothing card with the name, price, rating and color swatches. On hover the image swaps and quick actions, a quantity stepper and a cart button slide in.",
        component: ClothingProductCard,
        source: clothingProductCardSource,
        files: [{name: "ClothingProductCard.tsx", source: clothingProductCardComponentSource}],
        minHeight: 640,
    },
    {
        id: "juice_product_card",
        title: "Juice product card",
        description: "A bordered drink card with the name, rating, pack size and price, plus an add button.",
        component: JuiceProductCard,
        source: juiceProductCardSource,
        files: [{name: "JuiceProductCard.tsx", source: juiceProductCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "grocery_product_card",
        title: "Grocery product card",
        description: "A grocery card with a favorite toggle, a sale price next to the original, a quantity stepper and a cart button.",
        component: GroceryProductCard,
        source: groceryProductCardSource,
        files: [{name: "GroceryProductCard.tsx", source: groceryProductCardComponentSource}],
        minHeight: 460,
    },
    {
        id: "digital_product_card",
        title: "Digital product card",
        description: "A card for templates and other digital goods with the author, category, rating, sales count, a cart button and a preview button.",
        component: DigitalProductCard,
        source: digitalProductCardSource,
        files: [{name: "DigitalProductCard.tsx", source: digitalProductCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "book_product_card",
        title: "Book product card",
        description: "A book card with the cover, an optional badge, the genre, title, author and price.",
        component: BookProductCard,
        source: bookProductCardSource,
        files: [{name: "BookProductCard.tsx", source: bookProductCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "gadget_product_card_1",
        title: "Gadget product card 1",
        description: "A deal card with a badge, the brand, a discount, perks such as free shipping, a deal button and a favorite toggle.",
        component: GadgetDealCard,
        source: gadgetDealCardSource,
        files: [{name: "GadgetDealCard.tsx", source: gadgetDealCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "gadget_product_card_2",
        title: "Gadget product card 2",
        description: "A gadget card whose image dims on hover to show wishlist, compare and quick view buttons with tooltips.",
        component: GadgetQuickViewCard,
        source: gadgetQuickViewCardSource,
        files: [{name: "GadgetQuickViewCard.tsx", source: gadgetQuickViewCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "product_list_card_1",
        title: "Product list card 1",
        description: "A horizontal card for list layouts with the image, name and price.",
        component: ProductListCard,
        source: productListCardSource,
        files: [{name: "ProductListCard.tsx", source: productListCardComponentSource}],
    },
    {
        id: "product_list_card_2",
        title: "Product list card 2",
        description: "A compact list row with a small thumbnail, the name, a star rating and the price.",
        component: RatedProductListCard,
        source: ratedProductListCardSource,
        files: [{name: "RatedProductListCard.tsx", source: ratedProductListCardComponentSource}],
    },
];

export default examples;
