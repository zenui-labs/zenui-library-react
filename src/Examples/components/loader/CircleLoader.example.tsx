import {TbLoader3} from "react-icons/tb";
import {CircleLoader, IconLoader} from "./CircleLoader";

const CircleLoaderExample = () => (
    <div className="flex items-center justify-center gap-12">
        <CircleLoader/>
        <IconLoader/>
        <IconLoader icon={TbLoader3}/>
    </div>
);

export default CircleLoaderExample;
