import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {MultiColumnFooter, type FooterColumn, type FooterLink, type SocialLink} from "./MultiColumnFooter";

const columns: FooterColumn[] = [
    {
        title: "About the store",
        links: [
            {label: "Home", href: "#"},
            {label: "Become a customer", href: "#"},
            {label: "About us", href: "#"},
            {label: "FAQ", href: "#"},
            {label: "Return policy", href: "#"},
            {label: "Contact us", href: "#"},
        ],
    },
    {
        title: "Use cases",
        links: [
            {label: "Use cases", href: "#"},
            {label: "Web designers", href: "#"},
            {label: "Marketers", href: "#"},
            {label: "Small business", href: "#"},
            {label: "Website builder", href: "#"},
        ],
    },
    {
        title: "Resources",
        links: [
            {label: "Resources", href: "#"},
            {label: "Academy", href: "#"},
            {label: "Blog", href: "#"},
            {label: "Themes", href: "#"},
            {label: "Hosting", href: "#"},
            {label: "Developers", href: "#"},
            {label: "Support", href: "#"},
        ],
    },
    {
        title: "Company",
        links: [
            {label: "About us", href: "#"},
            {label: "Careers", href: "#"},
            {label: "FAQs", href: "#"},
            {label: "Teams", href: "#"},
            {label: "Contact us", href: "#"},
        ],
    },
];

const socialLinks: SocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const legalLinks: FooterLink[] = [
    {label: "Privacy policy", href: "#"},
    {label: "Terms of use", href: "#"},
    {label: "Sales and refunds", href: "#"},
    {label: "Legal", href: "#"},
    {label: "Site map", href: "#"},
];

const MultiColumnFooterExample = () => (
    <div className="p-8">
        <MultiColumnFooter
            columns={columns}
            socialLinks={socialLinks}
            legalLinks={legalLinks}
            copyright={`© ${new Date().getFullYear()} All rights reserved.`}
        />
    </div>
);

export default MultiColumnFooterExample;
