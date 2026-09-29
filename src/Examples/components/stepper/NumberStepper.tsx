export interface NumberStepperProps {
    /** Step names, in order. */
    steps: string[];
    /** Zero-based index of the current step. Steps up to and including it are filled. */
    activeStep?: number;
    /** Accessible name for the list of steps. */
    label?: string;
    className?: string;
}

/** A horizontal stepper with a numbered circle and a name for each step. */
export const NumberStepper = ({steps, activeStep = 0, label = "Progress", className = ""}: NumberStepperProps) => (
    <ol aria-label={label} className={`flex flex-wrap items-center gap-[15px] justify-center w-full ${className}`}>
        {steps.map((step, index) => {
            const reached = index <= activeStep;

            return (
                <li
                    key={`${step}-${index}`}
                    aria-current={index === activeStep ? "step" : undefined}
                    className="flex items-center gap-[15px]"
                >
                    <span
                        className={`w-[35px] h-[35px] flex items-center justify-center rounded-full text-[1rem] ${
                            reached ? "bg-[#3B9DF8] text-white" : "border border-[#3B9DF8] text-[#3B9DF8]"
                        }`}
                    >
                        {index + 1}
                    </span>
                    <span className={`text-[0.9rem] ${reached ? "text-[#3B9DF8]" : "dark:text-[#abc2d3]"}`}>{step}</span>
                </li>
            );
        })}
    </ol>
);
