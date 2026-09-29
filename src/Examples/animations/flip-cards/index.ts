import type {Example} from "../../types.ts";
import HoverFlip from "./HoverFlip.example.tsx";
import hoverFlipSource from "./HoverFlip.example.tsx?raw";
import hoverFlipComponentSource from "./HoverFlip.tsx?raw";
import ClickFlip from "./ClickFlip.example.tsx";
import clickFlipSource from "./ClickFlip.example.tsx?raw";
import clickFlipComponentSource from "./ClickFlip.tsx?raw";
import PricingFlip from "./PricingFlip.example.tsx";
import pricingFlipSource from "./PricingFlip.example.tsx?raw";
import pricingFlipComponentSource from "./PricingFlip.tsx?raw";
import FlashcardDeck from "./FlashcardDeck.example.tsx";
import flashcardDeckSource from "./FlashcardDeck.example.tsx?raw";
import flashcardDeckComponentSource from "./FlashcardDeck.tsx?raw";
import PaymentCard from "./PaymentCard.example.tsx";
import paymentCardSource from "./PaymentCard.example.tsx?raw";
import paymentCardComponentSource from "./PaymentCard.tsx?raw";
import ProductSpecs from "./ProductSpecs.example.tsx";
import productSpecsSource from "./ProductSpecs.example.tsx?raw";
import productSpecsComponentSource from "./ProductSpecs.tsx?raw";
import FoldingPass from "./FoldingPass.example.tsx";
import foldingPassSource from "./FoldingPass.example.tsx?raw";
import foldingPassComponentSource from "./FoldingPass.tsx?raw";
import CardFan from "./CardFan.example.tsx";
import cardFanSource from "./CardFan.example.tsx?raw";
import cardFanComponentSource from "./CardFan.tsx?raw";

const examples: Example[] = [
    {
        id: "hover-flip",
        title: "Flip on hover or focus",
        description: "Travel cards that turn over on mouse hover, keyboard focus or a tap. The back face stays out of the tab order until it is showing.",
        component: HoverFlip,
        source: hoverFlipSource,
        files: [{name: "HoverFlip.tsx", source: hoverFlipComponentSource}],
        minHeight: 400,
    },
    {
        id: "click-flip",
        title: "Flip on click",
        description: "A profile card that flips with a button and moves focus to the face that is now showing. Use it for team directories and contact cards.",
        component: ClickFlip,
        source: clickFlipSource,
        files: [{name: "ClickFlip.tsx", source: clickFlipComponentSource}],
        minHeight: 520,
    },
    {
        id: "pricing-flip",
        title: "Vertical flip on billing change",
        description: "Switching between monthly and yearly billing flips each price on its horizontal axis, one card after another.",
        component: PricingFlip,
        source: pricingFlipSource,
        files: [{name: "PricingFlip.tsx", source: pricingFlipComponentSource}],
        minHeight: 560,
    },
    {
        id: "flashcard-deck",
        title: "Flashcard deck",
        description: "Flip a card to see the answer, then move through the deck with buttons or the arrow keys. Cards slide in from the side you are moving toward.",
        component: FlashcardDeck,
        source: flashcardDeckSource,
        files: [{name: "FlashcardDeck.tsx", source: flashcardDeckComponentSource}],
        minHeight: 560,
    },
    {
        id: "payment-card",
        title: "Payment card preview",
        description: "The card fills in as you type, outlines the matching field, and turns over when the security code field is focused.",
        component: PaymentCard,
        source: paymentCardSource,
        files: [{name: "PaymentCard.tsx", source: paymentCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "product-specs",
        title: "Product card with specs",
        description: "The card lifts, turns over and sets down again to show specifications, with each row and bar animating in after the turn.",
        component: ProductSpecs,
        source: productSpecsSource,
        files: [{name: "ProductSpecs.tsx", source: productSpecsComponentSource}],
        minHeight: 560,
    },
    {
        id: "folding-pass",
        title: "Folding boarding pass",
        description: "A pass folded in three that opens one panel at a time, each swinging down from behind the one above it.",
        component: FoldingPass,
        source: foldingPassSource,
        files: [{name: "FoldingPass.tsx", source: foldingPassComponentSource}],
        minHeight: 520,
    },
    {
        id: "card-fan",
        title: "Card stack that fans out",
        description: "A wallet of stacked cards that spreads into a fan. Picking a card sends it to the top of the stack.",
        component: CardFan,
        source: cardFanSource,
        files: [{name: "CardFan.tsx", source: cardFanComponentSource}],
        minHeight: 420,
    },
];

export default examples;
