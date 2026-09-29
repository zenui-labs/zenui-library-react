import {RiAccountCircleLine, RiLockPasswordLine} from "react-icons/ri";
import {MdOutlineMail} from "react-icons/md";
import {IconInput} from "./IconInput";

const IconInputExample = () => (
    <div className="flex w-full flex-col items-center gap-5">
        <IconInput icon={RiAccountCircleLine} label="Username" name="username" placeholder="Username" autoComplete="username" className="md:w-[80%]"/>
        <IconInput icon={RiLockPasswordLine} label="Password" type="password" name="password" placeholder="Password" autoComplete="current-password" className="md:w-[80%]"/>
        <IconInput icon={MdOutlineMail} label="Email address" type="email" name="email" placeholder="Email address" autoComplete="email" className="md:w-[80%]"/>
    </div>
);

export default IconInputExample;
