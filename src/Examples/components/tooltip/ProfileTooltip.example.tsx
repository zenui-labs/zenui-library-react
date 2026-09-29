import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from "react-icons/fa";
import {ProfileTooltip, type Profile, type SocialLink} from "./ProfileTooltip";

const profile: Profile = {
    name: "Evelyn Adson",
    role: "Programmer",
    avatar: "https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?w=900",
    online: true,
};

const socials: SocialLink[] = [
    {label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedin},
    {label: "GitHub", href: "https://github.com/", icon: FaGithubSquare},
    {label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagramSquare},
];

// The card opens above the picture, so the example leaves room for it.
const ProfileTooltipExample = () => (
    <div className="pt-72">
        <ProfileTooltip profile={profile} socials={socials}/>
    </div>
);

export default ProfileTooltipExample;
