import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {BsChevronDown} from "react-icons/bs";

const itemVariants = {
    open: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {type: "spring", stiffness: 300, damping: 24}
    },
    closed: {
        opacity: 0,
        scale: 0.3,
        filter: "blur(20px)",
        transition: {duration: 0.2}
    }
};


export default function BlurStaggeredExample() {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        "Alice Johnson",
        "Michael Smith",
        "Emily Davis",
        "David Thompson",
        "Sophia Martinez",
        "James Wilson",
        "Olivia Brown",
    ];


    return (
        <div
            className='w-full 640px:w-[70%] mx-auto'
        >
            <motion.button
                whileTap={{scale: 0.97}}
                onClick={() => setIsOpen(!isOpen)}
                className='border dark:bg-slate-900 dark:border-slate-700 dark:text-darkTextColor bg-white border-border px-6 py-2 w-full rounded-normal flex items-center gap-2 justify-between'
            >
                Menu
                <motion.div
                    variants={{
                        open: {rotate: 180},
                        closed: {rotate: 0}
                    }}
                    transition={{duration: 0.2}}
                    style={{originY: 0.55}}
                >
                    <BsChevronDown/>
                </motion.div>
            </motion.button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.ul
                        key="dropdown"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: {
                                height: "auto",
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.5,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.1
                                }
                            },
                            closed: {
                                height: 0,
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                    staggerDirection: -1,
                                    staggerChildren: 0.06
                                }
                            }
                        }}
                        style={{overflow: "hidden"}}
                        className='bg-white dark:bg-slate-900 rounded-normal flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2'
                    >
                        {options.map((item, index) => (
                            <motion.li key={index} variants={itemVariants}
                                       className='text-[1rem] font-normal py-2 px-3 rounded-normal cursor-pointer hover:bg-gray-50 dark:text-darkTextColor dark:hover:bg-slate-800'>
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

        </div>
    );
}
