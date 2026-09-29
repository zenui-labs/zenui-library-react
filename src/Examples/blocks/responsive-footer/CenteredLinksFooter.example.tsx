import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {CenteredLinksFooter, type FooterLink, type SocialLink} from "./CenteredLinksFooter";

const links: FooterLink[] = [
    {label: "Service", href: "#"},
    {label: "Features", href: "#"},
    {label: "Our team", href: "#"},
    {label: "Portfolio", href: "#"},
    {label: "Blog", href: "#"},
    {label: "Contact us", href: "#"},
];

const socialLinks: SocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const CenteredLinksFooterExample = () => (
    <div className="p-8">
        <CenteredLinksFooter
            links={links}
            socialLinks={socialLinks}
            copyright={`© ${new Date().getFullYear()} ZenUI Library. All rights reserved.`}
        />
    </div>
);

export default CenteredLinksFooterExample;
