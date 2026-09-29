// components
import WrongRoute from "@blocks/EmptyPages/WrongRoute.tsx";
import ContentPageLayout from "@shared/ContentPageLayout.tsx";

const WrongUrlErrorPage = () => {
    return (
        <ContentPageLayout>
            <WrongRoute/>
        </ContentPageLayout>
    );
};

export default WrongUrlErrorPage;
