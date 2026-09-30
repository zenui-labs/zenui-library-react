import {HangingTags, type HangingTag} from "./HangingTags";

const badges: HangingTag[] = [
    {id: "ines", firstName: "Inês", lastName: "Carvalho", company: "Typeform", role: "Speaker", code: "SPK-014", tone: "accent"},
    {id: "tomas", firstName: "Tomás", lastName: "Reyes", company: "Linear", role: "Attendee", code: "A-2291"},
    {id: "hana", firstName: "Hana", lastName: "Okafor", company: "Figma", role: "Speaker", code: "SPK-022", tone: "accent"},
    {id: "leo", firstName: "Leo", lastName: "Brandt", company: "Fieldwork crew", role: "Staff", code: "ST-007", tone: "ink"},
    {id: "maya", firstName: "Maya", lastName: "Lindqvist", company: "Spotify", role: "Attendee", code: "A-2318"},
];

const HangingTagsExample = () => (
    <HangingTags
        tags={badges}
        event="Fieldwork 26"
        eventDetail="Lisbon · 14–16 Oct"
        railLabel="Badge pickup · Hall B · A–L"
    />
);

export default HangingTagsExample;
