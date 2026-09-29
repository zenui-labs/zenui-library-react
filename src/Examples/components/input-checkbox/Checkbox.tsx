import {useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode} from "react";

const CHECK_PATH =
    "M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z";

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "checked" | "defaultChecked" | "onChange"> {
    /** Text or content shown next to the box. */
    label: ReactNode;
    /** Controlled state. Leave it out to let the checkbox manage its own state. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    /** Fill color of the checked box. */
    color?: string;
    className?: string;
}

/** A checkbox with a custom drawn box. The native input stays in the page for keyboards and screen readers. */
export const Checkbox = ({
    label,
    checked,
    defaultChecked = false,
    onChange,
    color = "#3B9DF8",
    className = "",
    ...props
}: CheckboxProps) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = checked ?? internalChecked;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (checked === undefined) setInternalChecked(event.target.checked);
        onChange?.(event.target.checked);
    };

    return (
        <label className={`relative flex items-center gap-[10px] cursor-pointer ${className}`}>
            <input {...props} type="checkbox" className="peer sr-only" checked={isChecked} onChange={handleChange}/>
            <svg
                width="21"
                height="21"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="shrink-0 rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                style={{outlineColor: color}}
            >
                {isChecked ? (
                    <>
                        <rect x="-0.00012207" y="6.10352e-05" width="20" height="20" rx="4" fill={color} stroke={color}/>
                        <path d={CHECK_PATH} fill="white"/>
                    </>
                ) : (
                    <rect x="-0.00012207" y="6.10352e-05" width="20" height="20" rx="4" fill="transparent" stroke="#ccc"/>
                )}
            </svg>
            <span className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242]">{label}</span>
        </label>
    );
};
