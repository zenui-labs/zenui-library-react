import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const ZenUITools = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [expandedCard, setExpandedCard] = useState(0);

    const cardData = [
        {
            title: "ShortKey",
            duration: '700',
            url: '/shortcut-generator',
            description: "Type your custom shortcut to instantly generate a function with conditions, enabling specific logic execution when the shortcut keys are pressed. Make Simplify your workflow!"
        },
        {
            title: "Icons",
            duration: '1000',
            url: '/icons',
            description: "Explore and enjoy ZenUI Library's collection of free icons, designed for customization and easy integration. Download and use them to enhance your projects."
        },
        {
            title: "Config AI",
            duration: '1000',
            url: '/config-generator',
            description: "Config AI will provide you with a ready-to-use configuration by generating a tailwind.config.js file with custom colors, fonts, and other settings tailored to your project needs."
        },
        {
            title: "Color Palette",
            duration: '1300',
            url: '/color-palette',
            description: "Customize your color shades! Paste a color code to explore shades, view hex, RGB, and HSL codes, and copy them instantly for seamless integration into your projects."
        },
        {
            title: "Semantic TagMaster",
            duration: '1300',
            url: '/semantic-tag-master',
            description: "Semantic TagMaster is a tool that helps you generate semantic HTML tags for your projects, ensuring better accessibility and SEO optimization. Create meaningful and structured content effortlessly."
        }
    ];

    const images = [
        '/keyboard-shortcut-image.svg',
        '/icons-image.svg',
        '/config-ai-image.svg',
        '/color-palette-image.svg',
        '/semantic-tagmaster-image.svg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedImage === images.length - 1) {
                setSelectedImage(0)
            } else {
                setSelectedImage((prev) => prev + 1)
            }
        }, 2500)

        return () => {
            clearInterval(interval)
        }
    }, [selectedImage])

    useEffect(() => {
        setExpandedCard(selectedImage);
    }, [selectedImage]);

    const handleCardClick = (index) => {
        setSelectedImage(index);
        setExpandedCard(expandedCard === index ? -1 : index);
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const accordionVariants = {
        collapsed: {
            height: 0,
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98]
            }
        },
        expanded: {
            height: "auto",
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98]
            }
        }
    };

    return (
        <SectionWrapper className='mt-28'>
            <SectionHead
                description={'Streamline your workflow with a versatile color palette, an extensive icon library, and a dynamic keyboard shortcut generator.'}
                title={'Useful Tools'}
                isSubjet={'ZenUI'}
            />

            <div className='grid grid-cols-1 1024px:grid-cols-2 mt-14 gap-[50px]'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {cardData.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`${index < cardData.length - 1 && 'border-b'} border-border dark:border-slate-700 py-3`}
                        >
                            <motion.div
                                onClick={() => handleCardClick(index)}
                                className={`${index === selectedImage && 'bg-gray-50/70 dark:bg-slate-800'} hover:bg-gray-50/70 dark:hover:bg-slate-800 p-3 rounded-normal cursor-pointer transition-colors duration-200`}
                            >
                                <div className="flex justify-between items-center">
                                    <motion.h6
                                        className='text-[1.3rem] 640px:text-[1.5rem] dark:text-darkTextColor font-[600]'
                                        layout
                                    >
                                        {card.title}
                                    </motion.h6>
                                </div>

                                <AnimatePresence mode="wait">
                                    {expandedCard === index && (
                                        <motion.div
                                            key={`expanded-${index}`}
                                            variants={accordionVariants}
                                            initial="collapsed"
                                            animate="expanded"
                                            exit="collapsed"
                                            className="overflow-hidden"
                                        >
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        delay: 0.1,
                                                        duration: 0.3
                                                    }
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -10,
                                                    transition: {
                                                        duration: 0.2
                                                    }
                                                }}
                                                className='text-[1rem] mt-2 dark:text-darkSubTextColor font-[400] text-black/70'
                                            >
                                                {card.description}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.6,
                            delay: 0.3,
                            ease: "easeOut"
                        }
                    }}
                    className='rounded-high overflow-hidden border dark:bg-slate-800 dark:border-slate-700 h-max shadow-[2px_1px_25px_rgba(0,0,0,0.03)] p-2'
                >
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={selectedImage}
                            src={images[selectedImage]}
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                transition: {
                                    duration: 0.3
                                }
                            }}
                            alt="image"
                            className='w-full h-full max-h-[500px] rounded-normal'
                        />
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};

export default ZenUITools;
