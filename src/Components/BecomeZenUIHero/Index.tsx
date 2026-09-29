import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {LuArrowRight, LuGithub} from "react-icons/lu";

import {Callout, DocsSection} from "@shared/DocsProse.tsx";
import {OnThisPage} from "@/Components/Home/PrivacyPolicy.tsx";
import {DISCORD_URL} from "@/Components/Home/Navbar.tsx";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.ts";

const REPO_URL = "https://github.com/Asfak00/zenui-library";
const CODE_OF_CONDUCT_URL = `${REPO_URL}/blob/production/CODE_OF_CONDUCT.md`;
const FACEBOOK_URL = "https://web.facebook.com/zenuilabs";
const BADGE_URL = "https://i.ibb.co.com/8dfDxXz/best-contributor-badge.png";

const toc = [
    {id: "what-is-a-zenui-hero", title: "What a ZenUI Hero is"},
    {id: "how-to-become-a-hero", title: "How to become one"},
    {id: "eligibility", title: "Eligibility"},
    {id: "benefits", title: "Benefits"},
    {id: "tips", title: "Tips"},
    {id: "getting-help", title: "Getting help"},
];

const SECTION_IDS = toc.map((item) => item.id);

const listClass = "flex list-disc flex-col gap-2.5 pl-5 marker:text-ink-subtle";
const subheading = "mt-3 text-[1rem] font-semibold tracking-heading text-ink";

const BecomeZenUIHero = () => {
    const active = useScrollSpy(SECTION_IDS, 96);

    return (
        <div className="shell pb-24 pt-10">
            <div className="1260px:grid 1260px:grid-cols-[minmax(0,1fr)_208px] 1260px:gap-16">
                <div className="min-w-0">
                    <header className="max-w-[72ch]">
                        <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                            Become a ZenUI Hero
                        </h1>
                        <p className="mt-4 max-w-[60ch] text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
                            ZenUI Heroes are contributors whose work has made a real difference to ZenUI Library and its
                            community. This guide explains how the title is earned, who can qualify and what comes with it.
                        </p>
                    </header>

                    <figure className="mt-10 max-w-[72ch] overflow-hidden rounded-shell border border-hairline bg-raised">
                        <img
                            src="https://i.ibb.co.com/LtKGtCS/become-zenui-hero-poster.png"
                            alt="Become a ZenUI Hero poster"
                            loading="lazy"
                            className="block w-full"
                        />
                    </figure>

                    <DocsSection id="what-is-a-zenui-hero" title="What a ZenUI Hero is">
                        <div className="flex items-start gap-4">
                            <img src={BADGE_URL} alt="ZenUI Hero badge" loading="lazy" className="size-14 shrink-0 object-contain"/>
                            <p>
                                <b>ZenUI Hero</b> is a title for contributors who go well beyond a single pull request.
                                They help ZenUI grow, fix critical issues or make large contributions to the library. The
                                title recognizes your skill, your commitment and what you add to the community.
                            </p>
                        </div>
                    </DocsSection>

                    <DocsSection id="how-to-become-a-hero" title="How to become a ZenUI Hero">
                        <p>There are two ways to earn the badge.</p>

                        <h3 className={subheading}>1. Solve a critical issue</h3>
                        <p>A critical issue is a problem that:</p>
                        <ul className={listClass}>
                            <li>Breaks the <b>user experience</b>, for example navigation or features that stop working as expected.</li>
                            <li>Makes ZenUI Library hard to use or stops it from working.</li>
                            <li>Risks <b>data loss</b> or a <b>major system failure</b>.</li>
                        </ul>
                        <Callout title="Example">
                            Fixing a bug that breaks the whole layout when components are resized.
                        </Callout>

                        <h3 className={subheading}>2. Make significant contributions</h3>
                        <p>If you haven't fixed a critical issue, you can still earn the badge through large contributions. That means:</p>
                        <ul className={listClass}>
                            <li>
                                Submitting <b>10 to 20 or more meaningful contributions</b> to the library. If you fixed an
                                issue that is especially important for ZenUI Library, that can be enough on its own.
                            </li>
                            <li>Contributions can include bug fixes, new features, performance improvements or better documentation.</li>
                        </ul>
                        <Callout tone="tip" title="Tip">
                            Consistency matters. Bring the same care and quality to every contribution.
                        </Callout>
                    </DocsSection>

                    <DocsSection id="eligibility" title="Eligibility">
                        <ul className={listClass}>
                            <li>
                                Follow ZenUI's <a href={CODE_OF_CONDUCT_URL} target="_blank" rel="noreferrer">code of conduct</a> and
                                respect the community guidelines.
                            </li>
                            <li>
                                Your contributions should fit ZenUI Library's <b>mission</b>: high-quality UI components and templates.
                            </li>
                            <li>
                                Contribute through the official <a href={REPO_URL} target="_blank" rel="noreferrer">ZenUI Library GitHub repository</a>.
                            </li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="benefits" title="Benefits">
                        <p>As a ZenUI Hero, you get:</p>

                        <h3 className={subheading}>Recognition</h3>
                        <ul className={listClass}>
                            <li>
                                Your name and profile on the ZenUI Heroes wall of fame, on the
                                site's <Link to="/contributors">contributors page</Link>.
                            </li>
                            <li>A ZenUI Hero badge on your profile.</li>
                        </ul>

                        <h3 className={subheading}>Perks</h3>
                        <ul className={listClass}>
                            <li>Early access to ZenUI beta features and updates.</li>
                            <li>Priority support from the core team.</li>
                            <li>Exclusive invitations to ZenUI events and contests.</li>
                        </ul>

                        <h3 className={subheading}>Networking</h3>
                        <ul className={listClass}>
                            <li>Connect with developers from around the world.</li>
                            <li>Get noticed in the industry and strengthen your portfolio.</li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="tips" title="Tips">
                        <ul className={listClass}>
                            <li>Focus on quality over quantity, even when you make many contributions.</li>
                            <li>Stay active in discussions on the community channels.</li>
                            <li>Describe your fixes and features in detail.</li>
                            <li>Work with other contributors on complex issues.</li>
                        </ul>
                    </DocsSection>

                    <DocsSection id="getting-help" title="Getting help">
                        <p>If you have questions or need guidance, reach out on:</p>
                        <ul className={listClass}>
                            <li>
                                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>, to join the conversation
                                in the ZenUI community.
                            </li>
                            <li>
                                <a href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a>, to contact the core team for support.
                            </li>
                        </ul>
                    </DocsSection>

                    <section className="panel mt-14 max-w-[72ch] p-6 640px:p-7">
                        <h2 className="text-[1.15rem] font-semibold tracking-heading text-ink">Start contributing</h2>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                            We look forward to your contributions and to welcoming the next ZenUI Hero. Pick an open issue on
                            GitHub, or see who has contributed so far.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer" className="btn-primary">
                                <LuGithub className="size-4"/>
                                Browse open issues
                            </a>
                            <Link to="/contributors" className="btn-ghost">
                                See contributors
                                <LuArrowRight className="size-4"/>
                            </Link>
                        </div>
                    </section>
                </div>

                <OnThisPage items={toc} active={active}/>
            </div>

            <Helmet>
                <title>Become a ZenUI Hero | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default BecomeZenUIHero;
