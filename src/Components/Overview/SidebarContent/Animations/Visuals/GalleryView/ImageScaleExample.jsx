import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const ImageScaleExample = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredImageId, setHoveredImageId] = useState(null); // New state

    const images = [
        {
            id: 1,
            title: "Lone Tree in Open Field",
            description: "A solitary tree stands tall in the middle of a serene golden field under a vast sky, evoking peace and solitude.",
            src: "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?t=st=1747144481~exp=1747148081~hmac=b62717149dc4033e44b12015a3742441f5584f3b92f4d8c2fc2315708898a6b6&w=1380",
        },
        {
            id: 2,
            title: "Lake and Snow-Capped Mountains",
            description: "A breathtaking view of a still lake surrounded by bare trees, with snow-covered peaks rising in the distance beneath a cloudy sky.",
            src: "https://img.freepik.com/free-photo/view-old-tree-lake-with-snow-covered-mountains-cloudy-day_181624-28954.jpg?t=st=1747144811~exp=1747148411~hmac=c9e9c138fa35442c1e9cad40c478a9cd684ac10d2866b6cc2d21f9aebc35cb12&w=1380",
        },
        {
            id: 3,
            title: "Wild Deer in Natural Habitat",
            description: "A close-up shot of a wild deer in a lush, green forest area, capturing its alert and graceful stance in the wilderness.",
            src: "https://img.freepik.com/free-photo/wild-deer-nature_23-2151474244.jpg?t=st=1747144861~exp=1747148461~hmac=d7ecbf2ff986150e1a7dd2289195289e128a2977aab60f821f8943b9de7b6f3a&w=1380",
        },
        {
            id: 4,
            title: "Dense Forest Landscape",
            description: "A misty forest with tall pine trees and soft undergrowth, offering a calming atmosphere and a glimpse into untouched nature.",
            src: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?t=st=1747145983~exp=1747149583~hmac=7d6f2c8a9cd920a30abc2b1229da1ce099135eea08dc26d22ccfb61e4832105d&w=1380",
        },
    ];

    const handleCardClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 640px:grid-cols-2 1024px:grid-cols-5 gap-4">
                {images.map((image, index) => {
                    const isOtherImageHovered = hoveredImageId !== null && hoveredImageId !== image.id;

                    return (
                        <motion.div
                            key={image.id}
                            className={`${index === 0 ? 'col-span-3' : index === 1 ? 'col-span-2' : index === 2 ? 'col-span-2' : 'col-span-3'} relative cursor-pointer transition-all duration-300 ${
                                isOtherImageHovered ? "blur-sm" : "blur-0"
                            }`}
                            onClick={() => handleCardClick(image)}
                            onMouseEnter={() => setHoveredImageId(image.id)}
                            onMouseLeave={() => setHoveredImageId(null)}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-[250px] object-cover rounded-lg"
                            />
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center"
                        onClick={handleClose}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-high w-[50%] p-5"
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                            transition={{duration: 0.3, type: "spring", stiffness: 400, damping: 22}}
                        >
                            <motion.img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-[400px] object-cover rounded-lg"
                            />
                            <h3 className="mt-5 text-2xl font-semibold">{selectedImage.title}</h3>
                            <p className="text-gray-700 mt-2">{selectedImage.description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ImageScaleExample;
