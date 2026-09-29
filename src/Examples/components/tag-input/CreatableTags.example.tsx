import {CreatableTags, type Tag} from "./CreatableTags";

const tags: Tag[] = [
    {name: "react", posts: 214},
    {name: "typescript", posts: 187},
    {name: "css", posts: 142},
    {name: "accessibility", posts: 96},
    {name: "performance", posts: 88},
    {name: "testing", posts: 61},
    {name: "animation", posts: 47},
    {name: "design-systems", posts: 39},
    {name: "server-components", posts: 22},
    {name: "forms", posts: 18},
    {name: "state-management", posts: 15},
    {name: "web-vitals", posts: 9},
];

const CreatableTagsExample = () => <CreatableTags tags={tags} defaultValue={["react", "animation"]}/>;

export default CreatableTagsExample;
