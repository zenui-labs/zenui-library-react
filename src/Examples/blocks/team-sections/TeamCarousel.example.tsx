import {TeamCarousel, type CarouselMember} from "./TeamCarousel";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=480&h=600&fit=crop&crop=faces&q=75`;

const members: CarouselMember[] = [
    {name: "Lena Fischer", role: "Head of Research", photo: photo("1494790108377-be9c29b29330"), askMeAbout: "Diary studies", quote: "I read every churn survey. The patterns show up before the charts do."},
    {name: "Marcus Bell", role: "Senior Engineer", photo: photo("1472099645785-5658abf4ff4e"), askMeAbout: "Postgres tuning", quote: "Most slow pages are one missing index away from fast."},
    {name: "Priya Shah", role: "Product Manager", photo: photo("1544005313-94ddf0286df2"), askMeAbout: "Pricing tests", quote: "We ship small, measure for two weeks and write down what we learned."},
    {name: "Tom Oduya", role: "Customer Success", photo: photo("1506794778202-cad84cf45f1d"), askMeAbout: "Onboarding calls", quote: "The first 30 days decide whether a team stays for three years."},
    {name: "Julia Novak", role: "Design Lead", photo: photo("1534528741775-53994a69daeb"), askMeAbout: "Type systems", quote: "Good defaults beat a settings page with forty toggles."},
    {name: "Ahmed Saleh", role: "Security Engineer", photo: photo("1519085360753-af0119f7cbe7"), askMeAbout: "Threat modeling", quote: "I would rather review a design doc than a breach report."},
    {name: "Rosa Jiménez", role: "Data Scientist", photo: photo("1438761681033-6461ffad8d80"), askMeAbout: "Forecasting", quote: "A forecast is only useful if people know how wrong it can be."},
];

const TeamCarouselExample = () => <TeamCarousel members={members}/>;

export default TeamCarouselExample;
