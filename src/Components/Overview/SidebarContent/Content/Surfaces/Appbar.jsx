import React, {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader';
import OverviewFooter from '@shared/OverviewFooter';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {appbarContents} from '@utils/ContentsConfig/SurfacesContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {FiMenu} from 'react-icons/fi';
import {FaRegCircleUser} from 'react-icons/fa6';
import {CiSearch} from 'react-icons/ci';
import {IoIosNotifications} from 'react-icons/io';
import {IoCartOutline} from 'react-icons/io5';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Appbar = () => {
    const [basicAppPreview, setBasicAppPreview] = useState(true);
    const [basicAppCode, setBasicAppCode] = useState(false);

    const sectionIds = appbarContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [appBarWithSearchPreview, setAppBarWithSearchPreview] = useState(true);
    const [appBarWithSearchCode, setAppBarWithSearchCode] = useState(false);

    const [appbarWithIconsPreview, setAppbarWithIconsPreview] = useState(true);
    const [appbarWithIconsCode, setAppbarWithIconsCode] = useState(false);

    const [isLogout, setIsLogout] = useState(false);

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader
                        id='app_bar_with_manu_&__profile'
                        text={'app bar with manu & profile'}
                    />

                    <ComponentDescription text='This is an app bar with profile login/logout component. Manage user
            sessions seamlessly with profile access.'/>

                    <ToggleTab code={basicAppCode} preview={basicAppPreview} setCode={setBasicAppCode}
                               setPreview={setBasicAppPreview}/>

                    <ComponentWrapper>
                        {basicAppPreview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <div className='p-4 bg-primary w-full flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <FiMenu className='text-secondary text-[1.7rem] cursor-pointer'/>
                                        <h2 className='text-[1.3rem] text-secondary font-[600]'>
                                            Logo
                                        </h2>
                                    </div>
                                    {!isLogout && (
                                        <FaRegCircleUser className='text-secondary text-[1.5rem] cursor-pointer'/>
                                    )}
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div
                                        className={`${
                                            isLogout ? '!bg-[#b3b3b3]' : '!bg-[#83c2fd]'
                                        } cursor-pointer px-4 py-2 rounded-lg before:bg-transparent before:w-[20px] before:h-[20px] before:rounded-full before:absolute relative before:top-[-12%] before:right-[-15%] before:cursor-pointer after:bg-primary after:absolute after:top-[-12%] after:left-[-15%] after:cursor-pointer  after:h-[20px] after:w-[20px] after:rounded-full transition-all duration-300 ${
                                            isLogout && 'after:!bg-transparent before:!bg-primary '
                                        }`}
                                        onClick={() => setIsLogout(!isLogout)}
                                    ></div>
                                    <span
                                        className={`text-[1.2rem] font-[500] ${
                                            isLogout ? 'text-text' : 'text-primary'
                                        }`}
                                    >
                    Logout
                  </span>
                                </div>
                            </div>
                        )}

                        {basicAppCode && (
                            <Showcode
                                code='
import React, { useState } from "react";

// icons
import { FiMenu } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";


const AppbarWithUsericon = () => {
  const [isLogout, setIsLogout] = useState(false);
  return (
    <>
      <div className="p-4 bg-primary w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FiMenu className="text-secondary text-[1.7rem] cursor-pointer" />
          <h2 className="text-[1.3rem] text-secondary font-[600]">Logo</h2>
        </div>
        {!isLogout && (
          <FaRegCircleUser className="text-secondary text-[1.5rem] cursor-pointer" />
        )}
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`${
            isLogout ? "!bg-[#b3b3b3]" : "!bg-[#83c2fd]"
          } cursor-pointer px-4 py-2 rounded-lg before:bg-transparent before:w-[20px] before:h-[20px] before:rounded-full before:absolute relative before:top-[-12%] before:right-[-15%] before:cursor-pointer after:bg-primary after:absolute after:top-[-12%] after:left-[-15%] after:cursor-pointer  after:h-[20px] after:w-[20px] after:rounded-full transition-all duration-300 ${
            isLogout && "after:!bg-transparent before:!bg-primary "
          }`}
          onClick={() => setIsLogout(!isLogout)}></div>
        <span
          className={`text-[1.2rem] font-[500] ${
            isLogout ? "text-text" : "text-primary"
          }`}>
          Logout
        </span>
      </div>
    </>
  );
};

export default AppbarWithUsericon;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='app_bar_with_search_bar'
                            text={'app bar with search bar'}
                        />
                    </div>

                    <ComponentDescription text='This is an app bar with menu and search bar for intuitive navigation
            and quick access.'/>

                    <ToggleTab code={appBarWithSearchCode} setPreview={setAppBarWithSearchPreview}
                               preview={appBarWithSearchPreview} setCode={setAppBarWithSearchCode}/>

                    <ComponentWrapper>
                        {appBarWithSearchPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='px-4 py-2 bg-primary w-full flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <FiMenu className='text-secondary text-[1.7rem] cursor-pointer'/>
                                        <h2 className='text-[1.3rem] text-secondary font-[600]'>
                                            Logo
                                        </h2>
                                    </div>
                                    <div className='relative'>
                                        <input
                                            type='search'
                                            className='pl-10 py-2 bg-[#104c853d] w-full border-none outline-none text-secondary placeholder:text-[#ffffffa8] '
                                            placeholder='Search...'
                                        />
                                        <CiSearch className=' absolute top-2 left-3 text-secondary text-[1.4rem]'/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {appBarWithSearchCode && (
                            <Showcode
                                code='
import React, { useState } from "react";

// icons
import { FiMenu } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";


const AppbarWithSearchbar = () => {

  return (
    <>
      <div className="px-4 py-2 bg-primary w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FiMenu className="text-secondary text-[1.7rem] cursor-pointer" />
          <h2 className="text-[1.3rem] text-secondary font-[600]">Logo</h2>
        </div>
        <div className="relative">
          <input
            type="search"
            className="pl-10 py-2 bg-[#104c853d] border-none outline-none text-secondary placeholder:text-[#ffffffa8] "
            placeholder="Search..."
          />
          <CiSearch className=" absolute top-2 left-3 text-secondary text-[1.4rem]" />
        </div>
      </div>
    </>
  );
};

export default AppbarWithSearchbar;
            '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='app_bar_with_search_and_icons'
                            text={'app bar with search and icons'}
                        />
                    </div>

                    <ComponentDescription text='This is an app bar with menu, cart, notification icons, and search
            bar for comprehensive navigation and interaction.'/>

                    <ToggleTab code={appbarWithIconsCode} setCode={setAppbarWithIconsCode}
                               preview={appbarWithIconsPreview} setPreview={setAppbarWithIconsPreview}/>

                    <ComponentWrapper>
                        {appbarWithIconsPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='px-4 py-2 bg-primary w-full gap-2 flex-wrap flex items-center justify-between'>
                                    <div className='flex items-center gap-5'>
                                        <div className='flex items-center gap-4'>
                                            <FiMenu className='text-secondary text-[1.7rem] cursor-pointer'/>
                                            <h2 className='text-[1.3rem] text-secondary font-[600]'>
                                                Logo
                                            </h2>
                                        </div>
                                        <div className='relative'>
                                            <input
                                                type='search'
                                                className='pl-10 py-2 bg-[#104c853d] w-full border-none outline-none text-secondary placeholder:text-[#ffffffa8] '
                                                placeholder='Search...'
                                            />
                                            <CiSearch className=' absolute top-2 left-3 text-secondary text-[1.4rem]'/>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <div className='relative'>
                                            <IoCartOutline className='text-[1.8rem] text-[#ffffff]'/>
                                            <div
                                                className=' absolute top-[-30%] right-[-10%]  text-secondary min-w-[20px] min-h-[20px] text-center'>
                        <span className='text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full'>
                          10
                        </span>
                                            </div>
                                        </div>

                                        <div className='relative'>
                                            <IoIosNotifications className='text-[1.8rem] text-[#ffffff]'/>
                                            <div
                                                className=' absolute top-[-30%] right-[-10%]  text-secondary min-w-[20px] min-h-[20px] text-center'>
                        <span className='text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full'>
                          10
                        </span>
                                            </div>
                                        </div>
                                        <FaRegCircleUser className='text-[1.4rem] text-[#ffffff]'/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {appbarWithIconsCode && (
                            <Showcode
                                code='
import React, { useState } from "react";

// icons
import { FiMenu } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

const AppbarWithIcons = () => {

  return (
    <>
      <div className="px-4 py-2 bg-primary w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            <FiMenu className="text-secondary text-[1.7rem] cursor-pointer" />
            <h2 className="text-[1.3rem] text-secondary font-[600]">Logo</h2>
          </div>
          <div className="relative">
            <input
              type="search"
              className="pl-10 py-2 bg-[#104c853d] border-none outline-none text-secondary placeholder:text-[#ffffffa8] "
              placeholder="Search..."
            />
            <CiSearch className=" absolute top-2 left-3 text-secondary text-[1.4rem]" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <IoCartOutline className="text-[1.8rem] text-[#ffffff]" />
            <div className=" absolute top-[-30%] right-[-10%]  text-secondary min-w-[20px] min-h-[20px] text-center">
              <span className="text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full">
                10
              </span>
            </div>
          </div>

          <div className="relative">
            <IoIosNotifications className="text-[1.8rem] text-[#ffffff]" />
            <div className=" absolute top-[-30%] right-[-10%]  text-secondary min-w-[20px] min-h-[20px] text-center">
              <span className="text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full">
                10
              </span>
            </div>
          </div>
          <FaRegCircleUser className="text-[1.4rem] text-[#ffffff]" />
        </div>
      </div>
    </>
  );
};

export default AppbarWithIcons;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/according'
                        backName='accordion'
                        forwardName='image gallery'
                        forwardUrl='/components/image-gallery'
                    />
                </div>

                <ContentNavbar contents={appbarContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Surfaces - App Bar</title>
            </Helmet>
        </>
    );
};

export default Appbar;
