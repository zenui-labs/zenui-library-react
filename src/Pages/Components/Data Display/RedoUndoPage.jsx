import React from "react";

// components
import ContentPageLayout from "@shared/ContentPageLayout.jsx";
import RedoUndo from "@components/Data Display/RedoUndo/Index.jsx";

const TooltipPage = () => {
    return (
        <ContentPageLayout>
            <RedoUndo/>
        </ContentPageLayout>
    );
};

export default TooltipPage;
