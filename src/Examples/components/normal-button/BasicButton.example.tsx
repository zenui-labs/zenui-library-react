import {BasicButton} from "./BasicButton";

const BasicButtonExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-5">
        <BasicButton>Button 1</BasicButton>
        <BasicButton variant="outline">Button 2</BasicButton>
        <BasicButton tone="dark">Button 3</BasicButton>
        <BasicButton tone="dark" variant="outline">Button 4</BasicButton>
        <BasicButton tone="red">Button 5</BasicButton>
        <BasicButton tone="red" variant="outline">Button 6</BasicButton>
    </div>
);

export default BasicButtonExample;
