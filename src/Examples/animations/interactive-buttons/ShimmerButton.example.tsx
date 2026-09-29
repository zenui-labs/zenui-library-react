import {LuArrowRight, LuSparkles} from "react-icons/lu";
import {ShimmerButton} from "./ShimmerButton";

const ShimmerButtonExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
        <ShimmerButton>
            <LuSparkles className="h-4 w-4" aria-hidden="true"/>
            Generate summary
        </ShimmerButton>
        <ShimmerButton variant="gradient" delay={0.7}>
            Upgrade to Pro
            <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"/>
        </ShimmerButton>
    </div>
);

export default ShimmerButtonExample;
