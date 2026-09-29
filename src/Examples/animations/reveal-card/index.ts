import type {Example} from "../../types.ts";
import BasicSwipeCard from "./BasicSwipeCard.example.tsx";
import basicSwipeCardSource from "./BasicSwipeCard.example.tsx?raw";
import basicSwipeCardComponentSource from "./BasicSwipeCard.tsx?raw";
import ElasticSwipeCard from "./ElasticSwipeCard.example.tsx";
import elasticSwipeCardSource from "./ElasticSwipeCard.example.tsx?raw";
import elasticSwipeCardComponentSource from "./ElasticSwipeCard.tsx?raw";
import RotateSwipeCard from "./RotateSwipeCard.example.tsx";
import rotateSwipeCardSource from "./RotateSwipeCard.example.tsx?raw";
import rotateSwipeCardComponentSource from "./RotateSwipeCard.tsx?raw";

const examples: Example[] = [
    {
        id: "basic-swipe-reveal-card",
        title: "Basic swipe reveal card",
        description: "Swipe the row left or right to slide it aside and reveal an action. The actions fade in as the row moves.",
        component: BasicSwipeCard,
        source: basicSwipeCardSource,
        files: [{name: "BasicSwipeCard.tsx", source: basicSwipeCardComponentSource}],
    },
    {
        id: "elastic-swipe-reveal-card",
        title: "Elastic swipe reveal card",
        description: "A swipe to reveal row that settles with an elastic bounce, which gives the gesture a springy feel.",
        component: ElasticSwipeCard,
        source: elasticSwipeCardSource,
        files: [{name: "ElasticSwipeCard.tsx", source: elasticSwipeCardComponentSource}],
    },
    {
        id: "rotate-swipe-reveal-card",
        title: "Rotate swipe reveal card",
        description: "A swipe to reveal row that rotates and shrinks slightly while it moves, which adds depth to the gesture.",
        component: RotateSwipeCard,
        source: rotateSwipeCardSource,
        files: [{name: "RotateSwipeCard.tsx", source: rotateSwipeCardComponentSource}],
    },
];

export default examples;
