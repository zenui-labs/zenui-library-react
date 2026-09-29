import {Helmet} from "react-helmet";
import {LuBoxes, LuDownload, LuLayers, LuLayoutTemplate, LuShapes, LuSparkles} from "react-icons/lu";

import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsSection, DocsTitle, LinkCard} from "@shared/DocsProse.tsx";

const included = [
    {to: "/components/all-components", icon: LuBoxes, title: "Components", text: "Inputs, buttons, navigation, feedback, data display and more."},
    {to: "/blocks/all-blocks", icon: LuLayers, title: "Blocks", text: "Larger sections such as navbars, hero areas, pricing tables and footers."},
    {to: "/animations/installation", icon: LuSparkles, title: "Animations", text: "Motion components built with Framer Motion."},
    {to: "/templates", icon: LuLayoutTemplate, title: "Templates", text: "Complete multi-page sites you can clone from GitHub."},
    {to: "/icons", icon: LuShapes, title: "Icons", text: "SVG icons you can resize, recolor and copy as JSX."},
    {to: "/docs/installation", icon: LuDownload, title: "Installation", text: "What your project needs before you paste a component."},
];

const Overview = () => {
    return (
        <div>
            <DocsTitle
                title="Overview"
                lead="ZenUI Library is a free set of React components, page blocks, animations and templates styled with Tailwind CSS. You don't install it. You copy the code for the parts you need into your project and change it however you like."
            />

            <div className="mt-10 grid max-w-[880px] grid-cols-1 gap-3 640px:grid-cols-2 1260px:grid-cols-3">
                {included.map((item) => <LinkCard key={item.title} {...item}/>)}
            </div>

            <DocsSection id="how-it-works" title="How it works">
                <p>
                    Every component page shows a live preview and its source. Use the <b>Light</b> and <b>Dark</b> switch
                    on a preview to check both themes, open the <b>Code</b> tab, and copy the file into your project.
                </p>
                <p>
                    Examples include <code>dark:</code> classes. If your project only has a light theme, turn off
                    <b> Copy with dark:</b> above any example and they are removed from the copied code.
                </p>
            </DocsSection>

            <DocsSection id="why-zenui" title="Why copy instead of install">
                <ul className="flex list-disc flex-col gap-2.5 pl-5 marker:text-ink-subtle">
                    <li><b>You own the code.</b> There is no package version to upgrade and no API to work around.</li>
                    <li><b>Few dependencies.</b> Most components need only React and Tailwind CSS. Some use react-icons or Framer Motion, and their pages say so.</li>
                    <li><b>Easy to change.</b> Styles are Tailwind classes in the markup, so edits happen where you read them.</li>
                    <li><b>TypeScript or JavaScript.</b> Every example is written in strict TypeScript, and you can copy a plain JavaScript version from the same code block.</li>
                    <li><b>Works with your stack.</b> React, Next.js, Vite and other React setups.</li>
                </ul>
            </DocsSection>

            <DocsSection id="other-frameworks" title="Other frameworks">
                <p>
                    Using Vue? <a href="https://vueui.zenui.net/" target="_blank" rel="noreferrer">ZenUI Library Vue</a> has
                    the same components for Vue 3.
                </p>
            </DocsSection>

            <OverviewFooter/>

            <Helmet>
                <title>Overview | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Overview;
