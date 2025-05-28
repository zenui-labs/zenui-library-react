import React, {useEffect, useState} from 'react';

// react icons
import {FaStar} from 'react-icons/fa6'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

const ProductDetailsExample2 = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState('black')
    const [isFavorite, setIsFavorite] = useState(false)
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 12,
        minutes: 45,
        seconds: 5
    })

    const images = [
        'https://i.ibb.co.com/8ck41d5/Paste-image.png',
        'https://i.ibb.co.com/0QhryRt/Paste-Image.png',
        'https://i.ibb.co.com/JsJcVYZ/Paste-Image.png',
        'https://i.ibb.co.com/n6sF5wz/Paste-Image.png',
    ]

    const colors = [
        {name: 'black', value: 'bg-black'},
        {name: 'beige', value: 'bg-[#D2C4B5]'},
        {name: 'red', value: 'bg-red-500'},
        {name: 'white', value: 'bg-white'},
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return {...prev, seconds: prev.seconds - 1}
                } else if (prev.minutes > 0) {
                    return {...prev, minutes: prev.minutes - 1, seconds: 59}
                } else if (prev.hours > 0) {
                    return {...prev, hours: prev.hours - 1, minutes: 59, seconds: 59}
                } else if (prev.days > 0) {
                    return {...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59}
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const formatNumber = (number) => number.toString().padStart(2, '0');

    return (
        <div className="mx-auto 1024px:px-8 1024px:py-12">
            <div className="grid grid-cols-1 1024px:grid-cols-2 gap-8 1024px:gap-12">

                {/* Left side - Image gallery */}
                <div className="space-y-4">

                    <div className="relative aspect-square">

                        {/* NEW and SALE tags */}
                        <div className="absolute top-4 left-4 z-10 space-y-2">
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">
                                NEW
                              </span>
                            <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">
                                -50%
                            </div>
                        </div>

                        {/* Main image with navigation arrows */}
                        <div className="relative h-full">
                            <img
                                src={images[currentImageIndex]}
                                alt={`Product view ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={previousImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                                aria-label="Previous image"
                            >
                                <BiChevronLeft className="w-6 h-6"/>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                                aria-label="Next image"
                            >
                                <BiChevronRight className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail images */}
                    <div className="flex gap-4 justify-between">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative transition-all duration-300 w-[8rem] aspect-square ${
                                    currentImageIndex === index
                                        ? 'ring-2 ring-[#0FABCA]'
                                        : 'hover:ring-2 hover:ring-[#0FABCA]'
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="w-4 h-4 dark:fill-slate-400 fill-black"/>
                            ))}
                        </div>
                        <span className="text-sm dark:text-slate-400 text-gray-600">11 Reviews</span>
                    </div>

                    <h1 className="text-[1.6rem] 1024px:text-[1.9rem] dark:text-[#abc2d3] text-gray-800 font-semibold">Tray
                        Table</h1>

                    <p className="text-gray-600 dark:text-slate-400 text-[0.9rem]">
                        Buy one or buy a few and make every space where you sit more convenient. Light and easy to
                        move around with removable tray top, handy for serving snacks.
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-[1.5rem] dark:text-[#abc2d3] text-gray-800 font-medium">$199.00</span>
                        <span className="text-lg dark:text-slate-400 text-gray-500 line-through">$400.00</span>
                    </div>

                    <div className="pb-2">
                        <p className="font-medium text-[0.9rem] dark:text-[#abc2d3] text-gray-600">Offer expires in:</p>
                        <div className='flex items-center gap-[10px] mt-2'>
                            <div className='flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]'>
                                <h5 className='py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold'>{formatNumber(timeLeft.days)}</h5>
                                <span className='text-[0.7rem]'>Days</span>
                            </div>
                            <div className='flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]'>
                                <h5 className='py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold'>{formatNumber(timeLeft.hours)}</h5>
                                <span className='text-[0.7rem]'>Hours</span>
                            </div>
                            <div className='flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]'>
                                <h5 className='py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold'>{formatNumber(timeLeft.minutes)}</h5>
                                <span className='text-[0.7rem]'>Minutes</span>
                            </div>
                            <div className='flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]'>
                                <h5 className='py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold'>{formatNumber(timeLeft.seconds)}</h5>
                                <span className='text-[0.7rem]'>Seconds</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 border-t dark:border-slate-700 border-t-gray-200 pt-4">
                        <p className="font-medium dark:text-[#abc2d3] text-[0.9rem] text-gray-600">Measurements</p>
                        <p className="text-gray-800 dark:text-slate-400">17 1/2×20 5/8 "</p>
                    </div>

                    <div className="space-y-2 pt-2">
                        <p className="font-medium text-gray-600 dark:text-[#abc2d3] text-[0.9rem]">Choose Color</p>
                        <p className="font-semibold pb-1 dark:text-slate-400 text-gray-800 text-[0.9rem] capitalize">{selectedColor}</p>
                        <div className="flex gap-2">
                            {colors.map((color) => (
                                <button
                                    onClick={() => setSelectedColor(color.name)}
                                    aria-label={color.name}
                                    key={color.name}
                                    className={`w-8 h-8 rounded-full ${color.value} ${
                                        selectedColor === color.name ? 'ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]' : ''
                                    }`}
                                >
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center pt-6">
                        <div className="flex items-center dark:bg-slate-900 bg-gray-100 rounded-md">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-[0.560rem] dark:hover:bg-slate-800 dark:text-[#abc2d3] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-10 font-medium outline-none dark:text-[#abc2d3] text-[0.9rem] bg-transparent text-center"
                            />
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-[0.560rem] dark:text-[#abc2d3] dark:hover:bg-slate-800 text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="py-3 border border-gray-200 rounded-md dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 flex items-center justify-center gap-[10px] grow hover:bg-gray-50">
                            {
                                isFavorite ? (
                                        <FaHeart className="w-5 h-5 text-red-500"/>
                                    )
                                    : (
                                        <FaRegHeart className="w-5 h-5 dark:text-[#abc2d3] text-gray-800"/>
                                    )
                            }
                            Wishlist
                        </button>
                    </div>

                    <button className="w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsExample2;
