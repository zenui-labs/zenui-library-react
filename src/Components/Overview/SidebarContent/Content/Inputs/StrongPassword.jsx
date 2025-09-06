import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {strongPasswordContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';
import {IoEyeOffOutline, IoEyeOutline} from 'react-icons/io5';
import {MdDone, MdErrorOutline} from 'react-icons/md';
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {RxCross1} from 'react-icons/rx';

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

const OtpInput = () => {
    const sectionIds = strongPasswordContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // strong password checking input
    const [strongPasswordCheckingPreview, setStrongPasswordCheckingPreview] =
        useState(true);
    const [StrongPasswordCheckingCode, setStrongPasswordCheckingCode] =
        useState(false);

    // check by indicator
    const [checkIndicatorPreview, setCheckIndicatorPreview] = useState(true);
    const [checkIndicatorCode, setCheckIndicatorCode] = useState(false);

    // checkHint
    const [checkHintPreview, setCheckHintPreview] = useState(true);
    const [checkHintCode, setCheckHintCode] = useState(false);

    // hintDropdown
    const [hintDropdownPreview, setHintDropdownPreview] = useState(true);
    const [hintDropdownCode, setHintDropdownCode] = useState(false);

    // actions
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [StrongPassword, setStrongPassword] = useState('');
    const [signal, setSignal] = useState('');

    const handleStrongPasswordCheckingChange = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasLowerCase) {
            setSignal('lowercase-error');
        } else if (!hasUpperCase) {
            setSignal('uppercase-error');
        } else if (!hasNumber) {
            setSignal('number-error');
        } else if (!hasSymbol) {
            setSignal('symbol-error');
        } else if (password.length < 8) {
            setSignal('length-error');
        } else {
            setSignal('strong');
        }
    };

    const getErrorText = () => {
        switch (signal) {
            case 'length-error':
                return 'Password must be at least 8 characters long.';
            case 'uppercase-error':
                return 'Password must contain at least one uppercase letter.';
            case 'lowercase-error':
                return 'Password must contain at least one lowercase letter.';
            case 'number-error':
                return 'Password must contain at least one number.';
            case 'symbol-error':
                return 'Password must contain at least one special character.';
            default:
                return 'Wow! Very strong password.';
        }
    };

    const [signal2, setSignal2] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
        length: false,
        strong: false,
    });

    const countTrueItems = (obj) => {
        const totalItems = Object.keys(obj).length;
        const trueItems = Object.values(obj).filter((item) => item).length;
        return (trueItems / totalItems) * 100;
    };

    const strengthProgress = Math.floor(countTrueItems(signal2));

    const [StrongPassword2, setStrongPassword2] = useState('');

    const handleStrongPasswordCheckingChange2 = (e) => {
        const password = e.target.value;
        setStrongPassword2(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setSignal2({
            lowercase: hasLowerCase,
            uppercase: hasUpperCase,
            number: hasNumber,
            symbol: hasSymbol,
            length: password.length >= 8,
            strong:
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSymbol &&
                password.length >= 8,
        });
    };

    // show hint in dropdown
    const [hintDropdownOpen, setHintDropdownOpen] = useState(false);

    const hintList = [
        {
            text: 'Minimum number of characters is 8.',
            type: 'length'
        },
        {
            text: 'Should contain uppercase.',
            type: 'uppercase'
        },
        {
            text: 'Should contain lowercase.',
            type: 'lowercase'
        },
        {
            text: 'Should contain numbers.',
            type: 'number'
        },
        {
            text: 'Should contain special characters.',
            type: 'symbol'
        },
    ]

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'check inline'} id={'check_inline'}/>

                    <ComponentDescription text='Inline password strength checker that evaluates and displays the
            strength of your password in real-time as you type.'/>

                    <ToggleTab code={StrongPasswordCheckingCode} setCode={setStrongPasswordCheckingCode}
                               preview={strongPasswordCheckingPreview} setPreview={setStrongPasswordCheckingPreview}/>

                    <ComponentWrapper>
                        {strongPasswordCheckingPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full 1024px:w-[80%]'>
                                    <label
                                        htmlFor='password'
                                        className='text-[15px] dark:text-[#abc2d3] text-text font-[400]'
                                    >
                                        Password
                                    </label>
                                    <div className='w-full relative'>
                                        <input
                                            type={isEyeOpen ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            onChange={handleStrongPasswordCheckingChange}
                                            placeholder='Password'
                                            className='peer border-border dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-primary transition-colors duration-300'
                                        />

                                        {StrongPassword !== '' && (
                                            <p
                                                className={`${
                                                    signal === 'normal'
                                                        ? 'text-red-500'
                                                        : 'text-green-600'
                                                } text-[0.9rem] mt-1`}
                                            >
                                                {signal === 'strong' ? (
                                                    <p className='text-green-600 flex items-center gap-[5px]'>
                                                        <IoCheckmarkDoneCircleSharp className='text-[1.1rem]'/>
                                                        {getErrorText()}
                                                    </p>
                                                ) : (
                                                    <p className='text-red-500 flex items-center gap-[5px]'>
                                                        <MdErrorOutline className='text-[1.1rem]'/>
                                                        {getErrorText()}
                                                    </p>
                                                )}
                                            </p>
                                        )}

                                        {isEyeOpen ? (
                                            <IoEyeOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(false)}
                                            />
                                        ) : (
                                            <IoEyeOffOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {StrongPasswordCheckingCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoCheckmarkDoneCircleSharp, IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdErrorOutline} from "react-icons/md";

const StrongPassword = () => {

    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [StrongPassword, setStrongPassword] = useState("");
    const [signal, setSignal] = useState("");

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasLowerCase) {
            setSignal("lowercase-error");
        } else if (!hasUpperCase) {
            setSignal("uppercase-error");
        } else if (!hasNumber) {
            setSignal("number-error");
        } else if (!hasSymbol) {
            setSignal("symbol-error");
        } else if (password.length < 8) {
            setSignal("length-error");
        } else {
            setSignal("strong");
        }
    };

    const getErrorText = () => {
        switch (signal) {
            case "length-error":
                return "Password must be at least 8 characters long.";
                break;
            case "uppercase-error":
                return "Password must contain at least one uppercase letter.";
                break;
            case "lowercase-error":
                return "Password must contain at least one lowercase letter.";
                break;
            case "number-error":
                return "Password must contain at least one number.";
                break;
            case "symbol-error":
                return "Password must contain at least one special character.";
                break;
            default:
                return "Wow! Very strong password.";
        }
    };

    return (
        <div className="w-full md:w-[80%]">
            <label
                htmlFor="password"
                className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]"
            >
                Password
            </label>
            <div className="w-full relative">
                <input
                    type={isEyeOpen ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                />

                {StrongPassword !== "" && (
                    <p
                        className={`${
                            signal === "normal"
                                ? "text-red-500"
                                : "text-green-600"
                        } text-[0.9rem] mt-1`}
                    >
                        {signal === "strong" ? (
                            <p className="text-green-600 flex items-center gap-[5px]">
                                <IoCheckmarkDoneCircleSharp className="text-[1.1rem]"/>
                                {getErrorText()}
                            </p>
                        ) : (
                            <p className="text-red-500 flex items-center gap-[5px]">
                                <MdErrorOutline className="text-[1.1rem]"/>
                                {getErrorText()}
                            </p>
                        )}
                    </p>
                )}

                {isEyeOpen ? (
                    <IoEyeOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(false)}
                    />
                ) : (
                    <IoEyeOffOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default StrongPassword;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'check by indicator'}
                            id={'check_by_indicator'}
                        />
                    </div>

                    <ComponentDescription text='Inline checker with indicators to visually show the status or
            validity of your input, providing real-time feedback.'/>

                    <ToggleTab code={checkIndicatorCode} setCode={setCheckIndicatorCode}
                               setPreview={setCheckIndicatorPreview} preview={checkIndicatorPreview}/>

                    <ComponentWrapper>
                        {checkIndicatorPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full 1024px:w-[80%]'>
                                    <label
                                        htmlFor='password'
                                        className='text-[15px] dark:text-[#abc2d3] text-text font-[400]'
                                    >
                                        Password
                                    </label>
                                    <div className='w-full relative'>
                                        <input
                                            type={isEyeOpen ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            onChange={handleStrongPasswordCheckingChange2}
                                            placeholder='Password'
                                            className='peer border-border dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-primary transition-colors duration-300'
                                        />

                                        <div className='w-full mt-2 flex items-center gap-[5px]'>
                                            {
                                                [0, 16, 33, 50, 90].map((progress, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${
                                                            strengthProgress > progress ? 'bg-green-500' : 'dark:bg-slate-700 bg-gray-200'
                                                        } h-[9px] w-full rounded-md`}
                                                    ></div>
                                                ))
                                            }
                                        </div>

                                        {isEyeOpen ? (
                                            <IoEyeOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(false)}
                                            />
                                        ) : (
                                            <IoEyeOffOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {checkIndicatorCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

const StrongPassword = () => {

    const [isEyeOpen, setIsEyeOpen] = useState(false);

    const [signal, setSignal] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
        length: false,
        strong: false,
    });

    const countTrueItems = (obj) => {
        const totalItems = Object.keys(obj).length;
        const trueItems = Object.values(obj).filter((item) => item).length;
        return (trueItems / totalItems) * 100;
    };

    const strengthProgress = Math.floor(countTrueItems(signal));

    const [StrongPassword, setStrongPassword] = useState("");

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setSignal({
            lowercase: hasLowerCase,
            uppercase: hasUpperCase,
            number: hasNumber,
            symbol: hasSymbol,
            length: password.length >= 8,
            strong:
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSymbol &&
                password.length >= 8,
        });
    };

    return (
        <div className="w-full md:w-[80%]">
            <label
                htmlFor="password"
                className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]"
            >
                Password
            </label>
            <div className="w-full relative">
                <input
                    type={isEyeOpen ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                />

                <div className="w-full mt-2 flex items-center gap-[5px]">
                    {
                        [0, 16, 33, 50, 90].map((progress, index) => (
                            <div
                                key={index}
                                className={`${
                                    strengthProgress > progress ? "bg-green-500" : "dark:bg-slate-700 bg-gray-200"
                                } h-[9px] w-full rounded-md`}
                            ></div>
                        ))
                    }
                </div>

                {isEyeOpen ? (
                    <IoEyeOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(false)}
                    />
                ) : (
                    <IoEyeOffOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default StrongPassword;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'check password with hint'}
                            id={'check_password_with_hint'}
                        />
                    </div>

                    <ComponentDescription text='Password input field with real-time strength checks and helpful
            hints to guide you in creating a stronger password.'/>

                    <ToggleTab code={checkHintCode} setCode={setCheckHintCode} preview={checkHintPreview}
                               setPreview={setCheckHintPreview}/>

                    <ComponentWrapper>
                        {checkHintPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full 1024px:w-[80%]'>
                                    <label
                                        htmlFor='password'
                                        className='text-[15px] dark:text-[#abc2d3] text-text font-[400]'
                                    >
                                        Password
                                    </label>
                                    <div className='w-full relative'>
                                        <input
                                            type={isEyeOpen ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            onChange={handleStrongPasswordCheckingChange2}
                                            placeholder='Password'
                                            className='peer border-border dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-primary transition-colors duration-300'
                                        />

                                        <h3 className='text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem] mt-4'>
                                            Your password must contain:
                                        </h3>

                                        <div className='w-full mt-2 flex-col flex gap-[6px]'>
                                            {
                                                hintList?.map((hint, index) => (
                                                    <div
                                                        key={index}
                                                        className={`${
                                                            signal2[hint.type] ? 'text-green-500' : 'dark:text-slate-500 text-gray-500'
                                                        } text-[0.8rem] flex items-center gap-[8px]`}
                                                    >
                                                        {signal2[hint.type] ? (
                                                            <MdDone className={`text-[1rem]`}/>
                                                        ) : (
                                                            <RxCross1/>
                                                        )}
                                                        {hint.text}
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        {isEyeOpen ? (
                                            <IoEyeOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(false)}
                                            />
                                        ) : (
                                            <IoEyeOffOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {checkHintCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

const StrongPassword = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [signal, setSignal] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
        length: false,
        strong: false,
    });

    const [StrongPassword, setStrongPassword] = useState("");

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setSignal({
            lowercase: hasLowerCase,
            uppercase: hasUpperCase,
            number: hasNumber,
            symbol: hasSymbol,
            length: password.length >= 8,
            strong:
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSymbol &&
                password.length >= 8,
        });
    };

    const hintList = [
        {
            text: "Minimum number of characters is 8.",
            type: "length"
        },
        {
            text: "Should contain uppercase.",
            type: "uppercase"
        },
        {
            text: "Should contain lowercase.",
            type: "lowercase"
        },
        {
            text: "Should contain numbers.",
            type: "number"
        },
        {
            text: "Should contain special characters.",
            type: "symbol"
        },
    ]

    return (
        <div className="w-full md:w-[80%]">
            <label
                htmlFor="password"
                className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]"
            >
                Password
            </label>
            <div className="w-full relative">
                <input
                    type={isEyeOpen ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                />

                <h3 className="text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem] mt-4">
                    Your password must contain:
                </h3>

                <div className="w-full mt-2 flex-col flex gap-[6px]">
                    {
                        hintList?.map((hint, index) => (
                            <div
                                key={index}
                                className={`${
                                    signal[hint.type] ? "text-green-500" : "dark:text-slate-500 text-gray-500"
                                } text-[0.8rem] flex items-center gap-[8px]`}
                            >
                                {signal[hint.type] ? (
                                    <MdDone className={`text-[1rem]`}/>
                                ) : (
                                    <RxCross1/>
                                )}
                                {hint.text}
                            </div>
                        ))
                    }
                </div>

                {isEyeOpen ? (
                    <IoEyeOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(false)}
                    />
                ) : (
                    <IoEyeOffOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default StrongPassword;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'show hint in dropdown'}
                            id={'show_hint_in_dropdown'}
                        />
                    </div>

                    <ComponentDescription text='Displays hints in a dropdown menu to provide additional guidance or
            suggestions based on user input.'/>

                    <ToggleTab code={hintDropdownCode} setCode={setHintDropdownCode} setPreview={setHintDropdownPreview}
                               preview={hintDropdownPreview}/>

                    <ComponentWrapper>
                        {hintDropdownPreview && (
                            <div
                                className={`p-8 ${
                                    hintDropdownOpen ? 'mb-48' : 'mb-4'
                                } transition-all duration-300 flex items-center flex-col gap-5 justify-center`}
                            >
                                <div className='w-full 1024px:w-[80%]'>
                                    <label
                                        htmlFor='password'
                                        className='text-[15px] dark:text-[#abc2d3] text-text font-[400]'
                                    >
                                        Password
                                    </label>
                                    <div className='w-full relative'>
                                        <input
                                            type={isEyeOpen ? 'text' : 'password'}
                                            name='password'
                                            id='password'
                                            onChange={handleStrongPasswordCheckingChange2}
                                            onFocus={() => setHintDropdownOpen(true)}
                                            onBlur={() => {
                                                setHintDropdownOpen(false);
                                            }}
                                            placeholder='Password'
                                            className='peer border-border dark:border-slate-600 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-primary transition-colors duration-300'
                                        />

                                        <div
                                            className={`${
                                                hintDropdownOpen
                                                    ? 'opacity-100 translate-y-0 z-30'
                                                    : 'opacity-0 translate-y-[-10px] z-[-1]'
                                            } bg-white boxShadow dark:bg-slate-800 rounded-md py-3 px-4 absolute top-[60px] left-0 w-full transition-all duration-300`}
                                        >
                                            <h3 className='text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem]'>
                                                Your password must contain:
                                            </h3>

                                            <div className='w-full mt-2 flex-col flex gap-[6px]'>
                                                {
                                                    hintList?.map((hint, index) => (
                                                        <div
                                                            key={index}
                                                            className={`${
                                                                signal2[hint.type] ? 'text-green-500' : 'dark:text-slate-400 text-gray-500'
                                                            } text-[0.8rem] flex items-center gap-[8px]`}
                                                        >
                                                            {signal2[hint.type] ? (
                                                                <MdDone className={`text-[1rem]`}/>
                                                            ) : (
                                                                <RxCross1/>
                                                            )}
                                                            {hint.text}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        {isEyeOpen ? (
                                            <IoEyeOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(false)}
                                            />
                                        ) : (
                                            <IoEyeOffOutline
                                                className=' absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer'
                                                onClick={() => setIsEyeOpen(true)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {hintDropdownCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

const StrongPassword = () => {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [signal, setSignal] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        symbol: false,
        length: false,
        strong: false,
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [StrongPassword, setStrongPassword] = useState("");

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setStrongPassword(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setSignal({
            lowercase: hasLowerCase,
            uppercase: hasUpperCase,
            number: hasNumber,
            symbol: hasSymbol,
            length: password.length >= 8,
            strong:
                hasUpperCase &&
                hasLowerCase &&
                hasNumber &&
                hasSymbol &&
                password.length >= 8,
        });
    };

    const hintList = [
        {
            text: "Minimum number of characters is 8.",
            type: "length"
        },
        {
            text: "Should contain uppercase.",
            type: "uppercase"
        },
        {
            text: "Should contain lowercase.",
            type: "lowercase"
        },
        {
            text: "Should contain numbers.",
            type: "number"
        },
        {
            text: "Should contain special characters.",
            type: "symbol"
        },
    ]

    return (
        <div className="w-full 1024px:w-[80%]">
            <label
                htmlFor="password"
                className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]"
            >
                Password
            </label>
            <div className="w-full relative">
                <input
                    type={isEyeOpen ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handlePasswordChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => {
                        setIsDropdownOpen(false);
                    }}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                />

                <div
                    className={`${
                        isDropdownOpen
                            ? "opacity-100 translate-y-0 z-30"
                            : "opacity-0 translate-y-[-10px] z-[-1]"
                    } bg-white boxShadow dark:bg-slate-800 rounded-md py-3 px-4 absolute top-[60px] left-0 w-full transition-all duration-300`}
                >
                    <h3 className="text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem]">
                        Your password must contain:
                    </h3>

                    <div className="w-full mt-2 flex-col flex gap-[6px]">
                        {
                            hintList?.map((hint, index) => (
                                <div
                                    key={index}
                                    className={`${
                                        signal[hint.type] ? "text-green-500" : "dark:text-slate-400 text-gray-500"
                                    } text-[0.8rem] flex items-center gap-[8px]`}
                                >
                                    {signal[hint.type] ? (
                                        <MdDone className={`text-[1rem]`}/>
                                    ) : (
                                        <RxCross1/>
                                    )}
                                    {hint.text}
                                </div>
                            ))
                        }
                    </div>
                </div>

                {isEyeOpen ? (
                    <IoEyeOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(false)}
                    />
                ) : (
                    <IoEyeOffOutline
                        className=" absolute top-4 right-4 dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default StrongPassword;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/input-switch'
                        backName='switch'
                        forwardUrl='/components/input-select'
                        forwardName='select'
                    />
                </div>

                <ContentNavbar contents={strongPasswordContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Form - Strong Password</title>
            </Helmet>
        </>
    );
};

export default OtpInput;
