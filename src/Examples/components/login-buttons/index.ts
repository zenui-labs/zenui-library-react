import type {Example} from "../../types.ts";
import GoogleLoginButton from "./GoogleLoginButton.example.tsx";
import googleLoginButtonSource from "./GoogleLoginButton.example.tsx?raw";
import googleLoginButtonComponentSource from "./GoogleLoginButton.tsx?raw";
import AppleLoginButton from "./AppleLoginButton.example.tsx";
import appleLoginButtonSource from "./AppleLoginButton.example.tsx?raw";
import appleLoginButtonComponentSource from "./AppleLoginButton.tsx?raw";
import FilledSocialLoginButtons from "./FilledSocialLoginButtons.example.tsx";
import filledSocialLoginButtonsSource from "./FilledSocialLoginButtons.example.tsx?raw";
import filledSocialLoginButtonsComponentSource from "./FilledSocialLoginButtons.tsx?raw";
import OutlinedSocialLoginButtons from "./OutlinedSocialLoginButtons.example.tsx";
import outlinedSocialLoginButtonsSource from "./OutlinedSocialLoginButtons.example.tsx?raw";
import outlinedSocialLoginButtonsComponentSource from "./OutlinedSocialLoginButtons.tsx?raw";

const examples: Example[] = [
    {
        id: "login_with_google",
        title: "Login with Google",
        description: "Sign in with Google buttons in three styles: bordered, a blue button with a square logo tile, and one with a round logo tile.",
        component: GoogleLoginButton,
        source: googleLoginButtonSource,
        files: [{name: "GoogleLoginButton.tsx", source: googleLoginButtonComponentSource}],
    },
    {
        id: "login_with_apple",
        title: "Login with Apple",
        description: "Continue with Apple buttons in a solid black style and a bordered style.",
        component: AppleLoginButton,
        source: appleLoginButtonSource,
        files: [{name: "AppleLoginButton.tsx", source: appleLoginButtonComponentSource}],
    },
    {
        id: "social_login_background",
        title: "Social login with background",
        description: "Social login buttons filled with each provider's brand color. Pass your own providers, logos and colors.",
        component: FilledSocialLoginButtons,
        source: filledSocialLoginButtonsSource,
        files: [{name: "FilledSocialLoginButtons.tsx", source: filledSocialLoginButtonsComponentSource}],
        minHeight: 520,
    },
    {
        id: "social_login_bordered",
        title: "Social login with border",
        description: "Social login buttons with a border and text in each provider's brand color.",
        component: OutlinedSocialLoginButtons,
        source: outlinedSocialLoginButtonsSource,
        files: [{name: "OutlinedSocialLoginButtons.tsx", source: outlinedSocialLoginButtonsComponentSource}],
        minHeight: 520,
    },
];

export default examples;
