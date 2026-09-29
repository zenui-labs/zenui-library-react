import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {WaveFooter, type SocialLink} from "./WaveFooter";

const socialLinks: SocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const WaveFooterExample = () => (
    <div className="p-8">
        <WaveFooter
            logo={{src: "https://i.ibb.co/ZHYQ04D/footer-logo.png", alt: "ZenUI"}}
            description="High level experience in web design and development knowledge, producing quality work."
            socialLinks={socialLinks}
            copyright={`© ${new Date().getFullYear()} All rights reserved.`}
            contactHref="#"
        />
    </div>
);

export default WaveFooterExample;
