import {useState} from "react";
import {MapContactForm, type MapContactValues} from "./MapContactForm";

// Copy the embed URL from Google Maps (Share, then Embed a map) into mapSrc to show your own address.
const MapContactFormExample = () => {
    const [sent, setSent] = useState<MapContactValues | null>(null);

    return (
        <div className="p-4 sm:p-8">
            <MapContactForm onSubmit={setSent}/>
            {sent && (
                <p role="status" className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                    Thanks, {sent.name}. We will reply to {sent.email}.
                </p>
            )}
        </div>
    );
};

export default MapContactFormExample;
