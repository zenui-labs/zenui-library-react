import type {Example} from "../../types.ts";
import TicketCard from "./TicketCard.example.tsx";
import ticketCardSource from "./TicketCard.example.tsx?raw";
import ticketCardComponentSource from "./TicketCard.tsx?raw";
import ExpandableBlogCard from "./ExpandableBlogCard.example.tsx";
import expandableBlogCardSource from "./ExpandableBlogCard.example.tsx?raw";
import expandableBlogCardComponentSource from "./ExpandableBlogCard.tsx?raw";
import ProductCard from "./ProductCard.example.tsx";
import productCardSource from "./ProductCard.example.tsx?raw";
import productCardComponentSource from "./ProductCard.tsx?raw";
import MusicCard from "./MusicCard.example.tsx";
import musicCardSource from "./MusicCard.example.tsx?raw";
import musicCardComponentSource from "./MusicCard.tsx?raw";
import SimpleProfileCard from "./SimpleProfileCard.example.tsx";
import simpleProfileCardSource from "./SimpleProfileCard.example.tsx?raw";
import simpleProfileCardComponentSource from "./SimpleProfileCard.tsx?raw";
import ProfileCard from "./ProfileCard.example.tsx";
import profileCardSource from "./ProfileCard.example.tsx?raw";
import profileCardComponentSource from "./ProfileCard.tsx?raw";
import TeamCard from "./TeamCard.example.tsx";
import teamCardSource from "./TeamCard.example.tsx?raw";
import teamCardComponentSource from "./TeamCard.tsx?raw";
import FeaturePricingCard from "./FeaturePricingCard.example.tsx";
import featurePricingCardSource from "./FeaturePricingCard.example.tsx?raw";
import featurePricingCardComponentSource from "./FeaturePricingCard.tsx?raw";
import ChecklistPricingCard from "./ChecklistPricingCard.example.tsx";
import checklistPricingCardSource from "./ChecklistPricingCard.example.tsx?raw";
import checklistPricingCardComponentSource from "./ChecklistPricingCard.tsx?raw";
import RatedImageCard from "./RatedImageCard.example.tsx";
import ratedImageCardSource from "./RatedImageCard.example.tsx?raw";
import ratedImageCardComponentSource from "./RatedImageCard.tsx?raw";
import GameCard from "./GameCard.example.tsx";
import gameCardSource from "./GameCard.example.tsx?raw";
import gameCardComponentSource from "./GameCard.tsx?raw";
import BookmarkCard from "./BookmarkCard.example.tsx";
import bookmarkCardSource from "./BookmarkCard.example.tsx?raw";
import bookmarkCardComponentSource from "./BookmarkCard.tsx?raw";
import EventCard from "./EventCard.example.tsx";
import eventCardSource from "./EventCard.example.tsx?raw";
import eventCardComponentSource from "./EventCard.tsx?raw";
import FollowProfileCard from "./FollowProfileCard.example.tsx";
import followProfileCardSource from "./FollowProfileCard.example.tsx?raw";
import followProfileCardComponentSource from "./FollowProfileCard.tsx?raw";
import FeaturedImageCard from "./FeaturedImageCard.example.tsx";
import featuredImageCardSource from "./FeaturedImageCard.example.tsx?raw";
import featuredImageCardComponentSource from "./FeaturedImageCard.tsx?raw";
import ProductShowcaseCard from "./ProductShowcaseCard.example.tsx";
import productShowcaseCardSource from "./ProductShowcaseCard.example.tsx?raw";
import productShowcaseCardComponentSource from "./ProductShowcaseCard.tsx?raw";
import AuthorBioCard from "./AuthorBioCard.example.tsx";
import authorBioCardSource from "./AuthorBioCard.example.tsx?raw";
import authorBioCardComponentSource from "./AuthorBioCard.tsx?raw";
import PostCard from "./PostCard.example.tsx";
import postCardSource from "./PostCard.example.tsx?raw";
import postCardComponentSource from "./PostCard.tsx?raw";
import QuoteProfileCard from "./QuoteProfileCard.example.tsx";
import quoteProfileCardSource from "./QuoteProfileCard.example.tsx?raw";
import quoteProfileCardComponentSource from "./QuoteProfileCard.tsx?raw";
import CourseCard from "./CourseCard.example.tsx";
import courseCardSource from "./CourseCard.example.tsx?raw";
import courseCardComponentSource from "./CourseCard.tsx?raw";
import TaskListCard from "./TaskListCard.example.tsx";
import taskListCardSource from "./TaskListCard.example.tsx?raw";
import taskListCardComponentSource from "./TaskListCard.tsx?raw";
import FoodCard from "./FoodCard.example.tsx";
import foodCardSource from "./FoodCard.example.tsx?raw";
import foodCardComponentSource from "./FoodCard.tsx?raw";
import MemberListCard from "./MemberListCard.example.tsx";
import memberListCardSource from "./MemberListCard.example.tsx?raw";
import memberListCardComponentSource from "./MemberListCard.tsx?raw";

const examples: Example[] = [
    {
        id: "ticket_card",
        title: "Ticket card",
        description: "A compact ticket shaped card that shows the event title, venue, date, time and price, with a buy button on the stub.",
        component: TicketCard,
        source: ticketCardSource,
        files: [{name: "TicketCard.tsx", source: ticketCardComponentSource}],
    },
    {
        id: "Blog_Card",
        title: "Blog card",
        description: "A blog card with an author row, favorite and share buttons, and an arrow that expands the full post below the excerpt.",
        component: ExpandableBlogCard,
        source: expandableBlogCardSource,
        files: [{name: "ExpandableBlogCard.tsx", source: expandableBlogCardComponentSource}],
        minHeight: 620,
    },
    {
        id: "product_card",
        title: "Product card",
        description: "A product card with an image, view and like counts, a price, favorite and share buttons, and an add to cart button.",
        component: ProductCard,
        source: productCardSource,
        files: [{name: "ProductCard.tsx", source: productCardComponentSource}],
        minHeight: 620,
    },
    {
        id: "music_card",
        title: "Music card",
        description: "A music card that shows a track, its artist and player controls next to the cover image.",
        component: MusicCard,
        source: musicCardSource,
        files: [{name: "MusicCard.tsx", source: musicCardComponentSource}],
        minHeight: 400,
    },
    {
        id: "profile_card_2",
        title: "Simple profile card",
        description: "A profile card that summarizes a person with an overlapping avatar, a short description and key statistics.",
        component: SimpleProfileCard,
        source: simpleProfileCardSource,
        files: [{name: "SimpleProfileCard.tsx", source: simpleProfileCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "profile_card",
        title: "Profile card",
        description: "A profile card with a banner image, the person's name and location, and post, following and follower counts.",
        component: ProfileCard,
        source: profileCardSource,
        files: [{name: "ProfileCard.tsx", source: profileCardComponentSource}],
        minHeight: 440,
    },
    {
        id: "Team_card",
        title: "Team card",
        description: "A team card with a cover image, a project name, a tag and an overlapping stack of member avatars.",
        component: TeamCard,
        source: teamCardSource,
        files: [{name: "TeamCard.tsx", source: teamCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "Pricing_card_1",
        title: "Pricing card 1",
        description: "A pricing card with a colored header for the plan and price, a list of key features and a call to action.",
        component: FeaturePricingCard,
        source: featurePricingCardSource,
        files: [{name: "FeaturePricingCard.tsx", source: featurePricingCardComponentSource}],
        minHeight: 620,
    },
    {
        id: "Pricing_card_2",
        title: "Pricing card 2",
        description: "A pricing card that uses check and cross icons to show which features the plan includes.",
        component: ChecklistPricingCard,
        source: checklistPricingCardSource,
        files: [{name: "ChecklistPricingCard.tsx", source: checklistPricingCardComponentSource}],
        minHeight: 720,
    },
    {
        id: "random_card_1",
        title: "Random card 1",
        description: "An image card with a corner badge, a star rating and a title, for products, templates or places.",
        component: RatedImageCard,
        source: ratedImageCardSource,
        files: [{name: "RatedImageCard.tsx", source: ratedImageCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "random_card_2",
        title: "Random card 2",
        description: "A game card with a cover image, a stack of player avatars over its edge, a title and a play button.",
        component: GameCard,
        source: gameCardSource,
        files: [{name: "GameCard.tsx", source: gameCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "random_card_3",
        title: "Random card 3",
        description: "An image card with a title and a bookmark button that sits on the edge of the image.",
        component: BookmarkCard,
        source: bookmarkCardSource,
        files: [{name: "BookmarkCard.tsx", source: bookmarkCardComponentSource}],
    },
    {
        id: "random_card_4",
        title: "Random card 4",
        description: "An event card with a date badge on the edge of the image, a category, a title, and bookmark and share buttons.",
        component: EventCard,
        source: eventCardSource,
        files: [{name: "EventCard.tsx", source: eventCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "random_card_5",
        title: "Random card 5",
        description: "A centered profile card with a photo, a name, a role and a follow button that switches to following.",
        component: FollowProfileCard,
        source: followProfileCardSource,
        files: [{name: "FollowProfileCard.tsx", source: followProfileCardComponentSource}],
    },
    {
        id: "random_card_6",
        title: "Random card 6",
        description: "A full image card with the title over a dark gradient, a featured badge and a notification button in the corner.",
        component: FeaturedImageCard,
        source: featuredImageCardSource,
        files: [{name: "FeaturedImageCard.tsx", source: featuredImageCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "random_card_7",
        title: "Random card 7",
        description: "An image card with a title, a short description, a notification button and an arrow button that opens the item.",
        component: ProductShowcaseCard,
        source: productShowcaseCardSource,
        files: [{name: "ProductShowcaseCard.tsx", source: productShowcaseCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "random_card_8",
        title: "Random card 8",
        description: "A person card with a large photo, a name and role, a short bio and a full width learn more button.",
        component: AuthorBioCard,
        source: authorBioCardSource,
        files: [{name: "AuthorBioCard.tsx", source: authorBioCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "random_card_9",
        title: "Random card 9",
        description: "A post card with the author's photo, a menu of actions, the post text and counters for likes, saves and comments.",
        component: PostCard,
        source: postCardSource,
        files: [{name: "PostCard.tsx", source: postCardComponentSource}],
    },
    {
        id: "random_card_10",
        title: "Random card 10",
        description: "A horizontal profile card with a round photo, a name, a role and a short quote. It stacks on small screens.",
        component: QuoteProfileCard,
        source: quoteProfileCardSource,
        files: [{name: "QuoteProfileCard.tsx", source: quoteProfileCardComponentSource}],
    },
    {
        id: "random_card_11",
        title: "Random card 11",
        description: "A text card with a title, a short description, a duration and a view more footer.",
        component: CourseCard,
        source: courseCardSource,
        files: [{name: "CourseCard.tsx", source: courseCardComponentSource}],
    },
    {
        id: "random_card_12",
        title: "Random card 12",
        description: "A task card with a title, a list of selectable rows and a continue button.",
        component: TaskListCard,
        source: taskListCardSource,
        files: [{name: "TaskListCard.tsx", source: taskListCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "random_card_13",
        title: "Random card 13",
        description: "A menu item card with diet badges, a photo, a description, a discounted price and an order button.",
        component: FoodCard,
        source: foodCardSource,
        files: [{name: "FoodCard.tsx", source: foodCardComponentSource}],
        minHeight: 720,
    },
    {
        id: "random_card_14",
        title: "Random card 14",
        description: "A member list card with photos, names, roles and follow buttons, and a footer that links to the full list.",
        component: MemberListCard,
        source: memberListCardSource,
        files: [{name: "MemberListCard.tsx", source: memberListCardComponentSource}],
        minHeight: 640,
    },
];

export default examples;
