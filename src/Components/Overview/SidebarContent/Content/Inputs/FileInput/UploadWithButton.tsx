import React, {useState} from "react";

// react icons
import {IoMdCloudUpload} from "react-icons/io";
import {MdDelete} from "react-icons/md";

const UploadWithButton = () => {
    const [image, setImage] = useState("");

    const handleImageUpload = () => {
        document.getElementById("secondImage")?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <input
                type="file"
                name="image"
                id="secondImage"
                className="hidden"
                onChange={handleFileChange}
            />
            {image === "" ? (
                <div
                    className="w-full 1024px:w-[90%] flex dark:border-slate-700 dark:bg-slate-900 items-center justify-center flex-col bg-white border border-dashed border-primary rounded-md py-6 ">
                    <IoMdCloudUpload className="text-[3rem] text-primary"/>
                    <p className="mt-2 text-text dark:text-[#abc2d3]">Drag and drop here</p>
                    <p className=" text-text dark:text-[#abc2d3]">or</p>

                    <button
                        className="px-6 py-1.5 text-primary"
                        onClick={handleImageUpload}
                    >
                        Browse
                    </button>
                </div>
            ) : (
                <div className="relative w-full 1024px:w-[80%] h-[200px]">
                    <img
                        src={image}
                        alt="image"
                        className="w-full h-full object-cover"
                    />
                    <MdDelete
                        className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                        onClick={() => setImage("")}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadWithButton;
