import {useState} from "react";
import {SignInModal, type SignInValues} from "./SignInModal";

const SignInModalExample = () => {
    const [open, setOpen] = useState(false);
    const [signedInAs, setSignedInAs] = useState<string | null>(null);

    const handleSubmit = (values: SignInValues) => {
        setSignedInAs(values.email);
        setOpen(false);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            {signedInAs && <p className="text-sm text-gray-500 dark:text-slate-400">Signed in as {signedInAs}</p>}
            <SignInModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit}/>
        </div>
    );
};

export default SignInModalExample;
