import {EasingEditor} from "./EasingEditor";

const EasingEditorExample = () => (
    <EasingEditor
        defaultValue={[0.34, 1.56, 0.64, 1]}
        duration={900}
        presets={[
            {name: "ease", value: [0.25, 0.1, 0.25, 1]},
            {name: "ease-in-out", value: [0.42, 0, 0.58, 1]},
            {name: "back-out", value: [0.34, 1.56, 0.64, 1]},
            {name: "snappy", value: [0.16, 1, 0.3, 1]},
        ]}
    />
);

export default EasingEditorExample;
