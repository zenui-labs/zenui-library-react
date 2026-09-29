import {LinkPreview, type LinkPreviewCard} from "./LinkPreview";

const preview: LinkPreviewCard = {
    title: "ZenUI",
    description: "A modern React UI component library.",
    image: "https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67",
    imageAlt: "ZenUI preview",
};

const LinkPreviewExample = () => (
    <LinkPreview href="https://zenui.net" preview={preview}>
        Hover to see ZenUI link preview
    </LinkPreview>
);

export default LinkPreviewExample;
