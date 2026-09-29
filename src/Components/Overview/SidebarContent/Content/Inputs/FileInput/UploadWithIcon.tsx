import React, {useState} from "react";

// react icons
import {FiUpload} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

const UploadWithIcon = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("image")?.click();
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
                id="image"
                className="hidden"
                onChange={handleFileChange}
            />
            {image === "" ? (
                <div
                    className="w-full 1024px:w-[90%] flex items-center dark:border-slate-600 justify-center flex-col gap-4 border-border border rounded-md py-6 cursor-pointer"
                    onClick={handleUploadImage}
                >
                    <FiUpload className="text-[2rem] text-[#777777] dark:text-[#abc2d3]"/>
                    <p className="text-[#777777] dark:text-[#abc2d3]">Browse to upload you file</p>
                </div>
            ) : (
                <div className="relative w-full 1024px:w-[80%] h-[300px]">
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

export default UploadWithIcon;
