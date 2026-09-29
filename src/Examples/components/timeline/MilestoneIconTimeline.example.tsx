import {FaBriefcase, FaGraduationCap} from "react-icons/fa";
import {MilestoneIconTimeline, type IconMilestone} from "./MilestoneIconTimeline";

const milestones: IconMilestone[] = [
    {date: "January 2024", title: "B.Tech", description: "B.Tech graduate with a specialization in CSE.", icon: FaGraduationCap},
    {date: "February 2024", title: "Design phase", description: "Finalizing designs and mockups.", icon: FaBriefcase},
    {date: "March 2024", title: "Development phase", description: "Starting the development of the project.", icon: FaBriefcase},
    {date: "April 2024", title: "Testing phase", description: "Testing and quality assurance.", icon: FaBriefcase},
    {date: "May 2024", title: "Launch", description: "Official project launch.", icon: FaBriefcase},
];

const MilestoneIconTimelineExample = () => <MilestoneIconTimeline items={milestones}/>;

export default MilestoneIconTimelineExample;
