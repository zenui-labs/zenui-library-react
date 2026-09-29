export interface VerticalStep {
    title: string;
    description?: string;
}

export interface VerticalStepperProps {
    steps: VerticalStep[];
    /** Zero-based index of the current step. Earlier steps show as done, later ones as upcoming. */
    activeStep?: number;
    /** Accessible name for the list of steps. */
    label?: string;
    className?: string;
}

const circleClasses = (index: number, activeStep: number) => {
    if (index < activeStep) return "bg-[#3B9DF8] text-white";
    if (index === activeStep) return "bg-[#3B9DF8] outline-2 outline outline-offset-[3px] outline-[#3B9DF8] text-white";
    return "bg-gray-200 text-gray-500 dark:bg-slate-700 dark:text-[#abc2d3]";
};

/** A stepper that lists steps from top to bottom, each with a title and an optional description. */
export const VerticalStepper = ({steps, activeStep = 0, label = "Progress", className = ""}: VerticalStepperProps) => (
    <div className={`flex justify-center w-full ${className}`}>
        {/* Rows align to the start so the circles stay in one column whatever the text length. */}
        <ol aria-label={label} className="flex flex-col gap-[10px]">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <li
                        key={`${step.title}-${index}`}
                        aria-current={index === activeStep ? "step" : undefined}
                        className="flex items-start gap-[20px]"
                    >
                        <div className="flex flex-col items-center">
                            <span
                                className={`w-[35px] h-[35px] flex items-center justify-center rounded-full text-[1rem] ${circleClasses(index, activeStep)}`}
                            >
                                {index + 1}
                            </span>
                            {/* The line after the current step is filled to show where the user is heading. */}
                            {!isLast && (
                                <div
                                    aria-hidden
                                    className={`w-[2px] h-[50px] mt-[10px] ${
                                        index <= activeStep ? "bg-[#3B9DF8]" : "bg-gray-300 dark:bg-slate-700"
                                    }`}
                                />
                            )}
                        </div>

                        <div>
                            <h3 className="text-[1.1rem] text-gray-700 dark:text-[#abc2d3]">{step.title}</h3>
                            {step.description && (
                                <p className="text-[0.9rem] text-gray-500 dark:text-[#abc2d3]/70">{step.description}</p>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    </div>
);
