import {useState} from "react";
import {ConsentModal} from "./ConsentModal";

const ConsentModalExample = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded" onClick={() => setOpen(true)}>
                Open modal
            </button>
            <ConsentModal open={open} onClose={() => setOpen(false)} title="Terms of Service">
                <p>
                    With less than a month to go before the European Union enacts new consumer privacy laws for its
                    citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p>
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is
                    meant to ensure a common set of data rights in the European Union. It requires organizations to
                    notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </ConsentModal>
        </>
    );
};

export default ConsentModalExample;
