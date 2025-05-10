import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {
    MagnetCardContents
} from "@utils/ContentsConfig/AnimationContents/CardContents.js";
import BasicMagnetCardExample from "./BasicMagnetCardExample.jsx";
import ThreedMagnetCardExample from "./3dMagnetCardExample.jsx";

const Index = () => {
    const sectionIds = MagnetCardContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Basic magnet card"} id={"basic-magnet-card"}/>

                <ComponentDescription
                    text='A simple magnetic effect card that reacts subtly on hover to enhance user interaction.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BasicMagnetCardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d magnet Card"} id={"3d-magnet-card"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreedMagnetCardExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={MagnetCardContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magnet Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
