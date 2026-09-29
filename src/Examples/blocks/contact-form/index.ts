import type {Example} from "../../types.ts";
import FloatingLabelContactForm from "./FloatingLabelContactForm.example.tsx";
import floatingLabelContactFormSource from "./FloatingLabelContactForm.example.tsx?raw";
import floatingLabelContactFormComponentSource from "./FloatingLabelContactForm.tsx?raw";
import IllustratedContactForm from "./IllustratedContactForm.example.tsx";
import illustratedContactFormSource from "./IllustratedContactForm.example.tsx?raw";
import illustratedContactFormComponentSource from "./IllustratedContactForm.tsx?raw";
import MapContactForm from "./MapContactForm.example.tsx";
import mapContactFormSource from "./MapContactForm.example.tsx?raw";
import mapContactFormComponentSource from "./MapContactForm.tsx?raw";
import ContactInfoForm from "./ContactInfoForm.example.tsx";
import contactInfoFormSource from "./ContactInfoForm.example.tsx?raw";
import contactInfoFormComponentSource from "./ContactInfoForm.tsx?raw";

const examples: Example[] = [
    {
        id: "contact_form_1",
        title: "Contact form 1",
        description: "A centered form for name, email and message whose labels float above the field on focus. Use it on a simple contact or support page.",
        component: FloatingLabelContactForm,
        source: floatingLabelContactFormSource,
        files: [{name: "FloatingLabelContactForm.tsx", source: floatingLabelContactFormComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "contact_form_3",
        title: "Contact form 2",
        description: "A dark contact card with a gradient button and an illustration beside the form. Use it when the contact section should stand out from the rest of the page.",
        component: IllustratedContactForm,
        source: illustratedContactFormSource,
        files: [{name: "IllustratedContactForm.tsx", source: illustratedContactFormComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "contact_form_4",
        title: "Contact form 3",
        description: "A contact form next to an embedded map. Use it when visitors may also want to find your office or store.",
        component: MapContactForm,
        source: mapContactFormSource,
        files: [{name: "MapContactForm.tsx", source: mapContactFormComponentSource}],
        layout: "full",
        minHeight: 600,
    },
    {
        id: "contact_form_5",
        title: "Contact form 4",
        description: "A form with underlined fields beside a dark panel that lists your phone, email, address and social links. Use it when people should be able to reach you in more than one way.",
        component: ContactInfoForm,
        source: contactInfoFormSource,
        files: [{name: "ContactInfoForm.tsx", source: contactInfoFormComponentSource}],
        layout: "full",
        minHeight: 560,
    },
];

export default examples;
