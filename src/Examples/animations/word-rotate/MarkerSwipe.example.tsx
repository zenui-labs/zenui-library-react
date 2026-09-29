import {MarkerSwipe, type MarkerPhrase} from "./MarkerSwipe";

const phrases: MarkerPhrase[] = [
    {text: "book the flights", marker: "bg-yellow-200 dark:bg-yellow-400/30"},
    {text: "split the costs", marker: "bg-lime-200 dark:bg-lime-400/25"},
    {text: "share the itinerary", marker: "bg-pink-200 dark:bg-pink-400/25"},
    {text: "vote on dinner", marker: "bg-sky-200 dark:bg-sky-400/25"},
];

const MarkerSwipeExample = () => <MarkerSwipe phrases={phrases}/>;

export default MarkerSwipeExample;
