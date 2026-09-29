import {SortableTodoList, type TodoTask} from "./SortableTodoList";

const tasks: TodoTask[] = [
    {id: 1, title: "Review the onboarding copy with Lena", done: true},
    {id: 2, title: "Send the Q3 budget to finance", done: false},
    {id: 3, title: "Fix the flaky checkout test", done: false},
    {id: 4, title: "Book the venue for the team offsite", done: false},
];

const SortableTodoListExample = () => <SortableTodoList defaultValue={tasks}/>;

export default SortableTodoListExample;
