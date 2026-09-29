import {GoogleLoginButton} from "./GoogleLoginButton";

const GoogleLoginButtonExample = () => (
    <div className="flex flex-col items-center gap-5">
        <GoogleLoginButton variant="outline"/>
        <GoogleLoginButton variant="logo-box"/>
        <GoogleLoginButton variant="logo-circle"/>
    </div>
);

export default GoogleLoginButtonExample;
