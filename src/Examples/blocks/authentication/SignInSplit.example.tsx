import {SignInSplit, type SignInStat, type SignInTestimonial} from "./SignInSplit";

const stat: SignInStat = {
    label: "Hiking trips booked this quarter",
    value: "1,948",
    series: [1500, 1580, 1540, 1700, 1660, 1800, 1760, 1900, 1860],
};

const testimonial: SignInTestimonial = {
    quote: "We moved 40 guides and every booking from spreadsheets to Summit in a week. Our office manager got her Mondays back.",
    name: "Ingrid Karlsen",
    role: "Owner, Fjellsti Guiding",
    initials: "IK",
};

// Replace with your auth request. The demo always rejects so the error state is visible.
const signIn = () =>
    new Promise<void>((_, reject) => {
        window.setTimeout(() => reject(new Error("That email and password do not match. Try again or reset your password.")), 1000);
    });

const SignInSplitExample = () => <SignInSplit stat={stat} testimonial={testimonial} onSubmit={signIn}/>;

export default SignInSplitExample;
