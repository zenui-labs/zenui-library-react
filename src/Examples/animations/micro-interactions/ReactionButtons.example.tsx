import {ReactionButtons, type Post} from "./ReactionButtons";

const post: Post = {
    author: {name: "Dana Liu", initials: "DL", gradient: "from-amber-400 to-rose-500"},
    meta: "Design systems lead · 2 h",
    body: "We cut our button variants from 23 to 6 this quarter. Fewer choices, faster reviews, and not a single complaint from product teams so far.",
    likes: 1283,
    comments: 42,
    reposts: 87,
};

const ReactionButtonsExample = () => <ReactionButtons post={post}/>;

export default ReactionButtonsExample;
