import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {BsChevronDown} from "react-icons/bs";

const itemVariants = {
    open: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: i * 0.05
        }
    }),
    closed: {
        opacity: 0,
        y: -20,
        transition: {duration: 0.15}
    }
};

export default function YaxisStaggeredExample() {
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
                className='border dark:bg-slate-900 dark:text-darkTextColor dark:border-slate-700 bg-white border-border px-6 py-2 w-full rounded-normal flex items-center gap-2 justify-between'
            >
                Menu
                <motion.div
                    variants={{
                        open: {rotate: 180},
                        closed: {rotate: 0}
                    }}
                    transition={{duration: 0.2}}
                    style={{originX: 0.55}}
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
                                    duration: 0.3,
                                    when: "beforeChildren"
                                }
                            },
                            closed: {
                                height: 0,
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    when: "afterChildren"
                                }
                            }
                        }}
                        style={{overflow: "hidden"}}
                        className="bg-white dark:bg-slate-900 rounded-normal flex mt-2 flex-col gap-1 shadow-[2px_1px_20px_rgba(0,0,0,0.03)] w-full p-2"
                    >
                        {options.map((item, index) => (
                            <motion.li
                                key={index}
                                custom={index}
                                variants={itemVariants}
                                className="text-[1rem] font-normal py-2 px-3 rounded-normal cursor-pointer hover:bg-gray-50 dark:text-darkTextColor dark:hover:bg-slate-800"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

        </div>
    );
}
