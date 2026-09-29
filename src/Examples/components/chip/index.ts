import type {Example} from "../../types.ts";
import BasicChip from "./BasicChip.example.tsx";
import basicChipSource from "./BasicChip.example.tsx?raw";
import basicChipComponentSource from "./BasicChip.tsx?raw";
import VariantChip from "./VariantChip.example.tsx";
import variantChipSource from "./VariantChip.example.tsx?raw";
import variantChipComponentSource from "./VariantChip.tsx?raw";
import IconChip from "./IconChip.example.tsx";
import iconChipSource from "./IconChip.example.tsx?raw";
import iconChipComponentSource from "./IconChip.tsx?raw";
import AvatarChip from "./AvatarChip.example.tsx";
import avatarChipSource from "./AvatarChip.example.tsx?raw";
import avatarChipComponentSource from "./AvatarChip.tsx?raw";
import StatusChip from "./StatusChip.example.tsx";
import statusChipSource from "./StatusChip.example.tsx?raw";
import statusChipComponentSource from "./StatusChip.tsx?raw";

const examples: Example[] = [
    {
        id: "primary_chip",
        title: "Primary chip",
        description: "A basic chip for short pieces of information or tags, in three sizes.",
        component: BasicChip,
        source: basicChipSource,
        files: [{name: "BasicChip.tsx", source: basicChipComponentSource}],
    },
    {
        id: "chip_variant",
        title: "Chip variants",
        description: "Chips in filled, outlined and soft gray styles.",
        component: VariantChip,
        source: variantChipSource,
        files: [{name: "VariantChip.tsx", source: variantChipComponentSource}],
    },
    {
        id: "icon_chip",
        title: "Icon chip",
        description: "Chips with an icon that adds context to a short label. Pass `onDismiss` to add a remove button.",
        component: IconChip,
        source: iconChipSource,
        files: [{name: "IconChip.tsx", source: iconChipComponentSource}],
    },
    {
        id: "avatar_chip",
        title: "Avatar chip",
        description: "A chip with a small avatar that shows a person next to their name, in three sizes.",
        component: AvatarChip,
        source: avatarChipSource,
        files: [{name: "AvatarChip.tsx", source: avatarChipComponentSource}],
    },
    {
        id: "variant_chip",
        title: "Variant chip",
        description: "Colored chips with an optional icon before or after the label, for status labels and tags.",
        component: StatusChip,
        source: statusChipSource,
        files: [{name: "StatusChip.tsx", source: statusChipComponentSource}],
    },
];

export default examples;
