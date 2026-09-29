import {ContactNewsletterFooter, type FooterColumn} from "./ContactNewsletterFooter";

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

const ContactNewsletterFooterExample = () => (
    <div className="p-8">
        <ContactNewsletterFooter
            logo={{src: "https://i.ibb.co/ZHYQ04D/footer-logo.png", alt: "ZenUI"}}
            address="Kulaura, Moulvibazar, Sylhet"
            email="zenuilibrary@gmail.com"
            phone="+8801305282768"
            columns={columns}
        />
    </div>
);

export default ContactNewsletterFooterExample;
