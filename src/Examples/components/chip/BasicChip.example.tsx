import {BasicChip, type BasicChipSize} from "./BasicChip";

const sizes: BasicChipSize[] = ["sm", "md", "lg"];

const BasicChipExample = () => (
    <div className="flex flex-wrap items-center gap-5 justify-center">
        {sizes.map((size) => (
            <BasicChip key={size} size={size}>
                ZenUI
            </BasicChip>
        ))}
    </div>
);

export default BasicChipExample;
