import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";
import HeroSlider from "@components/Navigation/SwiperSlider/HeroSlider.jsx";

const Index = () => {

    const [responsiveFooter1Preview, setResponsiveFooter1Preview] = useState(true)
    const [responsiveFooter1Code, setResponsiveFooter1Code] = useState(false)

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <WarningMessageCard text={'To use the Slider component, you must install the swiper package.\n' +
                    'Without installing swiper, the Slider component will not work properly.'}
                                    children={
                                        <p>To use the Slider component, you must install the <strong>swiper
                                            package</strong>.Without
                                            installing swiper, the Slider component will not work properly.</p>}/>

                <ContentHeader text={"Responsive footer 1"} id={"responsive_footer_1"}/>

                <BlockDescription text='A flexible footer that adapts to different screen sizes, displaying links, contact info, and social
                    icons.'/>

                <BlockToggleTab preview={responsiveFooter1Preview} setPreview={setResponsiveFooter1Preview}
                                code={responsiveFooter1Code} setCode={setResponsiveFooter1Code}/>

                <BlockWrapper>
                    {responsiveFooter1Preview && (
                        <div
                            className={`p-8 max-w-max flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <HeroSlider/>
                        </div>
                    )}

                    {responsiveFooter1Code && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/pricing-section' backName='pricing section' forwardName='contact form'
                              forwardUrl='/blocks/contact-form'/>
            </div>


            <Helmet>
                <title>Blocks - Responsive Footer</title>
            </Helmet>
        </aside>
    );
};

export default Index;
