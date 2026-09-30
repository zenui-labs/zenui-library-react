import {Helmet} from "react-helmet";

import CatalogGrid from "@shared/CatalogGrid.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const AllComponents = () => {
    return (
        <div>
            <DocsTitle
                title="All components"
                lead="Every component in the library. Open one to see its variants in light and dark, then copy the code."
            />

            <CatalogGrid section="Components" noun="components"/>

            <OverviewFooter/>

            <Helmet>
                <title>All components | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default AllComponents;
