import type {Example} from "../../types.ts";
import LinkedinReactionTrail from "./LinkedinReactionTrail.example.tsx";
import linkedinReactionTrailSource from "./LinkedinReactionTrail.example.tsx?raw";
import linkedinReactionTrailComponentSource from "./LinkedinReactionTrail.tsx?raw";
import ProfessionalReactionTrail from "./ProfessionalReactionTrail.example.tsx";
import professionalReactionTrailSource from "./ProfessionalReactionTrail.example.tsx?raw";
import professionalReactionTrailComponentSource from "./ProfessionalReactionTrail.tsx?raw";
import MagazineReactionTrail from "./MagazineReactionTrail.example.tsx";
import magazineReactionTrailSource from "./MagazineReactionTrail.example.tsx?raw";
import magazineReactionTrailComponentSource from "./MagazineReactionTrail.tsx?raw";

const examples: Example[] = [
    {
        id: "linkedin-reaction-trail",
        title: "LinkedIn reaction trail",
        description: "A LinkedIn style post whose Like button opens every reaction on hover, so people can pick one with a single click.",
        component: LinkedinReactionTrail,
        source: linkedinReactionTrailSource,
        files: [{name: "LinkedinReactionTrail.tsx", source: linkedinReactionTrailComponentSource}],
        minHeight: 560,
    },
    {
        id: "professional-reaction-trail",
        title: "Professional reaction trail",
        description: "A post card with engagement counts, an animated reaction picker and comment, repost and share actions.",
        component: ProfessionalReactionTrail,
        source: professionalReactionTrailSource,
        files: [{name: "ProfessionalReactionTrail.tsx", source: professionalReactionTrailComponentSource}],
        minHeight: 620,
    },
    {
        id: "magazine-reaction-trail",
        title: "Magazine reaction trail",
        description: "A two-column magazine card with an animated cover on the left, the post on the right and a large reaction button.",
        component: MagazineReactionTrail,
        source: magazineReactionTrailSource,
        files: [{name: "MagazineReactionTrail.tsx", source: magazineReactionTrailComponentSource}],
        minHeight: 620,
    },
];

export default examples;
