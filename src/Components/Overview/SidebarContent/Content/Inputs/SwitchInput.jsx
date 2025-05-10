import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {switchInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

const SwitchInput = () => {
    const sectionIds = switchInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // circle switch
    const [circlePreview, setCirclePreview] = useState(true);
    const [circleCode, setCircleCode] = useState(false);

    // square switch
    const [squarePreview, setSquarePreview] = useState(true);
    const [squareCode, setSquareCode] = useState(false);

    // animated switch
    const [animatedSwitchPreview, setAnimatedSwitchPreview] = useState(true);
    const [animatedSwitchCode, setAnimatedSwitchCode] = useState(false);

    // actions
    const [toggle, setToggle] = useState(false);
    const [squareToggle, setSquareToggle] = useState(false);
    const [animatedSwitch, setAnimatedSwitch] = useState(false);
    const [widthIncrease, setWidthIncrease] = useState(false);

    const handleAnimatedSwitch = () => {
        setWidthIncrease(true);
        setTimeout(() => {
            setWidthIncrease(false);
            setAnimatedSwitch(!animatedSwitch);
        }, 300);
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'circle switch'} id={'circle_switch'}/>

                    <ComponentDescription text='This is a circle switch button component. Toggle options with a
            simple tap on the sleek, circular design.'/>

                    <ToggleTab code={circleCode} setCode={setCircleCode} setPreview={setCirclePreview}
                               preview={circlePreview}/>

                    <ComponentWrapper>
                        {circlePreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div
                                    className={`${
                                        squareToggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[70px] h-[40px] p-[0.160rem] border dark:border-slate-700 dark:bg-slate-800 transition-colors cursor-pointer duration-500 border-border  rounded-full relative`}
                                    onClick={() => setSquareToggle(!squareToggle)}
                                >
                                    <div
                                        className={`${
                                            squareToggle ? 'translate-x-[30px] !bg-white' : 'translate-x-[2px]'
                                        } w-[32px] h-[32px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        squareToggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[65px] h-[36px] p-[0.180rem] cursor-pointer dark:border-slate-700 dark:bg-slate-800 border transition-colors duration-500 border-border  rounded-full relative`}
                                    onClick={() => setSquareToggle(!squareToggle)}
                                >
                                    <div
                                        className={`${
                                            squareToggle ? 'translate-x-[28px] !bg-white' : 'translate-x-[2px]'
                                        } w-[28px] h-[28px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        squareToggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[60px] h-[33px] p-[0.180rem] border dark:border-slate-700 dark:bg-slate-800 transition-colors cursor-pointer duration-500 border-border  rounded-full relative`}
                                    onClick={() => setSquareToggle(!squareToggle)}
                                >
                                    <div
                                        className={`${
                                            squareToggle ? 'translate-x-[26px] !bg-white' : 'translate-x-[2px]'
                                        } w-[25px] h-[25px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        squareToggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[57px] h-[30px] px-[0.150rem] dark:border-slate-700 dark:bg-slate-800 cursor-pointer py-[0.160rem] border transition-colors duration-500 border-border  rounded-full relative`}
                                    onClick={() => setSquareToggle(!squareToggle)}
                                >
                                    <div
                                        className={`${
                                            squareToggle ? 'translate-x-[27px] !bg-white' : 'translate-x-[1px]'
                                        } w-[23px] h-[23px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {circleCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const SwitchInput = () => {

    const [isToggle, setIsToggle] = useState(false);

    return (
        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">

            {/* large */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[70px] h-[40px] p-[0.160rem] border dark:border-slate-700 dark:bg-slate-800 transition-colors cursor-pointer duration-500 border-[#e5eaf2]  rounded-full relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle ? "translate-x-[30px] !bg-white" : "translate-x-[2px]"
                    } w-[32px] h-[32px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* medium */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[65px] h-[36px] p-[0.180rem] cursor-pointer dark:border-slate-700 dark:bg-slate-800 border transition-colors duration-500 border-[#e5eaf2]  rounded-full relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle ? "translate-x-[28px] !bg-white" : "translate-x-[2px]"
                    } w-[28px] h-[28px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* small */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[60px] h-[33px] p-[0.180rem] border dark:border-slate-700 dark:bg-slate-800 transition-colors cursor-pointer duration-500 border-[#e5eaf2]  rounded-full relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle ? "translate-x-[26px] !bg-white" : "translate-x-[2px]"
                    } w-[25px] h-[25px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* extra small */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[57px] h-[30px] px-[0.150rem] dark:border-slate-700 dark:bg-slate-800 cursor-pointer py-[0.160rem] border transition-colors duration-500 border-[#e5eaf2]  rounded-full relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle ? "translate-x-[27px] !bg-white" : "translate-x-[1px]"
                    } w-[23px] h-[23px] pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>
        </div>
    );
};

export default SwitchInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Square Switch'} id={'square_switch'}/>
                    </div>

                    <ComponentDescription text='This is a square switch button component. Toggle options with a tap
            on the modern, square design.'/>

                    <ToggleTab code={squareCode} setCode={setSquareCode} setPreview={setSquarePreview}
                               preview={squarePreview}/>

                    <ComponentWrapper>
                        {squarePreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div
                                    className={`${
                                        toggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[70px] h-[40px] py-[0.210rem] dark:border-slate-700 dark:bg-slate-800 px-[0.209rem] cursor-pointer border transition-colors duration-500 border-border  rounded-lg relative`}
                                    onClick={() => setToggle(!toggle)}
                                >
                                    <div
                                        className={`${
                                            toggle
                                                ? 'translate-x-[29px] rotate-[90deg] !bg-white'
                                                : 'translate-x-[0px] rotate-[0deg]'
                                        } w-[31px] h-[31px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        toggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[65px] h-[38px] py-[0.210rem] dark:border-slate-700 dark:bg-slate-800 px-[0.230rem] cursor-pointer border transition-colors duration-500 border-border  rounded-lg relative`}
                                    onClick={() => setToggle(!toggle)}
                                >
                                    <div
                                        className={`${
                                            toggle
                                                ? ' translate-x-[26px] rotate-[90deg] !bg-white'
                                                : 'translate-x-[0px] rotate-[0deg]'
                                        } w-[29px] h-[29px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        toggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[65px] h-[34px] py-[0.138rem] dark:border-slate-700 dark:bg-slate-800 px-[0.200rem] cursor-pointer border transition-colors duration-500 border-border  rounded-lg relative`}
                                    onClick={() => setToggle(!toggle)}
                                >
                                    <div
                                        className={`${
                                            toggle
                                                ? 'translate-x-[30px] rotate-[90deg] !bg-white'
                                                : 'translate-x-[0px] rotate-[0deg]'
                                        } w-[26px] h-[27px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>

                                <div
                                    className={`${
                                        toggle ? '!bg-primary' : 'bg-[#f0f0f0]'
                                    } w-[55px] h-[30px] py-[0.100rem] dark:border-slate-700 dark:bg-slate-800 px-[0.200rem] cursor-pointer border transition-colors duration-500 border-border  rounded-lg relative`}
                                    onClick={() => setToggle(!toggle)}
                                >
                                    <div
                                        className={`${
                                            toggle
                                                ? 'translate-x-[24px] rotate-[90deg] !bg-white'
                                                : 'translate-x-[0px] rotate-[0deg]'
                                        } w-[23px] h-[24px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                                        style={{boxShadow: '1px 2px 5px 2px rgb(0,0,0,0.1)'}}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {squareCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const SwitchInput = () => {

    const [isToggle, setIsToggle] = useState(false);

    return (
        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">

            {/* large */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[70px] h-[40px] py-[0.210rem] dark:border-slate-700 dark:bg-slate-800 px-[0.209rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-lg relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? "translate-x-[29px] rotate-[90deg] !bg-white"
                            : "translate-x-[0px] rotate-[0deg]"
                    } w-[31px] h-[31px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* medium */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[65px] h-[38px] py-[0.210rem] dark:border-slate-700 dark:bg-slate-800 px-[0.230rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-lg relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? " translate-x-[26px] rotate-[90deg] !bg-white"
                            : "translate-x-[0px] rotate-[0deg]"
                    } w-[29px] h-[29px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* small */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[65px] h-[34px] py-[0.138rem] dark:border-slate-700 dark:bg-slate-800 px-[0.200rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-lg relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? "translate-x-[30px] rotate-[90deg] !bg-white"
                            : "translate-x-[0px] rotate-[0deg]"
                    } w-[26px] h-[27px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>

            {/* extra small */}
            <div
                className={`${
                    isToggle ? "!bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                } w-[55px] h-[30px] py-[0.100rem] dark:border-slate-700 dark:bg-slate-800 px-[0.200rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-lg relative`}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? "translate-x-[24px] rotate-[90deg] !bg-white"
                            : "translate-x-[0px] rotate-[0deg]"
                    } w-[23px] h-[24px] transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>
        </div>
    );
};

export default SwitchInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'animated switch'} id={'animated_switch'}/>
                    </div>

                    <ComponentDescription text='Animated switch that provides a smooth transition between on and off
            states for a visually dynamic toggle experience.'/>

                    <ToggleTab code={animatedSwitchCode} setCode={setAnimatedSwitchCode}
                               setPreview={setAnimatedSwitchPreview} preview={animatedSwitchPreview}/>

                    <ComponentWrapper>
                        {animatedSwitchPreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div
                                    className={`${
                                        animatedSwitch
                                            ? '!bg-primary !border-primary'
                                            : 'bg-[#f0f0f0] border-gray-200'
                                    } border relative p-1 rounded-full dark:border-slate-700 dark:bg-slate-800 w-[70px] cursor-pointer transition-all h-[40px] duration-200`}
                                    onClick={handleAnimatedSwitch}
                                >
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div
                                            className={`${
                                                animatedSwitch
                                                    ? 'translate-x-[15px] !bg-white'
                                                    : 'translate-x-[-15px]'
                                            } ${
                                                widthIncrease ? '!w-[37px]' : '!w-[30px]'
                                            } w-[30px] h-[30px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        animatedSwitch
                                            ? '!bg-primary !border-primary'
                                            : 'bg-[#f0f0f0] border-gray-200'
                                    } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[65px] cursor-pointer transition-all h-[37px] duration-200`}
                                    onClick={handleAnimatedSwitch}
                                >
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div
                                            className={`${
                                                animatedSwitch
                                                    ? 'translate-x-[13px] !bg-white'
                                                    : 'translate-x-[-13px]'
                                            } ${
                                                widthIncrease ? '!w-[35px]' : '!w-[28px]'
                                            } w-[28px] h-[28px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        animatedSwitch
                                            ? '!bg-primary !border-primary'
                                            : 'bg-[#f0f0f0] border-gray-200'
                                    } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[60px] cursor-pointer transition-all h-[33px] duration-200`}
                                    onClick={handleAnimatedSwitch}
                                >
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div
                                            className={`${
                                                animatedSwitch
                                                    ? 'translate-x-[13px] !bg-white'
                                                    : 'translate-x-[-13px]'
                                            } ${
                                                widthIncrease ? '!w-[29px]' : '!w-[25px]'
                                            } w-[25px] h-[25px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        animatedSwitch
                                            ? '!bg-primary !border-primary'
                                            : 'bg-[#f0f0f0] border-gray-200'
                                    } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[55px] cursor-pointer transition-all h-[30px] duration-200`}
                                    onClick={handleAnimatedSwitch}
                                >
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div
                                            className={`${
                                                animatedSwitch
                                                    ? 'translate-x-[13px] !bg-white'
                                                    : 'translate-x-[-13px]'
                                            } ${
                                                widthIncrease ? '!w-[25px]' : '!w-[22px]'
                                            } w-[22px] h-[22px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {animatedSwitchCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const SwitchInput = () => {
    const [isToggle, setIsToggle] = useState(false);
    const [widthIncrease, setWidthIncrease] = useState(false);

    const handleAnimatedSwitch = () => {
        setWidthIncrease(true);
        setTimeout(() => {
            setWidthIncrease(false);
            setIsToggle(!isToggle);
        }, 300);
    };

    return (
        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">

            {/* large */}
            <div
                className={`${
                    isToggle
                        ? "!bg-[#3B9DF8] !border-[#3B9DF8]"
                        : "bg-[#f0f0f0] border-gray-200"
                } border relative p-1 rounded-full dark:border-slate-700 dark:bg-slate-800 w-[70px] cursor-pointer transition-all h-[40px] duration-200`}
                onClick={handleAnimatedSwitch}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`${
                            isToggle
                                ? "translate-x-[15px] !bg-white"
                                : "translate-x-[-15px]"
                        } ${
                            widthIncrease ? "!w-[37px]" : "!w-[30px]"
                        } w-[30px] h-[30px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                    ></div>
                </div>
            </div>

            {/* medium */}
            <div
                className={`${
                    isToggle
                        ? "!bg-[#3B9DF8] !border-[#3B9DF8]"
                        : "bg-[#f0f0f0] border-gray-200"
                } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[65px] cursor-pointer transition-all h-[37px] duration-200`}
                onClick={handleAnimatedSwitch}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`${
                            isToggle
                                ? "translate-x-[13px] !bg-white"
                                : "translate-x-[-13px]"
                        } ${
                            widthIncrease ? "!w-[35px]" : "!w-[28px]"
                        } w-[28px] h-[28px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                    ></div>
                </div>
            </div>

            {/* small */}
            <div
                className={`${
                    isToggle
                        ? "!bg-[#3B9DF8] !border-[#3B9DF8]"
                        : "bg-[#f0f0f0] border-gray-200"
                } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[60px] cursor-pointer transition-all h-[33px] duration-200`}
                onClick={handleAnimatedSwitch}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`${
                            isToggle
                                ? "translate-x-[13px] !bg-white"
                                : "translate-x-[-13px]"
                        } ${
                            widthIncrease ? "!w-[29px]" : "!w-[25px]"
                        } w-[25px] h-[25px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                    ></div>
                </div>
            </div>

            {/* extra small */}
            <div
                className={`${
                    isToggle
                        ? "!bg-[#3B9DF8] !border-[#3B9DF8]"
                        : "bg-[#f0f0f0] border-gray-200"
                } border relative p-1 dark:border-slate-700 dark:bg-slate-800 rounded-full w-[55px] cursor-pointer transition-all h-[30px] duration-200`}
                onClick={handleAnimatedSwitch}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className={`${
                            isToggle
                                ? "translate-x-[13px] !bg-white"
                                : "translate-x-[-13px]"
                        } ${
                            widthIncrease ? "!w-[25px]" : "!w-[22px]"
                        } w-[22px] h-[22px] dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SwitchInput;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/input-checkbox'
                        backName='checkbox'
                        forwardName='strong password'
                        forwardUrl='/components/strong-password'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={switchInputContents}/>

            </aside>
            <Helmet>
                <title>Form - Switch</title>
            </Helmet>
        </>
    );
};

export default SwitchInput;
