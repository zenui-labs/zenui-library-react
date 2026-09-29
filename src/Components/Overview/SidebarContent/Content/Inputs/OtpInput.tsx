import {useState, useRef} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";

// react helmet
import {Helmet} from "react-helmet";

// showing the code
import Showcode from "@shared/Component/ShowCode.tsx";

// contents for scrollspy
import {otpInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from '@shared/Component/ComponentDescription.tsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.tsx';
import ToggleTab from '@shared/Component/ToggleTab.tsx';
import ContentNavbar from '@shared/Component/ContentNavbar.tsx';

const OtpInput = () => {
    const sectionIds = otpInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // custom navigation
    const [customNavigatePreview, setCustomNavigationPreview] = useState(true);
    const [customNavigationCode, setCustomNavigationCode] = useState(false);

    // auto navigation
    const [autoNavigationPreview, setAutoNavigationPreview] = useState(true);
    const [autoNavigationCode, setAutoNavigationCode] = useState(false);

    // actions
    const [autoOtp, setAutoOtp] = useState('')

    const length = 4

    const onChange = (value: string) => {
        setAutoOtp(value)
    }
    const autoNavigationInputs = useRef([])

    const handleAutoNavigationInputChange = (e, index) => {
        const {value} = e.target;
        const newOtp = [...autoNavigationInputs.current.map(input => input.value)];

        // Ensure only a single digit is entered per box
        if (/^[0-9]$/.test(value) && value.length === 1) {
            newOtp[index] = value;
            onChange(newOtp.join(''));

            if (index < length - 1) {
                autoNavigationInputs.current[index + 1].focus();
            }
        } else if (value === '') {
            newOtp[index] = '';
            onChange(newOtp.join(''));
        } else {
            e.target.value = value.slice(0, 1);
        }
    };

    const handleAutoNavigationPaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
        const newOtp = [...autoNavigationInputs.current.map(input => input.value)];

        for (let i = 0; i < pastedData.length && i < length; i++) {
            newOtp[i] = pastedData[i];
            autoNavigationInputs.current[i].value = pastedData[i];
        }
        onChange(newOtp.join(''));

        const focusIndex = Math.min(pastedData.length, length - 1);
        autoNavigationInputs.current[focusIndex].focus();
    };

    // for custom navigation
    const handleCustomNavigationInputChange = (e, index) => {
        const {value} = e.target;
        const newOtp = [...autoNavigationInputs.current.map(input => input.value)];

        if (/^[0-9]$/.test(value) && value.length === 1) {
            newOtp[index] = value;
            onChange(newOtp.join(''));
        } else if (value === '') {
            newOtp[index] = '';
            onChange(newOtp.join(''));
        } else {
            e.target.value = value.slice(0, 1);
        }
    };

    const handleAutoNavigationKeydown = (e, index) => {
        if (e.key === 'Backspace' && !autoNavigationInputs.current[index].value && index > 0) {
            autoNavigationInputs.current[index - 1].focus()
        }
    }

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"custom navigation"} id={"custom_navigation"}/>

                    <ComponentDescription
                        text='A custom OTP input with navigation controls that move focus between the digit fields.'/>

                    <ToggleTab code={customNavigationCode} setCode={setCustomNavigationCode}
                               preview={customNavigatePreview} setPreview={setCustomNavigationPreview}/>

                    <ComponentWrapper>
                        {customNavigatePreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='grid grid-cols-4 gap-[10px] w-full 1024px:w-[50%]'>
                                    {
                                        Array.from({length}).map((_, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (autoNavigationInputs.current[index] = el)}
                                                className='p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-primary'
                                                placeholder='0'
                                                onWheel={(e) => e.currentTarget.blur()}
                                                onChange={(e) => handleCustomNavigationInputChange(e, index)}
                                                type='number'
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {customNavigationCode && (
                            <Showcode
                                code='
import React, {useRef, useState} from "react";

const OtpInput = () => {
    const [autoOtp, setAutoOtp] = useState("")
    const navigationInputs = useRef<HTMLInputElement[]>([])

    const length = 4

    const onChange = (value: string) => {
        setAutoOtp(value)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const newOtp = [...navigationInputs.current.map(input => input.value)];

        if (/^[0-9]$/.test(value) && value.length === 1) {
            newOtp[index] = value;
            onChange(newOtp.join(""));
        } else if (value === "") {
            newOtp[index] = "";
            onChange(newOtp.join(""));
        } else {
            e.target.value = value.slice(0, 1);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-[10px] w-full md:w-[50%]">
            {
                Array.from({length}).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            if (el) navigationInputs.current[index] = el;
                        }}
                        className="p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8]"
                        placeholder="0"
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleInputChange(e, index)}
                        type="number"
                    />
                ))
            }
        </div>
    );
};

export default OtpInput;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader text={"Keyboard navigation"} id={"keyboard_navigation"}/>
                    </div>

                    <ComponentDescription
                        text='An OTP input with keyboard navigation. Arrow keys move between digits, and pasted codes keep only the numbers.'/>

                    <ToggleTab code={autoNavigationCode} setCode={setAutoNavigationCode}
                               setPreview={setAutoNavigationPreview} preview={autoNavigationPreview}/>

                    <ComponentWrapper>
                        {autoNavigationPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='grid grid-cols-4 gap-[10px] w-full 1024px:w-[50%]'>
                                    {
                                        Array.from({length}).map((_, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (autoNavigationInputs.current[index] = el)}
                                                className='p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-primary'
                                                placeholder='0'
                                                onWheel={(e) => e.currentTarget.blur()}
                                                onChange={(e) => handleAutoNavigationInputChange(e, index)}
                                                onKeyDown={(e) => handleAutoNavigationKeydown(e, index)}
                                                onPaste={(e) => handleAutoNavigationPaste(e, index)}
                                                type='number'
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {autoNavigationCode && (
                            <Showcode
                                code='
import React, {useRef, useState} from "react";

const OtpInput = () => {
    const [autoOtp, setAutoOtp] = useState("")
    const navigationInputs = useRef<HTMLInputElement[]>([])

    const length = 4

    const onChange = (value: string) => {
        setAutoOtp(value)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const newOtp = [...navigationInputs.current.map(input => input.value)];

        // Ensure only a single digit is entered per box
        if (/^[0-9]$/.test(value) && value.length === 1) {
            newOtp[index] = value;
            onChange(newOtp.join(""));

            if (index < length - 1) {
                navigationInputs.current[index + 1].focus();
            }
        } else if (value === "") {
            newOtp[index] = "";
            onChange(newOtp.join(""));
        } else {
            e.target.value = value.slice(0, 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
        const newOtp = [...navigationInputs.current.map(input => input.value)];

        for (let i = 0; i < pastedData.length && i < length; i++) {
            newOtp[i] = pastedData[i];
            navigationInputs.current[i].value = pastedData[i];
        }
        onChange(newOtp.join(""));

        const focusIndex = Math.min(pastedData.length, length - 1);
        navigationInputs.current[focusIndex].focus();
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !navigationInputs.current[index].value && index > 0) {
            navigationInputs.current[index - 1].focus()
        }
    }

    return (
        <div className="grid grid-cols-4 gap-[10px] w-full md:w-[50%]">
            {
                Array.from({length}).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            if (el) navigationInputs.current[index] = el;
                        }}
                        className="p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8]"
                        placeholder="0"
                        onWheel={(e) => e.currentTarget.blur()}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeydown(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                        type="number"
                    />
                ))
            }
        </div>
    );
};

export default OtpInput;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/input-file' backName='file' forwardName='normal button'
                                    forwardUrl='/components/normal-button'/>
                </div>

                <ContentNavbar contents={otpInputContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Form - OTP Input</title>
            </Helmet>
        </>
    );
};

export default OtpInput;