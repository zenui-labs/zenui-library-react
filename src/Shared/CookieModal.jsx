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
                } bg-brandColor transition-all fixed boxShadow rounded-md duration-300 mx-auto mt-8 bottom-3 left-[15px] z-[2000] transform`}
            >
                <div
                    className="flex items-center gap-[20px] 1024px:gap-[50px] flex-col 640px:flex-row justify-between py-[20px] px-[30px]">
                    <p className={`text-[0.9rem] 1024px:w-[70%] text-white`}>
                        We use cookies to make your experience better. <br/> By accepting, you agree to our <a href="/privacy-policy"
                                                                                      className='text-white font-bold underline'>Privacy
                        Policy</a>.
                    </p>

                    <div className="flex items-end justify-end gap-4 w-full 1024px:w-[20%]">
                        <button
                            className="py-2 w-full px-4 rounded-md outline-none hover:bg-white/90 bg-white"
                            onClick={acceptCookie}
                        >
                            Accept
                        </button>
                        <button
                            className={`py-2 w-full px-4 hover:bg-cyan-500 text-white border border-gray-200 rounded-md outline-none`}
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
