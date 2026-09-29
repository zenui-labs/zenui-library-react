import type {Example} from "../../types.ts";
import TeamGrid from "./TeamGrid.example.tsx";
import teamGridSource from "./TeamGrid.example.tsx?raw";
import PortraitHoverGrid from "./PortraitHoverGrid.example.tsx";
import portraitHoverGridSource from "./PortraitHoverGrid.example.tsx?raw";
import LeadershipBios from "./LeadershipBios.example.tsx";
import leadershipBiosSource from "./LeadershipBios.example.tsx?raw";
import TeamCarousel from "./TeamCarousel.example.tsx";
import teamCarouselSource from "./TeamCarousel.example.tsx?raw";
import TeamDirectory from "./TeamDirectory.example.tsx";
import teamDirectorySource from "./TeamDirectory.example.tsx?raw";
import OrgChart from "./OrgChart.example.tsx";
import orgChartSource from "./OrgChart.example.tsx?raw";
import HiringRoles from "./HiringRoles.example.tsx";
import hiringRolesSource from "./HiringRoles.example.tsx?raw";

const examples: Example[] = [
    {
        id: "team-grid",
        title: "Team grid",
        description: "Team member cards with initials avatars, roles, locations and social links, filterable by team, with a hiring card at the end. Use it on an about or careers page.",
        component: TeamGrid,
        source: teamGridSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "portrait-hover-grid",
        title: "Portrait grid with hover socials",
        description: "Square portraits that turn from grayscale to color on hover or focus and reveal social links, with an advisors row below. Use it on a small startup's about page.",
        component: PortraitHoverGrid,
        source: portraitHoverGridSource,
        layout: "full",
        minHeight: 980,
    },
    {
        id: "leadership-bios",
        title: "Leadership with bio dialog",
        description: "Tall leadership portraits that open an accessible dialog with the full bio, past roles and previous and next controls. Use it when executives need more than a one-line summary.",
        component: LeadershipBios,
        source: leadershipBiosSource,
        layout: "full",
        minHeight: 900,
    },
    {
        id: "team-carousel",
        title: "Team carousel",
        description: "A scroll-snap carousel of team cards with a quote and an ask me about topic, arrow buttons, keyboard support and a progress bar. Use it when the team is too large for one row.",
        component: TeamCarousel,
        source: teamCarouselSource,
        layout: "full",
        minHeight: 820,
    },
    {
        id: "team-directory",
        title: "Compact team directory",
        description: "A dense, searchable list with team filters, sorting, each person's local time and a working hours indicator. Use it for distributed teams or an internal people page.",
        component: TeamDirectory,
        source: teamDirectorySource,
        layout: "full",
        minHeight: 900,
    },
    {
        id: "org-chart",
        title: "Org chart",
        description: "A top-down leadership tree with connector lines and groups that expand to show each leader's reports. Use it to explain how a company is organized.",
        component: OrgChart,
        source: orgChartSource,
        layout: "full",
        minHeight: 880,
    },
    {
        id: "hiring-roles",
        title: "Hiring section with open roles",
        description: "A careers block with floating team avatars, company stats and open roles filtered by department tabs, including an empty state. Use it at the end of an about page.",
        component: HiringRoles,
        source: hiringRolesSource,
        layout: "full",
        minHeight: 760,
    },
];

export default examples;
