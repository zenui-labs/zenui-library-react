import type {ReactNode} from "react";
import {LuInfo} from "react-icons/lu";

const WarningMessageCard = ({children, text}: {children?: ReactNode; text?: string; width?: number}) => {
    return (
        <div className="mb-8 flex w-full gap-3 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
            <LuInfo className="mt-0.5 size-4 shrink-0"/>
            <div className="text-[0.875rem] leading-relaxed">
                {children ? children : text}
            </div>
        </div>
    );
};

export default WarningMessageCard;
