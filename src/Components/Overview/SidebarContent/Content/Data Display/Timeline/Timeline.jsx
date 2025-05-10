// react helmet
import {Helmet} from "react-helmet";

// components
import OverviewFooter from "@shared/OverviewFooter";

// contents for scrollspy
import {timelineContents} from "@utils/ContentsConfig/DataDisplayContents";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy";

import MilestoneTimeline from "./MilestoneTimeline";
import WorkProgressTimeline from "./WorkProgressTimeline";
import TreeTimeline from "./TreeTimeline";
import MilestoneIconTimeline from "./MilestoneIconTimeline";

import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Timeline = () => {
    const sectionIds = timelineContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <MilestoneTimeline/>
                    <WorkProgressTimeline/>
                    <TreeTimeline/>
                    <MilestoneIconTimeline/>

                    <OverviewFooter
                        backUrl="/components/tooltip"
                        backName="tooltip"
                        forwardName="product card"
                        forwardUrl="/components/product-card"
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={timelineContents}/>

            </aside>
            <Helmet>
                <title>Data Display - Timeline</title>
            </Helmet>
        </>
    );
};

export default Timeline;
