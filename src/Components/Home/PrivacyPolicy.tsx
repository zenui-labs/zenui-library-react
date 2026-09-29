import {Helmet} from "react-helmet";

import {DocsSection} from "@shared/DocsProse.tsx";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.ts";
import {cn} from "@utils/Style.ts";

const CONTACT_EMAIL = "zenuilibrary@gmail.com";

const toc = [
    {id: "information-we-collect", title: "Information we collect"},
    {id: "how-we-use-your-information", title: "How we use your information"},
    {id: "sharing-your-information", title: "Sharing your information"},
    {id: "data-security", title: "Data security"},
    {id: "your-rights", title: "Your rights"},
    {id: "third-party-links", title: "Third-party links"},
    {id: "changes-to-this-policy", title: "Changes to this policy"},
    {id: "contact-us", title: "Contact us"},
];

const SECTION_IDS = toc.map((item) => item.id);

const listClass = "flex list-disc flex-col gap-2.5 pl-5 marker:text-ink-subtle";

export const OnThisPage = ({items, active}) => (
    <nav aria-label="On this page" className="sticky top-24 hidden self-start 1260px:block">
        <p className="eyebrow">On this page</p>
        <ul className="mt-3 flex flex-col border-l border-hairline">
            {items.map((item) => (
                <li key={item.id}>
                    <a
                        href={`#${item.id}`}
                        className={cn(
                            "-ml-px block border-l py-1.5 pl-3.5 text-[0.82rem] leading-snug transition-colors",
                            active === item.id
                                ? "border-ink font-medium text-ink"
                                : "border-transparent text-ink-subtle hover:border-hairline-strong hover:text-ink-muted"
                        )}
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

const PrivacyPolicy = () => {
    const year = new Date().getFullYear();
    const active = useScrollSpy(SECTION_IDS, 96);

    return (
        <div className="shell pb-24 pt-10">
            <div className="1260px:grid 1260px:grid-cols-[minmax(0,1fr)_208px] 1260px:gap-16">
                <div className="min-w-0">
                    <header className="max-w-[72ch]">
                        <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                            Privacy policy
                        </h1>
                        <p className="mt-3 text-[0.88rem] text-ink-subtle">Effective January 1, {year}</p>
                        <p className="mt-5 max-w-[60ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
                            Welcome to ZenUI Library React. Your privacy is important to us. This privacy policy explains
                            how we collect, use and protect your personal information when you use our services, including
                            our website, UI component library and prebuilt templates.
                        </p>
                    </header>

                    <DocsSection id="information-we-collect" title="1. Information we collect">
                        <ul className={listClass}>
                            <li>
                                <b>Personal information.</b> When you register or interact with our services, we may
                                collect personal information such as your name, email address and payment information.
                            </li>
                            <li>
                                <b>Usage data.</b> We collect data about how you use our services, including the pages you
                                visit, the features you use and the actions you take.
                            </li>
                            <li>
                                <b>Device information.</b> We collect information about the device you use to access our
                                services, including your IP address, browser type and operating system.
                            </li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="how-we-use-your-information" title="2. How we use your information">
                        <ul className={listClass}>
                            <li>
                                <b>To provide and improve our services.</b> We use your information to deliver, maintain and
                                improve our services, including customizing your experience and responding to your
                                inquiries.
                            </li>
                            <li>
                                <b>To communicate with you.</b> We may use your information to send you updates, newsletters
                                and other communications related to our services.
                            </li>
                            <li>
                                <b>For security and compliance.</b> We use your information to keep our services secure and
                                to comply with legal obligations.
                            </li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="sharing-your-information" title="3. Sharing your information">
                        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                        <ul className={listClass}>
                            <li>
                                <b>Service providers.</b> Third parties that provide services on our behalf, such as payment
                                processing and data analysis.
                            </li>
                            <li>
                                <b>Legal requirements.</b> When required by law, or to protect our rights and the rights
                                of our users.
                            </li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="data-security" title="4. Data security">
                        <p>
                            We use appropriate technical and organizational measures to protect your personal information
                            against unauthorized access, alteration, disclosure or destruction.
                        </p>
                    </DocsSection>

                    <DocsSection id="your-rights" title="5. Your rights">
                        <p>
                            You have the right to access, correct or delete your personal information. You can also object
                            to the processing of your personal information and withdraw your consent at any time. To
                            exercise these rights, contact us at the email address below.
                        </p>
                    </DocsSection>

                    <DocsSection id="third-party-links" title="6. Third-party links">
                        <p>
                            Our services may contain links to third-party websites. We are not responsible for the privacy
                            practices or content of those sites. We encourage you to read the privacy policy of any linked
                            website you visit.
                        </p>
                    </DocsSection>

                    <DocsSection id="changes-to-this-policy" title="7. Changes to this privacy policy">
                        <p>
                            We may update this privacy policy from time to time. We will notify you of any significant
                            changes by posting the new privacy policy on our website. If you continue to use our services
                            after a change, you accept the updated privacy policy.
                        </p>
                    </DocsSection>

                    <DocsSection id="contact-us" title="8. Contact us">
                        <p>
                            If you have questions or concerns about this privacy policy or our data practices, email us
                            at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                        </p>
                    </DocsSection>

                    <p className="mt-12 max-w-[72ch] border-t border-hairline pt-6 text-[0.92rem] leading-relaxed text-ink-muted">
                        By using ZenUI Library, you agree to the terms in this privacy policy. Thank you for trusting ZenUI
                        with your personal information.
                    </p>
                </div>

                <OnThisPage items={toc} active={active}/>
            </div>

            <Helmet>
                <title>Privacy policy | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default PrivacyPolicy;
