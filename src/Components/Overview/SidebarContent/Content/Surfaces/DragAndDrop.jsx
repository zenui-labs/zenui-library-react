import React, {useState, useCallback} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader';
import OverviewFooter from '@shared/OverviewFooter';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {dragAndDropContents} from '@utils/ContentsConfig/SurfacesContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {IoCloudUploadOutline} from 'react-icons/io5';
import {CiImageOn} from 'react-icons/ci';
import {RxCross2} from 'react-icons/rx';
import {IoMdDoneAll} from 'react-icons/io';
import {RiDraggable} from 'react-icons/ri';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const DragAndDrop = () => {
    // basicApp
    const sectionIds = dragAndDropContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

    // actions
    const [dragDrop1Preview, setDragDrop1Preview] = useState(true);
    const [dragDrop1Code, setDragDrop1Code] = useState(false);

    const [dragDrop2Preview, setDragDrop2Preview] = useState(true);
    const [dragDrop2Code, setDragDrop2Code] = useState(false);

    const [dragDrop3Preview, setDragDrop3Preview] = useState(true);
    const [dragDrop3Code, setDragDrop3Code] = useState(false);

    const [dragDrop4Preview, setDragDrop4Preview] = useState(true);
    const [dragDrop4Code, setDragDrop4Code] = useState(false);

    const [dragDrop5Preview, setDragDrop5Preview] = useState(true);
    const [dragDrop5Code, setDragDrop5Code] = useState(false);

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

    // drag and drop image
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Handle file selection when dropped or clicked
    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        handleFile(file);
        setIsDragging(false);
    };

    // Function to validate and display the image
    const handleFile = (file) => {
        if (!file) return;

        if (file.type.startsWith('image/')) {
            setErrorMessage('');
            const reader = new FileReader();
            reader.onload = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setErrorMessage('Please upload an image file.');
            setSelectedImage(null);
        }
    };

    // Handle drag over event to allow the drop
    const handleImageDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // multiple image upload with drag and drop
    const [images, setImages] = useState([]);
    const [dragging, setDragging] = useState(false);

    // Handle files when dropped or selected
    const handleMultipleFileDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        uploadFiles(files);
        e.target.value = '';
    };

    // Function to simulate file upload and track progress
    const uploadFiles = (files) => {
        const fileList = Array.from(files).map((file) => ({
            file,
            size: formatFileSize(file.size),
            progress: 0,
            uploaded: false,
            cancelled: false,
        }));
        setImages((prevImages) => [...prevImages, ...fileList]);

        fileList.forEach((fileObj, index) => {
            simulateUpload(fileObj, index + images.length);
        });
    };

    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024 * 1024) {
            // Show size in KB for files less than 1 MB
            return (sizeInBytes / 1024).toFixed(2) + ' KB';
        } else {
            // Show size in MB for files 1 MB or larger
            return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
    };

    // Simulate upload progress
    const simulateUpload = (fileObj, index) => {
        const interval = setInterval(() => {
            setImages((prevImages) => {
                const newImages = [...prevImages];
                if (!newImages[index].cancelled) {
                    const progress = newImages[index].progress + 10;
                    if (progress >= 100) {
                        clearInterval(interval);
                        newImages[index].progress = 100;
                        newImages[index].uploaded = true;
                    } else {
                        newImages[index].progress = progress;
                    }
                } else {
                    clearInterval(interval);
                }
                return newImages;
            });
        }, 300); // Simulate upload progress every 300ms
    };

    // Handle drag events
    const handleMultipleDragOver = (e) => {
        e.preventDefault();
    };

    const handleMultipleDragEnter = () => {
        setDragging(true);
    };

    const handleMultipleDragLeave = () => {
        setDragging(false);
    };

    // Cancel the upload of a specific file
    const cancelUpload = (index) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index].cancelled = true;
            return newImages;
        });
    };

    // profile card drag and drop
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
                console.log('Adding new todo:', newTodo);
                setTodos((prevTodos) => {
                    const updatedTodos = [...prevTodos, newTodo];
                    console.log('Updated todos:', updatedTodos);
                    return updatedTodos;
                });
                setNewTodoText('');
            }
        },
        [newTodoText]
    );

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader
                        id='drag-&-drop-with-indicator'
                        text={'drag & drop with indicator'}
                    />

                    <ComponentDescription text='Drag & drop with indicator shows where an item will be placed,
            enhancing user clarity and interaction.'/>

                    <ToggleTab setCode={setDragDrop1Code} code={dragDrop1Code} preview={dragDrop1Preview}
                               setPreview={setDragDrop1Preview}/>

                    <ComponentWrapper>
                        {dragDrop1Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
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
                            </div>
                        )}

                        {dragDrop1Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

const DragAndDrop = () => {

    const cardData = [
        {
            id: 1,
            image: "https://i.ibb.co.com/XxvZ2Kq/Logo.png"
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/HgvwbMy/Logo-1.png"
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/XS8kxJF/Logo-2.png"
        },
        {
            id: 4,
            image: "https://i.ibb.co.com/2gLx39W/Logo-3.png"
        },
        {
            id: 5,
            image: "https://i.ibb.co.com/DkDCXrk/Logo-4.png"
        },
        {
            id: 6,
            image: "https://i.ibb.co.com/W0qf3ZP/Amazon.png"
        },
        {
            id: 7,
            image: "https://i.ibb.co.com/fp0pFV5/Logo-5.png"
        },
        {
            id: 8,
            image: "https://i.ibb.co.com/S3Z98YZ/Logo-6.png"
        },
        {
            id: 9,
            image: "https://i.ibb.co.com/0FwfDsz/Union.png"
        },
    ];

    const [gridItems, setGridItems] = useState(cardData);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gridItems.map((item) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDrop={(e) => handleDrop(e, item)}
                    onDragLeave={() => setHoveredItem(null)}
                    className={`w-full px-8 py-4 border-2 dark:border-slate-500 rounded text-center cursor-move ${
                        item.id === draggedItem?.id && "bg-blue-100 opacity-30"
                    } ${
                        item.id === hoveredItem?.id ? "border-dashed border-2 dark:border-blue-500 border-blue-500" : "border-gray-100"
                    }`}
                >
                    <img alt="image" src={item.image}
                         className="w-[100px] sm:w-[140px] h-[50px] object-contain"/>
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='upload-multiple-files-with-drag-&-drop'
                            text={'upload multiple files with drag & drop'}
                            isPremium={true}
                        />
                    </div>

                    <ComponentDescription text='Drag & drop for multiple file uploads lets users easily upload
            several files at once.'/>

                    <ToggleTab isPremium={true} componentUrl='https://buymeacoffee.com/zenuilibrary/e/319007'
                               setCode={setDragDrop2Code} isPremiumModalOpen={isPremiumModalOpen}
                               setIsPremiumModalOpen={setIsPremiumModalOpen} code={dragDrop2Code}
                               setPreview={setDragDrop2Preview} preview={dragDrop2Preview}/>

                    <ComponentWrapper>
                        {dragDrop2Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <div className='flex flex-col justify-center items-center w-full'>
                                    {/* Drop Zone */}
                                    <div
                                        className={`border-2 p-6 rounded-lg dark:bg-slate-800 dark:border-slate-600 w-full h-64 flex flex-col justify-center items-center bg-white  ${
                                            dragging
                                                ? 'border-dashed border-blue-400 !bg-blue-100'
                                                : 'border-gray-200 border-dashed'
                                        } transition-colors duration-300 ease-in-out`}
                                        onDrop={handleMultipleFileDrop}
                                        onDragOver={handleMultipleDragOver}
                                        onDragEnter={handleMultipleDragEnter}
                                        onDragLeave={handleMultipleDragLeave}
                                    >
                                        <img
                                            src='https://i.ibb.co.com/XY2YgLh/Searching-for-files-in-a-folder.png'
                                            className='w-[100px]'
                                        />
                                        <label
                                            htmlFor='file-multiple-upload'
                                            className='font-[500] dark:text-[#abc2d3] text-center text-gray-700 text-[1rem]'
                                        >
                      <span className='underline cursor-pointer'>
                        Click to upload{' '}
                      </span>
                                            Drag & Drop your images here
                                        </label>
                                        <p className='text-[0.8rem] dark:text-[#abc2d3]/60 text-gray-500 mt-2'>
                                            Maximum file size 50 MB.
                                        </p>
                                        <input
                                            id='file-multiple-upload'
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={handleMultipleFileDrop}
                                            multiple
                                        />
                                    </div>

                                    {/* Images Uploading List */}
                                    <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                                        {images.map((imageObj, index) => (
                                            <div
                                                key={index}
                                                className='relative p-3 rounded-lg dark:bg-slate-800 dark:border-slate-600 bg-gray-50 border border-gray-200'
                                            >
                                                <div className='flex flex-col'>
                                                    <div className='flex items-start justify-between w-full mb-1'>
                                                        <div className='flex items-start gap-[10px]'>
                                                            <CiImageOn
                                                                className='bg-white dark:bg-slate-900/80 dark:border-slate-600 rounded-md p-1 border border-gray-200 text-[1.7rem] text-gray-500'/>
                                                            <div>
                                                                <p className='text-gray-700 font-[500] text-[0.9rem] leading-[20px] 640px:leading-[9px] text-[#abc2d3] 640px:mt-0.5'>
                                                                    {imageObj.file.name}
                                                                </p>
                                                                <span className='text-[0.6rem] text-gray-400'>
                                  {imageObj.size}
                                </span>
                                                            </div>
                                                        </div>
                                                        {!imageObj.cancelled && !imageObj.uploaded && (
                                                            <button
                                                                onClick={() => cancelUpload(index)}
                                                                className='text-gray-500 hover:text-red-500'
                                                            >
                                                                <RxCross2/>
                                                            </button>
                                                        )}

                                                        {imageObj.uploaded && (
                                                            <IoMdDoneAll className='text-green-600 text-[1.1rem]'/>
                                                        )}
                                                    </div>
                                                    {imageObj.cancelled ? (
                                                        <p className='text-[0.8rem] text-red-600'>
                                                            Upload Cancelled
                                                        </p>
                                                    ) : (
                                                        <>
                                                            <div
                                                                className='flex items-center justify-between gap-[8px]'>
                                                                <div
                                                                    className='w-full dark:bg-slate-800 bg-white h-1.5 rounded-lg overflow-hidden'>
                                                                    <div
                                                                        className='bg-blue-500 h-full transition-all duration-300'
                                                                        style={{width: `${imageObj.progress}%`}}
                                                                    ></div>
                                                                </div>
                                                                <span
                                                                    className='text-[0.7rem] mb-0.5 dark:text-[#abc2d3] text-gray-500'>
                                  {imageObj.progress}%
                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {images?.length ? (
                                    <button
                                        onClick={() => setImages([])}
                                        className='py-2 px-6 bg-red-500 rounded-md text-white'
                                    >
                                        Reset
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                        )}

                        {dragDrop2Code && (
                            <Showcode
                                code='
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='upload-image-with-drag-&-drop'
                            text={'upload image with drag & drop'}
                        />
                    </div>

                    <ComponentDescription text='Drag & drop image upload lets users quickly upload images by
            dragging them into a designated area.'/>

                    <ToggleTab setCode={setDragDrop3Code} code={dragDrop3Code} setPreview={setDragDrop3Preview}
                               preview={dragDrop3Preview}/>

                    <ComponentWrapper>
                        {dragDrop3Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <div className='flex justify-center items-center w-full flex-col'>
                                    <div
                                        className={`${
                                            isDragging
                                                ? 'border-blue-300 !bg-blue-50'
                                                : 'border-gray-300'
                                        } ${
                                            selectedImage ? '' : 'border-dashed border-2 p-6'
                                        } rounded-lg w-full h-64 flex flex-col dark:bg-slate-800 dark:border-slate-600 justify-center items-center bg-white`}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleFileDrop}
                                        onDragOver={handleImageDragOver}
                                    >
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt='Preview'
                                                className='w-full h-full object-cover rounded-lg'
                                            />
                                        ) : (
                                            <>
                                                {isDragging ? (
                                                    <h5 className='text-[2rem] text-blue-700 font-[600]'>
                                                        Drop Here
                                                    </h5>
                                                ) : (
                                                    <>
                                                        <IoCloudUploadOutline
                                                            className='text-[3rem] mb-4 text-gray-400'/>
                                                        <p className='text-gray-500 text-center dark:text-[#abc2d3] text-[1.1rem] font-[500] mb-2'>
                                                            Drag & Drop your image here
                                                        </p>
                                                        <p className='text-gray-400'>or</p>
                                                        <label
                                                            htmlFor='file-upload'
                                                            className='cursor-pointer dark:bg-slate-500 dark:text-[#abc2d3] py-2 px-4 bg-gray-200 rounded-md mt-2'
                                                        >
                                                            Browse File
                                                        </label>
                                                        <input
                                                            id='file-upload'
                                                            type='file'
                                                            accept='image/*'
                                                            className='hidden'
                                                            onChange={handleFileDrop}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {errorMessage && (
                                        <p className='text-red-500 mt-4'>{errorMessage}</p>
                                    )}

                                    {selectedImage && (
                                        <div className='mt-4'>
                                            <button
                                                onClick={() => setSelectedImage(null)}
                                                className='bg-red-500 text-white px-4 py-2 rounded-lg'
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {dragDrop3Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoCloudUploadOutline} from "react-icons/io5";

const DragToUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // Handle file selection when dropped or clicked
    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        handleFile(file);
        setIsDragging(false);
    };

    // Function to validate and display the image
    const handleFile = (file) => {
        if (!file) return;

        if (file.type.startsWith("image/")) {
            setErrorMessage("");
            const reader = new FileReader();
            reader.onload = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setErrorMessage("Please upload an image file.");
            setSelectedImage(null);
        }
    };

    // Handle drag over event to allow the drop
    const handleImageDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    return (
        <div className="flex justify-center items-center w-full flex-col">
            <div
                className={`${
                    isDragging
                        ? "border-blue-300 !bg-blue-50"
                        : "border-gray-300"
                } ${
                    selectedImage ? "" : "border-dashed border-2 p-6"
                } rounded-lg w-full h-64 flex flex-col dark:bg-slate-800 dark:border-slate-600 justify-center items-center bg-white`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
                onDragOver={handleImageDragOver}
            >
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <>
                        {isDragging ? (
                            <h5 className="text-[2rem] text-blue-700 font-[600]">
                                Drop Here
                            </h5>
                        ) : (
                            <>
                                <IoCloudUploadOutline className="text-[3rem] mb-4 text-gray-400"/>
                                <p className="text-gray-500 text-center dark:text-[#abc2d3] text-[1.1rem] font-[500] mb-2">
                                    Drag & Drop your image here
                                </p>
                                <p className="text-gray-400">or</p>
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer dark:bg-slate-500 dark:text-[#abc2d3] py-2 px-4 bg-gray-200 rounded-md mt-2"
                                >
                                    Browse File
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileDrop}
                                />
                            </>
                        )}
                    </>
                )}
            </div>

            {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
            )}

            {selectedImage && (
                <div className="mt-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Remove Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default DragToUpload;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='list-drag-&-drop' text={'list drag & drop'}/>
                    </div>

                    <ComponentDescription text='List drag & drop allows users to rearrange items by dragging and
            dropping them into a new order.'/>

                    <ToggleTab setCode={setDragDrop4Code} code={dragDrop4Code} preview={dragDrop4Preview}
                               setPreview={setDragDrop4Preview}/>

                    <ComponentWrapper>
                        {dragDrop4Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
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
                            </div>
                        )}

                        {dragDrop4Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RiDraggable} from "react-icons/ri";

const DragAndDrop = () => {
    // profile card drag and drop
    const listsData = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            title: "Software Engineer",
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            title: "Product Manager",
        },
        {
            id: 3,
            name: "Michael Johnson",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            title: "UX Designer",
        },
        {
            id: 4,
            name: "Emily Davis",
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            title: "Marketing Specialist",
        },
        {
            id: 5,
            name: "David Wilson",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            title: "Data Analyst",
        },
        {
            id: 6,
            name: "Sophia Brown",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            title: "Project Coordinator",
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
        <div className="flex flex-col w-full gap-4">
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
                        "bg-blue-100 opacity-30"
                    } ${
                        item.id === listHoveredItem?.id
                            ? "border-dashed dark:border-[#3B9DF8] border-2 border-blue-500"
                            : "border-gray-100"
                    }`}
                >
                    <div className="flex items-center gap-[8px] smgap-[15px]">
                        <img
                            alt="image"
                            src={item.avatar}
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
                        className="text-[1.5rem] dark:text-[#abc2d3]/70 sm:text-[1.8rem] text-gray-600 cursor-move"/>
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='todo-app-with-drag-&-drop'
                            text={'todo app with drag & drop'}
                        />
                    </div>

                    <ComponentDescription text='A to-do app with drag & drop lets users easily organize tasks by
            dragging them into new positions.'/>

                    <ToggleTab setCode={setDragDrop5Code} setPreview={setDragDrop5Preview} code={dragDrop5Code}
                               preview={dragDrop5Preview}/>

                    <ComponentWrapper>
                        {dragDrop5Preview && (
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
                        )}

                        {dragDrop5Code && (
                            <Showcode
                                code='
import React, {useCallback, useState} from "react";

const TodoApp = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: "Fix website bug", completed: false },
        { id: 2, text: "Prepare for meeting", completed: false },
        { id: 3, text: "Send email updates", completed: false },
    ]);

    const [completedTodos, setCompletedTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState("");

    const onTodoDragStart = (e, id, isCompleted) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ id, isCompleted }));
    };

    const onTodoDragOver = (e) => {
        e.preventDefault();
    };

    const onTodoDrop = (e, targetCompleted) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        const { id, isCompleted } = data;

        if (isCompleted !== targetCompleted) {
            if (isCompleted) {
                const [movedTodo] = completedTodos.filter((todo) => todo.id === id);
                setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
                setTodos((prevTodos) => [
                    ...prevTodos,
                    { ...movedTodo, completed: false },
                ]);
            } else {
                const [movedTodo] = todos.filter((todo) => todo.id === id);
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
                setCompletedTodos((prevCompleted) => [
                    ...prevCompleted,
                    { ...movedTodo, completed: true },
                ]);
            }
        }
    };

    const handleAddTodo = useCallback(
        (e) => {
            e.preventDefault();
            if (newTodoText.trim() !== "") {
                const newTodo = {
                    id: Date.now(),
                    text: newTodoText.trim(),
                    completed: false,
                };
                console.log("Adding new todo:", newTodo);
                setTodos((prevTodos) => {
                    const updatedTodos = [...prevTodos, newTodo];
                    console.log("Updated todos:", updatedTodos);
                    return updatedTodos;
                });
                setNewTodoText("");
            }
        },
        [newTodoText]
    );

    return (
        <div className="p-8 mb-4 flex md:flex-row flex-col gap-5 justify-center">
            <div
                className="w-full md:w-[50%] bg-gray-50 dark:bg-slate-800 p-3 rounded-md"
                onDragOver={onTodoDragOver}
                onDrop={(e) => onTodoDrop(e, false)}
            >
                <h4 className="text-xl font-semibold dark:text-[#abc2d3] text-gray-700 text-center mb-3">
                    Todo
                </h4>

                <form onSubmit={handleAddTodo} className="mb-4 w-full">
                    <div className="flex">
                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder="Add todo"
                            className="px-4 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-[#abc2d3] w-full outline-none border-l border-t border-b rounded-l-md focus:border-blue-300 border-gray-300 text-[0.9rem]"
                        />
                        <button
                            type="submit"
                            className="px-4 py-1 text-[0.9rem] bg-blue-500 text-white rounded-r-md"
                        >
                            Add
                        </button>
                    </div>
                </form>

                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={(e) => onTodoDragStart(e, todo.id, false)}
                            className="bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move"
                        >
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                className="w-full md:w-[50%] min-h-[120px] dark:bg-slate-800 bg-gray-50 p-3 rounded-md"
                onDragOver={onTodoDragOver}
                onDrop={(e) => onTodoDrop(e, true)}
            >
                <h4 className="text-xl font-semibold text-gray-700 dark:text-[#abc2d3] text-center mb-3">
                    Completed
                </h4>
                <ul className="space-y-2">
                    {completedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            draggable
                            onDragStart={(e) => onTodoDragStart(e, todo.id, true)}
                            className="bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move"
                        >
                            {todo.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoApp;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/animated-button'
                        backName='animated button'
                        forwardName='Comparison Card'
                        forwardUrl='/components/comparison-card'
                    />
                </div>

                <ContentNavbar contents={dragAndDropContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Surfaces - Drag & Drop</title>
            </Helmet>
        </>
    );
};

export default DragAndDrop;
