import {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";

// contents for scrollspy
import {textareaInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from "react-helmet";

// showing the code
import Showcode from "@shared/Component/ShowCode.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";

const TextareaInput = () => {
    const sectionIds = textareaInputContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // primary input
    const [primaryInputPreview, setPrimaryInputPreview] = useState(true);
    const [primaryInputCode, setPrimaryInputCode] = useState(false);

    // bottom border input
    const [bottomBorderPreview, setBottomBorderPreview] = useState(true);
    const [bottomBorderCode, setBottomBorderCode] = useState(false);

    // animateLabel
    const [animateLabelPreiview, setAnimateLabelPreview] = useState(true);
    const [animateLabelCode, setAnimateLabelCode] = useState(false);

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"required textarea"} id={"required_textarea"}/>

                    <ComponentDescription
                        text='This is a required textarea component. Please enter your text here; this field cannot be left empty.'/>

                    <ToggleTab setCode={setPrimaryInputCode} preview={primaryInputPreview}
                               setPreview={setPrimaryInputPreview} code={primaryInputCode}/>

                    <ComponentWrapper>
                        {primaryInputPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="w-full 1024px:w-[80%]">
                                    <label
                                        htmlFor="description"
                                        className="font-[400] dark:text-[#abc2d3] text-[15px] text-text"
                                    >
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Write something about zenUI"
                                        className="border-border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-primary transition-colors duration-300"
                                    />
                                </div>
                            </div>
                        )}

                        {primaryInputCode && (
                            <Showcode
                                code='
import React from "react";

const TextareaInput = () => {

    return (
        <div className="w-full md:w-[80%]">
            <label
                htmlFor="description"
                className="font-[400] dark:text-[#abc2d3] text-[15px] text-text"
            >
                Description <span className="text-red-500">*</span>
            </label>
            <textarea
                id="description"
                placeholder="Write something about zenUI"
                className="border-border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-primary transition-colors duration-300"
            />
        </div>
    );
};

export default TextareaInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"background textarea"}
                            id={"background_textarea"}
                        />
                    </div>

                    <ComponentDescription
                        text='This is a textarea input with a background color. Enter your text here for a more visually appealing experience.'/>

                    <ToggleTab setCode={setBottomBorderCode} code={bottomBorderCode} preview={bottomBorderPreview}
                               setPreview={setBottomBorderPreview}/>

                    <ComponentWrapper>
                        {bottomBorderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="w-full 1024px:w-[80%]">
                                    <label
                                        htmlFor="description"
                                        className="font-[400] dark:text-[#abc2d3] text-[15px] text-text"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="name"
                                        placeholder="Write something about zenUI"
                                        className="border-border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border outline-none px-4 w-full mt-1 min-h-[100px] bg-gray-200 rounded-md py-3 focus:border-gray-400 transition-colors duration-300"
                                    />
                                </div>
                            </div>
                        )}

                        {bottomBorderCode && (
                            <Showcode
                                code='
import React from "react";

const TextareaInput = () => {

    return (
        <div className="w-full md:w-[80%]">
            <label
                htmlFor="description"
                className="font-[400] dark:text-[#abc2d3] text-[15px] text-text"
            >
                Description
            </label>
            <textarea
                id="name"
                placeholder="Write something about zenUI"
                className="border-border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border outline-none px-4 w-full mt-1 min-h-[100px] bg-gray-200 rounded-md py-3 focus:border-gray-400 transition-colors duration-300"
            />
        </div>
    );
};

export default TextareaInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"animate label textarea"}
                            id={"animate_label_textarea"}
                        />
                    </div>

                    <ComponentDescription
                        text='This is a textarea input with an animated label. Enter your text here; the label animates accordingly for clarity.'/>

                    <ToggleTab setCode={setAnimateLabelCode} code={animateLabelCode} preview={animateLabelPreiview}
                               setPreview={setAnimateLabelPreview}/>

                    <ComponentWrapper>
                        {animateLabelPreiview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <label className="relative w-full 1024px:w-[80%]">
                        <textarea
                            name="name"
                            id="name"
                            className="peer dark:border-slate-700 dark:bg-transparent border-[#e5eaf2] border rounded-md outline-none px-4 min-h-[200px] py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                        />
                                    <span
                                        className="absolute top-3.5 left-5 dark:text-slate-500 dark:peer-focus:bg-[#020617] peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                            Write something about zenUI
                      </span>
                                </label>
                            </div>
                        )}

                        {animateLabelCode && (
                            <Showcode
                                code='
import React from "react";

const TextareaInput = () => {

    return (
        <label className="relative w-full md:w-[80%]">
             <textarea
                 name="name"
                 id="name"
                 className="peer dark:border-slate-700 dark:bg-transparent border-[#e5eaf2] border rounded-md outline-none px-4 min-h-[200px] py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
            />
            <span
                className="absolute top-3.5 left-5 dark:text-slate-500 dark:peer-focus:bg-[#020617] peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                   Write something about zenUI
            </span>
        </label>
    );
};

export default TextareaInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/input-text' backName='input' forwardName='number'
                                    forwardUrl='/components/input-number'/>

                </div>

                <ContentNavbar activeSection={activeSection} contents={textareaInputContents}/>

            </aside>
            <Helmet>
                <title>Form - Textarea</title>
            </Helmet>
        </>
    );
};

export default TextareaInput;