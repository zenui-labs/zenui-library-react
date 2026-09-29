import {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.tsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.tsx";
import BlockDescription from "@shared/Block/BlockDescription.tsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.tsx";
import BlockWrapper from "@shared/Block/BlockWrapper.tsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.tsx";
import HeroSlider from "@components/Navigation/SwiperSlider/HeroSlider.tsx";

const Index = () => {

    const [responsiveFooter1Preview, setResponsiveFooter1Preview] = useState(true)
    const [responsiveFooter1Code, setResponsiveFooter1Code] = useState(false)

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <WarningMessageCard>
                    <p>To use the Slider component, install the <strong>swiper</strong> package. Without it the
                        slider will not work.</p>
                </WarningMessageCard>

                <ContentHeader text={"Responsive footer 1"} id={"responsive_footer_1"}/>

                <BlockDescription text='A hero slider built with Swiper that uses a cube transition, autoplay, navigation arrows, and pagination dots.'/>

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
