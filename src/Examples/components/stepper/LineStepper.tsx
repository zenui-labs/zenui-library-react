export interface LineStepperProps {
    /** How many steps to show. */
    stepCount: number;
    /** Zero-based index of the current step. Steps up to and including it are filled. */
    activeStep?: number;
    /** Accessible name for the list of steps. */
    label?: string;
    className?: string;
}

/** A compact stepper that shows numbered circles joined by lines, without step names. */
export const LineStepper = ({stepCount, activeStep = 0, label = "Progress", className = ""}: LineStepperProps) => {
    const steps = Array.from({length: stepCount}, (_, index) => index);
    // Every step except the last takes an equal share of 70% of the row, which is 35% each for three steps.
    const segmentWidth = stepCount > 1 ? `${70 / (stepCount - 1)}%` : undefined;

    return (
        <ol aria-label={label} className={`flex items-center gap-[15px] justify-center w-full ${className}`}>
            {steps.map((index) => {
                const reached = index <= activeStep;
                const isLast = index === stepCount - 1;

                return (
                    <li
                        key={index}
                        aria-current={index === activeStep ? "step" : undefined}
                        className="flex items-center"
                        style={isLast ? undefined : {width: segmentWidth}}
                    >
                        <span
                            className={`w-[35px] h-[35px] shrink-0 flex items-center justify-center rounded-full text-[1rem] ${
                                reached ? "bg-[#3B9DF8] text-white" : "border border-[#3B9DF8] text-[#3B9DF8]"
                            }`}
                        >
                            <span className="sr-only">Step </span>
                            {index + 1}
                            <span className="sr-only"> of {stepCount}</span>
                        </span>
                        {/* The line after the current step is filled to show where the user is heading. */}
                        {!isLast && (
                            <hr
                                aria-hidden
                                className={`w-[80%] ${reached ? "border-[#3B9DF8]" : "dark:border-slate-600"}`}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
};
