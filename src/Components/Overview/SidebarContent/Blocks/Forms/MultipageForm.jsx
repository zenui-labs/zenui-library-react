import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader.jsx";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import {IoSearchOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import {BsCashStack} from "react-icons/bs";
import {HiOutlineUpload} from "react-icons/hi";
import {SlLocationPin} from "react-icons/sl";

import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";


const MultipageForm = () => {

    const [multiStepForm1Preview, setMultiStepForm1Preview] = useState(true);
    const [multiStepForm1Code, setMultiStepForm1Code] = useState(false);

    const [multiStepForm2Preview, setMultiStepForm2Preview] = useState(true);
    const [multiStepForm2Code, setMultiStepForm2Code] = useState(false);

    // actions
    const [step, setStep] = useState(1)

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1)
        }
    };
    const prevStep = () => setStep(step - 1);

    const steps = [
        {
            id: 1,
            name: 'account type'
        },
        {
            id: 2,
            name: 'personal info'
        },
        {
            id: 3,
            name: 'profile data'
        },
    ]

    const [step1, setStep1] = useState(1)

    const nextStep1 = () => {
        if (step1 < 4) {
            setStep1(step1 + 1)
        }
    };
    const prevStep1 = () => setStep1(step1 - 1);

    const steps1 = [
        {
            id: 1,
            name: 'account type'
        },
        {
            id: 2,
            name: 'personal info'
        },
        {
            id: 3,
            name: 'profile data'
        },
    ]

    const [selectedPostionCardId, setSelectedPositionCardId] = useState(false);

    const positionCards = [
        {
            id: 1,
            title: 'Front-End Developer',
            description: 'remove a border style that was applied at a smaller breakpoint.',
            from_start: 50,
        },
        {
            id: 2,
            title: 'Back-End Developer',
            description: 'remove a border style that was applied at a smaller breakpoint.',
            from_start: 100,
        },
        {
            id: 3,
            title: 'Laravel Developer',
            description: 'remove a border style that was applied at a smaller breakpoint.',
            from_start: 80,
        },
        {
            id: 4,
            title: 'Mern Stack Developer',
            description: 'remove a border style that was applied at a smaller breakpoint.',
            from_start: 110,
        }
    ]

    const multiStep1Codes = [
        {
            id: "mainCodes",
            displayText: "MultiStepForm.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {MdDone} from "react-icons/md";\n' +
                'import {SlLocationPin} from "react-icons/sl";\n' +
                'import {IoSearchOutline} from "react-icons/io5";\n' +
                'import {BsCashStack} from "react-icons/bs";\n' +
                'import {HiOutlineUpload} from "react-icons/hi";\n' +
                '\n' +
                '// all data\n' +
                'import stepsData from "./StepData.js"\n' +
                'import departmentsData from "./DepartmentsData.js"\n' +
                '\n' +
                'const MultiStepForm = () => {\n' +
                '    const [step, setStep] = useState(1)\n' +
                '\n' +
                '    const nextStep = () => {\n' +
                '        if(step < 4) {\n' +
                '            setStep(step + 1)\n' +
                '        }\n' +
                '    };\n' +
                '    const prevStep = () => setStep(step - 1);\n' +
                '\n' +
                '    const [selectedDepartmentId, setSelectedDepartmentId] = useState(false);\n' +
                '\n' +
                '    return (\n' +
                '        <div className="w-full sm:w-[90%] max-w-[700px] mx-auto">\n' +
                '            <div className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px]">\n' +
                '                {\n' +
                '                    stepsData?.map((stepItem, index) => (\n' +
                '                        <p key={index} className="flex items-center w-full gap-[10px]">\n' +
                '                            {\n' +
                '                                step <= stepItem.id && (\n' +
                '                                    <p className={`w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center dark:text-[#abc2d3] dark:bg-slate-800 text-[1.2rem] rounded-full bg-gray-50`}>{stepItem?.id}</p>\n' +
                '                                )\n' +
                '                            }\n' +
                '\n' +
                '                            {\n' +
                '                                step >= (stepItem.id + 1) && (\n' +
                '                                    <div\n' +
                '                                        className="p-[10px] h-[40px] w-[40px] rounded-full bg-blue-500 text-white flex items-center justify-center">\n' +
                '                                        <MdDone className="text-[3rem]"/>\n' +
                '                                    </div>\n' +
                '                                )\n' +
                '                            }\n' +
                '\n' +
                '                            <p className={`${step > stepItem.id ? "!text-blue-500" : "text-gray-600"} capitalize text-[0.9rem] dark:text-[#abc2d3] font-[400] sm:w-[75%] min-w-fit`}>{stepItem?.name}</p>\n' +
                '\n' +
                '                            {\n' +
                '                                index < stepsData?.length - 1 && (\n' +
                '                                    <div className={`${\n' +
                '                                        step >= (stepItem.id + 1) ? "bg-blue-500" : "bg-gray-300"\n' +
                '                                    } w-full h-[5px] dark:bg-slate-800 rounded-full`}></div>\n' +
                '                                )\n' +
                '                            }\n' +
                '                        </p>\n' +
                '                    ))\n' +
                '                }\n' +
                '            </div>\n' +
                '\n' +
                '            <form className="mt-16 w-full">\n' +
                '                {\n' +
                '                    step === 1 && (\n' +
                '                        <div className="flex flex-col w-full">\n' +
                '                            <div className="w-full relative">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Location</label> <br/>\n' +
                '                                <input type="text" placeholder="City, area..."\n' +
                '                                       className="py-2.5 pl-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 pr-[40px] border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                                <SlLocationPin className="absolute dark:text-slate-500 top-[42px] right-3 text-gray-500"/>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8">Suggestions</p>\n' +
                '                            <div className="flex items-center gap-[10px] flex-wrap mt-3">\n' +
                '                                <p className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">Moulvibazar</p>\n' +
                '                                <p className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">Sylhet</p>\n' +
                '                                <p className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">Juri</p>\n' +
                '                                <p className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">BuwaiBazar</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                {\n' +
                '                    step === 2 && (\n' +
                '                        <div className="flex flex-col gap-[20px] w-full">\n' +
                '                            <div className="w-full relative">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Roles</label> <br/>\n' +
                '                                <input type="text" placeholder="Job title, position"\n' +
                '                                       className="py-2.5 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 pl-4 pr-[40px] border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                                <IoSearchOutline\n' +
                '                                    className="absolute dark:text-slate-500 text-[1.2rem] top-[40px] right-3 text-gray-500"/>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8">Suggestions</p>\n' +
                '\n' +
                '                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">\n' +
                '                                {\n' +
                '                                    departmentsData?.map((card, index) => (\n' +
                '                                        <div key={index}\n' +
                '                                             onClick={() => setSelectedDepartmentId(card?.id)}\n' +
                '                                             className={`${selectedDepartmentId === card?.id ? "border-[#3B9DF8]" : "border-gray-300 dark:border-slate-700"} border cursor-pointer rounded-md p-[15px]`}>\n' +
                '                                            <div\n' +
                '                                                className="flex items-center gap-[10px] justify-between w-full">\n' +
                '                                                <h1 className="text-[1.1rem] dark:text-[#abc2d3] font-[500]">{card?.title}</h1>\n' +
                '                                                <div\n' +
                '                                                    className={` ${selectedDepartmentId === card?.od && "border-[#3B9DF8]"} w-[21px] h-[21px] border dark:border-slate-600 border-gray-300  rounded-full flex items-center justify-center cursor-pointer `}>\n' +
                '                                                    <div className={`${\n' +
                '                                                        selectedDepartmentId === card?.id ? "bg-[#3B9DF8] scale-[1]" : "bg-transparent scale-[0.7]"} w-[11px] h-[11px] transition-all duration-200 rounded-full`}></div>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500 font-[300] mt-1">{card?.description}</p>\n' +
                '\n' +
                '                                            <p className="flex items-center gap-[10px] mt-3 text-[0.8rem] dark:bg-slate-900 dark:text-slate-400 text-gray-700 bg-gray-100 py-[5px] px-[10px] w-max">\n' +
                '                                                <BsCashStack/>\n' +
                '                                                from ${card?.from_start} per hour\n' +
                '                                            </p>\n' +
                '                                        </div>\n' +
                '                                    ))\n' +
                '                                }\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                {\n' +
                '                    step === 3 && (\n' +
                '                        <div className="flex flex-col gap-[20px] w-full">\n' +
                '                            <div className="w-full">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Location</label> <br/>\n' +
                '                                <input type="text" placeholder="e.g. Juri, Moulvibazar"\n' +
                '                                       className="py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                            </div>\n' +
                '                            <div className="w-full">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Roles</label> <br/>\n' +
                '                                <input type="text" placeholder="e.g. 360 operator, steel fixer"\n' +
                '                                       className="py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                            </div>\n' +
                '                            <div className="w-full">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Name</label> <br/>\n' +
                '                                <input type="text" placeholder="e.g. Jhon Deo"\n' +
                '                                       className="py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div className="w-full">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Phone</label> <br/>\n' +
                '                                <input type="number" placeholder="e.g. +8801305282768"\n' +
                '                                       className="py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none"/>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div className="w-full">\n' +
                '                                <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Certification <span\n' +
                '                                    className="text-gray-300 dark:text-slate-500 font-[400] text-[0.9rem]">(optional)</span></label>\n' +
                '                                <br/>\n' +
                '                                <label\n' +
                '                                    className="w-full h-[200px] dark:border-slate-700 border-2 border-dashed border-gray-300 flex items-center flex-col justify-center rounded-md mt-1">\n' +
                '                                    <HiOutlineUpload className="text-[2.7rem] text-blue-300"/>\n' +
                '                                    <p className="flex sm:flex-row dark:text-[#abc2d3] flex-col items-center gap-[5px] text-[1rem] mt-2">\n' +
                '                                        <a className="underline dark:text-[#abc2d3] text-gray-700 font-bold ">Click\n' +
                '                                            to upload</a>\n' +
                '                                        or drag & drop\n' +
                '                                    </p>\n' +
                '                                    <input type="file"\n' +
                '                                           className="py-2.5 px-4 bg-gray-50 mt-1 rounded-md outline-none hidden"/>\n' +
                '                                </label>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                {\n' +
                '                    step === 4 && (\n' +
                '                        <div className="flex items-center justify-center w-full flex-col">\n' +
                '                            <img src="https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png"\n' +
                '                                 alt="vector" className="w-[200px]"/>\n' +
                '\n' +
                '                            <h1 className="text-[1.4rem] dark:text-[#abc2d3] font-[600] mt-4">We"ve receive your\n' +
                '                                application!</h1>\n' +
                '                            <p className="text-gray-500 dark:text-slate-400 text-[1rem] font-[400] mt-1">We will process it\n' +
                '                                and reach out to you in a days.</p>\n' +
                '                        </div>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                <div className="w-full flex items-end justify-end mt-12">\n' +
                '                    <button disabled={step <= 1} type="button" onClick={prevStep}\n' +
                '                            className={`${step <= 1 && "cursor-not-allowed dark:text-slate-500"} text-[1rem] text-gray-500 dark:text-slate-400 px-6 py-2.5`}>Previous\n' +
                '                    </button>\n' +
                '                    <button disabled={step > 3} type="button" onClick={nextStep}\n' +
                '                            className={`${step > 3 && "!bg-blue-300 dark:text-slate-500 dark:!bg-blue-900/30 cursor-not-allowed"} bg-blue-500 py-2.5 px-6 rounded-md text-white`}>\n' +
                '                        {step > 2 ? "Submit" : "Next"}\n' +
                '                    </button>\n' +
                '                </div>\n' +
                '            </form>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default MultiStepForm;\n'
        },
        {
            id: "stepsData",
            displayText: "StepsData.js",
            language: "js",
            code: 'export const stepsData = [\n' +
                '        {\n' +
                '            id: 1,\n' +
                '            name: "account type"\n' +
                '        },\n' +
                '        {\n' +
                '            id: 2,\n' +
                '            name: "personal info"\n' +
                '        },\n' +
                '        {\n' +
                '            id: 3,\n' +
                '            name: "profile data"\n' +
                '        },\n' +
                '    ]'
        },
        {
            id: "departmentsData",
            displayText: "DepartmentsData.js",
            language: "js",
            code: 'export const departmentsData = [\n' +
                '        {\n' +
                '            id: 1,\n' +
                '            title: "Front-End Developer",\n' +
                '            description: "remove a border style that was applied at a smaller breakpoint.",\n' +
                '            from_start: 50,\n' +
                '        },\n' +
                '        {\n' +
                '            id: 2,\n' +
                '            title: "Back-End Developer",\n' +
                '            description: "remove a border style that was applied at a smaller breakpoint.",\n' +
                '            from_start: 100,\n' +
                '        },\n' +
                '        {\n' +
                '            id: 3,\n' +
                '            title: "Laravel Developer",\n' +
                '            description: "remove a border style that was applied at a smaller breakpoint.",\n' +
                '            from_start: 80,\n' +
                '        },\n' +
                '        {\n' +
                '            id: 4,\n' +
                '            title: "Mern Stack Developer",\n' +
                '            description: "remove a border style that was applied at a smaller breakpoint.",\n' +
                '            from_start: 110,\n' +
                '        }\n' +
                '    ]'
        },
    ]

    const multiStep2Codes = [
        {
            id: "mainCodes",
            displayText: "MultiStepForm.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                'import stepsData from "./StepsData.js"\n' +
                '\n' +
                'const MultiStepForm = () => {\n' +
                '    const [step, setStep] = useState(1)\n' +
                '\n' +
                '    const nextStep = () => {\n' +
                '        if(step < 3) {\n' +
                '            setStep(step + 1)\n' +
                '        }\n' +
                '    };\n' +
                '    const prevStep = () => setStep(step - 1);\n' +
                '\n' +
                '    return (\n' +
                '        <div className="w-full sm:w-[70%] mx-auto">\n' +
                '            <div className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px]">\n' +
                '                {\n' +
                '                    stepsData?.map((stepItem, index) => (\n' +
                '                        <p key={index} className="flex items-center gap-[10px] w-full">\n' +
                '                            <p className={` ${\n' +
                '                                step >= stepItem.id ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-500 dark:bg-slate-800 dark:text-[#abc2d3]"\n' +
                '                            } w-[30px] h-[30px] p-[20px] flex items-center justify-center text-[1.2rem] rounded-full bg-blue-500`}>{stepItem?.id}</p>\n' +
                '                            {\n' +
                '                                index < stepsData?.length - 1 && (\n' +
                '                                    <div className={`${\n' +
                '                                        step >= (stepItem.id + 1) ? "bg-blue-500" : "bg-gray-300"\n' +
                '                                    } w-full h-[5px] dark:bg-slate-800 rounded-full`}></div>\n' +
                '                                )\n' +
                '                            }\n' +
                '                        </p>\n' +
                '                    ))\n' +
                '                }\n' +
                '            </div>\n' +
                '\n' +
                '            <form className="mt-16 w-full">\n' +
                '                {\n' +
                '                    step === 1 && (\n' +
                '                        <>\n' +
                '                            <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">Choose your account type</p>\n' +
                '\n' +
                '                            <div className="mt-6 flex sm:flex-row flex-col sm:items-center gap-[20px]">\n' +
                '                                <img src="https://i.ibb.co/tzxHppd/Group-11.png" alt="vector"\n' +
                '                                     className="w-[60px]"/>\n' +
                '                                <div>\n' +
                '                                    <h1 className="text-[15px] dark:text-[#abc2d3] font-[600]">Personal Account</h1>\n' +
                '                                    <p className="text-[0.9rem] dark:text-slate-400 font-[300] text-gray-400 w-full sm:w-[80%] mt-1">Lorem\n' +
                '                                        ipsum dolor sit amet consectetur adipisicing elit.</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div className="mt-6 sm:flex-row flex-col flex sm:items-center gap-[20px]">\n' +
                '                                <img src="https://i.ibb.co/RBtVH0D/Group-11-1.png" alt="vector"\n' +
                '                                     className="w-[60px]"/>\n' +
                '                                <div>\n' +
                '                                    <h1 className="text-[15px] dark:text-[#abc2d3] font-[600]">Business Account</h1>\n' +
                '                                    <p className="text-[0.9rem] dark:text-slate-400 font-[300] text-gray-400 w-full sm:w-[80%] mt-1">Lorem\n' +
                '                                        ipsum dolor sit amet consectetur adipisicing elit.</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                {\n' +
                '                    step === 2 && (\n' +
                '                        <>\n' +
                '                            <div className="flex flex-col gap-[25px] w-full">\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Name</label> <br/>\n' +
                '                                    <input type="text" placeholder="Jhon Deo"\n' +
                '                                           className="py-2.5 px-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border mt-1 w-full rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Email</label> <br/>\n' +
                '                                    <input type="email" placeholder="example@gmail.com"\n' +
                '                                           className="py-2.5 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border px-4 bg-gray-50 mt-1 w-full rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Password</label> <br/>\n' +
                '                                    <input type="password" placeholder="*********"\n' +
                '                                           className="py-2.5 px-4 bg-gray-50 mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border w-full rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                {\n' +
                '                    step === 3 && (\n' +
                '                        <>\n' +
                '                            <div className="flex flex-col gap-[25px]">\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Age</label> <br/>\n' +
                '                                    <input type="number" placeholder="20"\n' +
                '                                           className="py-2.5 px-4 bg-gray-50 mt-1 w-full dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Area of\n' +
                '                                        interest</label> <br/>\n' +
                '                                    <input type="text" placeholder="Frontend"\n' +
                '                                           className="py-2.5 px-4 bg-gray-50 mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border w-full rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                                <div className="w-full">\n' +
                '                                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-600">Bio /\n' +
                '                                        Description</label> <br/>\n' +
                '                                    <input type="password" placeholder="Lorem ipsum"\n' +
                '                                           className="py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border bg-gray-50 mt-1 w-full rounded-md outline-none"/>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </>\n' +
                '                    )\n' +
                '                }\n' +
                '\n' +
                '                <div className="w-full flex items-end justify-end mt-12">\n' +
                '                    <button disabled={step <= 1} type="button" onClick={prevStep}\n' +
                '                            className={`${step <= 1 && "cursor-not-allowed dark:text-slate-500"} text-[1rem] text-gray-500 dark:text-slate-400 px-6 py-2.5`}>Previous\n' +
                '                    </button>\n' +
                '                    <button type="button" onClick={nextStep}\n' +
                '                            className="bg-blue-500 py-2.5 px-6 rounded-md text-white">\n' +
                '                        {step > 2 ? "Submit" : "Next"}\n' +
                '                    </button>\n' +
                '                </div>\n' +
                '            </form>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default MultiStepForm;\n'
        },
        {
            id: "data",
            displayText: "StepsData.js",
            language: "js",
            code: '    export const stepsData = [\n' +
                '        {\n' +
                '            id: 1,\n' +
                '            name: \'account type\'\n' +
                '        },\n' +
                '        {\n' +
                '            id: 2,\n' +
                '            name: \'personal info\'\n' +
                '        },\n' +
                '        {\n' +
                '            id: 3,\n' +
                '            name: \'profile data\'\n' +
                '        },\n' +
                '    ]'
        },
    ]

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"multi step form 1"} id={"multi_step_form_1"}/>

                <BlockDescription
                    text='A form divided into multiple steps, guiding users through sections one at a time for a more streamlined data entry process.'/>

                <BlockToggleTab preview={multiStepForm1Preview} code={multiStepForm1Code}
                                setCode={setMultiStepForm1Code} setPreview={setMultiStepForm1Preview}/>

                <BlockWrapper>
                    {multiStepForm1Preview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full 640px:w-[90%] max-w-[700px] mx-auto'>
                                <div
                                    className='w-full 640px:flex-row flex-col flex items-center gap-[20px] 640px:gap-[10px]'>
                                    {
                                        steps1?.map((stepItem, index) => (
                                            <p key={index} className='flex items-center w-full gap-[10px]'>
                                                {
                                                    step1 <= stepItem.id && (
                                                        <p className={`w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center dark:text-[#abc2d3] dark:bg-slate-800 text-[1.2rem] rounded-full bg-gray-50`}>{stepItem?.id}</p>
                                                    )
                                                }

                                                {
                                                    step1 >= (stepItem.id + 1) && (
                                                        <div
                                                            className='p-[10px] h-[40px] w-[40px] rounded-full bg-blue-500 text-white flex items-center justify-center'>
                                                            <MdDone className='text-[3rem]'/>
                                                        </div>
                                                    )
                                                }

                                                <p className={`${step1 > stepItem.id ? '!text-blue-500' : 'text-gray-600'} capitalize text-[0.9rem] dark:text-[#abc2d3] font-[400] 640px:w-[75%] min-w-fit`}>{stepItem?.name}</p>

                                                {
                                                    index < steps1?.length - 1 && (
                                                        <div className={`${
                                                            step1 >= (stepItem.id + 1) ? 'bg-blue-500' : 'bg-gray-300'
                                                        } w-full h-[5px] dark:bg-slate-800 rounded-full`}></div>
                                                    )
                                                }
                                            </p>
                                        ))
                                    }
                                </div>

                                <form className='mt-16 w-full'>
                                    {
                                        step1 === 1 && (
                                            <div className='flex flex-col w-full'>
                                                <div className='w-full relative'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Location</label>
                                                    <br/>
                                                    <input type='text' placeholder='City, area...'
                                                           className='py-2.5 pl-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 pr-[40px] border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                    <SlLocationPin
                                                        className='absolute dark:text-slate-500 top-[42px] right-3 text-gray-500'/>
                                                </div>

                                                <p className='text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8'>Suggestions</p>
                                                <div className='flex items-center gap-[10px] flex-wrap mt-3'>
                                                    <p className='py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>Moulvibazar</p>
                                                    <p className='py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>Sylhet</p>
                                                    <p className='py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>Juri</p>
                                                    <p className='py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>BuwaiBazar</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        step1 === 2 && (
                                            <div className='flex flex-col gap-[20px] w-full'>
                                                <div className='w-full relative'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Roles</label>
                                                    <br/>
                                                    <input type='text' placeholder='Job title, position'
                                                           className='py-2.5 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 pl-4 pr-[40px] border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                    <IoSearchOutline
                                                        className='absolute dark:text-slate-500 text-[1.2rem] top-[40px] right-3 text-gray-500'/>
                                                </div>

                                                <p className='text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8'>Suggestions</p>

                                                <div className='grid grid-cols-1 640px:grid-cols-2 gap-[10px]'>
                                                    {
                                                        positionCards?.map((card, index) => (
                                                            <div key={index}
                                                                 onClick={() => setSelectedPositionCardId(card?.id)}
                                                                 className={`${selectedPostionCardId === card?.id ? 'border-primary' : 'border-gray-300 dark:border-slate-700'} border cursor-pointer rounded-md p-[15px]`}>
                                                                <div
                                                                    className='flex items-center gap-[10px] justify-between w-full'>
                                                                    <h1 className='text-[1.1rem] dark:text-[#abc2d3] font-[500]'>{card?.title}</h1>
                                                                    <div
                                                                        className={` ${selectedPostionCardId === card?.od && 'border-primary'} w-[21px] h-[21px] border dark:border-slate-600 border-gray-300  rounded-full flex items-center justify-center cursor-pointer `}>
                                                                        <div className={`${
                                                                            selectedPostionCardId === card?.id ? "bg-[#3B9DF8] scale-[1]" : "bg-transparent scale-[0.7]"} w-[11px] h-[11px] transition-all duration-200 rounded-full`}></div>
                                                                    </div>
                                                                </div>
                                                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500 font-[300] mt-1'>{card?.description}</p>

                                                                <p className='flex items-center gap-[10px] mt-3 text-[0.8rem] dark:bg-slate-900 dark:text-slate-400 text-gray-700 bg-gray-100 py-[5px] px-[10px] w-max'>
                                                                    <BsCashStack/>
                                                                    from ${card?.from_start} per hour
                                                                </p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        step1 === 3 && (
                                            <div className='flex flex-col gap-[20px] w-full'>
                                                <div className='w-full'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Location</label>
                                                    <br/>
                                                    <input type='text' placeholder='e.g. Juri, Moulvibazar'
                                                           className='py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                </div>
                                                <div className='w-full'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Roles</label>
                                                    <br/>
                                                    <input type='text' placeholder='e.g. 360 operator, steel fixer'
                                                           className='py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                </div>
                                                <div className='w-full'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Name</label>
                                                    <br/>
                                                    <input type='text' placeholder='e.g. Jhon Deo'
                                                           className='py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                </div>

                                                <div className='w-full'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Phone</label>
                                                    <br/>
                                                    <input type='number' placeholder='e.g. +8801305282768'
                                                           className='py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none'/>
                                                </div>

                                                <div className='w-full'>
                                                    <label
                                                        className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Certification <span
                                                        className='text-gray-300 dark:text-slate-500 font-[400] text-[0.9rem]'>(optional)</span></label>
                                                    <br/>
                                                    <label
                                                        className='w-full h-[200px] dark:border-slate-700 border-2 border-dashed border-gray-300 flex items-center flex-col justify-center rounded-md mt-1'>
                                                        <HiOutlineUpload className='text-[2.7rem] text-blue-300'/>
                                                        <p className='flex 640px:flex-row dark:text-[#abc2d3] flex-col items-center gap-[5px] text-[1rem] mt-2'>
                                                            <a className='underline dark:text-[#abc2d3] text-gray-700 font-bold '>Click
                                                                to upload</a>
                                                            or drag & drop
                                                        </p>
                                                        <input type='file'
                                                               className='py-2.5 px-4 bg-gray-50 mt-1 rounded-md outline-none hidden'/>
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        step1 === 4 && (
                                            <div className='flex items-center justify-center w-full flex-col'>
                                                <img
                                                    src='https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png'
                                                    alt='vector' className='w-[200px]'/>

                                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] font-[600] mt-4'>We've
                                                    receive your application!</h1>
                                                <p className='text-gray-500 dark:text-slate-400 text-[1rem] font-[400] mt-1'>We
                                                    will process it and reach out to you in a days.</p>
                                            </div>
                                        )
                                    }

                                    <div className='w-full flex items-end justify-end mt-12'>
                                        <button disabled={step1 <= 1} type='button' onClick={prevStep1}
                                                className={`${step1 <= 1 && 'cursor-not-allowed dark:text-slate-500'} text-[1rem] text-gray-500 dark:text-slate-400 px-6 py-2.5`}>Previous
                                        </button>
                                        <button disabled={step1 > 3} type='button' onClick={nextStep1}
                                                className={`${step1 > 3 && '!bg-blue-300 dark:text-slate-500 dark:!bg-blue-900/30 cursor-not-allowed'} bg-blue-500 py-2.5 px-6 rounded-md text-white`}>
                                            {step1 > 2 ? 'Submit' : 'Next'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {multiStepForm1Code && <BlocksShowCode code={multiStep1Codes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"multi step form 2"} id={"multi_step_form_2"}/>
                </div>


                <BlockDescription
                    text='A form divided into multiple steps, guiding users through sections one at a time for a more streamlined data entry process.'/>

                <BlockToggleTab preview={multiStepForm2Preview} setPreview={setMultiStepForm2Preview}
                                code={multiStepForm2Code} setCode={setMultiStepForm2Code}/>

                <BlockWrapper>
                    {multiStepForm2Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full 640px:w-[70%] mx-auto'>
                                <div
                                    className='w-full 640px:flex-row flex-col flex items-center gap-[20px] 640px:gap-[10px]'>
                                    {
                                        steps?.map((stepItem, index) => (
                                            <p key={index} className='flex items-center gap-[10px] w-full'>
                                                <p className={` ${
                                                    step >= stepItem.id ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-500 dark:bg-slate-800 dark:text-[#abc2d3]'
                                                } w-[30px] h-[30px] p-[20px] flex items-center justify-center text-[1.2rem] rounded-full bg-blue-500`}>{stepItem?.id}</p>
                                                {
                                                    index < steps?.length - 1 && (
                                                        <div className={`${
                                                            step >= (stepItem.id + 1) ? 'bg-blue-500' : 'bg-gray-300'
                                                        } w-full h-[5px] dark:bg-slate-800 rounded-full`}></div>
                                                    )
                                                }
                                            </p>
                                        ))
                                    }
                                </div>

                                <form className='mt-16 w-full'>
                                    {
                                        step === 1 && (
                                            <>
                                                <p className='text-[0.9rem] dark:text-[#abc2d3] text-gray-500'>Choose your
                                                    account type</p>

                                                <div
                                                    className='mt-6 flex 640px:flex-row flex-col 640px:items-center gap-[20px]'>
                                                    <img src='https://i.ibb.co/tzxHppd/Group-11.png' alt='vector'
                                                         className='w-[60px]'/>
                                                    <div>
                                                        <h1 className='text-[15px] dark:text-[#abc2d3] font-[600]'>Personal
                                                            Account</h1>
                                                        <p className='text-[0.9rem] dark:text-slate-400 font-[300] text-gray-400 w-full 640px:w-[80%] mt-1'>Lorem
                                                            ipsum dolor sit amet consectetur adipisicing elit.</p>
                                                    </div>
                                                </div>

                                                <div
                                                    className='mt-6 640px:flex-row flex-col flex 640px:items-center gap-[20px]'>
                                                    <img src='https://i.ibb.co/RBtVH0D/Group-11-1.png' alt='vector'
                                                         className='w-[60px]'/>
                                                    <div>
                                                        <h1 className='text-[15px] dark:text-[#abc2d3] font-[600]'>Business
                                                            Account</h1>
                                                        <p className='text-[0.9rem] dark:text-slate-400 font-[300] text-gray-400 w-full 640px:w-[80%] mt-1'>Lorem
                                                            ipsum dolor sit amet consectetur adipisicing elit.</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        step === 2 && (
                                            <>
                                                <div className='flex flex-col gap-[25px] w-full'>
                                                    <div className='w-full'>
                                                        <label
                                                            className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Name</label>
                                                        <br/>
                                                        <input type='text' placeholder='Jhon Deo'
                                                               className='py-2.5 px-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border mt-1 w-full rounded-md outline-none'/>
                                                    </div>
                                                    <div className='w-full'>
                                                        <label
                                                            className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Email</label>
                                                        <br/>
                                                        <input type='email' placeholder='example@gmail.com'
                                                               className='py-2.5 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border px-4 bg-gray-50 mt-1 w-full rounded-md outline-none'/>
                                                    </div>
                                                    <div className='w-full'>
                                                        <label
                                                            className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Password</label>
                                                        <br/>
                                                        <input type='password' placeholder='*********'
                                                               className='py-2.5 px-4 bg-gray-50 mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border w-full rounded-md outline-none'/>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        step === 3 && (
                                            <>
                                                <div className='flex flex-col gap-[25px]'>
                                                    <div className='w-full'>
                                                        <label
                                                            className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Age</label>
                                                        <br/>
                                                        <input type='number' placeholder='20'
                                                               className='py-2.5 px-4 bg-gray-50 mt-1 w-full dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border rounded-md outline-none'/>
                                                    </div>
                                                    <div className='w-full'>
                                                        <label className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Area
                                                            of interest</label> <br/>
                                                        <input type='text' placeholder='Frontend'
                                                               className='py-2.5 px-4 bg-gray-50 mt-1 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border w-full rounded-md outline-none'/>
                                                    </div>
                                                    <div className='w-full'>
                                                        <label className='text-[1rem] dark:text-[#abc2d3] text-gray-600'>Bio
                                                            / Description</label> <br/>
                                                        <input type='password' placeholder='Lorem ipsum'
                                                               className='py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border bg-gray-50 mt-1 w-full rounded-md outline-none'/>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div className='w-full flex items-end justify-end mt-12'>
                                        <button disabled={step <= 1} type='button' onClick={prevStep}
                                                className={`${step <= 1 && 'cursor-not-allowed dark:text-slate-500'} text-[1rem] text-gray-500 dark:text-slate-400 px-6 py-2.5`}>Previous
                                        </button>
                                        <button type='button' onClick={nextStep}
                                                className='bg-blue-500 py-2.5 px-6 rounded-md text-white'>
                                            {step > 2 ? 'Submit' : 'Next'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {multiStepForm2Code && <BlocksShowCode code={multiStep2Codes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/contact-form' backName='contact form' forwardName='newsletter form'
                              forwardUrl='/blocks/newsletter-form'/>
            </div>


            <Helmet>
                <title>Blocks - Multi-Step Form</title>
            </Helmet>
        </aside>
    );
};

export default MultipageForm;
