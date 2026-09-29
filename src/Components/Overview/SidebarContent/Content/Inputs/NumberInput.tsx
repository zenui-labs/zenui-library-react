import {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {numberInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.tsx';
import {FiMinus, FiPlus} from 'react-icons/fi';
import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";

const OtpInput = () => {
    const sectionIds = numberInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // mini input
    const [miniInputPreview, setMiniInputPreview] = useState(true);
    const [miniInputCode, setMiniInputCode] = useState(false);

    // rounded button
    const [roundedButtonPreview, setRoundedButtonPreview] = useState(true);
    const [roundedButtonCode, setRoundedButtonCode] = useState(false);

    // rounded button position
    const [roundedButtonPositionPreview, setRoundedButtonPositionPreview] =
        useState(true);
    const [roundedButtonPositionCode, setRoundedButtonPositionCode] =
        useState(false);

    // actions

    // mini input
    const [miniInputValue, setMiniInputValue] = useState(0);

    const handleMiniIncrement = () => {
        setMiniInputValue((prevValue) => prevValue + 1);
    };

    const handleMiniDecrement = () => {
        setMiniInputValue((prevValue) => prevValue - 1);
    };

    const handleMiniInputValueChange = (e) => {
        setMiniInputValue(Number(e.target.value));
    };

    // rounded button input
    const [roundedInputValue, setRoundedInputValue] = useState(0);

    const handleRoundedIncrement = () => {
        setRoundedInputValue((prevValue) => prevValue + 1);
    };

    const handleRoundedDecrement = () => {
        setRoundedInputValue((prevValue) => prevValue - 1);
    };

    const handleRoundedInputValueChange = (e) => {
        setRoundedInputValue(Number(e.target.value));
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'mini number input'} id={'mini_number_input'}/>

                    <ComponentDescription text='A compact number input for entering small numeric values precisely.'/>

                    <ToggleTab setCode={setMiniInputCode} code={miniInputCode} setPreview={setMiniInputPreview}
                               preview={miniInputPreview}/>

                    <ComponentWrapper>
                        {miniInputPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='flex items-center mx-auto border dark:border-slate-700 border-gray-200 rounded-md'>
                                    <button
                                        className='bg-gray-100 p-[15px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-l-md text-gray-700 text-[1.1rem]'
                                        onClick={handleMiniDecrement}
                                    >
                                        <FiMinus/>
                                    </button>
                                    <input
                                        type='number'
                                        value={miniInputValue}
                                        className='w-[70px] py-2.5 dark:bg-transparent dark:text-[#abc2d3] outline-none focus:ring-0 border-none text-center text-[1.1rem]'
                                        onInput={handleMiniInputValueChange}
                                    />
                                    <button
                                        className='bg-gray-100 p-[15px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-r-md text-gray-700 text-[1.1rem]'
                                        onClick={handleMiniIncrement}
                                    >
                                        <FiPlus/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {miniInputCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FiMinus, FiPlus} from "react-icons/fi";

const NumberInput = () => {

    const [countValue, setCountValue] = useState(0);

    const handleIncrement = () => {
        setCountValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setCountValue((prevValue) => prevValue - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountValue(Number(e.target.value));
    };

    return (
        <div className="flex items-center mx-auto border dark:border-slate-700 border-gray-200 rounded-md">
            <button
                className="bg-gray-100 p-[15px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-l-md text-gray-700 text-[1.1rem]"
                onClick={handleDecrement}
            >
                <FiMinus/>
            </button>
            <input
                type="number"
                value={countValue}
                className="w-[70px] py-2.5 dark:bg-transparent dark:text-[#abc2d3] outline-none focus:ring-0 border-none text-center text-[1.1rem]"
                onInput={handleInputChange}
            />
            <button
                className="bg-gray-100 p-[15px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-r-md text-gray-700 text-[1.1rem]"
                onClick={handleIncrement}
            >
                <FiPlus/>
            </button>
        </div>
    );
};

export default NumberInput;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'rounded button'} id={'rounded_button'}/>
                    </div>

                    <ComponentDescription text='A number input with rounded buttons for increasing or decreasing the value.'/>

                    <ToggleTab setCode={setRoundedButtonCode} code={roundedButtonCode}
                               setPreview={setRoundedButtonPreview} preview={roundedButtonPreview}/>

                    <ComponentWrapper>
                        {roundedButtonPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md'>
                                    <button
                                        className='bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] rounded-full text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedDecrement}
                                    >
                                        <FiMinus/>
                                    </button>
                                    <input
                                        type='number'
                                        value={roundedInputValue}
                                        className='w-[70px] py-2.5 outline-none dark:bg-transparent dark:text-[#abc2d3] focus:ring-0 border-none text-center text-[1.1rem]'
                                        onInput={handleRoundedInputValueChange}
                                    />
                                    <button
                                        className='bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedIncrement}
                                    >
                                        <FiPlus/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {roundedButtonCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FiMinus, FiPlus} from "react-icons/fi";

const NumberInput = () => {

    const [countValue, setCountValue] = useState(0);

    const handleIncrement = () => {
        setCountValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setCountValue((prevValue) => prevValue - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountValue(Number(e.target.value));
    };

    return (
        <div className="flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md">
            <button
                className="bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] rounded-full text-gray-700 text-[1.1rem]"
                onClick={handleDecrement}
            >
                <FiMinus/>
            </button>
            <input
                type="number"
                value={countValue}
                className="w-[70px] py-2.5 outline-none dark:bg-transparent dark:text-[#abc2d3] focus:ring-0 border-none text-center text-[1.1rem]"
                onInput={handleInputChange}
            />
            <button
                className="bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full text-gray-700 text-[1.1rem]"
                onClick={handleIncrement}
            >
                <FiPlus/>
            </button>
        </div>
    );
};

export default NumberInput;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'rounded button position'}
                            id={'rounded_button_position'}
                        />
                    </div>

                    <ComponentDescription text='A number input with rounded buttons that can be placed in different positions around the field.'/>

                    <ToggleTab setCode={setRoundedButtonPositionCode} code={roundedButtonPositionCode}
                               setPreview={setRoundedButtonPositionPreview} preview={roundedButtonPositionPreview}/>

                    <ComponentWrapper>
                        {roundedButtonPositionPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md'>
                                    <button
                                        className='bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] mr-2 rounded-full text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedDecrement}
                                    >
                                        <FiMinus/>
                                    </button>
                                    <button
                                        className='bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] rounded-full text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedIncrement}
                                    >
                                        <FiPlus/>
                                    </button>

                                    <input
                                        type='number'
                                        value={roundedInputValue}
                                        className='w-[70px] px-2 py-2.5 outline-none dark:bg-transparent dark:text-[#abc2d3] focus:ring-0 border-none text-center text-[1.1rem]'
                                        onInput={handleRoundedInputValueChange}
                                    />
                                </div>

                                <div
                                    className='flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md'>
                                    <input
                                        type='number'
                                        value={roundedInputValue}
                                        className='w-[70px] px-2 py-2.5 dark:bg-transparent dark:text-[#abc2d3] outline-none focus:ring-0 border-none text-center text-[1.1rem]'
                                        onInput={handleRoundedInputValueChange}
                                    />
                                    <button
                                        className='bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedDecrement}
                                    >
                                        <FiMinus/>
                                    </button>
                                    <button
                                        className='bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full ml-2 text-gray-700 text-[1.1rem]'
                                        onClick={handleRoundedIncrement}
                                    >
                                        <FiPlus/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {roundedButtonPositionCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FiMinus, FiPlus} from "react-icons/fi";

const NumberInput = () => {

    const [countValue, setCountValue] = useState(0);

    const handleIncrement = () => {
        setCountValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setCountValue((prevValue) => prevValue - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountValue(Number(e.target.value));
    };

    return (
        <>
            {/* left button number input */}
            <div className="flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md">
                <button
                    className="bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] mr-2 rounded-full text-gray-700 text-[1.1rem]"
                    onClick={handleDecrement}
                >
                    <FiMinus/>
                </button>
                <button
                    className="bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] rounded-full text-gray-700 text-[1.1rem]"
                    onClick={handleIncrement}
                >
                    <FiPlus/>
                </button>

                <input
                    type="number"
                    value={countValue}
                    className="w-[70px] px-2 py-2.5 outline-none dark:bg-transparent dark:text-[#abc2d3] focus:ring-0 border-none text-center text-[1.1rem]"
                    onInput={handleInputChange}
                />
            </div>

            {/* right button number input */}
            <div className="flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md">
                <input
                    type="number"
                    value={countValue}
                    className="w-[70px] px-2 py-2.5 dark:bg-transparent dark:text-[#abc2d3] outline-none focus:ring-0 border-none text-center text-[1.1rem]"
                    onInput={handleInputChange}
                />
                <button
                    className="bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full text-gray-700 text-[1.1rem]"
                    onClick={handleDecrement}
                >
                    <FiMinus/>
                </button>
                <button
                    className="bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full ml-2 text-gray-700 text-[1.1rem]"
                    onClick={handleIncrement}
                >
                    <FiPlus/>
                </button>
            </div>
        </>
    );
};

export default NumberInput;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/input-textarea'
                        backName='textarea'
                        forwardUrl='/components/input-checkbox'
                        forwardName='checkbox'
                    />
                </div>

                <ContentNavbar contents={numberInputContents} width='55%' activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Form - Number</title>
            </Helmet>
        </>
    );
};

export default OtpInput;
