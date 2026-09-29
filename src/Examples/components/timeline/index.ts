import type {Example} from "../../types.ts";
import MilestoneTimeline from "./MilestoneTimeline.example.tsx";
import milestoneTimelineSource from "./MilestoneTimeline.example.tsx?raw";
import milestoneTimelineComponentSource from "./MilestoneTimeline.tsx?raw";
import WorkProgressTimeline from "./WorkProgressTimeline.example.tsx";
import workProgressTimelineSource from "./WorkProgressTimeline.example.tsx?raw";
import workProgressTimelineComponentSource from "./WorkProgressTimeline.tsx?raw";
import TreeTimeline from "./TreeTimeline.example.tsx";
import treeTimelineSource from "./TreeTimeline.example.tsx?raw";
import treeTimelineComponentSource from "./TreeTimeline.tsx?raw";
import MilestoneIconTimeline from "./MilestoneIconTimeline.example.tsx";
import milestoneIconTimelineSource from "./MilestoneIconTimeline.example.tsx?raw";
import milestoneIconTimelineComponentSource from "./MilestoneIconTimeline.tsx?raw";

const examples: Example[] = [
    {
        id: "milestone_timeline",
        title: "Milestone timeline",
        description: "A vertical timeline that highlights key events, deadlines and achievements in order, with the date next to each title.",
        component: MilestoneTimeline,
        source: milestoneTimelineSource,
        files: [{name: "MilestoneTimeline.tsx", source: milestoneTimelineComponentSource}],
        minHeight: 560,
    },
    {
        id: "work_progress_timeline",
        title: "Work progress timeline",
        description: "A work log that lists the steps of a project in order, with the date outside the line and optional comment and attachment buttons.",
        component: WorkProgressTimeline,
        source: workProgressTimelineSource,
        files: [{name: "WorkProgressTimeline.tsx", source: workProgressTimelineComponentSource}],
        minHeight: 720,
    },
    {
        id: "tree_timeline",
        title: "Tree timeline",
        description: "Cards alternate on both sides of a center line, each with an icon on the line. Good for career or project history.",
        component: TreeTimeline,
        source: treeTimelineSource,
        files: [{name: "TreeTimeline.tsx", source: treeTimelineComponentSource}],
        minHeight: 620,
    },
    {
        id: "milestone_icon_timeline",
        title: "Milestone icon timeline",
        description: "A milestone timeline that marks each entry with an icon, tracking key events and achievements in order.",
        component: MilestoneIconTimeline,
        source: milestoneIconTimelineSource,
        files: [{name: "MilestoneIconTimeline.tsx", source: milestoneIconTimelineComponentSource}],
        minHeight: 600,
    },
];

export default examples;
