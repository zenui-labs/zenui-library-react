import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({ value, label, options, onChange }) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(null);

    const filteredItems = options.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const selected = options.find((option) => option === value);
        setSelectedOptions(selected || null);
    }, [value, options]);

    const toggleSelection = (item) => {
        onChange(item);
        setSelectedOptions(item);
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".custom-select")) return;
            handleBlur();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <span className="text-[1rem] font-semibold dark:text-darkTextColor text-gray-800">{label}</span>
            <div className="relative custom-select mt-1">
                {/* Input field */}
                <input
                    type="text"
                    placeholder="Search.."
                    value={isOpen ? search : selectedOptions || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="w-full border capitalize dark:border-slate-700 dark:bg-slate-900 dark:text-darkTextColor text-gray-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                />

                {/* Dropdown icon */}
                <IoIosArrowDown
                    className={`${isOpen ? "rotate-[180deg]" : "rotate-0"} transition-all duration-300 text-[1.3rem] absolute top-[50%] transform dark:text-darkSubTextColor translate-y-[-50%] right-3 text-gray-500`}
                />

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute left-0 dark:bg-slate-900 dark:border-slate-700 w-full mt-1 border border-gray-200 max-h-[300px] overflow-y-auto py-1 rounded-md bg-white shadow-lg z-20">
                        <div className="w-full overflow-auto">
                            {filteredItems.map((item) => (
                                <p
                                    key={item.id}
                                    onClick={() => toggleSelection(item)}
                                    className="cursor-pointer dark:text-darkSubTextColor px-3 py-2 flex dark:hover:bg-slate-800/50 capitalize items-center hover:bg-gray-200"
                                >
                                    <img
                                        src="https://besnik-space.fra1.cdn.digitaloceanspaces.com/doplac/dYj3EG2tlN8jM29cWxiA1711341238.svg"
                                        alt="checkicon"
                                        className={`${
                                            selectedOptions === item
                                                ? "scale-[1] opacity-100"
                                                : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all duration-300 w-6 h-6`}
                                    />
                                    {item}
                                </p>
                            ))}

                            {filteredItems.length === 0 && (
                                <p className="text-center text-[0.9rem] text-text py-8">
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

export default Select;
