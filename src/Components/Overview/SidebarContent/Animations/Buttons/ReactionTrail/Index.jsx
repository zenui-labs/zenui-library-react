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
import LinkedinReactTrailExample from "./LinkedinReactTrailExample.jsx";
import {ReactionTrailContents} from "../../../../../../Utils/ContentsConfig/AnimationContents/ButtonContent.js";

const Index = () => {
    const sectionIds = ReactionTrailContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"linkedin reaction trail"} id={"linkedin-reaction-trail"}/>

                <ComponentDescription
                    text='A simple magnetic effect card that reacts subtly on hover to enhance user interaction.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <LinkedinReactTrailExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={ReactionTrailContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magnet Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
