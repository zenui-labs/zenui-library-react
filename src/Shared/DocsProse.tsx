import {useState} from "react";
import type {ReactNode, ComponentType} from "react";
import {Link} from "react-router-dom";
import {LuArrowUpRight, LuCheck, LuCopy, LuInfo, LuLightbulb} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

// Building blocks for written docs pages (overview, installation and similar).

export const DocsTitle = ({title, lead}: {title: ReactNode; lead?: ReactNode}) => (
    <header className="max-w-[72ch]">
        <h1 className="text-balance text-[2.2rem] font-semibold leading-[1.1] tracking-display text-ink 640px:text-[2.6rem]">{title}</h1>
        {lead && <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-muted">{lead}</p>}
    </header>
);

export const DocsSection = ({id, title, children}: {id?: string; title: ReactNode; children: ReactNode}) => (
    <section className="mt-12 max-w-[72ch]">
        <h2 id={id} className="text-[1.3rem] font-semibold tracking-heading text-ink">{title}</h2>
        <div className="mt-3 flex flex-col gap-4 text-[0.97rem] leading-relaxed text-ink-muted [&_a]:text-ink [&_a]:underline [&_a]:decoration-hairline-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-ink [&_b]:font-medium [&_b]:text-ink [&_code]:rounded-md [&_code]:bg-raised [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-ink">
            {children}
        </div>
    </section>
);

export const Callout = ({tone = "info", title, children}: {tone?: "info" | "tip"; title?: ReactNode; children: ReactNode}) => {
    const Icon = tone === "tip" ? LuLightbulb : LuInfo;
    return (
        <div className={cn(
            "flex gap-3 rounded-xl border p-4 text-[0.92rem] leading-relaxed",
            tone === "tip" ? "border-accent/30 bg-accent/[0.06]" : "border-hairline bg-raised/60"
        )}>
            <Icon className={cn("mt-0.5 size-4 shrink-0", tone === "tip" ? "text-accent-strong" : "text-ink-muted")}/>
            <div className="text-ink-muted">
                {title && <p className="mb-1 font-medium text-ink">{title}</p>}
                {children}
            </div>
        </div>
    );
};

const managers = {
    npm: (pkg) => `npm install ${pkg}`,
    pnpm: (pkg) => `pnpm add ${pkg}`,
    yarn: (pkg) => `yarn add ${pkg}`,
    bun: (pkg) => `bun add ${pkg}`,
};

/** Install command with package manager tabs and a copy button. */
export const InstallCommand = ({pkg}: {pkg: string}) => {
    const [manager, setManager] = useState("npm");
    const [copied, setCopied] = useState(false);
    const command = managers[manager](pkg);

    const copy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b0d12] text-[#e6e9ef]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-2">
                <div className="flex">
                    {Object.keys(managers).map((name) => (
                        <button key={name} onClick={() => setManager(name)}
                                className={cn("h-9 px-3 font-mono text-[0.75rem] transition-colors",
                                    manager === name ? "text-white shadow-[inset_0_-1px_0_white]" : "text-white/45 hover:text-white/80")}>
                            {name}
                        </button>
                    ))}
                </div>
                <button onClick={copy} aria-label="Copy command"
                        className="flex size-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white">
                    {copied ? <LuCheck className="size-3.5 text-emerald-400"/> : <LuCopy className="size-3.5"/>}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[0.85rem]"><span className="select-none text-white/30">$ </span>{command}</pre>
        </div>
    );
};

interface LinkCardProps {
    to?: string;
    href?: string;
    title: string;
    text: string;
    icon?: ComponentType<{className?: string}>;
}

export const LinkCard = ({to, href, title, text, icon: Icon}: LinkCardProps) => {
    const body = (
        <>
            <div className="flex items-center justify-between">
                {Icon ? (
                    <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors group-hover:text-accent-strong">
                        <Icon className="size-4"/>
                    </span>
                ) : <span/>}
                <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
            </div>
            <p className="mt-4 text-[0.95rem] font-medium text-ink">{title}</p>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-subtle">{text}</p>
        </>
    );
    const className = "group block rounded-panel border border-hairline bg-surface p-4 no-underline transition-colors hover:border-hairline-strong hover:bg-raised/40";
    return href
        ? <a href={href} target="_blank" rel="noreferrer" className={className}>{body}</a>
        : <Link to={to} className={className}>{body}</Link>;
};
