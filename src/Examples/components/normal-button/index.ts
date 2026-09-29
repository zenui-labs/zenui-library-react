import type {Example} from "../../types.ts";
import BasicButton from "./BasicButton.example.tsx";
import basicButtonSource from "./BasicButton.example.tsx?raw";
import basicButtonComponentSource from "./BasicButton.tsx?raw";
import AppStoreButton from "./AppStoreButton.example.tsx";
import appStoreButtonSource from "./AppStoreButton.example.tsx?raw";
import appStoreButtonComponentSource from "./AppStoreButton.tsx?raw";
import PlayStoreButton from "./PlayStoreButton.example.tsx";
import playStoreButtonSource from "./PlayStoreButton.example.tsx?raw";
import playStoreButtonComponentSource from "./PlayStoreButton.tsx?raw";
import DownloadButton from "./DownloadButton.example.tsx";
import downloadButtonSource from "./DownloadButton.example.tsx?raw";
import downloadButtonComponentSource from "./DownloadButton.tsx?raw";
import AddToCartButton from "./AddToCartButton.example.tsx";
import addToCartButtonSource from "./AddToCartButton.example.tsx?raw";
import addToCartButtonComponentSource from "./AddToCartButton.tsx?raw";
import IconButtons from "./IconButtons.example.tsx";
import iconButtonsSource from "./IconButtons.example.tsx?raw";
import iconButtonsComponentSource from "./IconButtons.tsx?raw";
import LeafButton from "./LeafButton.example.tsx";
import leafButtonSource from "./LeafButton.example.tsx?raw";
import leafButtonComponentSource from "./LeafButton.tsx?raw";

const examples: Example[] = [
    {
        id: "normal_button",
        title: "Normal button",
        description: "Plain buttons in solid and outline styles, in blue, black and red, for everyday actions on any page.",
        component: BasicButton,
        source: basicButtonSource,
        files: [{name: "BasicButton.tsx", source: basicButtonComponentSource}],
    },
    {
        id: "appstore_button",
        title: "App Store button",
        description: "A Download on the App Store badge that links to the app's store page. Comes in solid, outline and gradient styles.",
        component: AppStoreButton,
        source: appStoreButtonSource,
        files: [{name: "AppStoreButton.tsx", source: appStoreButtonComponentSource}],
    },
    {
        id: "playstore_button",
        title: "Play Store button",
        description: "A Get it on Google Play badge that links to the app's store page, with a full color or single color logo.",
        component: PlayStoreButton,
        source: playStoreButtonSource,
        files: [{name: "PlayStoreButton.tsx", source: playStoreButtonComponentSource}],
        minHeight: 440,
    },
    {
        id: "download_button",
        title: "Download button",
        description: "Download buttons in four layouts, with the icon before or after the label, in an end cap or in a circle.",
        component: DownloadButton,
        source: downloadButtonSource,
        files: [{name: "DownloadButton.tsx", source: downloadButtonComponentSource}],
    },
    {
        id: "add_to_cart_button",
        title: "Add to cart button",
        description: "A button that adds the selected item to the shopping cart, as a solid button or a bordered pill.",
        component: AddToCartButton,
        source: addToCartButtonSource,
        files: [{name: "AddToCartButton.tsx", source: addToCartButtonComponentSource}],
    },
    {
        id: "variants_button",
        title: "Button variants",
        description: "Icon only buttons and buttons with a label and an icon, in solid or outline styles and round or square shapes.",
        component: IconButtons,
        source: iconButtonsSource,
        files: [{name: "IconButtons.tsx", source: iconButtonsComponentSource}],
    },
    {
        id: "buttons_shape",
        title: "Button shapes",
        description: "Outline buttons with two opposite corners rounded into a leaf shape. They fill with the accent color on hover.",
        component: LeafButton,
        source: leafButtonSource,
        files: [{name: "LeafButton.tsx", source: leafButtonComponentSource}],
    },
];

export default examples;
