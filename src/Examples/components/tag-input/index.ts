import type {Example} from "../../types.ts";
import TagInput from "./TagInput.example.tsx";
import tagInputSource from "./TagInput.example.tsx?raw";
import tagInputComponentSource from "./TagInput.tsx?raw";
import EmailRecipients from "./EmailRecipients.example.tsx";
import emailRecipientsSource from "./EmailRecipients.example.tsx?raw";
import emailRecipientsComponentSource from "./EmailRecipients.tsx?raw";
import CreatableTags from "./CreatableTags.example.tsx";
import creatableTagsSource from "./CreatableTags.example.tsx?raw";
import creatableTagsComponentSource from "./CreatableTags.tsx?raw";
import EditableChips from "./EditableChips.example.tsx";
import editableChipsSource from "./EditableChips.example.tsx?raw";
import editableChipsComponentSource from "./EditableChips.tsx?raw";
import LabelPicker from "./LabelPicker.example.tsx";
import labelPickerSource from "./LabelPicker.example.tsx?raw";
import labelPickerComponentSource from "./LabelPicker.tsx?raw";
import FilterTokens from "./FilterTokens.example.tsx";
import filterTokensSource from "./FilterTokens.example.tsx?raw";
import filterTokensComponentSource from "./FilterTokens.tsx?raw";
import MultiSelect from "./MultiSelect.example.tsx";
import multiSelectSource from "./MultiSelect.example.tsx?raw";
import multiSelectComponentSource from "./MultiSelect.tsx?raw";

const examples: Example[] = [
    {
        id: "tag-input",
        title: "Tag input",
        description: "Type and press Enter or comma to add tags, with suggestions as you type. Pasting a comma separated list adds each item.",
        component: TagInput,
        source: tagInputSource,
        files: [{name: "TagInput.tsx", source: tagInputComponentSource}],
        minHeight: 380,
    },
    {
        id: "email-recipients",
        title: "Email recipients",
        description: "A To and Cc field that suggests contacts, accepts pasted address lists and marks invalid or external addresses. Click a flagged address to fix it.",
        component: EmailRecipients,
        source: emailRecipientsSource,
        files: [{name: "EmailRecipients.tsx", source: emailRecipientsComponentSource}],
        minHeight: 420,
    },
    {
        id: "creatable-tags",
        title: "Tags with counts",
        description: "A blog tag field that lists popular tags with their post counts and offers to create a new tag when nothing matches.",
        component: CreatableTags,
        source: creatableTagsSource,
        files: [{name: "CreatableTags.tsx", source: creatableTagsComponentSource}],
        minHeight: 460,
    },
    {
        id: "editable-chips",
        title: "Editable chips",
        description: "Keywords you can click to edit in place. Arrow keys move between chips, Enter edits and Delete removes, with duplicate and length checks.",
        component: EditableChips,
        source: editableChipsSource,
        files: [{name: "EditableChips.tsx", source: editableChipsComponentSource}],
        minHeight: 340,
    },
    {
        id: "label-picker",
        title: "Label picker",
        description: "An issue sidebar that applies colored labels from a filterable popover. Typing a new name lets you pick a color and create the label.",
        component: LabelPicker,
        source: labelPickerSource,
        files: [{name: "LabelPicker.tsx", source: labelPickerComponentSource}],
        minHeight: 520,
    },
    {
        id: "filter-tokens",
        title: "Filter tokens",
        description: "A query bar that turns field:value text into filter tokens. Click is to switch it to is not, and the list below updates as you filter.",
        component: FilterTokens,
        source: filterTokensSource,
        files: [{name: "FilterTokens.tsx", source: filterTokensComponentSource}],
        minHeight: 480,
    },
    {
        id: "multi-select",
        title: "Multi-select",
        description: "A searchable picker that keeps its list open while you check several people. Selected names show as chips in the field.",
        component: MultiSelect,
        source: multiSelectSource,
        files: [{name: "MultiSelect.tsx", source: multiSelectComponentSource}],
        minHeight: 440,
    },
];

export default examples;
