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
import {MouseNavigationContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.ts";
import TabNavigationExample from "@animations/Visuals/MouseNavigations/TabNavigationExample.tsx";
import TabNavigationWithDragExample from "@animations/Visuals/MouseNavigations/TabNavigationWithDragExample.tsx";
import {
    TabNavigationExampleCodes,
    TabNavigationWithDragExampleCodes
} from "@animations/Visuals/MouseNavigations/PreviewCodes.ts";

const Index = () => {
    const sectionIds = MouseNavigationContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [scrollTabWithMousePreview, setScrollTabWithMousePreview] = useState(true);
    const [scrollTabWithMouseCode, setScrollTabWithMouseCode] = useState(false);

    const [scrollTabWithMouseAndDraggingPreview, setScrollTabWithMouseAndDraggingPreview] = useState(true);
    const [scrollTabWithMouseAndDraggingCode, setScrollTabWithMouseAndDraggingCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"scroll tabs with mouse"} id={"scroll-tabs-with-mouse"}/>

                <ComponentDescription
                    text='Tabs that scroll horizontally with the mouse, letting users reach overflowing tab items by dragging or using the scroll wheel.'/>

                <ToggleTab setCode={setScrollTabWithMouseCode} code={scrollTabWithMouseCode}
                           setPreview={setScrollTabWithMousePreview} preview={scrollTabWithMousePreview}/>

                <ComponentWrapper>
                    {scrollTabWithMousePreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TabNavigationExample/>
                        </div>
                    )}

                    {scrollTabWithMouseCode &&
                        <ShowCode code={TabNavigationExampleCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"scroll tabs with mouse and dragging"}
                                   id={"scroll-tabs-with-mouse-and-dragging"}/>
                </div>

                <ComponentDescription
                    text='Horizontally scrolling tabs that respond to both the mouse wheel and click-and-drag, for tab lists that overflow their container.'/>

                <ToggleTab setCode={setScrollTabWithMouseAndDraggingCode} code={scrollTabWithMouseAndDraggingCode}
                           setPreview={setScrollTabWithMouseAndDraggingPreview}
                           preview={scrollTabWithMouseAndDraggingPreview}/>

                <ComponentWrapper>
                    {scrollTabWithMouseAndDraggingPreview && (
                        <div className="p-8 flex flex-col flex-wrap w-full items-center gap-5 justify-center">
                            <TabNavigationWithDragExample/>
                        </div>
                    )}

                    {scrollTabWithMouseAndDraggingCode &&
                        <ShowCode code={TabNavigationWithDragExampleCodes}
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/dropdown-animations' backName='dropdown animations'
                                forwardUrl='/animations/gallery-view' forwardName='gallery view'/>
            </div>

            <ContentNavbar contents={MouseNavigationContents} width={'40%'} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Mouse Navigations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
