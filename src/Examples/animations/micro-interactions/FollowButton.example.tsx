import {SuggestedCreators, type Creator} from "./FollowButton";

const creators: Creator[] = [
    {name: "Mateo Alvarez", handle: "@mateo.builds", initials: "MA", followers: 18400, gradient: "from-sky-400 to-indigo-500"},
    {name: "Grace Kim", handle: "@gracekim", initials: "GK", followers: 3210, gradient: "from-amber-400 to-rose-500"},
];

const FollowButtonExample = () => <SuggestedCreators creators={creators}/>;

export default FollowButtonExample;
