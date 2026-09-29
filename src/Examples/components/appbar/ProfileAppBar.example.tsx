import {useState} from "react";
import {ProfileAppBar, SignOutSwitch} from "./ProfileAppBar";

const ProfileAppBarExample = () => {
    const [signedOut, setSignedOut] = useState(false);

    return (
        <div className="flex w-full flex-col items-center gap-5">
            <ProfileAppBar signedIn={!signedOut}/>
            <SignOutSwitch checked={signedOut} onChange={setSignedOut}/>
        </div>
    );
};

export default ProfileAppBarExample;
