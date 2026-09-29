import {useState, type DragEvent} from "react";

export interface DragSwapItem {
    id: string | number;
    /** Image URL. */
    image: string;
    /** Alt text for the image. */
    alt: string;
}

export interface DragSwapGridProps {
    /** Items in their starting order. */
    items: DragSwapItem[];
    /** Called with the new order after two items swap. */
    onReorder?: (items: DragSwapItem[]) => void;
    className?: string;
}

/** A grid of image tiles. Drag a tile onto another to swap them; a dashed border shows where it will land. */
export const DragSwapGrid = ({items, onReorder, className = ""}: DragSwapGridProps) => {
    const [gridItems, setGridItems] = useState<DragSwapItem[]>(items);
    const [draggedItem, setDraggedItem] = useState<DragSwapItem | null>(null);
    const [hoveredItem, setHoveredItem] = useState<DragSwapItem | null>(null);

    const resetDrag = () => {
        setDraggedItem(null);
        setHoveredItem(null);
    };

    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: DragSwapItem) => {
        // Firefox only starts a drag when some data is set.
        e.dataTransfer.setData("text/plain", String(item.id));
        e.dataTransfer.effectAllowed = "move";
        setDraggedItem(item);
    };

    // Allow the drop and show the hover indicator on the tile under the pointer.
    const handleDragOver = (e: DragEvent<HTMLDivElement>, item: DragSwapItem) => {
        e.preventDefault();
        setHoveredItem(item);
    };

    // Ignore leave events that only move between the tile and its image.
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
        setHoveredItem(null);
    };

    // Swap the dragged tile with the drop target.
    const handleDrop = (e: DragEvent<HTMLDivElement>, dropItem: DragSwapItem) => {
        e.preventDefault();
        if (!draggedItem) return;

        const next = gridItems.map((item) => {
            if (item.id === dropItem.id) return draggedItem;
            if (item.id === draggedItem.id) return dropItem;
            return item;
        });

        setGridItems(next);
        onReorder?.(next);
        resetDrag();
    };

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
            {gridItems.map((item) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragLeave={handleDragLeave}
                    onDragEnd={resetDrag}
                    className={`w-full px-8 py-4 border-2 dark:border-slate-500 rounded text-center cursor-move ${
                        item.id === draggedItem?.id ? "bg-blue-100 opacity-30" : ""
                    } ${
                        item.id === hoveredItem?.id ? "border-dashed border-2 dark:border-blue-500 border-blue-500" : "border-gray-100"
                    }`}
                >
                    <img
                        alt={item.alt}
                        src={item.image}
                        draggable={false}
                        className="w-[100px] sm:w-[140px] h-[50px] object-contain"
                    />
                </div>
            ))}
        </div>
    );
};
