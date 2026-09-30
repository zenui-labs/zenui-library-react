import {EclipseHero} from "./EclipseHero";

const EclipseHeroExample = () => (
    <EclipseHero
        eyebrow="Umbra Expeditions · Luxor, 2 August 2027"
        headline="Six minutes and twenty-three seconds of night."
        description="The longest totality over land until 2114. Twelve travellers, two astronomers and a camp on the Nile set up on the centre line, with a cloud-free record of 97% for early August."
        primaryAction={{label: "Reserve a place", href: "#reserve"}}
        secondaryAction={{label: "See the itinerary", href: "#itinerary"}}
        details={[
            {value: "6m 23s", label: "Totality"},
            {value: "9 of 12", label: "Places left"},
            {value: "£4,850", label: "From, 8 nights"},
        ]}
    />
);

export default EclipseHeroExample;
