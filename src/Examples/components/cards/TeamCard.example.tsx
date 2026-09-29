import {TeamCard, type TeamMember} from "./TeamCard";

const members: TeamMember[] = [
    {name: "Liam Carter", avatarSrc: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"},
    {name: "Noah Brooks", avatarSrc: "https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg"},
    {name: "Ethan Reed", avatarSrc: "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg"},
    {name: "Mason Hayes", avatarSrc: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg"},
    {name: "Lucas Gray", avatarSrc: "https://img.freepik.com/free-photo/portrait-hacker_23-2148165910.jpg"},
];

const TeamCardExample = () => (
    <TeamCard
        title="Simple Design"
        imageSrc="https://img.freepik.com/free-psd/3d-interface-website-presentation-mockup-isolated_359791-208.jpg"
        imageAlt="Website interface mockup on a laptop screen"
        tag="Design"
        members={members}
        moreLabel="18+"
    />
);

export default TeamCardExample;
