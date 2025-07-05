import React, {useState} from 'react';
import {RiDraggable} from "react-icons/ri";

const ListDragDrop = () => {
    const listsData = [
        {
            id: 1,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            title: 'Software Engineer',
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            title: 'Product Manager',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            title: 'UX Designer',
        },
        {
            id: 4,
            name: 'Emily Davis',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            title: 'Marketing Specialist',
        },
        {
            id: 5,
            name: 'David Wilson',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            title: 'Data Analyst',
        },
        {
            id: 6,
            name: 'Sophia Brown',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
            title: 'Project Coordinator',
        },
    ];

    const [listItems, setListItems] = useState(listsData);
    const [listDraggedItem, setListDraggedItem] = useState(null);
    const [listHoveredItem, setListHoveredItem] = useState(null);

    // Handle drag start event from the icon
    const handleListDragStart = (item) => {
        setListDraggedItem(item);
    };

    // Handle drag over event and show hover indicator
    const handleListDragOver = (e, item) => {
        e.preventDefault();
        setListHoveredItem(item);
    };

    // Handle drop event and swap items
    const handleListDrop = (e, dropItem) => {
        e.preventDefault();

        // Swap dragged item with drop target
        const newGrid = listItems.map((item) => {
            if (item.id === dropItem.id) {
                return listDraggedItem;
            }
            if (item.id === listDraggedItem.id) {
                return dropItem;
            }
            return item;
        });

        setListItems(newGrid);
        setListDraggedItem(null);
        setListHoveredItem(null);
    };

    return (
        <div className='flex flex-col w-full gap-4'>
            {listItems.map((item) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleListDragStart(item)}
                    onDragOver={(e) => handleListDragOver(e, item)}
                    onDrop={(e) => handleListDrop(e, item)}
                    onDragLeave={() => setListHoveredItem(null)}
                    className={`grid-item p-4 border-2 dark:border-slate-600 rounded text-center flex items-center justify-between ${
                        item.id === listDraggedItem?.id &&
                        'bg-blue-100 opacity-30'
                    } ${
                        item.id === listHoveredItem?.id
                            ? 'border-dashed dark:border-primary border-2 border-blue-500'
                            : 'border-gray-100'
                    }`}
                >
                    <div className='flex items-center gap-[8px] 640px:gap-[15px]'>
                        <img
                            alt='image'
                            src={item.avatar}
                            className='w-[40px] h-[40px] 640px:w-[60px] 640px:h-[60px] rounded-md object-contain'
                        />

                        <div className='text-left flex flex-col 640px:gap-[5px]'>
                            <h4 className='text-[1rem] dark:text-[#abc2d3] 640px:text-[1.3rem] text-gray-700 font-[600]'>
                                {item.name}
                            </h4>
                            <p className='text-[0.7rem] dark:text-[#abc2d3]/70 640px:text-[0.9rem] text-gray-500'>
                                {item.title}
                            </p>
                        </div>
                    </div>

                    <RiDraggable
                        className='text-[1.5rem] dark:text-[#abc2d3]/70 640px:text-[1.8rem] text-gray-600 cursor-move'/>
                </div>
            ))}
        </div>
    );
};

export default ListDragDrop;