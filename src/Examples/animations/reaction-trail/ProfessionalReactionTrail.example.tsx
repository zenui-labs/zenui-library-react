import {ProfessionalReactionTrail, type PostAuthor, type PostStats, type Reaction} from "./ProfessionalReactionTrail";

const reactions: Reaction[] = [
    {label: "Like", image: "https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png", color: "text-blue-500"},
    {label: "Celebrate", image: "https://i.ibb.co.com/W4rJth1M/cm8d2ytayynyhw5ieaare0tl3-1.png", color: "text-green-500"},
    {label: "Love", image: "https://i.ibb.co.com/gFRvR25P/f58e354mjsjpdd67eq51cuh49-1.png", color: "text-red-500"},
    {label: "Insightful", image: "https://i.ibb.co.com/8nVzgzXR/6gz02r6oxefigck4ye888wosd-1.png", color: "text-yellow-500"},
    {label: "Funny", image: "https://i.ibb.co.com/LXCd7H7d/6namow3mrvcg3dyuevtpfwjm0-1.png", color: "text-cyan-500"},
];

const author: PostAuthor = {name: "Sarah Anderson", headline: "Product Designer", time: "2h ago"};

const stats: PostStats = {reactionCount: 42, commentCount: 18, repostCount: 5, topReactions: ["Like", "Love", "Celebrate"]};

const ProfessionalReactionTrailExample = () => (
    <ProfessionalReactionTrail
        author={author}
        content="Our design system update is out. We improved component accessibility and added new interactive patterns. 🎨"
        stats={stats}
        reactions={reactions}
    />
);

export default ProfessionalReactionTrailExample;
