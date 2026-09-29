import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {StoreFooter, type FooterLink, type SocialLink} from "./StoreFooter";

const links: FooterLink[] = [
    {label: "Home", href: "#"},
    {label: "Become a customer", href: "#"},
    {label: "About us", href: "#"},
    {label: "FAQ", href: "#"},
    {label: "Return policy", href: "#"},
    {label: "Contact us", href: "#"},
];

const languages = ["English", "Bengali", "Italian", "Hindi", "Spanish", "French", "German", "Arabic"];

const socialLinks: SocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const legalLinks: FooterLink[] = [
    {label: "Terms of purchase", href: "#"},
    {label: "Security and privacy", href: "#"},
    {label: "Newsletter", href: "#"},
];

const StoreFooterExample = () => (
    <div className="p-8">
        <StoreFooter links={links} languages={languages} socialLinks={socialLinks} legalLinks={legalLinks}/>
    </div>
);

export default StoreFooterExample;
