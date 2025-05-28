import {useEffect, useState, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import useZenuiStore from "@store";
import {FaReact} from "react-icons/fa";
import {BiLogoTailwindCss} from "react-icons/bi";
import {TbBrandFramerMotion, TbBrandNextjs} from "react-icons/tb";
import {IoChevronForward} from "react-icons/io5";

const title = ["Open-Source", "UI Components", "& Templates", "Library"];
const text =
    "ZenUI Library is a Tailwind CSS components library for any needs. Comes with UI examples & blocks, templates, Icons, Color Palette and more.";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.35,
        },
    },
};

const textVariants = {
    hidden: {opacity: 0, scale: 1.2, filter: "blur(8px)"},
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {duration: 0.6, ease: "easeOut"},
    },
};

const paragraphContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 1.3,
            staggerChildren: 0.04,
        },
    },
};

const wordVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.4, ease: "easeOut"},
    },
};

const buttonContainerVariants = {
    hidden: {},
    visible: {
        transition: {delayChildren: 2.7},
    },
};

const buttonVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {duration: 0.5, ease: "easeOut"},
    },
};

const iconContainer = {
    hidden: {},
    visible: {
        transition: {delayChildren: 3, staggerChildren: 0.25},
    },
};

const iconItem = {
    hidden: {opacity: 0, scale: 0.5},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {type: "spring", stiffness: 400, damping: 10},
    },
};

const fadeVariant = {
    hidden: {opacity: 0, y: -10},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: 4.2,
            type: "spring",
            stiffness: 400,
            damping: 10,
            ease: "easeOut",
        },
    },
};

const Hero = () => {
    const [darkModeWithDelay, setDarkModeWithDelay] = useState(false);
    const [height, setHeight] = useState("500px");
    const navigate = useNavigate();
    const {theme} = useZenuiStore();

    const words = useMemo(() => text.split(" "), []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDarkModeWithDelay(theme === "dark");
        }, 400);
        return () => clearTimeout(timer);
    }, [theme]);

    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerWidth < 640 ? "200px" : "500px");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const blurExpand = {
        initial: {height: "0px", opacity: 0},
        animate: {
            height,
            opacity: 1,
            transition: {
                delay: 4.8,
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    return (
        <main
            className={`${
                darkModeWithDelay
                    ? "bg-[linear-gradient(to_right,#212121_1px,transparent_1px),linear-gradient(to_bottom,#212121_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,#e3e3e32e_1px,transparent_1px),linear-gradient(to_bottom,#e3e3e32e_1px,transparent_1px)]"
            } pt-16 640px:pt-0 w-full min-h-screen 1024px:min-h-[calc(100vh-50px)] flex items-center justify-center bg-[size:30px_30px] relative`}
        >
            <motion.div
                variants={blurExpand}
                initial="initial"
                animate="animate"
                className={`absolute rotate-[-45deg] 640px:rotate-[-60deg] -top-16 640px:-top-[220px] left-0 blur-[43px] 640px:blur-[45px] w-[60px] h-[200px] 640px:h-[500px] rounded-full bg-gradient-to-b from-brandColor/60 to-brandColor/20 dark:from-white/90 dark:to-white/10`}
            ></motion.div>
            <motion.div
                variants={blurExpand}
                initial="initial"
                animate="animate"
                className={`absolute rotate-[45deg] 640px:rotate-[60deg] -top-16 640px:-top-[220px] right-0 blur-[43px] 640px:blur-[45px] w-[60px] h-[200px] 640px:h-[500px] rounded-full bg-gradient-to-b from-brandColor/60 to-brandColor/20 dark:from-white/90 dark:to-white/10`}
            ></motion.div>

            <div className="px-8 max-w-[1700px] mx-auto">
                <div className="1024px:w-[80%] 1360px:w-[65%] text-center mx-auto w-full">
                    <motion.button
                        variants={fadeVariant}
                        initial="hidden"
                        animate="visible"
                        className="py-1.5 pl-5 cursor-text dark:border-slate-500 dark:text-darkTextColor backdrop-blur-md pr-6 text-[0.8rem] 640px:text-[0.9rem] border mb-4 border-border rounded-full relative z-10"
                    >
                        ✨ Introducing ZenUI v3
                    </motion.button>

                    <motion.h1
                        className="text-[2.5rem] font-bold 640px:text-[3.2rem] 1024px:text-[4rem] leading-[3.2rem] 640px:leading-[4rem] 1024px:leading-[5rem] transition-all duration-700 dark:text-darkTextColor"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {title.map((word, i) => (
                            <motion.span key={i} variants={textVariants} className="inline-block mr-3">
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        className="dark:text-darkSubTextColor text-gray-500 w-full 640px:w-[90%] mt-4 640px:mt-3 1024px:w-[85%] mx-auto font-[400] text-[1rem] 1024px:text-[1.1rem]"
                        variants={paragraphContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {words.map((word, i) => (
                            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25ch]">
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    <motion.div
                        className="flex items-center flex-col 640px:flex-row gap-3 justify-center 425px:gap-6 mt-10 640px:mt-12"
                        variants={buttonContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.button
                            variants={buttonVariants}
                            className="py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-high hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group"
                            onClick={() => navigate("/components/all-components")}
                        >
                            Browse Components
                            <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>
                        </motion.button>

                        <motion.button
                            variants={buttonVariants}
                            className="py-[11px] px-8 z-10 border-2 border-[#0FABCA] text-[#0FABCA] rounded-high transition-all flex items-center justify-center gap-3 duration-300 group"
                            onClick={() => navigate("/templates")}
                        >
                            Browse Templates
                            <IoChevronForward className="group-hover:ml-1 transition-all duration-200"/>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-5 justify-center mt-6"
                        variants={iconContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            {Icon: FaReact, href: "https://react.dev/learn"},
                            {Icon: BiLogoTailwindCss, href: "https://v3.tailwindcss.com/docs/installation"},
                            {Icon: TbBrandFramerMotion, href: "https://motion.dev/docs"},
                            {Icon: TbBrandNextjs, href: "https://nextjs.org/docs"},
                        ].map(({Icon, href}, i) => (
                            <motion.a key={i} href={href} target="_blank" rel="noreferrer" variants={iconItem}>
                                <Icon
                                    className="text-[1.8rem] hover:scale-[1.2] transition-all duration-300 dark:text-darkSubTextColor text-gray-500"/>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default Hero;

