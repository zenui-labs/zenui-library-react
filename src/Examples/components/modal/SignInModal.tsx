import {useEffect, useId, useRef} from "react";
import type {FormEvent, ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface SignInValues {
    email: string;
    password: string;
    /** Whether "Remember me" was checked. */
    remember: boolean;
}

export interface SignInModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button and the Escape key. */
    onClose: () => void;
    /** Called with the form values when the form is submitted. Close the modal here when sign in succeeds. */
    onSubmit?: (values: SignInValues) => void;
    title?: ReactNode;
    submitLabel?: string;
    emailPlaceholder?: string;
    forgotPasswordHref?: string;
    signUpHref?: string;
    /** Accessible name of the close button. */
    closeLabel?: string;
    className?: string;
}

// Moves focus into the modal while it is open, closes it on Escape and gives focus back afterwards.
const useModalFocus = (open: boolean, onClose: () => void, focusRef: RefObject<HTMLElement>) => {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        focusRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            previous?.focus();
        };
    }, [open, focusRef]);
};

/** A modal with a sign in form: email, password, remember me and links to reset the password or sign up. */
export const SignInModal = ({
    open,
    onClose,
    onSubmit,
    title = "Sign in to our platform",
    submitLabel = "Sign in",
    emailPlaceholder = "zenuilibrary@gmail.com",
    forgotPasswordHref = "#",
    signUpHref = "#",
    closeLabel = "Close",
    className = "",
}: SignInModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const titleId = `${id}-title`;
    const emailId = `${id}-email`;
    const passwordId = `${id}-password`;
    const rememberId = `${id}-remember`;
    useModalFocus(open, onClose, panelRef);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
            remember: data.get("remember") === "on",
        });
    };

    return (
        <div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`${
                    open ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[35%] dark:bg-slate-800 bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8 focus:outline-none`}
            >
                <div className="w-full flex items-end p-4 justify-between border-b dark:border-slate-700 border-[#d1d1d1]">
                    <h2 id={titleId} className="text-[1.5rem] dark:text-[#abc2d3] font-bold">
                        {title}
                    </h2>
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={emailId} className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#464646]">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id={emailId}
                            required
                            autoComplete="email"
                            placeholder={emailPlaceholder}
                            className="py-2 px-3 border dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div>
                        <label htmlFor={passwordId} className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#464646]">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id={passwordId}
                            required
                            autoComplete="current-password"
                            placeholder="**********"
                            className="py-2 px-3 border border-[#d1d1d1] dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="remember" id={rememberId} className="w-[17px] h-[17px]"/>
                            <label htmlFor={rememberId} className="dark:text-[#abc2d3]">
                                Remember me
                            </label>
                        </div>

                        <a href={forgotPasswordHref} className="text-[#3B9DF8] font-[400] text-[1rem]">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md">
                        {submitLabel}
                    </button>
                </form>

                <div className="flex items-center justify-center w-full pb-4">
                    <p className="text-[1rem] font-[400] dark:text-[#abc2d3] text-[#464646]">
                        Don&apos;t have an account?{" "}
                        <a href={signUpHref} className="text-[#3B9DF8] underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
