import type {Example} from "../../types.ts";
import StarRating from "./StarRating.example.tsx";
import starRatingSource from "./StarRating.example.tsx?raw";
import starRatingComponentSource from "./StarRating.tsx?raw";
import HoverStarRating from "./HoverStarRating.example.tsx";
import hoverStarRatingSource from "./HoverStarRating.example.tsx?raw";
import hoverStarRatingComponentSource from "./HoverStarRating.tsx?raw";
import RatingCard from "./RatingCard.example.tsx";
import ratingCardSource from "./RatingCard.example.tsx?raw";
import ratingCardComponentSource from "./RatingCard.tsx?raw";
import FeedbackRatingCard from "./FeedbackRatingCard.example.tsx";
import feedbackRatingCardSource from "./FeedbackRatingCard.example.tsx?raw";
import feedbackRatingCardComponentSource from "./FeedbackRatingCard.tsx?raw";
import NumberRatingCard from "./NumberRatingCard.example.tsx";
import numberRatingCardSource from "./NumberRatingCard.example.tsx?raw";
import numberRatingCardComponentSource from "./NumberRatingCard.tsx?raw";

const examples: Example[] = [
    {
        id: "click_navigation",
        title: "Click navigation",
        description: "A star rating where people click a star to choose a rating.",
        component: StarRating,
        source: starRatingSource,
        files: [{name: "StarRating.tsx", source: starRatingComponentSource}],
    },
    {
        id: "hover_navigation",
        title: "Hover navigation",
        description: "A star rating that previews the rating as the pointer moves over the stars, then keeps it on click.",
        component: HoverStarRating,
        source: hoverStarRatingSource,
        files: [{name: "HoverStarRating.tsx", source: hoverStarRatingComponentSource}],
    },
    {
        id: "rating_modal",
        title: "Rating modal",
        description: "A card that asks for a star rating after an order, with a short context line and a close button.",
        component: RatingCard,
        source: ratingCardSource,
        files: [{name: "RatingCard.tsx", source: ratingCardComponentSource}],
    },
    {
        id: "rating_with_feedback",
        title: "Rating with feedback",
        description: "A star rating with a comment field, so people can send a score and written feedback together.",
        component: FeedbackRatingCard,
        source: feedbackRatingCardSource,
        files: [{name: "FeedbackRatingCard.tsx", source: feedbackRatingCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "rate_via_count",
        title: "Rate via count",
        description: "A rating card where people pick a score from a row of numbered buttons.",
        component: NumberRatingCard,
        source: numberRatingCardSource,
        files: [{name: "NumberRatingCard.tsx", source: numberRatingCardComponentSource}],
        minHeight: 420,
    },
];

export default examples;
