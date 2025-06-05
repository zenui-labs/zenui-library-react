import React, {useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const TabNavigationExample = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const scrollContainerRef = useRef(null);

    const tabs = [
        {
            id: 0,
            label: 'Dashboard',
            icon: '📊',
            content: 'Welcome to your comprehensive dashboard with real-time analytics and insights.'
        },
        {
            id: 1,
            label: 'Analytics',
            icon: '📈',
            content: 'Deep dive into your data with advanced analytics and reporting tools.'
        },
        {
            id: 2,
            label: 'Projects',
            icon: '📋',
            content: 'Manage all your projects efficiently with our project management suite.'
        },
        {
            id: 3,
            label: 'Team Members',
            icon: '👥',
            content: 'Collaborate with your team and manage member permissions and roles.'
        },
        {
            id: 4,
            label: 'Settings',
            icon: '⚙️',
            content: 'Customize your workspace and configure application preferences.'
        },
        {id: 5, label: 'Reports', icon: '📄', content: 'Generate detailed reports and export data for presentations.'},
        {
            id: 6,
            label: 'Calendar',
            icon: '📅',
            content: 'Schedule meetings and manage your time with our integrated calendar.'
        },
        {
            id: 7,
            label: 'Messages',
            icon: '💬',
            content: 'Stay connected with team communication and messaging features.'
        },
        {
            id: 8,
            label: 'Files',
            icon: '📁',
            content: 'Organize and share files with version control and collaboration tools.'
        },
        {
            id: 9,
            label: 'Notifications',
            icon: '🔔',
            content: 'Manage your notifications and stay updated with important alerts.'
        },
        {
            id: 10,
            label: 'Integrations',
            icon: '🔗',
            content: 'Connect with third-party services and extend functionality.'
        },
        {id: 11, label: 'Security', icon: '🔒', content: 'Configure security settings and manage access controls.'},
        {id: 12, label: 'Billing', icon: '💳', content: 'Manage your subscription and billing information.'},
        {id: 13, label: 'Support', icon: '🎧', content: 'Get help and access our comprehensive support resources.'},
        {id: 14, label: 'API Docs', icon: '📚', content: 'Explore our API documentation and integration guides.'},
        {
            id: 15,
            label: 'Webhooks',
            icon: '🔄',
            content: 'Set up and manage webhooks for real-time data synchronization.'
        }
    ];

    const handleWheel = (e) => {
        if (!scrollContainerRef.current) return;

        e.preventDefault();
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        const deltaX = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        const newScrollX = Math.max(0, Math.min(maxScroll, scrollX + deltaX));

        setScrollX(newScrollX);
        container.scrollLeft = newScrollX;
    };

    const scrollToTab = (tabIndex) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const tabElement = container.children[tabIndex];

        if (tabElement) {
            const containerWidth = container.clientWidth;
            const tabLeft = tabElement.offsetLeft;
            const tabWidth = tabElement.offsetWidth;

            const targetScroll = tabLeft - (containerWidth / 2) + (tabWidth / 2);
            const maxScroll = container.scrollWidth - container.clientWidth;
            const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));

            setScrollX(clampedScroll);
            container.scrollTo({
                left: clampedScroll,
                behavior: 'smooth'
            });
        }
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
        scrollToTab(index);
    };

    return (
        <div className="max-w-[300px] 640px:max-w-[550px] 1024px:max-w-[400px] 1260px:max-w-[500px] overflow-hidden">
            <div className="relative bg-brandColor rounded-[8px]">
                <motion.div
                    ref={scrollContainerRef}
                    className="flex overflow-x-hidden scroll-smooth p-2"
                    onWheel={handleWheel}
                >
                    {tabs.map((tab, index) => (
                        <motion.button
                            key={tab.id}
                            className={`flex-shrink-0 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-100 flex items-center ${
                                activeTab === index
                                    ? '!bg-white text-black'
                                    : 'bg-transparent text-white'
                            }`}
                            onClick={() => handleTabClick(index)}
                            animate={{
                                backgroundColor: activeTab === index ? undefined : 'transparent'
                            }}
                        >
                            <span className="whitespace-nowrap">{tab.label}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    className="px-8 py-12 flex items-start justify-center"
                    initial={{opacity: 0, x: 50, scale: 0.95}}
                    animate={{opacity: 1, x: 0, scale: 1}}
                    exit={{opacity: 0, x: -50, scale: 0.95}}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                    }}
                >
                    <div className="text-center">
                        <motion.div
                            className="text-6xl mb-4"
                            initial={{scale: 0, rotate: -180}}
                            animate={{scale: 1, rotate: 0}}
                            transition={{delay: 0.1, type: "spring", stiffness: 200}}
                        >
                            {tabs[activeTab].icon}
                        </motion.div>
                        <motion.h2
                            className="text-3xl font-bold text-gray-800 mb-6"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            {tabs[activeTab].label}
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 text-lg leading-relaxed"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                        >
                            {tabs[activeTab].content}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TabNavigationExample;