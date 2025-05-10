import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import MagneticFieldExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/MagneticFieldExample.jsx";
import CircuitBoardExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/CircuitBoardExample.jsx";
import StringArtExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StringArtExample.jsx";
import GridDistortionExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/GridDistortionExample.jsx";
import StarfieldWarpExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StarfieldWarpExample.jsx";

const Index = () => {
    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);


    return (
        <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Grid Distortion"} id={"grid-distortion"}/>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <GridDistortionExample/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Starfield Warp"} id={"starfield-warp"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StarfieldWarpExample/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Magnetic Field"} id={"magnetic-field"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <MagneticFieldExample/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Circuit Board"} id={"circuit-board"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CircuitBoardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"String Art"} id={"string-art"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StringArtExample/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/empty-page' backName='empty page'
                              forwardUrl='/blocks/product-details-page' forwardName='product details page'/>
            </div>

            <Helmet>
                <title>Visuals - Background Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
