import {AnimatedTooltip, type TooltipPerson} from "./AnimatedTooltip";

const people: TooltipPerson[] = [
    {
        name: "Alice Johnson",
        title: "UI/UX Designer",
        image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "David Smith",
        title: "Frontend Developer",
        image: "https://img.freepik.com/premium-photo/casual-young-man-shirt_146377-2992.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "Maria Lopez",
        title: "Product Manager",
        image: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "Emtiaz Lio",
        title: "Backend Developer",
        image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
];

const AnimatedTooltipExample = () => <AnimatedTooltip people={people}/>;

export default AnimatedTooltipExample;
