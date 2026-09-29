import {motion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuArrowRight, LuCalendar, LuMail, LuMessageCircle, LuPhone} from "react-icons/lu";
import {Magnetic, MagneticArea} from "./MagneticArea";

interface Channel {
    label: string;
    icon: IconType;
    href: string;
}

const channels: Channel[] = [
    {label: "Email us", icon: LuMail, href: "#email"},
    {label: "Call sales", icon: LuPhone, href: "#call"},
    {label: "Open chat", icon: LuMessageCircle, href: "#chat"},
    {label: "Book a demo", icon: LuCalendar, href: "#demo"},
];

const MagneticAreaExample = () => (
    <MagneticArea>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Talk to a real person</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
            Our support team answers in under five minutes, Monday to Saturday.
        </p>

        <div className="mt-8 flex justify-center">
            <Magnetic strength={0.3} reach={90}>
                {(offset) => (
                    <a
                        href="#start"
                        className="group inline-flex items-center rounded-full bg-gray-900 p-1.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:shadow-black/40 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        <motion.span style={offset} className="flex items-center gap-3 pl-5">
                            Start a free trial
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg] dark:bg-gray-900/10">
                                <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                            </span>
                        </motion.span>
                    </a>
                )}
            </Magnetic>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {channels.map(({label, icon: Icon, href}) => (
                <li key={label}>
                    <Magnetic strength={0.45} reach={40}>
                        {(offset) => (
                            <a
                                href={href}
                                aria-label={label}
                                title={label}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300 dark:focus-visible:ring-offset-slate-950"
                            >
                                <motion.span style={offset} className="flex">
                                    <Icon className="h-5 w-5" aria-hidden="true"/>
                                </motion.span>
                            </a>
                        )}
                    </Magnetic>
                </li>
            ))}
        </ul>
    </MagneticArea>
);

export default MagneticAreaExample;
