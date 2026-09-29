import type {Example} from "../../types.ts";
import BillingCheckoutPage from "./BillingCheckoutPage.example.tsx";
import billingCheckoutPageSource from "./BillingCheckoutPage.example.tsx?raw";
import billingCheckoutPageComponentSource from "./BillingCheckoutPage.tsx?raw";
import SavedCardCheckoutPage from "./SavedCardCheckoutPage.example.tsx";
import savedCardCheckoutPageSource from "./SavedCardCheckoutPage.example.tsx?raw";
import savedCardCheckoutPageComponentSource from "./SavedCardCheckoutPage.tsx?raw";

const examples: Example[] = [
    {
        id: "checkout_page_1",
        title: "Checkout page 1",
        description: "A billing form with a choice between cash on delivery and card, order notes and an order summary with a place order button. Use it for a single page checkout where shoppers enter a new address.",
        component: BillingCheckoutPage,
        source: billingCheckoutPageSource,
        files: [{name: "BillingCheckoutPage.tsx", source: billingCheckoutPageComponentSource}],
        layout: "full",
        minHeight: 1100,
    },
    {
        id: "checkout_page_2",
        title: "Checkout page 2",
        description: "The order with a discount code and totals next to contact details, saved payment methods and a billing address. Use it when returning shoppers already have a card on file.",
        component: SavedCardCheckoutPage,
        source: savedCardCheckoutPageSource,
        files: [{name: "SavedCardCheckoutPage.tsx", source: savedCardCheckoutPageComponentSource}],
        layout: "full",
        minHeight: 860,
    },
];

export default examples;
