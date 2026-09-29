import {BiError} from "react-icons/bi";
import {IoTime} from "react-icons/io5";
import {FaFire} from "react-icons/fa";
import {StatusChip} from "./StatusChip";

const StatusChipExample = () => (
    <div className="flex items-center flex-wrap gap-5 justify-center">
        <StatusChip tone="warning" icon={BiError}>Out of date</StatusChip>
        <StatusChip tone="info" icon={IoTime}>Pending</StatusChip>
        <StatusChip tone="danger" icon={FaFire} iconPosition="end">HOT</StatusChip>
        <StatusChip tone="highlight">Trending</StatusChip>
    </div>
);

export default StatusChipExample;
