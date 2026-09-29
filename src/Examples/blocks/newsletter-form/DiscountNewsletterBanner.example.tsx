import {DiscountNewsletterBanner} from "./DiscountNewsletterBanner";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const DiscountNewsletterBannerExample = () => (
    <div className="p-8 sm:p-12 overflow-hidden">
        <DiscountNewsletterBanner
            topLeftImageSrc="https://i.ibb.co/kK9kStP/Group-5.png"
            underlineImageSrc="https://i.ibb.co/5hLC2fx/Vector-1.png"
            bottomRightImageSrc="https://i.ibb.co/ZJJBctq/Group-4.png"
            onSubmit={subscribe}
        />
    </div>
);

export default DiscountNewsletterBannerExample;
