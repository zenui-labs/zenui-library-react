import React, {useState, useRef} from 'react';
import {motion, useMotionValue, AnimatePresence} from 'framer-motion';

export default function DragAndDropExample() {
    const [items, setItems] = useState([
        {id: '1', title: 'Complete report', category: 'Work', priority: 3, color: 'bg-blue-400'},
        {id: '2', title: 'Buy groceries', category: 'Personal', priority: 2, color: 'bg-green-400'},
        {id: '3', title: 'Call client', category: 'Work', priority: 4, color: 'bg-yellow-400'},
        {id: '4', title: 'Fix bug in code', category: 'Work', priority: 5, color: 'bg-pink-400'},
        {id: '5', title: 'Doctor appointment', category: 'Personal', priority: 4, color: 'bg-purple-400'},
        {id: '6', title: 'Submit proposal', category: 'Urgent', priority: 5, color: 'bg-red-400'},
        {id: '7', title: 'Gym workout', category: 'Personal', priority: 1, color: 'bg-indigo-400'},
        {id: '8', title: 'Team meeting', category: 'Work', priority: 3, color: 'bg-teal-400'}
    ]);

    const findIndex = (id) => items.findIndex((item) => item.id === id);

    const findPosition = (id) => {
        const index = findIndex(id);
        const item = items[index];
        return {index, item};
    };

    const moveItem = (fromId, toId) => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            const fromIndex = prevItems.findIndex(item => item.id === fromId);
            const toIndex = prevItems.findIndex(item => item.id === toId);

            if (fromIndex !== -1 && toIndex !== -1) {
                const [movedItem] = newItems.splice(fromIndex, 1);
                newItems.splice(toIndex, 0, movedItem);
            }

            return newItems;
        });
    };

    const sensors = {
        mouse: useRef({}),
        touch: useRef({}),
    };

    return (
        <AnimatePresence>
            {items.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    item={item}
                    color={item.color}
                    moveItem={moveItem}
                    findPosition={findPosition}
                    sensors={sensors}
                />
            ))}
        </AnimatePresence>
    );
}

const Item = ({id, item, color, moveItem, findPosition, sensors}) => {
    const [isDragging, setIsDragging] = useState(false);

    const dragOriginX = useMotionValue(0);
    const dragOriginY = useMotionValue(0);

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = () => {
        setIsDragging(false);
        dragOriginX.set(0);
        dragOriginY.set(0);
    };

    const onDrag = (event, info) => {
        const targetElement = document.elementFromPoint(info.point.x, info.point.y);
        const targetId = targetElement?.closest('[data-id]')?.dataset?.id;

        if (targetId && targetId !== id) {
            moveItem(id, targetId);
        }
    };

    return (
        <motion.div
            layout
            data-id={id}
            drag
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
            dragElastic={0.4}
            dragOriginX={dragOriginX}
            dragOriginY={dragOriginY}
            whileDrag={{
                scale: 1.05,
                zIndex: 10,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
            }}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            className={`${color} p-6 w-full rounded-lg cursor-grab shadow-md`}
            initial={{opacity: 0, scale: 0.8}}
            animate={{
                opacity: 1,
                scale: 1,
                boxShadow: isDragging
                    ? "0px 10px 25px rgba(0,0,0,0.2)"
                    : "0px 4px 8px rgba(0,0,0,0.1)"
            }}
            exit={{opacity: 0, scale: 0.8}}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 17,
            }}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <span className="text-xs text-white text-opacity-80">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-white bg-black bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    Priority: {item.priority}
                  </span>
                </div>
            </div>
        </motion.div>
    );
};