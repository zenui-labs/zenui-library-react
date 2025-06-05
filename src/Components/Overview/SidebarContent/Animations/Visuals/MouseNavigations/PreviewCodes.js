export const TabNavigationExampleCodes = [
    {
        id: "main-codes",
        displayText: "TabNavigation.jsx",
        language: "jsx",
        code: 'import React, {useRef, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion} from "framer-motion";\n' +
            '\n' +
            '// data \n' +
            'import tabsData from "./Data.js"\n' +
            '\n' +
            'const TabNavigation = () => {\n' +
            '    const [activeTab, setActiveTab] = useState(0);\n' +
            '    const [scrollX, setScrollX] = useState(0);\n' +
            '    const scrollContainerRef = useRef(null);\n' +
            '\n' +
            '    const handleWheel = (e) => {\n' +
            '        if (!scrollContainerRef.current) return;\n' +
            '\n' +
            '        e.preventDefault();\n' +
            '        const container = scrollContainerRef.current;\n' +
            '        const maxScroll = container.scrollWidth - container.clientWidth;\n' +
            '\n' +
            '        const deltaX = e.deltaX !== 0 ? e.deltaX : e.deltaY;\n' +
            '        const newScrollX = Math.max(0, Math.min(maxScroll, scrollX + deltaX));\n' +
            '\n' +
            '        setScrollX(newScrollX);\n' +
            '        container.scrollLeft = newScrollX;\n' +
            '    };\n' +
            '\n' +
            '    const scrollToTab = (tabIndex) => {\n' +
            '        if (!scrollContainerRef.current) return;\n' +
            '\n' +
            '        const container = scrollContainerRef.current;\n' +
            '        const tabElement = container.children[tabIndex];\n' +
            '\n' +
            '        if (tabElement) {\n' +
            '            const containerWidth = container.clientWidth;\n' +
            '            const tabLeft = tabElement.offsetLeft;\n' +
            '            const tabWidth = tabElement.offsetWidth;\n' +
            '\n' +
            '            const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);\n' +
            '            const maxScroll = container.scrollWidth - container.clientWidth;\n' +
            '            const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));\n' +
            '\n' +
            '            setScrollX(clampedScroll);\n' +
            '            container.scrollTo({\n' +
            '                left: clampedScroll,\n' +
            '                behavior: "smooth"\n' +
            '            });\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    const handleTabClick = (index) => {\n' +
            '        setActiveTab(index);\n' +
            '        scrollToTab(index);\n' +
            '    };\n' +
            '\n' +
            '    return (\n' +
            '        <div className="max-w-[300px] sm:max-w-[550px] md:max-w-[400px] lg:max-w-[500px] overflow-hidden">\n' +
            '            <div className="relative bg-[#0FABCA] rounded-[8px]">\n' +
            '                <motion.div\n' +
            '                    ref={scrollContainerRef}\n' +
            '                    className="flex overflow-x-hidden scroll-smooth p-2"\n' +
            '                    onWheel={handleWheel}\n' +
            '                >\n' +
            '                    {tabsData.map((tab, index) => (\n' +
            '                        <motion.button\n' +
            '                            key={tab.id}\n' +
            '                            className={`flex-shrink-0 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-100 flex items-center ${\n' +
            '                                activeTab === index\n' +
            '                                    ? "!bg-white text-black"\n' +
            '                                    : "bg-transparent text-white"\n' +
            '                            }`}\n' +
            '                            onClick={() => handleTabClick(index)}\n' +
            '                            animate={{\n' +
            '                                backgroundColor: activeTab === index ? undefined : "transparent"\n' +
            '                            }}\n' +
            '                        >\n' +
            '                            <span className="whitespace-nowrap">{tab.label}</span>\n' +
            '                        </motion.button>\n' +
            '                    ))}\n' +
            '                </motion.div>\n' +
            '            </div>\n' +
            '            <AnimatePresence mode="wait">\n' +
            '                <motion.div\n' +
            '                    key={activeTab}\n' +
            '                    className="px-8 py-12 flex items-start justify-center"\n' +
            '                    initial={{opacity: 0, x: 50, scale: 0.95}}\n' +
            '                    animate={{opacity: 1, x: 0, scale: 1}}\n' +
            '                    exit={{opacity: 0, x: -50, scale: 0.95}}\n' +
            '                    transition={{\n' +
            '                        duration: 0.4,\n' +
            '                        ease: "easeInOut"\n' +
            '                    }}\n' +
            '                >\n' +
            '                    <div className="text-center">\n' +
            '                        <motion.div\n' +
            '                            className="text-6xl mb-4"\n' +
            '                            initial={{scale: 0, rotate: -180}}\n' +
            '                            animate={{scale: 1, rotate: 0}}\n' +
            '                            transition={{delay: 0.1, type: "spring", stiffness: 200}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].icon}\n' +
            '                        </motion.div>\n' +
            '                        <motion.h2\n' +
            '                            className="text-3xl font-bold text-gray-800 mb-6"\n' +
            '                            initial={{opacity: 0, y: 20}}\n' +
            '                            animate={{opacity: 1, y: 0}}\n' +
            '                            transition={{delay: 0.2}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].label}\n' +
            '                        </motion.h2>\n' +
            '                        <motion.p\n' +
            '                            className="text-gray-600 text-lg leading-relaxed"\n' +
            '                            initial={{opacity: 0, y: 20}}\n' +
            '                            animate={{opacity: 1, y: 0}}\n' +
            '                            transition={{delay: 0.3}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].content}\n' +
            '                        </motion.p>\n' +
            '                    </div>\n' +
            '                </motion.div>\n' +
            '            </AnimatePresence>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default TabNavigation;'
    },
    {
        id: "data",
        displayText: "Data.js",
        language: "js",
        code: '    const tabsData = [\n' +
            '        {\n' +
            '            id: 0,\n' +
            '            label: \'Dashboard\',\n' +
            '            icon: \'📊\',\n' +
            '            content: \'Welcome to your comprehensive dashboard with real-time analytics and insights.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 1,\n' +
            '            label: \'Analytics\',\n' +
            '            icon: \'📈\',\n' +
            '            content: \'Deep dive into your data with advanced analytics and reporting tools.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 2,\n' +
            '            label: \'Projects\',\n' +
            '            icon: \'📋\',\n' +
            '            content: \'Manage all your projects efficiently with our project management suite.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 3,\n' +
            '            label: \'Team Members\',\n' +
            '            icon: \'👥\',\n' +
            '            content: \'Collaborate with your team and manage member permissions and roles.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 4,\n' +
            '            label: \'Settings\',\n' +
            '            icon: \'⚙️\',\n' +
            '            content: \'Customize your workspace and configure application preferences.\'\n' +
            '        },\n' +
            '        {id: 5, label: \'Reports\', icon: \'📄\', content: \'Generate detailed reports and export data for presentations.\'},\n' +
            '        {\n' +
            '            id: 6,\n' +
            '            label: \'Calendar\',\n' +
            '            icon: \'📅\',\n' +
            '            content: \'Schedule meetings and manage your time with our integrated calendar.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 7,\n' +
            '            label: \'Messages\',\n' +
            '            icon: \'💬\',\n' +
            '            content: \'Stay connected with team communication and messaging features.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 8,\n' +
            '            label: \'Files\',\n' +
            '            icon: \'📁\',\n' +
            '            content: \'Organize and share files with version control and collaboration tools.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 9,\n' +
            '            label: \'Notifications\',\n' +
            '            icon: \'🔔\',\n' +
            '            content: \'Manage your notifications and stay updated with important alerts.\'\n' +
            '        },\n' +
            '        {\n' +
            '            id: 10,\n' +
            '            label: \'Integrations\',\n' +
            '            icon: \'🔗\',\n' +
            '            content: \'Connect with third-party services and extend functionality.\'\n' +
            '        },\n' +
            '        {id: 11, label: \'Security\', icon: \'🔒\', content: \'Configure security settings and manage access controls.\'},\n' +
            '        {id: 12, label: \'Billing\', icon: \'💳\', content: \'Manage your subscription and billing information.\'},\n' +
            '        {id: 13, label: \'Support\', icon: \'🎧\', content: \'Get help and access our comprehensive support resources.\'},\n' +
            '        {id: 14, label: \'API Docs\', icon: \'📚\', content: \'Explore our API documentation and integration guides.\'},\n' +
            '        {\n' +
            '            id: 15,\n' +
            '            label: \'Webhooks\',\n' +
            '            icon: \'🔄\',\n' +
            '            content: \'Set up and manage webhooks for real-time data synchronization.\'\n' +
            '        }\n' +
            '    ];'
    },
]

export const TabNavigationWithDragExampleCodes = [
    {
        id: "main-codes",
        displayText: "TabNavigationWithDrag.jsx",
        language: "jsx",
        code: 'import React, {useRef, useState} from "react";\n' +
            '\n' +
            '// framer motion\n' +
            'import {AnimatePresence, motion, useDragControls} from "framer-motion";\n' +
            '\n' +
            '// data\n' +
            'import tabsData from "./Data.js";\n' +
            '\n' +
            'const TabNavigationWithDrag = () => {\n' +
            '    const [activeTab, setActiveTab] = useState(0);\n' +
            '    const [scrollX, setScrollX] = useState(0);\n' +
            '    const scrollContainerRef = useRef(null);\n' +
            '    const [isDragging, setIsDragging] = useState(false);\n' +
            '    const dragControls = useDragControls();\n' +
            '\n' +
            '    const handleDrag = (event, info) => {\n' +
            '        if (!scrollContainerRef.current) return;\n' +
            '\n' +
            '        const container = scrollContainerRef.current;\n' +
            '        const maxScroll = container.scrollWidth - container.clientWidth;\n' +
            '        const newScrollX = Math.max(0, Math.min(maxScroll, scrollX - info.delta.x));\n' +
            '\n' +
            '        setScrollX(newScrollX);\n' +
            '        container.scrollLeft = newScrollX;\n' +
            '    };\n' +
            '\n' +
            '    const scrollToTab = (tabIndex) => {\n' +
            '        if (!scrollContainerRef.current) return;\n' +
            '\n' +
            '        const container = scrollContainerRef.current;\n' +
            '        const tabElement = container.children[tabIndex];\n' +
            '\n' +
            '        if (tabElement) {\n' +
            '            const containerWidth = container.clientWidth;\n' +
            '            const tabLeft = tabElement.offsetLeft;\n' +
            '            const tabWidth = tabElement.offsetWidth;\n' +
            '\n' +
            '            const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);\n' +
            '            const maxScroll = container.scrollWidth - container.clientWidth;\n' +
            '            const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));\n' +
            '\n' +
            '            setScrollX(clampedScroll);\n' +
            '            container.scrollTo({\n' +
            '                left: clampedScroll,\n' +
            '                behavior: "smooth"\n' +
            '            });\n' +
            '        }\n' +
            '    };\n' +
            '\n' +
            '    const handleDragStart = () => {\n' +
            '        setIsDragging(true);\n' +
            '    };\n' +
            '\n' +
            '    const handleDragEnd = () => {\n' +
            '        setIsDragging(false);\n' +
            '    };\n' +
            '\n' +
            '    const handleTabClick = (index) => {\n' +
            '        setActiveTab(index);\n' +
            '        scrollToTab(index);\n' +
            '    };\n' +
            '\n' +
            '    return (\n' +
            '        <div className="max-w-[300px] sm:max-w-[550px] md:max-w-[400px] lg:max-w-[500px] overflow-hidden">\n' +
            '            <div className="relative bg-[#0FABCA] rounded-[8px] cursor-grab">\n' +
            '                <motion.div\n' +
            '                    ref={scrollContainerRef}\n' +
            '                    className="flex overflow-x-hidden scroll-smooth p-2"\n' +
            '                    drag="x"\n' +
            '                    dragControls={dragControls}\n' +
            '                    onDragStart={handleDragStart}\n' +
            '                    onDragEnd={handleDragEnd}\n' +
            '                    onDrag={handleDrag}\n' +
            '                    dragConstraints={{left: 0, right: 0}}\n' +
            '                    style={{cursor: isDragging ? "grabbing" : "grab"}}\n' +
            '                >\n' +
            '                    {tabsData.map((tab, index) => (\n' +
            '                        <motion.button\n' +
            '                            key={tab.id}\n' +
            '                            className={`flex-shrink-0 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-100 flex items-center ${\n' +
            '                                activeTab === index\n' +
            '                                    ? "!bg-white text-black"\n' +
            '                                    : "bg-transparent text-white"\n' +
            '                            }`}\n' +
            '                            onClick={() => handleTabClick(index)}\n' +
            '                            animate={{\n' +
            '                                backgroundColor: activeTab === index ? undefined : "transparent"\n' +
            '                            }}\n' +
            '                        >\n' +
            '                            <span className="whitespace-nowrap">{tab.label}</span>\n' +
            '                        </motion.button>\n' +
            '                    ))}\n' +
            '                </motion.div>\n' +
            '            </div>\n' +
            '            <AnimatePresence mode="wait">\n' +
            '                <motion.div\n' +
            '                    key={activeTab}\n' +
            '                    className="px-8 py-12 flex items-start justify-center"\n' +
            '                    initial={{opacity: 0, x: 50, scale: 0.95}}\n' +
            '                    animate={{opacity: 1, x: 0, scale: 1}}\n' +
            '                    exit={{opacity: 0, x: -50, scale: 0.95}}\n' +
            '                    transition={{\n' +
            '                        duration: 0.4,\n' +
            '                        ease: "easeInOut"\n' +
            '                    }}\n' +
            '                >\n' +
            '                    <div className="text-center">\n' +
            '                        <motion.div\n' +
            '                            className="text-6xl mb-4"\n' +
            '                            initial={{scale: 0, rotate: -180}}\n' +
            '                            animate={{scale: 1, rotate: 0}}\n' +
            '                            transition={{delay: 0.1, type: "spring", stiffness: 200}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].icon}\n' +
            '                        </motion.div>\n' +
            '                        <motion.h2\n' +
            '                            className="text-3xl font-bold text-gray-800 mb-6"\n' +
            '                            initial={{opacity: 0, y: 20}}\n' +
            '                            animate={{opacity: 1, y: 0}}\n' +
            '                            transition={{delay: 0.2}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].label}\n' +
            '                        </motion.h2>\n' +
            '                        <motion.p\n' +
            '                            className="text-gray-600 text-lg leading-relaxed"\n' +
            '                            initial={{opacity: 0, y: 20}}\n' +
            '                            animate={{opacity: 1, y: 0}}\n' +
            '                            transition={{delay: 0.3}}\n' +
            '                        >\n' +
            '                            {tabsData[activeTab].content}\n' +
            '                        </motion.p>\n' +
            '                    </div>\n' +
            '                </motion.div>\n' +
            '            </AnimatePresence>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default TabNavigationWithDrag;'
    },
    {
        id: "data",
        displayText: "Data.js",
        language: "js",
        code: '    const tabsData = [\n' +
            '        {\n' +
            '            id: 0,\n' +
            '            label: "Dashboard",\n' +
            '            icon: "📊",\n' +
            '            content: "Welcome to your comprehensive dashboard with real-time analytics and insights."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 1,\n' +
            '            label: "Analytics",\n' +
            '            icon: "📈",\n' +
            '            content: "Deep dive into your data with advanced analytics and reporting tools."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 2,\n' +
            '            label: "Projects",\n' +
            '            icon: "📋",\n' +
            '            content: "Manage all your projects efficiently with our project management suite."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 3,\n' +
            '            label: "Team Members",\n' +
            '            icon: "👥",\n' +
            '            content: "Collaborate with your team and manage member permissions and roles."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 4,\n' +
            '            label: "Settings",\n' +
            '            icon: "⚙️",\n' +
            '            content: "Customize your workspace and configure application preferences."\n' +
            '        },\n' +
            '        {id: 5, label: "Reports", icon: "📄", content: "Generate detailed reports and export data for presentations."},\n' +
            '        {\n' +
            '            id: 6,\n' +
            '            label: "Calendar",\n' +
            '            icon: "📅",\n' +
            '            content: "Schedule meetings and manage your time with our integrated calendar."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 7,\n' +
            '            label: "Messages",\n' +
            '            icon: "💬",\n' +
            '            content: "Stay connected with team communication and messaging features."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 8,\n' +
            '            label: "Files",\n' +
            '            icon: "📁",\n' +
            '            content: "Organize and share files with version control and collaboration tools."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 9,\n' +
            '            label: "Notifications",\n' +
            '            icon: "🔔",\n' +
            '            content: "Manage your notifications and stay updated with important alerts."\n' +
            '        },\n' +
            '        {\n' +
            '            id: 10,\n' +
            '            label: "Integrations",\n' +
            '            icon: "🔗",\n' +
            '            content: "Connect with third-party services and extend functionality."\n' +
            '        },\n' +
            '        {id: 11, label: "Security", icon: "🔒", content: "Configure security settings and manage access controls."},\n' +
            '        {id: 12, label: "Billing", icon: "💳", content: "Manage your subscription and billing information."},\n' +
            '        {id: 13, label: "Support", icon: "🎧", content: "Get help and access our comprehensive support resources."},\n' +
            '        {id: 14, label: "API Docs", icon: "📚", content: "Explore our API documentation and integration guides."},\n' +
            '        {\n' +
            '            id: 15,\n' +
            '            label: "Webhooks",\n' +
            '            icon: "🔄",\n' +
            '            content: "Set up and manage webhooks for real-time data synchronization."\n' +
            '        }\n' +
            '    ];'
    },
]