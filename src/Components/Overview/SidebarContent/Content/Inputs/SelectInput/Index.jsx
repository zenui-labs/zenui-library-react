import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter.jsx';
import ContentHeader from '@shared/ContentHeader.jsx';

// contents for scrollspy
import {selectInputContents} from '@utils/ContentsConfig/InputContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

// all the examples
import SelectExample from "./SelectExample.jsx";
import SelectWithIconExample from "./SelectWithIconExample.jsx";
import MultipleSelectWithSearch from "./MultipleSelectWithSearch.jsx";
import SingleSelectWithSearch from "./SingleSelectWithSearch.jsx";
import SingleSelectWithSearchAndBadge from "./SingleSelectWithSearchAndBadge.jsx";
import MultipleSelectWithSearchAndBadge from "./MutipleSelectWithSearchAndBadge.jsx";

const Index = () => {
    const sectionIds = selectInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // code
    const [selectPreview, setSelectPreview] = useState(true);
    const [selectCode, setSelectCode] = useState(false);

    // select with icon
    const [iconSelectPreview, setIconSelectPreview] = useState(true);
    const [iconSelectCode, setIconSelectCode] = useState(false);

    // multiple section with search
    const [multipleWithSearchPreview, setMultipleWithSearchPreview] =
        useState(true);
    const [multipleWithSearchCode, setMultipleWithSearchCode] = useState(false);

    // single section with search
    const [singleWithSearchPreview, setSingleWithSearchPreview] = useState(true);
    const [singleWithSearchCode, setSingleWithSearchCode] = useState(false);

    // single select search with badge
    const [singleSearchWithBadgePreview, setSingleSearchWithBadgePreview] =
        useState(true);
    const [singleSearchWithBadgeCode, setSingleSearchWithBadgeCode] =
        useState(false);

    // multiple select search with badge
    const [multipleSearchWithBadgePreview, setMultipleSearchWithBadgePreview] =
        useState(true);
    const [multipleSearchWithBadgeCode, setMultipleSearchWithBadgeCode] =
        useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'Select'} id={'select'}/>

                    <ComponentDescription text='This is a select component. Choose options from the dropdown menu
            for seamless interaction.'/>

                    <ToggleTab code={selectCode} setCode={setSelectCode} preview={selectPreview}
                               setPreview={setSelectPreview}/>

                    <ComponentWrapper>
                        {selectPreview && (
                            <SelectExample/>
                        )}

                        {selectCode && (
                            <Showcode
                                code="
import React, {useEffect, useState} from 'react';

// react icons
import {IoChevronDown} from 'react-icons/io5';

const SelectInput = () => {
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState('Select Option');

    const options = ['Football', 'Cricket', 'Tennis', 'Badminton'];

    // outside click to off dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            let target = event.target;

            if (!target.closest('.dropdown')) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
            <button
                className='bg-[#fff] dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border border-[#d1d1d1] rounded-md w-[80%] justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown'
                onClick={() => setIsActive(!isActive)}
            >
                {content}
                <IoChevronDown
                    className={`${
                        isActive ? ' rotate-[180deg]' : ' rotate-0'
                    } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                    className={`${
                        isActive
                            ? ' z-[1] opacity-100 scale-[1]'
                            : ' z-[-1] opacity-0 scale-[0.8]'
                    } w-full absolute top-12 left-0 right-0 z-40 dark:bg-slate-800 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                        boxShadow: '0 15px 60px -15px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {options?.map((option, index) => (
                        <p
                            className='py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200'
                            key={index}
                            onClick={(e) => setContent(e.target.textContent)}
                        >
                            {option}
                        </p>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default SelectInput;
                    "
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Select with icon'} id={'select_with_icon'}/>
                    </div>

                    <ComponentDescription text='This is a select with icon component. Select options from the
            dropdown menu enriched with intuitive icons.'/>

                    <ToggleTab code={iconSelectCode} setCode={setIconSelectCode} setPreview={setIconSelectPreview}
                               preview={iconSelectPreview}/>

                    <ComponentWrapper>
                        {iconSelectPreview && (
                            <SelectWithIconExample/>
                        )}

                        {iconSelectCode && (
                            <Showcode
                                code="
import React, {useEffect, useState} from 'react';

// react icons
import {IoMdFootball} from 'react-icons/io';
import {MdOutlineSportsCricket, MdOutlineSportsTennis} from 'react-icons/md';
import {GiTennisRacket} from 'react-icons/gi';
import {IoChevronDown} from 'react-icons/io5';

const SelectInput = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select Option');

    const options = [
        {
            icon: <IoMdFootball />,
            title: 'Football',
        },
        {
            icon: <MdOutlineSportsCricket />,
            title: 'Cricket',
        },
        {
            icon: <MdOutlineSportsTennis />,
            title: 'Tennis',
        },
        {
            icon: <GiTennisRacket />,
            title: 'Badminton',
        },
    ];

    // outside click to off the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            let target = event.target;

            if (!target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
            <button
                className='bg-[#fff] dark:border-slate-600 dark:bg-transparent dark:text-[#abc2d3] border border-[#d1d1d1] rounded-md w-[80%] justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                {selectedItem}
                <IoChevronDown
                    className={`${
                        isDropdownOpen ? ' rotate-[180deg]' : ' rotate-0'
                    } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                    className={`${
                        isDropdownOpen
                            ? 'z-[1] opacity-100 scale-[1]'
                            : 'z-[-1] opacity-0 scale-[0.8]'
                    } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                        boxShadow: '0 15px 60px -15px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {options?.map((option, index) => (
                        <p
                            className='py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200 flex items-center gap-2'
                            key={index}
                            onClick={(e) => setSelectedItem(e.target.textContent)}
                        >
                            {option.icon}
                            {option.title}
                        </p>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default SelectInput;
                    "
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'multiple select with search'}
                            id={'multiple_select_with_search'}
                        />
                    </div>

                    <ComponentDescription text=' Multiple select dropdown with a search feature, allowing users to
            easily find and select multiple options from a large list.'/>

                    <ToggleTab code={multipleWithSearchCode} setCode={setMultipleWithSearchCode}
                               preview={multipleWithSearchPreview} setPreview={setMultipleWithSearchPreview}/>

                    <ComponentWrapper>
                        {multipleWithSearchPreview && (
                            <MultipleSelectWithSearch/>
                        )}

                        {multipleWithSearchCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

const SelectInput = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // all options
    const options = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
    ];

    // filtered items
    const filteredItems = options.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // checking is the item is selected or not
    const isSelected = (item) => {
        return selectedItems.some((selectedItem) => selectedItem.id === item.id);
    };

    // the select toggle
    const toggleSelect = (item) => {
        if (isSelected(item)) {
            setSelectedItems(
                selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
            );
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    // outside click to off the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".custom-select")) return;
            setTimeout(() => {
                setIsDropdownOpen(false);
            }, 200);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="relative custom-select w-[80%]">
                {/* Input field with search functionality */}
                <input
                    type="text"
                    placeholder="Search.."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    className={`w-full border dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border-gray-300 rounded-md px-3 py-2 focus:outline-none`}
                />

                <IoIosArrowDown
                    className={`${
                        isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-300 text-[1.3rem] absolute top-[50%] transform translate-y-[-50%] right-3 text-gray-500`}
                />

                {/* Dropdown menu */}
                {isDropdownOpen && (
                    <div
                        className="absolute left-0 dark:border-slate-700 dark:bg-slate-800 w-full mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-20">
                        <div className="w-full overflow-auto">
                            {filteredItems.map((item) => (
                                <p
                                    key={item.id}
                                    onClick={() => toggleSelect(item)}
                                    className="cursor-pointer px-3 dark:text-[#abc2d3] dark:hover:bg-slate-900/40 py-2 flex items-center hover:bg-gray-200"
                                >
                                    <IoCheckmark
                                        className={`${
                                            isSelected(item)
                                                ? "scale-[1] opacity-100"
                                                : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all text-[1.3rem] duration-300`}
                                    />
                                    {item.name}
                                </p>
                            ))}

                            {filteredItems?.length === 0 && (
                                <p className="text-center dark:text-[#abc2d3] text-[0.9rem] text-text py-8">
                                    No search found!
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'single select with search'}
                            id={'single_select_with_search'}
                        />
                    </div>

                    <ComponentDescription text='Single select dropdown with a search feature, enabling users to
            quickly find and choose one option from a list.'/>

                    <ToggleTab code={singleWithSearchCode} setCode={setSingleWithSearchCode}
                               setPreview={setSingleWithSearchPreview} preview={singleWithSearchPreview}/>

                    <ComponentWrapper>
                        {singleWithSearchPreview && (
                            <SingleSelectWithSearch/>
                        )}

                        {singleWithSearchCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

const SelectInput = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const options = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
    ];

    const filteredItems = options.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const isSelected = (item) => {
        return selectedItem?.id === item.id;
    };

    const toggleItem = (item) => {
        setSelectedItem(item);
    };

    // outside click to off the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".custom-select")) return;
            setTimeout(() => {
                setIsOpenDropdown(false);
            }, 200);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="relative custom-select w-[80%]">
                {/* Input field with search functionality */}
                <input
                    type="text"
                    placeholder="Search.."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsOpenDropdown(true)}
                    className={`w-full dark:border-slate-600 dark:bg-transparent dark:text-[#abc2d3] border border-gray-300 rounded-md px-3 py-2 focus:outline-none`}
                />

                <IoIosArrowDown
                    className={`${
                        isOpenDropdown ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-300 text-[1.3rem] absolute top-[50%] transform translate-y-[-50%] right-3 text-gray-500`}
                />

                {/* Dropdown menu */}
                {isOpenDropdown && (
                    <div
                        className="absolute left-0 w-full mt-1 border dark:border-slate-700 dark:bg-slate-800 border-gray-200 rounded-md bg-white shadow-lg z-20">
                        <div className="w-full overflow-auto">
                            {filteredItems.map((item) => (
                                <p
                                    key={item.id}
                                    onClick={() => toggleItem(item)}
                                    className="cursor-pointer px-3 py-2 dark:hover:bg-slate-900/40 flex items-center hover:bg-gray-200 dark:text-[#abc2d3]"
                                >
                                    <IoCheckmark
                                        className={`${
                                            isSelected(item)
                                                ? "scale-[1] opacity-100"
                                                : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all text-[1.3rem] duration-300`}
                                    />
                                    {item.name}
                                </p>
                            ))}

                            {filteredItems?.length === 0 && (
                                <p className="text-center dark:text-[#abc2d3] text-[0.9rem] text-[#424242] py-8">
                                    No search found!
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'single select with search and badge'}
                            id={'single_select_with_search_and_badge'}
                        />
                    </div>

                    <ComponentDescription text='Single select dropdown with a search feature and a badge to
            highlight the selected option, making it easy to identify your
            choice.'/>

                    <ToggleTab code={singleSearchWithBadgeCode} setCode={setSingleSearchWithBadgeCode}
                               preview={singleSearchWithBadgePreview} setPreview={setSingleSearchWithBadgePreview}/>

                    <ComponentWrapper>
                        {singleSearchWithBadgePreview && (
                            <SingleSelectWithSearchAndBadge/>
                        )}

                        {singleSearchWithBadgeCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

const SelectInput = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const options = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
    ];

    const filteredItems = options.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const isSelected = (item) => {
        return selectedItem?.id === item.id;
    };

    const removeItem = () => {
        setSelectedItem(null);
    };

    const toggleItem = (item) => {
        setSelectedItem(item);
    };

    // outside click to off the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".custom-select")) return;
            setTimeout(() => {
                setIsDropdownOpen(false);
            }, 200);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="relative custom-select w-[80%]">
                {/* Input field with search functionality */}
                <input
                    type="text"
                    placeholder="Search.."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    className={`w-full dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border border-gray-300 rounded-md px-3 py-2 focus:outline-none`}
                />

                <IoIosArrowDown
                    className={`${
                        isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-300 text-[1.3rem] absolute top-[10px] right-3 text-gray-500`}
                />

                {/* Dropdown menu */}
                {isDropdownOpen && (
                    <div
                        className="absolute left-0 dark:border-slate-700 dark:bg-slate-800 w-full mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-20">
                        <div className="w-full overflow-auto">
                            {filteredItems.map((item) => (
                                <p
                                    key={item.id}
                                    onClick={() => toggleItem(item)}
                                    className="cursor-pointer dark:text-[#abc2d3] dark:hover:bg-slate-900/40 px-3 py-2 flex items-center hover:bg-gray-200"
                                >
                                    <IoCheckmark
                                        className={`${
                                            isSelected(item)
                                                ? "scale-[1] opacity-100"
                                                : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all text-[1.3rem] duration-300`}
                                    />
                                    {item.name}
                                </p>
                            ))}

                            {filteredItems?.length === 0 && (
                                <p className="text-center dark:text-[#abc2d3] text-[0.9rem] text-[#424242] py-8">
                                    No search found!
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Selected items */}
                {selectedItem !== null && (
                    <div
                        key={selectedItem.id}
                        className="bg-blue-100 dark:bg-slate-800 dark:border dark:border-slate-700 dark:text-[#abc2d3]/80 w-max text-blue-800 px-3 py-[0.1rem] text-[0.9rem] rounded-full flex items-center mt-2"
                    >
                        {selectedItem.name}
                        <button
                            onClick={() => removeItem()}
                            className="ml-2 text-blue-800 dark:text-red-600 text-[1.2rem]"
                        >
                            &times;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'multiple select with search and badge'}
                            id={'multiple_select_with_search_and_badge'}
                        />
                    </div>

                    <ComponentDescription text='Multiple select dropdown with search and badges, allowing users to
            find options easily and display selected items with visual badges.'/>

                    <ToggleTab code={multipleSearchWithBadgeCode} setCode={setMultipleSearchWithBadgeCode}
                               setPreview={setMultipleSearchWithBadgePreview} preview={multipleSearchWithBadgePreview}/>

                    <ComponentWrapper>
                        {multipleSearchWithBadgePreview && (
                            <MultipleSelectWithSearchAndBadge/>
                        )}

                        {multipleSearchWithBadgeCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

const SelectInput = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
    ];

    const filteredItems = options.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const isSelected = (item) => {
        return selectedOptions.some((selectedItem) => selectedItem.id === item.id);
    };

    const toggleSelectItem = (item) => {
        if (isSelected(item)) {
            setSelectedOptions(
                selectedOptions.filter((selectedItem) => selectedItem.id !== item.id)
            );
        } else {
            setSelectedOptions([...selectedOptions, item]);
        }
    };

    const removeItem = (option) => {
        setSelectedOptions(
            selectedOptions.filter((selectedItem) => selectedItem.id !== option.id)
        );
    };

    useEffect(() => {
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".custom-select")) {
                setIsOpenDropdown(false);
            }
        });
    }, [isOpenDropdown]);

    return (
        <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="relative custom-select w-[80%]">
                {/* Input field with search functionality */}
                <input
                    type="text"
                    placeholder="Search.."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsOpenDropdown(true)}
                    className={`w-full dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border border-gray-300 rounded-md px-3 py-2 focus:outline-none`}
                />

                <IoIosArrowDown
                    className={`${
                        isOpenDropdown ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-300 text-[1.3rem] absolute top-[10px] right-3 text-gray-500`}
                />

                {/* Dropdown menu */}
                {isOpenDropdown && (
                    <div
                        className="absolute dark:border-slate-700 dark:bg-slate-800 left-0 w-full mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-20">
                        <div className="w-full overflow-auto">
                            {filteredItems.map((item) => (
                                <p
                                    key={item.id}
                                    onClick={() => toggleSelectItem(item)}
                                    className="cursor-pointer dark:text-[#abc2d3] dark:hover:bg-slate-900/40 px-3 py-2 flex items-center hover:bg-gray-200"
                                >
                                    <IoCheckmark
                                        className={`${
                                            isSelected(item)
                                                ? "scale-[1] opacity-100"
                                                : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all text-[1.3rem] duration-300`}
                                    />
                                    {item.name}
                                </p>
                            ))}

                            {filteredItems?.length === 0 && (
                                <p className="text-center dark:text-[#abc2d3] text-[0.9rem] text-[#424242] py-8">
                                    No search found!
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Selected items */}
                {selectedOptions?.length > 0 && (
                    <div className="flex items-center gap-[5px] flex-wrap">
                        {selectedOptions?.map((item) => (
                            <div
                                key={item.id}
                                className="bg-blue-100 dark:bg-slate-800 dark:border-slate-700 dark:border dark:text-[#abc2d3]/80 min-w-fit text-blue-800 px-3 py-[0.1rem] text-[0.9rem] rounded-full flex items-center mt-2"
                            >
                                {item.name}
                                <button
                                    onClick={() => removeItem(item)}
                                    className="ml-2 dark:text-red-600 text-blue-800 text-[1.2rem]"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/strong-password'
                        backName='strong password'
                        forwardName='radio'
                        forwardUrl='/components/input-radio'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={selectInputContents}/>

            </aside>
            <Helmet>
                <title>Form - Select</title>
            </Helmet>
        </>
    );
};

export default Index;
