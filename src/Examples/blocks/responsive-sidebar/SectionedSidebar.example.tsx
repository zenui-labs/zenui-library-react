import {AiOutlineMail} from "react-icons/ai";
import {MdOutlineAnalytics, MdOutlinePrivacyTip, MdSchedule} from "react-icons/md";
import {IoChatbubblesOutline, IoFolderOpenOutline, IoNewspaperOutline, IoSettingsOutline} from "react-icons/io5";
import {PiShoppingBagLight} from "react-icons/pi";
import {FiFlag} from "react-icons/fi";
import {RiTeamLine} from "react-icons/ri";
import {LuHelpCircle} from "react-icons/lu";
import {SectionedSidebar} from "./SectionedSidebar";
import type {SectionedSidebarLogo, SectionedSidebarSection} from "./SectionedSidebar";

const logo: SectionedSidebarLogo = {
    src: "https://i.ibb.co/ZHYQ04D/footer-logo.png",
    collapsedSrc: "https://i.ibb.co/0BZfPq6/darklogo.png",
    alt: "ZenUI",
};

const sections: SectionedSidebarSection[] = [
    {
        title: "General",
        items: [
            {label: "Message", icon: AiOutlineMail, badge: 3},
            {label: "Schedule", icon: MdSchedule, badge: 3, addLabel: "Add event"},
            {label: "Analytics", icon: MdOutlineAnalytics},
            {label: "News", icon: IoNewspaperOutline},
            {label: "Recruitment", icon: PiShoppingBagLight},
            {label: "Projects", icon: IoFolderOpenOutline, addLabel: "Add project"},
        ],
    },
    {
        title: "Myspace",
        items: [
            {label: "Activity", icon: FiFlag},
            {label: "Shared", icon: RiTeamLine},
            {label: "Privacy", icon: MdOutlinePrivacyTip},
        ],
    },
    {
        title: "Support",
        items: [
            {label: "Settings", icon: IoSettingsOutline},
            {label: "Help", icon: LuHelpCircle},
            {label: "Chat", icon: IoChatbubblesOutline, badge: 3},
        ],
    },
];

const SectionedSidebarExample = () => (
    <div className="flex flex-wrap items-center gap-5 p-8">
        <SectionedSidebar logo={logo} sections={sections}/>
    </div>
);

export default SectionedSidebarExample;
