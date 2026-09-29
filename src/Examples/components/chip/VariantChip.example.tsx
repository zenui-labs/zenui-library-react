import {VariantChip, type VariantChipVariant} from "./VariantChip";

const variants: VariantChipVariant[] = ["filled", "outlined", "soft"];

const VariantChipExample = () => (
    <div className="flex flex-wrap items-start gap-5 justify-center">
        {variants.map((variant) => (
            <VariantChip key={variant} variant={variant}>
                ZenUI
            </VariantChip>
        ))}
    </div>
);

export default VariantChipExample;
