export const HoverEffectAndImageScaleCodes = [
    {
        id: 'container',
        displayText: 'App.jsx',
        language: 'jsx',
        code: 'import {useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion} from "framer-motion";\n' +
            '\n' +
            '// data\n' +
            'import CardData from "./CardData.js"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [selectedImage, setSelectedImage] = useState(null);\n' +
            '    const [hoveredImageId, setHoveredImageId] = useState(null);\n' +
            '\n' +
            '    const handleCardClick = (image) => {\n' +
            '        setSelectedImage(image);\n' +
            '    };\n' +
            '\n' +
            '    const handleClose = (e) => {\n' +
            '        if (e.target === e.currentTarget) {\n' +
            '            setSelectedImage(null);\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">\n' +
            '                {CardData.map((image, index) => {\n' +
            '                    const isOtherImageHovered = hoveredImageId !== null && hoveredImageId !== image.id;\n' +
            '\n' +
            '                    return (\n' +
            '                        <motion.div\n' +
            '                            key={image.id}\n' +
            '                            className={`${index === 0 ? "md:col-span-3" : index === 1 ? "md:col-span-2" : index === 2 ? "md:col-span-2" : "md:col-span-3"} relative cursor-pointer transition-all duration-300 ${\n' +
            '                                isOtherImageHovered ? "blur-sm" : "blur-0"\n' +
            '                            }`}\n' +
            '                            onClick={() => handleCardClick(image)}\n' +
            '                            onMouseEnter={() => setHoveredImageId(image.id)}\n' +
            '                            onMouseLeave={() => setHoveredImageId(null)}\n' +
            '                        >\n' +
            '                            <img\n' +
            '                                src={image.src}\n' +
            '                                alt={image.title}\n' +
            '                                className="w-full h-[250px] object-cover rounded-lg"\n' +
            '                            />\n' +
            '                        </motion.div>\n' +
            '                    );\n' +
            '                })}\n' +
            '            </div>\n' +
            '\n' +
            '            <AnimatePresence>\n' +
            '                {selectedImage && (\n' +
            '                    <motion.div\n' +
            '                        className="fixed inset-0 z-[999999999] bg-black/50 dark:bg-black/70 flex items-center justify-center"\n' +
            '                        onClick={handleClose}\n' +
            '                        initial={{opacity: 0}}\n' +
            '                        animate={{opacity: 1}}\n' +
            '                        exit={{opacity: 0}}\n' +
            '                    >\n' +
            '                        <motion.div\n' +
            '                            className="bg-white dark:bg-slate-800 rounded-lg w-[95%] md:w-[80%] 1024px:w-[50%] p-5"\n' +
            '                            initial={{opacity: 0, scale: 0.5}}\n' +
            '                            animate={{opacity: 1, scale: 1}}\n' +
            '                            exit={{opacity: 0, scale: 0.5}}\n' +
            '                            transition={{duration: 0.3, type: "spring", stiffness: 400, damping: 22}}\n' +
            '                        >\n' +
            '                            <motion.img\n' +
            '                                src={selectedImage.src}\n' +
            '                                alt={selectedImage.title}\n' +
            '                                className="w-full h-[400px] object-cover rounded-lg"\n' +
            '                            />\n' +
            '                            <h3 className="mt-5 dark:text-[#d2e5f5] text-2xl font-semibold">{selectedImage.title}</h3>\n' +
            '                            <p className="text-gray-700 dark:text-[#d2e5f5]/70 mt-2">{selectedImage.description}</p>\n' +
            '                        </motion.div>\n' +
            '                    </motion.div>\n' +
            '                )}\n' +
            '            </AnimatePresence>\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;\n'
    },
    {
        id: 'data_component',
        displayText: 'Data.js',
        language: 'js',
        code: 'export const CardData = [\n' +
            '        {\n' +
            '            id: 1,\n' +
            '            title: "Lone Tree in Open Field",\n' +
            '            description: "A solitary tree stands tall in the middle of a serene golden field under a vast sky, evoking peace and solitude.",\n' +
            '            src: "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?t=st=1747144481~exp=1747148081~hmac=b62717149dc4033e44b12015a3742441f5584f3b92f4d8c2fc2315708898a6b6&w=1380",\n' +
            '        },\n' +
            '        {\n' +
            '            id: 2,\n' +
            '            title: "Lake and Snow-Capped Mountains",\n' +
            '            description: "A breathtaking view of a still lake surrounded by bare trees, with snow-covered peaks rising in the distance beneath a cloudy sky.",\n' +
            '            src: "https://img.freepik.com/free-photo/view-old-tree-lake-with-snow-covered-mountains-cloudy-day_181624-28954.jpg?t=st=1747144811~exp=1747148411~hmac=c9e9c138fa35442c1e9cad40c478a9cd684ac10d2866b6cc2d21f9aebc35cb12&w=1380",\n' +
            '        },\n' +
            '        {\n' +
            '            id: 3,\n' +
            '            title: "Wild Deer in Natural Habitat",\n' +
            '            description: "A close-up shot of a wild deer in a lush, green forest area, capturing its alert and graceful stance in the wilderness.",\n' +
            '            src: "https://img.freepik.com/free-photo/wild-deer-nature_23-2151474244.jpg?t=st=1747144861~exp=1747148461~hmac=d7ecbf2ff986150e1a7dd2289195289e128a2977aab60f821f8943b9de7b6f3a&w=1380",\n' +
            '        },\n' +
            '        {\n' +
            '            id: 4,\n' +
            '            title: "Dense Forest Landscape",\n' +
            '            description: "A misty forest with tall pine trees and soft undergrowth, offering a calming atmosphere and a glimpse into untouched nature.",\n' +
            '            src: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?t=st=1747145983~exp=1747149583~hmac=7d6f2c8a9cd920a30abc2b1229da1ce099135eea08dc26d22ccfb61e4832105d&w=1380",\n' +
            '        },\n' +
            '    ];'
    },
]