import type {ComponentType} from "react";
import {IoCartOutline} from "react-icons/io5";

export interface CartBadgeProps {
    /** Number of items in the cart. The badge hides at 0. */
    count: number;
    /** Counts above this show as "99+". */
    max?: number;
    /** Name read by screen readers, for example "Cart". */
    label?: string;
    /** Word after the count for screen readers. */
    itemsLabel?: string;
    icon?: ComponentType<{className?: string}>;
    className?: string;
}

/** A cart icon with a count bubble for the items in the cart. */
export const CartBadge = ({
    count,
    max = 99,
    label = "Cart",
    itemsLabel = "items",
    icon: Icon = IoCartOutline,
    className = "",
}: CartBadgeProps) => (
    <div className={`relative ${className}`}>
        <Icon className="text-[2.7rem] dark:text-[#abc2d3]" aria-hidden/>
        <span className="sr-only">{`${label}, ${count} ${itemsLabel}`}</span>
        {count > 0 && (
            <div className="absolute top-[-10%] right-[-15%] text-white min-w-[20px] min-h-[20px] text-center" aria-hidden>
                <span className="text-[0.8rem] bg-[#3B9DF8] py-1 px-1 rounded-full w-full h-full border-[2px] border-white dark:border-[#020617]">
                    {count > max ? `${max}+` : count}
                </span>
            </div>
        )}
    </div>
);
