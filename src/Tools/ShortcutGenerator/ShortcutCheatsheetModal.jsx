import React, {useRef, useEffect, useState} from 'react';

const ShortcutCheatsheetModal = ({VALID_MODIFIERS, VALID_KEYS, isOpen, setIsOpen}) => {

    const modalRef = useRef(null)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus()
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <>
            <div className={`${
                isOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[20000000000000] dark:bg-black/60 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}>
                <div
                    ref={modalRef}
                    tabIndex={-1}
                    style={{scrollbarWidth: 'none'}}
                    className={`${
                        isOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                    } w-[90%] 1024px:w-[50%] dark:bg-slate-900 bg-[#ffffff] max-h-[90vh] overflow-y-auto rounded-lg p-6 transition-all duration-300`}
                >
                    <div className="flex justify-between items-start 640px:items-center mb-8">
                        <h2 className="text-[1.3rem] 640px:text-[1.7rem] dark:text-darkTextColor font-semibold text-gray-800">Keyboard Shortcut Cheatsheet</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 dark:text-darkSubTextColor dark:hover:text-darkTextColor hover:text-gray-700 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[1rem] dark:text-darkSubTextColor 640px:text-[1.2rem] text-gray-600 font-semibold mb-2">Valid Modifiers</h3>
                            <div className="flex flex-wrap gap-2">
                                {VALID_MODIFIERS.map((modifier) => (
                                    <span key={modifier}
                                          className="px-3 py-1.5 dark:bg-slate-800 dark:text-darkSubTextColor bg-gray-100 text-gray-600 font-medium rounded text-[0.9rem]">
                                            {modifier}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[1rem] dark:text-darkSubTextColor 640px:text-[1.2rem] text-gray-600 font-semibold mb-2 mt-10">Valid Keys</h3>
                            <div className="grid grid-cols-2 425px:grid-cols-3 640px:grid-cols-6 gap-2">
                                {VALID_KEYS.map((key) => (
                                    <span key={key}
                                          className="px-3 py-2 dark:bg-slate-800 dark:text-darkSubTextColor bg-gray-100 text-center text-gray-600 font-medium rounded text-[0.9rem]">
                      {key}
                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShortcutCheatsheetModal;
