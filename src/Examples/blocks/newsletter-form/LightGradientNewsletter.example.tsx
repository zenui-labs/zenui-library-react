import {LightGradientNewsletter} from "./LightGradientNewsletter";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const LightGradientNewsletterExample = () => (
    <div className="p-8">
        <LightGradientNewsletter onSubmit={subscribe}/>
    </div>
);

export default LightGradientNewsletterExample;
