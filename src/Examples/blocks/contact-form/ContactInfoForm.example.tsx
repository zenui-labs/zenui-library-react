import {useState} from "react";
import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineCall, MdOutlineEmail} from "react-icons/md";
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {ContactInfoForm, type ContactDetail, type ContactInfoValues, type ContactSocialLink} from "./ContactInfoForm";

const details: ContactDetail[] = [
    {icon: MdOutlineCall, label: "+8801305282768", href: "tel:+8801305282768"},
    {icon: MdOutlineEmail, label: "zenuilibrary@gmail.com", href: "mailto:zenuilibrary@gmail.com"},
    {icon: IoLocationOutline, label: "Kulaura, Moulvibazar, Sylhet"},
];

const socialLinks: ContactSocialLink[] = [
    {label: "Facebook", href: "#", icon: CgFacebook},
    {label: "Twitter", href: "#", icon: BsTwitter},
    {label: "Instagram", href: "#", icon: BsInstagram},
    {label: "LinkedIn", href: "#", icon: BsLinkedin},
];

const ContactInfoFormExample = () => {
    const [sent, setSent] = useState<ContactInfoValues | null>(null);

    return (
        <div className="p-4 sm:p-8">
            <ContactInfoForm details={details} socialLinks={socialLinks} onSubmit={setSent}/>
            {sent && (
                <p role="status" className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                    Thanks, {sent.firstName}. We will reply to {sent.email}.
                </p>
            )}
        </div>
    );
};

export default ContactInfoFormExample;
