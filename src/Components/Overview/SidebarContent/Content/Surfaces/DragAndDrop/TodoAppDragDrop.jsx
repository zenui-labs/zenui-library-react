import React, {useCallback, useState} from 'react';

const TodoAppDragDrop = () => {
    const [todos, setTodos] = useState([
        {id: 1, text: 'Fix website bug', completed: false},
        {id: 2, text: 'Prepare for meeting', completed: false},
        {id: 3, text: 'Send email updates', completed: false},
    ]);

    const [completedTodos, setCompletedTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');

    const onTodoDragStart = (e, id, isCompleted) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({id, isCompleted}));
    };

    const onTodoDragOver = (e) => {
        e.preventDefault();
    };

    const onTodoDrop = (e, targetCompleted) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const {id, isCompleted} = data;

        if (isCompleted !== targetCompleted) {
            if (isCompleted) {
                const [movedTodo] = completedTodos.filter((todo) => todo.id === id);
                setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
                setTodos((prevTodos) => [
                    ...prevTodos,
                    {...movedTodo, completed: false},
                ]);
            } else {
                const [movedTodo] = todos.filter((todo) => todo.id === id);
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                setCompletedTodos((prevCompleted) => [
                    ...prevCompleted,
                    {...movedTodo, completed: true},
                ]);
            }
        }
    };

    const handleAddTodo = useCallback(
        (e) => {
            e.preventDefault();
            if (newTodoText.trim() !== '') {
                const newTodo = {
                    id: Date.now(),
                    text: newTodoText.trim(),
                    completed: false,
                };
                setTodos((prevTodos) => {
                    const updatedTodos = [...prevTodos, newTodo];
                    return updatedTodos;
                });
                setNewTodoText('');
            }
        },
        [newTodoText]
    );

    return (
        <div className='p-8 mb-4 flex 1024px:flex-row flex-col gap-5 justify-center'>
            <div
                className='w-full 1024px:w-[50%] bg-gray-50 dark:bg-slate-800 p-3 rounded-md'
                onDragOver={onTodoDragOver}
                onDrop={(e) => onTodoDrop(e, false)}
            >
                <h4 className='text-xl font-semibold dark:text-[#abc2d3] text-gray-700 text-center mb-3'>
                    Todo
                </h4>

                <form onSubmit={handleAddTodo} className='mb-4 w-full'>
                    <div className='flex'>
                        <input
                            type='text'
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder='Add todo'
                            className='px-4 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-[#abc2d3] w-full outline-none border-l border-t border-b rounded-l-md focus:border-blue-300 border-gray-300 text-[0.9rem]'
                        />
                        <button
                            type='submit'
                            className='px-4 py-1 text-[0.9rem] bg-blue-500 text-white rounded-r-md'
                        >
                            Add
                        </button>
                    </div>
                </form>

                <ul className='space-y-2'>
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={(e) => onTodoDragStart(e, todo.id, false)}
                            className='bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move'
                        >
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className='w-full 1024px:w-[50%] min-h-[120px] dark:bg-slate-800 bg-gray-50 p-3 rounded-md'
                onDragOver={onTodoDragOver}
                onDrop={(e) => onTodoDrop(e, true)}
            >
                <h4 className='text-xl font-semibold text-gray-700 dark:text-[#abc2d3] text-center mb-3'>
                    Completed
                </h4>
                <ul className='space-y-2'>
                    {completedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={(e) => onTodoDragStart(e, todo.id, true)}
                            className='bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move'
                        >
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoAppDragDrop;