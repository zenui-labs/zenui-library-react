import {FaArrowRightLong, FaPlus} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {BiMessageDetail} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineEdit} from "react-icons/md";
import {IoCodeSlashOutline} from "react-icons/io5";
import {IconButton, TextIconButton} from "./IconButtons";

const IconButtonsExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-5">
        <TextIconButton icon={FaPlus} shape="pill">Create</TextIconButton>
        <IconButton icon={FaPlus} label="Create"/>
        <IconButton icon={RxCross2} label="Close"/>
        <IconButton icon={RxCross2} label="Close" variant="outline"/>
        <IconButton icon={BiMessageDetail} label="Messages" variant="outline" shape="square" iconClassName="text-[1.3rem]"/>
        <IconButton icon={AiOutlineDelete} label="Delete" variant="outline" shape="square" iconClassName="text-[1.3rem]"/>
        <TextIconButton icon={FaArrowRightLong} iconPosition="end">View page</TextIconButton>
        <TextIconButton icon={MdOutlineEdit}>Edit</TextIconButton>
        <TextIconButton icon={IoCodeSlashOutline} variant="outline" iconClassName="text-[1.2rem]">Developer</TextIconButton>
    </div>
);

export default IconButtonsExample;
