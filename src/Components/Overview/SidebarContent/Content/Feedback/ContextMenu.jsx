import React, {useState, useEffect, useCallback} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader';
import Showcode from '@shared/Component/ShowCode.jsx';
import OverviewFooter from '@shared/OverviewFooter';

// contents for scrollspy
import {contextMenuContents} from '@utils/ContentsConfig/FeedbackContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {BsChevronRight} from 'react-icons/bs';
import {
    AiOutlineDelete,
} from 'react-icons/ai';
import {MdContentCopy} from 'react-icons/md';
import {GoLink, GoShare} from 'react-icons/go';
import {LuPencil} from 'react-icons/lu';
import {GrCloudUpload} from 'react-icons/gr';
import {IoCloudDownloadOutline} from 'react-icons/io5';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Dialog = () => {
    const sectionIds = contextMenuContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [contextMenuPreview, setContextMenuPreview] = useState(true);
    const [contextMenuCode, setContextMenuCode] = useState(false);

    const [dropdownContextMenuPreview, setDropdownContextMenuPreview] =
        useState(true);
    const [dropdownContextMenuCode, setDropdownContextMenuCode] = useState(false);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [menuHeight, setMenuHeight] = useState('0px');

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({x: e.pageX, y: e.pageY});
    }, []);

    const handleClick = useCallback(() => {
        if (showMenu) {
            setMenuHeight('0px');
            setTimeout(() => setShowMenu(false), 200);
        }
    }, [showMenu]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    useEffect(() => {
        if (showMenu) {
            setTimeout(() => {
                const menuElement = document.getElementById('context-menu');
                if (menuElement) {
                    setMenuHeight(`${menuElement.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showMenu]);

    const menuItems = [
        {
            icon: <MdContentCopy/>,
            label: 'Copy',
            action: () => console.log('Copy clicked'),
        },
        {
            icon: <GoLink/>,
            label: 'Copy Link',
            action: () => console.log('Copy Link clicked'),
        },
        {
            icon: <GoShare/>,
            label: 'Share',
            action: () => console.log('Share clicked'),
        },
        {
            icon: <LuPencil/>,
            label: 'Rename',
            action: () => console.log('Rename clicked'),
        },
        {
            icon: <AiOutlineDelete/>,
            label: 'Delete',
            action: () => console.log('Delete clicked'),
        },
    ];

    const [showMenu2, setShowMenu2] = useState(false);
    const [menuPosition2, setMenuPosition2] = useState({x: 0, y: 0});
    const [menuHeight2, setMenuHeight2] = useState('0px');
    const [subMenuHeight, setSubMenuHeight] = useState('0px');
    const [showSubmenu, setShowSubmenu] = useState(false);

    const handleContextMenu2 = useCallback((e) => {
        e.preventDefault();
        setShowMenu2(true);
        setMenuPosition2({x: e.pageX, y: e.pageY});
    }, []);

    const handleClick2 = useCallback(() => {
        if (showMenu2) {
            setMenuHeight2('0px');
            setTimeout(() => setShowMenu2(false), 200);
        }
    }, [showMenu2]);

    useEffect(() => {
        document.addEventListener('click', handleClick2);
        return () => {
            document.removeEventListener('click', handleClick2);
        };
    }, [handleClick2]);

    useEffect(() => {
        if (showMenu2) {
            setTimeout(() => {
                const menuElement2 = document.getElementById('context-menu2');
                if (menuElement2) {
                    setMenuHeight2(`${menuElement2.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showMenu2]);

    useEffect(() => {
        if (showSubmenu) {
            setTimeout(() => {
                const subMenuHeight = document.getElementById('sub-menu');
                if (subMenuHeight) {
                    setSubMenuHeight(`${subMenuHeight.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showSubmenu]);

    const menuItems2 = [
        {
            icon: <MdContentCopy/>,
            label: 'Copy',
            action: () => console.log('Copy clicked'),
        },
        {
            icon: <GoShare/>,
            label: 'Share',
            hasSubmenu: true,
            submenu: [
                {
                    icon: <IoCloudDownloadOutline/>,
                    label: 'Download',
                    action: () => console.log('Download clicked'),
                },
                {
                    icon: <GrCloudUpload/>,
                    label: 'Upload',
                    action: () => console.log('Upload clicked'),
                },
                {
                    icon: <GoLink/>,
                    label: 'Copy Link',
                    action: () => console.log('Copy Link clicked'),
                },
            ],
            action: () => console.log('Share clicked'),
        },
        {
            icon: <LuPencil/>,
            label: 'Rename',
            action: () => console.log('Rename clicked'),
        },
        {
            icon: <AiOutlineDelete/>,
            label: 'Delete',
            action: () => console.log('Delete clicked'),
        },
    ];

    const handleItemClick = (item) => {
        if (!item.submenu) {
            item.action?.();
        }
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='1024px:w-[80%]'>
                    <ContentHeader text={'context menu'} id={'context_menu'}/>

                    <ComponentDescription text='A context menu is a pop-up that shows relevant actions when you
            right-click an item.'/>

                    <ToggleTab code={contextMenuCode} setPreview={setContextMenuPreview} setCode={setContextMenuCode}
                               preview={contextMenuPreview}/>

                    <ComponentWrapper>
                        {contextMenuPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <p
                                    onContextMenu={handleContextMenu}
                                    className='w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-gray-50 border-gray-300 rounded-md border p-4 text-[1rem]'
                                >
                                    ZENUI LIBRARY - Free Templates & Components Library. Elevate
                                    your project with free UI components, customizable icons, and
                                    a color palette. No dependencies required
                                </p>

                                {showMenu && (
                                    <div
                                        id='context-menu'
                                        className='fixed bg-white overflow-hidden dark:bg-slate-800 dark:border-slate-700 transition-all duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200'
                                        style={{
                                            top: menuPosition.y,
                                            left: menuPosition.x,
                                            height: menuHeight,
                                            zIndex: 50,
                                        }}
                                    >
                                        {menuItems.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    item.action();
                                                    setShowMenu(false);
                                                }}
                                                className={`${
                                                    item.label === 'Delete' && 'hover:bg-red-50 dark:hover:bg-red-900/30'
                                                } w-full px-4 py-2 text-left dark:hover:bg-slate-900/50 hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-600 dark:text-[#abc2d3]`}
                                            >
                                                <p
                                                    className={`${
                                                        item.label === 'Delete' && 'dark:text-red-500 text-red-500'
                                                    } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                                                >
                                                    {item.icon}
                                                </p>
                                                <p
                                                    className={`${
                                                        item.label === 'Delete' && 'text-red-500'
                                                    }`}
                                                >
                                                    {item.label}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {contextMenuCode && (
                            <Showcode
                                code='
import React, {useCallback, useEffect, useState} from "react";

// react icons
import {MdContentCopy} from "react-icons/md";
import {GoLink, GoShare} from "react-icons/go";
import {LuPencil} from "react-icons/lu";
import {AiOutlineDelete} from "react-icons/ai";

const ContextMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuHeight, setMenuHeight] = useState("0px");

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({ x: e.pageX, y: e.pageY });
    }, []);

    const handleClick = useCallback(() => {
        if (showMenu) {
            setMenuHeight("0px");
            setTimeout(() => setShowMenu(false), 200);
        }
    }, [showMenu]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);

    useEffect(() => {
        if (showMenu) {
            setTimeout(() => {
                const menuElement = document.getElementById("context-menu");
                if (menuElement) {
                    setMenuHeight(`${menuElement.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showMenu]);

    const menuItems = [
        {
            icon: <MdContentCopy />,
            label: "Copy",
            action: () => console.log("Copy clicked"),
        },
        {
            icon: <GoLink />,
            label: "Copy Link",
            action: () => console.log("Copy Link clicked"),
        },
        {
            icon: <GoShare />,
            label: "Share",
            action: () => console.log("Share clicked"),
        },
        {
            icon: <LuPencil />,
            label: "Rename",
            action: () => console.log("Rename clicked"),
        },
        {
            icon: <AiOutlineDelete />,
            label: "Delete",
            action: () => console.log("Delete clicked"),
        },
    ];

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <p
                onContextMenu={handleContextMenu}
                className="w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-gray-50 border-gray-300 rounded-md border p-4 text-[1rem]"
            >
                ZENUI LIBRARY - Free Templates & Components Library. Elevate
                your project with free UI components, customizable icons, and
                a color palette. No dependencies required
            </p>

            {showMenu && (
                <div
                    id="context-menu"
                    className="fixed bg-white overflow-hidden dark:bg-slate-800 dark:border-slate-700 transition-all duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200"
                    style={{
                        top: menuPosition.y,
                        left: menuPosition.x,
                        height: menuHeight,
                        zIndex: 50,
                    }}
                >
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                item.action();
                                setShowMenu(false);
                            }}
                            className={`${
                                item.label === "Delete" && "hover:bg-red-50 dark:hover:bg-red-900/30"
                            } w-full px-4 py-2 text-left dark:hover:bg-slate-900/50 hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-600 dark:text-[#abc2d3]`}
                        >
                            <p
                                className={`${
                                    item.label === "Delete" && "dark:text-red-500 text-red-500"
                                } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                            >
                                {item.icon}
                            </p>
                            <p
                                className={`${
                                    item.label === "Delete" && "text-red-500"
                                }`}
                            >
                                {item.label}
                            </p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContextMenu;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'context menu with dropdown'}
                            id={'context_menu_with_dropdown'}
                        />
                    </div>

                    <ComponentDescription text='A context menu with a dropdown appears on right-click and includes
            items that expand to show more options.'/>

                    <ToggleTab code={dropdownContextMenuCode} preview={dropdownContextMenuPreview}
                               setCode={setDropdownContextMenuCode} setPreview={setDropdownContextMenuPreview}/>

                    <ComponentWrapper>
                        {dropdownContextMenuPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <p
                                    onContextMenu={handleContextMenu2}
                                    className='w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-blue-50 border-blue-300 rounded-md border p-4 text-[1rem]'
                                >
                                    ZENUI LIBRARY - Free Templates & Components Library. Elevate
                                    your project with free UI components, customizable icons, and
                                    a color palette. No dependencies required
                                </p>

                                {showMenu2 && (
                                    <div
                                        id='context-menu2'
                                        className={`${
                                            showSubmenu ? 'overflow-visible' : 'overflow-hidden'
                                        } fixed bg-white transition-all dark:bg-slate-800 dark:border-slate-700 duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200`}
                                        style={{
                                            top: menuPosition2.y,
                                            left: menuPosition2.x,
                                            height: menuHeight2,
                                            zIndex: 50,
                                        }}
                                    >
                                        {menuItems2?.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className='relative'
                                                onMouseEnter={() =>
                                                    item.hasSubmenu && setShowSubmenu(true)
                                                }
                                                onMouseLeave={() => {
                                                    item.hasSubmenu && setShowSubmenu(false);
                                                    setSubMenuHeight('0px');
                                                }}
                                            >
                                                <button
                                                    onClick={() => handleItemClick(item)}
                                                    className={`w-full px-4 py-2 text-left flex items-center text-gray-600 dark:text-[#abc2d3] justify-between text-sm${
                                                        item.label ===
                                                        'Delete'
                                                            ? 'hover:bg-red-50 dark:hover:bg-red-900/20'
                                                            : 'hover:bg-gray-50 dark:hover:bg-slate-900/50'
                                                    }
                                                            `}
                                                >
                                                    <div className='flex items-center gap-3'>
                                                        <p
                                                            className={`${
                                                                item.label === 'Delete' && 'dark:text-red-500 text-red-500'
                                                            } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                                                        >
                                                            {item.icon}
                                                        </p>
                                                        <p
                                                            className={`${
                                                                item.label === 'Delete' && 'text-red-500'
                                                            }`}
                                                        >
                                                            {item.label}
                                                        </p>
                                                    </div>
                                                    {item.hasSubmenu && (
                                                        <BsChevronRight className='w-4 h-4 text-gray-400'/>
                                                    )}
                                                </button>

                                                {item.hasSubmenu && showSubmenu && (
                                                    <div
                                                        id='sub-menu'
                                                        className='absolute overflow-hidden transition-all duration-200 left-full top-0 bg-white shadow-md dark:bg-slate-800 dark:border-slate-700 rounded-lg py-2 w-48 border border-gray-200 ml-0.5'
                                                        style={{
                                                            height: subMenuHeight,
                                                        }}
                                                    >
                                                        {item.submenu.map((subItem, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => {
                                                                    subItem.action?.();
                                                                    setShowSubmenu(false);
                                                                }}
                                                                className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600'
                                                            >
                                                                <p
                                                                    className={`${
                                                                        subItem.label === 'Delete' && 'text-red-500'
                                                                    } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                                                                >
                                                                    {subItem.icon}
                                                                </p>
                                                                <p
                                                                    className={`${
                                                                        subItem.label === 'Delete' && 'text-red-500'
                                                                    }`}
                                                                >
                                                                    {subItem.label}
                                                                </p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {dropdownContextMenuCode && (
                            <Showcode
                                code='
import React, {useCallback, useEffect, useState} from "react";

// react icons
import {MdContentCopy} from "react-icons/md";
import {GoLink, GoShare} from "react-icons/go";
import {LuPencil} from "react-icons/lu";
import {AiOutlineDelete} from "react-icons/ai";
import {IoCloudDownloadOutline} from "react-icons/io5";
import {GrCloudUpload} from "react-icons/gr";
import {BsChevronRight} from "react-icons/bs";

const ContextMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [menuHeight, setMenuHeight] = useState("0px");
    const [subMenuHeight, setSubMenuHeight] = useState("0px");
    const [showSubmenu, setShowSubmenu] = useState(false);

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({ x: e.pageX, y: e.pageY });
    }, []);

    const handleClick = useCallback(() => {
        if (showMenu) {
            setMenuHeight("0px");
            setTimeout(() => setShowMenu(false), 200);
        }
    }, [showMenu]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick]);

    useEffect(() => {
        if (showMenu) {
            setTimeout(() => {
                const menuElement = document.getElementById("context-menu2");
                if (menuElement) {
                    setMenuHeight(`${menuElement.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showMenu]);

    useEffect(() => {
        if (showSubmenu) {
            setTimeout(() => {
                const subMenuHeight = document.getElementById("sub-menu");
                if (subMenuHeight) {
                    setSubMenuHeight(`${subMenuHeight.scrollHeight}px`);
                }
            }, 0);
        }
    }, [showSubmenu]);

    const menuItems = [
        {
            icon: <MdContentCopy />,
            label: "Copy",
            action: () => console.log("Copy clicked"),
        },
        {
            icon: <GoShare />,
            label: "Share",
            hasSubmenu: true,
            submenu: [
                {
                    icon: <IoCloudDownloadOutline />,
                    label: "Download",
                    action: () => console.log("Download clicked"),
                },
                {
                    icon: <GrCloudUpload />,
                    label: "Upload",
                    action: () => console.log("Upload clicked"),
                },
                {
                    icon: <GoLink />,
                    label: "Copy Link",
                    action: () => console.log("Copy Link clicked"),
                },
            ],
            action: () => console.log("Share clicked"),
        },
        {
            icon: <LuPencil />,
            label: "Rename",
            action: () => console.log("Rename clicked"),
        },
        {
            icon: <AiOutlineDelete />,
            label: "Delete",
            action: () => console.log("Delete clicked"),
        },
    ];

    const handleItemClick = (item) => {
        if (!item.submenu) {
            item.action?.();
        }
    };


    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <p
                onContextMenu={handleContextMenu}
                className="w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-blue-50 border-blue-300 rounded-md border p-4 text-[1rem]"
            >
                ZENUI LIBRARY - Free Templates & Components Library. Elevate
                your project with free UI components, customizable icons, and
                a color palette. No dependencies required
            </p>

            {showMenu && (
                <div
                    id="context-menu2"
                    className={`${
                        showSubmenu ? "overflow-visible" : "overflow-hidden"
                    } fixed bg-white transition-all dark:bg-slate-800 dark:border-slate-700 duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200`}
                    style={{
                        top: menuPosition.y,
                        left: menuPosition.x,
                        height: menuHeight,
                        zIndex: 50,
                    }}
                >
                    {menuItems?.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative"
                            onMouseEnter={() =>
                                item.hasSubmenu && setShowSubmenu(true)
                            }
                            onMouseLeave={() => {
                                item.hasSubmenu && setShowSubmenu(false);
                                setSubMenuHeight("0px");
                            }}
                        >
                            <button
                                onClick={() => handleItemClick(item)}
                                className={`w-full px-4 py-2 text-left flex items-center text-gray-600 dark:text-[#abc2d3] justify-between text-sm${
                                    item.label ===
                                    "Delete"
                                        ? "hover:bg-red-50 dark:hover:bg-red-900/20"
                                        : "hover:bg-gray-50 dark:hover:bg-slate-900/50"
                                }
                                                            `}
                            >
                                <div className="flex items-center gap-3">
                                    <p
                                        className={`${
                                            item.label === "Delete" && "dark:text-red-500 text-red-500"
                                        } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                                    >
                                        {item.icon}
                                    </p>
                                    <p
                                        className={`${
                                            item.label === "Delete" && "text-red-500"
                                        }`}
                                    >
                                        {item.label}
                                    </p>
                                </div>
                                {item.hasSubmenu && (
                                    <BsChevronRight className="w-4 h-4 text-gray-400"/>
                                )}
                            </button>

                            {item.hasSubmenu && showSubmenu && (
                                <div
                                    id="sub-menu"
                                    className="absolute overflow-hidden transition-all duration-200 left-full top-0 bg-white shadow-md dark:bg-slate-800 dark:border-slate-700 rounded-lg py-2 w-48 border border-gray-200 ml-0.5"
                                    style={{
                                        height: subMenuHeight,
                                    }}
                                >
                                    {item.submenu.map((subItem, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                subItem.action?.();
                                                setShowSubmenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600"
                                        >
                                            <p
                                                className={`${
                                                    subItem.label === "Delete" && "text-red-500"
                                                } text-[1.1rem] dark:text-[#abc2d3] text-gray-600`}
                                            >
                                                {subItem.icon}
                                            </p>
                                            <p
                                                className={`${
                                                    subItem.label === "Delete" && "text-red-500"
                                                }`}
                                            >
                                                {subItem.label}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContextMenu;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/tabs'
                        backName='tabs'
                        forwardName='skeleton'
                        forwardUrl='/components/skeleton'
                    />
                </div>

                <ContentNavbar contents={contextMenuContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Feedback - Context Menu</title>
            </Helmet>
        </>
    );
};

export default Dialog;
