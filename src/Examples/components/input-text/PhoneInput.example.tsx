import {PhoneInput, type Country} from "./PhoneInput";

const countries: Country[] = [
    {name: "United States", code: "+1", flag: "🇺🇸"},
    {name: "Bangladesh", code: "+880", flag: "🇧🇩"},
    {name: "United Kingdom", code: "+44", flag: "🇬🇧"},
    {name: "Canada", code: "+1", flag: "🇨🇦"},
    {name: "Australia", code: "+61", flag: "🇦🇺"},
    {name: "Germany", code: "+49", flag: "🇩🇪"},
    {name: "France", code: "+33", flag: "🇫🇷"},
    {name: "Brazil", code: "+55", flag: "🇧🇷"},
    {name: "Mexico", code: "+52", flag: "🇲🇽"},
    {name: "Japan", code: "+81", flag: "🇯🇵"},
    {name: "South Korea", code: "+82", flag: "🇰🇷"},
    {name: "China", code: "+86", flag: "🇨🇳"},
    {name: "Russia", code: "+7", flag: "🇷🇺"},
    {name: "Italy", code: "+39", flag: "🇮🇹"},
    {name: "Spain", code: "+34", flag: "🇪🇸"},
    {name: "South Africa", code: "+27", flag: "🇿🇦"},
    {name: "Argentina", code: "+54", flag: "🇦🇷"},
    {name: "Egypt", code: "+20", flag: "🇪🇬"},
];

const PhoneInputExample = () => (
    <div className="w-full lg:w-[80%]">
        <PhoneInput countries={countries} name="phone"/>
    </div>
);

export default PhoneInputExample;
