import React, {useState} from "react";

// components
import OverviewFooter from "../../../../../../Shared/OverviewFooter";
import ShowCode from "../../../../../../Shared/Component/ShowCode.jsx";
import ContentHeader from "../../../../../../Shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '../../../../../../CustomHooks/useScrollSpy';

import ComponentDescription from "../../../../../../Shared/Component/ComponentDescription.jsx";
import ToggleTab from "../../../../../../Shared/Component/ToggleTab.jsx";
import ComponentWrapper from "../../../../../../Shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "../../../../../../Shared/Component/ContentNavbar.jsx";
import {
    RevealCardContents
} from "../../../../../../Utils/ContentsConfig/AnimationContents/CardContents.js";
import BasicSwipeCardExample from "./BasicSwipeCardExample.jsx";
import ElasticSwipeCardExample from "./ElasticSwipeCardExample.jsx";
import RotateSwipeCardExample from "./RotateSwipeCardExample.jsx";

const Index = () => {
    const sectionIds = RevealCardContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Basic Swipe reveal Card"} id={"basic-swipe-reveal-card"}/>

                <ComponentDescription
                    text='A simple swipe interaction that reveals card content with a clean sliding motion.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BasicSwipeCardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"elastic Swipe reveal Card"} id={"elastic-swipe-reveal-card"}/>
                </div>

                <ComponentDescription
                    text='A swipe-to-reveal card with a smooth, elastic animation for a playful feel.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ElasticSwipeCardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Rotate Swipe reveal Card"} id={"rotate-swipe-reveal-card"}/>
                </div>

                <ComponentDescription
                    text='Reveals content with a swipe that rotates the card for a dynamic 3D effect.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <RotateSwipeCardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={RevealCardContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Reveal Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
