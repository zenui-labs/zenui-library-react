import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {authButtonContents} from '@utils/ContentsConfig/ButtonsContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const AuthButton = () => {
    const sectionIds = authButtonContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // login with google buttons
    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);

    // apple login button
    const [appleLoginButtonPreview, setAppleLoginButtonPreview] = useState(true);
    const [appleLoginButtonCode, setAppleLoginButtonCode] = useState(false);

    // social bg button
    const [socialBgButtonPreview, setSocialBgButtonPreview] = useState(true);
    const [socialBgButtonCode, setSocialBgButtonCode] = useState(false);

    // social border button
    const [socialBorderButtonPreview, setSocialBorderButtonPreview] = useState(true);
    const [socialBorderButtonCode, setSocialBorderButtonCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"login with google"} id={"login_with_google"}/>

                <ComponentDescription
                    text='Button for logging in with Google, offering a quick and secure way to authenticate using your Google account.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 mb-4 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <button
                                className='border border-border dark:border-slate-600 dark:text-[#abc2d3] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-text hover:bg-gray-50 transition-all duration-200'>
                                <img src='https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png' alt='google logo'
                                     className='w-[23px]'/>
                                Sign in with Google
                            </button>

                            <button
                                className='bg-primary text-white rounded-md py-1 pl-1 pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200'>
                                <div className='py-2 px-2.5 rounded-l-md bg-white'>
                                    <img src='https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png'
                                         alt='google logo'
                                         className='w-[23px]'/>
                                </div>
                                Sign in with Google
                            </button>

                            <button
                                className='bg-primary text-white rounded-md py-[5px] pl-[5px] pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200'>
                                <div className='p-2 rounded-full bg-white'>
                                    <img src='https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png'
                                         alt='google logo'
                                         className='w-[23px]'/>
                                </div>
                                Sign in with Google
                            </button>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code='
            {/* bordered google login button */}
            <button
                className="border border-[#e5eaf2] dark:border-slate-600 dark:text-[#abc2d3] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200">
                <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                     className="w-[23px]"/>
                Sign in with Google
            </button>

            {/* background google login button */}
            <button
                className="bg-[#3B9DF8] text-white rounded-md py-1 pl-1 pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200">
                <div className="py-2 px-2.5 rounded-l-md bg-white">
                    <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                         alt="google logo"
                         className="w-[23px]"/>
                </div>
                Sign in with Google
            </button>

            {/* logo circle background with solid background login button */}
            <button
                className="bg-[#3B9DF8] text-white rounded-md py-[5px] pl-[5px] pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200">
                <div className="p-2 rounded-full bg-white">
                    <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                         alt="google logo"
                         className="w-[23px]"/>
                </div>
                Sign in with Google
            </button>
                    '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"login with apple"} id={"login_with_apple"}/>
                </div>

                <ComponentDescription
                    text='Button for logging in with Apple, providing a seamless and private way to sign in using your Apple ID.'/>

                <ToggleTab setCode={setAppleLoginButtonCode} code={appleLoginButtonCode}
                           setPreview={setAppleLoginButtonPreview} preview={appleLoginButtonPreview}/>

                <ComponentWrapper>
                    {appleLoginButtonPreview && (
                        <div className="p-8 mb-4 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <button
                                className='bg-black text-white dark:bg-slate-800 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] '>
                                <img src='https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png' alt='google logo'
                                     className='w-[23px]'/>
                                Continue with Apple
                            </button>

                            <button
                                className='border border-border dark:border-slate-600 dark:text-[#abc2d3] text-text rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] hover:bg-gray-50 transition-all duration-200'>
                                <img src='https://i.ibb.co/6NFjc6z/download-removebg-preview.png' alt='google logo'
                                     className='w-[23px]'/>
                                Continue with Apple
                            </button>
                        </div>
                    )}

                    {appleLoginButtonCode &&
                        <ShowCode code='
            {/* black background button */}
            <button
                className="bg-black text-white dark:bg-slate-800 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] ">
                <img src="https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png" alt="google logo"
                     className="w-[23px]"/>
                Continue with Apple
            </button>

            {/* white background button */}
            <button
                className="border border-[#e5eaf2] text-text rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] hover:bg-gray-50 transition-all duration-200">
                <img src="https://i.ibb.co/6NFjc6z/download-removebg-preview.png" alt="google logo"
                     className="w-[23px]"/>
                Continue with Apple
            </button>
                    '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Social Login background"} id={"social_login_background"}/>
                </div>

                <ComponentDescription
                    text='Background design for social login buttons, enhancing the visual appeal and consistency of social authentication options.'/>

                <ToggleTab setCode={setSocialBgButtonCode} code={socialBgButtonCode}
                           setPreview={setSocialBgButtonPreview} preview={socialBgButtonPreview}/>

                <ComponentWrapper>
                    {socialBgButtonPreview && (
                        <div className="p-8 mb-4 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <button
                                className='bg-black text-white dark:bg-slate-800 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] '>
                                <img src='https://i.ibb.co/w4xtRf9/download-10-removebg-preview.png' alt='Github logo'
                                     className='w-[35px]'/>
                                Continue with Github
                            </button>

                            <button
                                className='bg-[#0a66c2] text-white rounded-md py-[11px] px-[15px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdc3a7f08d5fb21fa73_linkedin-white.svg'
                                    alt='Linkedin logo'
                                    className='w-[25px]'/>
                                Continue with Linkedin
                            </button>

                            <button
                                className='bg-[#ea4c89] text-white rounded-md py-[11px] px-[19px] flex items-center gap-[10px] text-[1rem] '>
                                <img src='https://i.ibb.co/8BcCFQv/download-11-removebg-preview.png' alt='Dribble logo'
                                     className='w-[25px]'/>
                                Continue with Dribble
                            </button>

                            <button
                                className='bg-[#1777f2] text-white rounded-md py-[11px] px-[10px] flex items-center gap-[10px] text-[1rem] '>
                                <img src='https://i.ibb.co/GP1q2C7/download-12-removebg-preview.png' alt='Facebook logo'
                                     className='w-[25px]'/>
                                Continue with Facebook
                            </button>

                            <button
                                className='bg-[#1db954] text-white rounded-md py-[11px] px-[19px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdbd49f28d441099203_spotify-white.svg'
                                    alt='Spotify logo'
                                    className='w-[25px]'/>
                                Continue with Spotify
                            </button>

                            <button
                                className='bg-[#2f2f2f] text-white rounded-md py-[11px] px-[10px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg'
                                    alt='Microsoft logo'
                                    className='w-[25px]'/>
                                Continue with Microsoft
                            </button>
                        </div>
                    )}

                    {socialBgButtonCode &&
                        <ShowCode code='
            {/* github button */}
            <button
                className="bg-black text-white dark:bg-slate-800 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] ">
                <img src="https://i.ibb.co/w4xtRf9/download-10-removebg-preview.png" alt="Github logo"
                     className="w-[35px]"/>
                Continue with Github
            </button>

            {/* linkedin button */}
            <button
                className="bg-[#0a66c2] text-white rounded-md py-[11px] px-[15px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdc3a7f08d5fb21fa73_linkedin-white.svg"
                    alt="Linkedin logo"
                    className="w-[25px]"/>
                Continue with Linkedin
            </button>

            {/* dribble button */}
            <button
                className="bg-[#ea4c89] text-white rounded-md py-[11px] px-[19px] flex items-center gap-[10px] text-[1rem] ">
                <img src="https://i.ibb.co/8BcCFQv/download-11-removebg-preview.png" alt="Dribble logo"
                     className="w-[25px]"/>
                Continue with Dribble
            </button>

            {/* facebook button */}
            <button
                className="bg-[#1777f2] text-white rounded-md py-[11px] px-[10px] flex items-center gap-[10px] text-[1rem] ">
                <img src="https://i.ibb.co/GP1q2C7/download-12-removebg-preview.png" alt="Facebook logo"
                     className="w-[25px]"/>
                Continue with Facebook
            </button>

            {/* spotify button */}
            <button
                className="bg-[#1db954] text-white rounded-md py-[11px] px-[19px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdbd49f28d441099203_spotify-white.svg"
                    alt="Spotify logo"
                    className="w-[25px]"/>
                Continue with Spotify
            </button>

            {/* microsoft button */}
            <button
                className="bg-[#2f2f2f] text-white rounded-md py-[11px] px-[10px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg"
                    alt="Microsoft logo"
                    className="w-[25px]"/>
                Continue with Microsoft
            </button>
                    '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Social Login bordered"} id={"social_login_bordered"}/>
                </div>

                <ComponentDescription
                    text='Social login buttons with borders, providing a clean and defined look for authentication options.'/>

                <ToggleTab setCode={setSocialBorderButtonCode} code={socialBorderButtonCode}
                           setPreview={setSocialBorderButtonPreview} preview={socialBorderButtonPreview}/>

                <ComponentWrapper>
                    {socialBorderButtonPreview && (
                        <div className="p-8 mb-4 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <button
                                className='border border-black dark:border-slate-600 dark:text-[#abc2d3] text-black rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c46041d682027a3c2a_github.svg'
                                    alt='Github logo'
                                    className='w-[30px]'/>
                                Continue with Github
                            </button>

                            <button
                                className='border border-[#0a66c2] text-[#0a66c2] rounded-md py-[11px] px-[12px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0e861840a27_linkedin.svg'
                                    alt='Linkedin logo'
                                    className='w-[25px]'/>
                                Continue with Linkedin
                            </button>

                            <button
                                className='border border-[#ea4c89] text-[#ea4c89] rounded-md py-[11px] px-[16px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632ca01585cf323fdd614a81_dribbble-svgrepo-com.svg'
                                    alt='Dribble logo'
                                    className='w-[25px]'/>
                                Continue with Dribble
                            </button>

                            <button
                                className='border border-[#1777f2] text-[#1777f2] rounded-md py-[11px] px-[7px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c960d4839cf20aeafcad2_facebook.svg'
                                    alt='Facebook logo'
                                    className='w-[25px]'/>
                                Continue with Facebook
                            </button>

                            <button
                                className='border border-[#1db954] text-[#1db954] rounded-md py-[11px] px-[16px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4c75f2ea0362f20b7_spotify.svg'
                                    alt='Spotify logo'
                                    className='w-[25px]'/>
                                Continue with Spotify
                            </button>

                            <button
                                className='border dark:border-slate-600 dark:text-[#abc2d3] border-[#2f2f2f] text-[#2f2f2f] rounded-md py-[11px] px-[7px] flex items-center gap-[10px] text-[1rem] '>
                                <img
                                    src='https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg'
                                    alt='Microsoft logo'
                                    className='w-[25px]'/>
                                Continue with Microsoft
                            </button>
                        </div>
                    )}

                    {socialBorderButtonCode &&
                        <ShowCode code='
            {/* github button */}
            <button
                className="border border-black dark:border-slate-600 dark:text-[#abc2d3] text-black rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] ">
                <img src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c46041d682027a3c2a_github.svg"
                     alt="Github logo"
                     className="w-[30px]"/>
                Continue with Github
            </button>

            {/* linkedin button */}
            <button
                className="border border-[#0a66c2] text-[#0a66c2] rounded-md py-[11px] px-[12px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0e861840a27_linkedin.svg"
                    alt="Linkedin logo"
                    className="w-[25px]"/>
                Continue with Linkedin
            </button>

            {/* dribble button */}
            <button
                className="border border-[#ea4c89] text-[#ea4c89] rounded-md py-[11px] px-[16px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632ca01585cf323fdd614a81_dribbble-svgrepo-com.svg"
                    alt="Dribble logo"
                    className="w-[25px]"/>
                Continue with Dribble
            </button>

            {/* facebook button */}
            <button
                className="border border-[#1777f2] text-[#1777f2] rounded-md py-[11px] px-[7px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c960d4839cf20aeafcad2_facebook.svg"
                    alt="Facebook logo"
                    className="w-[25px]"/>
                Continue with Facebook
            </button>

            {/* spotify button */}
            <button
                className="border border-[#1db954] text-[#1db954] rounded-md py-[11px] px-[16px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4c75f2ea0362f20b7_spotify.svg"
                    alt="Spotify logo"
                    className="w-[25px]"/>
                Continue with Spotify
            </button>

            {/* microsoft button */}
            <button
                className="border border-[#2f2f2f] text-[#2f2f2f] dark:border-slate-600 dark:text-[#abc2d3] rounded-md py-[11px] px-[7px] flex items-center gap-[10px] text-[1rem] ">
                <img
                    src="https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg"
                    alt="Microsoft logo"
                    className="w-[25px]"/>
                Continue with Microsoft
            </button>
                        '

                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={authButtonContents} activeSection={activeSection}/>

            <Helmet>
                <title>Buttons - Auth Button</title>
            </Helmet>
        </aside>
    );
};

export default AuthButton;
