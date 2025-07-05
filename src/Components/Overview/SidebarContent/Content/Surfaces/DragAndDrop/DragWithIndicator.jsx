import React, {useState} from 'react';

const DragWithIndicator = () => {
    const initialGrid = [
        {
            id: 1,
            image: 'https://i.ibb.co.com/XxvZ2Kq/Logo.png',
        },
        {
            id: 2,
            image: 'https://i.ibb.co.com/9N5LS3M/images-1.jpg',
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/qY35qZK/images.jpg',
        },
        {
            id: 4,
            image: 'https://i.ibb.co.com/2gLx39W/Logo-3.png',
        },
        {
            id: 5,
            image: 'https://i.ibb.co.com/GCDDPQz/png-clipart-logo-technology-digital-restaurant-marketing-for-restaurants-technology-electronics-text.png',
        },
        {
            id: 6,
            image: 'https://i.ibb.co.com/5nTyZ7v/png-clipart-react-full-logo-tech-companies-thumbnail.png',
        },
        {
            id: 7,
            image: 'https://i.ibb.co.com/fp0pFV5/Logo-5.png',
        },
        {
            id: 8,
            image: 'https://i.ibb.co.com/S3Z98YZ/Logo-6.png',
        },
        {
            id: 9,
            image: 'https://i.ibb.co.com/0FwfDsz/Union.png',
        },
    ];

    const [gridItems, setGridItems] = useState(initialGrid);
    const [draggedItem, setDraggedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    // Handle drag start event
    const handleDragStart = (item) => {
        setDraggedItem(item);
    };

    // Handle drag over event and show hover indicator
    const handleDragOver = (e, item) => {
        e.preventDefault();
        setHoveredItem(item);
    };

    // Handle drop event and swap items
    const handleDrop = (e, dropItem) => {
        e.preventDefault();

        // Swap dragged item with drop target
        const newGrid = gridItems.map((item) => {
            if (item.id === dropItem.id) {
                return draggedItem;
            }
            if (item.id === draggedItem.id) {
                return dropItem;
            }
            return item;
        });

        setGridItems(newGrid);
        setDraggedItem(null);
        setHoveredItem(null);
    };

    return (
        <div className='grid grid-cols-1 640px:grid-cols-2 1024px:grid-cols-3 gap-4'>
            {gridItems.map((item) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragLeave={() => setHoveredItem(null)}
                    className={`w-full px-8 py-4 border-2 dark:border-slate-500 rounded text-center cursor-move ${
                        item.id === draggedItem?.id && 'bg-blue-100 opacity-30'
                    } ${
                        item.id === hoveredItem?.id
                            ? 'border-dashed border-2 dark:border-primary border-blue-500'
                            : 'border-gray-100'
                    }`}
                >
                    <img
                        alt='image'
                        src={item.image}
                        className='w-[100px] 640px:w-[140px] h-[50px] object-contain'
                    />
                </div>
            ))}
        </div>
    );
};

export default DragWithIndicator;