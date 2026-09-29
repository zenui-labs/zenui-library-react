import {DrawnChecklist, type ChecklistTask} from "./DrawnChecklist";

const tasks: ChecklistTask[] = [
    {id: "venue", label: "Book the venue for the team offsite", meta: "Due Friday"},
    {id: "agenda", label: "Share the draft agenda with leads", meta: "Due Friday"},
    {id: "travel", label: "Collect travel dates from 14 people", meta: "Due next week"},
    {id: "budget", label: "Get the budget approved by finance", meta: "Due next week"},
];

const DrawnChecklistExample = () => (
    <DrawnChecklist
        title="Offsite planning"
        tasks={tasks}
        defaultValue={["venue"]}
        completeMessage="Everything is ready for the offsite."
    />
);

export default DrawnChecklistExample;
