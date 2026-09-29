import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";
import {MagneticButton} from "./MagneticButton";

const MagneticButtonExample = () => (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <MagneticButton>
            Book a demo
            <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"/>
        </MagneticButton>
        <MagneticButton variant="icon" strength={0.5} label="Open case study">
            <LuArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true"/>
        </MagneticButton>
    </div>
);

export default MagneticButtonExample;
