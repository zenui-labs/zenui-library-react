import {Helmet} from "react-helmet";
import {BiLogoTailwindCss} from "react-icons/bi";
import {FaReact} from "react-icons/fa";
import {TbBrandNextjs} from "react-icons/tb";

import OverviewFooter from "@shared/OverviewFooter.tsx";
import {Callout, DocsSection, DocsTitle, InstallCommand, LinkCard} from "@shared/DocsProse.tsx";

const guides = [
    {href: "https://v3.tailwindcss.com/docs/installation", icon: BiLogoTailwindCss, title: "Tailwind CSS", text: "Add Tailwind CSS to any project."},
    {href: "https://v3.tailwindcss.com/docs/guides/vite", icon: FaReact, title: "React with Vite", text: "Set up React and Tailwind CSS with Vite."},
    {href: "https://v3.tailwindcss.com/docs/guides/nextjs", icon: TbBrandNextjs, title: "Next.js", text: "Set up Tailwind CSS in a Next.js app."},
];

const Installation = () => {
    return (
        <div>
            <DocsTitle
                title="Installation"
                lead="There is no ZenUI package to install. Components are plain React and Tailwind CSS, so once your project has both, you can paste any example into it."
            />

            <DocsSection id="requirements" title="1. Set up React and Tailwind CSS">
                <p>
                    Start from a React project that already has Tailwind CSS v3 configured. If you are starting fresh,
                    follow one of these guides.
                </p>
            </DocsSection>
            <div className="mt-5 grid max-w-[880px] grid-cols-1 gap-3 640px:grid-cols-3">
                {guides.map((guide) => <LinkCard key={guide.title} {...guide}/>)}
            </div>

            <DocsSection id="icons" title="2. Add react-icons">
                <p>Many examples use icons from react-icons. Install it once and every example that uses an icon will work.</p>
            </DocsSection>
            <div className="mt-4 max-w-[72ch]">
                <InstallCommand pkg="react-icons"/>
            </div>

            <DocsSection id="copy" title="3. Copy a component">
                <p>
                    Open any component page, switch the example to <b>Code</b>, and copy it. Save it as a file such as
                    <code>Button.tsx</code> and import it where you need it.
                </p>
                <p>
                    Every example comes in two files. The first is the component, which takes your data as props.
                    <b>Usage.tsx</b> shows it with sample data, so you can see which props to pass.
                </p>
                <p>
                    Every example is written in TypeScript. Choose <b>JS</b> above the code to get the same component as
                    plain JavaScript, generated from the TypeScript source with the types removed. Your choice is
                    remembered on every page.
                </p>
                <Callout tone="tip" title="Next.js App Router">
                    Components that use state or effects need <code>&quot;use client&quot;</code> at the top of the file.
                </Callout>
            </DocsSection>

            <DocsSection id="dark-mode" title="Dark mode">
                <p>
                    Examples style their dark variant with Tailwind&apos;s <code>dark:</code> classes. Set
                    <code>darkMode: &quot;class&quot;</code> in <code>tailwind.config.js</code> and toggle a <code>dark</code> class
                    on <code>&lt;html&gt;</code>, or turn off <b>Copy with dark:</b> to leave those classes out.
                </p>
            </DocsSection>

            <OverviewFooter/>

            <Helmet>
                <title>Installation | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Installation;
