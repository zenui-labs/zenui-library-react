import {MilestoneTimeline, type Milestone} from "./MilestoneTimeline";

const milestones: Milestone[] = [
    {date: "January 2024", title: "Project kickoff", description: "Initial planning and kickoff meeting."},
    {date: "February 2024", title: "Design phase", description: "Finalizing designs and mockups."},
    {date: "March 2024", title: "Development phase", description: "Starting the development of the project."},
    {date: "April 2024", title: "Testing phase", description: "Testing and quality assurance."},
    {date: "May 2024", title: "Launch", description: "Official project launch."},
];

const MilestoneTimelineExample = () => <MilestoneTimeline items={milestones}/>;

export default MilestoneTimelineExample;
