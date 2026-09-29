import type {Example} from "../../types.ts";
import CtaPanel from "./CtaPanel.example.tsx";
import ctaPanelSource from "./CtaPanel.example.tsx?raw";
import WaitlistLaunch from "./WaitlistLaunch.example.tsx";
import waitlistLaunchSource from "./WaitlistLaunch.example.tsx?raw";
import SplitProductPreview from "./SplitProductPreview.example.tsx";
import splitProductPreviewSource from "./SplitProductPreview.example.tsx?raw";
import SpotlightBorderCta from "./SpotlightBorderCta.example.tsx";
import spotlightBorderCtaSource from "./SpotlightBorderCta.example.tsx?raw";
import NewsletterTopics from "./NewsletterTopics.example.tsx";
import newsletterTopicsSource from "./NewsletterTopics.example.tsx?raw";
import AppDownload from "./AppDownload.example.tsx";
import appDownloadSource from "./AppDownload.example.tsx?raw";
import EventRegistration from "./EventRegistration.example.tsx";
import eventRegistrationSource from "./EventRegistration.example.tsx?raw";
import StickyBottomBanner from "./StickyBottomBanner.example.tsx";
import stickyBottomBannerSource from "./StickyBottomBanner.example.tsx?raw";

const examples: Example[] = [
    {
        id: "cta-panel",
        title: "CTA panel with install command",
        description: "A dark call-to-action panel with two actions and a copyable install command. Use it at the end of a developer-facing landing page.",
        component: CtaPanel,
        source: ctaPanelSource,
        layout: "full",
        minHeight: 460,
    },
    {
        id: "waitlist-launch",
        title: "Waitlist with countdown",
        description: "A pre-launch section with a live countdown, a validated email form and a confirmation state. Use it before a product or beta launch.",
        component: WaitlistLaunch,
        source: waitlistLaunchSource,
        layout: "full",
        minHeight: 620,
    },
    {
        id: "split-product-preview",
        title: "Split CTA with product preview",
        description: "A two-column call to action with a live-built app window that tilts toward the pointer and a floating notification. Use it to close a product page with a clear look at the product.",
        component: SplitProductPreview,
        source: splitProductPreviewSource,
        layout: "full",
        minHeight: 640,
    },
    {
        id: "spotlight-border-cta",
        title: "Spotlight card with animated border",
        description: "A centered card with a rotating gradient border, a pointer spotlight, two actions and three proof points. Use it as the final push on a migration or sales page.",
        component: SpotlightBorderCta,
        source: spotlightBorderCtaSource,
        layout: "full",
        minHeight: 620,
    },
    {
        id: "newsletter-topics",
        title: "Newsletter signup with topic picker",
        description: "A newsletter banner where readers choose topics before subscribing, with validation, loading and confirmation states and a list of recent issues. Use it on blogs and resource hubs.",
        component: NewsletterTopics,
        source: newsletterTopicsSource,
        layout: "full",
        minHeight: 620,
    },
    {
        id: "app-download",
        title: "App download with store badges and QR code",
        description: "A mobile app promotion with store badges, a phone mockup with animated stats and a desktop hand-off that offers a QR code or a text message link. Use it on the landing page of a mobile app.",
        component: AppDownload,
        source: appDownloadSource,
        layout: "full",
        minHeight: 760,
    },
    {
        id: "event-registration",
        title: "Event registration with sessions",
        description: "A workshop signup with a date tile, agenda, session picker with seats left, a validated form and an add to calendar confirmation. Use it for webinars and live events.",
        component: EventRegistration,
        source: eventRegistrationSource,
        layout: "full",
        minHeight: 820,
    },
    {
        id: "sticky-bottom-banner",
        title: "Sticky bottom banner on a blog post",
        description: "A dismissible subscribe banner that slides up once a reader is a third of the way through a post, with a reading progress bar. Use it on long articles.",
        component: StickyBottomBanner,
        source: stickyBottomBannerSource,
        layout: "full",
        minHeight: 700,
    },
];

export default examples;
