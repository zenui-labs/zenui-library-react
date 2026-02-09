import React from "react";

// components
import GraphChart from "@components/Data Display/GraphChart/Index.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const GraphChartPage = () => {
    return (
        <ContentPageLayout>
            <GraphChart/>
        </ContentPageLayout>
    );
};

export default GraphChartPage;
