import {GradientNewsletterBanner} from "./GradientNewsletterBanner";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const GradientNewsletterBannerExample = () => (
    <div className="p-8">
        <GradientNewsletterBanner onSubmit={subscribe}/>
    </div>
);

export default GradientNewsletterBannerExample;
