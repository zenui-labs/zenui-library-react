import React, {useEffect, useState, useRef} from "react";
import {IoIosArrowDown, IoMdClose} from "react-icons/io";

const SelectInput = ({
                         value,
                         label,
                         options,
                         onChange,
                         placeholder,
                         selectClassName = "select-component",
                         isMulti = false
                     }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const filteredItems = options.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (isMulti) {
            setSelectedOptions(Array.isArray(value) ? value : []);
        } else {
            const selected = options.find((option) => option === value);
            setSelectedOptions(selected || null);
        }
    }, [value, options, isMulti]);

    const toggleSelection = (item) => {
        if (isMulti) {
            let newSelectedOptions;
            if (selectedOptions.includes(item)) {
                newSelectedOptions = selectedOptions.filter(option => option !== item);
            } else {
                newSelectedOptions = [...selectedOptions, item];
            }
            setSelectedOptions(newSelectedOptions);
            onChange(newSelectedOptions);

            setSearch("");
            inputRef.current?.focus();
        } else {
            onChange(item);
            setSelectedOptions(item);
            setIsOpen(false);
        }
    };

    const removeItem = (item, e) => {
        e.stopPropagation();
        const newSelectedOptions = selectedOptions.filter(option => option !== item);
        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
            setSearch("");
        }, 200);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                handleBlur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setSearch("");
        }
    }, [isOpen]);

    return (
        <div className="mt-1.5">
            {label && (
                <span className="text-sm font-medium text-gray-700 dark:text-darkTextColor">{label}</span>
            )}

            <div className={`relative ${selectClassName} mt-1`} ref={inputRef}>
                {isMulti && selectedOptions.length > 0 ? (
                    <div
                        className="flex flex-wrap gap-1 min-h-10 items-center w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-900 rounded-lg px-2 py-1.5 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        {selectedOptions.map((item) => (
                            <div
                                key={item}
                                className="flex items-center bg-[#0FABCA]/10 text-[#0FABCA] px-2 py-1.5 rounded-md text-sm"
                            >
                                <span className="capitalize">{item}</span>
                                <button
                                    className="ml-1 text-[#0FABCA] hover:text-[#0FABCA]/80"
                                    onClick={(e) => removeItem(item, e)}
                                >
                                    <IoMdClose size={16}/>
                                </button>
                            </div>
                        ))}

                        {isOpen && (
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="flex-grow border-none focus:ring-0 outline-none bg-transparent text-sm py-1 px-1"
                                autoFocus
                            />
                        )}
                    </div>
                ) : (
                    <div
                        className="flex items-center w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-900 rounded-lg cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={isMulti ? search : (isOpen ? search : (selectedOptions || ""))}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            className="w-full capitalize text-sm dark:text-darkTextColor text-gray-700 bg-transparent rounded-lg px-3 py-3 focus:outline-none cursor-pointer"
                            readOnly={!isOpen}
                        />
                    </div>
                )}

                <IoIosArrowDown
                    className={`${isOpen ? "rotate-180" : "rotate-0"} transition-all duration-300 text-lg absolute top-1/2 transform dark:text-darkSubTextColor -translate-y-1/2 right-3 text-gray-500`}
                />

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute left-0 dark:bg-slate-900 dark:border-slate-700 w-full mt-1 max-h-60 overflow-y-auto py-1 rounded-lg bg-white shadow-lg z-20 border border-gray-200"
                    >
                        <div className="w-full">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <div
                                        key={item}
                                        onClick={() => toggleSelection(item)}
                                        className={`${selectedOptions?.includes(item) && 'bg-gray-50 dark:bg-slate-800/50'} py-3 px-6 gap-1 cursor-pointer dark:text-darkSubTextColor flex dark:hover:bg-slate-800/50 capitalize items-center hover:bg-gray-50`}
                                    >
                                        {
                                            isMulti && (
                                                <div className={`w-5 h-5 mr-2 flex items-center justify-center ${
                                                    isMulti
                                                        ? (selectedOptions.includes(item) ? "bg-[#0FABCA]" : "border border-gray-300 dark:border-slate-600")
                                                        : "invisible"
                                                } rounded transition-all duration-200`}
                                                >
                                                    {isMulti && selectedOptions.includes(item) && (
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             className="h-3 w-3 text-white"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                    )}
                                                </div>
                                            )
                                        }
                                        <span className='text-[0.9rem] 640px:text-[1rem]'>{item}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 py-4">
                                    No options found
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