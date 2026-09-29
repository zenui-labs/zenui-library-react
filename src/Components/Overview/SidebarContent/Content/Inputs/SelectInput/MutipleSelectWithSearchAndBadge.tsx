import {useEffect, useState} from "react";

// react icons
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

interface Option {
    id: number;
    name: string;
}

const MultipleSelectWithSearchAndBadge = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const options: Option[] = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 5, name: "Option 5" },
    ];

    const filteredItems = options.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const isSelected = (item: Option) => {
        return selectedOptions.some((selectedItem) => selectedItem.id === item.id);
    };

    const toggleSelectItem = (item: Option) => {
        if (isSelected(item)) {
            setSelectedOptions(
                selectedOptions.filter((selectedItem) => selectedItem.id !== item.id)
            );
        } else {
            setSelectedOptions([...selectedOptions, item]);
        }
    };

    const removeItem = (option: Option) => {
        setSelectedOptions(
            selectedOptions.filter((selectedItem) => selectedItem.id !== option.id)
        );
    };

    useEffect(() => {
        document.addEventListener("click", (event) => {
            if (!(event.target as HTMLElement).closest(".custom-select")) {
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
                                <p className="text-center dark:text-[#abc2d3] text-[0.9rem] text-text py-8">
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

export default MultipleSelectWithSearchAndBadge;
