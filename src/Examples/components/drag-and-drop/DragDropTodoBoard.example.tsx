import {DragDropTodoBoard, type Todo} from "./DragDropTodoBoard";

const todos: Todo[] = [
    {id: 1, text: "Fix website bug", completed: false},
    {id: 2, text: "Prepare for meeting", completed: false},
    {id: 3, text: "Send email updates", completed: false},
];

const DragDropTodoBoardExample = () => <DragDropTodoBoard todos={todos}/>;

export default DragDropTodoBoardExample;
