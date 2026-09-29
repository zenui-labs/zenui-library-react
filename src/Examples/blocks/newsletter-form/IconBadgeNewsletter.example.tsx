import {IconBadgeNewsletter} from "./IconBadgeNewsletter";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const IconBadgeNewsletterExample = () => (
    <div className="p-8">
        <IconBadgeNewsletter onSubmit={subscribe}/>
    </div>
);

export default IconBadgeNewsletterExample;
