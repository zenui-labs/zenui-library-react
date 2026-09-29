import {Helmet} from "react-helmet";

import {allComponents} from "@utils/AllComponents";
import CatalogGrid from "@shared/CatalogGrid.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const groups = [
    {id: "input", label: "Form"},
    {id: "button", label: "Buttons"},
    {id: "navigation", label: "Navigation"},
    {id: "surface", label: "Surfaces"},
    {id: "feedback", label: "Feedback"},
    {id: "data_display", label: "Data display"},
];

const AllComponents = () => {
    return (
        <div>
            <DocsTitle
                title="All components"
                lead="Every component in the library. Open one to see its variants in light and dark, then copy the code."
            />

            <CatalogGrid items={allComponents} groups={groups} noun="components"/>

            <OverviewFooter/>

            <Helmet>
                <title>All components | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default AllComponents;
