import {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter.jsx";
import ContentHeader from "@shared/ContentHeader.jsx";

// contents for scrollspy
import {fileInputContents} from '@utils/ContentsConfig/InputContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

// react helmet
import {Helmet} from "react-helmet";

// showing the code
import Showcode from "@shared/Component/ShowCode.jsx";

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';
import UploadWithIcon from "./UploadWithIcon.jsx";
import UploadWithButton from "./UploadWithButton.jsx";
import UploadWithHeading from "./UploadWithHeading.jsx";
import ProfileUpload from "./ProfileUpload.jsx";

const Index = () => {
    const sectionIds = fileInputContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // upload with icon
    const [iconUploadPreview, setIconUploadPreview] = useState(true);
    const [iconUploadCode, setIconUploadCode] = useState(false);

    // upload with button
    const [buttonUploadPreview, setButtonUploadPreview] = useState(true);
    const [buttonUploadCode, setButtonUploadCode] = useState(false);

    // upload with heading
    const [headingUploadPreview, setHeadingUploadPreview] = useState(true);
    const [headingUploadCode, setHeadingUploadCode] = useState(false);

    // profile upload
    const [profileUploadPreview, setProfileUploadPreview] = useState(true);
    const [profileUploadCode, setProfileUploadCode] = useState(false);

    return (
        <>
            <aside className="flex items-start justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"upload with icon"} id={"upload_with_icon"}/>

                    <ComponentDescription
                        text='This is a file upload with icon component. Upload files easily using intuitive icons for guidance.'/>

                    <ToggleTab code={iconUploadCode} setCode={setIconUploadCode} preview={iconUploadPreview}
                               setPreview={setIconUploadPreview}/>

                    <ComponentWrapper>
                        {iconUploadPreview && (
                            <UploadWithIcon/>
                        )}

                        {iconUploadCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FiUpload} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

const FileInput = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("image_input").click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = event.target.files[0];
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
                id="image_input"
                className="hidden"
                onChange={handleFileChange}
            />
            {image === "" ? (
                <div
                    className="w-full md:w-[90%] flex items-center dark:border-slate-600 justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
                    onClick={handleUploadImage}
                >
                    <FiUpload className="text-[2rem] text-[#777777] dark:text-[#abc2d3]"/>
                    <p className="text-[#777777] dark:text-[#abc2d3]">Browse to upload you file</p>
                </div>
            ) : (
                <div className="relative w-full md:w-[80%] h-[300px]">
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

export default FileInput;
            '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"upload with button"}
                            id={"upload_with_button"}
                        />
                    </div>

                    <ComponentDescription
                        text='This is a file upload with button component. Easily upload files with a simple click of a button.'/>

                    <ToggleTab code={buttonUploadCode} setCode={setButtonUploadCode} setPreview={setButtonUploadPreview}
                               preview={buttonUploadPreview}/>

                    <ComponentWrapper>
                        {buttonUploadPreview && (
                            <UploadWithButton/>
                        )}

                        {buttonUploadCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoMdCloudUpload} from "react-icons/io";
import {MdDelete} from "react-icons/md";

const FileInput = () => {
    const [image, setImage] = useState("");

    const handleImageUpload = () => {
        document.getElementById("image_input").click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = event.target.files[0];
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
                id="image_input"
                className="hidden"
                onChange={handleFileChange}
            />
            {image === "" ? (
                <div
                    className="w-full md:w-[90%] flex dark:border-slate-700 dark:bg-slate-900 items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6 ">
                    <IoMdCloudUpload className="text-[3rem] text-primary"/>
                    <p className="mt-2 text-text dark:text-[#abc2d3]">Drag and drop here</p>
                    <p className=" text-text dark:text-[#abc2d3]">or</p>

                    <button
                        className="px-6 py-1.5 text-[#3B9DF8]"
                        onClick={handleImageUpload}
                    >
                        Browse
                    </button>
                </div>
            ) : (
                <div className="relative w-full md:w-[80%] h-[200px]">
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

export default FileInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"upload with heading"}
                            id={"upload_with_heading"}
                        />
                    </div>

                    <ComponentDescription
                        text='This is a file upload with heading text component. Upload files accompanied by clear heading instructions.'/>

                    <ToggleTab code={headingUploadCode} setCode={setHeadingUploadCode} preview={headingUploadPreview}
                               setPreview={setHeadingUploadPreview}/>

                    <ComponentWrapper>
                        {headingUploadPreview && (
                            <UploadWithHeading/>
                        )}

                        {headingUploadCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {PiFilesThin} from "react-icons/pi";
import {MdDelete} from "react-icons/md";

const FileInput = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("image_input").click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            {image === "" ? (
                <div className="text-center w-full md:w-[90%]">
                    <input
                        type="file"
                        name="image"
                        id="image_input"
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
                        className="mt-5 w-full md:w-[70%] mx-auto dark:border-slate-700 dark:bg-slate-900 flex items-center justify-center flex-col bg-white border-[2px] border-dashed border-[#3B9DF8] rounded-md py-10 cursor-pointer"
                        onClick={handleUploadImage}
                    >
                        <PiFilesThin className="text-[4rem] text-[#424242] dark:text-[#abc2d3]/70"/>
                    </div>
                </div>
            ) : (
                <div className="relative w-full md:w-[80%] h-[200px]">
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

export default FileInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader text={"profile upload"} id={"profile_upload"}/>
                    </div>

                    <ComponentDescription
                        text='This is a profile upload component. Easily update your profile picture with a simple upload feature.'/>

                    <ToggleTab code={profileUploadCode} setPreview={setProfileUploadPreview}
                               preview={profileUploadPreview} setCode={setProfileUploadCode}/>

                    <ComponentWrapper>
                        {profileUploadPreview && (
                            <ProfileUpload/>
                        )}

                        {profileUploadCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {CgProfile} from "react-icons/cg";

const FileInput = () => {
    const [image, setImage] = useState("");

    const handleUploadImage = () => {
        document.getElementById("image_input").click();
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = event.target.files[0];
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
                    id="image_input"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div
                    className="w-[150px] h-[150px] rounded-full dark:border-slate-700 border border-[#e5eaf2] flex items-center justify-center">
                    {image === "" ? (
                        <CgProfile className="text-[10rem] text-[#e5eaf2] dark:text-slate-500"/>
                    ) : (
                        <img
                            src={image}
                            alt="image"
                            className="w-full h-full object-cover rounded-full"
                        />
                    )}
                </div>

                <button
                    className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md mt-5"
                    onClick={handleUploadImage}
                >
                    Upload profile
                </button>
            </div>
        </div>
    );
};

export default FileInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/input-range' backName='range' forwardName='OTP input'
                                    forwardUrl='/components/otp-input'/>
                </div>

                <ContentNavbar contents={fileInputContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Form - File Input</title>
            </Helmet>
        </>
    );
};

export default Index;
