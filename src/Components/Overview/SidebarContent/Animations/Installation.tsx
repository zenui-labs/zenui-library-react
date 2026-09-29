import {Helmet} from "react-helmet";

import OverviewFooter from "@shared/OverviewFooter.tsx";
import {Callout, DocsSection, DocsTitle, InstallCommand} from "@shared/DocsProse.tsx";

const Installation = () => {
    return (
        <div>
            <DocsTitle
                title="Installation"
                lead="Animated components use Framer Motion for their transitions. Add it to your project once, then copy any animated example the same way as a regular component."
            />

            <DocsSection id="install" title="Install Framer Motion">
                <p>
                    <a href="https://motion.dev/docs/react-quick-start" target="_blank" rel="noreferrer">Framer Motion</a> is
                    a production-ready animation library for React. The examples import it as <code>framer-motion</code>.
                </p>
            </DocsSection>
            <div className="mt-4 max-w-[72ch]">
                <InstallCommand pkg="framer-motion"/>
            </div>

            <DocsSection id="usage" title="Use a component">
                <p>No other setup is needed. Open an animation page, copy the code and render the component.</p>
                <Callout tone="tip" title="Reduced motion">
                    Wrap your app in <code>&lt;MotionConfig reducedMotion=&quot;user&quot;&gt;</code> so the animations
                    respect the visitor&apos;s system setting.
                </Callout>
            </DocsSection>

            <OverviewFooter/>

            <Helmet>
                <title>Animations installation | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Installation;
