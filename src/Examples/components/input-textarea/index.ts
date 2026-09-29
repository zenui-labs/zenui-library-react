import type {Example} from "../../types.ts";
import LabeledTextarea from "./LabeledTextarea.example.tsx";
import labeledTextareaSource from "./LabeledTextarea.example.tsx?raw";
import labeledTextareaComponentSource from "./LabeledTextarea.tsx?raw";
import FilledTextarea from "./FilledTextarea.example.tsx";
import filledTextareaSource from "./FilledTextarea.example.tsx?raw";
import filledTextareaComponentSource from "./FilledTextarea.tsx?raw";
import FloatingLabelTextarea from "./FloatingLabelTextarea.example.tsx";
import floatingLabelTextareaSource from "./FloatingLabelTextarea.example.tsx?raw";
import floatingLabelTextareaComponentSource from "./FloatingLabelTextarea.tsx?raw";

const examples: Example[] = [
    {
        id: "required_textarea",
        title: "Required textarea",
        description: "A textarea with a visible label and a required marker, for fields that cannot be left empty.",
        component: LabeledTextarea,
        source: labeledTextareaSource,
        files: [{name: "LabeledTextarea.tsx", source: labeledTextareaComponentSource}],
        minHeight: 360,
    },
    {
        id: "background_textarea",
        title: "Background textarea",
        description: "A textarea with a filled background color that sets it apart from the page.",
        component: FilledTextarea,
        source: filledTextareaSource,
        files: [{name: "FilledTextarea.tsx", source: filledTextareaComponentSource}],
    },
    {
        id: "animate_label_textarea",
        title: "Animated label textarea",
        description: "A textarea whose label moves above the field when it gets focus or has a value.",
        component: FloatingLabelTextarea,
        source: floatingLabelTextareaSource,
        files: [{name: "FloatingLabelTextarea.tsx", source: floatingLabelTextareaComponentSource}],
        minHeight: 360,
    },
];

export default examples;
