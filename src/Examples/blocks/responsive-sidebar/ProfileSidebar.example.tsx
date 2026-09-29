import {GoHome, GoProjectSymlink} from "react-icons/go";
import {CiCalendar} from "react-icons/ci";
import {FiBarChart, FiPieChart} from "react-icons/fi";
import {IoNotificationsOutline, IoSettingsOutline} from "react-icons/io5";
import {ProfileSidebar} from "./ProfileSidebar";
import type {ProfileSidebarItem, ProfileSidebarLogo, ProfileSidebarUser} from "./ProfileSidebar";

const logo: ProfileSidebarLogo = {
    src: "https://i.ibb.co/ZHYQ04D/footer-logo.png",
    collapsedSrc: "https://i.ibb.co/0BZfPq6/darklogo.png",
    alt: "ZenUI",
};

const items: ProfileSidebarItem[] = [
    {label: "Home", icon: GoHome},
    {label: "Calendar", icon: CiCalendar},
    {
        label: "Projects",
        icon: GoProjectSymlink,
        children: [{label: "Google"}, {label: "Facebook"}, {label: "Twitter"}, {label: "Linkedin"}],
    },
    {label: "Progress", icon: FiBarChart},
    {label: "Goals", icon: FiPieChart},
];

const secondaryItems: ProfileSidebarItem[] = [
    {label: "Notification", icon: IoNotificationsOutline},
    {label: "Settings", icon: IoSettingsOutline},
];

const user: ProfileSidebarUser = {
    name: "John Doe",
    avatarSrc:
        "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1724478146~exp=1724481746~hmac=7de91a5b9271ecb4309974122ae6f47d71c01f7fff840c69755f781a03d9e340&w=996",
};

const ProfileSidebarExample = () => (
    <div className="flex flex-wrap items-center gap-5 p-8 pb-[80px]">
        <ProfileSidebar logo={logo} items={items} secondaryItems={secondaryItems} user={user}/>
    </div>
);

export default ProfileSidebarExample;
