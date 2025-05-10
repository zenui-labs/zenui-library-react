import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';
import {productCardsContents} from "@utils/ContentsConfig/ECommerceContents.js";

// icons
import {FaPlus} from "react-icons/fa6";
import {FaHeart, FaRegHeart, FaStar} from "react-icons/fa";
import {RiHeartAddLine, RiHeartFill} from "react-icons/ri";
import {FiArrowUpRight, FiMinus, FiPlus} from "react-icons/fi";
import {IoBagHandleOutline, IoCartOutline, IoEyeOutline, IoGift} from "react-icons/io5";
import {IoIosHeart, IoMdHeartEmpty} from "react-icons/io";
import {MdLocalShipping} from "react-icons/md";
import {HiArrowsUpDown} from "react-icons/hi2";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const ProductCard = () => {
    const sectionIds = productCardsContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [productCard1Preview, setProductCard1Preview] = useState(true);
    const [productCard1Code, setProductCard1Code] = useState(false);

    const [productCard2Preview, setProductCard2Preview] = useState(true);
    const [productCard2Code, setProductCard2Code] = useState(false);

    const [productCard3Preview, setProductCard3Preview] = useState(true);
    const [productCard3Code, setProductCard3Code] = useState(false);

    const [productCard4Preview, setProductCard4Preview] = useState(true);
    const [productCard4Code, setProductCard4Code] = useState(false);

    const [productCard5Preview, setProductCard5Preview] = useState(true);
    const [productCard5Code, setProductCard5Code] = useState(false);

    const [productCard6Preview, setProductCard6Preview] = useState(true);
    const [productCard6Code, setProductCard6Code] = useState(false);

    const [productCard7Preview, setProductCard7Preview] = useState(true);
    const [productCard7Code, setProductCard7Code] = useState(false);

    const [productCard8Preview, setProductCard8Preview] = useState(true);
    const [productCard8Code, setProductCard8Code] = useState(false);

    const [productCard9Preview, setProductCard9Preview] = useState(true);
    const [productCard9Code, setProductCard9Code] = useState(false);

    // functionality actions
    const [rating, setRating] = useState(5);
    const [isFavorite, setIsFavorite] = useState(false);
    const [count, setCount] = useState(0);

    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [compareVisible, setCompareVisible] = useState(false);
    const [quickViewVisible, setQuickViewVisible] = useState(false);

    const [productCardHover, setProductCardHover] = useState(false);

    const handleIncrement = () => {
        setCount(prevValue => prevValue + 1);
    }

    const handleDecrement = () => {
        setCount(prevValue => prevValue - 1);
    }

    const handleInputValueChange = (e) => {
        setCount(Number(e.target.value));
    }

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'clothing product card'} id={'clothing_product_card'}/>

                    <ComponentDescription
                        text='Clothing product card with name, price, sizes, colors, and quick action buttons for easy shopping.'/>

                    <ToggleTab code={productCard1Code} setCode={setProductCard1Code} setPreview={setProductCard1Preview}
                               preview={productCard1Preview}/>

                    <ComponentWrapper>
                        {productCard1Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full 640px:w-[50%] group'>

                                    {/* image & action buttons */}
                                    <div onMouseOver={() => setProductCardHover(true)}
                                         onMouseOut={() => setProductCardHover(false)}
                                         className='w-full relative cursor-pointer overflow-hidden'>
                                        <img alt='product/image'
                                             src={
                                                 productCardHover
                                                     ? '//wpbingo-fashow.myshopify.com/cdn/shop/products/63.jpg?v=1665549687'
                                                     : '//wpbingo-fashow.myshopify.com/cdn/shop/products/62.jpg?v=1665549687'
                                             }
                                             className='w-full'/>

                                        <div className='absolute bottom-0 left-0 w-full'>
                                            {/* quick action buttons */}
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

                                            {/* quantity & add cart */}
                                            <div
                                                className='w-full flex mt-6 items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 translate-y-[60px] bg-[rgb(0,0,0,0.5)]'>

                                                {/* quantity */}
                                                <div
                                                    className='flex w-[50%] justify-center px-2 py-0.5 items-center border-r border-gray-400 text-white'>
                                                    <button
                                                        className='active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]'
                                                        onClick={handleDecrement}><FiMinus/></button>
                                                    <input type='number' value={count}
                                                           className='w-[40px] py-2.5 outline-none focus:ring-0 border-none text-center text-[0.9rem] bg-transparent'
                                                           onInput={handleInputValueChange}/>
                                                    <button
                                                        className='active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]'
                                                        onClick={handleIncrement}><FiPlus/></button>
                                                </div>

                                                {/* add to cart */}
                                                <button
                                                    className='py-[13px] overflow-hidden before:w-full before:h-full before:bg-[#0FABCA] before:absolute before:top-0 z-0 before:z-[-1] before:translate-x-[-150px] hover:before:translate-x-0 before:transition-all before:duration-300 before:left-0 relative flex items-center justify-center grow text-white'>
                                                    <IoBagHandleOutline className='text-[1.3rem]'/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* product details */}
                                    <div className='mt-4'>

                                        {/* review area */}
                                        <div className='flex items-center justify-center gap-[10px] mt-2'>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, index) => {
                                                    const starRating = index + 1;
                                                    return (
                                                        <FaStar
                                                            key={starRating}
                                                            className={`cursor-pointer ${
                                                                starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                                            }`}
                                                            size={16}
                                                            onClick={() => setRating(starRating)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <span
                                                className='text-[0.9rem] dark:text-slate-400 text-gray-500'>(43)</span>
                                        </div>

                                        <h3 className='text-[1rem] font-medium text-center mt-0.5 text-gray-900 dark:text-[#abc2d3]'>Drop-shoulder
                                            synthetic</h3>
                                        <p className='text-center mt-0.5 dark:text-[#abc2d3] text-[0.9rem] text-gray-900'>Tk
                                            1,800.00</p>

                                        <div className='flex items-center gap-[10px] justify-center mt-3'>
                                            <div
                                                className='w-4 h-4 rounded-full bg-red-500 outline outline-1 outline-red-500 outline-offset-2 cursor-pointer'></div>
                                            <div className='w-4 h-4 rounded-full bg-green-500 cursor-pointer'></div>
                                            <div className='w-4 h-4 rounded-full bg-blue-500 cursor-pointer'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard1Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoMdHeartEmpty} from "react-icons/io";
import {HiArrowsUpDown} from "react-icons/hi2";
import {IoBagHandleOutline, IoEyeOutline} from "react-icons/io5";
import {FiMinus, FiPlus} from "react-icons/fi";
import {FaStar} from "react-icons/fa";

const ProductCard = () => {

    const [rating, setRating] = useState(5);
    const [count, setCount] = useState(0);

    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [compareVisible, setCompareVisible] = useState(false);
    const [quickViewVisible, setQuickViewVisible] = useState(false);

    const [productCardHover, setProductCardHover] = useState(false);

    const handleIncrement = () => {
        setCount(prevValue => prevValue + 1);
    }

    const handleDecrement = () => {
        setCount(prevValue => prevValue - 1);
    }

    const handleInputValueChange = (e) => {
        setCount(Number(e.target.value));
    }

    return (
        <div className="w-full md:w-[50%] group">

            {/* image & action buttons */}
            <div onMouseOver={() => setProductCardHover(true)}
                 onMouseOut={() => setProductCardHover(false)}
                 className="w-full relative cursor-pointer overflow-hidden">
                <img alt="product/image"
                     src={
                         productCardHover
                             ? "//wpbingo-fashow.myshopify.com/cdn/shop/products/63.jpg?v=1665549687"
                             : "//wpbingo-fashow.myshopify.com/cdn/shop/products/62.jpg?v=1665549687"
                     }
                     className="w-full"/>

                <div className="absolute bottom-0 left-0 w-full">
                    {/* quick action buttons */}
                    <div className="flex items-center gap-[15px] justify-center">

                        <div onMouseOver={() => setWishlistVisible(true)}
                             onMouseOut={() => setWishlistVisible(false)}
                             className="relative w-max group-hover:translate-y-0 translate-y-[50px] transition-all opacity-0 group-hover:opacity-100 duration-300">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <IoMdHeartEmpty className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${wishlistVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                Wishlist

                                {/* arrow */}
                                <span
                                    className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>

                        <div onMouseOver={() => setCompareVisible(true)}
                             onMouseOut={() => setCompareVisible(false)}
                             className="relative w-max group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-[80px]">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <HiArrowsUpDown className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${compareVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                Compare

                                {/* arrow */}
                                <span
                                    className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>

                        <div onMouseOver={() => setQuickViewVisible(true)}
                             onMouseOut={() => setQuickViewVisible(false)}
                             className="relative w-max group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-[110px]">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <IoEyeOutline className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${quickViewVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                Quick View

                                {/* arrow */}
                                <span
                                    className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>
                    </div>

                    {/* quantity & add cart */}
                    <div
                        className="w-full flex mt-6 items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 translate-y-[60px] bg-[rgb(0,0,0,0.5)]">

                        {/* quantity */}
                        <div
                            className="flex w-[50%] justify-center px-2 py-0.5 items-center border-r border-gray-400 text-white">
                            <button
                                className="active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]"
                                onClick={handleDecrement}><FiMinus/></button>
                            <input type="number" value={count}
                                   className="w-[40px] py-2.5 outline-none focus:ring-0 border-none text-center text-[0.9rem] bg-transparent"
                                   onInput={handleInputValueChange}/>
                            <button
                                className="active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]"
                                onClick={handleIncrement}><FiPlus/></button>
                        </div>

                        {/* add to cart */}
                        <button
                            className="py-[13px] overflow-hidden before:w-full before:h-full before:bg-[#0FABCA] before:absolute before:top-0 z-0 before:z-[-1] before:translate-x-[-150px] hover:before:translate-x-0 before:transition-all before:duration-300 before:left-0 relative flex items-center justify-center grow text-white">
                            <IoBagHandleOutline className="text-[1.3rem]"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* product details */}
            <div className="mt-4">

                {/* review area */}
                <div className="flex items-center justify-center gap-[10px] mt-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const starRating = index + 1;
                            return (
                                <FaStar
                                    key={starRating}
                                    className={`cursor-pointer ${
                                        starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    size={16}
                                    onClick={() => setRating(starRating)}
                                />
                            );
                        })}
                    </div>
                    <span className="text-[0.9rem] dark:text-slate-400 text-gray-500">(43)</span>
                </div>

                <h3 className="text-[1rem] font-medium text-center mt-0.5 text-gray-900 dark:text-[#abc2d3]">Drop-shoulder
                    synthetic</h3>
                <p className="text-center mt-0.5 text-[0.9rem] text-gray-900 dark:text-[#abc2d3]">Tk 1,800.00</p>

                <div className="flex items-center gap-[10px] justify-center mt-3">
                    <div
                        className="w-4 h-4 rounded-full bg-red-500 outline outline-1 outline-red-500 outline-offset-2 cursor-pointer"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-500 cursor-pointer"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'juice product card'} id={'juice_product_card'}/>
                    </div>

                    <ComponentDescription
                        text='Juice product card with name, price, flavors, size options, and quick action buttons for easy purchase.'/>

                    <ToggleTab code={productCard2Code} setCode={setProductCard2Code} preview={productCard2Preview}
                               setPreview={setProductCard2Preview}/>

                    <ComponentWrapper>
                        {productCard2Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='border dark:border-slate-700 border-gray-300 rounded-md p-5'>

                                    {/* product image */}
                                    <img alt='product/image' src='https://i.ibb.co.com/VN5sNHX/Link-14-png.png'
                                         className='w-[250px] mt-2'/>

                                    {/* product details */}
                                    <div className='mt-3'>
                                        <h3 className='text-[1.1rem] dark:text-[#abc2d3] font-semibold'>Frooti Mango
                                            Drink</h3>

                                        {/* rating area */}
                                        <div className='flex items-center gap-[10px] mt-2'>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, index) => {
                                                    const starRating = index + 1;
                                                    return (
                                                        <FaStar
                                                            key={starRating}
                                                            className={`cursor-pointer ${
                                                                starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                                            }`}
                                                            size={16}
                                                            onClick={() => setRating(starRating)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <span
                                                className='text-[0.9rem] dark:text-slate-400 text-gray-500'>(43)</span>
                                        </div>

                                        <div className='flex items-end justify-between mt-2'>
                                            <div>
                                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>1 KG</p>
                                                <p className='text-[1rem] font-semibold mt-1 text-[#0FABCA]'>$ 80.00</p>
                                            </div>

                                            <button
                                                className='py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200'>
                                                Add
                                                <FaPlus/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard2Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";

const ProductCard = () => {

    const [rating, setRating] = useState(5);

    return (
        <div className="border dark:border-slate-700 border-gray-300 rounded-md p-5">

            {/* product image */}
            <img alt="product/image" src="https://i.ibb.co.com/VN5sNHX/Link-14-png.png"
                 className="w-[250px] mt-2"/>

            {/* product details */}
            <div className="mt-3">
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-semibold">Frooti Mango Drink</h3>

                {/* rating area */}
                <div className="flex items-center gap-[10px] mt-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const starRating = index + 1;
                            return (
                                <FaStar
                                    key={starRating}
                                    className={`cursor-pointer ${
                                        starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    size={16}
                                    onClick={() => setRating(starRating)}
                                />
                            );
                        })}
                    </div>
                    <span className="text-[0.9rem] dark:text-slate-400 text-gray-500">(43)</span>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div>
                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">1 KG</p>
                        <p className="text-[1rem] font-semibold mt-1 text-[#0FABCA]">$ 80.00</p>
                    </div>

                    <button
                        className="py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200">
                        Add
                        <FaPlus/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Grocery product card'} id={'grocery_product_card'}/>
                    </div>

                    <ComponentDescription
                        text='Grocery product card with name, price, weight, category, and quick action buttons for easy shopping.'/>

                    <ToggleTab code={productCard3Code} setCode={setProductCard3Code} preview={productCard3Preview}
                               setPreview={setProductCard3Preview}/>

                    <ComponentWrapper>
                        {productCard3Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='relative border dark:border-slate-700 w-full 640px:w-[55%] border-gray-300 rounded-md p-5'>

                                    {/* favorite icon */}
                                    <FaHeart onClick={() => setIsFavorite(false)}
                                             className={` ${isFavorite ? 'opacity-100 scale-[1] z-10' : 'opacity-0 scale-[0.7] z-[-1]'} text-[1.4rem] dark:text-slate-400 absolute top-3 text-red-500 right-3 cursor-pointer transition-all duration-300`}/>
                                    <FaRegHeart onClick={() => setIsFavorite(true)}
                                                className={`${isFavorite ? 'opacity-0 scale-[0.7] z-[-1]' : 'opacity-100 scale-[1] z-10'} text-[1.4rem] dark:text-slate-400 absolute top-3 right-3 text-gray-600 cursor-pointer transition-all duration-300`}/>


                                    {/* product image */}
                                    <img alt='product/image' src='https://i.ibb.co.com/p0CjNLD/Link-11-png.png'
                                         className='w-[150px] mt-2 mx-auto'/>

                                    {/* product details */}
                                    <div className='mt-8'>

                                        {/* rating area */}
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, index) => {
                                                const starRating = index + 1;
                                                return (
                                                    <FaStar
                                                        key={starRating}
                                                        className={`cursor-pointer ${
                                                            starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                                        }`}
                                                        size={16}
                                                        onClick={() => setRating(starRating)}
                                                    />
                                                );
                                            })}
                                        </div>

                                        <h3 className='text-[1.1rem] dark:text-[#abc2d3] font-medium mt-1.5'>Cucumber</h3>

                                        <div className='flex items-center gap-[10px]'>
                                            <p className='text-[1rem] font-semibold mt-1 text-[#0FABCA]'>$70.21</p>
                                            <del
                                                className='text-[1rem] font-normal mt-1 dark:text-slate-500 text-gray-500 '>$80.50
                                            </del>
                                        </div>

                                        <div className='flex items-center w-full justify-between mt-4'>

                                            <div
                                                className='flex items-center border dark:border-slate-700 border-gray-200 rounded-md'>
                                                <button
                                                    className='bg-gray-100 dark:text-[#abc2d3] dark:bg-slate-900 p-[9px] rounded-l-md text-gray-600 text-[1.1rem]'
                                                    onClick={handleDecrement}><FiMinus/></button>
                                                <input type='number' value={count}
                                                       className='w-[50px] py-[4px] dark:bg-transparent dark:text-[#abc2d3] outline-none text-gray-600 focus:ring-0 border-none text-center text-[1.1rem]'
                                                       onInput={handleInputValueChange}/>
                                                <button
                                                    className='bg-gray-100 dark:text-[#abc2d3] dark:bg-slate-900 p-[9px] rounded-r-md text-gray-600 text-[1.1rem]'
                                                    onClick={handleIncrement}><FiPlus/></button>
                                            </div>

                                            <button
                                                className='py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200'>
                                                <IoCartOutline className='text-[1.3rem]'/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard3Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaHeart, FaRegHeart, FaStar} from "react-icons/fa";
import {FiMinus, FiPlus} from "react-icons/fi";
import {IoCartOutline} from "react-icons/io5";

const ProductCard = () => {

    const [rating, setRating] = useState(5);
    const [isFavorite, setIsFavorite] = useState(false);
    const [count, setCount] = useState(0);


    const handleIncrement = () => {
        setCount(prevValue => prevValue + 1);
    }

    const handleDecrement = () => {
        setCount(prevValue => prevValue - 1);
    }

    const handleInputValueChange = (e) => {
        setCount(Number(e.target.value));
    }

    return (
        <div className="relative border dark:border-slate-700 w-full md:w-[55%] border-gray-300 rounded-md p-5">

            {/* favorite icon */}
            <FaHeart onClick={() => setIsFavorite(false)}
                     className={` ${isFavorite ? "opacity-100 scale-[1] z-10" : "opacity-0 scale-[0.7] z-[-1]"} text-[1.4rem] absolute top-3 dark:text-slate-400 text-red-500 right-3 cursor-pointer transition-all duration-300`}/>
            <FaRegHeart onClick={() => setIsFavorite(true)}
                        className={`${isFavorite ? "opacity-0 scale-[0.7] z-[-1]" : "opacity-100 scale-[1] z-10"} text-[1.4rem] absolute top-3 dark:text-slate-400 right-3 text-gray-600 cursor-pointer transition-all duration-300`}/>


            {/* product image */}
            <img alt="product/image" src="https://i.ibb.co.com/p0CjNLD/Link-11-png.png"
                 className="w-[150px] mt-2 mx-auto"/>

            {/* product details */}
            <div className="mt-8">

                {/* rating area */}
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => {
                        const starRating = index + 1;
                        return (
                            <FaStar
                                key={starRating}
                                className={`cursor-pointer ${
                                    starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                                size={16}
                                onClick={() => setRating(starRating)}
                            />
                        );
                    })}
                </div>

                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium mt-1.5">Cucumber</h3>

                <div className="flex items-center gap-[10px]">
                    <p className="text-[1rem] font-semibold mt-1 text-[#0FABCA]">$70.21</p>
                    <del className="text-[1rem] font-normal mt-1 text-gray-500 ">$80.50</del>
                </div>

                <div className="flex items-center w-full justify-between mt-4">

                    <div className="flex items-center dark:border-slate-700 border border-gray-200 rounded-md">
                        <button
                            className="bg-gray-100 p-[9px] rounded-l-md dark:text-[#abc2d3] dark:bg-slate-900 text-gray-600 text-[1.1rem]"
                            onClick={handleDecrement}><FiMinus/></button>
                        <input type="number" value={count}
                               className="w-[50px] py-[4px] dark:bg-transparent dark:text-[#abc2d3] outline-none text-gray-600 focus:ring-0 border-none text-center text-[1.1rem]"
                               onInput={handleInputValueChange}/>
                        <button
                            className="bg-gray-100 p-[9px] rounded-r-md dark:text-[#abc2d3] dark:bg-slate-900 text-gray-600 text-[1.1rem]"
                            onClick={handleIncrement}><FiPlus/></button>
                    </div>

                    <button
                        className="py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200">
                        <IoCartOutline className="text-[1.3rem]"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'digital product card'} id={'digital_product_card'}/>
                    </div>

                    <ComponentDescription
                        text='Digital product card with name, price, file size, format, and quick action buttons for instant download.'/>

                    <ToggleTab code={productCard4Code} setCode={setProductCard4Code} setPreview={setProductCard4Preview}
                               preview={productCard4Preview}/>

                    <ComponentWrapper>
                        {productCard4Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='border border-gray-300 dark:border-slate-700 rounded-xl p-2 w-full 640px:w-[65%]'>

                                    {/* product image */}
                                    <div className='relative'>
                                        <img alt='product/image' src='https://i.ibb.co.com/cTTfNRw/Link-1.png'
                                             className='w-full'/>

                                        {/* favorite icon */}
                                        <div className='p-2 rounded-full bg-gray-600 absolute top-2 right-2'>
                                            {
                                                isFavorite ? (
                                                    <IoIosHeart onClick={() => setIsFavorite(false)}
                                                                className={`text-[#0FABCA] text-[1.2rem] cursor-pointer`}/>
                                                ) : (
                                                    <IoMdHeartEmpty onClick={() => setIsFavorite(true)}
                                                                    className={` text-white text-[1.2rem] cursor-pointer`}/>
                                                )
                                            }

                                        </div>
                                    </div>

                                    {/* product details */}
                                    <div className='mt-2 pt-0 p-1'>
                                        <h3 className='text-[1.1rem] font-medium dark:text-[#abc2d3] line-clamp-1'>Criphin
                                            - Contemporary
                                            Business Keynote</h3>

                                        {/* authors & reviews */}
                                        <div
                                            className='flex flex-col 640px:flex-row 640px:items-center justify-between mt-1'>
                                            <p className='text-gray-400 text-[0.9rem]'>by <span
                                                className='text-black dark:text-[#abc2d3]'>Criphin</span> in <span
                                                className='text-black dark:text-[#abc2d3]'>Graphics</span></p>

                                            {/* review area */}
                                            <div className='flex items-center gap-[10px]'>
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(5)].map((_, index) => {
                                                        const starRating = index + 1;
                                                        return (
                                                            <FaStar
                                                                key={starRating}
                                                                className={`cursor-pointer ${
                                                                    starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                                                }`}
                                                                size={15}
                                                                onClick={() => setRating(starRating)}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <span
                                                    className='text-[0.8rem] dark:text-slate-400 text-gray-500'>(4.8)</span>
                                            </div>
                                        </div>

                                        {/* price and action btn */}
                                        <div className='flex items-end justify-between mt-5'>
                                            <div>
                                                <span className='text-gray-400 dark:text-slate-400 text-[0.9rem]'>168 Sales</span>
                                                <p className='text-[1.150rem] font-semibold text-[#0FABCA]'>$52.00</p>
                                            </div>

                                            <div className='flex items-center gap-[10px]'>
                                                <button
                                                    className='py-2 px-4 border border-[#0FABCA] text-white rounded-md flex items-center group gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200'>
                                                    <IoCartOutline
                                                        className='text-[1.3rem] group-hover:text-white text-[#0FABCA]'/>
                                                </button>

                                                <button
                                                    className='py-2 px-4 border border-[#0FABCA] text-[#0FABCA] hover:text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200'>
                                                    Preview
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard4Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {IoIosHeart, IoMdHeartEmpty} from "react-icons/io";

const ProductCard = () => {

    const [rating, setRating] = useState(5);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="border border-gray-300 dark:border-slate-700 rounded-xl p-2 w-full md:w-[70%]">

            {/* product image */}
            <div className="relative">
                <img alt="product/image" src="https://i.ibb.co.com/cTTfNRw/Link-1.png"
                     className="w-full"/>

                {/* favorite icon */}
                <div className="p-2 rounded-full bg-gray-600 absolute top-2 right-2">
                    {
                        isFavorite ? (
                            <IoIosHeart onClick={() => setIsFavorite(false)}
                                        className={`text-[#0FABCA] text-[1.2rem] cursor-pointer`}/>
                        ) : (
                            <IoMdHeartEmpty onClick={() => setIsFavorite(true)}
                                            className={` text-white text-[1.2rem] cursor-pointer`}/>
                        )
                    }

                </div>
            </div>

            {/* product details */}
            <div className="mt-2 pt-0 p-1">
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium line-clamp-1">Criphin - Contemporary
                    Business Keynote</h3>

                {/* authors & reviews */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-1">
                    <p className="text-gray-400 text-[0.9rem]">by <span
                        className="text-black dark:text-[#abc2d3]">Criphin</span> in <span
                        className="text-black dark:text-[#abc2d3]">Graphics</span></p>

                    {/* review area */}
                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, index) => {
                                const starRating = index + 1;
                                return (
                                    <FaStar
                                        key={starRating}
                                        className={`cursor-pointer ${
                                            starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                        size={15}
                                        onClick={() => setRating(starRating)}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">(4.8)</span>
                    </div>
                </div>

                {/* price and action btn */}
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">168 Sales</span>
                        <p className="text-[1.150rem] font-semibold text-[#0FABCA]">$52.00</p>
                    </div>

                    <div className="flex items-center gap-[10px]">
                        <button
                            className="py-2 px-4 border border-[#0FABCA] text-white rounded-md flex items-center group gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200">
                            <IoCartOutline
                                className="text-[1.3rem] group-hover:text-white text-[#0FABCA]"/>
                        </button>

                        <button
                            className="py-2 px-4 border border-[#0FABCA] text-[#0FABCA] hover:text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200">
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'book product card'} id={'book_product_card'}/>
                    </div>

                    <ComponentDescription
                        text='Book product card with title, price, author, genre, and quick action buttons for easy purchase.'/>

                    <ToggleTab code={productCard5Code} preview={productCard5Preview} setPreview={setProductCard5Preview}
                               setCode={setProductCard5Code}/>

                    <ComponentWrapper>
                        {productCard5Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full 640px:w-[55%] relative rounded-md overflow-hidden'>

                                    {/* badge */}
                                    <span
                                        className='bg-red-500 rounded-sm px-3 py-1 text-[0.9rem] text-white absolute top-3 left-3'>Best</span>

                                    {/* product image */}
                                    <img alt='product/image' src='https://i.ibb.co.com/wrYPvfd/Link-31-jpg.png'
                                         className='w-full'/>

                                    {/* product details */}
                                    <div className='mt-2'>
                                        <span
                                            className='text-gray-400 dark:text-slate-400 text-[0.9rem]'>Biography</span>
                                        <h3 className='text-[1.1rem] dark:text-[#abc2d3] font-medium mt-2'>Home Decor
                                            Lucky Deer Family
                                            Matte Finish Ceramic Figures</h3>
                                        <p className='text-[0.9rem] dark:text-slate-400 text-gray-400 mt-1'>By Ellie
                                            Thomson, Henry</p>
                                        <p className='text-[1.1rem] font-semibold mt-1 text-[#0FABCA]'>$80.00</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard5Code && (
                            <Showcode
                                code='
import React from "react";

const ProductCard = () => {
    return (
        <div className="w-full md:w-[55%] relative rounded-md overflow-hidden">

            {/* badge */}
            <span
                className="bg-red-500 rounded-sm px-3 py-1 text-[0.9rem] text-white absolute top-3 left-3">Best</span>

            {/* product image */}
            <img alt="product/image" src="https://i.ibb.co.com/wrYPvfd/Link-31-jpg.png"
                 className="w-full"/>

            {/* product details */}
            <div className="mt-2">
                <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">Biography</span>
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium mt-2">Home Decor Lucky Deer Family
                    Matte Finish Ceramic Figures</h3>
                <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 mt-1">By Ellie Thomson, Henry</p>
                <p className="text-[1.1rem] font-semibold mt-1 text-[#0FABCA]">$80.00</p>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'gadget product card 1'} id={'gadget_product_card_1'}/>
                    </div>

                    <ComponentDescription
                        text='Gadget product card with name, price, features, available colors, and quick action buttons for easy purchase.'/>

                    <ToggleTab code={productCard6Code} setCode={setProductCard6Code} setPreview={setProductCard6Preview}
                               preview={productCard6Preview}/>

                    <ComponentWrapper>
                        {productCard6Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='border border-gray-300 dark:border-slate-700 w-full 640px:w-[60%] relative rounded-2xl overflow-hidden'>

                                    {/* badge */}
                                    <span
                                        className='bg-red-500 rounded-b-md px-3 py-1 text-[0.9rem] text-white absolute top-0 left-4'>Best Value</span>

                                    {/* product image */}
                                    <img alt='product/image' src='https://i.ibb.co.com/z4BV3S2/image-1.png'
                                         className='w-full mt-6'/>

                                    {/* product details */}
                                    <div className='p-4 pt-0'>
                                        <h3 className='text-[1.4rem] dark:text-[#abc2d3] font-semibold mb-1 mt-2'>Apple</h3>

                                        <span
                                            className='text-[0.9rem] dark:text-slate-400 font-normal text-gray-500 line-clamp-2'>2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver</span>

                                        {/* price & discount offer */}
                                        <div className='flex items-center mt-3 gap-[15px]'>
                                            <p className='text-[1.150rem] dark:text-[#abc2d3] font-semibold mt-1'>$1024.99+</p>

                                            <p className='border text-green-600 text-[0.8rem] border-green-400 px-2 py-1 rounded-md'>35%
                                                Off</p>
                                        </div>

                                        {/* shipping offers */}
                                        <div
                                            className='flex items-center dark:border-slate-700 border-t border-gray-300 mt-3 gap-[15px] pt-[5px]'>
                                            <div
                                                className='flex items-center gap-[6px] dark:text-slate-400 text-gray-400 text-[0.9rem]'>
                                                <MdLocalShipping/>
                                                <p>Free shipping</p>
                                            </div>
                                            <div
                                                className='flex items-center gap-[6px] dark:text-slate-400 text-gray-400 text-[0.9rem]'>
                                                <IoGift/>
                                                <p>Free gift</p>
                                            </div>
                                        </div>

                                        {/* actions */}
                                        <div className='flex items-center justify-between mt-7 gap-[15px]'>
                                            <button
                                                className='py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] hover:bg-[#01849b] text-[1rem] bg-[#0FABCA] transition-all duration-200'>
                                                View Deal
                                                <FiArrowUpRight className='text-[1.3rem]'/>
                                            </button>
                                            <button className='p-[9px] rounded-full border-2 border-[#0FABCA]'>
                                                {
                                                    isFavorite ? (
                                                        <RiHeartFill onClick={() => setIsFavorite(false)}
                                                                     className='text-[#0FABCA] text-[1.3rem]'/>
                                                    ) : (
                                                        <RiHeartAddLine onClick={() => setIsFavorite(true)}
                                                                        className='text-[#0FABCA] text-[1.3rem]'/>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard6Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {MdLocalShipping} from "react-icons/md";
import {IoGift} from "react-icons/io5";
import {FiArrowUpRight} from "react-icons/fi";
import {RiHeartAddLine, RiHeartFill} from "react-icons/ri";

const ProductCard = () => {

    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="border border-gray-300 dark:border-slate-700 w-full md:w-[60%] relative rounded-2xl overflow-hidden">

            {/* badge */}
            <span
                className="bg-red-500 rounded-b-md px-3 py-1 text-[0.9rem] text-white absolute top-0 left-4">Best Value</span>

            {/* product image */}
            <img alt="product/image" src="https://i.ibb.co.com/z4BV3S2/image-1.png"
                 className="w-full mt-6"/>

            {/* product details */}
            <div className="p-4 pt-0">
                <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-semibold mb-1 mt-2">Apple</h3>

                <span className="text-[0.9rem] dark:text-slate-400 font-normal text-gray-500 line-clamp-2">2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Silver</span>

                {/* price & discount offer */}
                <div className="flex items-center mt-3 gap-[15px]">
                    <p className="text-[1.150rem] dark:text-[#abc2d3] font-semibold mt-1">$1024.99+</p>

                    <p className="border text-green-600 text-[0.8rem] border-green-400 px-2 py-1 rounded-md">35%
                        Off</p>
                </div>

                {/* shipping offers */}
                <div
                    className="flex items-center border-t dark:border-slate-700 border-gray-300 mt-3 gap-[15px] pt-[5px]">
                    <div className="flex items-center gap-[6px] dark:text-slate-400 text-gray-400 text-[0.9rem]">
                        <MdLocalShipping/>
                        <p>Free shipping</p>
                    </div>
                    <div className="flex items-center gap-[6px] dark:text-slate-400 text-gray-400 text-[0.9rem]">
                        <IoGift/>
                        <p>Free gift</p>
                    </div>
                </div>

                {/* actions */}
                <div className="flex items-center justify-between mt-7 gap-[15px]">
                    <button
                        className="py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] hover:bg-[#01849b] text-[1rem] bg-[#0FABCA] transition-all duration-200">
                        View Deal
                        <FiArrowUpRight className="text-[1.3rem]"/>
                    </button>
                    <button className="p-[9px] rounded-full border-2 border-[#0FABCA]">
                        {
                            isFavorite ? (
                                <RiHeartFill onClick={() => setIsFavorite(false)}
                                             className="text-[#0FABCA] text-[1.3rem]"/>
                            ) : (
                                <RiHeartAddLine onClick={() => setIsFavorite(true)}
                                                className="text-[#0FABCA] text-[1.3rem]"/>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'gadget product card 2'} id={'gadget_product_card_2'}/>
                    </div>

                    <ComponentDescription
                        text='Gadget product card with name, price, features, available colors, and quick action buttons for easy purchase.'/>

                    <ToggleTab code={productCard7Code} preview={productCard7Preview} setPreview={setProductCard7Preview}
                               setCode={setProductCard7Code}/>

                    <ComponentWrapper>
                        {productCard7Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='border border-gray-300 dark:border-slate-700 w-full 640px:w-[60%] relative rounded-2xl overflow-hidden'>

                                    {/* badge */}
                                    <span
                                        className='bg-red-500 rounded-sm px-3 py-1 z-10 text-[0.9rem] text-white absolute top-3 left-3'>HOT</span>

                                    {/* product image */}
                                    <div className='group relative overflow-hidden cursor-pointer'>
                                        <img alt='product/image' src='https://i.ibb.co.com/kcYX9md/Image-2.png'
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
                                            <span
                                                className='text-[0.8rem] dark:text-slate-400 text-gray-500'>(738)</span>
                                        </div>

                                        <h3 className='text-[1.1rem] dark:text-[#abc2d3] text-gray-900 font-medium mb-2 mt-2'>TOZO
                                            T6 True
                                            Wireless
                                            Earbuds Bluetooth Headphon</h3>
                                        <p className='text-[1.150rem] font-medium text-[#0FABCA] mt-1'>$70</p>

                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard7Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoEyeOutline} from "react-icons/io5";
import {IoMdHeartEmpty} from "react-icons/io";
import {HiArrowsUpDown} from "react-icons/hi2";
import {FaStar} from "react-icons/fa";

const ProductCard = () => {

    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [compareVisible, setCompareVisible] = useState(false);
    const [quickViewVisible, setQuickViewVisible] = useState(false);

    const [rating, setRating] = useState(5);

    return (
        <div className="border border-gray-300 dark:border-slate-700 w-full md:w-[60%] relative rounded-2xl overflow-hidden">

            {/* badge */}
            <span
                className="bg-red-500 rounded-sm px-3 py-1 z-10 text-[0.9rem] text-white absolute top-3 left-3">HOT</span>

            {/* product image */}
            <div className="group relative overflow-hidden cursor-pointer">
                <img alt="product/image" src="https://i.ibb.co.com/kcYX9md/Image-2.png"
                     className="w-[240px] mx-auto mt-5"/>

                {/* action buttons */}
                <div className="absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full">
                    <div className="flex items-center gap-[15px] justify-center">

                        <div onMouseOver={() => setWishlistVisible(true)}
                             onMouseOut={() => setWishlistVisible(false)}
                             className="relative w-max group-hover:translate-y-0 translate-y-[50px] transition-all opacity-0 group-hover:opacity-100 duration-300">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <IoMdHeartEmpty className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${wishlistVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                Wishlist

                                {/* arrow */}
                                <span
                                    className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>

                        <div onMouseOver={() => setCompareVisible(true)}
                             onMouseOut={() => setCompareVisible(false)}
                             className="relative w-max group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-[80px]">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <HiArrowsUpDown className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${compareVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
                                Compare

                                {/* arrow */}
                                <span
                                    className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                            </p>
                        </div>

                        <div onMouseOver={() => setQuickViewVisible(true)}
                             onMouseOut={() => setQuickViewVisible(false)}
                             className="relative w-max group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-[110px]">
                            <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                                <IoEyeOutline className="text-[1.3rem]"/>
                            </p>

                            {/* tooltip */}
                            <p className={`${quickViewVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}>
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
            <div className="p-4 pt-6">

                {/* review area */}
                <div className="flex items-center gap-[10px]">
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
                    <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">(738)</span>
                </div>

                <h3 className="text-[1.1rem] dark:text-[#abc2d3] text-gray-900 font-medium mb-2 mt-2">TOZO T6 True
                    Wireless
                    Earbuds Bluetooth Headphon</h3>
                <p className="text-[1.150rem] font-medium text-[#0FABCA] mt-1">$70</p>

            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'product list card 1'} id={'product_list_card_1'}/>
                    </div>

                    <ComponentDescription
                        text='Product list card with name, price, image, and quick action buttons for easy browsing and purchase.'/>

                    <ToggleTab code={productCard8Code} preview={productCard8Preview} setCode={setProductCard8Code}
                               setPreview={setProductCard8Preview}/>

                    <ComponentWrapper>
                        {productCard8Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 640px:w-[80%] dark:border-slate-700 border border-gray-300 rounded-md px-4 flex flex-col 640px:flex-row 640px:items-center 640px:gap-[10px]'>
                                    <img alt='product/image' src='https://i.ibb.co.com/FDsyM7X/Image-4.png'
                                         className='w-[120px]'/>

                                    <div className='pb-4 640px:pb-0'>
                                        <h3 className='text-[1.1rem] dark:text-[#abc2d3] font-medium line-clamp-2'>Portable
                                            Wshing Machine, 11lbs capacity Model 18NMF</h3>
                                        <p className='text-[1rem] font-medium text-[#0FABCA] mt-1'>$1,500</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard8Code && (
                            <Showcode
                                code='
import React from "react";

const ProductCard = () => {
    return (
        <div
            className="w-full md:w-[80%] border dark:border-slate-700 border-gray-300 rounded-md px-4 flex flex-col md:flex-row md:items-center md:gap-[10px]">
            <img alt="product/image" src="https://i.ibb.co.com/FDsyM7X/Image-4.png" className="w-[120px]"/>

            <div className="pb-4 md:pb-0">
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium line-clamp-2">Portable Wshing Machine, 11lbs capacity Model
                    18NMF</h3>
                <p className="text-[1rem] font-medium text-[#0FABCA] mt-1">$1,500</p>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'product list card 2'} id={'product_list_card_2'}/>
                    </div>

                    <ComponentDescription
                        text='Product list card with name, price, image, and quick action buttons for easy browsing and purchase.'/>

                    <ToggleTab code={productCard9Code} preview={productCard9Preview} setCode={setProductCard9Code}
                               setPreview={setProductCard9Preview}/>

                    <ComponentWrapper>
                        {productCard9Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 640px:w-[80%] justify-center flex flex-col 640px:flex-row 640px:items-center gap-[10px]'>
                                    <img alt='product/image' src='https://i.ibb.co.com/HHP2J04/7-jpg.png'
                                         className='w-[80px] rounded-md'/>

                                    <div>
                                        <h3 className='text-[1.1rem] font-medium dark:text-[#abc2d3] line-clamp-2'>Good
                                            Life Raw Peanuts</h3>

                                        {/* review area */}
                                        <div className='flex items-center gap-[10px] mb-2'>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, index) => {
                                                    const starRating = index + 1;
                                                    return (
                                                        <FaStar
                                                            key={starRating}
                                                            className={`cursor-pointer ${
                                                                starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                                            }`}
                                                            size={15}
                                                            onClick={() => setRating(starRating)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <span
                                                className='text-[0.8rem] dark:text-slate-400 text-gray-500'>(4.8)</span>
                                        </div>

                                        <p className='text-[1rem] font-medium text-[#0FABCA] mt-1'>$85.00</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productCard9Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";

const ProductCard = () => {

    const [rating, setRating] = useState(5);

    return (
        <div className="w-full md:w-[80%] justify-center flex flex-col md:flex-row md:items-center gap-[10px]">
            <img alt="product/image" src="https://i.ibb.co.com/HHP2J04/7-jpg.png" className="w-[80px] rounded-md"/>

            <div>
                <h3 className="text-[1.1rem] font-medium dark:text-[#abc2d3] line-clamp-2">Good Life Raw Peanuts</h3>

                {/* review area */}
                <div className="flex items-center gap-[10px] mb-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => {
                            const starRating = index + 1;
                            return (
                                <FaStar
                                    key={starRating}
                                    className={`cursor-pointer ${
                                        starRating <= rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    size={15}
                                    onClick={() => setRating(starRating)}
                                />
                            );
                        })}
                    </div>
                    <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">(4.8)</span>
                </div>

                <p className="text-[1rem] font-medium text-[#0FABCA] mt-1">$85.00</p>
            </div>
        </div>
    );
};

export default ProductCard;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/timeline'
                        backName='timeline'
                        forwardName='ads card'
                        forwardUrl='/components/ads-card'
                    />
                </div>

                <ContentNavbar contents={productCardsContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>E-Commerce - Product Card</title>
            </Helmet>
        </>
    );
};

export default ProductCard;
