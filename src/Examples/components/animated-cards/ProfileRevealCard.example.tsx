import {FaDribbble} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {ImFacebook2} from "react-icons/im";
import {ProfileRevealCard, type SocialLink} from "./ProfileRevealCard";

const socials: SocialLink[] = [
    {label: "Facebook", href: "#", icon: ImFacebook2},
    {label: "X", href: "#", icon: FaXTwitter},
    {label: "Dribbble", href: "#", icon: FaDribbble},
];

const ProfileRevealCardExample = () => (
    <ProfileRevealCard
        imageSrc="https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1728139729~exp=1728143329~hmac=dd0870841ecbe138afdb639fee17206241a94b02b17e1e681ad16eba38f0bd7b&w=996"
        imageAlt="Portrait of Jack Leo smiling with folded arms"
        name="Jack Leo"
        role="Product Designer"
        socials={socials}
    />
);

export default ProfileRevealCardExample;
