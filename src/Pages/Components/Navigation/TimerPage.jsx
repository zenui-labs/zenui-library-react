import React from "react";

// components
import Timer from "@components/Navigation/Timer.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const TimerPage = () => {
    return (
        <ContentPageLayout>
            <Timer/>
        </ContentPageLayout>
    );
};

export default TimerPage;
