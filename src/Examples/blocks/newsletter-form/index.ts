import type {Example} from "../../types.ts";
import WeeklyNewsletterSignup from "./WeeklyNewsletterSignup.example.tsx";
import weeklyNewsletterSignupSource from "./WeeklyNewsletterSignup.example.tsx?raw";
import weeklyNewsletterSignupComponentSource from "./WeeklyNewsletterSignup.tsx?raw";
import DiscountNewsletterBanner from "./DiscountNewsletterBanner.example.tsx";
import discountNewsletterBannerSource from "./DiscountNewsletterBanner.example.tsx?raw";
import discountNewsletterBannerComponentSource from "./DiscountNewsletterBanner.tsx?raw";
import CenteredNewsletterForm from "./CenteredNewsletterForm.example.tsx";
import centeredNewsletterFormSource from "./CenteredNewsletterForm.example.tsx?raw";
import centeredNewsletterFormComponentSource from "./CenteredNewsletterForm.tsx?raw";
import MailboxNewsletterSignup from "./MailboxNewsletterSignup.example.tsx";
import mailboxNewsletterSignupSource from "./MailboxNewsletterSignup.example.tsx?raw";
import mailboxNewsletterSignupComponentSource from "./MailboxNewsletterSignup.tsx?raw";
import IconBadgeNewsletter from "./IconBadgeNewsletter.example.tsx";
import iconBadgeNewsletterSource from "./IconBadgeNewsletter.example.tsx?raw";
import iconBadgeNewsletterComponentSource from "./IconBadgeNewsletter.tsx?raw";
import JoinNewsletterSplit from "./JoinNewsletterSplit.example.tsx";
import joinNewsletterSplitSource from "./JoinNewsletterSplit.example.tsx?raw";
import joinNewsletterSplitComponentSource from "./JoinNewsletterSplit.tsx?raw";
import GradientNewsletterBanner from "./GradientNewsletterBanner.example.tsx";
import gradientNewsletterBannerSource from "./GradientNewsletterBanner.example.tsx?raw";
import gradientNewsletterBannerComponentSource from "./GradientNewsletterBanner.tsx?raw";
import LightGradientNewsletter from "./LightGradientNewsletter.example.tsx";
import lightGradientNewsletterSource from "./LightGradientNewsletter.example.tsx?raw";
import lightGradientNewsletterComponentSource from "./LightGradientNewsletter.tsx?raw";

const examples: Example[] = [
    {
        id: "newsletter_form_1",
        title: "Newsletter form 1",
        description: "An illustration next to a large accent title, with an email field and an inline subscribe button below. Use it as a full newsletter section on a blog or landing page.",
        component: WeeklyNewsletterSignup,
        source: weeklyNewsletterSignupSource,
        files: [{name: "WeeklyNewsletterSignup.tsx", source: weeklyNewsletterSignupComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "newsletter_form_2",
        title: "Newsletter form 2",
        description: "A dark banner that offers a discount for subscribing, with decorative shapes hanging over two corners. Use it to turn visitors into subscribers with an incentive.",
        component: DiscountNewsletterBanner,
        source: discountNewsletterBannerSource,
        files: [{name: "DiscountNewsletterBanner.tsx", source: discountNewsletterBannerComponentSource}],
        layout: "full",
        minHeight: 420,
    },
    {
        id: "newsletter_form_3",
        title: "Newsletter form 3",
        description: "A centered title above a pill shaped email field with the button inside it. Use it when the signup needs little room, such as above a footer.",
        component: CenteredNewsletterForm,
        source: centeredNewsletterFormSource,
        files: [{name: "CenteredNewsletterForm.tsx", source: centeredNewsletterFormComponentSource}],
        layout: "full",
        minHeight: 240,
    },
    {
        id: "newsletter_form_4",
        title: "Newsletter form 4",
        description: "An illustration next to a stacked form with a mail icon in the email field and a full width button. Use it as a full newsletter section on a blog or landing page.",
        component: MailboxNewsletterSignup,
        source: mailboxNewsletterSignupSource,
        files: [{name: "MailboxNewsletterSignup.tsx", source: mailboxNewsletterSignupComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "newsletter_form_5",
        title: "Newsletter form 5",
        description: "A dark card with a gradient mail badge on its top edge, a centered title, an inline form and a line of reassurance below.",
        component: IconBadgeNewsletter,
        source: iconBadgeNewsletterSource,
        files: [{name: "IconBadgeNewsletter.tsx", source: iconBadgeNewsletterComponentSource}],
        layout: "full",
        minHeight: 420,
    },
    {
        id: "newsletter_form_6",
        title: "Newsletter form 6",
        description: "An illustration next to a short invitation and a rounded email field with the button attached on the right.",
        component: JoinNewsletterSplit,
        source: joinNewsletterSplitSource,
        files: [{name: "JoinNewsletterSplit.tsx", source: joinNewsletterSplitComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "newsletter_form_7",
        title: "Newsletter form 7",
        description: "A dark violet gradient banner with a large faint mail icon in the corner and a subscribe button that overhangs the email field.",
        component: GradientNewsletterBanner,
        source: gradientNewsletterBannerSource,
        files: [{name: "GradientNewsletterBanner.tsx", source: gradientNewsletterBannerComponentSource}],
        layout: "full",
        minHeight: 440,
    },
    {
        id: "newsletter_form_8",
        title: "Newsletter form 8",
        description: "A light banner that fades to blue, with a large title, a short note and a form whose button overhangs its corner.",
        component: LightGradientNewsletter,
        source: lightGradientNewsletterSource,
        files: [{name: "LightGradientNewsletter.tsx", source: lightGradientNewsletterComponentSource}],
        layout: "full",
        minHeight: 460,
    },
];

export default examples;
