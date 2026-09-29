
// components
import GithubActivityGraph
    from "@components/Data Display/GithubActivityGraph/Index.tsx";
import ContentPageLayout from "@shared/ContentPageLayout.tsx";

const GithubActivityGraphPage = () => {
    return (
        <ContentPageLayout>
            <GithubActivityGraph/>
        </ContentPageLayout>
    );
};

export default GithubActivityGraphPage;
