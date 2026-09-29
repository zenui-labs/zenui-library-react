import {MemberListCard, type Member} from "./MemberListCard";

const members: Member[] = [
    {
        name: "Wade Warren",
        role: "Dog Trainer",
        avatarSrc: "https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722623111~exp=1722626711~hmac=b17f00e5dcf0abc6acd95e3cc2c38c402f1215a1d21f8581ebcf6a2de0b668a0&w=996",
    },
    {
        name: "Robert Fox",
        role: "President of Sales",
        avatarSrc: "https://img.freepik.com/free-photo/bearded-man-listening-music-through-earphones_53876-129947.jpg?t=st=1722623213~exp=1722626813~hmac=b7deb7ad2af8b5966d5cac476223699db295447ed386ee6c02e43c44e1b12a5b&w=996",
    },
    {
        name: "Jane Cooper",
        role: "Nursing Assistant",
        avatarSrc: "https://img.freepik.com/free-photo/porait-cute-boy-cafe_23-2148436119.jpg?t=st=1722623263~exp=1722626863~hmac=6620b351cf7c4d56d5209fd59eadfa696d1edbdafbf1db30e5ab2c9e303cfa4a&w=996",
    },
    {
        name: "Frank Esteban",
        role: "Software Tester",
        avatarSrc: "https://img.freepik.com/free-photo/portrait-male-traveler-looking-camera-outdoors_23-2148148710.jpg?t=st=1722623296~exp=1722626896~hmac=29e65db6c3e3bbf68796e9342afee5e3595eaa67bbe65a2688fdac5d45041201&w=996",
    },
    {
        name: "Dianne Russell",
        role: "Web Designer",
        avatarSrc: "https://img.freepik.com/free-photo/handsome-sensitive-red-head-man-smiling_23-2149509820.jpg?t=st=1722623336~exp=1722626936~hmac=f02780547f6a8bc7020a8ab4cf2bbfd1b0b559812cf7f3aea793970ee9a14dc8&w=996",
    },
];

const MemberListCardExample = () => (
    <MemberListCard
        title="Minim dolorin"
        description="Minim dolor in amet nulla laboris enim dolore consequat."
        members={members}
        footerText="543 students"
    />
);

export default MemberListCardExample;
