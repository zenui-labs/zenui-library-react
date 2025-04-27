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
    GridSwitcherContents
} from "../../../../../../Utils/ContentsConfig/AnimationContents/LayoutContents.js";
import WaveTransitionExample from "./WaveTransitionExample.jsx";
import DominoTransitionExample from "./DominoTransitionExample.jsx";

const Index = () => {
    const sectionIds = GridSwitcherContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"wave layout switcher"} id={"wave-layout-switcher"}/>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <WaveTransitionExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"domino layout switcher"} id={"domino-layout-switcher"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <DominoTransitionExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={GridSwitcherContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magnet Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
