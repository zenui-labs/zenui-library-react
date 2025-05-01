import React, {useEffect, useState} from "react";
import SelectInput from "./SelectInput.jsx";
import RadioInput from "./RadioInput.jsx";
import {IoChevronBackSharp} from "react-icons/io5";
import {FaStar} from "react-icons/fa";

const roleOptions = [
    "Frontend Developer",
    "Fullstack Developer",
    "UI/UX Designer",
    "Backend Developer",
    "Student",
    "Hobbyist",
    "Other"
];

const experienceOptions = [
    "Beginner (0–1 year)",
    "Intermediate (1–3 years)",
    "Advanced (3+ years)"
];

const usageFrequencyOptions = [
    "Daily",
    "Weekly",
    "Occasionally",
    "Just trying it out"
];

const favoriteComponentOptions = [
    "Button",
    "Card",
    "Modal",
    "Form",
    "Input/TextField",
    "Toast/Notification",
    "Tabs",
    "Dropdown",
    "Avatar",
    "Badge",
    "Dialog",
    "Tooltip",
    "Others"
];

const QuickSurveyModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        usageContext: "",
        usageFrequency: "",
        favoriteComponents: [],
        otherComponent: "",
        wantedFeatures: "",
        painPoints: "",
        feedback: "",
        rating: 0,
        recommendReason: ""
    });

    const isOthersSelected = formData.favoriteComponents.includes("Others");

    useEffect(() => {
        const surveyCompleted = localStorage.getItem('zenui_survey_completed');
        if (!surveyCompleted || surveyCompleted === 'false') {
            if (!surveyCompleted) {
                localStorage.setItem('zenui_survey_completed', 'false');
            }
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, []);

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRadioChange = (value) => {
        updateFormData("usageContext", value);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isModalOpen]);

    const saveData = async () => {
        setLoading(true);
        try {
            const formDataObj = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formDataObj.append(key, JSON.stringify(value));
                } else {
                    formDataObj.append(key, value);
                }
            });

            await fetch('https://script.google.com/macros/s/AKfycbyIKJcUet_EMCaUaQIZ0TkMzPr-UWptrL3ghNvCFbUh4BMXofJN10jjenewNas-aSNr/exec', {
                method: 'POST',
                body: formDataObj
            });

            localStorage.setItem('zenui_survey_completed', 'true');
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error submitting survey:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentStep === 3) {
            saveData()
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const handleStarClick = (rating) => {
        updateFormData("rating", rating);
    };

    return (
        <div
            className={`${isModalOpen ? " visible" : " invisible"} w-full h-screen fixed top-0 left-0 z-[2147483647] bg-[rgb(0,0,0,0.4)] transition-all duration-300 overflow-y-auto pb-16`}>
            <div
                className={`${isModalOpen ? " translate-y-0 opacity-100" : " translate-y-[-200px] opacity-0"} w-[90%] 640px:w-[90%] 1024px:w-[50%] bg-white rounded-[16px] dark:bg-slate-800 p-6 transition-all duration-300 mx-auto mt-16`}>
                <h2 className="text-xl dark:text-darkTextColor font-bold">Quick Survey</h2>
                <p className="text-sm text-gray-500 dark:text-darkTextColor/80 mt-1 640px:max-w-[70%] mb-6">
                    We value your feedback! Please take a moment to answer the following questions.
                </p>

                {currentStep === 0 && (
                    <div>
                        <h2 className="text-lg text-text dark:text-darkTextColor font-bold mb-4">About You</h2>
                        <div className="flex flex-col 1024px:flex-row 1024px:items-center gap-5 w-full">
                            <div className="flex-1">
                                <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Role</label>
                                <SelectInput
                                    options={roleOptions}
                                    value={formData.role}
                                    onChange={(value) => updateFormData("role", value)}
                                    placeholder="Select Role"
                                    selectClassName={'role-select'}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Experience
                                    Level</label>
                                <SelectInput
                                    options={experienceOptions}
                                    value={formData.experience}
                                    onChange={(value) => updateFormData("experience", value)}
                                    placeholder="Select your experience"
                                    selectClassName={'experience-select'}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="text-sm dark:text-darkSubTextColor font-medium text-text">Usage
                                Context</label>
                            <div
                                className="flex 1024px:items-center gap-5 gap-y-4 flex-col 1024px:flex-row 1024px:flex-wrap mt-3">
                                {["Personal Project", "Commercial Project", "Open Source Project", "Learning/Exploration", "Other"].map(option => (
                                    <RadioInput
                                        key={option}
                                        label={option}
                                        selected={formData.usageContext === option}
                                        onChange={() => handleRadioChange(option)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div>
                        <h2 className="text-lg text-text dark:text-darkTextColor font-bold mb-4">ZenUI Usage</h2>
                        <div className="flex flex-col items-center gap-5 w-full">
                            <div className="w-full">
                                <label className="text-sm dark:text-darkSubTextColor font-medium text-text">Usage
                                    Frequency</label>
                                <SelectInput
                                    options={usageFrequencyOptions}
                                    value={formData.usageFrequency}
                                    onChange={(value) => updateFormData("usageFrequency", value)}
                                    placeholder="Select usage frequency"
                                    selectClassName={'usage-frequency-select'}
                                />
                            </div>
                            <div className="w-full">
                                <label className="text-sm dark:text-darkSubTextColor font-medium text-text">Favorite
                                    Components</label>
                                <SelectInput
                                    options={favoriteComponentOptions}
                                    value={formData.favoriteComponents}
                                    onChange={(value) => updateFormData("favoriteComponents", value)}
                                    placeholder="Select favorite components"
                                    selectClassName={'favorite-components-select'}
                                    isMulti={true}
                                />
                            </div>

                            {isOthersSelected && (
                                <div className="w-full">
                                    <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Other
                                        Component Name</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 w-full mt-1.5 rounded-lg focus:border-[#0FABCA] dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-400/80 dark:text-darkTextColor placeholder:text-[0.9rem] outline-none py-[9.5px] px-3"
                                        placeholder="Please specify other component name"
                                        value={formData.otherComponent}
                                        onChange={(e) => updateFormData("otherComponent", e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h2 className="text-lg text-text dark:text-darkTextColor font-bold mb-4">Feedback &
                            Improvements</h2>
                        <div className="w-full">
                            <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Wanted
                                Features</label>
                            <textarea
                                className="min-h-[100px] border border-gray-300 placeholder:text-sm w-full mt-1.5 rounded-lg resize-none  dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-400/80 dark:text-darkTextColor focus:border-[#0FABCA] outline-none p-3"
                                placeholder="E.g., Table component, theme customizations..."
                                value={formData.wantedFeatures}
                                onChange={(e) => updateFormData("wantedFeatures", e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-3 1024px:mt-4">
                            <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Pain
                                Points</label>
                            <textarea
                                className="min-h-[100px] border border-gray-300 placeholder:text-sm w-full mt-1.5 rounded-lg resize-none dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-400/80 dark:text-darkTextColor focus:border-[#0FABCA] outline-none p-3"
                                placeholder="E.g., Setup difficulty, styling issues..."
                                value={formData.painPoints}
                                onChange={(e) => updateFormData("painPoints", e.target.value)}
                            />
                        </div>
                        <div className="w-full mt-3 1024px:mt-4">
                            <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Additional
                                Feedback</label>
                            <textarea
                                className="min-h-[150px] border border-gray-300 placeholder:text-sm w-full mt-1.5 rounded-lg resize-none dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-400/80 dark:text-darkTextColor focus:border-[#0FABCA] outline-none p-3"
                                placeholder="Write some feedbacks and help us to grow..."
                                value={formData.feedback}
                                onChange={(e) => updateFormData("feedback", e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h2 className="text-lg text-text dark:text-darkTextColor font-bold mb-4">Overall
                            Satisfaction</h2>
                        <div className="w-full mt-4">
                            <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Recommend
                                Score</label>
                            <div className="flex items-center space-x-1 mt-1.5">
                                {[...Array(5)].map((_, index) => {
                                    const starRating = index + 1;
                                    return (
                                        <FaStar
                                            key={starRating}
                                            className={`cursor-pointer ${starRating <= (hover || formData.rating) ? "text-yellow-400" : "dark:text-slate-500 text-gray-200"} ${starRating <= hover && 'scale-110'} transition-all duration-200`}
                                            size={30}
                                            onClick={() => handleStarClick(starRating)}
                                            onMouseEnter={() => setHover(starRating)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <label className="text-sm font-medium dark:text-darkSubTextColor text-text">Recommend
                                Reason</label>
                            <textarea
                                className="min-h-[150px] border border-gray-300 placeholder:text-sm w-full mt-1.5 rounded-lg resize-none dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-400/80 dark:text-darkTextColor focus:border-[#0FABCA] outline-none p-3"
                                placeholder="Write why you would recommend ZenUI..."
                                value={formData.recommendReason}
                                onChange={(e) => updateFormData("recommendReason", e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-10 flex items-center justify-end gap-3 640px:gap-5">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep <= 0}
                        className={`${currentStep > 0 ? 'bg-[#0FABCA] hover:bg-[#0FABCA]/90 active:scale-95' : 'bg-[#0FABCA]/20 cursor-not-allowed opacity-50'} text-[0.9rem] 640px:text-[1rem] py-2 pr-5 pl-4 text-white transition-all duration-200 rounded-lg flex items-center gap-2`}>
                        <IoChevronBackSharp className="text-[0.950rem] 640px:text-lg"/>
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className={`${currentStep === 3 ? 'px-5' : 'pl-5 pr-4'} py-2 bg-[#0FABCA] hover:bg-[#0FABCA]/90 transition-all text-[0.9rem] 640px:text-[1rem] active:scale-95 duration-200 text-white rounded-lg flex items-center gap-2`}>

                        {loading && (
                            <div
                                className="w-5 h-5 animate-[spin_1s_linear_infinite] rounded-full border-2 border-r-white border-white/50"></div>
                        )}

                        {currentStep === 3 ? "Submit" : "Next"}
                        {
                            currentStep < 3 && (
                                <IoChevronBackSharp className="text-[0.950rem] 640px:text-lg rotate-180"/>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickSurveyModal;