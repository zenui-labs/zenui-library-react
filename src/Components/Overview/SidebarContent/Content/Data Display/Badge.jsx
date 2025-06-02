import React, {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {badgeContents} from '@utils/ContentsConfig/DataDisplayContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {MdOutlineMail, MdVerified} from 'react-icons/md';
import {IoCartOutline} from 'react-icons/io5';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";


const Badge = () => {
    const sectionIds = badgeContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // messageBadgePreview
    const [messageBadgePreview, setMessageBadgePreview] = useState(true);
    const [messageBadgeCode, setMessageBadgeCode] = useState(false);

    // cartBadgePreview
    const [cartBadgePreview, setCartBadgePreview] = useState(true);
    const [cartBadgeCode, setCartBadgeCode] = useState(false);

    // online badge
    const [onlineBadgePreview, setOnlineBadgePreview] = useState(true);
    const [onlineBadgeCode, setOnlineBadgeCode] = useState(false);

    // verified badge
    const [verifiedBadgePreview, setVerifiedBadgePreview] = useState(true);
    const [verifiedBadgeCode, setVerifiedBadgeCode] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'message badge'} id={'message_badge'}/>

                    <ComponentDescription text='This is a message badge component. Display notifications or messages
            with a sleek and visible badge.'/>

                    <ToggleTab code={messageBadgeCode} setCode={setMessageBadgeCode} setPreview={setMessageBadgePreview}
                               preview={messageBadgePreview}/>

                    <ComponentWrapper>
                        {messageBadgePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='relative'>
                                    <MdOutlineMail className='text-[2.7rem] dark:text-[#abc2d3]'/>
                                    <div
                                        className=' absolute top-[-10%] right-[-15%] text-secondary min-w-[20px] min-h-[20px] text-center'>
                    <span
                        className='text-[0.8rem] bg-primary py-1 px-1 rounded-full w-full h-full border-[2px] border-secondary dark:border-darkBgColor'>
                      10
                    </span>
                                    </div>
                                </div>

                                <div
                                    className='relative before:absolute before:w-[20px] before:h-[20px] before:rounded-full before:top-[-2%] before:right-[-5%] before:border-[2px] dark:before:border-darkBgColor before:border-secondary before:bg-primary '>
                                    <MdOutlineMail className='text-[2.7rem] dark:text-[#abc2d3]'/>
                                </div>
                            </div>
                        )}

                        {messageBadgeCode && (
                            <Showcode
                                code='
import React from "react";

// icon
import { MdOutlineMail } from "react-icons/md";

const MessageBadge = () => {
  return (
    <>
      <div className="relative">
        <MdOutlineMail className="text-[2.7rem] dark:text-[#abc2d3]" />
        <div className=" absolute top-[-10%] right-[-15%] text-white min-w-[20px] min-h-[20px] text-center">
          <span className="text-[0.8rem] bg-primary dark:border-[#020617] py-1 px-1 rounded-full w-full h-full border-[2px] border-white">
            10
          </span>
        </div>
      </div>

      <div className="relative before:absolute before:w-[20px] before:h-[20px] before:rounded-full before:top-[-2%] before:right-[-5%] before:border-[2px] before:border-white dark:before:border-[#020617] before:bg-[#3B9DF8] ">
        <MdOutlineMail className="text-[2.7rem] dark:text-[#abc2d3]" />
      </div>
    </>
  );
};

export default MessageBadge;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'cart badge'} id={'cart_badge'}/>
                    </div>

                    <ComponentDescription text='This is a cart badge component. Show cart items or notifications
            with a stylish and visible badge.'/>

                    <ToggleTab code={cartBadgeCode} setCode={setCartBadgeCode} preview={cartBadgePreview}
                               setPreview={setCartBadgePreview}/>

                    <ComponentWrapper>
                        {cartBadgePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='relative'>
                                    <IoCartOutline className='text-[2.7rem] dark:text-[#abc2d3]'/>
                                    <div
                                        className=' absolute top-[-10%] right-[-15%] text-secondary min-w-[20px] min-h-[20px] text-center'>
                    <span
                        className='text-[0.8rem] bg-primary py-1 px-1 dark:border-darkBgColor rounded-full w-full h-full border-[2px] border-secondary'>
                      10
                    </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {cartBadgeCode && (
                            <Showcode
                                code='
import React from "react";

// icon
import { IoCartOutline } from "react-icons/io5";

const CartBadge = () => {
  return (
    <>
      <div className="relative">
        <IoCartOutline className="text-[2.7rem] dark:text-[#abc2d3]" />
        <div className=" absolute top-[-10%] right-[-15%] text-white min-w-[20px] min-h-[20px] text-center">
          <span className="text-[0.8rem] bg-[#3B9DF8] py-1 px-1 rounded-full w-full h-full border-[2px] border-white dark:border-[#020617]">
            10
          </span>
        </div>
      </div>
    </>
  );
};

export default CartBadge;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'online badge'} id={'online_badge'}/>
                    </div>

                    <ComponentDescription text='An indicator, typically a small colored dot or icon, showing that a
            user is currently online and available.'/>

                    <ToggleTab code={onlineBadgeCode} setPreview={setOnlineBadgePreview} preview={onlineBadgePreview}
                               setCode={setOnlineBadgeCode}/>

                    <ComponentWrapper>
                        {onlineBadgePreview && (
                            <div className='p-8 mb-4 flex items-center flex-wrap gap-5 justify-center'>
                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996'
                                        alt='avatar'
                                        className='w-[80px] h-[80px] rounded-full object-cover'
                                    />

                                    <div
                                        className='p-[2px] bg-white dark:bg-[#020617] absolute top-[60px] right-2 rounded-full'>
                                        <div className='w-[16px] h-[16px] rounded-full bg-green-400 '></div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996'
                                        alt='avatar'
                                        className='w-[70px] h-[70px] rounded-full object-cover'
                                    />

                                    <div
                                        className='p-[2px] bg-white absolute dark:bg-[#020617] top-[53px] right-2 rounded-full'>
                                        <div className='w-[14px] h-[14px] rounded-full bg-green-400 '></div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996'
                                        alt='avatar'
                                        className='w-[60px] h-[60px] rounded-full object-cover'
                                    />

                                    <div
                                        className='p-[2px] bg-white absolute dark:bg-[#020617] top-[47px] right-2 rounded-full'>
                                        <div className='w-[12px] h-[12px] rounded-full bg-green-400 '></div>
                                    </div>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996'
                                        alt='avatar'
                                        className='w-[50px] h-[50px] rounded-full object-cover'
                                    />

                                    <div
                                        className='p-[2px] bg-white absolute dark:bg-[#020617] top-[38px] right-[4px] rounded-full'>
                                        <div className='w-[10px] h-[10px] rounded-full bg-green-400 '></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {onlineBadgeCode && (
                            <Showcode
                                code='
import React from "react";

const Badge = () => {

    return (
        <>
            {/* large */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996"
                    alt="avatar" className="w-[80px] h-[80px] rounded-full object-cover"/>

                <div className="p-[2px] bg-white absolute dark:bg-[#020617] top-[60px] right-2 rounded-full">
                    <div className="w-[16px] h-[16px] rounded-full bg-green-400 "></div>
                </div>
            </div>

            {/* medium */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996"
                    alt="avatar" className="w-[70px] h-[70px] rounded-full object-cover"/>

                <div className="p-[2px] bg-white absolute dark:bg-[#020617] top-[53px] right-2 rounded-full">
                    <div className="w-[14px] h-[14px] rounded-full bg-green-400 "></div>
                </div>
            </div>

            {/* small */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996"
                    alt="avatar" className="w-[60px] h-[60px] rounded-full object-cover"/>

                <div className="p-[2px] bg-white absolute dark:bg-[#020617] top-[47px] right-2 rounded-full">
                    <div className="w-[12px] h-[12px] rounded-full bg-green-400 "></div>
                </div>
            </div>

            {/* smallest */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?t=st=1722664771~exp=1722668371~hmac=b930da24388ca4a02a842fcd7697b7d73897d11c92ff354a19eb246ca222359e&w=996"
                    alt="avatar" className="w-[50px] h-[50px] rounded-full object-cover"/>

                <div className="p-[2px] bg-white absolute dark:bg-[#020617] top-[38px] right-[4px] rounded-full">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-400 "></div>
                </div>
            </div>
        </>
    );
};

export default Badge;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'verified badge'} id={'verified_badge'}/>
                    </div>

                    <ComponentDescription text='A badge or icon indicating that a user, account, or content has been
            verified for authenticity or credibility.'/>

                    <ToggleTab code={verifiedBadgeCode} setCode={setVerifiedBadgeCode} preview={verifiedBadgePreview}
                               setPreview={setVerifiedBadgePreview}/>

                    <ComponentWrapper>
                        {verifiedBadgePreview && (
                            <div className='p-8 mb-4 flex items-center flex-wrap gap-5 justify-center'>
                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996'
                                        alt='avatar'
                                        className='w-[80px] h-[80px] rounded-full object-cover'
                                    />

                                    <MdVerified
                                        className='text-blue-500 p-[2px] text-[1.5rem] dark:bg-[#020617] bg-white rounded-full absolute top-[57px] right-[5px]'/>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996'
                                        alt='avatar'
                                        className='w-[70px] h-[70px] rounded-full object-cover'
                                    />

                                    <MdVerified
                                        className='text-blue-500 p-[2px] text-[1.4rem] dark:bg-[#020617] bg-white rounded-full absolute top-[50px] right-[4px]'/>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996'
                                        alt='avatar'
                                        className='w-[60px] h-[60px] rounded-full object-cover'
                                    />

                                    <MdVerified
                                        className='text-blue-500 p-[2px] text-[1.3rem] dark:bg-[#020617] bg-white rounded-full absolute top-[43px] right-[4px]'/>
                                </div>

                                <div className='relative'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996'
                                        alt='avatar'
                                        className='w-[50px] h-[50px] rounded-full object-cover'
                                    />

                                    <MdVerified
                                        className='text-blue-500 p-[2px] text-[1.2rem] dark:bg-[#020617] bg-white rounded-full absolute top-[35px] right-[4px]'/>
                                </div>
                            </div>
                        )}

                        {verifiedBadgeCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdVerified} from "react-icons/md";

const Badge = () => {

    return (
        <>
            {/* large */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996"
                    alt="avatar" className="w-[80px] h-[80px] rounded-full object-cover"/>

                <MdVerified
                    className="text-blue-500 p-[2px] text-[1.5rem] dark:bg-[#020617] bg-white rounded-full absolute top-[57px] right-[5px]"/>
            </div>

            {/* medium */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996"
                    alt="avatar" className="w-[70px] h-[70px] rounded-full object-cover"/>

                <MdVerified
                    className="text-blue-500 p-[2px] text-[1.4rem] dark:bg-[#020617] bg-white rounded-full absolute top-[50px] right-[4px]"/>
            </div>

            {/* small */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996"
                    alt="avatar" className="w-[60px] h-[60px] rounded-full object-cover"/>

                <MdVerified
                    className="text-blue-500 p-[2px] text-[1.3rem] dark:bg-[#020617] bg-white rounded-full absolute top-[43px] right-[4px]"/>
            </div>

            {/* smallest */}
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996"
                    alt="avatar" className="w-[50px] h-[50px] rounded-full object-cover"/>

                <MdVerified
                    className="text-blue-500 p-[2px] text-[1.2rem] dark:bg-[#020617] bg-white rounded-full absolute top-[35px] right-[4px]"/>
            </div>
        </>
    );
};

export default Badge;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/notification'
                        backName='notification'
                        forwardName='tooltip'
                        forwardUrl='/components/tooltip'
                    />
                </div>

                <ContentNavbar contents={badgeContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Data Display - Badge</title>
            </Helmet>
        </>
    );
};

export default Badge;
