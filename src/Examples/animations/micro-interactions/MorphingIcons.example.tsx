import {AddToggle, MenuToggle, MuteToggle, PlayPause} from "./MorphingIcons";

const MorphingIconsExample = () => (
    <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
        <MenuToggle/>
        <PlayPause/>
        <AddToggle/>
        <MuteToggle/>
    </div>
);

export default MorphingIconsExample;
