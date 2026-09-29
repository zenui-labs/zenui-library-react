import type {Example} from "../../types.ts";
import ExpandableCards from "./ExpandableCards.example.tsx";
import expandableCardsSource from "./ExpandableCards.example.tsx?raw";
import expandableCardsComponentSource from "./ExpandableCards.tsx?raw";
import InboxListDetail from "./InboxListDetail.example.tsx";
import inboxListDetailSource from "./InboxListDetail.example.tsx?raw";
import inboxListDetailComponentSource from "./InboxListDetail.tsx?raw";
import PhotoLightbox from "./PhotoLightbox.example.tsx";
import photoLightboxSource from "./PhotoLightbox.example.tsx?raw";
import photoLightboxComponentSource from "./PhotoLightbox.tsx?raw";
import ArticleReader from "./ArticleReader.example.tsx";
import articleReaderSource from "./ArticleReader.example.tsx?raw";
import articleReaderComponentSource from "./ArticleReader.tsx?raw";
import TeamProfileExpand from "./TeamProfileExpand.example.tsx";
import teamProfileExpandSource from "./TeamProfileExpand.example.tsx?raw";
import teamProfileExpandComponentSource from "./TeamProfileExpand.tsx?raw";
import AccordionPanels from "./AccordionPanels.example.tsx";
import accordionPanelsSource from "./AccordionPanels.example.tsx?raw";
import accordionPanelsComponentSource from "./AccordionPanels.tsx?raw";

const examples: Example[] = [
    {
        id: "expandable-cards",
        title: "Expandable cards",
        description: "Cards grow into a dialog with more detail using shared layout animations. Supports Escape to close and returns focus to the card.",
        component: ExpandableCards,
        source: expandableCardsSource,
        files: [{name: "ExpandableCards.tsx", source: expandableCardsComponentSource}],
        minHeight: 560,
    },
    {
        id: "inbox-list-detail",
        title: "List to detail",
        description: "A message row becomes the full message view, with the avatar, sender and subject moving into place. Use it for inboxes, orders and activity feeds.",
        component: InboxListDetail,
        source: inboxListDetailSource,
        files: [{name: "InboxListDetail.tsx", source: inboxListDetailComponentSource}],
        minHeight: 560,
    },
    {
        id: "photo-lightbox",
        title: "Photo grid to lightbox",
        description: "A photo grows from its tile into a viewer with arrow key browsing, then shrinks back into the tile of the photo you end on.",
        component: PhotoLightbox,
        source: photoLightboxSource,
        files: [{name: "PhotoLightbox.tsx", source: photoLightboxComponentSource}],
        minHeight: 720,
    },
    {
        id: "article-reader",
        title: "Article card to reader",
        description: "An article card opens into a scrollable reader with a progress bar and time left, keeping its cover, title and byline in view as it grows.",
        component: ArticleReader,
        source: articleReaderSource,
        files: [{name: "ArticleReader.tsx", source: articleReaderComponentSource}],
        minHeight: 600,
    },
    {
        id: "team-profile-expand",
        title: "Inline profile rows",
        description: "Team rows expand in place to show a profile, and the rows below slide down to make room. One profile is open at a time.",
        component: TeamProfileExpand,
        source: teamProfileExpandSource,
        files: [{name: "TeamProfileExpand.tsx", source: teamProfileExpandComponentSource}],
        minHeight: 600,
    },
    {
        id: "accordion-panels",
        title: "Accordion panels",
        description: "Side by side panels where the active one widens and the rest shrink to a slim label. They stack vertically on small screens.",
        component: AccordionPanels,
        source: accordionPanelsSource,
        files: [{name: "AccordionPanels.tsx", source: accordionPanelsComponentSource}],
        minHeight: 480,
    },
];

export default examples;
