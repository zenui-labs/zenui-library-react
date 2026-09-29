import type {Example} from "../../types.ts";
import GlareCard from "./GlareCard.example.tsx";
import glareCardSource from "./GlareCard.example.tsx?raw";
import glareCardComponentSource from "./GlareCard.tsx?raw";
import ParallaxCard from "./ParallaxCard.example.tsx";
import parallaxCardSource from "./ParallaxCard.example.tsx?raw";
import parallaxCardComponentSource from "./ParallaxCard.tsx?raw";
import HolographicCard from "./HolographicCard.example.tsx";
import holographicCardSource from "./HolographicCard.example.tsx?raw";
import holographicCardComponentSource from "./HolographicCard.tsx?raw";
import ProductTiltCard from "./ProductTiltCard.example.tsx";
import productTiltCardSource from "./ProductTiltCard.example.tsx?raw";
import productTiltCardComponentSource from "./ProductTiltCard.tsx?raw";
import FlipPaymentCard from "./FlipPaymentCard.example.tsx";
import flipPaymentCardSource from "./FlipPaymentCard.example.tsx?raw";
import flipPaymentCardComponentSource from "./FlipPaymentCard.tsx?raw";
import SwipeTiltStack from "./SwipeTiltStack.example.tsx";
import swipeTiltStackSource from "./SwipeTiltStack.example.tsx?raw";
import swipeTiltStackComponentSource from "./SwipeTiltStack.tsx?raw";
import MotionSensorCard from "./MotionSensorCard.example.tsx";
import motionSensorCardSource from "./MotionSensorCard.example.tsx?raw";
import motionSensorCardComponentSource from "./MotionSensorCard.tsx?raw";

const examples: Example[] = [
    {
        id: "glare-card",
        title: "Tilt card with glare",
        description: "A ticket that tilts toward the pointer while a reflection moves across its surface. Use it for passes, gift cards and membership cards.",
        component: GlareCard,
        source: glareCardSource,
        files: [{name: "GlareCard.tsx", source: glareCardComponentSource}],
        minHeight: 380,
    },
    {
        id: "parallax-card",
        title: "Layered parallax card",
        description: "The card tilts and each layer of the illustration moves at a different depth. Use it for travel, product and portfolio cards.",
        component: ParallaxCard,
        source: parallaxCardSource,
        files: [{name: "ParallaxCard.tsx", source: parallaxCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "holographic-card",
        title: "Holographic foil card",
        description: "A collectible card where rainbow foil and a sparkle texture slide as it tilts, blended so they shimmer over the light parts of the art. Use it for badges, rewards and member cards.",
        component: HolographicCard,
        source: holographicCardSource,
        files: [{name: "HolographicCard.tsx", source: holographicCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "product-tilt-card",
        title: "3D product card",
        description: "The product floats above the card on its own depth while its shadow slides the other way. Picking a finish recolors the product in place.",
        component: ProductTiltCard,
        source: productTiltCardSource,
        files: [{name: "ProductTiltCard.tsx", source: productTiltCardComponentSource}],
        minHeight: 580,
    },
    {
        id: "flip-payment-card",
        title: "Payment card with flip",
        description: "A card that tilts toward the pointer and flips to show its back on click. Tilt and flip are separate springs, so it keeps tilting while it turns.",
        component: FlipPaymentCard,
        source: flipPaymentCardSource,
        files: [{name: "FlipPaymentCard.tsx", source: flipPaymentCardComponentSource}],
        minHeight: 380,
    },
    {
        id: "swipe-tilt-stack",
        title: "Swipeable tilt stack",
        description: "A stack of postcards where the top card tilts toward the pointer and can be flung aside to send it to the back. Arrow keys and buttons work too.",
        component: SwipeTiltStack,
        source: swipeTiltStackSource,
        files: [{name: "SwipeTiltStack.tsx", source: swipeTiltStackComponentSource}],
        minHeight: 520,
    },
    {
        id: "motion-sensor-card",
        title: "Device motion tilt",
        description: "Tilts with the phone's gyroscope, falls back to the pointer on desktop and drifts on its own when nothing is moving it. Handles the iOS permission prompt.",
        component: MotionSensorCard,
        source: motionSensorCardSource,
        files: [{name: "MotionSensorCard.tsx", source: motionSensorCardComponentSource}],
        minHeight: 580,
    },
];

export default examples;
