import {EditableChips} from "./EditableChips";

const keywords: string[] = ["trail running shoes", "waterproof", "wide fit", "vegan leather"];

const EditableChipsExample = () => (
    <EditableChips defaultValue={keywords} description="Shown to search engines for the Ridgeline GTX product page."/>
);

export default EditableChipsExample;
