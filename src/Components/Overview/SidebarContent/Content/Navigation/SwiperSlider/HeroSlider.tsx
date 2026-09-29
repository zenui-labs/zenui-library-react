"use client"

import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay, EffectCube, Navigation, Pagination} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-cube"
import {AiFillCalendar} from "react-icons/ai";
import {BiMapPin} from "react-icons/bi";
import {FaExternalLinkAlt} from "react-icons/fa";

const destinations = [
    {
        id: 1,
        name: "Tokyo, Japan",
        description: "Experience the perfect blend of traditional culture and modern innovation",
        image: "/placeholder.svg?height=400&width=400",
        price: "$1,299",
        duration: "7 days",
        rating: 4.9,
        highlights: ["Cherry Blossoms", "Sushi Tours", "Temple Visits", "Modern Architecture"],
    },
    {
        id: 2,
        name: "Paris, France",
        description: "The city of love and lights awaits with its timeless charm",
        image: "/placeholder.svg?height=400&width=400",
        price: "$1,599",
        duration: "5 days",
        rating: 4.8,
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine River", "French Cuisine"],
    },
    {
        id: 3,
        name: "Bali, Indonesia",
        description: "Tropical paradise with stunning beaches and rich cultural heritage",
        image: "/placeholder.svg?height=400&width=400",
        price: "$899",
        duration: "6 days",
        rating: 4.7,
        highlights: ["Beach Resorts", "Temple Tours", "Rice Terraces", "Spa Treatments"],
    },
    {
        id: 4,
        name: "New York, USA",
        description: "The city that never sleeps offers endless possibilities",
        image: "/placeholder.svg?height=400&width=400",
        price: "$1,199",
        duration: "4 days",
        rating: 4.6,
        highlights: ["Times Square", "Central Park", "Broadway Shows", "Museums"],
    },
    {
        id: 5,
        name: "Santorini, Greece",
        description: "Breathtaking sunsets and white-washed buildings by the Aegean Sea",
        image: "/placeholder.svg?height=400&width=400",
        price: "$1,399",
        duration: "5 days",
        rating: 4.9,
        highlights: ["Sunset Views", "Wine Tasting", "Blue Domes", "Volcanic Beaches"],
    },
]

export default function HeroSlider() {
    return (
        <div className="max-w-4xl mx-auto">
            <Swiper
                modules={[Navigation, Pagination, EffectCube, Autoplay]}
                effect="cube"
                grabCursor={true}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="cube-slider w-full max-w-md sm:max-w-lg mx-auto"
            >
                {destinations.map((destination) => (
                    <SwiperSlide key={destination.id}>
                        <div className="relative w-full h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Background Image */}
                            <img
                                src={destination.image || "/placeholder.svg"}
                                alt={destination.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-lg ${i < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-400"}`}
                                            >
                        ★
                      </span>
                                        ))}
                                    </div>
                                    <span className="text-sm">({destination.rating})</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{destination.name}</h2>

                                {/* Description */}
                                <p className="text-white/90 mb-4 text-sm sm:text-base">{destination.description}</p>

                                {/* Details */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                                        <div className="flex items-center gap-1 text-sm">
                                            <AiFillCalendar size={16}/>
                                            <span>{destination.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <BiMapPin size={16}/>
                                            <span>Starting from</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-bold">{destination.price}</div>
                                </div>

                                {/* Highlights */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                                            <span
                                                key={index}
                                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                                            >
                        {highlight}
                      </span>
                                        ))}
                                        {destination.highlights.length > 3 && (
                                            <span
                                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                        +{destination.highlights.length - 3} more
                      </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300">
                                        Book Now
                                    </button>
                                    <button
                                        className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                                        <FaExternalLinkAlt size={16}/>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
