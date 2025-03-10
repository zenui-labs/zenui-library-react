import React, {useRef, useState, useEffect} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = ({image, setImage, setCroppedImage}) => {
    const [cropArea, setCropArea] = useState({
        x: 0,
        y: 0,
        width: 400,
        height: 200
    });
    const [isMoving, setIsMoving] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const imageRef = useRef(null);
    const cropperRef = useRef(null);

    // Initialize crop area when image loads
    useEffect(() => {
        if (image && imageRef.current) {
            // Wait for image to load
            const handleImageLoad = () => {
                const imgWidth = imageRef.current.clientWidth;
                const imgHeight = imageRef.current.clientHeight;

                // Set initial crop area to center of the image
                const cropWidth = Math.min(300, imgWidth * 0.8);
                const cropHeight = Math.min(200, imgHeight * 0.8);

                setCropArea({
                    x: (imgWidth - cropWidth) / 2,
                    y: (imgHeight - cropHeight) / 2,
                    width: cropWidth,
                    height: cropHeight
                });
            };

            // If image is already loaded
            if (imageRef.current.complete) {
                handleImageLoad();
            } else {
                // Wait for image to load
                imageRef.current.addEventListener('load', handleImageLoad);
                return () => {
                    if (imageRef.current) {
                        imageRef.current.removeEventListener('load', handleImageLoad);
                    }
                };
            }
        }
    }, [image]);

    const startMove = (e) => {
        if (!cropperRef.current) return;
        const rect = cropperRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - cropArea.x;
        const offsetY = e.clientY - rect.top - cropArea.y;
        setOffset({x: offsetX, y: offsetY});
        setIsMoving(true);
    };

    const cropImage = () => {
        if (!imageRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        const ctx = canvas.getContext('2d');

        const imageElement = imageRef.current;
        const scaleX = imageElement.naturalWidth / imageElement.clientWidth;
        const scaleY = imageElement.naturalHeight / imageElement.clientHeight;

        ctx.drawImage(
            imageElement,
            cropArea.x * scaleX,
            cropArea.y * scaleY,
            cropArea.width * scaleX,
            cropArea.height * scaleY,
            0,
            0,
            cropArea.width,
            cropArea.height
        );

        setCroppedImage(canvas.toDataURL());
        return canvas.toDataURL();
    };

    const stopInteraction = () => {
        setIsMoving(false);
        setIsResizing(false);
    };

    const handleMouseMove = (e) => {
        if (isMoving && imageRef.current) {
            const rect = cropperRef.current.getBoundingClientRect();
            const newX = e.clientX - rect.left - offset.x;
            const newY = e.clientY - rect.top - offset.y;

            // Boundary checks
            const maxX = imageRef.current.clientWidth - cropArea.width;
            const maxY = imageRef.current.clientHeight - cropArea.height;

            setCropArea(prev => ({
                ...prev,
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            }));
        }
    };

    const handleResize = (e) => {
        if (isResizing && imageRef.current) {
            const rect = cropperRef.current.getBoundingClientRect();
            const newWidth = e.clientX - rect.left - cropArea.x;
            const newHeight = e.clientY - rect.top - cropArea.y;

            // Boundary checks and minimum size
            const maxWidth = imageRef.current.clientWidth - cropArea.x;
            const maxHeight = imageRef.current.clientHeight - cropArea.y;

            setCropArea(prev => ({
                ...prev,
                width: Math.max(50, Math.min(newWidth, maxWidth)),
                height: Math.max(50, Math.min(newHeight, maxHeight))
            }));
        }
    };

    const saveAndClose = () => {
        const result = cropImage();
        setCroppedImage(result)
        setImage('');
    };

    return (
        <div
            className={`${
                image ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] dark:bg-black/70 flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`${
                    image
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] 400px:w-[80%] 1024px:w-[60%] dark:bg-slate-900 max-h-[80vh] bg-[#fff] rounded-lg p-4 transition-all duration-300 flex flex-col`}
            >
                <div className="w-full flex items-center justify-between">
                    <h4 className='text-[20px] font-[600] dark:text-darkTextColor text-gray-800'>Crop Image</h4>
                    <RxCross1
                        className="p-2 text-[2.3rem] dark:hover:bg-slate-800 dark:text-darkTextColor/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={()=> setImage('')}
                    />
                </div>

                <div className="flex-grow flex items-center justify-center mt-4 max-h-[calc(80vh-120px)] overflow-hidden">
                    <div
                        ref={cropperRef}
                        onMouseMove={isMoving ? handleMouseMove : isResizing ? handleResize : undefined}
                        onMouseUp={stopInteraction}
                        onMouseLeave={stopInteraction}
                        className="relative rounded-md overflow-hidden"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    >
                        {image && (
                            <>
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Upload"
                                    className="max-h-[calc(80vh-160px)] max-w-full object-contain rounded-md"
                                />
                                <div
                                    className="absolute border-2 border-[#0FABCA]"
                                    style={{
                                        left: cropArea.x,
                                        top: cropArea.y,
                                        width: cropArea.width,
                                        height: cropArea.height,
                                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                                        cursor: 'move'
                                    }}
                                    onMouseDown={startMove}
                                >
                                    <div
                                        className="absolute select-none inset-0 bg-white bg-opacity-20 flex items-center justify-center text-gray-800 text-sm">
                                        Crop Area
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-10">
                    <button
                        className="px-4 py-2 dark:bg-slate-800 dark:text-darkSubTextColor dark:hover:bg-slate-800/80 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        onClick={() => setImage('')}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-[#0FABCA] text-white rounded hover:bg-[#0FABCA]/90 transition-colors"
                        onClick={saveAndClose}
                    >
                        Crop & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;