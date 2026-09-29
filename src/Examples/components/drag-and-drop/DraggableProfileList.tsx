import {useState, type DragEvent} from "react";

// react icons
import {RiDraggable} from "react-icons/ri";

export interface Profile {
    id: string | number;
    name: string;
    /** Avatar image URL. */
    avatar: string;
    /** Job title shown under the name. */
    title: string;
}

export interface DraggableProfileListProps {
    /** Profiles in their starting order. */
    items: Profile[];
    /** Called with the new order after two rows swap. */
    onReorder?: (items: Profile[]) => void;
    className?: string;
}

/** A list of profile rows. Drag a row onto another to swap them; a dashed border shows where it will land. */
export const DraggableProfileList = ({items, onReorder, className = ""}: DraggableProfileListProps) => {
    const [listItems, setListItems] = useState<Profile[]>(items);
    const [draggedItem, setDraggedItem] = useState<Profile | null>(null);
    const [hoveredItem, setHoveredItem] = useState<Profile | null>(null);

    const resetDrag = () => {
        setDraggedItem(null);
        setHoveredItem(null);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: Profile) => {
        // Firefox only starts a drag when some data is set.
        e.dataTransfer.setData("text/plain", String(item.id));
        e.dataTransfer.effectAllowed = "move";
        setDraggedItem(item);
    };

    // Allow the drop and show the hover indicator on the row under the pointer.
    const handleDragOver = (e: DragEvent<HTMLDivElement>, item: Profile) => {
        e.preventDefault();
        setHoveredItem(item);
    };

    // Ignore leave events that only move between the row and its children.
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
        setHoveredItem(null);
    };

    // Swap the dragged row with the drop target.
    const handleDrop = (e: DragEvent<HTMLDivElement>, dropItem: Profile) => {
        e.preventDefault();
        if (!draggedItem) return;

        const next = listItems.map((item) => {
            if (item.id === dropItem.id) return draggedItem;
            if (item.id === draggedItem.id) return dropItem;
            return item;
        });

        setListItems(next);
        onReorder?.(next);
        resetDrag();
    };

    return (
        <div className={`flex flex-col w-full gap-4 ${className}`}>
            {listItems.map((item) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragLeave={handleDragLeave}
                    onDragEnd={resetDrag}
                    className={`p-4 border-2 dark:border-slate-600 rounded text-center flex items-center justify-between ${
                        item.id === draggedItem?.id ? "bg-blue-100 opacity-30" : ""
                    } ${
                        item.id === hoveredItem?.id
                            ? "border-dashed dark:border-[#3B9DF8] border-2 border-blue-500"
                            : "border-gray-100"
                    }`}
                >
                    <div className="flex items-center gap-[8px] sm:gap-[15px]">
                        <img
                            alt={item.name}
                            src={item.avatar}
                            draggable={false}
                            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-md object-contain"
                        />

                        <div className="text-left flex flex-col sm:gap-[5px]">
                            <h4 className="text-[1rem] dark:text-[#abc2d3] sm:text-[1.3rem] text-gray-700 font-[600]">
                                {item.name}
                            </h4>
                            <p className="text-[0.7rem] dark:text-[#abc2d3]/70 sm:text-[0.9rem] text-gray-500">
                                {item.title}
                            </p>
                        </div>
                    </div>

                    <RiDraggable
                        aria-hidden
                        className="text-[1.5rem] dark:text-[#abc2d3]/70 sm:text-[1.8rem] text-gray-600 cursor-move"/>
                </div>
            ))}
        </div>
    );
};
