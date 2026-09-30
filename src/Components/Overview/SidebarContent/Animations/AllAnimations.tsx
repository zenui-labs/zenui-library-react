import {Helmet} from "react-helmet";

import CatalogGrid from "@shared/CatalogGrid.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const AllAnimations = () => {
    return (
        <div>
            <DocsTitle
                title="All animations"
                lead="Every animated component in the library, from cards and cursors to physics and retro displays. Each one respects reduced motion."
            />

            <CatalogGrid section="Animations" noun="animations"/>

            <OverviewFooter/>

            <Helmet>
                <title>All animations | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default AllAnimations;
