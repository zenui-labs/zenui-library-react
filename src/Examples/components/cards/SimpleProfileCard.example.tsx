import {SimpleProfileCard, type ProfileStat} from "./SimpleProfileCard";

const stats: ProfileStat[] = [
    {label: "Posts", value: "80k"},
    {label: "Following", value: "8k"},
    {label: "Followers", value: "200k"},
];

const SimpleProfileCardExample = () => (
    <SimpleProfileCard
        avatarSrc="https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg"
        avatarAlt="Portrait of Emma Clark"
        description="Emma is a product designer who writes about design systems, accessibility and the small details that make interfaces easier to use. She shares a new case study every week."
        stats={stats}
    />
);

export default SimpleProfileCardExample;
