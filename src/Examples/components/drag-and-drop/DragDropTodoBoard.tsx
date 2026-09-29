import {useRef, useState, type DragEvent, type FormEvent} from "react";

export interface Todo {
    id: string | number;
    text: string;
    /** Completed todos start in the second column. */
    completed: boolean;
}

export interface DragDropTodoBoardProps {
    /** Todos in their starting state. */
    todos: Todo[];
    /** Called with the full list after a todo is added or moved between columns. */
    onChange?: (todos: Todo[]) => void;
    todoTitle?: string;
    completedTitle?: string;
    placeholder?: string;
    addLabel?: string;
    className?: string;
}

interface TodoItemProps {
    todo: Todo;
    onDragStart: (e: DragEvent<HTMLLIElement>, todo: Todo) => void;
    onDragEnd: () => void;
}

const TodoItem = ({todo, onDragStart, onDragEnd}: TodoItemProps) => (
    <li
        draggable
        onDragStart={(e) => onDragStart(e, todo)}
        onDragEnd={onDragEnd}
        className="bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move"
    >
        {todo.text}
    </li>
);

/** A two-column todo board. Add todos in the first column and drag them between the columns to complete or reopen them. */
export const DragDropTodoBoard = ({
    todos: initialTodos,
    onChange,
    todoTitle = "Todo",
    completedTitle = "Completed",
    placeholder = "Add todo",
    addLabel = "Add",
    className = "",
}: DragDropTodoBoardProps) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [newTodoText, setNewTodoText] = useState("");
    // The todo being dragged. Drops of anything else, such as text from another app, are ignored.
    const draggedTodo = useRef<Todo | null>(null);

    const update = (next: Todo[]) => {
        setTodos(next);
        onChange?.(next);
    };

    const handleDragStart = (e: DragEvent<HTMLLIElement>, todo: Todo) => {
        // Firefox only starts a drag when some data is set.
        e.dataTransfer.setData("text/plain", todo.text);
        e.dataTransfer.effectAllowed = "move";
        draggedTodo.current = todo;
    };

    const handleDragEnd = () => {
        draggedTodo.current = null;
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Move the todo to the end of the other column.
    const handleDrop = (e: DragEvent<HTMLDivElement>, targetCompleted: boolean) => {
        e.preventDefault();
        const moved = draggedTodo.current;
        draggedTodo.current = null;
        if (!moved || moved.completed === targetCompleted) return;

        update([...todos.filter((todo) => todo.id !== moved.id), {...moved, completed: targetCompleted}]);
    };

    const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = newTodoText.trim();
        if (!text) return;

        update([...todos, {id: Date.now(), text, completed: false}]);
        setNewTodoText("");
    };

    const openTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    return (
        <div className={`w-full p-8 mb-4 flex md:flex-row flex-col gap-5 justify-center ${className}`}>
            <div
                className="w-full md:w-[50%] bg-gray-50 dark:bg-slate-800 p-3 rounded-md"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, false)}
            >
                <h4 className="text-xl font-semibold dark:text-[#abc2d3] text-gray-700 text-center mb-3">
                    {todoTitle}
                </h4>

                <form onSubmit={handleAddTodo} className="mb-4 w-full">
                    <div className="flex">
                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder={placeholder}
                            aria-label={placeholder}
                            className="px-4 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-[#abc2d3] w-full outline-none border-l border-t border-b rounded-l-md focus:border-blue-300 border-gray-300 text-[0.9rem]"
                        />
                        <button
                            type="submit"
                            className="px-4 py-1 text-[0.9rem] bg-blue-500 text-white rounded-r-md"
                        >
                            {addLabel}
                        </button>
                    </div>
                </form>

                <ul className="space-y-2">
                    {openTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
                    ))}
                </ul>
            </div>

            <div
                className="w-full md:w-[50%] min-h-[120px] dark:bg-slate-800 bg-gray-50 p-3 rounded-md"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, true)}
            >
                <h4 className="text-xl font-semibold text-gray-700 dark:text-[#abc2d3] text-center mb-3">
                    {completedTitle}
                </h4>
                <ul className="space-y-2">
                    {completedTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};
