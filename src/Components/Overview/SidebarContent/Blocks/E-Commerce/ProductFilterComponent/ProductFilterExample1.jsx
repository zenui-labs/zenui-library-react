import React, {useEffect, useState} from 'react';
import {IoEyeOutline, IoSearch} from "react-icons/io5";
import {IoIosArrowDown, IoMdHeartEmpty} from "react-icons/io";
import {HiArrowsUpDown} from "react-icons/hi2";
import {FaStar} from "react-icons/fa";

const ProductFilterExample1 = () => {

    const products = [
        {
            id: "1",
            name: "2020 M1 True Wireless Bluetooth Headphones",
            price: 299.99,
            rating: 4.5,
            reviews: 128,
            category: ["Electronics", "Audio", "Wireless Accessories"],
            brand: "Apple",
            image: "https://i.ibb.co.com/phjMmsG/Image-11.png",
            labels: ["NEW"],
            inStock: true,
            specs: {
                color: ["Black", "White"],
                connectivity: ["Bluetooth 5.0"],
                type: "In-ear"
            }
        },
        {
            id: "2",
            name: "Samsung Electronics Ultrawide Gaming Monitor",
            price: 499.99,
            rating: 4.8,
            reviews: 256,
            category: ["Electronics", "Computer Accessories", "Monitors"],
            brand: "Samsung",
            image: "https://i.ibb.co.com/fdz6djB/Image-10.png",
            labels: ["POPULAR"],
            inStock: true,
            specs: {
                size: "34-inch",
                type: "LED",
                resolution: "3440x1440"
            }
        },
        {
            id: "3",
            name: "Professional Gaming Mechanical Keyboard",
            price: 159.99,
            rating: 4.7,
            reviews: 89,
            category: ["Gaming", "Computer Accessories"],
            brand: "Razer",
            image: "https://i.ibb.co.com/Tk4kb93/Image-17.png",
            labels: ["HOT"],
            inStock: true,
            specs: {
                type: "Mechanical",
                connectivity: ["Wired", "Wireless"]
            }
        },
        {
            id: "4",
            name: "4K Ultra HD Smart TV",
            price: 899.99,
            rating: 4.6,
            reviews: 312,
            category: ["Electronics", "TV"],
            brand: "LG",
            image: "https://i.ibb.co.com/ZVsvWnM/Image-12.png",
            inStock: true,
            specs: {
                size: "55-inch",
                type: "OLED",
                resolution: "3840x2160"
            }
        },
        {
            id: "5",
            name: "Wireless Security Camera",
            price: 79.99,
            rating: 4.3,
            reviews: 167,
            category: ["Electronics", "Security"],
            brand: "Xiaomi",
            image: "https://i.ibb.co.com/nMgLvb1/Image-19.png",
            labels: ["SALE"],
            inStock: true,
            specs: {
                connectivity: ["Wi-Fi"],
                type: "Indoor"
            }
        },
        {
            id: "6",
            name: "Professional Noise-Cancelling Headphones",
            price: 349.99,
            rating: 4.9,
            reviews: 423,
            category: ["Electronics", "Audio"],
            brand: "Sony",
            image: "https://i.ibb.co.com/Nx6H5s3/Image-16.png",
            inStock: true,
            specs: {
                color: ["Black", "Silver"],
                connectivity: ["Bluetooth 5.0", "Wired"],
                type: "Over-ear"
            }
        },
        {
            id: "7",
            name: "High-Performance Gaming Laptop",
            price: 1299.99,
            rating: 4.7,
            reviews: 89,
            category: ["Electronics", "Computers", "Gaming"],
            brand: "ASUS",
            image: "https://i.ibb.co.com/H74t7f2/Image-21.png",
            labels: ["NEW"],
            inStock: true,
            specs: {
                processor: "Intel Core i7",
                storage: "512GB SSD",
                size: "15.6-inch"
            }
        },
        {
            id: "11",
            name: "4K Action Camera",
            price: 399.99,
            rating: 4.8,
            reviews: 178,
            category: ["Electronics", "Cameras"],
            brand: "GoPro",
            image: "https://i.ibb.co.com/cgxVvgP/Image-20.png",
            labels: ["HOT"],
            inStock: true,
            specs: {
                resolution: "4K",
                type: "Waterproof"
            }
        },
        {
            id: "14",
            name: "Wireless Gaming Controller",
            price: 59.99,
            rating: 4.5,
            reviews: 203,
            category: ["Gaming", "Wireless Accessories"],
            brand: "Microsoft",
            image: "https://i.ibb.co.com/xS5hwjd/Image-22.png",
            inStock: true,
            specs: {
                connectivity: ["Bluetooth"],
                type: "Xbox-compatible"
            }
        },
        {
            id: "15",
            name: "Smart Thermostat",
            price: 249.99,
            rating: 4.6,
            reviews: 187,
            category: ["Electronics", "Smart Home"],
            brand: "Nest",
            image: "https://i.ibb.co.com/b5c4Z7r/Image-23.png",
            labels: ["POPULAR"],
            inStock: true,
            specs: {
                connectivity: ["Wi-Fi"],
                type: "Energy-saving"
            }
        }
    ];

    const [toggleId, setToggleId] = useState(null);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [activePriceRange, setActivePriceRange] = useState(null);
    const [value, setValue] = useState(0);
    const [activebrand, setActivebrand] = useState(null);
    const [activeTag, setActiveTag] = useState(null);
    const [rating, setRating] = useState(5);
    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [compareVisible, setCompareVisible] = useState(false);
    const [quickViewVisible, setQuickViewVisible] = useState(false);
    const [allProducts, setAllProducts] = useState(products);

    const [filters, setFilters] = useState({
        search: '',
        categories: [],
        priceRange: {min: 0, max: Infinity},
        brands: [],
        tags: []
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const newValue = ((event.clientX - slider.left) / slider.width) * 100;
        setValue(Math.min(Math.max(newValue, 0), 5000));
    };

    const handleCheckboxChange = (event, data) => {
        if (event.target.checked) {
            setActivebrand(data.id)
        }
    }

    useEffect(() => {
        let result = products.filter(product => {
            // Search filter
            const searchMatch = product.name.toLowerCase().includes(filters.search.toLowerCase());

            // Category filter
            const categoryMatch = filters.categories.length === 0 ||
                filters.categories.some(cat => product.category.includes(cat));

            // Price range filter
            const priceMatch = product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max;

            // Brand filter
            const brandMatch = filters.brands.length === 0 ||
                filters.brands.includes(product.brand);

            // Tag filter
            const tagMatch = filters.tags.length === 0 ||
                filters.tags.some(tag => product.category.includes(tag));

            return searchMatch && categoryMatch && priceMatch && brandMatch && tagMatch;
        });

        setAllProducts(result);
    }, [filters, products]);

    // Handler for updating filters
    const updateFilter = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    // Toggle selection for multi-select filters
    const toggleFilterSelection = (filterType, value) => {
        setFilters(prev => {
            const currentFilter = prev[filterType];
            const isSelected = currentFilter.includes(value);

            return {
                ...prev,
                [filterType]: isSelected
                    ? currentFilter.filter(item => item !== value)
                    : [...currentFilter, value]
            };
        });
    };

    const categories = [
        {
            id: 1,
            name: 'Electronics Devices',
            slug: 'electronics_devices'
        },
        {
            id: 2,
            name: 'Computer & Laptop',
            slug: 'computer_&_laptop'
        },
        {
            name: 'Computer Accessories',
            slug: 'computer_accessories'
        },
        {
            id: 3,
            name: 'SmartPhone',
            slug: 'smart_phone'
        },
        {
            id: 4,
            name: 'Headphone',
            slug: 'headphone'
        },
        {
            id: 5,
            name: 'Mobile Accessories',
            slug: 'mobile_accessories'
        },
        {
            id: 6,
            name: 'Gaming Console',
            slug: 'gaming_console'
        },
        {
            id: 7,
            name: 'Camera & Photo',
            slug: 'camera_&_photo'
        },
        {
            id: 8,
            name: 'TV & Homes Appliances',
            slug: 'tv_&_homes_appliances'
        },
        {
            id: 9,
            name: 'Watchs & Accessories',
            slug: 'watchs_&_accessories'
        },
        {
            id: 10,
            name: 'GPS & Navigation',
            slug: 'gps_&_navigation'
        },
    ]

    const items = [
        {id: 1, name: "Option 1"},
        {id: 2, name: "Option 2"},
        {id: 3, name: "Option 3"},
        {id: 4, name: "Option 4"},
        {id: 5, name: "Option 5"},
    ];

    const priceRanges = [
        {
            id: 0,
            name: 'All Price',
            slug: 'all_price',
            min: '',
            max: ''
        },
        {
            id: 1,
            name: 'Under $20',
            slug: 'under_20',
            min: 0,
            max: 20
        },
        {
            id: 2,
            name: '$25 to $100',
            slug: '20_to_100',
            min: 20,
            max: 100
        },
        {
            id: 3,
            name: '$100 to $300',
            slug: '100_to_300',
            min: 100,
            max: 300
        },
        {
            id: 4,
            name: '$300 to $500',
            slug: '300_to_500',
            min: 300,
            max: 500
        },
        {
            id: 5,
            name: '$500 to $1,000',
            slug: '500_to_1000',
            min: 500,
            max: 1000
        },
        {
            id: 6,
            name: '$1,000 to $10,000',
            slug: '1000_to_10000',
            min: 1000,
            max: 10000
        },
    ]

    const popularbrands = [
        {
            id: 0,
            name: 'Apple',
            slug: 'apple',
        },
        {
            id: 1,
            name: 'Microsoft',
            slug: 'microsoft'
        },
        {
            id: 2,
            name: 'Google',
            slug: 'google'
        },
        {
            id: 3,
            name: 'Samsung',
            slug: 'samsung'
        },
        {
            id: 4,
            name: 'Dell',
            slug: 'dell'
        },
        {
            id: 5,
            name: 'HP',
            slug: 'hp'
        },
        {
            id: 6,
            name: 'Symphony',
            slug: 'symphony'
        },
        {
            id: 7,
            name: 'Xiaomi',
            slug: 'xiaomi'
        },
        {
            id: 8,
            name: 'Sony',
            slug: 'sony'
        },
        {
            id: 9,
            name: 'Panasonic',
            slug: 'panasonic'
        },
        {
            id: 10,
            name: 'LG',
            slug: 'lg'
        },
    ]

    const mostTags = [
        {
            name: 'Game',
            slug: 'game'
        },
        {
            name: 'iPhone',
            slug: 'iPhone'
        },
        {
            name: 'TV',
            slug: 'tv'
        },
        {
            name: 'Asus Laptops',
            slug: 'asus_laptops'
        },
        {
            name: 'Macbook ',
            slug: 'macbook'
        },
        {
            name: 'SSD',
            slug: 'ssd'
        },
        {
            name: 'Graphics Card',
            slug: 'graphics_card'
        },
        {
            name: 'Power Bank ',
            slug: 'power_bank '
        },
        {
            name: 'Smart TV',
            slug: 'smart_tv'
        },
        {
            name: 'Speaker',
            slug: 'speaker'
        },
        {
            name: 'Tablet',
            slug: 'tablet'
        },
    ]

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const isSelected = (item) => {
        return selectedOptions?.id === item.id;
    };

    const toggleSelection = (item) => {
        setSelectedOptions(item);
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
        <section className='flex bg-white w-full gap-[20px] p-4'>

            {/* left side */}
            <aside className='w-[25%] min-[300px]'>

                {/* categories */}
                <h5 className='text-[1.2rem] font-medium text-gray-800 mb-4'>Category</h5>
                <div className='flex flex-col gap-[12px]'>
                    {categories.map(category => (
                        <label key={category.id} className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                checked={filters.categories.includes(category.name)}
                                onChange={() => toggleFilterSelection('categories', category.name)}
                            />
                            {category.name}
                        </label>
                    ))}
                </div>

                {/* prices */}
                <div className='border-t border-b border-gray-300 mt-6 py-6'>
                    <h5 className='text-[1.2rem] font-medium text-gray-800 mb-4'>Price Range</h5>

                    <div>
                        <div className='flex items-center justify-between mb-2'>
                            <p className='text-[0.9rem] text-gray-700'>${value}</p>
                            <p className='text-[0.9rem] text-gray-700'>${value}</p>
                        </div>
                        <div
                            className="relative w-full h-2.5 bg-gray-300 rounded-full cursor-pointer"
                            onClick={handleClick}
                        >
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={value}
                                onChange={handleChange}
                                className="absolute w-full h-2.5 top-0 z-20 opacity-0 cursor-pointer"
                            />
                            <div
                                className="absolute top-0 h-2.5 bg-[#0FABCA] rounded-full"
                                style={{
                                    width: `${value}%`,
                                }}
                            />
                            <div
                                className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#0FABCA] rounded-full -translate-x-1/2 translate-y-[-50%] cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                                style={{
                                    left: `${value}%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type='number'
                            placeholder='Min Price'
                            value={filters.priceRange.min}
                            onChange={(e) => updateFilter('priceRange', {
                                ...filters.priceRange,
                                min: Number(e.target.value)
                            })}
                        />
                        <input
                            type='number'
                            placeholder='Max Price'
                            value={filters.priceRange.max === Infinity ? '' : filters.priceRange.max}
                            onChange={(e) => updateFilter('priceRange', {
                                ...filters.priceRange,
                                max: e.target.value ? Number(e.target.value) : Infinity
                            })}
                        />
                    </div>

                    {/* price ranges */}
                    <div className='flex flex-col gap-[12px] mt-[16px]'>
                        {
                            priceRanges.map(price => (
                                <label data-name='categoryCheckbox'
                                       key={price.id}
                                       className='flex cursor-pointer items-center gap-[8px] text-[1rem] text-gray-800'>
                                    <input type='checkbox' name='categoryCheckbox' className='hidden'
                                           checked={toggleId === price.id}
                                           onChange={() => setToggleId(price.id)}/>
                                    <div
                                        className={`${toggleId === price.id ? 'border-[#0FABCA]' : 'border-gray-300'} w-[20px] transition-all duration-300 h-[20px] rounded-full border relative`}>
                                        <div
                                            className={`${toggleId === price.id ? 'bg-[#0FABCA]' : 'bg-transparent'} w-[13px] h-[13.5px] transition-all duration-300 rounded-full absolute top-[50%] transform translate-y-[-50%] left-[50%] translate-x-[-50%]`}></div>
                                    </div>

                                    {price.name}
                                </label>
                            ))
                        }
                    </div>
                </div>

                {/* popular brands */}
                <div className='mt-6 border-b border-gray-200 pb-6'>
                    <h5 className='text-[1.2rem] font-medium text-gray-800 mb-4 capitalize'>popular Brands</h5>

                    <div className='grid grid-cols-2 gap-[15px]'>
                        {popularbrands.map(brand => (
                            <label key={brand.id} className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    checked={filters.brands.includes(brand.name)}
                                    onChange={() => toggleFilterSelection('brands', brand.name)}
                                />
                                {brand.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className='mt-6'>
                    <h5 className='text-[1.2rem] font-medium text-gray-800 mb-4 capitalize'>Popular Tag</h5>

                    <div className='flex items-center flex-wrap gap-[8px]'>
                        {mostTags.map(tag => (
                            <button
                                key={tag.slug}
                                onClick={() => toggleFilterSelection('tags', tag.name)}
                                className={`
                                m-1 px-3 py-1 rounded 
                                ${filters.tags.includes(tag.name)
                                    ? 'bg-[#0FABCA] text-white'
                                    : 'bg-gray-200'
                                }
                            `}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* right side */}
            <main className='w-[75%]'>

                {/* topbar */}
                <div className='flex items-center justify-between gap-[50px] w-full'>
                    <div className='w-full relative'>
                        <input type='text' placeholder='Search...'
                               onInput={(e) => updateFilter('search', e.target.value)}
                               className='border border-[#e5eaf2] py-2 pl-4 pr-[65px] outline-none w-full rounded-md'/>

                        <IoSearch
                            className='text-[1.3rem] text-gray-600 absolute top-[50%] transform translate-y-[-50%] right-4'/>
                    </div>

                    <div className='flex items-center gap-[10px]'>
                        <p className='text-[1rem] text-gray-700 font-medium'>Sort by:</p>
                        <div className="relative custom-select flex-1">

                            {/* Input field with search functionality */}
                            <input
                                type="text"
                                placeholder="Search.."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsOpen(true)}
                                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none`}
                            />

                            <IoIosArrowDown
                                className={`${isOpen ? "rotate-[180deg]" : "rotate-0"} transition-all duration-300 text-[1.3rem] absolute top-[50%] transform translate-y-[-50%] right-3 text-gray-500`}/>

                            {/* Dropdown menu */}
                            {isOpen && (
                                <div
                                    className="absolute left-0 w-full mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-50">
                                    <div className="w-full overflow-auto">
                                        {filteredItems.map(item => (
                                            <p
                                                key={item.id}
                                                onClick={() => toggleSelection(item)}
                                                className="cursor-pointer px-3 py-2 flex items-center hover:bg-gray-200"
                                            >
                                                <img
                                                    src="https://besnik-space.fra1.cdn.digitaloceanspaces.com/doplac/dYj3EG2tlN8jM29cWxiA1711341238.svg"
                                                    alt="checkicon"
                                                    className={`${isSelected(item) ? "scale-[1] opacity-100" : "scale-[0.5] opacity-0"} mr-2 transition-all duration-300 w-6 h-6`}
                                                />
                                                {item.name}
                                            </p>
                                        ))}

                                        {
                                            filteredItems?.length === 0 && (
                                                <p className="text-center text-[0.9rem] text-text py-8">No search found!</p>
                                            )
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-[16px] w-full mt-[20px]'>
                    {
                        allProducts?.map((product) => (
                            <div key={product?.id}
                                 className='border border-gray-200 w-full relative rounded-md overflow-hidden'>

                                {/* product image */}
                                <div className='group relative overflow-hidden cursor-pointer'>
                                    <img alt='product/image' src={product?.image}
                                         className='w-[240px] mx-auto mt-5'/>

                                    {/* action buttons */}
                                    <div
                                        className='absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full'>
                                        <div className='flex items-center gap-[15px] justify-center'>

                                            <div onMouseOver={() => setWishlistVisible(true)}
                                                 onMouseOut={() => setWishlistVisible(false)}
                                                 className='relative w-max group-hover:translate-y-0 translate-y-[50px] transition-all opacity-0 group-hover:opacity-100 duration-300'>
                                                <p className='rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer'>
                                                    <IoMdHeartEmpty className='text-[1.3rem]'/>
                                                </p>

                                                {/* tooltip */}
                                                <p className={`${wishlistVisible ? 'opacity-100 z-[100] translate-y-0' : 'opacity-0 z-[-1] translate-y-[20px]'} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                                    Wishlist

                                                    {/* arrow */}
                                                    <span
                                                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                                                </p>
                                            </div>

                                            <div onMouseOver={() => setCompareVisible(true)}
                                                 onMouseOut={() => setCompareVisible(false)}
                                                 className='relative w-max group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-[80px]'>
                                                <p className='rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer'>
                                                    <HiArrowsUpDown className='text-[1.3rem]'/>
                                                </p>

                                                {/* tooltip */}
                                                <p className={`${compareVisible ? 'opacity-100 z-[100] translate-y-0' : 'opacity-0 z-[-1] translate-y-[20px]'} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                                    Compare

                                                    {/* arrow */}
                                                    <span
                                                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                                                </p>
                                            </div>

                                            <div onMouseOver={() => setQuickViewVisible(true)}
                                                 onMouseOut={() => setQuickViewVisible(false)}
                                                 className='relative w-max group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-[110px]'>
                                                <p className='rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer'>
                                                    <IoEyeOutline className='text-[1.3rem]'/>
                                                </p>

                                                {/* tooltip */}
                                                <p className={`${quickViewVisible ? 'opacity-100 z-[100] translate-y-0' : 'opacity-0 z-[-1] translate-y-[20px]'} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                                    Quick View

                                                    {/* arrow */}
                                                    <span
                                                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* product details */}
                                <div className='p-4 pt-6'>

                                    {/* review area */}
                                    <div className='flex items-center gap-[10px]'>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, index) => {
                                                const starRating = index + 1;
                                                return (
                                                    <FaStar
                                                        key={starRating}
                                                        className={`cursor-pointer ${
                                                            starRating <= rating ? "text-[#FA8232]" : "text-gray-300"
                                                        }`}
                                                        size={15}
                                                        onClick={() => setRating(starRating)}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <span className='text-[0.8rem] text-gray-500'>({product.rating})</span>
                                    </div>

                                    <h3 className='text-[1.1rem] text-gray-900 font-medium mb-2 mt-2'>{product?.name}</h3>
                                    <p className='text-[1.150rem] font-medium text-[#0FABCA] mt-1'>${product?.price}</p>

                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    !allProducts?.length && (
                        <div className='text-[1rem] text-gray-500 text-center mt-20'>No product found!</div>
                    )
                }
            </main>
        </section>
    );
};

export default ProductFilterExample1;
