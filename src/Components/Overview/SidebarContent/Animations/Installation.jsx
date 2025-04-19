import React, {useState} from 'react';
import BlocksFooter from "../../../../Shared/Block/BlocksFooter.jsx";
import {Helmet} from "react-helmet";
import {GoCopy} from "react-icons/go";
import {IoCheckmarkDone} from "react-icons/io5";

const Installation = () => {
    const [copiedText, setCopiedText] = useState('');

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => {
            setCopiedText('');
        }, 2000);
    }

    return (
        <div className='w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
            <h1 className='text-[2rem] 425px:text-[2.7rem] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-[#3B9DF8] to-[#1A1674]'>Animation
                Installation</h1>
            <div className='mt-3 w-full 1024px:w-[80%]'>
                <p className='text-[1rem] text-gray-900 dark:text-darkSubTextColor'>
                    Welcome to <b>ZenUI v2.3</b> – now with smooth, built-in animations powered by Framer Motion! 🎉
                    <br/>
                    <br/>
                    In this version, we've added animation support to several components. These animations are handled
                    internally using <a href='https://motion.dev/docs/react-quick-start' target='_blank'
                                        className='text-blue-600 font-medium hover:underline'>Framer Motion</a>, giving
                    you a more polished and delightful user experience out of the box. You don’t need to manually write
                    animation logic – just use the components, and they’ll animate beautifully by default.
                </p>
            </div>

            <div className='w-full 1024px:w-[80%] mt-6'>
                <h3 className='text-[1.5rem] font-[600] dark:text-darkTextColor'>Install Framer-Motion</h3>
                <p className='mt-3 text-[1rem] text-gray-900 dark:text-darkSubTextColor'>
                    Framer Motion is a popular and production-ready animation library for React, known for its
                    performance, ease of use, and powerful animation API.
                    We’ve chosen it for ZenUI to give you fluid motion and intuitive UI transitions without the need to
                    write custom animation logic.
                </p>
            </div>

            <div className='mt-3 w-full 1024px:w-[80%]'>
                <span className='text-[0.9rem]'>by npm:</span>
                <div className='border border-border relative rounded-[8px] mt-2 bg-gray-50 px-4 py-2'>
                    <code>npm install framer-motion</code>

                    {
                        copiedText === 'npm install framer-motion' ? (
                            <IoCheckmarkDone className='absolute top-[50%] translate-y-[-50%] right-3 text-[1.2rem]'/>
                        ) : (
                            <GoCopy onClick={() => handleCopy('npm install framer-motion')}
                                    className='absolute cursor-pointer top-[50%] translate-y-[-50%] right-3 text-[1.1rem]'/>
                        )
                    }
                </div>
            </div>

            <div className='mt-2 w-full 1024px:w-[80%]'>
                <span className='text-[0.9rem]'>by yarn:</span>
                <div className='border border-border relative rounded-[8px] mt-2 bg-gray-50 px-4 py-2'>
                    <code>yarn add framer-motion</code>

                    {
                        copiedText === 'yarn add framer-motion' ? (
                            <IoCheckmarkDone className='absolute top-[50%] translate-y-[-50%] right-3 text-[1.2rem]'/>
                        ) : (
                            <GoCopy onClick={() => handleCopy('yarn add framer-motion')}
                                    className='absolute cursor-pointer top-[50%] translate-y-[-50%] right-3 text-[1.1rem]'/>
                        )
                    }
                </div>
            </div>

            <div className='w-full 1024px:w-[80%] mt-8'>
                <h3 className='text-[1.5rem] font-[600] dark:text-darkTextColor'>✅ That’s It — No Extra Setup!</h3>
                <p className='mt-3 text-[1rem] text-gray-900 dark:text-darkSubTextColor'>
                    There’s no additional configuration needed. Just start using the animated components directly.
                </p>
            </div>

            <div className='w-full 1024px:w-[80%]'>
                <BlocksFooter isBackButton={false} forwardUrl='/docs/resources' forwardName='resources'/>
            </div>

            <Helmet>
                <title>Animations - Installation</title>
            </Helmet>
        </div>
    );
};

export default Installation;
