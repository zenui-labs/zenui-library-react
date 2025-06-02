import React, {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import OverviewFooter from '@shared/OverviewFooter.jsx';
import ContentHeader from '@shared/ContentHeader.jsx';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {tableContents} from '@utils/ContentsConfig/DataDisplayContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

import CheckboxTableExample from "./CheckboxTableExample.jsx";
import PaginationTableExample from "./PaginationTableExample.jsx";
import SearchableTableExample from "./SearchableTableExample.jsx";

const Index = () => {
    const sectionIds = tableContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [table1Preview, setTable1Preview] = useState(true);
    const [table1Code, setTable1Code] = useState(false);

    const [table2Preview, setTable2Preview] = useState(true);
    const [table2Code, setTable2Code] = useState(false);

    const [table3Preview, setTable3Preview] = useState(true);
    const [table3Code, setTable3Code] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'searchable table'} id={'searchable_table'}/>

                    <ComponentDescription text='A searchable table lets users quickly filter rows by typing into a
            search box, instantly narrowing displayed data to match keywords or
            phrases.'/>

                    <ToggleTab code={table1Code} setPreview={setTable1Preview} preview={table1Preview}
                               setCode={setTable1Code}/>

                    <ComponentWrapper>
                        {table1Preview && (
                            <SearchableTableExample/>
                        )}

                        {table1Code && (
                            <Showcode
                                code='
import React, {useEffect, useMemo, useState} from "react";

// react icons
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";

const Table = () => {
    const initialData = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "Editor",
            status: "Active",
        },
        {
            id: 4,
            name: "Alice Brown",
            email: "alice@example.com",
            role: "User",
            status: "Active",
        },
        {
            id: 5,
            name: "Charlie Wilson",
            email: "charlie@example.com",
            role: "Admin",
            status: "Inactive",
        },
    ];

    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    // Handle search
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    // Handle sort
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    useEffect(() => {
        const handleCLick = (event) => {
            if (
                !event.target.closest(".zenui-table") &&
                !event.target.closest(".action-btn")
            ) {
                setOpenActionMenuId(null);
            }
        };
        document.addEventListener("click", handleCLick);
        return () => document.removeEventListener("click", handleCLick);
    }, [])

    return (
        <div className="customTable overflow-y-auto p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-4">
                <div className="mb-4">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
                    />
                </div>

                <div className="customTable w-full rounded-md border overflow-hidden dark:border-slate-700 border-gray-200">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-900">
                        <tr>
                            {Object.keys(initialData[0]).map(
                                (key) =>
                                    key !== "id" && (
                                        <th
                                            key={key}
                                            className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-[5px]">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                <HiOutlineArrowsUpDown
                                                    onClick={() => handleSort(key)}
                                                    className="hover:bg-gray-200 dark:hover:bg-slate-800 p-[5px] rounded-md text-[1.6rem]"/>
                                            </div>
                                        </th>
                                    )
                            )}
                            <th className="p-3 text-left dark:text-[#abc2d3] font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-t dark:border-slate-700 dark:hover:bg-slate-900 border-gray-200 hover:bg-gray-50"
                            >
                                {Object.entries(item).map(
                                    ([key, value]) =>
                                        key !== "id" && (
                                            <td key={key} className="p-3 dark:text-[#abc2d3]">
                                                {value}
                                            </td>
                                        )
                                )}
                                <td className="p-3 relative">
                                    <BsThreeDotsVertical
                                        onClick={() => toggleActionMenu(item.id)}
                                        className="action-btn text-gray-600 dark:text-[#abc2d3] cursor-pointer"
                                    />

                                    <div
                                        className={`${
                                            openActionMenuId === item.id
                                                ? "opacity-100 scale-[1] z-30"
                                                : "opacity-0 scale-[0.8] z-[-1]"
                                        }
                                         ${index > 1 ? "bottom-[90%]" : "top-[90%]"}
                                         zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all dark:bg-slate-800 duration-100`}
                                    >
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdOutlineEdit/>
                                            Edit
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdDeleteOutline/>
                                            Delete
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <IoEyeOutline/>
                                            View Details
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {!sortedData?.length && (
                        <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
                            No data found!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'pagination table'} id={'pagination_table'}/>
                    </div>

                    <ComponentDescription text='A pagination table displays data in pages, showing a limited number
            of rows per page with controls to navigate between pages, improving
            data readability.'/>

                    <ToggleTab code={table1Code} setPreview={setTable2Preview} setCode={setTable2Code}
                               preview={table2Preview}/>

                    <ComponentWrapper>
                        {table2Preview && (
                            <PaginationTableExample/>
                        )}

                        {table2Code && (
                            <Showcode
                                code='
import React, {useEffect, useMemo, useRef, useState} from "react";

// react icons
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsChevronLeft, BsChevronRight, BsThreeDotsVertical} from "react-icons/bs";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";
import {IoIosArrowDown} from "react-icons/io";

const Table = () => {
    const initialData = Array.from({ length: 35 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
        status: index % 2 === 0 ? "Active" : "Inactive",
    }));

    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const selectRef = useRef(null);

    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    // Handle search
    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    // Handle sort
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Pagination calculations
    const totalPages = Math.ceil(sortedData.length / pageSize);

    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    const handleOptionClick = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
        setIsOpen(false);
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpenActionMenuId(null)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", () => {
                handleOutsideClick();
            });
    }, []);

    return (
        <div className="customTable overflow-y-auto p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
                    />
                </div>

                <div className="rounded-md border dark:border-slate-700 overflow-hidden border-gray-200 w-full">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-900">
                        <tr>
                            {Object.keys(initialData[0]).map(
                                (key) =>
                                    key !== "id" && (
                                        <th
                                            key={key}
                                            className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-[5px]">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                <HiOutlineArrowsUpDown
                                                    onClick={() => handleSort(key)}
                                                    className="hover:bg-gray-200 dark:hover:bg-slate-800 p-[5px] rounded-md text-[1.6rem]"/>
                                            </div>
                                        </th>
                                    )
                            )}
                            <th className="p-3 text-left dark:text-[#abc2d3] font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-t border-gray-200 dark:border-slate-700 dark:hover:bg-slate-900 hover:bg-gray-50"
                            >
                                {Object.entries(item).map(
                                    ([key, value]) =>
                                        key !== "id" && (
                                            <td key={key} className="p-3 dark:text-[#abc2d3]">
                                                {value}
                                            </td>
                                        )
                                )}
                                <td className="p-3 relative">
                                    <BsThreeDotsVertical
                                        onClick={() => toggleActionMenu(item.id)}
                                        className="action-btn action-btn dark:text-[#abc2d3] text-gray-600 cursor-pointer"
                                    />

                                    <div
                                        className={`${
                                            openActionMenuId === item.id
                                                ? "opacity-100 scale-[1] z-30"
                                                : "opacity-0 scale-[0.8] z-[-1]"
                                        }
                                        ${index > 2 ? "bottom-[90%]" : "top-[90%]"}
                                        zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] dark:bg-slate-800 transition-all duration-100`}
                                    >
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdOutlineEdit/>
                                            Edit
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdDeleteOutline/>
                                            Delete
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <IoEyeOutline/>
                                            View Details
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {!paginatedData?.length && (
                        <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
                            No data found!
                        </p>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                        <div className="text-sm dark:text-[#abc2d3] text-gray-500">
                            Showing {(currentPage - 1) * pageSize + 1} to{" "}
                            {Math.min(currentPage * pageSize, sortedData.length)}{" "}
                            of {sortedData.length} results
                        </div>

                        <div ref={selectRef} className="relative w-44">
                            <button
                                onClick={handleToggle}
                                className="w-max px-2 py-0.5 text-left bg-white border dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:border-slate-700 border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
                            >
                                {pageSize}

                                <IoIosArrowDown
                                    className={`${
                                        isOpen ? "rotate-[180deg]" : "rotate-0"
                                    } transition-all duration-200`}
                                />
                            </button>
                            {isOpen && (
                                <div className="absolute dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] overflow-hidden w-max mt-1 bg-white border border-gray-300 rounded shadow-lg">
                                    <div
                                        className="px-4 py-2 cursor-pointer dark:hover:bg-slate-900/50 hover:bg-gray-100"
                                        onClick={() => handleOptionClick(5)}
                                    >
                                        5
                                    </div>
                                    <div
                                        className="px-4 py-2 cursor-pointer dark:hover:bg-slate-900/50 hover:bg-gray-100"
                                        onClick={() => handleOptionClick(10)}
                                    >
                                        10
                                    </div>
                                    <div
                                        className="px-4 py-2 cursor-pointer dark:hover:bg-slate-900/50 hover:bg-gray-100"
                                        onClick={() => handleOptionClick(20)}
                                    >
                                        20
                                    </div>
                                    <div
                                        className="px-4 py-2 cursor-pointer dark:hover:bg-slate-900/50 hover:bg-gray-100"
                                        onClick={() => handleOptionClick(50)}
                                    >
                                        50
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
                        >
                            <BsChevronLeft/>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {Array.from(
                                {length: Math.min(5, totalPages)},
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`${
                                                pageNum === currentPage &&
                                                "bg-black dark:bg-slate-800 text-white"
                                            } border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
                        >
                            <BsChevronRight/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'checkbox table'} id={'checkbox_table'}/>
                    </div>

                    <ComponentDescription text='A checkbox table lets users select rows using checkboxes, enabling
            bulk actions like delete or export on multiple entries.'/>

                    <ToggleTab code={table3Code} preview={table3Preview} setCode={setTable3Code}
                               setPreview={setTable3Preview}/>

                    <ComponentWrapper>
                        {table3Preview && (
                            <CheckboxTableExample/>
                        )}

                        {table3Code && (
                            <Showcode
                                code='
import React, {useEffect, useMemo, useRef, useState} from "react";

// react icons
import {BiSolidTrash} from "react-icons/bi";
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsChevronLeft, BsChevronRight, BsThreeDotsVertical} from "react-icons/bs";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";
import {IoIosArrowDown} from "react-icons/io";

const Table = () => {
    const initialData = Array.from({ length: 35 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
        status: index % 2 === 0 ? "Active" : "Inactive",
    }));

    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const selectRef = useRef(null);
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const toggleActionMenu = (id) => {
        setOpenActionMenuId(openActionMenuId === id ? null : id);
    };

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.values(item).some((value) =>
                value.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handlePageChange3 = (page) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    const toggleAllInPage = (event) => {
        const newSelected = new Set(selectedRows);
        paginatedData.forEach((item) => {
            if (event.target.checked) {
                newSelected.add(item.id);
            } else {
                newSelected.delete(item.id);
            }
        });
        setSelectedRows(newSelected);
    };

    const paginatedData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );


    const toggleRow = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const isAllInPageSelected = paginatedData.every((item) =>
        selectedRows.has(item.id)
    );

    const handleBulkDelete = () => {
        console.log("Deleting selected rows:", Array.from(selectedRows));
    };

    const handleOptionClick = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
        setIsOpen(false);
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setOpenActionMenuId(null)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", () => {
                handleOutsideClick();
            });
    }, []);

    return (
        <div className="customTable overflow-y-auto p-8 mb-4 flex items-center flex-col gap-5 justify-center">
            <div className="w-full mx-auto p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-sm dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
                        />
                        {selectedRows.size > 0 && (
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 text-red-500"
                            >
                                <BiSolidTrash className="h-4 w-4"/>
                                Delete Selected ({selectedRows.size})
                            </button>
                        )}
                    </div>
                </div>

                <div className="rounded-md border border-gray-200 dark:border-slate-700 overflow-hidden w-full">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-900">
                        <tr>
                            <th className="p-3 w-14">
                                <label className="flex items-center gap-[10px] cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isAllInPageSelected}
                                        className="hidden"
                                        onChange={toggleAllInPage}
                                    />
                                    <div className="relative">
                                <span
                                    className={`${
                                        isAllInPageSelected
                                            ? "opacity-100 z-20 scale-[1]"
                                            : "opacity-0 scale-[0.4] z-[-1]"
                                    } transition-all duration-200 absolute top-0 left-0`}
                                >
                                  <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="Group 335">
                                      <rect
                                          id="Rectangle 331"
                                          x="-0.00012207"
                                          y="6.10352e-05"
                                          width="20"
                                          height="20"
                                          rx="4"
                                          className="fill-[#3B9DF8]"
                                          stroke="#3B9DF8"
                                      ></rect>
                                      <path
                                          id="Vector"
                                          d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                                          fill="white"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>

                                        <span
                                            className={`${
                                                !isAllInPageSelected
                                                    ? "opacity-100 z-20 scale-[1]"
                                                    : "opacity-0 scale-[0.4] z-[-1]"
                                            } transition-all duration-200`}
                                        >
                                  <svg
                                      width="18"
                                      height="18"
                                      viewBox="0 0 21 21"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="Group 335">
                                      <rect
                                          id="Rectangle 331"
                                          x="-0.00012207"
                                          y="6.10352e-05"
                                          width="20"
                                          height="20"
                                          rx="4"
                                          className="fill-transparent dark:stroke-slate-400"
                                          stroke="#ccc"
                                      ></rect>
                                    </g>
                                  </svg>
                                </span>
                                    </div>
                                </label>
                            </th>
                            {Object.keys(initialData[0]).map(
                                (key) =>
                                    key !== "id" && (
                                        <th
                                            key={key}
                                            className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700 cursor-pointer"
                                            onClick={() => handleSort(key)}
                                        >
                                            <div className="flex items-center gap-[5px]">
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                                <HiOutlineArrowsUpDown
                                                    className="hover:bg-gray-200 p-[5px] dark:hover:bg-slate-800 rounded-md text-[1.6rem]"/>
                                            </div>
                                        </th>
                                    )
                            )}
                            <th className="p-3 text-left font-medium dark:text-[#abc2d3] text-gray-700">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedData.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`border-t border-gray-200 dark:border-slate-700 cursor-pointer ${
                                    selectedRows.has(item.id)
                                        ? "bg-blue-50 hover:bg-blue-50 dark:hover:bg-blue-800/20 dark:bg-blue-800/20"
                                        : "hover:bg-gray-50 dark:hover:bg-slate-900"
                                }`}
                            >
                                <td className="p-3">
                                    <label className="flex items-center gap-[10px] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            onChange={() => toggleRow(item.id)}
                                        />
                                        <div className="relative">
                                  <span
                                      className={`${
                                          selectedRows.has(item.id)
                                              ? "opacity-100 z-20 scale-[1]"
                                              : "opacity-0 scale-[0.4] z-[-1]"
                                      } transition-all duration-200 absolute top-0 left-0`}
                                  >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="Group 335">
                                        <rect
                                            id="Rectangle 331"
                                            x="-0.00012207"
                                            y="6.10352e-05"
                                            width="20"
                                            height="20"
                                            rx="4"
                                            className="fill-[#3B9DF8]"
                                            stroke="#3B9DF8"
                                        ></rect>
                                        <path
                                            id="Vector"
                                            d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                                            fill="white"
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>

                                            <span
                                                className={`${
                                                    !selectedRows.has(item.id)
                                                        ? "opacity-100 z-20 scale-[1]"
                                                        : "opacity-0 scale-[0.4] z-[-1]"
                                                } transition-all duration-200`}
                                            >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="Group 335">
                                        <rect
                                            id="Rectangle 331"
                                            x="-0.00012207"
                                            y="6.10352e-05"
                                            width="20"
                                            height="20"
                                            rx="4"
                                            className="fill-transparent dark:stroke-slate-400"
                                            stroke="#ccc"
                                        ></rect>
                                      </g>
                                    </svg>
                                  </span>
                                        </div>
                                    </label>
                                </td>
                                {Object.entries(item).map(
                                    ([key, value]) =>
                                        key !== "id" && (
                                            <td key={key} className="p-3 dark:text-[#abc2d3]">
                                                {value}
                                            </td>
                                        )
                                )}
                                <td className="p-3 relative">
                                    <BsThreeDotsVertical
                                        onClick={() => toggleActionMenu(item.id)}
                                        className="action-btn action-btn dark:text-[#abc2d3] text-gray-600 cursor-pointer"
                                    />

                                    <div
                                        className={`${
                                            openActionMenuId === item.id
                                                ? "opacity-100 scale-[1] z-30"
                                                : "opacity-0 scale-[0.8] z-[-1]"
                                        }
                                        ${index > 2 ? "bottom-[90%]" : "top-[90%]"}
                                        zenui-table absolute dark:bg-slate-800 right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                                    >
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdOutlineEdit/>
                                            Edit
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <MdDeleteOutline/>
                                            Delete
                                        </p>
                                        <p className="flex items-center gap-[8px] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                            <IoEyeOutline/>
                                            View Details
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {!paginatedData?.length && (
                        <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
                            No data found!
                        </p>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-[5px]">
                        <div className="text-sm text-gray-500 dark:text-[#abc2d3]">
                            Showing {(currentPage - 1) * pageSize + 1} to{" "}
                            {Math.min(currentPage * pageSize, sortedData.length)}{" "}
                            of {sortedData.length} results
                        </div>

                        <div ref={selectRef} className="relative w-44">
                            <button
                                onClick={handleToggle}
                                className="w-max px-2 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center dark:text-[#abc2d3] dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-700 justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
                            >
                                {pageSize}

                                <IoIosArrowDown
                                    className={`${
                                        isOpen ? "rotate-[180deg]" : "rotate-0"
                                    } transition-all duration-200`}
                                />
                            </button>
                            {isOpen && (
                                <div className="absolute w-max overflow-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-[#abc2d3] mt-1 bg-white border border-gray-300 rounded shadow-lg">
                                    <div
                                        className="px-4 py-2 dark:hover:bg-slate-900/50 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleOptionClick(5)}
                                    >
                                        5
                                    </div>
                                    <div
                                        className="px-4 py-2 dark:hover:bg-slate-900/50 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleOptionClick(10)}
                                    >
                                        10
                                    </div>
                                    <div
                                        className="px-4 py-2 dark:hover:bg-slate-900/50 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleOptionClick(20)}
                                    >
                                        20
                                    </div>
                                    <div
                                        className="px-4 py-2 dark:hover:bg-slate-900/50 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleOptionClick(50)}
                                    >
                                        50
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange3(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
                        >
                            <BsChevronLeft/>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                            {Array.from(
                                {length: Math.min(5, totalPages)},
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange3(pageNum)}
                                            className={`${
                                                pageNum === currentPage &&
                                                "bg-black dark:bg-slate-800 text-white"
                                            } border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <button
                            onClick={() => handlePageChange3(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border border-gray-200 dark:text-[#abc2d3] dark:border-slate-700 dark:hover:bg-slate-900 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
                        >
                            <BsChevronRight/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/badge'
                        backName='badge'
                        forwardName='redo & undo'
                        forwardUrl='/components/redo-undo'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={tableContents}/>

            </aside>
            <Helmet>
                <title>Data Display - Table</title>
            </Helmet>
        </>
    );
};

export default Index;
