// components
import WrongRoute from "@blocks/EmptyPages/WrongRoute.jsx";
import ContentPageLayout from "@shared/ContentPageLayout.jsx";

const WrongUrlErrorPage = () => {
    return (
        <ContentPageLayout>
            <WrongRoute/>
        </ContentPageLayout>
    );
};

export default WrongUrlErrorPage;
