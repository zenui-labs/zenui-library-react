import React from "react";

// components
import GithubActivityGraph
    from "@components/Data Display/GithubActivityGraph/Index.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const GithubActivityGraphPage = () => {
    return (
        <ContentPageLayout>
            <GithubActivityGraph/>
        </ContentPageLayout>
    );
};

export default GithubActivityGraphPage;
