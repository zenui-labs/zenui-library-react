import {useState} from "react";
import {Link} from "react-router-dom";
import {LuArrowRight, LuArrowUpRight, LuCheck, LuMail} from "react-icons/lu";
import {FaFacebook, FaLinkedin} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {FiGithub} from "react-icons/fi";
import {RxDiscordLogo} from "react-icons/rx";

import useZenuiStore from "@/Store/Index.ts";
import SiteLogo from "@shared/SiteLogo.tsx";
import {DISCORD_URL, GITHUB_URL} from "@/Components/Home/Navbar.tsx";
import {cn} from "@utils/Style.ts";

const columns = [
    {
        title: "Library",
        links: [
            {title: "Components", url: "/components/all-components"},
            {title: "Blocks", url: "/blocks/all-blocks"},
            {title: "Animations", url: "/animations/installation"},
            {title: "Templates", url: "/templates"},
            {title: "Installation", url: "/docs/installation"},
        ],
    },
    {
        title: "Tools",
        links: [
            {title: "ShortKey", url: "/shortcut-generator"},
            {title: "Color palette", url: "/color-palette"},
            {title: "Icons", url: "/icons"},
            {title: "Config AI", url: "/config-generator"},
            {title: "Semantic TagMaster", url: "/semantic-tag-master"},
        ],
    },
    {
        title: "Products",
        links: [
            {title: "ZenUI Library Vue", url: "https://vueui.zenui.net/", external: true},
            {title: "React Hooks", url: "https://react-hooks.zenui.net/", external: true},
            {title: "Color Picker", url: "https://color-picker.zenui.net/", external: true},
            {title: "Readme Studio", url: "https://readmestudio.zenui.net/", external: true},
            {title: "ZenUI Image React", url: "https://www.npmjs.com/package/zenui-image-react", external: true},
        ],
    },
    {
        title: "Project",
        links: [
            {title: "Contributors", url: "/contributors"},
            {title: "Become a ZenUI hero", url: "/zenui-hero-docs"},
            {title: "Changelog", url: "https://github.com/Asfak00/zenui-library/releases", external: true},
            {title: "Privacy policy", url: "/privacy-policy"},
        ],
    },
];

const socials = [
    {label: "GitHub", url: GITHUB_URL, icon: FiGithub},
    {label: "Discord", url: DISCORD_URL, icon: RxDiscordLogo},
    {label: "X", url: "https://x.com/zenuilabs", icon: FaXTwitter},
    {label: "LinkedIn", url: "https://www.linkedin.com/company/zenui-labs/", icon: FaLinkedin},
    {label: "Facebook", url: "https://web.facebook.com/zenuilabs", icon: FaFacebook},
    {label: "Email", url: "mailto:zenuilibrary@gmail.com", icon: LuMail},
];

const FooterLink = ({link}) => {
    const className = "group inline-flex items-center gap-1 text-[0.875rem] text-ink-muted transition-colors hover:text-ink";
    if (link.external) {
        return (
            <a href={link.url} target="_blank" rel="noreferrer" className={className}>
                {link.title}
                <LuArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100"/>
            </a>
        );
    }
    return <Link to={link.url} className={className}>{link.title}</Link>;
};

const Newsletter = () => {
    const [status, setStatus] = useState("idle");

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        const formData = new FormData(event.target);
        formData.append("access_key", "a60501d5-436f-454c-9d4f-a716f4d286c7");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {method: "POST", body: formData});
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            event.target.reset();
            setStatus("done");
        } catch {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={onSubmit} className="panel p-5">
            <p className="text-[0.95rem] font-medium text-ink">Release notes by email</p>
            <p className="mt-1 text-[0.85rem] text-ink-subtle">New components and templates, about once a month.</p>
            <div className="mt-4 flex gap-2">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                    id="footer-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="h-10 min-w-0 flex-1 rounded-[10px] border border-hairline bg-canvas px-3 text-[0.875rem] text-ink outline-none placeholder:text-ink-subtle focus:border-hairline-strong"
                />
                <button type="submit" disabled={status === "sending"} className="btn-primary px-3" aria-label="Subscribe">
                    {status === "done" ? <LuCheck className="size-4"/> : <LuArrowRight className="size-4"/>}
                </button>
            </div>
            <p className={cn("mt-2 h-4 text-[0.78rem]", status === "error" ? "text-red-500" : "text-accent-strong")} aria-live="polite">
                {status === "done" && "You're subscribed. Thanks."}
                {status === "error" && "That didn't work. Please try again."}
            </p>
        </form>
    );
};

const Footer = () => {
    const {theme} = useZenuiStore();

    return (
        <footer className="mt-24 border-t border-hairline bg-canvas">
            <div className="shell pt-16">
                <div className="grid grid-cols-1 gap-12 1024px:grid-cols-[1.1fr_2.4fr_1.3fr]">
                    <div>
                        <SiteLogo size="lg"/>
                        <p className="mt-4 max-w-[280px] text-[0.9rem] leading-relaxed text-ink-muted">
                            Free React and Tailwind CSS components. Copy what you need, change what you want.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                            {socials.map(({label, url, icon: Icon}) => (
                                <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} className="icon-btn size-8">
                                    <Icon className="size-[15px]"/>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 640px:grid-cols-4">
                        {columns.map((column) => (
                            <div key={column.title}>
                                <p className="eyebrow">{column.title}</p>
                                <ul className="mt-4 flex flex-col gap-2.5">
                                    {column.links.map((link) => (
                                        <li key={link.title}><FooterLink link={link}/></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <Newsletter/>
                        <a
                            href="https://www.producthunt.com/posts/zenui-library-2?embed=true&utm_source=badge-featured&utm_medium=badge"
                            target="_blank"
                            rel="noreferrer"
                            className="w-fit"
                        >
                            <img
                                src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=490875&theme=${theme === 'dark' ? 'dark' : 'light'}`}
                                alt="ZenUI Library on Product Hunt"
                                width={220}
                                height={48}
                                loading="lazy"
                            />
                        </a>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-hairline py-6 text-[0.8rem] text-ink-subtle 640px:flex-row 640px:items-center 640px:justify-between">
                    <p>© {new Date().getFullYear()} ZenUI Labs. Open source under the MIT license.</p>
                    <p>
                        Built by <a href="https://zenui.net" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-ink">ZenUI Labs</a> and
                        {" "}<Link to="/contributors" className="text-ink-muted hover:text-ink">contributors</Link>.
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
