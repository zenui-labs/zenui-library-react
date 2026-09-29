import {RxDashboard} from "react-icons/rx";
import {GoPerson} from "react-icons/go";
import {IoNewspaperOutline, IoNotificationsOutline, IoSettingsOutline} from "react-icons/io5";
import {TbBrandGoogleAnalytics} from "react-icons/tb";
import {ThemeSwitchSidebar} from "./ThemeSwitchSidebar";
import type {ThemeSwitchSidebarLogo, ThemeSwitchSidebarSection} from "./ThemeSwitchSidebar";

const logo: ThemeSwitchSidebarLogo = {
    src: "https://i.ibb.co/ZHYQ04D/footer-logo.png",
    collapsedSrc: "https://i.ibb.co/0BZfPq6/darklogo.png",
    alt: "ZenUI",
};

const sections: ThemeSwitchSidebarSection[] = [
    {
        title: "Main",
        items: [
            {label: "Dashboard", icon: RxDashboard},
            {label: "Audience", icon: GoPerson},
            {label: "Posts", icon: IoNewspaperOutline},
            {
                label: "Income",
                icon: TbBrandGoogleAnalytics,
                children: [{label: "Earnings"}, {label: "Refunds"}, {label: "Declines"}, {label: "Payouts"}],
            },
        ],
    },
    {
        title: "Settings",
        items: [
            {label: "Notification", icon: IoNotificationsOutline},
            {label: "Settings", icon: IoSettingsOutline},
        ],
    },
];

const ThemeSwitchSidebarExample = () => (
    <div className="flex flex-wrap items-center gap-5 p-8 pb-[80px]">
        <ThemeSwitchSidebar logo={logo} sections={sections}/>
    </div>
);

export default ThemeSwitchSidebarExample;
