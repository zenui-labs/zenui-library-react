import {useState} from "react";
import {FocusedModal} from "./FocusedModal";

const FocusedModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            <FocusedModal
                open={open}
                onClose={() => setOpen(false)}
                title="Welcome back"
                subtitle="Continue your journey with us"
            >
                <p>
                    The blurred backdrop keeps attention on this dialog while the content behind it stays in view, so
                    people do not lose their place on the page.
                </p>
            </FocusedModal>
        </>
    );
};

export default FocusedModalExample;
