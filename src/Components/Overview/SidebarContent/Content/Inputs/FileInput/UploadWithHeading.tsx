import React, {useState} from "react";

// react icons
import {PiFilesThin} from "react-icons/pi";
import {MdDelete} from "react-icons/md";

const UploadWithHeading = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("thridImage")?.click();
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
            {image === "" ? (
                <div className="text-center w-full 1024px:w-[90%]">
                    <input
                        type="file"
                        name="image"
                        id="thridImage"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <h1 className="text-[1.5rem] dark:text-[#abc2d3] text-text font-[600]">
                        Upload your files
                    </h1>
                    <p className="text-[#777777] dark:text-[#abc2d3]/80 font-[400] text-[1rem]">
                        JPG,PNG,JPEG
                    </p>

                    <div
                        className="mt-5 w-full 1024px:w-[70%] mx-auto dark:border-slate-700 dark:bg-slate-900 flex items-center justify-center flex-col bg-white border-[2px] border-dashed border-primary rounded-md py-10 cursor-pointer"
                        onClick={handleUploadImage}
                    >
                        <PiFilesThin className="text-[4rem] text-text dark:text-[#abc2d3]/70"/>
                    </div>
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

export default UploadWithHeading;
