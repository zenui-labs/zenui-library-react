import {SwipeCardStack, type SwipeCard} from "./SwipeCardStack";

const cards: SwipeCard[] = [{src: "/logo.png", alt: "ZenUI logo"}];

const SwipeCardStackExample = () => <SwipeCardStack cards={cards}/>;

export default SwipeCardStackExample;
