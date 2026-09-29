import {SlashMenu, type Block} from "./SlashMenu";

const blocks: Block[] = [
    {id: 1, type: "h1", text: "Launch checklist"},
    {id: 2, type: "paragraph", text: "Everything that needs to happen before the pricing page goes live on Tuesday."},
    {id: 3, type: "todo", text: "Final copy review with legal", done: true},
    {id: 4, type: "todo", text: "Update screenshots in the help center"},
];

const SlashMenuExample = () => <SlashMenu defaultBlocks={blocks} breadcrumb={["Docs", "Marketing"]}/>;

export default SlashMenuExample;
