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
import ImageScaleExample from "@animations/Visuals/GalleryView/ImageScaleExample.jsx";
import {ImageGalleryContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.js";
import {HoverEffectAndImageScaleCodes} from "@animations/Visuals/GalleryView/PreviewCodes.js";

const Index = () => {
    const sectionIds = ImageGalleryContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [hoverEffectAndImageScalePreview, setHoverEffectAndImageScalePreview] = useState(true);
    const [hoverEffectAndImageScaleCode, setHoverEffectAndImageScaleCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"hover effect & image scale"} id={"hover-effect-&-image-scale"}/>

                <ComponentDescription
                    text='Interactive hover effect with smooth image scaling for dynamic visual engagement.'/>

                <ToggleTab setCode={setHoverEffectAndImageScaleCode} code={hoverEffectAndImageScaleCode}
                           setPreview={setHoverEffectAndImageScalePreview} preview={hoverEffectAndImageScalePreview}/>

                <ComponentWrapper>
                    {hoverEffectAndImageScalePreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ImageScaleExample/>
                        </div>
                    )}

                    {hoverEffectAndImageScaleCode &&
                        <ShowCode code={HoverEffectAndImageScaleCodes}
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/dropdown-animations' backName='dropdown animations'
                                forwardUrl='/blocks/all-blocks' forwardName='all blocks'/>
            </div>

            <ContentNavbar contents={ImageGalleryContents} width={'50%'} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Image Gallery</title>
            </Helmet>
        </aside>
    );
};

export default Index;
