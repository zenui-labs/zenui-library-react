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
import BlurStaggeredExample from "@animations/Visuals/DropdownAnimations/BlurStaggeredExample.jsx";
import {DropdownAnimationContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.js";
import {
    BlurStaggeredDropdownCodes,
    YAxisStaggeredDropdownCodes
} from "@animations/Visuals/DropdownAnimations/PreviewCodes.js";
import YaxisStaggeredExample from "@animations/Visuals/DropdownAnimations/YaxisStaggeredExample.jsx";

const Index = () => {
    const sectionIds = DropdownAnimationContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [blurStaggeredAnimationPreview, setBlurStaggeredAnimationPreview] = useState(true);
    const [blurStaggeredAnimationCode, setBlurStaggeredAnimationCode] = useState(false);

    const [yAxisStaggeredAnimationPreview, setYAxisStaggeredAnimationPreview] = useState(true);
    const [yAxisStaggeredAnimationCode, setYAxisStaggeredAnimationCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"blur staggered animation"} id={"blur-staggered-animation"}/>

                <ComponentDescription
                    text='Smooth blur staggered animation for elements, creating a sequential fade and focus visual effect.'/>

                <ToggleTab setCode={setBlurStaggeredAnimationCode} code={blurStaggeredAnimationCode}
                           setPreview={setBlurStaggeredAnimationPreview} preview={blurStaggeredAnimationPreview}/>

                <ComponentWrapper>
                    {blurStaggeredAnimationPreview && (
                        <div className="px-8 py-16 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BlurStaggeredExample/>
                        </div>
                    )}

                    {blurStaggeredAnimationCode &&
                        <ShowCode code={BlurStaggeredDropdownCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"y axis staggered animation"} id={"y-axis-staggered-animation"}/>
                </div>

                <ComponentDescription
                    text='Elements animate in a staggered sequence along the Y-axis, creating a smooth vertical entrance effect.'/>

                <ToggleTab setCode={setYAxisStaggeredAnimationCode} code={yAxisStaggeredAnimationCode}
                           setPreview={setYAxisStaggeredAnimationPreview} preview={yAxisStaggeredAnimationPreview}/>

                <ComponentWrapper>
                    {yAxisStaggeredAnimationPreview && (
                        <div className="px-8 py-16 relative flex flex-col flex-wrap items-center gap-5 justify-center">
                            <YaxisStaggeredExample/>
                        </div>
                    )}

                    {yAxisStaggeredAnimationCode &&
                        <ShowCode code={YAxisStaggeredDropdownCodes}
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/chat-screen' backName='chat screen'
                                forwardUrl='/animations/gallery-view' forwardName='gallery view'/>
            </div>

            <ContentNavbar contents={DropdownAnimationContents} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Dropdown Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
