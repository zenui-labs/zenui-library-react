import {StickyBottomBanner, type BlogPost} from "./StickyBottomBanner";

const post: BlogPost = {
    category: "Engineering",
    title: "How we cut cold start time by 60 percent",
    byline: "Hana Okafor, platform team. 7 min read",
    paragraphs: [
        "Our API gateway used to take 1.8 seconds to answer its first request after a deploy. For most endpoints nobody noticed. For the checkout webhook, it meant a retry storm every Tuesday afternoon.",
        "We started by measuring where the time went. Almost half of it was spent loading configuration for 40 tenants that the new instance would never serve. The rest was split between opening database pools and compiling route handlers on demand.",
        "The first fix was the boring one. We moved tenant configuration behind a lazy loader with a small in-memory cache, so an instance only pays for the tenants it actually receives. That alone took cold starts from 1.8 seconds to 1.1.",
        "Database pools were next. Instead of opening ten connections up front, each instance now opens two and grows under load. Our connection proxy already handled bursts, so the only change we saw in production was a shorter boot log.",
        "Route compilation was the most interesting part. We generate a manifest at build time and ship it with the container, so the router starts with every handler already resolved. This saved another 300 milliseconds and removed a class of errors that only appeared on the first request.",
        "The result is a cold start of 720 milliseconds, down 60 percent, and no retry storms since March. Next quarter we want to move the manifest step into the shared build image so every service gets it for free.",
    ],
};

const StickyBottomBannerExample = () => <StickyBottomBanner post={post}/>;

export default StickyBottomBannerExample;
