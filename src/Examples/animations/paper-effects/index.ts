import type {Example} from "../../types.ts";
import PeelSticker from "./PeelSticker.example.tsx";
import peelStickerSource from "./PeelSticker.example.tsx?raw";
import peelStickerComponentSource from "./PeelSticker.tsx?raw";
import EnvelopeReveal from "./EnvelopeReveal.example.tsx";
import envelopeRevealSource from "./EnvelopeReveal.example.tsx?raw";
import envelopeRevealComponentSource from "./EnvelopeReveal.tsx?raw";
import ScratchCard from "./ScratchCard.example.tsx";
import scratchCardSource from "./ScratchCard.example.tsx?raw";
import scratchCardComponentSource from "./ScratchCard.tsx?raw";
import TearTicket from "./TearTicket.example.tsx";
import tearTicketSource from "./TearTicket.example.tsx?raw";
import tearTicketComponentSource from "./TearTicket.tsx?raw";
import PolaroidDevelop from "./PolaroidDevelop.example.tsx";
import polaroidDevelopSource from "./PolaroidDevelop.example.tsx?raw";
import polaroidDevelopComponentSource from "./PolaroidDevelop.tsx?raw";

const examples: Example[] = [
    {
        id: "peel-sticker",
        title: "Peel-off sticker",
        description: "A die-cut sticker you peel from its lifted corner to find a discount code printed underneath. The fold follows the pointer and shows the paper backing. A button peels it for keyboard users, and reduced motion skips the animation.",
        component: PeelSticker,
        source: peelStickerSource,
        files: [{name: "PeelSticker.tsx", source: peelStickerComponentSource}],
        minHeight: 420,
    },
    {
        id: "envelope-reveal",
        title: "Envelope invitation",
        description: "A lined envelope whose wax seal cracks before the flap swings open in 3D and the card slides out towards you. Use it for invitations and announcements. It opens with a button, and reduced motion swaps the sequence for a fade.",
        component: EnvelopeReveal,
        source: envelopeRevealSource,
        files: [{name: "EnvelopeReveal.tsx", source: envelopeRevealComponentSource}],
        minHeight: 560,
    },
    {
        id: "scratch-card",
        title: "Scratch-off gift card",
        description: "A gift card with a silver foil PIN strip you scratch off. Crumbs fall from the card as you scratch, and past 60% the rest of the foil flakes away. A button reveals the PIN without scratching.",
        component: ScratchCard,
        source: scratchCardSource,
        files: [{name: "ScratchCard.tsx", source: scratchCardComponentSource}],
        minHeight: 460,
    },
    {
        id: "tear-ticket",
        title: "Tear-off boarding pass",
        description: "A boarding pass whose stub tears along the perforation as you pull it down or sideways, then falls away while the pass gets a check-in stamp. A button tears it for keyboard users.",
        component: TearTicket,
        source: tearTicketSource,
        files: [{name: "TearTicket.tsx", source: tearTicketComponentSource}],
        minHeight: 620,
    },
    {
        id: "polaroid-develop",
        title: "Developing instant photo",
        description: "An instant camera ejects a photo that slowly develops from a murky blue-brown into full color. Drag it quickly from side to side, or use the arrow keys, to shake it along. Reduced motion skips the ejection and shortens the development.",
        component: PolaroidDevelop,
        source: polaroidDevelopSource,
        files: [{name: "PolaroidDevelop.tsx", source: polaroidDevelopComponentSource}],
        minHeight: 520,
    },
];

export default examples;
