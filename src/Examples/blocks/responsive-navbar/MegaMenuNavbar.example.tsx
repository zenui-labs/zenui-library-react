import {FaDiscord} from "react-icons/fa";
import {TbBrandGithubFilled} from "react-icons/tb";
import {MdDashboardCustomize} from "react-icons/md";
import {CgIfDesign} from "react-icons/cg";
import {FaCubesStacked} from "react-icons/fa6";
import {MegaMenuNavbar, type DropdownHighlight, type MegaMenuNavLink, type NavLink, type SocialLink} from "./MegaMenuNavbar";

const companyLinks: NavLink[] = [
    {label: "Company details", href: "#"},
    {label: "Company location", href: "#"},
    {label: "Team members", href: "#"},
    {label: "Office tour", href: "#"},
];

const highlights: DropdownHighlight[] = [
    {label: "Fully customizable", icon: MdDashboardCustomize, iconClassName: "bg-blue-200 text-blue-900"},
    {label: "Modern design", icon: CgIfDesign, iconClassName: "bg-orange-200 text-orange-800"},
    {label: "Well structured", icon: FaCubesStacked, iconClassName: "bg-yellow-200 text-yellow-800"},
];

const links: MegaMenuNavLink[] = [
    {label: "Home", href: "#"},
    {
        label: "About us",
        href: "#",
        dropdown: {links: companyLinks, highlights, imageSrc: "https://i.ibb.co/YRgsrsh/AD22-04.png", offset: -100},
    },
    {
        label: "Services",
        href: "#",
        dropdown: {links: companyLinks, highlights, imageSrc: "https://i.ibb.co/XJJ4mNY/AD21-03.png", offset: -150},
    },
];

const socialLinks: SocialLink[] = [
    {label: "Discord", href: "#", icon: FaDiscord},
    {label: "GitHub", href: "#", icon: TbBrandGithubFilled},
];

const MegaMenuNavbarExample = () => (
    <div className="p-8">
        <MegaMenuNavbar
            logo={<img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="Company logo" className="w-[60px]"/>}
            links={links}
            socialLinks={socialLinks}
        />
    </div>
);

export default MegaMenuNavbarExample;
