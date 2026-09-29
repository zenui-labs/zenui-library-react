import type {Example} from "../../types.ts";
import FloatingAvatarTestimonial from "./FloatingAvatarTestimonial.example.tsx";
import floatingAvatarTestimonialSource from "./FloatingAvatarTestimonial.example.tsx?raw";
import floatingAvatarTestimonialComponentSource from "./FloatingAvatarTestimonial.tsx?raw";
import SplitImageTestimonial from "./SplitImageTestimonial.example.tsx";
import splitImageTestimonialSource from "./SplitImageTestimonial.example.tsx?raw";
import splitImageTestimonialComponentSource from "./SplitImageTestimonial.tsx?raw";
import CompactTestimonial from "./CompactTestimonial.example.tsx";
import compactTestimonialSource from "./CompactTestimonial.example.tsx?raw";
import compactTestimonialComponentSource from "./CompactTestimonial.tsx?raw";
import ProfileTestimonial from "./ProfileTestimonial.example.tsx";
import profileTestimonialSource from "./ProfileTestimonial.example.tsx?raw";
import profileTestimonialComponentSource from "./ProfileTestimonial.tsx?raw";
import HighlightTestimonial from "./HighlightTestimonial.example.tsx";
import highlightTestimonialSource from "./HighlightTestimonial.example.tsx?raw";
import highlightTestimonialComponentSource from "./HighlightTestimonial.tsx?raw";
import CoverImageTestimonial from "./CoverImageTestimonial.example.tsx";
import coverImageTestimonialSource from "./CoverImageTestimonial.example.tsx?raw";
import coverImageTestimonialComponentSource from "./CoverImageTestimonial.tsx?raw";
import OutlinedReviewTestimonial from "./OutlinedReviewTestimonial.example.tsx";
import outlinedReviewTestimonialSource from "./OutlinedReviewTestimonial.example.tsx?raw";
import outlinedReviewTestimonialComponentSource from "./OutlinedReviewTestimonial.tsx?raw";

const examples: Example[] = [
    {
        id: "testimonial_1",
        title: "Floating avatar testimonial",
        description: "A quote card with the avatar resting on its top edge and a star rating beside the author. Use it for a single featured review on a landing page.",
        component: FloatingAvatarTestimonial,
        source: floatingAvatarTestimonialSource,
        files: [{name: "FloatingAvatarTestimonial.tsx", source: floatingAvatarTestimonialComponentSource}],
    },
    {
        id: "testimonial_2",
        title: "Split image testimonial",
        description: "A wide testimonial with a photo on one side and a headline, quote and author on the other. It stacks on small screens.",
        component: SplitImageTestimonial,
        source: splitImageTestimonialSource,
        files: [{name: "SplitImageTestimonial.tsx", source: splitImageTestimonialComponentSource}],
    },
    {
        id: "testimonial_3",
        title: "Compact testimonial",
        description: "A plain card with a headline, the quote and a small avatar next to the author. Works well in a grid of several reviews.",
        component: CompactTestimonial,
        source: compactTestimonialSource,
        files: [{name: "CompactTestimonial.tsx", source: compactTestimonialComponentSource}],
    },
    {
        id: "testimonial_4",
        title: "Profile testimonial",
        description: "A centered card that leads with a large portrait, then the name, location, star rating and the quote.",
        component: ProfileTestimonial,
        source: profileTestimonialSource,
        files: [{name: "ProfileTestimonial.tsx", source: profileTestimonialComponentSource}],
    },
    {
        id: "testimonial_5",
        title: "Highlight testimonial",
        description: "A solid color card with a large headline for the review you want to stand out. Pass an accent color to match your brand.",
        component: HighlightTestimonial,
        source: highlightTestimonialSource,
        files: [{name: "HighlightTestimonial.tsx", source: highlightTestimonialComponentSource}],
    },
    {
        id: "testimonial_6",
        title: "Cover image testimonial",
        description: "A card with a cover photo on top, a quote badge on its edge and the quote and author below.",
        component: CoverImageTestimonial,
        source: coverImageTestimonialSource,
        files: [{name: "CoverImageTestimonial.tsx", source: coverImageTestimonialComponentSource}],
    },
    {
        id: "testimonial_7",
        title: "Outlined review testimonial",
        description: "An outlined, horizontal review with a round portrait, the author and rating on one line, a headline and the quote.",
        component: OutlinedReviewTestimonial,
        source: outlinedReviewTestimonialSource,
        files: [{name: "OutlinedReviewTestimonial.tsx", source: outlinedReviewTestimonialComponentSource}],
    },
];

export default examples;
