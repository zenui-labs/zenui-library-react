import {MagazineReactionTrail, type MagazineCover, type MagazineStats, type PostAuthor, type Reaction} from "./MagazineReactionTrail";

const reactions: Reaction[] = [
    {label: "Like", image: "https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png", color: "from-blue-500 to-blue-600"},
    {label: "Celebrate", image: "https://i.ibb.co.com/W4rJth1M/cm8d2ytayynyhw5ieaare0tl3-1.png", color: "from-green-500 to-green-600"},
    {label: "Love", image: "https://i.ibb.co.com/gFRvR25P/f58e354mjsjpdd67eq51cuh49-1.png", color: "from-red-500 to-red-600"},
    {label: "Insightful", image: "https://i.ibb.co.com/8nVzgzXR/6gz02r6oxefigck4ye888wosd-1.png", color: "from-yellow-500 to-yellow-600"},
    {label: "Funny", image: "https://i.ibb.co.com/LXCd7H7d/6namow3mrvcg3dyuevtpfwjm0-1.png", color: "from-cyan-500 to-cyan-600"},
];

const author: PostAuthor = {name: "Emma Thompson", headline: "Creative Director", time: "4h ago", online: true};

const cover: MagazineCover = {
    badge: "Featured post",
    title: "The future of interactive design",
    subtitle: "Exploring new patterns in UI/UX • 5 min read",
};

const stats: MagazineStats = {reactionCount: 234, commentCount: 52, repostCount: 18, viewCount: "1.2K"};

const MagazineReactionTrailExample = () => (
    <MagazineReactionTrail
        author={author}
        cover={cover}
        content="Sharing what we learned from our latest research on interactive design patterns: how people respond to micro-animations and contextual feedback. 🎨✨"
        tags={["#Design", "#UX", "#Animation", "#Research"]}
        stats={stats}
        reactions={reactions}
    />
);

export default MagazineReactionTrailExample;
