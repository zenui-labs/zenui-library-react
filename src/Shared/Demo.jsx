import {useState} from "react";

// framer motion
import {AnimatePresence, motion} from "framer-motion";

// data
import CardData from "./CardData.js"

const App = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredImageId, setHoveredImageId] = useState(null);

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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {CardData.map((image, index) => {
                    const isOtherImageHovered = hoveredImageId !== null && hoveredImageId !== image.id;

                    return (
                        <motion.div
                            key={image.id}
                            className={`${index === 0 ? "md:col-span-3" : index === 1 ? "md:col-span-2" : index === 2 ? "md:col-span-2" : "md:col-span-3"} relative cursor-pointer transition-all duration-300 ${
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
                        className="fixed inset-0 z-[999999999] bg-black/50 dark:bg-black/70 flex items-center justify-center"
                        onClick={handleClose}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white dark:bg-slate-800 rounded-lg w-[95%] md:w-[80%] 1024px:w-[50%] p-5"
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
                            <h3 className="mt-5 dark:text-[#d2e5f5] text-2xl font-semibold">{selectedImage.title}</h3>
                            <p className="text-gray-700 dark:text-[#d2e5f5]/70 mt-2">{selectedImage.description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default App;
