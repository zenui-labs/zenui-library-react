export const DragWithIndicatorCode = '\n' +
    'import React, {useState} from "react";\n' +
    '\n' +
    'const DragWithIndicator = () => {\n' +
    '\n' +
    '    const cardData = [\n' +
    '        {\n' +
    '            id: 1,\n' +
    '            image: "https://i.ibb.co.com/XxvZ2Kq/Logo.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 2,\n' +
    '            image: "https://i.ibb.co.com/HgvwbMy/Logo-1.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 3,\n' +
    '            image: "https://i.ibb.co.com/XS8kxJF/Logo-2.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 4,\n' +
    '            image: "https://i.ibb.co.com/2gLx39W/Logo-3.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 5,\n' +
    '            image: "https://i.ibb.co.com/DkDCXrk/Logo-4.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 6,\n' +
    '            image: "https://i.ibb.co.com/W0qf3ZP/Amazon.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 7,\n' +
    '            image: "https://i.ibb.co.com/fp0pFV5/Logo-5.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 8,\n' +
    '            image: "https://i.ibb.co.com/S3Z98YZ/Logo-6.png"\n' +
    '        },\n' +
    '        {\n' +
    '            id: 9,\n' +
    '            image: "https://i.ibb.co.com/0FwfDsz/Union.png"\n' +
    '        },\n' +
    '    ];\n' +
    '\n' +
    '    const [gridItems, setGridItems] = useState(cardData);\n' +
    '    const [draggedItem, setDraggedItem] = useState(null);\n' +
    '    const [hoveredItem, setHoveredItem] = useState(null);\n' +
    '\n' +
    '    // Handle drag start event\n' +
    '    const handleDragStart = (item) => {\n' +
    '        setDraggedItem(item);\n' +
    '    };\n' +
    '\n' +
    '    // Handle drag over event and show hover indicator\n' +
    '    const handleDragOver = (e, item) => {\n' +
    '        e.preventDefault();\n' +
    '        setHoveredItem(item);\n' +
    '    };\n' +
    '\n' +
    '    // Handle drop event and swap items\n' +
    '    const handleDrop = (e, dropItem) => {\n' +
    '        e.preventDefault();\n' +
    '\n' +
    '        // Swap dragged item with drop target\n' +
    '        const newGrid = gridItems.map((item) => {\n' +
    '            if (item.id === dropItem.id) {\n' +
    '                return draggedItem;\n' +
    '            }\n' +
    '            if (item.id === draggedItem.id) {\n' +
    '                return dropItem;\n' +
    '            }\n' +
    '            return item;\n' +
    '        });\n' +
    '\n' +
    '        setGridItems(newGrid);\n' +
    '        setDraggedItem(null);\n' +
    '        setHoveredItem(null);\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">\n' +
    '            {gridItems.map((item) => (\n' +
    '                <div\n' +
    '                    key={item.id}\n' +
    '                    draggable\n' +
    '                    onDragStart={() => handleDragStart(item)}\n' +
    '                    onDragOver={(e) => handleDragOver(e, item)}\n' +
    '                    onDrop={(e) => handleDrop(e, item)}\n' +
    '                    onDragLeave={() => setHoveredItem(null)}\n' +
    '                    className={`w-full px-8 py-4 border-2 dark:border-slate-500 rounded text-center cursor-move ${\n' +
    '                        item.id === draggedItem?.id && "bg-blue-100 opacity-30"\n' +
    '                    } ${\n' +
    '                        item.id === hoveredItem?.id ? "border-dashed border-2 dark:border-blue-500 border-blue-500" : "border-gray-100"\n' +
    '                    }`}\n' +
    '                >\n' +
    '                    <img alt="image" src={item.image}\n' +
    '                         className="w-[100px] sm:w-[140px] h-[50px] object-contain"/>\n' +
    '                </div>\n' +
    '            ))}\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default DragWithIndicator;'

export const UploadMultipleFilesWithDragDropCode = 'import React, {useState} from "react";\n' +
    '\n' +
    '// react icons\n' +
    'import {CiImageOn} from "react-icons/ci";\n' +
    'import {RxCross2} from "react-icons/rx";\n' +
    'import {IoMdDoneAll} from "react-icons/io";\n' +
    '\n' +
    'const UploadMultipleFilesWithDragDrop = () => {\n' +
    '    const [images, setImages] = useState([]);\n' +
    '    const [dragging, setDragging] = useState(false);\n' +
    '\n' +
    '    // Handle files when dropped or selected\n' +
    '    const handleFileDrop = (e) => {\n' +
    '        e.preventDefault();\n' +
    '        setDragging(false);\n' +
    '        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;\n' +
    '        uploadFiles(files);\n' +
    '        e.target.value = "";\n' +
    '    };\n' +
    '\n' +
    '    // Function to simulate file upload and track progress\n' +
    '    const uploadFiles = (files) => {\n' +
    '        const fileList = Array.from(files).map((file) => ({\n' +
    '            file,\n' +
    '            size: formatFileSize(file.size),\n' +
    '            progress: 0,\n' +
    '            uploaded: false,\n' +
    '            cancelled: false,\n' +
    '        }));\n' +
    '        setImages((prevImages) => [...prevImages, ...fileList]);\n' +
    '\n' +
    '        fileList.forEach((fileObj, index) => {\n' +
    '            simulateUpload(fileObj, index + images.length);\n' +
    '        });\n' +
    '    };\n' +
    '\n' +
    '    const formatFileSize = (sizeInBytes) => {\n' +
    '        if (sizeInBytes < 1024 * 1024) {\n' +
    '            // Show size in KB for files less than 1 MB\n' +
    '            return (sizeInBytes / 1024).toFixed(2) + " KB";\n' +
    '        } else {\n' +
    '            // Show size in MB for files 1 MB or larger\n' +
    '            return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    // Simulate upload progress\n' +
    '    const simulateUpload = (fileObj, index) => {\n' +
    '        const interval = setInterval(() => {\n' +
    '            setImages((prevImages) => {\n' +
    '                const newImages = [...prevImages];\n' +
    '                if (!newImages[index].cancelled) {\n' +
    '                    const progress = newImages[index].progress + 10;\n' +
    '                    if (progress >= 100) {\n' +
    '                        clearInterval(interval);\n' +
    '                        newImages[index].progress = 100;\n' +
    '                        newImages[index].uploaded = true;\n' +
    '                    } else {\n' +
    '                        newImages[index].progress = progress;\n' +
    '                    }\n' +
    '                } else {\n' +
    '                    clearInterval(interval);\n' +
    '                }\n' +
    '                return newImages;\n' +
    '            });\n' +
    '        }, 300); // Simulate upload progress every 300ms\n' +
    '    };\n' +
    '\n' +
    '    // Handle drag events\n' +
    '    const handleDragOver = (e) => {\n' +
    '        e.preventDefault();\n' +
    '    };\n' +
    '\n' +
    '    const handleDragEnter = () => {\n' +
    '        setDragging(true);\n' +
    '    };\n' +
    '\n' +
    '    const handleDragLeave = () => {\n' +
    '        setDragging(false);\n' +
    '    };\n' +
    '\n' +
    '    // Cancel the upload of a specific file\n' +
    '    const cancelUpload = (index) => {\n' +
    '        setImages((prevImages) => {\n' +
    '            const newImages = [...prevImages];\n' +
    '            newImages[index].cancelled = true;\n' +
    '            return newImages;\n' +
    '        });\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="p-8 mb-4 flex flex-col items-center gap-5 justify-center">\n' +
    '            <div className="flex flex-col justify-center items-center w-full">\n' +
    '                {/* Drop Zone */}\n' +
    '                <div\n' +
    '                    className={`border-2 p-6 rounded-lg dark:bg-slate-800 dark:border-slate-600 w-full h-64 flex flex-col justify-center items-center bg-white  ${\n' +
    '                        dragging\n' +
    '                            ? "border-dashed border-blue-400 !bg-blue-100"\n' +
    '                            : "border-gray-200 border-dashed"\n' +
    '                    } transition-colors duration-300 ease-in-out`}\n' +
    '                    onDrop={handleFileDrop}\n' +
    '                    onDragOver={handleDragOver}\n' +
    '                    onDragEnter={handleDragEnter}\n' +
    '                    onDragLeave={handleDragLeave}\n' +
    '                >\n' +
    '                    <img\n' +
    '                        src="https://i.ibb.co.com/XY2YgLh/Searching-for-files-in-a-folder.png"\n' +
    '                        className="w-[100px]"\n' +
    '                    />\n' +
    '                    <label\n' +
    '                        htmlFor="file-multiple-upload"\n' +
    '                        className="font-[500] dark:text-[#abc2d3] text-center text-gray-700 text-[1rem]"\n' +
    '                    >\n' +
    '                      <span className="underline cursor-pointer">\n' +
    '                        Click to upload{" "}\n' +
    '                      </span>\n' +
    '                        Drag & Drop your images here\n' +
    '                    </label>\n' +
    '                    <p className="text-[0.8rem] dark:text-[#abc2d3]/60 text-gray-500 mt-2">\n' +
    '                        Maximum file size 50 MB.\n' +
    '                    </p>\n' +
    '                    <input\n' +
    '                        id="file-multiple-upload"\n' +
    '                        type="file"\n' +
    '                        accept="image/*"\n' +
    '                        className="hidden"\n' +
    '                        onChange={handleFileDrop}\n' +
    '                        multiple\n' +
    '                    />\n' +
    '                </div>\n' +
    '\n' +
    '                {/* Images Uploading List */}\n' +
    '                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">\n' +
    '                    {images.map((imageObj, index) => (\n' +
    '                        <div\n' +
    '                            key={index}\n' +
    '                            className="relative p-3 rounded-lg dark:bg-slate-800 dark:border-slate-600 bg-gray-50 border border-gray-200"\n' +
    '                        >\n' +
    '                            <div className="flex flex-col">\n' +
    '                                <div className="flex items-start justify-between w-full mb-1">\n' +
    '                                    <div className="flex items-start gap-[10px]">\n' +
    '                                        <CiImageOn\n' +
    '                                            className="bg-white dark:bg-slate-900/80 dark:border-slate-600 rounded-md p-1 border border-gray-200 text-[1.7rem] text-gray-500"/>\n' +
    '                                        <div>\n' +
    '                                            <p className="text-gray-700 font-[500] text-[0.9rem] leading-[20px] 640px:leading-[9px] text-[#abc2d3] 640px:mt-0.5">\n' +
    '                                                {imageObj.file.name}\n' +
    '                                            </p>\n' +
    '                                            <span className="text-[0.6rem] text-gray-400">\n' +
    '                                  {imageObj.size}\n' +
    '                                </span>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    {!imageObj.cancelled && !imageObj.uploaded && (\n' +
    '                                        <button\n' +
    '                                            onClick={() => cancelUpload(index)}\n' +
    '                                            className="text-gray-500 hover:text-red-500"\n' +
    '                                        >\n' +
    '                                            <RxCross2/>\n' +
    '                                        </button>\n' +
    '                                    )}\n' +
    '\n' +
    '                                    {imageObj.uploaded && (\n' +
    '                                        <IoMdDoneAll className="text-green-600 text-[1.1rem]"/>\n' +
    '                                    )}\n' +
    '                                </div>\n' +
    '                                {imageObj.cancelled ? (\n' +
    '                                    <p className="text-[0.8rem] text-red-600">\n' +
    '                                        Upload Cancelled\n' +
    '                                    </p>\n' +
    '                                ) : (\n' +
    '                                    <>\n' +
    '                                        <div\n' +
    '                                            className="flex items-center justify-between gap-[8px]">\n' +
    '                                            <div\n' +
    '                                                className="w-full dark:bg-slate-800 bg-white h-1.5 rounded-lg overflow-hidden">\n' +
    '                                                <div\n' +
    '                                                    className="bg-blue-500 h-full transition-all duration-300"\n' +
    '                                                    style={{width: `${imageObj.progress}%`}}\n' +
    '                                                ></div>\n' +
    '                                            </div>\n' +
    '                                            <span\n' +
    '                                                className="text-[0.7rem] mb-0.5 dark:text-[#abc2d3] text-gray-500">\n' +
    '                                  {imageObj.progress}%\n' +
    '                                </span>\n' +
    '                                        </div>\n' +
    '                                    </>\n' +
    '                                )}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    ))}\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            {images?.length ? (\n' +
    '                <button\n' +
    '                    onClick={() => setImages([])}\n' +
    '                    className="py-2 px-6 bg-red-500 rounded-md text-white"\n' +
    '                >\n' +
    '                    Reset\n' +
    '                </button>\n' +
    '            ) : (\n' +
    '                ""\n' +
    '            )}\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default UploadMultipleFilesWithDragDrop;'

export const UploadImageWithDragDropCode = '\n' +
    'import React, {useState} from "react";\n' +
    '\n' +
    '// react icons\n' +
    'import {IoCloudUploadOutline} from "react-icons/io5";\n' +
    '\n' +
    'const DragToUpload = () => {\n' +
    '    const [selectedImage, setSelectedImage] = useState(null);\n' +
    '    const [errorMessage, setErrorMessage] = useState("");\n' +
    '    const [isDragging, setIsDragging] = useState(false);\n' +
    '\n' +
    '    // Handle file selection when dropped or clicked\n' +
    '    const handleFileDrop = (e) => {\n' +
    '        e.preventDefault();\n' +
    '        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];\n' +
    '        handleFile(file);\n' +
    '        setIsDragging(false);\n' +
    '    };\n' +
    '\n' +
    '    // Function to validate and display the image\n' +
    '    const handleFile = (file) => {\n' +
    '        if (!file) return;\n' +
    '\n' +
    '        if (file.type.startsWith("image/")) {\n' +
    '            setErrorMessage("");\n' +
    '            const reader = new FileReader();\n' +
    '            reader.onload = () => setSelectedImage(reader.result);\n' +
    '            reader.readAsDataURL(file);\n' +
    '        } else {\n' +
    '            setErrorMessage("Please upload an image file.");\n' +
    '            setSelectedImage(null);\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    // Handle drag over event to allow the drop\n' +
    '    const handleImageDragOver = (e) => {\n' +
    '        e.preventDefault();\n' +
    '    };\n' +
    '\n' +
    '    const handleDragEnter = () => {\n' +
    '        setIsDragging(true);\n' +
    '    };\n' +
    '\n' +
    '    const handleDragLeave = () => {\n' +
    '        setIsDragging(false);\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="flex justify-center items-center w-full flex-col">\n' +
    '            <div\n' +
    '                className={`${\n' +
    '                    isDragging\n' +
    '                        ? "border-blue-300 !bg-blue-50"\n' +
    '                        : "border-gray-300"\n' +
    '                } ${\n' +
    '                    selectedImage ? "" : "border-dashed border-2 p-6"\n' +
    '                } rounded-lg w-full h-64 flex flex-col dark:bg-slate-800 dark:border-slate-600 justify-center items-center bg-white`}\n' +
    '                onDragEnter={handleDragEnter}\n' +
    '                onDragLeave={handleDragLeave}\n' +
    '                onDrop={handleFileDrop}\n' +
    '                onDragOver={handleImageDragOver}\n' +
    '            >\n' +
    '                {selectedImage ? (\n' +
    '                    <img\n' +
    '                        src={selectedImage}\n' +
    '                        alt="Preview"\n' +
    '                        className="w-full h-full object-cover rounded-lg"\n' +
    '                    />\n' +
    '                ) : (\n' +
    '                    <>\n' +
    '                        {isDragging ? (\n' +
    '                            <h5 className="text-[2rem] text-blue-700 font-[600]">\n' +
    '                                Drop Here\n' +
    '                            </h5>\n' +
    '                        ) : (\n' +
    '                            <>\n' +
    '                                <IoCloudUploadOutline className="text-[3rem] mb-4 text-gray-400"/>\n' +
    '                                <p className="text-gray-500 text-center dark:text-[#abc2d3] text-[1.1rem] font-[500] mb-2">\n' +
    '                                    Drag & Drop your image here\n' +
    '                                </p>\n' +
    '                                <p className="text-gray-400">or</p>\n' +
    '                                <label\n' +
    '                                    htmlFor="file-upload"\n' +
    '                                    className="cursor-pointer dark:bg-slate-500 dark:text-[#abc2d3] py-2 px-4 bg-gray-200 rounded-md mt-2"\n' +
    '                                >\n' +
    '                                    Browse File\n' +
    '                                </label>\n' +
    '                                <input\n' +
    '                                    id="file-upload"\n' +
    '                                    type="file"\n' +
    '                                    accept="image/*"\n' +
    '                                    className="hidden"\n' +
    '                                    onChange={handleFileDrop}\n' +
    '                                />\n' +
    '                            </>\n' +
    '                        )}\n' +
    '                    </>\n' +
    '                )}\n' +
    '            </div>\n' +
    '\n' +
    '            {errorMessage && (\n' +
    '                <p className="text-red-500 mt-4">{errorMessage}</p>\n' +
    '            )}\n' +
    '\n' +
    '            {selectedImage && (\n' +
    '                <div className="mt-4">\n' +
    '                    <button\n' +
    '                        onClick={() => setSelectedImage(null)}\n' +
    '                        className="bg-red-500 text-white px-4 py-2 rounded-lg"\n' +
    '                    >\n' +
    '                        Remove Image\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '            )}\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default DragToUpload;'

export const ListDragDropCode = '\n' +
    'import React, {useState} from "react";\n' +
    '\n' +
    '// react icons\n' +
    'import {RiDraggable} from "react-icons/ri";\n' +
    '\n' +
    'const ListDragDrop = () => {\n' +
    '    // profile card drag and drop\n' +
    '    const listsData = [\n' +
    '        {\n' +
    '            id: 1,\n' +
    '            name: "John Doe",\n' +
    '            avatar: "https://randomuser.me/api/portraits/men/1.jpg",\n' +
    '            title: "Software Engineer",\n' +
    '        },\n' +
    '        {\n' +
    '            id: 2,\n' +
    '            name: "Jane Smith",\n' +
    '            avatar: "https://randomuser.me/api/portraits/women/2.jpg",\n' +
    '            title: "Product Manager",\n' +
    '        },\n' +
    '        {\n' +
    '            id: 3,\n' +
    '            name: "Michael Johnson",\n' +
    '            avatar: "https://randomuser.me/api/portraits/men/3.jpg",\n' +
    '            title: "UX Designer",\n' +
    '        },\n' +
    '        {\n' +
    '            id: 4,\n' +
    '            name: "Emily Davis",\n' +
    '            avatar: "https://randomuser.me/api/portraits/women/4.jpg",\n' +
    '            title: "Marketing Specialist",\n' +
    '        },\n' +
    '        {\n' +
    '            id: 5,\n' +
    '            name: "David Wilson",\n' +
    '            avatar: "https://randomuser.me/api/portraits/men/5.jpg",\n' +
    '            title: "Data Analyst",\n' +
    '        },\n' +
    '        {\n' +
    '            id: 6,\n' +
    '            name: "Sophia Brown",\n' +
    '            avatar: "https://randomuser.me/api/portraits/women/6.jpg",\n' +
    '            title: "Project Coordinator",\n' +
    '        },\n' +
    '    ];\n' +
    '\n' +
    '    const [listItems, setListItems] = useState(listsData);\n' +
    '    const [listDraggedItem, setListDraggedItem] = useState(null);\n' +
    '    const [listHoveredItem, setListHoveredItem] = useState(null);\n' +
    '\n' +
    '    // Handle drag start event from the icon\n' +
    '    const handleListDragStart = (item) => {\n' +
    '        setListDraggedItem(item);\n' +
    '    };\n' +
    '\n' +
    '    // Handle drag over event and show hover indicator\n' +
    '    const handleListDragOver = (e, item) => {\n' +
    '        e.preventDefault();\n' +
    '        setListHoveredItem(item);\n' +
    '    };\n' +
    '\n' +
    '    // Handle drop event and swap items\n' +
    '    const handleListDrop = (e, dropItem) => {\n' +
    '        e.preventDefault();\n' +
    '\n' +
    '        // Swap dragged item with drop target\n' +
    '        const newGrid = listItems.map((item) => {\n' +
    '            if (item.id === dropItem.id) {\n' +
    '                return listDraggedItem;\n' +
    '            }\n' +
    '            if (item.id === listDraggedItem.id) {\n' +
    '                return dropItem;\n' +
    '            }\n' +
    '            return item;\n' +
    '        });\n' +
    '\n' +
    '        setListItems(newGrid);\n' +
    '        setListDraggedItem(null);\n' +
    '        setListHoveredItem(null);\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="flex flex-col w-full gap-4">\n' +
    '            {listItems.map((item) => (\n' +
    '                <div\n' +
    '                    key={item.id}\n' +
    '                    draggable\n' +
    '                    onDragStart={() => handleListDragStart(item)}\n' +
    '                    onDragOver={(e) => handleListDragOver(e, item)}\n' +
    '                    onDrop={(e) => handleListDrop(e, item)}\n' +
    '                    onDragLeave={() => setListHoveredItem(null)}\n' +
    '                    className={`grid-item p-4 border-2 dark:border-slate-600 rounded text-center flex items-center justify-between ${\n' +
    '                        item.id === listDraggedItem?.id &&\n' +
    '                        "bg-blue-100 opacity-30"\n' +
    '                    } ${\n' +
    '                        item.id === listHoveredItem?.id\n' +
    '                            ? "border-dashed dark:border-[#3B9DF8] border-2 border-blue-500"\n' +
    '                            : "border-gray-100"\n' +
    '                    }`}\n' +
    '                >\n' +
    '                    <div className="flex items-center gap-[8px] smgap-[15px]">\n' +
    '                        <img\n' +
    '                            alt="image"\n' +
    '                            src={item.avatar}\n' +
    '                            className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-md object-contain"\n' +
    '                        />\n' +
    '\n' +
    '                        <div className="text-left flex flex-col sm:gap-[5px]">\n' +
    '                            <h4 className="text-[1rem] dark:text-[#abc2d3] sm:text-[1.3rem] text-gray-700 font-[600]">\n' +
    '                                {item.name}\n' +
    '                            </h4>\n' +
    '                            <p className="text-[0.7rem] dark:text-[#abc2d3]/70 sm:text-[0.9rem] text-gray-500">\n' +
    '                                {item.title}\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <RiDraggable\n' +
    '                        className="text-[1.5rem] dark:text-[#abc2d3]/70 sm:text-[1.8rem] text-gray-600 cursor-move"/>\n' +
    '                </div>\n' +
    '            ))}\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default ListDragDrop;'

export const TodoAppDragDropCode = '\n' +
    'import React, {useCallback, useState} from "react";\n' +
    '\n' +
    'const TodoApp = () => {\n' +
    '    const [todos, setTodos] = useState([\n' +
    '        { id: 1, text: "Fix website bug", completed: false },\n' +
    '        { id: 2, text: "Prepare for meeting", completed: false },\n' +
    '        { id: 3, text: "Send email updates", completed: false },\n' +
    '    ]);\n' +
    '\n' +
    '    const [completedTodos, setCompletedTodos] = useState([]);\n' +
    '    const [newTodoText, setNewTodoText] = useState("");\n' +
    '\n' +
    '    const onTodoDragStart = (e, id, isCompleted) => {\n' +
    '        e.dataTransfer.setData("text/plain", JSON.stringify({ id, isCompleted }));\n' +
    '    };\n' +
    '\n' +
    '    const onTodoDragOver = (e) => {\n' +
    '        e.preventDefault();\n' +
    '    };\n' +
    '\n' +
    '    const onTodoDrop = (e, targetCompleted) => {\n' +
    '        e.preventDefault();\n' +
    '        const data = JSON.parse(e.dataTransfer.getData("text/plain"));\n' +
    '        const { id, isCompleted } = data;\n' +
    '\n' +
    '        if (isCompleted !== targetCompleted) {\n' +
    '            if (isCompleted) {\n' +
    '                const [movedTodo] = completedTodos.filter((todo) => todo.id === id);\n' +
    '                setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));\n' +
    '                setTodos((prevTodos) => [\n' +
    '                    ...prevTodos,\n' +
    '                    { ...movedTodo, completed: false },\n' +
    '                ]);\n' +
    '            } else {\n' +
    '                const [movedTodo] = todos.filter((todo) => todo.id === id);\n' +
    '                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));\n' +
    '                setCompletedTodos((prevCompleted) => [\n' +
    '                    ...prevCompleted,\n' +
    '                    { ...movedTodo, completed: true },\n' +
    '                ]);\n' +
    '            }\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleAddTodo = useCallback(\n' +
    '        (e) => {\n' +
    '            e.preventDefault();\n' +
    '            if (newTodoText.trim() !== "") {\n' +
    '                const newTodo = {\n' +
    '                    id: Date.now(),\n' +
    '                    text: newTodoText.trim(),\n' +
    '                    completed: false,\n' +
    '                };\n' +
    '                console.log("Adding new todo:", newTodo);\n' +
    '                setTodos((prevTodos) => {\n' +
    '                    const updatedTodos = [...prevTodos, newTodo];\n' +
    '                    console.log("Updated todos:", updatedTodos);\n' +
    '                    return updatedTodos;\n' +
    '                });\n' +
    '                setNewTodoText("");\n' +
    '            }\n' +
    '        },\n' +
    '        [newTodoText]\n' +
    '    );\n' +
    '\n' +
    '    return (\n' +
    '        <div className="p-8 mb-4 flex md:flex-row flex-col gap-5 justify-center">\n' +
    '            <div\n' +
    '                className="w-full md:w-[50%] bg-gray-50 dark:bg-slate-800 p-3 rounded-md"\n' +
    '                onDragOver={onTodoDragOver}\n' +
    '                onDrop={(e) => onTodoDrop(e, false)}\n' +
    '            >\n' +
    '                <h4 className="text-xl font-semibold dark:text-[#abc2d3] text-gray-700 text-center mb-3">\n' +
    '                    Todo\n' +
    '                </h4>\n' +
    '\n' +
    '                <form onSubmit={handleAddTodo} className="mb-4 w-full">\n' +
    '                    <div className="flex">\n' +
    '                        <input\n' +
    '                            type="text"\n' +
    '                            value={newTodoText}\n' +
    '                            onChange={(e) => setNewTodoText(e.target.value)}\n' +
    '                            placeholder="Add todo"\n' +
    '                            className="px-4 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-[#abc2d3] w-full outline-none border-l border-t border-b rounded-l-md focus:border-blue-300 border-gray-300 text-[0.9rem]"\n' +
    '                        />\n' +
    '                        <button\n' +
    '                            type="submit"\n' +
    '                            className="px-4 py-1 text-[0.9rem] bg-blue-500 text-white rounded-r-md"\n' +
    '                        >\n' +
    '                            Add\n' +
    '                        </button>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '\n' +
    '                <ul className="space-y-2">\n' +
    '                    {todos.map((todo) => (\n' +
    '                        <li\n' +
    '                            key={todo.id}\n' +
    '                            draggable\n' +
    '                            onDragStart={(e) => onTodoDragStart(e, todo.id, false)}\n' +
    '                            className="bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move"\n' +
    '                        >\n' +
    '                            {todo.text}\n' +
    '                        </li>\n' +
    '                    ))}\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '\n' +
    '            <div\n' +
    '                className="w-full md:w-[50%] min-h-[120px] dark:bg-slate-800 bg-gray-50 p-3 rounded-md"\n' +
    '                onDragOver={onTodoDragOver}\n' +
    '                onDrop={(e) => onTodoDrop(e, true)}\n' +
    '            >\n' +
    '                <h4 className="text-xl font-semibold text-gray-700 dark:text-[#abc2d3] text-center mb-3">\n' +
    '                    Completed\n' +
    '                </h4>\n' +
    '                <ul className="space-y-2">\n' +
    '                    {completedTodos.map((todo) => (\n' +
    '                        <li\n' +
    '                            key={todo.id}\n' +
    '                            draggable\n' +
    '                            onDragStart={(e) => onTodoDragStart(e, todo.id, true)}\n' +
    '                            className="bg-white p-2 dark:bg-slate-700 dark:text-[#abc2d3] rounded-md cursor-move"\n' +
    '                        >\n' +
    '                            {todo.text}\n' +
    '                        </li>\n' +
    '                    ))}\n' +
    '                </ul>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default TodoApp;'