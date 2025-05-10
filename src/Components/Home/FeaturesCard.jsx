import React from 'react';
import ComponentIcon from "@/SvgIcons/ComponentIcon.jsx";
import CopyToUseIcon from "@/SvgIcons/CopyToUseIcon.jsx";
import ResponsiveIcon from "@/SvgIcons/ResponsiveIcon.jsx";
import ExampleTemplateIcon from "@/SvgIcons/ExampleTemplateIcon.jsx";
import DesignPartIcon from "@/SvgIcons/DesignPartIcon.jsx";
import CodeBoxIcon from "@/SvgIcons/CodeBoxIcon.jsx";
import TailwindCssIcon from "@/SvgIcons/TailwindCssIcon.jsx";
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const features = [
    {
        icon: <ComponentIcon/>,
        title: "500+ Components",
        description: "Access a massive library of 500+ pre-built, production-ready React components designed for scalability, flexibility, and real-world use cases.",
        delay: 700
    },
    {
        icon: <CopyToUseIcon/>,
        title: "Easy To Use",
        description: "ZenUI is built with simplicity in mind—drop components into your project with minimal setup and start building instantly.",
        delay: 1000
    },
    {
        icon: <ResponsiveIcon/>,
        title: "Responsive Design",
        description: "Every component is fully responsive and mobile-first, ensuring your UI looks great across phones, tablets, and desktops.",
        delay: 1300
    },
    {
        icon: <ExampleTemplateIcon/>,
        title: "20+ Free Templates",
        description: "Speed up development with 20+ modern templates for dashboards, landing pages, and more—ready to customize.",
        delay: 1600
    },
    {
        icon: <CodeBoxIcon/>,
        title: "Developer Friendly",
        description: "Built with clean, modular, and well-commented code, ZenUI makes it easy to customize, extend, and maintain your components.",
        delay: 1600
    },
    {
        icon: <DesignPartIcon/>,
        title: "Modern Design",
        description: "ZenUI components follow the latest design trends—clean, minimal, and user-friendly—enhancing the overall UI/UX of your app.",
        delay: 1600
    },
    {
        icon: <TailwindCssIcon/>,
        title: "Tailwind CSS",
        description: "Designed 100% with Tailwind CSS, ZenUI gives you full styling control directly in your markup—faster dev, consistent design.",
        delay: 1600
    },
];

const FeaturesCard = () => {
    return (
        <SectionWrapper>
            <SectionHead
                description={'Discover ZenUI’s powerful, customizable components built to speed up your React development with\n' +
                    '                    style and ease.'} title={'Features'} isSubjet={'ZenUI'}/>

            <div
                className="grid grid-cols-1 640px:grid-cols-2 1024px:grid-cols-3 gap-8 mt-14 relative max-w-[1300px] mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-8 rounded-high border dark:shadow-[0px_80px_50px_-32px_rgba(255,255,255,0.05)] shadow-[0px_80px_50px_-32px_rgba(107,110,148,.04)] dark:border-darkBorderColor transition-all duration-500 border-gray-100"
                    >
                        <div className="mb-3">
                            {feature.icon}
                            <h4 className="text-text mt-6 dark:text-darkTextColor font-[600] text-[1.4rem]">
                                {feature.title}
                            </h4>
                        </div>
                        <p className="text-[1rem] dark:text-darkSubTextColor text-black/60">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default FeaturesCard;
