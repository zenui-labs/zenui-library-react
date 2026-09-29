import type {Example} from "../../types.ts";
import NotFoundPhoto from "./NotFoundPhoto.example.tsx";
import notFoundPhotoSource from "./NotFoundPhoto.example.tsx?raw";
import notFoundPhotoComponentSource from "./NotFoundPhoto.tsx?raw";
import NotFoundSplit from "./NotFoundSplit.example.tsx";
import notFoundSplitSource from "./NotFoundSplit.example.tsx?raw";
import notFoundSplitComponentSource from "./NotFoundSplit.tsx?raw";
import NotFoundCentered from "./NotFoundCentered.example.tsx";
import notFoundCenteredSource from "./NotFoundCentered.example.tsx?raw";
import notFoundCenteredComponentSource from "./NotFoundCentered.tsx?raw";
import NotFoundColored from "./NotFoundColored.example.tsx";
import notFoundColoredSource from "./NotFoundColored.example.tsx?raw";
import notFoundColoredComponentSource from "./NotFoundColored.tsx?raw";
import NotFoundHeadline from "./NotFoundHeadline.example.tsx";
import notFoundHeadlineSource from "./NotFoundHeadline.example.tsx?raw";
import notFoundHeadlineComponentSource from "./NotFoundHeadline.tsx?raw";

const examples: Example[] = [
    {
        id: "empty_page_1",
        title: "404 page 1",
        description: "A 404 card with a full photo background, a large headline and a link back to the homepage. Swap the photo and text to match your brand.",
        component: NotFoundPhoto,
        source: notFoundPhotoSource,
        files: [{name: "NotFoundPhoto.tsx", source: notFoundPhotoComponentSource}],
        layout: "full",
        minHeight: 680,
    },
    {
        id: "empty_page_2",
        title: "404 page 2",
        description: "A 404 card with an illustration beside a headline, a short message and a homepage link. The two columns stack on small screens.",
        component: NotFoundSplit,
        source: notFoundSplitSource,
        files: [{name: "NotFoundSplit.tsx", source: notFoundSplitComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "empty_page_3",
        title: "404 page 3",
        description: "A centered 404 card with a large illustration, a message that the URL was not found and a home link.",
        component: NotFoundCentered,
        source: notFoundCenteredSource,
        files: [{name: "NotFoundCentered.tsx", source: notFoundCenteredComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "empty_page_4",
        title: "404 page 4",
        description: "A 404 card on a solid dark green background with an illustration, a short message and a white home button.",
        component: NotFoundColored,
        source: notFoundColoredSource,
        files: [{name: "NotFoundColored.tsx", source: notFoundColoredComponentSource}],
        layout: "full",
        minHeight: 600,
    },
    {
        id: "empty_page_5",
        title: "404 page 5",
        description: "A 404 card with a wide illustration, a bold headline and an outlined home button that adapts to dark mode.",
        component: NotFoundHeadline,
        source: notFoundHeadlineSource,
        files: [{name: "NotFoundHeadline.tsx", source: notFoundHeadlineComponentSource}],
        layout: "full",
        minHeight: 640,
    },
];

export default examples;
