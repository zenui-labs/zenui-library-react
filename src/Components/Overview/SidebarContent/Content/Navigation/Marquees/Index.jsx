import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {marqueeContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import HorizontalMarquee from "./HorizontalMarquee.jsx";
import VerticalMarquee from "./VerticalMarquee.jsx";

const Index = () => {
    const sectionIds = marqueeContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [horizontalMarqueePreview, setHorizontalMarqueePreview] = useState(true);
    const [horizontalMarqueeCode, setHorizontalMarqueeCode] = useState(false);

    const [verticalMarqueePreview, setVerticalMarqueePreview] = useState(true);
    const [verticalMarqueeCode, setVerticalMarqueeCode] = useState(false);

    const horizontalMarqueeCodes = [
        {
            id: "main_codes",
            displayText: "HorizontalMarquee.jsx",
            language: "jsx",
            code: `import React from "react";

// marquee data
import { MarqueeData } from "data.js";

const HorizontalMarquee = () => {

    const doubledComponents = MarqueeData ? [...MarqueeData, ...MarqueeData] : [];

    return (
        <>

            <div
                className="slider-container w-full flex-nowrap relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">

                <div className="marqueeSliderLeft flex items-center gap-5">
                    {
                        doubledComponents.map((item, index) => (
                            <a
                                href={item.url}
                                className="py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium whitespace-nowrap"
                                key={index}
                            >
                                {item.title}
                            </a>
                        ))
                    }
                </div>

            </div>

            <div className="slider-container w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
            >
                <div className="marqueeSliderRight flex items-center gap-5 w-[50%] 1404px:w-[100%] justify-center">
                    {
                        MarqueeData?.map((item, index) => (
                            <a
                                href={item.url}
                                className="py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium whitespace-nowrap"
                                key={index}
                            >
                                {item.title}
                            </a>
                        ))
                    }

                </div>
            </div>
        </>
    );
};

export default HorizontalMarquee;`
        },
        {
            id: "marquee_data",
            displayText: "Data.js",
            language: "js",
            code: `export const MarqueeData = [
    {
        title: "input",
        image: "https://i.ibb.co/b1CyMNK/Name-1.png",
        url: "/components/input-text",
        groupName: "input",
    },
    {
        title: "textarea",
        image: "https://i.ibb.co/cb7cMxn/Name-20.png",
        url: "/components/input-textarea",
        groupName: "input",
    },
    {
        title: "switch",
        image: "https://i.ibb.co/X2QR7c3/Name-2.png",
        url: "/components/input-switch",
        groupName: "input",
    },
    {
        title: "radio",
        image: "https://i.ibb.co/kGh9ppd/Name-21.png",
        url: "/components/input-radio",
        groupName: "input",
    },
    {
        title: "Number Input",
        image: "https://i.ibb.co.com/w7TQBwB/number-input.png",
        url: "/components/input-number",
        groupName: "input",
    },
    {
        title: "Checkbox",
        image: "https://i.ibb.co.com/y6nw1VQ/checkbox.png",
        url: "/components/input-checkbox",
        groupName: "input",
    },
    {
        title: "Strong Password",
        image: "https://i.ibb.co.com/4phdhTt/password.png",
        url: "/components/strong-password",
        groupName: "input",
    },
    {
        title: "Input Range",
        image: "https://i.ibb.co.com/FxKfWdv/slider.png",
        url: "/components/input-range",
        groupName: "input",
    },
    {
        title: "OTP Input",
        image: "https://i.ibb.co.com/QMrkz9s/otp-input.png",
        url: "/components/otp-input",
        groupName: "input",
    },
    {
        title: "file upload",
        image: "https://i.ibb.co/gmTJPyf/Name-23.png",
        url: "/components/input-file",
        groupName: "input",
    },
    {
        title: "primary button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/normal-button",
        groupName: "button",
    },
    {
        title: "Auth Button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/auth-buttons",
        groupName: "button",
    },
    {
        title: "Dropdown Button",
        image: "https://i.ibb.co.com/NZnR5JS/dropdown-button.png",
        url: "/components/dropdown-button",
        groupName: "button",
    },
    {
        title: "animated button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/animated-button",
        groupName: "button",
    },
    {
        title: "chip",
        image: "https://i.ibb.co/wRnjstr/Name-5.png",
        url: "/components/chip",
        groupName: "navigation",
    },
    {
        title: "Timer",
        image: "https://i.ibb.co.com/1G0c4MN/timer.png",
        url: "/components/timer",
        groupName: "navigation",
    },
    {
        title: "Progress Bar",
        image: "https://i.ibb.co.com/MGCGZZW/progress-bar.png",
        url: "/components/progress-bar",
        groupName: "navigation",
    },
    {
        title: "breadcrumb",
        image: "https://i.ibb.co.com/7SkBRSr/breadcrumb.png",
        url: "/components/breadcrumb",
        groupName: "navigation",
    },
    {
        title: "Rating",
        image: "https://i.ibb.co.com/VBhMWRF/star.png",
        url: "/components/rating",
        groupName: "navigation",
    },
    {
        title: "stepper",
        image: "https://i.ibb.co.com/QKcvgbC/stepper.png",
        url: "/components/stepper",
        groupName: "navigation",
    },
    {
        title: "tab",
        image: "https://i.ibb.co/tzFdVZt/Name-14.png",
        url: "/components/tabs",
        groupName: "navigation",
    },
    {
        title: "modal",
        image: "https://i.ibb.co/yFRHYKV/Name-17.png",
        url: "/components/modal",
        groupName: "navigation",
    },
    {
        title: "pagination",
        image: "https://i.ibb.co/C9ytCym/Name-15.png",
        url: "/components/pagination",
        groupName: "navigation",
    },
    {
        title: "tooltip",
        image: "https://i.ibb.co/mcF2bX8/Name-7.png",
        url: "/components/tooltip",
        groupName: "data_display",
    },
    {
        title: "badge",
        image: "https://i.ibb.co/HgvLrtK/Name-6.png",
        url: "/components/badge",
        groupName: "data_display",
    },
    {
        title: "Table",
        image: "https://i.ibb.co.com/LR10Wn3/table.png",
        url: "/components/table",
        groupName: "data_display",
    },
    {
        title: "Timeline",
        image: "https://i.ibb.co.com/mFX1jXf/timeline.png",
        url: "/components/timeline",
        groupName: "data_display",
    },
    {
        title: "alert message",
        image: "https://i.ibb.co/2j1WcwK/Name-8.png",
        url: "/components/alert-message",
        groupName: "feedback",
    },
    {
        title: "skeleton",
        image: "https://i.ibb.co/xG5hNKD/Name-9.png",
        url: "/components/skeleton",
        groupName: "feedback",
    },
    {
        title: "Tree Dropdown",
        image: "https://i.ibb.co.com/C5MStwL/Group-1000006471.png",
        url: "/components/tree-dropdown",
        groupName: "feedback",
    },
    {
        title: "loader",
        image: "https://i.ibb.co/WPBr497/Name-19.png",
        url: "/components/loader",
        groupName: "feedback",
    },
    {
        title: "according",
        image: "https://i.ibb.co/0Gpp2jv/Name-13.png",
        url: "/components/according",
        groupName: "surface",
    },
    {
        title: "card",
        image: "https://i.ibb.co/ChStSmV/Name-12.png",
        url: "/components/cards",
        groupName: "surface",
    },
    {
        title: "Drag & Drop",
        image: "https://i.ibb.co.com/RCnzWb4/drag-drop.png",
        url: "/components/drag-and-drop",
        groupName: "surface",
    },
    {
        title: "appbar",
        image: "https://i.ibb.co/ccS8kBn/Name-11.png",
        url: "/components/appbar",
        groupName: "surface",
    },
    {
        title: "image gallery",
        image: "https://i.ibb.co/KmFZSw0/Name-18.png",
        url: "/components/image-gallery",
        groupName: "surface",
    },
];`
        },
        {
            id: "marquee_css",
            displayText: "style.css",
            language: "css",
            code: `.marqueeSliderLeft {
    animation: marqueeLeft 20s linear infinite;
}

@keyframes marqueeLeft {
    from {
        transform: translateX(0)
    }
    to {
        transform: translateX(-100%)
    }
}

.marqueeSliderRight {
    animation: marqueeRight 20s linear infinite;
}

@keyframes marqueeRight {
    from {
        transform: translateX(0)
    }
    to {
        transform: translateX(100%)
    }
}

.slider-container:hover .marqueeSliderLeft,
.slider-container:hover .marqueeSliderRight {
    animation-play-state: paused;
}`
        },
    ]

    const verticalMarqueeCodes = [
        {
            id: "main_codes",
            displayText: "VerticalMarquee.jsx",
            language: 'jsx',
            code: `import React from "react";

// marquee data
import { marqueeData } from "Data.js";

const VerticalMarquee = () => {

    const doubledComponents = marqueeData ? [...marqueeData, ...marqueeData] : [];

    return (
        <div className="flex gap-5">
            <div className="slider-container h-80 w-full relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">

                <div className="marqueeSliderUp flex flex-col items-center gap-5">
                    {doubledComponents.map((item, index) => (
                        <a
                            href={item.url}
                            className="py-2 px-4 sm:px-6 w-32 sm:w-48 text-center dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium"
                            key={index}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>

            <div className="slider-container h-80 w-full relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">
                
                <div className="marqueeSliderDown flex flex-col items-center gap-5">
                    {doubledComponents.map((item, index) => (
                        <a
                            href={item.url}
                            className="py-2 px-4 sm:px-6 w-32 sm:w-48 text-center dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium"
                            key={index}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalMarquee;`
        },
        {
            id: "marquee_data",
            displayText: "Data.js",
            language: 'js',
            code: `export const marqueeData = [
    {
        title: "input",
        image: "https://i.ibb.co/b1CyMNK/Name-1.png",
        url: "/components/input-text",
        groupName: "input",
    },
    {
        title: "textarea",
        image: "https://i.ibb.co/cb7cMxn/Name-20.png",
        url: "/components/input-textarea",
        groupName: "input",
    },
    {
        title: "switch",
        image: "https://i.ibb.co/X2QR7c3/Name-2.png",
        url: "/components/input-switch",
        groupName: "input",
    },
    {
        title: "radio",
        image: "https://i.ibb.co/kGh9ppd/Name-21.png",
        url: "/components/input-radio",
        groupName: "input",
    },
    {
        title: "Number Input",
        image: "https://i.ibb.co.com/w7TQBwB/number-input.png",
        url: "/components/input-number",
        groupName: "input",
    },
    {
        title: "Checkbox",
        image: "https://i.ibb.co.com/y6nw1VQ/checkbox.png",
        url: "/components/input-checkbox",
        groupName: "input",
    },
    {
        title: "Strong Password",
        image: "https://i.ibb.co.com/4phdhTt/password.png",
        url: "/components/strong-password",
        groupName: "input",
    },
    {
        title: "Input Range",
        image: "https://i.ibb.co.com/FxKfWdv/slider.png",
        url: "/components/input-range",
        groupName: "input",
    },
    {
        title: "OTP Input",
        image: "https://i.ibb.co.com/QMrkz9s/otp-input.png",
        url: "/components/otp-input",
        groupName: "input",
    },
    {
        title: "file upload",
        image: "https://i.ibb.co/gmTJPyf/Name-23.png",
        url: "/components/input-file",
        groupName: "input",
    },
    {
        title: "primary button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/normal-button",
        groupName: "button",
    },
    {
        title: "Auth Button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/auth-buttons",
        groupName: "button",
    },
    {
        title: "Dropdown Button",
        image: "https://i.ibb.co.com/NZnR5JS/dropdown-button.png",
        url: "/components/dropdown-button",
        groupName: "button",
    },
    {
        title: "animated button",
        image: "https://i.ibb.co/6R0WRr5/Name-4.png",
        url: "/components/animated-button",
        groupName: "button",
    },
    {
        title: "chip",
        image: "https://i.ibb.co/wRnjstr/Name-5.png",
        url: "/components/chip",
        groupName: "navigation",
    },
    {
        title: "Timer",
        image: "https://i.ibb.co.com/1G0c4MN/timer.png",
        url: "/components/timer",
        groupName: "navigation",
    },
    {
        title: "Progress Bar",
        image: "https://i.ibb.co.com/MGCGZZW/progress-bar.png",
        url: "/components/progress-bar",
        groupName: "navigation",
    },
    {
        title: "breadcrumb",
        image: "https://i.ibb.co.com/7SkBRSr/breadcrumb.png",
        url: "/components/breadcrumb",
        groupName: "navigation",
    },
    {
        title: "Rating",
        image: "https://i.ibb.co.com/VBhMWRF/star.png",
        url: "/components/rating",
        groupName: "navigation",
    },
    {
        title: "stepper",
        image: "https://i.ibb.co.com/QKcvgbC/stepper.png",
        url: "/components/stepper",
        groupName: "navigation",
    },
    {
        title: "tab",
        image: "https://i.ibb.co/tzFdVZt/Name-14.png",
        url: "/components/tabs",
        groupName: "navigation",
    },
    {
        title: "modal",
        image: "https://i.ibb.co/yFRHYKV/Name-17.png",
        url: "/components/modal",
        groupName: "navigation",
    },
    {
        title: "pagination",
        image: "https://i.ibb.co/C9ytCym/Name-15.png",
        url: "/components/pagination",
        groupName: "navigation",
    },
    {
        title: "tooltip",
        image: "https://i.ibb.co/mcF2bX8/Name-7.png",
        url: "/components/tooltip",
        groupName: "data_display",
    },
    {
        title: "badge",
        image: "https://i.ibb.co/HgvLrtK/Name-6.png",
        url: "/components/badge",
        groupName: "data_display",
    },
    {
        title: "Table",
        image: "https://i.ibb.co.com/LR10Wn3/table.png",
        url: "/components/table",
        groupName: "data_display",
    },
    {
        title: "Timeline",
        image: "https://i.ibb.co.com/mFX1jXf/timeline.png",
        url: "/components/timeline",
        groupName: "data_display",
    },
    {
        title: "alert message",
        image: "https://i.ibb.co/2j1WcwK/Name-8.png",
        url: "/components/alert-message",
        groupName: "feedback",
    },
    {
        title: "skeleton",
        image: "https://i.ibb.co/xG5hNKD/Name-9.png",
        url: "/components/skeleton",
        groupName: "feedback",
    },
    {
        title: "Tree Dropdown",
        image: "https://i.ibb.co.com/C5MStwL/Group-1000006471.png",
        url: "/components/tree-dropdown",
        groupName: "feedback",
    },
    {
        title: "loader",
        image: "https://i.ibb.co/WPBr497/Name-19.png",
        url: "/components/loader",
        groupName: "feedback",
    },
    {
        title: "according",
        image: "https://i.ibb.co/0Gpp2jv/Name-13.png",
        url: "/components/according",
        groupName: "surface",
    },
    {
        title: "card",
        image: "https://i.ibb.co/ChStSmV/Name-12.png",
        url: "/components/cards",
        groupName: "surface",
    },
    {
        title: "Drag & Drop",
        image: "https://i.ibb.co.com/RCnzWb4/drag-drop.png",
        url: "/components/drag-and-drop",
        groupName: "surface",
    },
    {
        title: "appbar",
        image: "https://i.ibb.co/ccS8kBn/Name-11.png",
        url: "/components/appbar",
        groupName: "surface",
    },
    {
        title: "image gallery",
        image: "https://i.ibb.co/KmFZSw0/Name-18.png",
        url: "/components/image-gallery",
        groupName: "surface",
    },
];`
        },
        {
            id: "marquee_css",
            displayText: "style.css",
            language: 'css',
            code: `@keyframes scrollUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-50%);
    }
}

@keyframes scrollDown {
    0% {
        transform: translateY(-50%);
    }
    100% {
        transform: translateY(0);
    }
}

.marqueeSliderUp {
    animation: scrollUp 45s linear infinite;
}

.marqueeSliderDown {
    animation: scrollDown 45s linear infinite;
}

.slider-container:hover .marqueeSliderUp,
.slider-container:hover .marqueeSliderDown {
    animation-play-state: paused;
}`
        }
    ]

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'Horizontal Marquee'} id={'horizontal_marquee'}/>

                    <ComponentDescription
                        text='A horizontal marquee scrolls text or content from one side to another, usually left to right or right to left.'/>

                    <ToggleTab setCode={setHorizontalMarqueeCode} code={horizontalMarqueeCode}
                               preview={horizontalMarqueePreview} setPreview={setHorizontalMarqueePreview}/>

                    <ComponentWrapper>
                        {horizontalMarqueePreview && (
                            <div
                                className='p-8 flex w-[320px] 640px:w-[700px] 1024px:w-[500px] 1360px:w-[600px] overflow-hidden flex-wrap items-center gap-5 justify-center'>
                                <HorizontalMarquee/>
                            </div>
                        )}

                        {horizontalMarqueeCode && (
                            <Showcode
                                code={horizontalMarqueeCodes}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Vertical Marquee'} id={'vertical_marquee'}/>
                    </div>

                    <ComponentDescription
                        text='A vertical marquee scrolls text or content up or down within a container continuously or on hover.'/>

                    <ToggleTab setCode={setVerticalMarqueeCode} code={verticalMarqueeCode}
                               preview={verticalMarqueePreview} setPreview={setVerticalMarqueePreview}/>

                    <ComponentWrapper>
                        {verticalMarqueePreview && (
                            <div
                                className='p-8 flex w-[320px] 640px:w-[700px] 1024px:w-[500px] 1360px:w-[600px] overflow-hidden flex-wrap items-center gap-5 justify-center'>
                                <VerticalMarquee/>
                            </div>
                        )}

                        {verticalMarqueeCode && (
                            <Showcode
                                code={verticalMarqueeCodes}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/chip'
                        backName='Chip'
                        forwardName='Timer'
                        forwardUrl='/components/timer'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={marqueeContents}/>

            </aside>
            <Helmet>
                <title>Navigation - Marquee</title>
            </Helmet>
        </>
    );
};

export default Index;
