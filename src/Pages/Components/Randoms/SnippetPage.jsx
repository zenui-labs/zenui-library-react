import React from "react";

// components
import Snippet from "@components/Randoms/Snippet";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const SnippetPage = () => {
    return (
        <ContentPageLayout>
            <Snippet/>
        </ContentPageLayout>
    );
};

export default SnippetPage;
