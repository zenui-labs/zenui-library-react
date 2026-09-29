import {useId, useState} from "react";

export interface AccountTypeOption {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    /** Leave empty when the image is decorative. */
    imageAlt?: string;
}

export interface AccountSetupValues {
    /** Id of the chosen account type, or null. */
    accountType: string | null;
    name: string;
    email: string;
    password: string;
    age: string;
    interest: string;
    bio: string;
}

export interface AccountSetupFormProps {
    accountTypes: AccountTypeOption[];
    /** Labels for the three steps, read by screen readers. The progress bar shows numbers. */
    stepLabels?: [string, string, string];
    /** Current step from 1 to 3. Leave unset to let the form track it. */
    step?: number;
    defaultStep?: number;
    onStepChange?: (step: number) => void;
    /** Runs with every answer when the last step is submitted. */
    onSubmit?: (values: AccountSetupValues) => void;
    accountTypePrompt?: string;
    previousLabel?: string;
    nextLabel?: string;
    submitLabel?: string;
    className?: string;
}

const labelClass = "block text-[1rem] dark:text-[#abc2d3] text-gray-600";
const inputClass =
    "py-2.5 px-4 bg-gray-50 mt-1 w-full dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:border rounded-md outline-none";

/** A three step sign-up form: account type, personal details, then profile details. */
export const AccountSetupForm = ({
    accountTypes,
    stepLabels = ["account type", "personal info", "profile data"],
    step,
    defaultStep = 1,
    onStepChange,
    onSubmit,
    accountTypePrompt = "Choose your account type",
    previousLabel = "Previous",
    nextLabel = "Next",
    submitLabel = "Submit",
    className = "",
}: AccountSetupFormProps) => {
    const id = useId();
    const [innerStep, setInnerStep] = useState(defaultStep);
    const current = step ?? innerStep;

    const [values, setValues] = useState<AccountSetupValues>({
        accountType: null,
        name: "",
        email: "",
        password: "",
        age: "",
        interest: "",
        bio: "",
    });

    const update = <K extends keyof AccountSetupValues>(key: K, value: AccountSetupValues[K]) =>
        setValues((prev) => ({...prev, [key]: value}));

    const goTo = (next: number) => {
        if (step === undefined) setInnerStep(next);
        onStepChange?.(next);
    };

    const nextStep = () => {
        if (current < 3) goTo(current + 1);
        else onSubmit?.(values);
    };
    const prevStep = () => {
        if (current > 1) goTo(current - 1);
    };

    const field = (key: "name" | "email" | "password" | "age" | "interest" | "bio", label: string, type: string, placeholder: string, autoComplete?: string) => (
        <div className="w-full">
            <label htmlFor={`${id}-${key}`} className={labelClass}>{label}</label>
            <input
                id={`${id}-${key}`}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={values[key]}
                onChange={(event) => update(key, event.target.value)}
                className={inputClass}
            />
        </div>
    );

    return (
        <div className={`w-full sm:w-[70%] mx-auto ${className}`}>
            <ol className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px]">
                {stepLabels.map((label, index) => {
                    const number = index + 1;
                    return (
                        <li key={label} className="flex items-center gap-[10px] w-full" aria-current={current === number ? "step" : undefined}>
                            <span
                                className={`${
                                    current >= number ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-500 dark:bg-slate-800 dark:text-[#abc2d3]"
                                } w-[30px] h-[30px] p-[20px] flex items-center justify-center text-[1.2rem] rounded-full`}
                            >
                                {number}
                                <span className="sr-only">: {label}</span>
                            </span>
                            {index < stepLabels.length - 1 && (
                                <span className={`${current > number ? "bg-blue-500" : "bg-gray-300"} block w-full h-[5px] dark:bg-slate-800 rounded-full`}/>
                            )}
                        </li>
                    );
                })}
            </ol>

            <form className="mt-16 w-full" onSubmit={(event) => event.preventDefault()}>
                {current === 1 && (
                    <>
                        <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">{accountTypePrompt}</p>

                        {accountTypes.map((option) => {
                            const selected = values.accountType === option.id;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => update("accountType", option.id)}
                                    className={`${selected ? "bg-blue-50 dark:bg-slate-800" : ""} mt-6 flex sm:flex-row flex-col sm:items-center gap-[20px] w-full rounded-md text-left transition-colors duration-200`}
                                >
                                    <img src={option.imageSrc} alt={option.imageAlt ?? ""} className="w-[60px]"/>
                                    <span>
                                        <span className="block text-[15px] dark:text-[#abc2d3] font-[600]">{option.title}</span>
                                        <span className="block text-[0.9rem] dark:text-slate-400 font-[300] text-gray-400 w-full sm:w-[80%] mt-1">
                                            {option.description}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </>
                )}

                {current === 2 && (
                    <div className="flex flex-col gap-[25px] w-full">
                        {field("name", "Name", "text", "John Doe", "name")}
                        {field("email", "Email", "email", "example@gmail.com", "email")}
                        {field("password", "Password", "password", "*********", "new-password")}
                    </div>
                )}

                {current === 3 && (
                    <div className="flex flex-col gap-[25px]">
                        {field("age", "Age", "number", "20")}
                        {field("interest", "Area of interest", "text", "Frontend")}
                        {field("bio", "Bio / Description", "text", "A few words about you")}
                    </div>
                )}

                <div className="w-full flex items-end justify-end mt-12">
                    <button
                        disabled={current <= 1}
                        type="button"
                        onClick={prevStep}
                        className={`${current <= 1 ? "cursor-not-allowed dark:text-slate-500" : ""} text-[1rem] text-gray-500 dark:text-slate-400 px-6 py-2.5`}
                    >
                        {previousLabel}
                    </button>
                    <button type="button" onClick={nextStep} className="bg-blue-500 py-2.5 px-6 rounded-md text-white">
                        {current > 2 ? submitLabel : nextLabel}
                    </button>
                </div>
            </form>
        </div>
    );
};
