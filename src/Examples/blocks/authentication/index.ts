import type {Example} from "../../types.ts";
import SignInSplit from "./SignInSplit.example.tsx";
import signInSplitSource from "./SignInSplit.example.tsx?raw";
import SignUpCard from "./SignUpCard.example.tsx";
import signUpCardSource from "./SignUpCard.example.tsx?raw";
import EmailLinkSignIn from "./EmailLinkSignIn.example.tsx";
import emailLinkSignInSource from "./EmailLinkSignIn.example.tsx?raw";
import SsoPasskeySignIn from "./SsoPasskeySignIn.example.tsx";
import ssoPasskeySignInSource from "./SsoPasskeySignIn.example.tsx?raw";
import TwoFactorCode from "./TwoFactorCode.example.tsx";
import twoFactorCodeSource from "./TwoFactorCode.example.tsx?raw";
import PasswordResetFlow from "./PasswordResetFlow.example.tsx";
import passwordResetFlowSource from "./PasswordResetFlow.example.tsx?raw";
import InviteAcceptance from "./InviteAcceptance.example.tsx";
import inviteAcceptanceSource from "./InviteAcceptance.example.tsx?raw";
import OnboardingSteps from "./OnboardingSteps.example.tsx";
import onboardingStepsSource from "./OnboardingSteps.example.tsx?raw";
import SessionLocked from "./SessionLocked.example.tsx";
import sessionLockedSource from "./SessionLocked.example.tsx?raw";

const examples: Example[] = [
    {
        id: "split-sign-in",
        title: "Split sign-in",
        description: "A sign-in form with social buttons, inline validation and a server error state, next to a brand panel with a customer quote. The brand panel hides on small screens.",
        component: SignInSplit,
        source: signInSplitSource,
        layout: "full",
        minHeight: 680,
    },
    {
        id: "sign-up-card",
        title: "Sign-up card with password rules",
        description: "A centered sign-up form with a live password strength meter, a workspace URL preview and a check-your-inbox confirmation step.",
        component: SignUpCard,
        source: signUpCardSource,
        layout: "full",
        minHeight: 760,
    },
    {
        id: "email-link-sign-in",
        title: "Email link sign-in",
        description: "Passwordless sign-in that emails a one-time link, then shows a check your email step with a resend countdown and a shortcut to Gmail or Outlook based on the address.",
        component: EmailLinkSignIn,
        source: emailLinkSignInSource,
        layout: "full",
        minHeight: 640,
    },
    {
        id: "sso-passkey-sign-in",
        title: "Passkey and SSO sign-in",
        description: "A passkey button with a waiting state, plus single sign-on that detects the company identity provider from the email domain. Try dana@acme.com.",
        component: SsoPasskeySignIn,
        source: ssoPasskeySignInSource,
        layout: "full",
        minHeight: 700,
    },
    {
        id: "two-factor-code",
        title: "Two-factor code entry",
        description: "Six digit code inputs with paste support, arrow key and backspace navigation, auto submit, an attempts counter and a recovery code fallback. The demo code is 428193.",
        component: TwoFactorCode,
        source: twoFactorCodeSource,
        layout: "full",
        minHeight: 640,
    },
    {
        id: "password-reset-flow",
        title: "Password reset flow",
        description: "Forgot password, check your inbox, choose a new password and confirmation in one card, with a step rail, live password rules and focus moved to each new step.",
        component: PasswordResetFlow,
        source: passwordResetFlowSource,
        layout: "full",
        minHeight: 680,
    },
    {
        id: "invite-acceptance",
        title: "Invite acceptance",
        description: "A workspace invitation with the inviter, member count and role, an account setup form, and accept or decline paths with their own confirmation states.",
        component: InviteAcceptance,
        source: inviteAcceptanceSource,
        layout: "full",
        minHeight: 760,
    },
    {
        id: "onboarding-steps",
        title: "Onboarding after sign-up",
        description: "A three step setup for use case, workspace name and team size, and teammate invites, with a live preview of the workspace that updates as you answer.",
        component: OnboardingSteps,
        source: onboardingStepsSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "session-locked",
        title: "Session locked screen",
        description: "A lock screen over the app after inactivity, with a clock, the signed in user and a password field. Unlock with any password of 8 or more characters, then lock again from the header.",
        component: SessionLocked,
        source: sessionLockedSource,
        layout: "full",
        minHeight: 680,
    },
];

export default examples;
