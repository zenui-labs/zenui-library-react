import React, {useState} from 'react';
import {IoIosImages} from "react-icons/io";
import Modal from "./Modal.jsx";
import {IoRefresh} from "react-icons/io5";

const Index = () => {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click()
    }

    return (
        <div
            className='p-10 relative'
        >

            <IoRefresh onClick={() => setCroppedImage('')}
                       className='absolute top-2 right-2 dark:bg-slate-800 dark:text-darkSubTextColor bg-gray-200 hover:rotate-[60deg] transition-all duration-300 p-1 text-[1.6rem] cursor-pointer rounded-full'/>

            {croppedImage ? (
                <div className="mt-4">
                    <img
                        src={croppedImage}
                        alt="Cropped"
                        className="max-w-full mx-auto rounded"
                    />
                </div>
            ) : (
                <>
                    <div
                        className="w-full flex items-center justify-center dark:border-slate-700 dark:bg-slate-900 flex-col bg-white border-[2px] px-4 400px:px-0 border-dashed border-gray-300 rounded-md py-6 ">

                        <IoIosImages className="text-[3rem] dark:text-darkSubTextColor text-gray-400"/>

                        <p className="mt-4 dark:text-darkTextColor text-black font-[500] text-center 1024px:text-start leading-[30px]">Choose a file or Drag and drop it here</p>

                        <p className="text-gray-400 dark:text-slate-400 font-[300] text-center 1024px:text-start text-[0.8rem]">JPG, PNG, JPEG formats, maximum size
                            300x200 pixels</p>

                        <input
                            id='fileInput'
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/*"
                            className="hidden"
                        />

                        <button
                            className="border border-gray-300 dark:border-slate-700 dark:text-darkSubTextColor dark:hover:bg-slate-800 text-[0.95rem] font-[500] text-gray-700 py-1 px-4 mt-6 rounded-md hover:bg-gray-50"
                            onClick={handleUploadClick}
                        >
                            Browse File
                        </button>

                    </div>
                </>
            )
            }

            <Modal image={image} setImage={setImage} setCroppedImage={setCroppedImage}/>
        </div>
    )
        ;
};

export default Index;