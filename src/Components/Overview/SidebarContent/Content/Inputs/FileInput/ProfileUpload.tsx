import React, {useState} from "react";

// react icons
import {CgProfile} from "react-icons/cg";

const ProfileUpload = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("fourthImage")?.click();
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
            <div className="text-center">
                <input
                    type="file"
                    name="image"
                    id="fourthImage"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div
                    className="w-[150px] h-[150px] rounded-full dark:border-slate-700 border border-border flex items-center justify-center">
                    {image === "" ? (
                        <CgProfile className="text-[10rem] text-border dark:text-slate-500"/>
                    ) : (
                        <img
                            src={image}
                            alt="image"
                            className="w-full h-full object-cover rounded-full"
                        />
                    )}
                </div>

                <button
                    className="px-4 py-2 bg-primary text-white rounded-md mt-5"
                    onClick={handleUploadImage}
                >
                    Upload profile
                </button>
            </div>
        </div>
    );
};

export default ProfileUpload;
