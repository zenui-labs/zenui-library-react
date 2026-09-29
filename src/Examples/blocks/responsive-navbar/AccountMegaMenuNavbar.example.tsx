import {FaTasks} from "react-icons/fa";
import {TbUsersGroup} from "react-icons/tb";
import {MdLaptopMac} from "react-icons/md";
import {BsBuildings, BsCalendar2Date} from "react-icons/bs";
import {AiOutlineFire} from "react-icons/ai";
import {BiSupport} from "react-icons/bi";
import {FiUser} from "react-icons/fi";
import {IoSettingsOutline} from "react-icons/io5";
import {
    AccountMegaMenuNavbar,
    type AccountMenuItem,
    type AccountUser,
    type IconNavLink,
    type MegaMenu,
} from "./AccountMegaMenuNavbar";

const megaMenu: MegaMenu = {
    label: "Products",
    icon: MdLaptopMac,
    sections: [
        {
            title: "More products",
            items: [
                {
                    title: "Demo app",
                    description: "Try every feature with sample data before you sign up.",
                    href: "#",
                    imageSrc: "https://i.ibb.co/LQBDJGD/icon-logo-container.png",
                    ctaLabel: "Open the demo",
                    ctaClassName: "text-[#FF5E5E]",
                },
                {
                    title: "CRM",
                    description: "Track leads, deals and customer conversations in one place.",
                    href: "#",
                    imageSrc: "https://i.ibb.co/Y8cRWRj/icon-logo-container-1.png",
                    ctaLabel: "Explore CRM",
                    ctaClassName: "text-[#FE9239]",
                },
                {
                    title: "CMS",
                    description: "Write, schedule and publish content for every channel.",
                    href: "#",
                    imageSrc: "https://i.ibb.co/6bGWgp6/icon-logo-container-2.png",
                    ctaLabel: "Explore CMS",
                    ctaClassName: "text-[#8B5CF6]",
                },
            ],
        },
        {
            title: "Ecosystem",
            items: [
                {title: "Directory", description: "Find partners and agencies that build on our platform.", href: "#", icon: BsBuildings},
                {title: "Bookings", description: "Let customers book time with your team.", href: "#", icon: BsCalendar2Date},
                {title: "User feedback", description: "Collect and sort feature requests from your users.", href: "#", icon: TbUsersGroup},
                {title: "Task manager", description: "Plan work and follow it through to done.", href: "#", icon: FaTasks},
            ],
        },
    ],
    promos: [
        {
            title: "Check out the new app",
            description: "Manage your workspace from your phone.",
            href: "#",
            imageSrc: "https://i.ibb.co/VTqw5rY/img-container.png",
            badge: "Featured",
            ctaLabel: "Get the app",
        },
        {
            title: "Read our newsletter",
            description: "Product updates and tips, once a month.",
            href: "#",
            imageSrc: "https://i.ibb.co/V2b5xnK/img-container-1.png",
            ctaLabel: "Subscribe",
        },
    ],
};

const links: IconNavLink[] = [
    {label: "Features", href: "#", icon: AiOutlineFire},
    {label: "Support", href: "#", icon: BiSupport},
];

const user: AccountUser = {
    name: "John Doe",
    avatarSrc: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=740",
    online: true,
};

const accountItems: AccountMenuItem[] = [
    {label: "View profile", icon: FiUser, href: "#"},
    {label: "Settings", icon: IoSettingsOutline, href: "#"},
    {label: "Help center", icon: BiSupport, href: "#"},
];

const AccountMegaMenuNavbarExample = () => (
    <div className="p-8">
        <AccountMegaMenuNavbar
            logo={<img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="Company logo" className="w-[55px]"/>}
            megaMenu={megaMenu}
            links={links}
            user={user}
            accountItems={accountItems}
        />
    </div>
);

export default AccountMegaMenuNavbarExample;
