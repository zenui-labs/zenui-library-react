import {useState, useEffect, useRef} from 'react';
import {IoIosArrowDown} from "react-icons/io";

interface Option {
    name: string;
    slug: string;
    image?: string;
}

const CustomSelect = ({setBookmark}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({
        name: 'All',
        slug: 'all'
    },);
    const selectRef = useRef(null);

    const platforms: Option[] = [
        {
            name: 'All',
            slug: 'all'
        },
        {
            name: 'Bookmarks',
            slug: 'bookmarks'
        }
    ]

    const handleSelect = (item) => {
        setSelectedOption(item);
        setBookmark(item)
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                handleBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative custom-select w-full 640px:w-[180px]" ref={selectRef}>
            {/* Selected name */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-[42px] w-full cursor-pointer items-center rounded-[10px] border border-hairline bg-surface pl-3.5 pr-10 text-[0.9rem] text-ink-muted relative`}
            >
                <p className={`${selectedOption ? 'text-ink' : 'text-ink-subtle'} text-[0.9rem]`}>
                    {selectedOption ? selectedOption.name : 'Filter by bookmark'}
                </p>
            </div>

            {/* Dropdown icon */}
            <IoIosArrowDown
                size="20"
                className={`transition-all duration-300 text-[1.1rem] absolute top-1/2 -translate-y-1/2 right-3 text-ink-subtle ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                }`}
            />

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="absolute left-0 z-20 mt-1.5 w-full rounded-xl border border-hairline bg-surface p-1 shadow-float">
                    <div className="w-full overflow-auto py-1">
                        {platforms.map((item) => (
                            <p
                                key={item.slug}
                                onClick={() => handleSelect(item)}
                                className="cursor-pointer rounded-lg px-3 py-2 text-[0.875rem] text-ink-muted hover:bg-raised hover:text-ink"
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
