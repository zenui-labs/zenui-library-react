import {useRef, useState} from "react";
import {motion, AnimatePresence, type PanInfo} from "framer-motion";

export interface DragSortItem {
    id: string;
    title: string;
    category: string;
    priority: number;
    /** Tailwind background class for the card, for example "bg-blue-400". */
    color: string;
}

interface DragSortCardProps {
    item: DragSortItem;
    priorityLabel: string;
    onHover: (fromId: string, toId: string) => void;
}

const DragSortCard = ({item, priorityLabel, onHover}: DragSortCardProps) => {
    const [isDragging, setIsDragging] = useState(false);

    // Swaps places with the card under the pointer while dragging.
    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const targetElement = document.elementFromPoint(info.point.x, info.point.y);
        const targetId = targetElement?.closest<HTMLElement>("[data-id]")?.dataset.id;

        if (targetId && targetId !== item.id) {
            onHover(item.id, targetId);
        }
    };

    return (
        <motion.div
            layout
            data-id={item.id}
            drag
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
            dragElastic={0.4}
            whileDrag={{
                scale: 1.05,
                zIndex: 10,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
            }}
            onDragStart={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragEnd={() => setIsDragging(false)}
            className={`${item.color} p-6 w-full rounded-lg cursor-grab shadow-md`}
            initial={{opacity: 0, scale: 0.8}}
            animate={{
                opacity: 1,
                scale: 1,
                boxShadow: isDragging ? "0px 10px 25px rgba(0,0,0,0.2)" : "0px 4px 8px rgba(0,0,0,0.1)",
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
                        {priorityLabel}: {item.priority}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export interface DragSortListProps {
    /** Cards in their starting order. */
    items: DragSortItem[];
    /** Called with the new order every time two cards swap. */
    onReorder?: (items: DragSortItem[]) => void;
    priorityLabel?: string;
    className?: string;
}

/** A list of cards you reorder by dragging one over another. The other cards slide out of the way. */
export const DragSortList = ({items, onReorder, priorityLabel = "Priority", className = ""}: DragSortListProps) => {
    const [order, setOrder] = useState<DragSortItem[]>(items);
    // Drag events fire many times per second, so the latest order is read from a ref.
    const orderRef = useRef(order);
    orderRef.current = order;

    const moveItem = (fromId: string, toId: string) => {
        const current = orderRef.current;
        const fromIndex = current.findIndex((item) => item.id === fromId);
        const toIndex = current.findIndex((item) => item.id === toId);
        if (fromIndex === -1 || toIndex === -1) return;

        const next = [...current];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        orderRef.current = next;
        setOrder(next);
        onReorder?.(next);
    };

    return (
        <div className={`flex w-full flex-col gap-5 ${className}`}>
            <AnimatePresence>
                {order.map((item) => (
                    <DragSortCard key={item.id} item={item} priorityLabel={priorityLabel} onHover={moveItem}/>
                ))}
            </AnimatePresence>
        </div>
    );
};
