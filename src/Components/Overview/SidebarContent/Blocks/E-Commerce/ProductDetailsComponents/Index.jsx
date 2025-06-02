import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

// product details examples components
import ProductDetailsExample1 from "./ProductDetailsExample1.jsx";
import ProductDetailsExample2 from "./ProductDetailsExample2.jsx";
import ProductDetailsExample3 from "./ProductDetailsExample3.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";


const Index = () => {

    const [productDetails1Preview, setProductDetails1Preview] = useState(true);
    const [productDetails1Code, setProductDetails1Code] = useState(false);

    const [productDetails2Preview, setProductDetails2Preview] = useState(true);
    const [productDetails2Code, setProductDetails2Code] = useState(false);

    const [productDetails3Preview, setProductDetails3Preview] = useState(true);
    const [productDetails3Code, setProductDetails3Code] = useState(false);

    const productDetails1Codes = [
        {
            id: "mainComponent",
            displayText: "ProductDetailsPage.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {BsHeart, BsHeartFill} from "react-icons/bs"\n' +
                'import {FiCpu, FiSmartphone} from "react-icons/fi"\n' +
                'import {IoMdCamera} from "react-icons/io"\n' +
                'import {MdBatteryChargingFull} from "react-icons/md"\n' +
                'import {GoVerified} from "react-icons/go";\n' +
                'import {IoStorefrontOutline} from "react-icons/io5";\n' +
                'import {CiDeliveryTruck} from "react-icons/ci";\n' +
                '\n' +
                '// all data\n' +
                'import {colors, images, storage} from "./Data.js";\n' +
                '\n' +
                'const ProductDetailsPage = () => {\n' +
                '    const [selectedImage, setSelectedImage] = useState(0)\n' +
                '    const [selectedColor, setSelectedColor] = useState("black")\n' +
                '    const [selectedStorage, setSelectedStorage] = useState("1TB")\n' +
                '    const [isFavorite, setIsFavorite] = useState(false)\n' +
                '\n' +
                '    return (\n' +
                '        <div className="mx-auto md:px-8 md:py-12">\n' +
                '            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">\n' +
                '\n' +
                '                {/* Left side - Image gallery */}\n' +
                '                <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">\n' +
                '\n' +
                '                    {/* Thumbnails */}\n' +
                '                    <div\n' +
                '                        className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">\n' +
                '                        {images.map((image, index) => (\n' +
                '                            <button\n' +
                '                                key={index}\n' +
                '                                onClick={() => setSelectedImage(index)}\n' +
                '                                className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${\n' +
                '                                    selectedImage === index ? "border-[#0FABCA]" : "border-transparent dark:border-slate-700"\n' +
                '                                }`}\n' +
                '                            >\n' +
                '                                <img\n' +
                '                                    src={image}\n' +
                '                                    alt={`Product ${index + 1}`}\n' +
                '                                    className="object-cover"\n' +
                '                                />\n' +
                '                            </button>\n' +
                '                        ))}\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Main image */}\n' +
                '                    <div className="w-full md:w-[80%] dark:bg-slate-900 bg-gray-100 rounded-sm h-[280px] md:h-[400px] relative flex items-center justify-center">\n' +
                '                        <img\n' +
                '                            src={images[selectedImage]}\n' +
                '                            alt="Product main image"\n' +
                '                            className="object-cover w-[200px] md:w-[300px] rounded-lg"\n' +
                '                        />\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                {/* Right side - Product details */}\n' +
                '                <div className="flex flex-col gap-6">\n' +
                '                    <div>\n' +
                '                        <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.9rem] font-bold text-gray-800">Apple iPhone 14 Pro Max</h1>\n' +
                '                        <div className="flex items-center gap-2 mt-2 md:mt-5">\n' +
                '                            <span className="text-3xl dark:text-[#abc2d3] font-medium">$1399</span>\n' +
                '                            <span className="text-xl dark:text-slate-400 text-gray-500 line-through">$1499</span>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Color selection */}\n' +
                '                    <div className="flex float-start md:items-center flex-col md:flex-row gap-[10px]">\n' +
                '                        <label className="text-sm dark:text-[#abc2d3] font-medium">Select color:</label>\n' +
                '                        <div className="flex gap-3">\n' +
                '                            {colors.map((color) => (\n' +
                '                                <button\n' +
                '                                    key={color.name}\n' +
                '                                    onClick={() => setSelectedColor(color.name)}\n' +
                '                                    className={`w-8 h-8 rounded-full ${color.class} ${\n' +
                '                                        selectedColor === color.name ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]" : ""\n' +
                '                                    }`}\n' +
                '                                    aria-label={color.name}\n' +
                '                                />\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Storage selection */}\n' +
                '                    <div>\n' +
                '                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">\n' +
                '                            {storage.map((size) => (\n' +
                '                                <button\n' +
                '                                    key={size}\n' +
                '                                    onClick={() => setSelectedStorage(size)}\n' +
                '                                    className={`py-2 px-4 rounded-lg border ${\n' +
                '                                        selectedStorage === size\n' +
                '                                            ? "border-[#0FABCA] bg-[#0FABCA]/10 text-[#0FABCA]"\n' +
                '                                            : "border-gray-200 dark:border-slate-700 dark:text-[#abc2d3]"\n' +
                '                                    }`}\n' +
                '                                >\n' +
                '                                    {size}\n' +
                '                                </button>\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Specifications */}\n' +
                '                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n' +
                '                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">\n' +
                '                            <FiSmartphone className="w-5 h-5 dark:text-[#abc2d3] text-gray-700"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Screen size</p>\n' +
                '                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">6.7"</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">\n' +
                '                            <FiCpu className="w-5 h-5 dark:text-[#abc2d3] text-gray-700"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">CPU</p>\n' +
                '                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">Apple A16 Bionic</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">\n' +
                '                            <IoMdCamera className="w-5 h-5 dark:text-[#abc2d3] text-gray-700"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Camera</p>\n' +
                '                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">48-12-12 MP</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">\n' +
                '                            <MdBatteryChargingFull className="w-5 h-5 dark:text-[#abc2d3] text-gray-700"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Battery</p>\n' +
                '                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">4323 mAh</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">\n' +
                '                        Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without\n' +
                '                        recharging throughout the day. Incredible photos in weak, yes and in bright light using\n' +
                '                        the new system with two cameras...\n' +
                '                        <button className="text-[#3B9DF8] hover:underline">more...</button>\n' +
                '                    </p>\n' +
                '\n' +
                '                    {/* Action buttons */}\n' +
                '                    <div className="flex flex-col md:flex-row gap-4">\n' +
                '                        <button\n' +
                '                            onClick={() => setIsFavorite(!isFavorite)}\n' +
                '                            className="flex-1 py-3 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">\n' +
                '                            <div className="flex items-center justify-center gap-2">\n' +
                '                                {\n' +
                '                                    isFavorite ? (\n' +
                '                                            <BsHeartFill className="w-5 h-5 text-red-500"/>\n' +
                '                                        )\n' +
                '                                        : (\n' +
                '                                            <BsHeart className="w-5 h-5"/>\n' +
                '                                        )\n' +
                '                                }\n' +
                '                                Add to Wishlist\n' +
                '                            </div>\n' +
                '                        </button>\n' +
                '                        <button className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90">\n' +
                '                            Add to Card\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Delivery info */}\n' +
                '                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">\n' +
                '                        <div className="flex items-center gap-3">\n' +
                '                            <CiDeliveryTruck className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Free Delivery</p>\n' +
                '                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">1-2 day</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center gap-3">\n' +
                '                            <IoStorefrontOutline className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">In Stock</p>\n' +
                '                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">Today</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center gap-3">\n' +
                '                            <GoVerified className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md"/>\n' +
                '                            <div>\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Guaranteed</p>\n' +
                '                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">1 year</p>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ProductDetailsPage;\n'
        },
        {
            id: "data",
            displayText: "Data.js",
            language: "js",
            code: '    export const images = [\n' +
                '        "https://i.ibb.co.com/GTGBw03/image-323.png",\n' +
                '        "https://i.ibb.co.com/thxkk1x/image-320.png",\n' +
                '        "https://i.ibb.co.com/MckV93r/image-320.png",\n' +
                '        "https://i.ibb.co.com/ZGWRGDT/image-320.png"\n' +
                '    ]\n' +
                '\n' +
                '    export const colors = [\n' +
                '        {name: "black", class: "bg-black"},\n' +
                '        {name: "purple", class: "bg-purple-600"},\n' +
                '        {name: "red", class: "bg-red-600"},\n' +
                '        {name: "yellow", class: "bg-yellow-500"},\n' +
                '        {name: "gray", class: "bg-gray-200"}\n' +
                '    ]\n' +
                '\n' +
                '    export const storage = ["128GB", "256GB", "512GB", "1TB"]'
        },
    ]

    const productDetails2Codes = [
        {
            id: "mainComponent",
            displayText: "ProductDetailsPage.jsx",
            language: "jsx",
            code: 'import React, {useState, useEffect} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {FaStar} from "react-icons/fa6"\n' +
                'import {FaHeart, FaRegHeart} from "react-icons/fa"\n' +
                'import {BiChevronLeft, BiChevronRight} from "react-icons/bi";\n' +
                '\n' +
                '// all data \n' +
                'import {colors, images} from "./data.js";\n' +
                '\n' +
                'const ProductDetailsPage = () => {\n' +
                '    const [currentImageIndex, setCurrentImageIndex] = useState(0)\n' +
                '    const [quantity, setQuantity] = useState(1)\n' +
                '    const [selectedColor, setSelectedColor] = useState("black")\n' +
                '    const [isFavorite, setIsFavorite] = useState(false)\n' +
                '    const [timeLeft, setTimeLeft] = useState({\n' +
                '        days: 2,\n' +
                '        hours: 12,\n' +
                '        minutes: 45,\n' +
                '        seconds: 5\n' +
                '    })\n' +
                '\n' +
                '    useEffect(() => {\n' +
                '        const timer = setInterval(() => {\n' +
                '            setTimeLeft(prev => {\n' +
                '                if (prev.seconds > 0) {\n' +
                '                    return {...prev, seconds: prev.seconds - 1}\n' +
                '                } else if (prev.minutes > 0) {\n' +
                '                    return {...prev, minutes: prev.minutes - 1, seconds: 59}\n' +
                '                } else if (prev.hours > 0) {\n' +
                '                    return {...prev, hours: prev.hours - 1, minutes: 59, seconds: 59}\n' +
                '                } else if (prev.days > 0) {\n' +
                '                    return {...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59}\n' +
                '                }\n' +
                '                return prev\n' +
                '            })\n' +
                '        }, 1000)\n' +
                '\n' +
                '        return () => clearInterval(timer)\n' +
                '    }, [])\n' +
                '\n' +
                '    const nextImage = () => {\n' +
                '        setCurrentImageIndex((prev) => (prev + 1) % images.length)\n' +
                '    }\n' +
                '\n' +
                '    const previousImage = () => {\n' +
                '        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)\n' +
                '    }\n' +
                '\n' +
                '    const formatNumber = (number) => number.toString().padStart(2, "0");\n' +
                '\n' +
                '    return (\n' +
                '        <div className="mx-auto md:px-8 md:py-12">\n' +
                '            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">\n' +
                '\n' +
                '                {/* Left side - Image gallery */}\n' +
                '                <div className="space-y-4">\n' +
                '\n' +
                '                    <div className="relative aspect-square">\n' +
                '\n' +
                '                        {/* NEW and SALE tags */}\n' +
                '                        <div className="absolute top-4 left-4 z-10 space-y-2">\n' +
                '                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">\n' +
                '                                NEW\n' +
                '                              </span>\n' +
                '                            <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">\n' +
                '                                -50%\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '\n' +
                '                        {/* Main image with navigation arrows */}\n' +
                '                        <div className="relative h-full">\n' +
                '                            <img\n' +
                '                                src={images[currentImageIndex]}\n' +
                '                                alt={`Product view ${currentImageIndex + 1}`}\n' +
                '                                className="w-full h-full object-cover"\n' +
                '                            />\n' +
                '                            <button\n' +
                '                                onClick={previousImage}\n' +
                '                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"\n' +
                '                                aria-label="Previous image"\n' +
                '                            >\n' +
                '                                <BiChevronLeft className="w-6 h-6"/>\n' +
                '                            </button>\n' +
                '                            <button\n' +
                '                                onClick={nextImage}\n' +
                '                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"\n' +
                '                                aria-label="Next image"\n' +
                '                            >\n' +
                '                                <BiChevronRight className="w-6 h-6"/>\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* Thumbnail images */}\n' +
                '                    <div className="flex gap-4 justify-between">\n' +
                '                        {images.map((image, index) => (\n' +
                '                            <button\n' +
                '                                key={index}\n' +
                '                                onClick={() => setCurrentImageIndex(index)}\n' +
                '                                className={`relative transition-all duration-300 w-[8rem] aspect-square ${\n' +
                '                                    currentImageIndex === index\n' +
                '                                        ? "ring-2 ring-[#0FABCA]"\n' +
                '                                        : "hover:ring-2 hover:ring-[#0FABCA]"\n' +
                '                                }`}\n' +
                '                            >\n' +
                '                                <img\n' +
                '                                    src={image}\n' +
                '                                    alt={`Thumbnail ${index + 1}`}\n' +
                '                                    className="w-full h-full object-cover"\n' +
                '                                />\n' +
                '                            </button>\n' +
                '                        ))}\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                {/* Right side - Product details */}\n' +
                '                <div className="space-y-3">\n' +
                '                    <div className="flex items-center gap-2">\n' +
                '                        <div className="flex gap-0.5">\n' +
                '                            {[...Array(5)].map((_, i) => (\n' +
                '                                <FaStar key={i} className="w-4 h-4 dark:fill-slate-400 fill-black"/>\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                        <span className="text-sm dark:text-slate-400 text-gray-600">11 Reviews</span>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <h1 className="text-[1.6rem] md:text-[1.9rem] dark:text-[#abc2d3] text-gray-800 font-semibold">Tray Table</h1>\n' +
                '\n' +
                '                    <p className="text-gray-600 dark:text-slate-400 text-[0.9rem]">\n' +
                '                        Buy one or buy a few and make every space where you sit more convenient. Light and easy to\n' +
                '                        move around with removable tray top, handy for serving snacks.\n' +
                '                    </p>\n' +
                '\n' +
                '                    <div className="flex items-center gap-3">\n' +
                '                        <span className="text-[1.5rem] dark:text-[#abc2d3] text-gray-800 font-medium">$199.00</span>\n' +
                '                        <span className="text-lg dark:text-slate-400 text-gray-500 line-through">$400.00</span>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="pb-2">\n' +
                '                        <p className="font-medium text-[0.9rem] dark:text-[#abc2d3] text-gray-600">Offer expires in:</p>\n' +
                '                        <div className="flex items-center gap-[10px] mt-2">\n' +
                '                            <div className="flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]">\n' +
                '                                <h5 className="py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold">{formatNumber(timeLeft.days)}</h5>\n' +
                '                                <span className="text-[0.7rem]">Days</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]">\n' +
                '                                <h5 className="py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold">{formatNumber(timeLeft.hours)}</h5>\n' +
                '                                <span className="text-[0.7rem]">Hours</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]">\n' +
                '                                <h5 className="py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold">{formatNumber(timeLeft.minutes)}</h5>\n' +
                '                                <span className="text-[0.7rem]">Minutes</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]">\n' +
                '                                <h5 className="py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold">{formatNumber(timeLeft.seconds)}</h5>\n' +
                '                                <span className="text-[0.7rem]">Seconds</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="space-y-2 border-t dark:border-slate-700 border-t-gray-200 pt-4">\n' +
                '                        <p className="font-medium dark:text-[#abc2d3] text-[0.9rem] text-gray-600">Measurements</p>\n' +
                '                        <p className="text-gray-800 dark:text-slate-400">17 1/2×20 5/8 "</p>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="space-y-2 pt-2">\n' +
                '                        <p className="font-medium text-gray-600 dark:text-[#abc2d3] text-[0.9rem]">Choose Color</p>\n' +
                '                        <p className="font-semibold pb-1 dark:text-slate-400 text-gray-800 text-[0.9rem] capitalize">{selectedColor}</p>\n' +
                '                        <div className="flex gap-2">\n' +
                '                            {colors.map((color) => (\n' +
                '                                <button\n' +
                '                                    onClick={() => setSelectedColor(color.name)}\n' +
                '                                    aria-label={color.name}\n' +
                '                                    key={color.name}\n' +
                '                                    className={`w-8 h-8 rounded-full ${color.value} ${\n' +
                '                                        selectedColor === color.name ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]" : ""\n' +
                '                                    }`}\n' +
                '                                >\n' +
                '                                </button>\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="flex gap-4 items-center pt-6">\n' +
                '                        <div className="flex items-center dark:bg-slate-900 bg-gray-100 rounded-md">\n' +
                '                            <button\n' +
                '                                onClick={() => setQuantity(Math.max(1, quantity - 1))}\n' +
                '                                className="px-4 py-[0.560rem] dark:hover:bg-slate-800 dark:text-[#abc2d3] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"\n' +
                '                            >\n' +
                '                                −\n' +
                '                            </button>\n' +
                '                            <input\n' +
                '                                type="number"\n' +
                '                                value={quantity}\n' +
                '                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}\n' +
                '                                className="w-10 font-medium outline-none dark:text-[#abc2d3] text-[0.9rem] bg-transparent text-center"\n' +
                '                            />\n' +
                '                            <button\n' +
                '                                onClick={() => setQuantity(quantity + 1)}\n' +
                '                                className="px-4 py-[0.560rem] dark:text-[#abc2d3] dark:hover:bg-slate-800 text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"\n' +
                '                            >\n' +
                '                                +\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                        <button\n' +
                '                            onClick={()=> setIsFavorite(!isFavorite)}\n' +
                '                            className="py-3 border border-gray-200 rounded-md dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 flex items-center justify-center gap-[10px] grow hover:bg-gray-50">\n' +
                '                            {\n' +
                '                                isFavorite ? (\n' +
                '                                        <FaHeart className="w-5 h-5 text-red-500"/>\n' +
                '                                    )\n' +
                '                                    : (\n' +
                '                                        <FaRegHeart className="w-5 h-5 dark:text-[#abc2d3] text-gray-800"/>\n' +
                '                                    )\n' +
                '                            }\n' +
                '                            Wishlist\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <button className="w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90">\n' +
                '                        Add to Cart\n' +
                '                    </button>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ProductDetailsPage;\n'
        },
        {
            id: "data",
            displayText: "Data.js",
            language: "js",
            code: '    export const images = [\n' +
                '        "https://i.ibb.co.com/8ck41d5/Paste-image.png",\n' +
                '        "https://i.ibb.co.com/0QhryRt/Paste-Image.png",\n' +
                '        "https://i.ibb.co.com/JsJcVYZ/Paste-Image.png",\n' +
                '        "https://i.ibb.co.com/n6sF5wz/Paste-Image.png",\n' +
                '    ]\n' +
                '\n' +
                '    export const colors = [\n' +
                '        {name: "black", value: "bg-black"},\n' +
                '        {name: "beige", value: "bg-[#D2C4B5]"},\n' +
                '        {name: "red", value: "bg-red-500"},\n' +
                '        {name: "white", value: "bg-white"},\n' +
                '    ]'
        },
    ]

    const productDetails3Codes = [
        {
            id: "mainComponent",
            displayText: "ProductDetailsPage.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar} from "react-icons/io5";\n' +
                'import {BiChevronLeft, BiChevronRight} from "react-icons/bi";\n' +
                '\n' +
                '// all data\n' +
                'import {colors, images, sizes} from "./data.js";\n' +
                '\n' +
                'const ProductDetailsPage = () => {\n' +
                '    const [currentImageIndex, setCurrentImageIndex] = useState(0)\n' +
                '    const [isFavorite, setIsFavorite] = useState(false)\n' +
                '    const [selectedSize, setSelectedSize] = useState("8")\n' +
                '    const [selectedColor, setSelectedColor] = useState("Royal Brown")\n' +
                '\n' +
                '    const nextImage = () => {\n' +
                '        setCurrentImageIndex((prev) => (prev + 1) % images.length)\n' +
                '    }\n' +
                '\n' +
                '    const prevImage = () => {\n' +
                '        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)\n' +
                '    }\n' +
                '\n' +
                '    const selectThumbnail = (index) => {\n' +
                '        setCurrentImageIndex(index)\n' +
                '    }\n' +
                '\n' +
                '    return (\n' +
                '        <div className="md:p-8">\n' +
                '            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">\n' +
                '                {/* Image Section */}\n' +
                '                <div className="relative">\n' +
                '                    <div className="flex">\n' +
                '                        <div className="flex items-center justify-center w-[90%] dark:bg-slate-900 bg-gray-100 overflow-hidden rounded-md">\n' +
                '                            <img\n' +
                '                                src={images[currentImageIndex]}\n' +
                '                                alt={`Product view ${currentImageIndex + 1}`}\n' +
                '                                className="w-[300px] h-[400px] object-cover"\n' +
                '                            />\n' +
                '                        </div>\n' +
                '                        <div className="flex flex-col justify-between gap-[15px] ml-[20px]">\n' +
                '\n' +
                '                            <div className="flex flex-col gap-[10px]">\n' +
                '                                <button className="bg-gray-100 dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:bg-slate-800 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200">\n' +
                '                                    <IoShareSocialOutline className="w-5 h-5"/>\n' +
                '                                </button>\n' +
                '\n' +
                '                                <button\n' +
                '                                    className="bg-gray-100 dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:bg-slate-800 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200"\n' +
                '                                    onClick={() => setIsFavorite(!isFavorite)}\n' +
                '                                >\n' +
                '                                    {\n' +
                '                                        isFavorite ? (\n' +
                '                                            <IoHeart className="w-5 h-5 text-red-500"/>\n' +
                '                                        ) : (\n' +
                '                                            <IoHeartOutline className="w-5 h-5"/>\n' +
                '                                        )\n' +
                '                                    }\n' +
                '                                </button>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div className="flex flex-col gap-[10px]">\n' +
                '                                <button\n' +
                '                                    onClick={prevImage}\n' +
                '                                    className="bg-gray-100 rounded-md dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:bg-slate-800 w-max text-gray-600 p-2 hover:bg-gray-200"\n' +
                '                                    aria-label="Previous image"\n' +
                '                                >\n' +
                '                                    <BiChevronLeft className="w-6 h-6"/>\n' +
                '                                </button>\n' +
                '                                <button\n' +
                '                                    onClick={nextImage}\n' +
                '                                    className="bg-gray-100 rounded-md dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:bg-slate-800 w-max text-gray-600 p-2 hover:bg-gray-200"\n' +
                '                                    aria-label="Next image"\n' +
                '                                >\n' +
                '                                    <BiChevronRight className="w-6 h-6"/>\n' +
                '                                </button>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div className="scrollbar flex w-full md:w-[87%] gap-2 mt-4 overflow-x-auto">\n' +
                '                        {images.map((img, index) => (\n' +
                '                            <button\n' +
                '                                key={index}\n' +
                '                                onClick={() => selectThumbnail(index)}\n' +
                '                                className={`flex-shrink-0 dark:bg-slate-900 bg-gray-100 w-20 transition-all duration-300 h-20 rounded-md mb-1 overflow-hidden border-2 ${currentImageIndex === index ? "border-[#0FABCA]" : "border-transparent"\n' +
                '                                }`}\n' +
                '                            >\n' +
                '                                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover"/>\n' +
                '                            </button>\n' +
                '                        ))}\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                {/* Product Details Section */}\n' +
                '                <div className="flex flex-col">\n' +
                '                    <div className="flex justify-between items-start">\n' +
                '                        <div className="w-full">\n' +
                '                            <p className="text-gray-400 dark:text-slate-400 text-[0.9rem]">John Lewis ANYDAY</p>\n' +
                '                            <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.8rem] text-gray-800 font-semibold mb-3">Long Sleeve Overshirt, Khaki, 6</h1>\n' +
                '                            <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-1 md:gap-4 mb-4">\n' +
                '                                <div className="flex items-center">\n' +
                '                                    <span className="text-[1.4rem] font-semibold dark:text-[#abc2d3] text-gray-800">£28.00</span>\n' +
                '                                    <span className="text-gray-400 dark:text-slate-400 text-[1rem] line-through ml-2">£40.00</span>\n' +
                '                                </div>\n' +
                '                                <div className="flex items-center gap-1">\n' +
                '                                    <IoStar className="text-yellow-400 text-[1.1rem]"/>\n' +
                '                                    <span className="text-gray-800 dark:text-[#abc2d3] font-semibold">4.5</span>\n' +
                '                                    <span className="text-gray-500 dark:text-slate-400">(1,238 Sold)</span>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="mb-6 border-t-[2px] dark:border-slate-700 border-gray-200 border-dashed mt-1 pt-6">\n' +
                '                        <h2 className="text-gray-700 dark:text-[#abc2d3] font-semibold mb-2">Description:</h2>\n' +
                '                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">\n' +
                '                            Boba etiam ut bulla tea est potus electus singulari compositione saporum et textuum, quae in\n' +
                '                            Taiwan annis 1980 orta sunt. Boba refert ad pitas marnicas tapiocas in fundo potus inventas,\n' +
                '                            quae typice lacte tea nigro sapiuntur.\n' +
                '                            <button className="text-blue-600 hover:underline ml-1">See More...</button>\n' +
                '                        </p>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="mb-8">\n' +
                '                        <div className="flex justify-between items-center mb-2">\n' +
                '                            <h2 className="font-medium dark:text-[#abc2d3] text-gray-400">Color: <span className="text-gray-700 dark:text-slate-400 font-semibold">{selectedColor}</span></h2>\n' +
                '                        </div>\n' +
                '                        <div className="flex gap-2">\n' +
                '                            {colors.map((color) => (\n' +
                '                                <button\n' +
                '                                    key={color.name}\n' +
                '                                    onClick={() => setSelectedColor(color.name)}\n' +
                '                                    className={` w-20 h-10 rounded-md border-2 transition-all duration-300 ${\n' +
                '                                        selectedColor === color.name ? "border-[#0FABCA] p-1" : "border-transparent" } `}\n' +
                '                                    aria-label={`Select ${color.name} color`}\n' +
                '                                >\n' +
                '                                    <div className={`w-full h-full rounded-md transition-all duration-300 ${color.class}`}></div>\n' +
                '                                </button>\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="mb-10">\n' +
                '                        <div className="flex justify-between items-center mb-2">\n' +
                '                            <h2 className="font-medium dark:text-[#abc2d3] text-gray-400">Size: <span className="font-semibold dark:text-slate-400 text-gray-700">{selectedSize}</span></h2>\n' +
                '                            <button className="text-gray-600 text-[0.8rem] dark:text-[#abc2d3] underline">View Size Chart</button>\n' +
                '                        </div>\n' +
                '                        <div className="flex w-full flex-wrap gap-2">\n' +
                '                            {sizes.map((size) => (\n' +
                '                                <button\n' +
                '                                    key={size}\n' +
                '                                    onClick={() => setSelectedSize(size)}\n' +
                '                                    className={\n' +
                '                                        `px-4 py-2 max-w-[60px] grow rounded-md border ${selectedSize === size\n' +
                '                                            ? "border-[#0FABCA] bg-[#0FABCA] text-white"\n' +
                '                                            : "border-gray-200 dark:border-slate-700 dark:text-[#abc2d3] hover:border-[#0FABCA]"}`}\n' +
                '                                >\n' +
                '                                    {size}\n' +
                '                                </button>\n' +
                '                            ))}\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div className="flex flex-col md:flex-row gap-4 mt-auto">\n' +
                '                        <button className="grow py-3 px-6 bg-[#0FABCA] hover:bg-[#0FABCA]/90 rounded-md text-white">\n' +
                '                            Add To Cart\n' +
                '                        </button>\n' +
                '                        <button className="grow py-3 px-6 border dark:border-slate-700 dark:hover:bg-slate-900 dark:text-[#abc2d3] border-gray-300 text-gray-600 rounded-md">\n' +
                '                            Checkout Now\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ProductDetailsPage;\n'
        },
        {
            id: "data",
            displayText: "Data.js",
            language: "js",
            code: 'export const images = [\n' +
                '        "https://i.ibb.co.com/LxyQVtG/image-19.png",\n' +
                '        "https://i.ibb.co.com/d6RXLM2/image-22.png",\n' +
                '        "https://i.ibb.co.com/17yKVQm/image-19.png",\n' +
                '        "https://i.ibb.co.com/NCQFGJr/image-21.png",\n' +
                '        "https://i.ibb.co.com/2tWVrdD/image-23.png"\n' +
                '    ]\n' +
                '\n' +
                '    export const sizes = ["6", "8", "10", "14", "18", "20"]\n' +
                '    \n' +
                '    export const colors = [\n' +
                '        { name: "Royal Brown", class: "bg-[#654321]" },\n' +
                '        { name: "Light Gray", class: "bg-gray-200" },\n' +
                '        { name: "Steel Blue", class: "bg-[#4682B4]" },\n' +
                '        { name: "Navy", class: "bg-navy-900" }\n' +
                '    ]'
        },
    ]

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"product details page 1"} id={"product_details_page_1"}/>

                <BlockDescription
                    text='View all product details in one place - images, specs, reviews, pricing, and more. Everything you need to make an informed purchase!'/>

                <BlockToggleTab code={productDetails1Code} setCode={setProductDetails1Code}
                                setPreview={setProductDetails1Preview} preview={productDetails1Preview}/>

                <BlockWrapper>
                    {productDetails1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ProductDetailsExample1/>
                        </div>
                    )}

                    {productDetails1Code && <BlocksShowCode code={productDetails1Codes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"product details page 2"} id={"product_details_page_2"}/>
                </div>

                <BlockDescription
                    text='View all product details in one place - images, specs, reviews, pricing, and more. Everything you need to make an informed purchase!'/>

                <BlockToggleTab setPreview={setProductDetails2Preview} setCode={setProductDetails2Code}
                                preview={productDetails2Preview} code={productDetails2Code}/>

                <BlockWrapper>
                    {productDetails2Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ProductDetailsExample2/>
                        </div>
                    )}

                    {productDetails2Code && <BlocksShowCode code={productDetails2Codes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"product details page 3"} id={"product_details_page_3"}/>
                </div>

                <BlockDescription
                    text='View all product details in one place - images, specs, reviews, pricing, and more. Everything you need to make an informed purchase!'/>

                <BlockToggleTab setPreview={setProductDetails3Preview} setCode={setProductDetails3Code}
                                preview={productDetails3Preview} code={productDetails3Code}/>

                <BlockWrapper>
                    {productDetails3Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ProductDetailsExample3/>
                        </div>
                    )}

                    {productDetails3Code && <BlocksShowCode code={productDetails3Codes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/newsletter-form' backName='newsletter form'
                              forwardUrl='/blocks/empty-page' forwardName='empty page'/>
            </div>


            <Helmet>
                <title>Blocks - Product Details Page</title>
            </Helmet>
        </aside>
    );
};

export default Index;
