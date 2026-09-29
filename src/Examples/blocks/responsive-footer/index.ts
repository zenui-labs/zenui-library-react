import type {Example} from "../../types.ts";
import StoreFooter from "./StoreFooter.example.tsx";
import storeFooterSource from "./StoreFooter.example.tsx?raw";
import storeFooterComponentSource from "./StoreFooter.tsx?raw";
import ContactNewsletterFooter from "./ContactNewsletterFooter.example.tsx";
import contactNewsletterFooterSource from "./ContactNewsletterFooter.example.tsx?raw";
import contactNewsletterFooterComponentSource from "./ContactNewsletterFooter.tsx?raw";
import NewsletterColumnsFooter from "./NewsletterColumnsFooter.example.tsx";
import newsletterColumnsFooterSource from "./NewsletterColumnsFooter.example.tsx?raw";
import newsletterColumnsFooterComponentSource from "./NewsletterColumnsFooter.tsx?raw";
import CenteredLinksFooter from "./CenteredLinksFooter.example.tsx";
import centeredLinksFooterSource from "./CenteredLinksFooter.example.tsx?raw";
import centeredLinksFooterComponentSource from "./CenteredLinksFooter.tsx?raw";
import MultiColumnFooter from "./MultiColumnFooter.example.tsx";
import multiColumnFooterSource from "./MultiColumnFooter.example.tsx?raw";
import multiColumnFooterComponentSource from "./MultiColumnFooter.tsx?raw";
import WaveFooter from "./WaveFooter.example.tsx";
import waveFooterSource from "./WaveFooter.example.tsx?raw";
import waveFooterComponentSource from "./WaveFooter.tsx?raw";

const examples: Example[] = [
    {
        id: "responsive_footer_1",
        title: "Responsive footer 1",
        description: "A dark footer with store links, a row of language buttons and social icons. The columns stack on small screens.",
        component: StoreFooter,
        source: storeFooterSource,
        files: [{name: "StoreFooter.tsx", source: storeFooterComponentSource}],
        layout: "full",
        minHeight: 400,
    },
    {
        id: "responsive_footer_2",
        title: "Responsive footer 2",
        description: "A footer with the logo and contact details, three link columns and a newsletter field. The columns stack on small screens.",
        component: ContactNewsletterFooter,
        source: contactNewsletterFooterSource,
        files: [{name: "ContactNewsletterFooter.tsx", source: contactNewsletterFooterComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "responsive_footer_3",
        title: "Responsive footer 3",
        description: "Link columns and a newsletter field above a bottom row with the logo, copyright and social icons.",
        component: NewsletterColumnsFooter,
        source: newsletterColumnsFooterSource,
        files: [{name: "NewsletterColumnsFooter.tsx", source: newsletterColumnsFooterComponentSource}],
        layout: "full",
        minHeight: 480,
    },
    {
        id: "responsive_footer_4",
        title: "Responsive footer 4",
        description: "A compact centered footer with one row of links, social icons and a copyright line.",
        component: CenteredLinksFooter,
        source: centeredLinksFooterSource,
        files: [{name: "CenteredLinksFooter.tsx", source: centeredLinksFooterComponentSource}],
        layout: "full",
        minHeight: 320,
    },
    {
        id: "responsive_footer_5",
        title: "Responsive footer 5",
        description: "A sitemap footer with several link columns, social icons and a row of legal links. Use it on sites with many pages.",
        component: MultiColumnFooter,
        source: multiColumnFooterSource,
        files: [{name: "MultiColumnFooter.tsx", source: multiColumnFooterComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "responsive_footer_6",
        title: "Responsive footer 6",
        description: "A centered footer with the logo, a short description, a contact button and social icons above decorative waves, with a back to top button.",
        component: WaveFooter,
        source: waveFooterSource,
        files: [{name: "WaveFooter.tsx", source: waveFooterComponentSource}],
        layout: "full",
        minHeight: 480,
    },
];

export default examples;
