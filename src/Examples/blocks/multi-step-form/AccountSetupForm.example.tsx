import {useState} from "react";
import {AccountSetupForm, type AccountSetupValues, type AccountTypeOption} from "./AccountSetupForm";

const accountTypes: AccountTypeOption[] = [
    {
        id: "personal",
        title: "Personal Account",
        description: "For one person managing their own projects and billing.",
        imageSrc: "https://i.ibb.co/tzxHppd/Group-11.png",
    },
    {
        id: "business",
        title: "Business Account",
        description: "For teams that need shared billing and admin controls.",
        imageSrc: "https://i.ibb.co/RBtVH0D/Group-11-1.png",
    },
];

// Send the answers to your API in onSubmit. The demo only confirms what was sent.
const AccountSetupFormExample = () => {
    const [sent, setSent] = useState<AccountSetupValues | null>(null);

    return (
        <div className="p-4 sm:p-8">
            <AccountSetupForm accountTypes={accountTypes} onSubmit={setSent}/>
            {sent && (
                <p role="status" className="mt-4 text-center text-sm text-gray-500 dark:text-slate-400">
                    Account created for {sent.email || "your email"}.
                </p>
            )}
        </div>
    );
};

export default AccountSetupFormExample;
