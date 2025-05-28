import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
 
const ZenUITools = () => {
    const [selectedImage, setSelectedImage] = useState(0);

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
        }
    ];

    const images = [
        '/keyboard-shortcut-image.svg',
        '/icons-image.svg',
        '/config-ai-image.svg',
        '/color-palette-image.svg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedImage === 3) {
                setSelectedImage(0)
            } else {
                setSelectedImage((prev) => prev + 1)
            }
        }, 2500)

        return () => {
            clearInterval(interval)
        }
    }, [selectedImage])

    return (
        <SectionWrapper>
            <SectionHead
                description={'Streamline your workflow with a versatile color palette, an extensive icon library, and a dynamic\n' +
                    '                    keyboard shortcut generator.'} title={'Useful Tools'} isSubjet={'ZenUI'}/>


            <div className='grid grid-cols-1 1024px:grid-cols-2 mt-14 gap-[50px]'>
                <div>
                    {cardData.map((card, index) => (
                        <div key={index}
                             onClick={() => setSelectedImage(index)}
                             className={`${index < cardData.length - 1 && 'border-b '} border-border dark:border-slate-700 py-3`}>
                            <div
                                className={`${index === selectedImage && 'bg-gray-50/70 dark:bg-slate-800'} hover:bg-gray-50/70 dark:hover:bg-slate-800 px-3 py-2 rounded-normal cursor-pointer`}>
                                <h6 className='text-[1.5rem] dark:text-darkTextColor font-[600]'>{card.title}</h6>
                                <p className='text-[1rem] mt-1.5 dark:text-darkSubTextColor font-[400] text-black/70'>{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className='rounded-high overflow-hidden border dark:border-slate-700 h-max shadow-[2px_1px_25px_rgba(0,0,0,0.03)] p-2'>
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={selectedImage}
                            src={images[selectedImage]}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1, transition: {duration: 0.4}}}
                            exit={{opacity: 0, scale: 0.95}}
                            alt="image"
                            className='w-full h-full rounded-normal'
                        />
                    </AnimatePresence>

                </div>
            </div>
        </SectionWrapper>
    );
};

export default ZenUITools;
