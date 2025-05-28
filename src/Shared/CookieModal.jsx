import React, {useEffect} from "react";

const CookieModal = ({isModalOpen, setisModalOpen}) => {

    useEffect(() => {
        if (!localStorage.getItem("zenUICookiesAccepted")) {
            setTimeout(() => {
                setisModalOpen(true)
            }, 6000)
        }
    }, [])

    const acceptCookie = () => {
        localStorage.setItem("zenUICookiesAccepted", "true");
        setisModalOpen(false)
    }

    const cancelCookie = () => {
        localStorage.setItem("zenUICookiesAccepted", "true");
        setisModalOpen(false)
    }

    return (
        <>
            <div
                className={`${
                    isModalOpen
                        ? " translate-y-[0px] opacity-100"
                        : " translate-y-[200px] opacity-0"
                } w-[95%] 1024px:w-[70%] bg-white transition-all fixed boxShadow rounded-md duration-300 mx-auto mt-8 bottom-3 left-[50%] z-[2000] dark:bg-slate-800 transform translate-x-[-50%]`}
            >
                <div
                    className="flex items-center gap-[20px] flex-col 640px:flex-row justify-between py-[20px] px-[30px]">
                    <p className={`text-[0.9rem] 1024px:w-[70%] dark:text-darkTextColor`}>
                        We use cookies to improve your experience, personalize content, and analyze traffic. By clicking
                        "Accept" you agree to our cookie use. For details, see our <a href="/privacy-policy"
                                                                                      className='text-[#0FABCA] underline'>Privacy
                        Policy</a>.
                    </p>

                    <div className="flex items-end justify-end gap-4 w-full 1024px:w-[20%]">
                        <button
                            className="py-2 w-full px-4 rounded-md outline-none bg-[#0FABCA] text-[#fff]"
                            onClick={acceptCookie}
                        >
                            Accept
                        </button>
                        <button
                            className={`py-2 w-full px-4 text-gray-500 dark:text-darkTextColor dark:border-slate-700 border border-gray-200 rounded-md outline-none`}
                            onClick={cancelCookie}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CookieModal;
