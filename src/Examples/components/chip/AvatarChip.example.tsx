import {AvatarChip, type AvatarChipSize} from "./AvatarChip";

const avatar =
    "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740";

const sizes: AvatarChipSize[] = ["sm", "md", "lg"];

const AvatarChipExample = () => (
    <div className="flex flex-wrap items-center gap-5 justify-center">
        {sizes.map((size) => (
            <AvatarChip key={size} avatarSrc={avatar} size={size}>
                ZenUI
            </AvatarChip>
        ))}
    </div>
);

export default AvatarChipExample;
