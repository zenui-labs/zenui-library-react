import {FaDiscord} from "react-icons/fa";
import {TbBrandGithubFilled} from "react-icons/tb";
import {BasicNavbar, type NavLink, type SocialLink} from "./BasicNavbar";

const links: NavLink[] = [
    {label: "Home", href: "#"},
    {label: "About us", href: "#"},
    {label: "Services", href: "#"},
];

const socialLinks: SocialLink[] = [
    {label: "Discord", href: "#", icon: FaDiscord},
    {label: "GitHub", href: "#", icon: TbBrandGithubFilled},
];

const BasicNavbarExample = () => (
    <div className="p-8">
        <BasicNavbar
            logo={<img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="Company logo" className="w-[60px]"/>}
            links={links}
            socialLinks={socialLinks}
        />
    </div>
);

export default BasicNavbarExample;
