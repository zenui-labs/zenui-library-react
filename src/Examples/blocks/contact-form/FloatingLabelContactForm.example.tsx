import {useState} from "react";
import {FloatingLabelContactForm, type FloatingLabelContactValues} from "./FloatingLabelContactForm";

// Send the values to your API in onSubmit. The demo only confirms what was sent.
const FloatingLabelContactFormExample = () => {
    const [sent, setSent] = useState<FloatingLabelContactValues | null>(null);

    return (
        <div className="p-4 sm:p-8">
            <FloatingLabelContactForm onSubmit={setSent}/>
            {sent && (
                <p role="status" className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                    Thanks, {sent.name}. We will reply to {sent.email}.
                </p>
            )}
        </div>
    );
};

export default FloatingLabelContactFormExample;
