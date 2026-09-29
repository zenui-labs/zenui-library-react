import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {NewsletterColumnsFooter, type FooterColumn, type SocialLink} from "./NewsletterColumnsFooter";

const columns: FooterColumn[] = [
    {
        title: "Services",
        links: [
            {label: "UI components", href: "#"},
            {label: "Website templates", href: "#"},
            {label: "Icons", href: "#"},
            {label: "Opacity palette", href: "#"},
            {label: "Blocks", href: "#"},
        ],
    },
    {
        title: "Company",
        links: [
            {label: "Service", href: "#"},
            {label: "Features", href: "#"},
            {label: "Our team", href: "#"},
            {label: "Portfolio", href: "#"},
            {label: "Blog", href: "#"},
            {label: "Contact us", href: "#"},
        ],
    },
    {
        title: "Our social media",
        links: [
            {label: "Dribbble", href: "#"},
            {label: "Behance", href: "#"},
            {label: "Medium", href: "#"},
            {label: "Instagram", href: "#"},
            {label: "Facebook", href: "#"},
            {label: "Twitter", href: "#"},
        ],
    },
];

const socialLinks: SocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const NewsletterColumnsFooterExample = () => (
    <div className="p-8">
        <NewsletterColumnsFooter
            columns={columns}
            logo={{src: "https://i.ibb.co/ZHYQ04D/footer-logo.png", alt: "ZenUI"}}
            copyright={`© ${new Date().getFullYear()} ZenUI Library. All rights reserved.`}
            socialLinks={socialLinks}
        />
    </div>
);

export default NewsletterColumnsFooterExample;
