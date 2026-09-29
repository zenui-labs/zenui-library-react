import {useState} from "react";
import {WorkProgressTimeline, type WorkProgressEntry} from "./WorkProgressTimeline";

const entries: WorkProgressEntry[] = [
    {
        date: "Jan 22",
        title: "Posted work assignments",
        description: "Shared the brief for the final project and split the class into teams of four.",
        commentCount: 5,
        attachment: "FantechProposal.pdf",
    },
    {
        date: "Dec 12",
        title: "Uploaded assignments file",
        description: "Added the grading rubric and the list of required sections to the course folder.",
    },
    {
        date: "Nov 18",
        title: "Asked to bring supplies to class",
        description: "Each team needs poster paper, markers and a laptop for the Thursday workshop.",
        commentCount: 5,
        attachment: "SupplyChecklist.pdf",
    },
    {
        date: "Nov 04",
        title: "Presentation requirements",
        description: "Presentations run ten minutes with five minutes of questions from the panel.",
        commentCount: 5,
    },
    {
        date: "Oct 15",
        title: "File handouts",
        description: "Printed handouts for the first lecture are available at the front desk.",
    },
];

const WorkProgressTimelineExample = () => {
    const [opened, setOpened] = useState<string | null>(null);

    return (
        <div className="flex w-full flex-col items-center">
            <WorkProgressTimeline
                items={entries}
                onCommentsClick={(entry) => setOpened(`Comments on "${entry.title}"`)}
                onAttachmentClick={(entry) => setOpened(`Opened ${entry.attachment ?? "file"}`)}
            />
            <p className="h-5 text-sm text-gray-500 dark:text-slate-400" aria-live="polite">{opened}</p>
        </div>
    );
};

export default WorkProgressTimelineExample;
