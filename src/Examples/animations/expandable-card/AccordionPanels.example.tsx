import {LuGitMerge, LuInbox, LuLayoutDashboard, LuRocket} from "react-icons/lu";
import {AccordionPanels, type Stage} from "./AccordionPanels";

const stages: Stage[] = [
    {
        id: "capture",
        step: "01",
        title: "Capture",
        icon: LuInbox,
        description: "Requests from support, sales and Slack land in one queue with the customer attached.",
        points: ["Forward from email or Slack", "Duplicate detection"],
        color: "from-sky-500 to-cyan-400",
    },
    {
        id: "plan",
        step: "02",
        title: "Plan",
        icon: LuLayoutDashboard,
        description: "Group requests into projects and see how much revenue each one is tied to.",
        points: ["Revenue impact per project", "Drag to prioritize"],
        color: "from-violet-500 to-indigo-500",
    },
    {
        id: "build",
        step: "03",
        title: "Build",
        icon: LuGitMerge,
        description: "Projects link to branches and pull requests, so status updates itself as work merges.",
        points: ["GitHub and GitLab sync", "Automatic status"],
        color: "from-emerald-500 to-teal-400",
    },
    {
        id: "ship",
        step: "04",
        title: "Ship",
        icon: LuRocket,
        description: "When a project ships, everyone who asked for it gets a personal note, drafted for you.",
        points: ["Close the loop in one click", "Changelog entry included"],
        color: "from-amber-500 to-orange-400",
    },
];

const AccordionPanelsExample = () => <AccordionPanels items={stages}/>;

export default AccordionPanelsExample;
