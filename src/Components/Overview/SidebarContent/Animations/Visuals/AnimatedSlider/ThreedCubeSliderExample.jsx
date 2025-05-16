import {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

const ThreedCubeSliderExample = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const [distanceZ, setDistanceZ] = useState(0);

    const images = [
        {
            url: "https://img.freepik.com/free-photo/view-illuminated-neon-gaming-keyboard-setup-controller_23-2149529367.jpg",
            alt: "Slider image 1"
        },
        {
            url: "https://img.freepik.com/free-photo/high-angle-gaming-setup-with-computer_23-2149829138.jpg",
            alt: "Slider image 2"
        },
        {
            url: "https://img.freepik.com/free-photo/modern-monitor-elegant-table_23-2150706403.jpg",
            alt: "Slider image 3"
        },
        {
            url: "https://img.freepik.com/free-photo/cool-gaming-setup-indoors-still-life_23-2149829153.jpg",
            alt: "Slider image 4"
        },
        {
            url: "https://img.freepik.com/free-vector/cartoon-gamer-room-illustration_52683-60981.jpg",
            alt: "Slider image 5"
        },
    ];

    const totalSlides = images.length;
    const angleStep = 360 / totalSlides;

    useLayoutEffect(() => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setDistanceZ(width / 1.9);
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[300px] rounded-high overflow-hidden"
            style={{perspective: '1000px'}}
        >
            <div
                className="w-full h-full relative"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${-currentIndex * angleStep}deg)`,
                    transition: 'transform 1s ease',
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="absolute w-full h-full bg-gray-800 flex items-center justify-center"
                        style={{
                            transform: `rotateY(${index * angleStep}deg) translateZ(${distanceZ}px)`,
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button
                    className="bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors pointer-events-auto"
                    onClick={handlePrev}
                >
                    <BiChevronLeft size={24}/>
                </button>
                <button
                    className="bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors pointer-events-auto"
                    onClick={handleNext}
                >
                    <BiChevronRight size={24}/>
                </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThreedCubeSliderExample;
