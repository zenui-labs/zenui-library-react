import type {Example} from "../../types.ts";
import BlurStaggeredDropdown from "./BlurStaggeredDropdown.example.tsx";
import blurStaggeredDropdownSource from "./BlurStaggeredDropdown.example.tsx?raw";
import blurStaggeredDropdownComponentSource from "./BlurStaggeredDropdown.tsx?raw";
import YAxisStaggeredDropdown from "./YAxisStaggeredDropdown.example.tsx";
import yAxisStaggeredDropdownSource from "./YAxisStaggeredDropdown.example.tsx?raw";
import yAxisStaggeredDropdownComponentSource from "./YAxisStaggeredDropdown.tsx?raw";

const examples: Example[] = [
    {
        id: "blur-staggered-animation",
        title: "Blur staggered animation",
        description: "A dropdown whose items fade in and come into focus from a blur, one after another.",
        component: BlurStaggeredDropdown,
        source: blurStaggeredDropdownSource,
        files: [{name: "BlurStaggeredDropdown.tsx", source: blurStaggeredDropdownComponentSource}],
        minHeight: 520,
    },
    {
        id: "y-axis-staggered-animation",
        title: "Y axis staggered animation",
        description: "A dropdown that opens first and then drops its items into place from above, one after another.",
        component: YAxisStaggeredDropdown,
        source: yAxisStaggeredDropdownSource,
        files: [{name: "YAxisStaggeredDropdown.tsx", source: yAxisStaggeredDropdownComponentSource}],
        minHeight: 520,
    },
];

export default examples;
