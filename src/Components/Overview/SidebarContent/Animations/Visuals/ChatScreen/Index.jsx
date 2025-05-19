import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import ChatScreenWithReact from "@animations/Visuals/ChatScreen/ChatScreenWithReact.jsx";
import ChatScreenWithFileAttachment from "@animations/Visuals/ChatScreen/ChatScreenWithFileAttachment.jsx";

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
                            <ChatScreenWithReact/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code='
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Grid Distortion"} id={"grid-distortion"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ChatScreenWithFileAttachment/>
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
