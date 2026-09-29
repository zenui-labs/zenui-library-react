import {ProfileCard, type ProfileCardStat} from "./ProfileCard";

const stats: ProfileCardStat[] = [
    {label: "Posts", value: "80k"},
    {label: "Following", value: "8k"},
    {label: "Followers", value: "200k"},
];

const ProfileCardExample = () => (
    <ProfileCard
        name="Emma Clark"
        location="London"
        avatarSrc="https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg"
        avatarAlt="Portrait of Emma Clark"
        coverSrc="https://img.freepik.com/premium-vector/content-writer-vector-colored-round-line-illustration_104589-2571.jpg"
        stats={stats}
    />
);

export default ProfileCardExample;
