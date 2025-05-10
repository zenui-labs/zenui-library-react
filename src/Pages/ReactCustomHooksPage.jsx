import React from "react";

// Components
import ReactCustomHooks from "@/Components/Overview/SidebarContent/Content/ReactCustomHooks/Index.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const OverviewPage = () => {
    return (
        <ContentPageLayout>
            <ReactCustomHooks/>
        </ContentPageLayout>
    );
};

export default OverviewPage;
