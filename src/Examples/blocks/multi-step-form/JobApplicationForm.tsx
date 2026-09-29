import {useId, useState} from "react";
import type {ChangeEvent, DragEvent} from "react";
import {MdDone} from "react-icons/md";
import {SlLocationPin} from "react-icons/sl";
import {IoSearchOutline} from "react-icons/io5";
import {BsCashStack} from "react-icons/bs";
import {HiOutlineUpload} from "react-icons/hi";

export interface JobRole {
    id: string;
    title: string;
    description: string;
    /** Starting pay per hour, passed to `formatRate`. */
    hourlyRate: number;
}

export interface JobApplicationValues {
    location: string;
    /** Id of the role card picked on the second step, or null. */
    roleId: string | null;
    roles: string;
    name: string;
    phone: string;
    certificate: File | null;
}

export interface JobApplicationFormProps {
    /** Places offered as quick picks on the first step. */
    locationSuggestions: string[];
    /** Role cards on the second step. */
    roles: JobRole[];
    /** Labels for the three steps in the progress bar. */
    stepLabels?: [string, string, string];
    /** Current step from 1 to 4, where 4 is the confirmation. Leave unset to let the form track it. */
    step?: number;
    defaultStep?: number;
    onStepChange?: (step: number) => void;
    /** Runs with every answer when the third step is submitted. */
    onSubmit?: (values: JobApplicationValues) => void;
    formatRate?: (rate: number) => string;
    successImageSrc?: string;
    successTitle?: string;
    successDescription?: string;
    previousLabel?: string;
    nextLabel?: string;
    submitLabel?: string;
    className?: string;
}

const labelClass = "block text-[1rem] dark:text-[#abc2d3] text-gray-600";
const inputClass =
    "py-2.5 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-gray-300 mt-1 w-full rounded-md outline-none";

/** A four step job application: location, role, profile details with an upload, then a confirmation. */
export const JobApplicationForm = ({
    locationSuggestions,
    roles,
    stepLabels = ["location", "role", "profile data"],
    step,
    defaultStep = 1,
    onStepChange,
    onSubmit,
    formatRate = (rate) => `from $${rate} per hour`,
    successImageSrc = "https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png",
    successTitle = "We've received your application",
    successDescription = "We will review it and get back to you within a few days.",
    previousLabel = "Previous",
    nextLabel = "Next",
    submitLabel = "Submit",
    className = "",
}: JobApplicationFormProps) => {
    const id = useId();
    const [innerStep, setInnerStep] = useState(defaultStep);
    const current = step ?? innerStep;

    const [values, setValues] = useState<JobApplicationValues>({
        location: "",
        roleId: null,
        roles: "",
        name: "",
        phone: "",
        certificate: null,
    });
    const [roleQuery, setRoleQuery] = useState("");

    const update = <K extends keyof JobApplicationValues>(key: K, value: JobApplicationValues[K]) =>
        setValues((prev) => ({...prev, [key]: value}));

    const goTo = (next: number) => {
        if (step === undefined) setInnerStep(next);
        onStepChange?.(next);
    };

    const nextStep = () => {
        if (current === 3) onSubmit?.(values);
        if (current < 4) goTo(current + 1);
    };
    const prevStep = () => {
        if (current > 1) goTo(current - 1);
    };

    const query = roleQuery.trim().toLowerCase();
    const visibleRoles = query ? roles.filter((role) => role.title.toLowerCase().includes(query)) : roles;

    const handleFile = (event: ChangeEvent<HTMLInputElement>) => update("certificate", event.target.files?.[0] ?? null);
    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        update("certificate", event.dataTransfer.files[0] ?? null);
    };

    return (
        <div className={`w-full sm:w-[90%] max-w-[700px] mx-auto ${className}`}>
            <ol className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px]">
                {stepLabels.map((label, index) => {
                    const number = index + 1;
                    const done = current > number;
                    return (
                        <li key={label} className="flex items-center w-full gap-[10px]" aria-current={current === number ? "step" : undefined}>
                            {done ? (
                                <span className="p-[10px] h-[40px] w-[40px] shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    <MdDone className="text-[3rem]" aria-hidden/>
                                    <span className="sr-only">Completed:</span>
                                </span>
                            ) : (
                                <span className="w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center dark:text-[#abc2d3] dark:bg-slate-800 text-[1.2rem] rounded-full bg-gray-50">
                                    {number}
                                </span>
                            )}

                            <span className={`${done ? "!text-blue-500" : "text-gray-600"} capitalize text-[0.9rem] dark:text-[#abc2d3] font-[400] sm:w-[75%] min-w-fit`}>
                                {label}
                            </span>

                            {index < stepLabels.length - 1 && (
                                <span className={`${done ? "bg-blue-500" : "bg-gray-300"} block w-full h-[5px] dark:bg-slate-800 rounded-full`}/>
                            )}
                        </li>
                    );
                })}
            </ol>

            <form className="mt-16 w-full" onSubmit={(event) => event.preventDefault()}>
                {current === 1 && (
                    <div className="flex flex-col w-full">
                        <div className="w-full relative">
                            <label htmlFor={`${id}-location`} className={labelClass}>Location</label>
                            <input
                                id={`${id}-location`}
                                type="text"
                                placeholder="City, area..."
                                value={values.location}
                                onChange={(event) => update("location", event.target.value)}
                                className={`${inputClass} pr-[40px]`}
                            />
                            <SlLocationPin className="absolute dark:text-slate-500 top-[42px] right-3 text-gray-500" aria-hidden/>
                        </div>

                        <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8">Suggestions</p>
                        <div className="flex items-center gap-[10px] flex-wrap mt-3">
                            {locationSuggestions.map((place) => (
                                <button
                                    key={place}
                                    type="button"
                                    onClick={() => update("location", place)}
                                    aria-pressed={values.location === place}
                                    className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] text-[0.9rem] text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                                >
                                    {place}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {current === 2 && (
                    <div className="flex flex-col gap-[20px] w-full">
                        <div className="w-full relative">
                            <label htmlFor={`${id}-role-search`} className={labelClass}>Roles</label>
                            <input
                                id={`${id}-role-search`}
                                type="search"
                                placeholder="Job title, position"
                                value={roleQuery}
                                onChange={(event) => setRoleQuery(event.target.value)}
                                className={`${inputClass} pr-[40px]`}
                            />
                            <IoSearchOutline className="absolute dark:text-slate-500 text-[1.2rem] top-[40px] right-3 text-gray-500" aria-hidden/>
                        </div>

                        <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-500 mt-8">Suggestions</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                            {visibleRoles.map((role) => {
                                const selected = values.roleId === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => update("roleId", role.id)}
                                        className={`${selected ? "border-[#3B9DF8]" : "border-gray-300 dark:border-slate-700"} border cursor-pointer rounded-md p-[15px] text-left`}
                                    >
                                        <span className="flex items-center gap-[10px] justify-between w-full">
                                            <span className="text-[1.1rem] dark:text-[#abc2d3] font-[500]">{role.title}</span>
                                            <span
                                                className={`${selected ? "border-[#3B9DF8]" : "border-gray-300 dark:border-slate-600"} w-[21px] h-[21px] shrink-0 border rounded-full flex items-center justify-center`}
                                            >
                                                <span
                                                    className={`${selected ? "bg-[#3B9DF8] scale-[1]" : "bg-transparent scale-[0.7]"} w-[11px] h-[11px] transition-all duration-200 rounded-full`}
                                                />
                                            </span>
                                        </span>
                                        <span className="block text-[0.9rem] dark:text-slate-400 text-gray-500 font-[300] mt-1">{role.description}</span>

                                        <span className="flex items-center gap-[10px] mt-3 text-[0.8rem] dark:bg-slate-900 dark:text-slate-400 text-gray-700 bg-gray-100 py-[5px] px-[10px] w-max">
                                            <BsCashStack aria-hidden/>
                                            {formatRate(role.hourlyRate)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {current === 3 && (
                    <div className="flex flex-col gap-[20px] w-full">
                        <div className="w-full">
                            <label htmlFor={`${id}-profile-location`} className={labelClass}>Location</label>
                            <input
                                id={`${id}-profile-location`}
                                type="text"
                                placeholder="e.g. Juri, Moulvibazar"
                                value={values.location}
                                onChange={(event) => update("location", event.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor={`${id}-roles`} className={labelClass}>Roles</label>
                            <input
                                id={`${id}-roles`}
                                type="text"
                                placeholder="e.g. 360 operator, steel fixer"
                                value={values.roles}
                                onChange={(event) => update("roles", event.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor={`${id}-name`} className={labelClass}>Name</label>
                            <input
                                id={`${id}-name`}
                                type="text"
                                autoComplete="name"
                                placeholder="e.g. John Doe"
                                value={values.name}
                                onChange={(event) => update("name", event.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor={`${id}-phone`} className={labelClass}>Phone</label>
                            <input
                                id={`${id}-phone`}
                                type="tel"
                                autoComplete="tel"
                                placeholder="e.g. +8801305282768"
                                value={values.phone}
                                onChange={(event) => update("phone", event.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div className="w-full">
                            <p className={labelClass}>
                                Certification{" "}
                                <span className="text-gray-300 dark:text-slate-500 font-[400] text-[0.9rem]">(optional)</span>
                            </p>
                            <label
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={handleDrop}
                                className="w-full h-[200px] dark:border-slate-700 border-2 border-dashed border-gray-300 flex items-center flex-col justify-center rounded-md mt-1 cursor-pointer focus-within:border-blue-300"
                            >
                                <HiOutlineUpload className="text-[2.7rem] text-blue-300" aria-hidden/>
                                <span className="flex sm:flex-row dark:text-[#abc2d3] flex-col items-center gap-[5px] text-[1rem] mt-2">
                                    <span className="underline dark:text-[#abc2d3] text-gray-700 font-bold">Click to upload</span>
                                    or drag & drop
                                </span>
                                {values.certificate && (
                                    <span className="mt-2 text-[0.9rem] text-gray-500 dark:text-slate-400">{values.certificate.name}</span>
                                )}
                                <input type="file" onChange={handleFile} className="sr-only"/>
                            </label>
                        </div>
                    </div>
                )}

                {current === 4 && (
                    <div className="flex items-center justify-center w-full flex-col text-center" role="status">
                        <img src={successImageSrc} alt="" className="w-[200px]"/>

                        <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-[600] mt-4">{successTitle}</h3>
                        <p className="text-gray-500 dark:text-slate-400 text-[1rem] font-[400] mt-1">{successDescription}</p>
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
                    <button
                        disabled={current > 3}
                        type="button"
                        onClick={nextStep}
                        className={`${current > 3 ? "!bg-blue-300 dark:text-slate-500 dark:!bg-blue-900/30 cursor-not-allowed" : ""} bg-blue-500 py-2.5 px-6 rounded-md text-white`}
                    >
                        {current > 2 ? submitLabel : nextLabel}
                    </button>
                </div>
            </form>
        </div>
    );
};
