import {TaskListCard, type TaskListItem} from "./TaskListCard";

const items: TaskListItem[] = [
    {label: "Meeting reminder: project kickoff"},
    {label: "Invitation: web development webinar"},
    {label: "Invoice #12345 due tomorrow"},
    {label: "Your order has shipped"},
    {label: "Update: new policy changes"},
];

const TaskListCardExample = () => <TaskListCard title="Constructive and destructive waves" items={items}/>;

export default TaskListCardExample;
