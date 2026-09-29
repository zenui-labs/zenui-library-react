import type {ButtonHTMLAttributes, ComponentType} from "react";
import {MdOutlineShoppingCart} from "react-icons/md";

export type AddToCartButtonVariant = "solid" | "pill";

export interface AddToCartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** `solid`: filled with the icon first. `pill`: bordered and fully rounded with the icon in a filled circle. */
    variant?: AddToCartButtonVariant;
    icon?: ComponentType<{className?: string}>;
}

/** An add to cart button. Pass `onClick` to add the item; the label defaults to "Add to cart". */
export const AddToCartButton = ({
    variant = "solid",
    icon: Icon = MdOutlineShoppingCart,
    type = "button",
    className = "",
    children = "Add to cart",
    ...props
}: AddToCartButtonProps) => {
    if (variant === "pill") {
        return (
            <button
                type={type}
                className={`border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-full flex items-center ${className}`}
                {...props}
            >
                <span className="w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1" aria-hidden>
                    <Icon className="text-[1.4rem] text-white"/>
                </span>
                <span className="pr-4 pl-2 py-2">{children}</span>
            </button>
        );
    }

    return (
        <button
            type={type}
            className={`px-4 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center gap-[7px] ${className}`}
            {...props}
        >
            <Icon className="text-[1.4rem]"/>
            {children}
        </button>
    );
};
