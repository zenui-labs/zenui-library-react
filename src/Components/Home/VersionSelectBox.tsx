import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {LuCheck, LuChevronDown} from "react-icons/lu";

const versions = [
    {label: 'v4', url: 'https://reactui.zenui.net', current: true},
    {label: 'v3', url: 'https://v3.reactui.zenui.net'},
    {label: 'v2', url: 'https://v2.reactui.zenui.net'},
];

const VersionSelectBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (event) => !ref.current?.contains(event.target) && setIsOpen(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Select documentation version"
                className="flex h-6 items-center gap-0.5 rounded-full border border-hairline bg-raised pl-2 pr-1 font-mono text-[0.7rem] text-ink-muted transition-colors hover:text-ink"
            >
                v4
                <LuChevronDown className={`size-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -4, scale: 0.97}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: -4, scale: 0.97}}
                        transition={{duration: 0.14}}
                        className="absolute left-0 top-[calc(100%+6px)] z-50 w-[120px] rounded-xl border border-hairline bg-surface p-1 shadow-float"
                    >
                        {versions.map((version) => (
                            <a
                                key={version.label}
                                href={version.url}
                                className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[0.8rem] text-ink-muted hover:bg-raised hover:text-ink"
                            >
                                <span className="font-mono">{version.label}</span>
                                {version.current && <LuCheck className="size-3.5 text-accent-strong"/>}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VersionSelectBox;
