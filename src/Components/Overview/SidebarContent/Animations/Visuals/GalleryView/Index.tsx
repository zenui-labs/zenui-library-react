import {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.tsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.ts';

import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";
import ImageScaleExample from "@animations/Visuals/GalleryView/ImageScaleExample.tsx";
import {ImageGalleryContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.ts";
import {HoverEffectAndImageScaleCodes} from "@animations/Visuals/GalleryView/PreviewCodes.ts";

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
                    text='A gallery hover effect that smoothly scales up the image under the pointer.'/>

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

                <OverviewFooter backUrl='/animations/mouse-navigations' backName='mouse navigations'
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
