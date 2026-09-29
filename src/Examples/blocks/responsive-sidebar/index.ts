import type {Example} from "../../types.ts";
import SectionedSidebar from "./SectionedSidebar.example.tsx";
import sectionedSidebarSource from "./SectionedSidebar.example.tsx?raw";
import sectionedSidebarComponentSource from "./SectionedSidebar.tsx?raw";
import ProfileSidebar from "./ProfileSidebar.example.tsx";
import profileSidebarSource from "./ProfileSidebar.example.tsx?raw";
import profileSidebarComponentSource from "./ProfileSidebar.tsx?raw";
import ThemeSwitchSidebar from "./ThemeSwitchSidebar.example.tsx";
import themeSwitchSidebarSource from "./ThemeSwitchSidebar.example.tsx?raw";
import themeSwitchSidebarComponentSource from "./ThemeSwitchSidebar.tsx?raw";

const examples: Example[] = [
    {
        id: "responsive_sidebar_1",
        title: "Responsive sidebar 1",
        description: "A sidebar with titled sections, count badges and plus buttons. Click the logo to collapse it to an icon rail with tooltips.",
        component: SectionedSidebar,
        source: sectionedSidebarSource,
        files: [{name: "SectionedSidebar.tsx", source: sectionedSidebarComponentSource}],
        layout: "full",
        minHeight: 860,
    },
    {
        id: "responsive_sidebar_2",
        title: "Responsive sidebar 2",
        description: "A sidebar with a collapse button, a dropdown item and a profile footer with an account menu. When collapsed, the dropdown opens as a flyout on hover.",
        component: ProfileSidebar,
        source: profileSidebarSource,
        files: [{name: "ProfileSidebar.tsx", source: profileSidebarComponentSource}],
        layout: "full",
        minHeight: 760,
    },
    {
        id: "responsive_sidebar_3",
        title: "Responsive sidebar 3",
        description: "A sidebar with a toggle on its edge, titled sections, a dropdown item and a light and dark switch in the footer. The switch turns compact when the sidebar collapses.",
        component: ThemeSwitchSidebar,
        source: themeSwitchSidebarSource,
        files: [{name: "ThemeSwitchSidebar.tsx", source: themeSwitchSidebarComponentSource}],
        layout: "full",
        minHeight: 760,
    },
];

export default examples;
