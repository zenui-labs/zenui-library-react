import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {LuArrowUpRight, LuCode2, LuMaximize2, LuMoon, LuSparkles} from "react-icons/lu";
import type {IconType} from "react-icons";

import ContentPageLayout from "@shared/ContentPageLayout.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {Callout, DocsSection, DocsTitle, LinkCard} from "@shared/DocsProse.tsx";
import {examplePages, examplePagePath} from "@/Examples/registry.ts";
import type {ExampleSection} from "@/Examples/types.ts";

const highlights: {icon: IconType; title: string; text: string}[] = [
    {
        icon: LuCode2,
        title: "TypeScript first, JavaScript on request",
        text: "Every example is written in TypeScript. Pick JS above any code block to get the same component with the types removed.",
    },
    {
        icon: LuMaximize2,
        title: "Responsive testing",
        text: "Open any preview full screen and drag its edges, or jump to phone, tablet and desktop widths. Media queries respond for real.",
    },
    {
        icon: LuMoon,
        title: "Stronger light and dark previews",
        text: "Switch a single preview between auto, light and dark, change its background pattern, or replay its animation.",
    },
    {
        icon: LuSparkles,
        title: "A new look",
        text: "The site, docs and tools share one design system. Dark is now the default theme, and your choice is remembered.",
    },
];

const sections: ExampleSection[] = ["Components", "Animations", "Blocks"];

/** Release notes for ZenUI v4. The list of new pages comes from the example registry, so it stays current. */
const WhatsNewPage = () => {
    return (
        <ContentPageLayout>
            <div>
                <DocsTitle
                    title="What's new in v4"
                    lead="ZenUI v4 rebuilds the library around TypeScript, adds new components, animations and blocks, and gives every preview a responsive testing view."
                />

                <div className="mt-8 grid max-w-[880px] grid-cols-1 gap-3 640px:grid-cols-2">
                    {highlights.map(({icon: Icon, title, text}) => (
                        <div key={title} className="rounded-panel border border-hairline bg-surface p-4">
                            <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-canvas text-accent-strong">
                                <Icon className="size-4"/>
                            </span>
                            <p className="mt-4 text-[0.95rem] font-medium text-ink">{title}</p>
                            <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-subtle">{text}</p>
                        </div>
                    ))}
                </div>

                {sections.map((section) => {
                    const pages = examplePages.filter((page) => page.section === section);
                    if (pages.length === 0) return null;
                    return (
                        <div key={section}>
                            <DocsSection id={`new-${section.toLowerCase()}`} title={`New ${section.toLowerCase()}`}>
                                <p>Each page has several variants with a live preview and the full source.</p>
                            </DocsSection>
                            <ul className="mt-4 grid max-w-[880px] grid-cols-1 gap-2 640px:grid-cols-2">
                                {pages.map((page) => (
                                    <li key={page.slug}>
                                        <Link
                                            to={examplePagePath(page)}
                                            className="group flex h-full items-start justify-between gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 transition-colors hover:border-hairline-strong hover:bg-raised/40"
                                        >
                                            <span>
                                                <span className="block text-[0.92rem] font-medium text-ink">{page.title}</span>
                                                <span className="mt-0.5 block text-[0.82rem] leading-relaxed text-ink-subtle">{page.description}</span>
                                            </span>
                                            <LuArrowUpRight className="mt-0.5 size-4 shrink-0 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}

                <DocsSection id="upgrading" title="Upgrading from v3">
                    <p>
                        There is nothing to migrate. ZenUI is not a package, so components you copied from v3 keep
                        working as they are. New examples still target React 18 and Tailwind CSS v3, and they only
                        depend on <code>framer-motion</code> and <code>react-icons</code>.
                    </p>
                    <Callout title="Looking for v3 or v2">
                        Use the version switch next to the logo to open older versions of the docs.
                    </Callout>
                </DocsSection>

                <div className="mt-5 grid max-w-[880px] grid-cols-1 gap-3 640px:grid-cols-2">
                    <LinkCard to="/docs/installation" title="Installation" text="Set up React and Tailwind CSS, then copy your first component."/>
                    <LinkCard to="/components/all-components" title="All components" text="Browse the full library by category."/>
                </div>

                <OverviewFooter/>
            </div>

            <Helmet>
                <title>What's new in v4 | ZenUI Library</title>
            </Helmet>
        </ContentPageLayout>
    );
};

export default WhatsNewPage;
