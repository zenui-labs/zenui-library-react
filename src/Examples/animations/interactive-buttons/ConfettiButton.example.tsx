import {TaskCard, type Task} from "./ConfettiButton";

const task: Task = {
    title: "Publish the 2.4 release notes",
    detail: "Due today in Docs",
    assignees: [
        {initials: "MK", colorClassName: "bg-amber-400"},
        {initials: "JL", colorClassName: "bg-sky-500"},
        {initials: "AR", colorClassName: "bg-rose-400"},
    ],
};

const ConfettiButtonExample = () => <TaskCard task={task}/>;

export default ConfettiButtonExample;
