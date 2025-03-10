import React, { useState } from 'react';

// react helmet
import { Helmet } from 'react-helmet';

// components
import ContentHeader from '../../../../../../Shared/ContentHeader';
import OverviewFooter from '../../../../../../Shared/OverviewFooter';
import Showcode from '../../../../../../Shared/Component/ShowCode.jsx';

// contents for scrollspy
import {ImageCropperContents} from '../../../../../../Utils/ContentsConfig/SurfacesContents';
import { useScrollSpy } from '../../../../../../CustomHooks/useScrollSpy';

import ComponentDescription from "../../../../../../Shared/Component/ComponentDescription.jsx";
import ToggleTab from "../../../../../../Shared/Component/ToggleTab.jsx";
import ComponentWrapper from "../../../../../../Shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "../../../../../../Shared/Component/ContentNavbar.jsx";
import CropImageInModal from "./CropImageInModal/Index.jsx"

const Appbar = () => {
    const [basicAppPreview, setBasicAppPreview] = useState(true);
    const [basicAppCode, setBasicAppCode] = useState(false);

    const sectionIds = ImageCropperContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const cropImageInModalCodes = [
        {
            id: "mainComponent",
            displayText: "ImageCropper.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {IoIosImages} from "react-icons/io";\n' +
                'import {IoRefresh} from "react-icons/io5";\n' +
                '\n' +
                '// import modal \n' +
                'import Modal from "./Modal.jsx";\n' +
                '\n' +
                'const ImageCropper = () => {\n' +
                '    const [image, setImage] = useState(null);\n' +
                '    const [croppedImage, setCroppedImage] = useState(null);\n' +
                '\n' +
                '    const handleFileUpload = (e) => {\n' +
                '        const file = e.target.files[0];\n' +
                '        const reader = new FileReader();\n' +
                '        reader.onload = (event) => {\n' +
                '            setImage(event.target.result);\n' +
                '        };\n' +
                '        reader.readAsDataURL(file);\n' +
                '    };\n' +
                '\n' +
                '    const handleUploadClick = () => {\n' +
                '        document.getElementById("fileInput").click()\n' +
                '    }\n' +
                '\n' +
                '    return (\n' +
                '        <div\n' +
                '            className="p-10 relative"\n' +
                '        >\n' +
                '\n' +
                '            <IoRefresh onClick={() => setCroppedImage("")}\n' +
                '                       className="absolute top-2 right-2 dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-200 hover:rotate-[60deg] transition-all duration-300 p-1 text-[1.6rem] cursor-pointer rounded-full"/>\n' +
                '\n' +
                '            {croppedImage ? (\n' +
                '                <div className="mt-4">\n' +
                '                    <img\n' +
                '                        src={croppedImage}\n' +
                '                        alt="Cropped"\n' +
                '                        className="max-w-full mx-auto rounded"\n' +
                '                    />\n' +
                '                </div>\n' +
                '            ) : (\n' +
                '                <>\n' +
                '                    <div\n' +
                '                        className="w-full flex items-center justify-center dark:border-slate-700 dark:bg-slate-900 flex-col bg-white border-[2px] px-4 sm:px-0 border-dashed border-gray-300 rounded-md py-6 ">\n' +
                '\n' +
                '                        <IoIosImages className="text-[3rem] dark:text-[#abc2d3] text-gray-400"/>\n' +
                '\n' +
                '                        <p className="mt-4 dark:text-[#d2e5f5] text-center md:text-start text-black font-[500] leading-[30px]">Choose a file or Drag and drop it here</p>\n' +
                '\n' +
                '                        <p className="text-gray-400 text-center md:text-start dark:text-slate-400 font-[300] text-[0.8rem]">JPG, PNG, JPEG formats, maximum size\n' +
                '                            300x200 pixels</p>\n' +
                '\n' +
                '                        <input\n' +
                '                            id="fileInput"\n' +
                '                            type="file"\n' +
                '                            onChange={handleFileUpload}\n' +
                '                            accept="image/*"\n' +
                '                            className="hidden"\n' +
                '                        />\n' +
                '\n' +
                '                        <button\n' +
                '                            className="border border-gray-300 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 text-[0.95rem] font-[500] text-gray-700 py-1 px-4 mt-6 rounded-md hover:bg-gray-50"\n' +
                '                            onClick={handleUploadClick}\n' +
                '                        >\n' +
                '                            Browse File\n' +
                '                        </button>\n' +
                '\n' +
                '                    </div>\n' +
                '                </>\n' +
                '            )\n' +
                '            }\n' +
                '\n' +
                '            <Modal image={image} setImage={setImage} setCroppedImage={setCroppedImage}/>\n' +
                '        </div>\n' +
                '    )\n' +
                '        ;\n' +
                '};\n' +
                '\n' +
                'export default ImageCropper;'
        },
        {
            id: "modal",
            displayText: "Modal.jsx",
            language: "jsx",
            code: 'import React, {useRef, useState, useEffect} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {RxCross1} from "react-icons/rx";\n' +
                '\n' +
                'const Modal = ({image, setImage, setCroppedImage}) => {\n' +
                '    const [cropArea, setCropArea] = useState({\n' +
                '        x: 0,\n' +
                '        y: 0,\n' +
                '        width: 400,\n' +
                '        height: 200\n' +
                '    });\n' +
                '    const [isMoving, setIsMoving] = useState(false);\n' +
                '    const [isResizing, setIsResizing] = useState(false);\n' +
                '    const [offset, setOffset] = useState({x: 0, y: 0});\n' +
                '    const imageRef = useRef(null);\n' +
                '    const cropperRef = useRef(null);\n' +
                '\n' +
                '    // Initialize crop area when image loads\n' +
                '    useEffect(() => {\n' +
                '        if (image && imageRef.current) {\n' +
                '            // Wait for image to load\n' +
                '            const handleImageLoad = () => {\n' +
                '                const imgWidth = imageRef.current.clientWidth;\n' +
                '                const imgHeight = imageRef.current.clientHeight;\n' +
                '\n' +
                '                // Set initial crop area to center of the image\n' +
                '                const cropWidth = Math.min(300, imgWidth * 0.8);\n' +
                '                const cropHeight = Math.min(200, imgHeight * 0.8);\n' +
                '\n' +
                '                setCropArea({\n' +
                '                    x: (imgWidth - cropWidth) / 2,\n' +
                '                    y: (imgHeight - cropHeight) / 2,\n' +
                '                    width: cropWidth,\n' +
                '                    height: cropHeight\n' +
                '                });\n' +
                '            };\n' +
                '\n' +
                '            // If image is already loaded\n' +
                '            if (imageRef.current.complete) {\n' +
                '                handleImageLoad();\n' +
                '            } else {\n' +
                '                // Wait for image to load\n' +
                '                imageRef.current.addEventListener("load", handleImageLoad);\n' +
                '                return () => {\n' +
                '                    if (imageRef.current) {\n' +
                '                        imageRef.current.removeEventListener("load", handleImageLoad);\n' +
                '                    }\n' +
                '                };\n' +
                '            }\n' +
                '        }\n' +
                '    }, [image]);\n' +
                '\n' +
                '    const startMove = (e) => {\n' +
                '        if (!cropperRef.current) return;\n' +
                '        const rect = cropperRef.current.getBoundingClientRect();\n' +
                '        const offsetX = e.clientX - rect.left - cropArea.x;\n' +
                '        const offsetY = e.clientY - rect.top - cropArea.y;\n' +
                '        setOffset({x: offsetX, y: offsetY});\n' +
                '        setIsMoving(true);\n' +
                '    };\n' +
                '\n' +
                '    const cropImage = () => {\n' +
                '        if (!imageRef.current) return;\n' +
                '\n' +
                '        const canvas = document.createElement("canvas");\n' +
                '        canvas.width = cropArea.width;\n' +
                '        canvas.height = cropArea.height;\n' +
                '        const ctx = canvas.getContext("2d");\n' +
                '\n' +
                '        const imageElement = imageRef.current;\n' +
                '        const scaleX = imageElement.naturalWidth / imageElement.clientWidth;\n' +
                '        const scaleY = imageElement.naturalHeight / imageElement.clientHeight;\n' +
                '\n' +
                '        ctx.drawImage(\n' +
                '            imageElement,\n' +
                '            cropArea.x * scaleX,\n' +
                '            cropArea.y * scaleY,\n' +
                '            cropArea.width * scaleX,\n' +
                '            cropArea.height * scaleY,\n' +
                '            0,\n' +
                '            0,\n' +
                '            cropArea.width,\n' +
                '            cropArea.height\n' +
                '        );\n' +
                '\n' +
                '        setCroppedImage(canvas.toDataURL());\n' +
                '        return canvas.toDataURL();\n' +
                '    };\n' +
                '\n' +
                '    const stopInteraction = () => {\n' +
                '        setIsMoving(false);\n' +
                '        setIsResizing(false);\n' +
                '    };\n' +
                '\n' +
                '    const handleMouseMove = (e) => {\n' +
                '        if (isMoving && imageRef.current) {\n' +
                '            const rect = cropperRef.current.getBoundingClientRect();\n' +
                '            const newX = e.clientX - rect.left - offset.x;\n' +
                '            const newY = e.clientY - rect.top - offset.y;\n' +
                '\n' +
                '            // Boundary checks\n' +
                '            const maxX = imageRef.current.clientWidth - cropArea.width;\n' +
                '            const maxY = imageRef.current.clientHeight - cropArea.height;\n' +
                '\n' +
                '            setCropArea(prev => ({\n' +
                '                ...prev,\n' +
                '                x: Math.max(0, Math.min(newX, maxX)),\n' +
                '                y: Math.max(0, Math.min(newY, maxY))\n' +
                '            }));\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '    const handleResize = (e) => {\n' +
                '        if (isResizing && imageRef.current) {\n' +
                '            const rect = cropperRef.current.getBoundingClientRect();\n' +
                '            const newWidth = e.clientX - rect.left - cropArea.x;\n' +
                '            const newHeight = e.clientY - rect.top - cropArea.y;\n' +
                '\n' +
                '            // Boundary checks and minimum size\n' +
                '            const maxWidth = imageRef.current.clientWidth - cropArea.x;\n' +
                '            const maxHeight = imageRef.current.clientHeight - cropArea.y;\n' +
                '\n' +
                '            setCropArea(prev => ({\n' +
                '                ...prev,\n' +
                '                width: Math.max(50, Math.min(newWidth, maxWidth)),\n' +
                '                height: Math.max(50, Math.min(newHeight, maxHeight))\n' +
                '            }));\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '    const saveAndClose = () => {\n' +
                '        const result = cropImage();\n' +
                '        setCroppedImage(result)\n' +
                '        setImage("");\n' +
                '    };\n' +
                '\n' +
                '    return (\n' +
                '        <div\n' +
                '            className={`${\n' +
                '                image ? " visible" : " invisible"\n' +
                '            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] dark:bg-black/70 flex items-center justify-center transition-all duration-300`}\n' +
                '        >\n' +
                '            <div\n' +
                '                className={`${\n' +
                '                    image\n' +
                '                        ? " scale-[1] opacity-100"\n' +
                '                        : " scale-[0] opacity-0"\n' +
                '                } w-[90%] sm:w-[80%] md:w-[60%] dark:bg-slate-900 max-h-[80vh] bg-[#fff] rounded-lg p-4 transition-all duration-300 flex flex-col`}\n' +
                '            >\n' +
                '                <div className="w-full flex items-center justify-between">\n' +
                '                    <h4 className="text-[20px] font-[600] dark:text-[#d2e5f5] text-gray-800">Crop Image</h4>\n' +
                '                    <RxCross1\n' +
                '                        className="p-2 text-[2.3rem] dark:hover:bg-slate-800 dark:text-[#d2e5f5]/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"\n' +
                '                        onClick={()=> setImage("")}\n' +
                '                    />\n' +
                '                </div>\n' +
                '\n' +
                '                <div className="flex-grow flex items-center justify-center mt-4 max-h-[calc(80vh-120px)] overflow-hidden">\n' +
                '                    <div\n' +
                '                        ref={cropperRef}\n' +
                '                        onMouseMove={isMoving ? handleMouseMove : isResizing ? handleResize : undefined}\n' +
                '                        onMouseUp={stopInteraction}\n' +
                '                        onMouseLeave={stopInteraction}\n' +
                '                        className="relative rounded-md overflow-hidden"\n' +
                '                        style={{ maxWidth: "100%", maxHeight: "100%" }}\n' +
                '                    >\n' +
                '                        {image && (\n' +
                '                            <>\n' +
                '                                <img\n' +
                '                                    ref={imageRef}\n' +
                '                                    src={image}\n' +
                '                                    alt="Upload"\n' +
                '                                    className="max-h-[calc(80vh-160px)] max-w-full object-contain rounded-md"\n' +
                '                                />\n' +
                '                                <div\n' +
                '                                    className="absolute border-2 border-[#0FABCA]"\n' +
                '                                    style={{\n' +
                '                                        left: cropArea.x,\n' +
                '                                        top: cropArea.y,\n' +
                '                                        width: cropArea.width,\n' +
                '                                        height: cropArea.height,\n' +
                '                                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",\n' +
                '                                        cursor: "move"\n' +
                '                                    }}\n' +
                '                                    onMouseDown={startMove}\n' +
                '                                >\n' +
                '                                    <div\n' +
                '                                        className="absolute select-none inset-0 bg-white bg-opacity-20 flex items-center justify-center text-gray-800 text-sm">\n' +
                '                                        Crop Area\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </>\n' +
                '                        )}\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                <div className="flex justify-end gap-2 mt-10">\n' +
                '                    <button\n' +
                '                        className="px-4 py-2 dark:bg-slate-800 dark:text-[#abc2d3] dark:hover:bg-slate-800/80 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"\n' +
                '                        onClick={() => setImage("")}\n' +
                '                    >\n' +
                '                        Cancel\n' +
                '                    </button>\n' +
                '                    <button\n' +
                '                        className="px-4 py-2 bg-[#0FABCA] text-white rounded hover:bg-[#0FABCA]/90 transition-colors"\n' +
                '                        onClick={saveAndClose}\n' +
                '                    >\n' +
                '                        Crop & Save\n' +
                '                    </button>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default Modal;'
        }
    ]

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader
                        id='crop-image-in-modal'
                        text={'crop image in modal'}
                    />

                    <ComponentDescription text='Crop images easily in a modal popup, allowing quick resizing and adjustments before saving.'/>

                    <ToggleTab code={basicAppCode} preview={basicAppPreview} setCode={setBasicAppCode} setPreview={setBasicAppPreview}/>

                    <ComponentWrapper>
                        {basicAppPreview && (
                            <CropImageInModal/>
                        )}

                        {basicAppCode && (
                            <Showcode
                                code={cropImageInModalCodes}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/animated-cards'
                        backName='animated cards'
                        forwardName='accordion'
                        forwardUrl='/components/according'
                    />
                </div>

                <ContentNavbar contents={ImageCropperContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Surfaces - App Bar</title>
            </Helmet>
        </>
    );
};

export default Appbar;
