import {useState} from "react";
import {IllustratedContactForm, type IllustratedContactValues} from "./IllustratedContactForm";

// Send the values to your API in onSubmit. The demo only confirms what was sent.
const IllustratedContactFormExample = () => {
    const [sent, setSent] = useState<IllustratedContactValues | null>(null);

    return (
        <div className="p-4 sm:p-8">
            <IllustratedContactForm onSubmit={setSent}/>
            {sent && (
                <p role="status" className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                    Message sent. We will reply to {sent.email}.
                </p>
            )}
        </div>
    );
};

export default IllustratedContactFormExample;
