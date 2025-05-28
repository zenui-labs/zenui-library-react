import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import SelectInput from "./SelectInput.jsx";
import {semanticElements} from "@utils/HTMLTagsDetailsData.js";
import AnimatedText from "./AnimatedText.jsx"
import AnimatedSection from "./AnimatedSection.jsx"

const Index = () => {
    const [selectedElement, setSelectedElement] = useState('article');
    const [key, setKey] = useState(0);

    const handleSelectChange = (data) => {
        setSelectedElement(data);
        setKey(prev => prev + 1);
    };

    const renderTextWithCodeTags = (text, delay) => {
        const parts = text.split(/(<\/?code>)/);

        return parts.map((part, index) => {
            if (part === '<code>') {
                return (
                    <motion.span
                        key={index}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: delay + index * 0.02}}
                        className="bg-gray-100 text-gray-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 mr-1 px-1.5 py-0.5 rounded border border-gray-200 font-mono text-sm"
                    >
                        {parts[index + 1]}
                    </motion.span>
                );
            }
            if (part === '</code>') return null;
            if (!part.includes('<') && !part.includes('>')) {
                return <AnimatedText key={index} text={part} delay={delay}/>;
            }
            return null;
        }).filter(Boolean);
    };

    return (
        <section
            className="px-8 640px:px-12 relative 640px:pl-12 mt-8 mb-9 max-w-[1700px] mx-auto">

            <div className='flex items-start flex-col 1024px:flex-row justify-between gap-12 1024px:gap-6'>
                <div className="w-full 1024px:w-1/2">
                    <div>
                        <h1 className='text-[1.9rem] 425px:text-[2.5rem] 1024px:text-[3rem] leading-[40px] 425px:leading-[60px] font-[600] bg-clip-text mb-1 text-transparent bg-gradient-to-r from-[#0FABCA] to-[#CD00F1]'>Semantic
                            TagMaster</h1>
                        <p className='text-[1rem] dark:text-darkSubTextColor text-text w-full 425px:w-[90%]'>Understanding
                            when and how to use
                            semantic
                            HTML elements not only improves the usability and accessibility of your site but also aligns
                            your content for optimal performance in search engine rankings.</p>
                    </div>

                    <div className="mt-4 w-full">
                        <div className="space-y-6">
                            <SelectInput
                                onChange={handleSelectChange}
                                value={selectedElement}
                                options={Object.keys(semanticElements)}
                                label="Select Tag"
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={key}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    className="space-y-6"
                                >
                                    <AnimatedSection delay={0.1}>
                                        <p className='dark:text-darkSubTextColor text-gray-800'>{renderTextWithCodeTags(semanticElements[selectedElement].description, 0.1)}</p>
                                    </AnimatedSection>

                                    <AnimatedSection delay={3.5}>
                                        <h3 className="text-base font-semibold dark:text-darkTextColor text-gray-900 mb-2">✅
                                            Best
                                            Practices:</h3>
                                        <ul className="list-disc pl-10 space-y-2">
                                            {semanticElements[selectedElement].bestPractice.map((text, index) => (
                                                <li className='dark:text-darkSubTextColor text-gray-800' key={index}>
                                                    {renderTextWithCodeTags(text, 3.8 + index * 0.1)}
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimatedSection>

                                    <AnimatedSection delay={4.5}>
                                        <h3 className="text-base font-semibold dark:text-darkTextColor text-gray-900 mb-2">⚠️
                                            Common
                                            Mistakes:</h3>
                                        <ul className="list-disc pl-10 space-y-2">
                                            {semanticElements[selectedElement].commonMistake.map((text, index) => (
                                                <li className='dark:text-darkSubTextColor text-gray-800' key={index}>
                                                    {renderTextWithCodeTags(text, 4.3 + index * 0.1)}
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimatedSection>

                                    <AnimatedSection delay={5}>
                                        <h3 className="text-base font-semibold dark:text-darkTextColor text-gray-900 mb-2">🔍
                                            SEO Benefits:</h3>
                                        <ul className="list-disc pl-10 space-y-2">
                                            {semanticElements[selectedElement].seoBenefits.map((text, index) => (
                                                <li className='dark:text-darkSubTextColor text-gray-800' key={index}>
                                                    {renderTextWithCodeTags(text, 5.3 + index * 0.1)}
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimatedSection>

                                    <AnimatedSection delay={6}>
                                        <div
                                            className="border dark:bg-yellow-500/10 dark:border-yellow-800/50 dark:border-l-yellow-700 dark:text-yellow-600 bg-yellow-50/80 text-yellow-800 border-gray-200 border-l-yellow-400 border-l-4 rounded-lg p-4">
                                            <p className="text-base font-semibold">Accessibility Benefits:</p>
                                            <p className='mt-1.5'>
                                                <AnimatedText
                                                    text={semanticElements[selectedElement].accessibilityBenefits}
                                                    delay={6.3}
                                                />
                                            </p>
                                        </div>
                                    </AnimatedSection>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

                <div className="w-full 1024px:w-[40%] sticky top-20 right-0">
                    <h3 className="text-base font-semibold dark:text-darkTextColor text-gray-800 mb-2">Example Code</h3>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={key}
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -20}}
                        >
                            <SyntaxHighlighter
                                language="jsx"
                                style={dracula}
                                showLineNumbers
                                customStyle={{
                                    margin: 0,
                                    borderRadius: 8,
                                    fontSize: "14px",
                                    maxHeight: "400px",
                                }}
                                className='dark:border dark:border-slate-700'
                            >
                                {semanticElements[selectedElement].example}
                            </SyntaxHighlighter>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <p className='text-center mt-10 dark:text-red-500 text-red-600 text-[0.9rem]'>That doesn't mean we can't use
                Div.<br/> We often have to use Div, but that doesn't mean we'll build the
                entire website with Div.</p>

        </section>
    );
};

export default Index;