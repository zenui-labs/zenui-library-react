// components
import Empty from "@blocks/EmptyPages/Empty.tsx";
import ContentPageLayout from "@shared/ContentPageLayout.tsx";

const NoDataEmptyPage = () => {
    return (
        <ContentPageLayout>
            <Empty/>
        </ContentPageLayout>
    );
};

export default NoDataEmptyPage;
