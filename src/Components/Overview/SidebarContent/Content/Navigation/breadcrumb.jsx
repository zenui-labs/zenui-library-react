import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {breadcrumbContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// icons
import {MdKeyboardArrowDown} from 'react-icons/md';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Breadcrumb = () => {
    const sectionIds = breadcrumbContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // non clickable
    const [nonClickablePreview, setNonClickablePreview] = useState(true);
    const [nonClickableCode, setNonClickableCode] = useState(false);

    // clickable
    const [clickablePreview, setClickablePreview] = useState(true);
    const [clickableCode, setClickableCode] = useState(false);

    // dropdown breadcrumb
    const [dropdownBreadcrumbPreview, setDropdownBreadcrumbPreview] =
        useState(true);
    const [dropdownBreadcrumbCode, setDropdownBreadcrumbCode] = useState(false);

    // customizable breadcrumb
    const [customizableBreadcrumbPreview, setCustomizableBreadcrumbPreview] =
        useState(true);
    const [customizableBreadcrumbCode, setCustomizableBreadcrumbCode] =
        useState(false);

    const nonClickableItems = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Category',
            path: '/category',
        },
        {
            label: 'Sub Category',
            path: '/sub-category',
        },
        {
            label: 'Current Page',
            path: '/current-page',
        },
    ];

    const dropdownBreadcrumbArray = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Category',
            path: '/category',
        },
        {
            label: 'Sub Category',
            path: '/sub-category',
        },
        {
            label: 'About Us',
            path: '/about-us',
        },
        {
            label: 'Contact Us',
            path: '/contact-us',
        },
        {
            label: 'Current Page',
            path: '/current-page',
        },
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest('.dropdownModal') &&
                !e.target.closest('.dropdownButton')
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader
                        text={'non clickable breadcrumb'}
                        id={'non_clickable_breadcrumb'}
                    />

                    <ComponentDescription text="A breadcrumb navigation that displays the user's path but with
            non-clickable links, serving as a visual guide without interactive
            functionality."/>

                    <ToggleTab code={nonClickableCode} setCode={setNonClickableCode} setPreview={setNonClickablePreview}
                               preview={nonClickablePreview}/>

                    <ComponentWrapper>
                        {nonClickablePreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <ol className='flex items-center flex-wrap gap-[5px]'>
                                    {nonClickableItems?.map((item, index) => (
                                        <>
                                            <li
                                                key={index}
                                                className={`text-[0.9rem] dark:text-[#abc2d3] text-text ${
                                                    index === nonClickableItems.length - 1 &&
                                                    '!text-primary'
                                                }`}
                                            >
                                                {item.label}
                                            </li>
                                            {index !== nonClickableItems.length - 1 && (
                                                <MdKeyboardArrowDown
                                                    className='rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]'/>
                                            )}
                                        </>
                                    ))}
                                </ol>
                            </div>
                        )}

                        {nonClickableCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";

const Breadcrumb = () => {

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Category",
            path: "/category"
        },
        {
            label: "Sub Category",
            path: "/sub-category"
        },
        {
            label: "Current Page",
            path: "/current-page"
        },

    ]

    return (
        <ol className="flex items-center gap-[5px]">
            {
                breadcrumbItems?.map((item, index) => (
                    <>
                        <li key={index}
                            className={`text-[0.9rem] dark:text-[#abc2d3] text-text ${index === breadcrumbItems.length - 1 && "!text-primary"}`}>{item.label}</li>
                        {
                            index !== breadcrumbItems.length - 1 && (
                                <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]"/>
                            )
                        }
                    </>
                ))
            }
        </ol>
    );
};

export default Breadcrumb;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'clickable breadcrumb'}
                            id={'clickable_breadcrumb'}
                        />
                    </div>

                    <ComponentDescription text='A breadcrumb navigation with clickable links, allowing users to
            easily navigate back to previous pages or sections.'/>

                    <ToggleTab code={clickableCode} setCode={setClickableCode} preview={clickablePreview}
                               setPreview={setClickablePreview}/>

                    <ComponentWrapper>
                        {clickablePreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div className='flex items-center flex-wrap gap-[5px]'>
                                    {nonClickableItems?.map((item, index) => (
                                        <>
                                            <a
                                                key={index}
                                                href={item.path}
                                                className={`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline ${
                                                    index === nonClickableItems.length - 1 &&
                                                    '!text-primary'
                                                }`}
                                            >
                                                {item.label}
                                            </a>
                                            {index !== nonClickableItems.length - 1 && (
                                                <MdKeyboardArrowDown
                                                    className='rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]'/>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        )}

                        {clickableCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";

const Breadcrumb = () => {

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Category",
            path: "/category"
        },
        {
            label: "Sub Category",
            path: "/sub-category"
        },
        {
            label: "Current Page",
            path: "/current-page"
        },

    ]

    return (
        <div className="flex items-center gap-[5px]">
            {
                breadcrumbItems?.map((item, index) => (
                    <>
                        <a key={index} href={item.path}
                           className={`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline ${index === breadcrumbItems.length - 1 && "!text-primary"}`}>{item.label}</a>
                        {
                            index !== breadcrumbItems.length - 1 && (
                                <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]"/>
                            )
                        }
                    </>
                ))
            }
        </div>
    );
};

export default Breadcrumb;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'dropdown breadcrumb'}
                            id={'dropdown_breadcrumb'}
                        />
                    </div>

                    <ComponentDescription text='A breadcrumb navigation with a dropdown that appears after a certain
            number of links, allowing users to access additional navigation
            options from the dropdown menu.'/>

                    <ToggleTab code={dropdownBreadcrumbCode} setCode={setDropdownBreadcrumbCode}
                               setPreview={setDropdownBreadcrumbPreview} preview={dropdownBreadcrumbPreview}/>

                    <ComponentWrapper>
                        {dropdownBreadcrumbPreview && (
                            <div
                                className={`${
                                    dropdownOpen ? 'mb-[8rem]' : 'mb-4'
                                } p-8 flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}
                            >
                                <div className='flex items-center gap-[5px]'>
                                    {dropdownBreadcrumbArray?.slice(0, 3)?.map((item, index) => (
                                        <>
                                            <a
                                                key={index}
                                                href={item.path}
                                                className={`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline ${
                                                    index === nonClickableItems.length - 1 &&
                                                    '!text-primary'
                                                }`}
                                            >
                                                {item.label}
                                            </a>
                                            {index !== nonClickableItems.length - 1 && (
                                                <MdKeyboardArrowDown
                                                    className='rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]'/>
                                            )}
                                        </>
                                    ))}

                                    <div className='relative'>
                                        <p
                                            className='dropdownButton dark:text-[#abc2d3] cursor-pointer'
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            ....
                                        </p>

                                        <div
                                            className={`${
                                                dropdownOpen
                                                    ? 'translate-y-0 opacity-100 z-30'
                                                    : 'translate-y-[-20px] opacity-0 z-[-1]'
                                            } flex flex-col text-[0.8rem] dark:bg-slate-800 dark:text-[#abc2d3] bg-white boxShadow dropdownModal transition-all duration-300 rounded-md py-1 absolute top-[25px] right-0 640px:left-[-20px] w-max`}
                                        >
                                            {dropdownBreadcrumbArray
                                                ?.slice(3, dropdownBreadcrumbArray.length)
                                                .map((item, index) => (
                                                    <a
                                                        href={item.path}
                                                        key={index}
                                                        className='w-full hover:bg-gray-100 dark:hover:bg-slate-900/40 px-8 py-2 cursor-pointer'
                                                    >
                                                        {item.label}
                                                    </a>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {dropdownBreadcrumbCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";

const Breadcrumb = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Category",
            path: "/category"
        },
        {
            label: "Sub Category",
            path: "/sub-category"
        },
        {
            label: "About Us",
            path: "/about-us"
        },
        {
            label: "Contact Us",
            path: "/contact-us"
        },
        {
            label: "Current Page",
            path: "/current-page"
        },

    ];

    document.addEventListener("click", (e)=> {
        if(!e.target.closest(".dropdownModal") && !e.target.closest(".dropdownButton")){
            setDropdownOpen(false)
        }
    })

    return (
        <div className="flex items-center gap-[5px]">
            {
                breadcrumbItems?.slice(0, 3)?.map((item, index) => (
                    <>
                        <a key={index} href={item.path}
                           className={`text-[0.9rem] text-text dark:text-[#abc2d3] hover:underline ${index === breadcrumbItems.length - 1 && "!text-primary"}`}>{item.label}</a>
                        {
                            index !== breadcrumbItems.length - 1 && (
                                <MdKeyboardArrowDown
                                    className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]"/>
                            )
                        }

                    </>
                ))
            }

            <div className="relative">
                <p className="dropdownButton cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>....</p>

                <div
                    className={`${dropdownOpen ? "translate-y-0 opacity-100 z-30" : "translate-y-[-20px] opacity-0 z-[-1]"} flex flex-col text-[0.8rem] dark:bg-slate-800 dark:text-[#abc2d3] bg-white boxShadow dropdownModal transition-all duration-300 rounded-md py-1 absolute top-[25px] right-0 md:left-[-20px] w-max`}>
                    {
                        breadcrumbItems?.slice(3, breadcrumbItems.length).map((item, index) => (
                            <a href={item.path} key={index}
                               className="w-full hover:bg-gray-100 px-8 dark:hover:bg-slate-900/40 py-2 cursor-pointer">{item.label}</a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'customizable breadcrumb'}
                            id={'customizable_breadcrumb'}
                        />
                    </div>

                    <ComponentDescription text='This is a basic chip component. Use it to display concise
            information or tags in a compact form.'/>

                    <ToggleTab code={customizableBreadcrumbCode} setCode={setCustomizableBreadcrumbCode}
                               preview={customizableBreadcrumbPreview} setPreview={setCustomizableBreadcrumbPreview}/>

                    <ComponentWrapper>
                        {customizableBreadcrumbPreview && (
                            <div
                                className={`${
                                    dropdownOpen ? 'mb-[8rem]' : 'mb-4'
                                } p-8 flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}
                            >
                                <div className='flex flex-col gap-[10px]'>
                                    <ol className='flex items-center flex-wrap gap-[5px] dark:bg-blue-800/20 bg-blue-50 py-2.5 px-3 rounded-md'>
                                        {nonClickableItems?.map((item, index) => (
                                            <>
                                                <li
                                                    key={index}
                                                    className={`text-[0.9rem] dark:text-blue-600 text-blue-900 ${
                                                        index === nonClickableItems.length - 1 &&
                                                        'font-bold'
                                                    }`}
                                                >
                                                    {item.label}
                                                </li>
                                                {index !== nonClickableItems.length - 1 && (
                                                    <MdKeyboardArrowDown
                                                        className='rotate-[-90deg] text-blue-900 text-[0.9rem]'/>
                                                )}
                                            </>
                                        ))}
                                    </ol>

                                    <ol className='flex items-center flex-wrap gap-[5px] dark:bg-orange-800/20 bg-orange-50 py-2.5 px-3 rounded-md'>
                                        {nonClickableItems?.map((item, index) => (
                                            <>
                                                <li
                                                    key={index}
                                                    className={`text-[0.9rem] dark:text-orange-600 text-orange-900 ${
                                                        index === nonClickableItems.length - 1 &&
                                                        'font-bold'
                                                    }`}
                                                >
                                                    {item.label}
                                                </li>
                                                {index !== nonClickableItems.length - 1 && (
                                                    <MdKeyboardArrowDown
                                                        className='rotate-[-90deg] text-orange-900 text-[0.9rem]'/>
                                                )}
                                            </>
                                        ))}
                                    </ol>

                                    <ol className='flex items-center flex-wrap gap-[5px] dark:bg-green-800/20 bg-green-50 py-2.5 px-3 rounded-md'>
                                        {nonClickableItems?.map((item, index) => (
                                            <>
                                                <li
                                                    key={index}
                                                    className={`text-[0.9rem] dark:text-green-600 text-green-900 ${
                                                        index === nonClickableItems.length - 1 &&
                                                        'font-bold'
                                                    }`}
                                                >
                                                    {item.label}
                                                </li>
                                                {index !== nonClickableItems.length - 1 && (
                                                    <MdKeyboardArrowDown
                                                        className='rotate-[-90deg] text-green-900 text-[0.9rem]'/>
                                                )}
                                            </>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}

                        {customizableBreadcrumbCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";

const Breadcrumb = () => {

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Category",
            path: "/category"
        },
        {
            label: "Sub Category",
            path: "/sub-category"
        },
        {
            label: "Current Page",
            path: "/current-page"
        },

    ]

    return (
        <div className="flex flex-col gap-[10px]">
            <ol className="flex items-center gap-[5px] dark:bg-blue-800/20 bg-blue-50 py-2.5 px-3 rounded-md">
                {
                    breadcrumbItems?.map((item, index) => (
                        <>
                            <li key={index}
                                className={`text-[0.9rem] dark:text-blue-600 text-blue-900 ${index === breadcrumbItems.length - 1 && "font-bold"}`}>{item.label}</li>
                            {
                                index !== breadcrumbItems.length - 1 && (
                                    <MdKeyboardArrowDown
                                        className="rotate-[-90deg] text-blue-900 text-[0.9rem]"/>
                                )
                            }
                        </>
                    ))
                }
            </ol>

            <ol className="flex items-center gap-[5px] dark:bg-orange-800/20 bg-orange-50 py-2.5 px-3 rounded-md">
                {
                    breadcrumbItems?.map((item, index) => (
                        <>
                            <li key={index}
                                className={`text-[0.9rem] dark:text-orange-600 text-orange-900 ${index === breadcrumbItems.length - 1 && "font-bold"}`}>{item.label}</li>
                            {
                                index !== breadcrumbItems.length - 1 && (
                                    <MdKeyboardArrowDown
                                        className="rotate-[-90deg] text-orange-900 text-[0.9rem]"/>
                                )
                            }
                        </>
                    ))
                }
            </ol>

            <ol className="flex items-center gap-[5px] dark:bg-green-800/20 bg-green-50 py-2.5 px-3 rounded-md">
                {
                    breadcrumbItems?.map((item, index) => (
                        <>
                            <li key={index}
                                className={`text-[0.9rem] dark:text-green-600 text-green-900 ${index === breadcrumbItems.length - 1 && "font-bold"}`}>{item.label}</li>
                            {
                                index !== breadcrumbItems.length - 1 && (
                                    <MdKeyboardArrowDown
                                        className="rotate-[-90deg] text-green-900 text-[0.9rem]"/>
                                )
                            }
                        </>
                    ))
                }
            </ol>
        </div>
    );
};

export default Breadcrumb;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/chip'
                        backName='chip'
                        forwardName='rating'
                        forwardUrl='/components/rating'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={breadcrumbContents}/>

            </aside>
            <Helmet>
                <title>Navigation - Breadcrumb</title>
            </Helmet>
        </>
    );
};

export default Breadcrumb;
