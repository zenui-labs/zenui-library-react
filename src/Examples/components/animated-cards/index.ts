import type {Example} from "../../types.ts";
import ImageRevealCard from "./ImageRevealCard.example.tsx";
import imageRevealCardSource from "./ImageRevealCard.example.tsx?raw";
import imageRevealCardComponentSource from "./ImageRevealCard.tsx?raw";
import CornerFillCard from "./CornerFillCard.example.tsx";
import cornerFillCardSource from "./CornerFillCard.example.tsx?raw";
import cornerFillCardComponentSource from "./CornerFillCard.tsx?raw";
import ProfileRevealCard from "./ProfileRevealCard.example.tsx";
import profileRevealCardSource from "./ProfileRevealCard.example.tsx?raw";
import profileRevealCardComponentSource from "./ProfileRevealCard.tsx?raw";
import SpotlightCard from "./SpotlightCard.example.tsx";
import spotlightCardSource from "./SpotlightCard.example.tsx?raw";
import spotlightCardComponentSource from "./SpotlightCard.tsx?raw";
import FlipCard from "./FlipCard.example.tsx";
import flipCardSource from "./FlipCard.example.tsx?raw";
import flipCardComponentSource from "./FlipCard.tsx?raw";
import ZoomTiltCard from "./ZoomTiltCard.example.tsx";
import zoomTiltCardSource from "./ZoomTiltCard.example.tsx?raw";
import zoomTiltCardComponentSource from "./ZoomTiltCard.tsx?raw";
import ExpandingImageCard from "./ExpandingImageCard.example.tsx";
import expandingImageCardSource from "./ExpandingImageCard.example.tsx?raw";
import expandingImageCardComponentSource from "./ExpandingImageCard.tsx?raw";
import StackedLayerCard from "./StackedLayerCard.example.tsx";
import stackedLayerCardSource from "./StackedLayerCard.example.tsx?raw";
import stackedLayerCardComponentSource from "./StackedLayerCard.tsx?raw";
import FocusGrid from "./FocusGrid.example.tsx";
import focusGridSource from "./FocusGrid.example.tsx?raw";
import focusGridComponentSource from "./FocusGrid.tsx?raw";
import BlurOverlayCard from "./BlurOverlayCard.example.tsx";
import blurOverlayCardSource from "./BlurOverlayCard.example.tsx?raw";
import blurOverlayCardComponentSource from "./BlurOverlayCard.tsx?raw";
import CircleFillCard from "./CircleFillCard.example.tsx";
import circleFillCardSource from "./CircleFillCard.example.tsx?raw";
import circleFillCardComponentSource from "./CircleFillCard.tsx?raw";

const examples: Example[] = [
    {
        id: "hover-animated-card-1",
        title: "Image reveal card",
        description: "An image card that zooms in on hover while the title moves to the center and a description and button fade in.",
        component: ImageRevealCard,
        source: imageRevealCardSource,
        files: [{name: "ImageRevealCard.tsx", source: imageRevealCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "hover-animated-card-2",
        title: "Corner fill card",
        description: "A text card with a colored corner that grows to fill the card on hover and turns the text white. Pass `href` to make the whole card a link.",
        component: CornerFillCard,
        source: cornerFillCardSource,
        files: [{name: "CornerFillCard.tsx", source: cornerFillCardComponentSource}],
    },
    {
        id: "hover-animated-card-3",
        title: "Profile reveal card",
        description: "A portrait card where a blurred panel rises on hover with the name, role and social links appearing one after another.",
        component: ProfileRevealCard,
        source: profileRevealCardSource,
        files: [{name: "ProfileRevealCard.tsx", source: profileRevealCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "hover-animated-card-4",
        title: "Cursor spotlight card",
        description: "A bordered card with a soft colored glow that follows the pointer. Change `accentColor` to match your brand.",
        component: SpotlightCard,
        source: spotlightCardSource,
        files: [{name: "SpotlightCard.tsx", source: spotlightCardComponentSource}],
        minHeight: 380,
    },
    {
        id: "hover-animated-card-5",
        title: "Flip card",
        description: "A card that turns over in 3D on hover, with an image and title on the front and a description and link on the back.",
        component: FlipCard,
        source: flipCardSource,
        files: [{name: "FlipCard.tsx", source: flipCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "hover-animated-card-6",
        title: "Zoom and tilt image card",
        description: "An image card that zooms and tilts its image on hover, with a stacked title in the corner. Use it for collections or campaigns.",
        component: ZoomTiltCard,
        source: zoomTiltCardSource,
        files: [{name: "ZoomTiltCard.tsx", source: zoomTiltCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "hover-animated-card-7",
        title: "Expanding image card",
        description: "A story card whose image grows to fill the card and fades on hover, revealing a heart and a duration in the top corners.",
        component: ExpandingImageCard,
        source: expandingImageCardSource,
        files: [{name: "ExpandingImageCard.tsx", source: expandingImageCardComponentSource}],
        minHeight: 440,
    },
    {
        id: "hover-animated-card-8",
        title: "Stacked layer card",
        description: "A content card with two tinted layers behind it that fan out to the bottom left on hover.",
        component: StackedLayerCard,
        source: stackedLayerCardSource,
        files: [{name: "StackedLayerCard.tsx", source: stackedLayerCardComponentSource}],
        minHeight: 460,
    },
    {
        id: "hover-animated-card-9",
        title: "Focus grid",
        description: "An image grid where the hovered image grows and the others blur, so attention goes to one item at a time.",
        component: FocusGrid,
        source: focusGridSource,
        files: [{name: "FocusGrid.tsx", source: focusGridComponentSource}],
        minHeight: 480,
    },
    {
        id: "hover-animated-card-10",
        title: "Blur overlay card",
        description: "An image card that zooms its image on hover and fades in a blurred overlay with a centered title and text.",
        component: BlurOverlayCard,
        source: blurOverlayCardSource,
        files: [{name: "BlurOverlayCard.tsx", source: blurOverlayCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "hover-animated-card-11",
        title: "Circle fill card",
        description: "A logo card where the circle behind the logo grows until it fills the card on hover.",
        component: CircleFillCard,
        source: circleFillCardSource,
        files: [{name: "CircleFillCard.tsx", source: circleFillCardComponentSource}],
        minHeight: 420,
    },
];

export default examples;
