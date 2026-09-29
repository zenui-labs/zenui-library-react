import {Band, Counter, Reveal} from "@/Components/Home/LandingKit.tsx";
import {useGitHubStars} from "@/CustomHooks/useGithubStars.ts";

const MetricsCard = () => {
    const {stars} = useGitHubStars("Asfak00", "zenui-library");

    const metrics = [
        {value: 30.5, suffix: "k+", decimals: 1, label: "Developers using ZenUI"},
        {value: 800, suffix: "+", label: "Components and variants"},
        {value: 20, suffix: "+", label: "Free templates"},
        {value: stars || 0, suffix: stars ? "+" : "", label: "Stars on GitHub"},
    ];

    return (
        <Band>
            <div className="grid grid-cols-2 1024px:grid-cols-4">
                {metrics.map((metric, index) => (
                    <Reveal
                        key={metric.label}
                        delay={index * 0.06}
                        className="border-hairline px-5 py-12 640px:px-8 1024px:px-12 [&:nth-child(2n)]:border-l 1024px:border-l 1024px:first:border-l-0 [&:nth-child(n+3)]:border-t 1024px:[&:nth-child(n+3)]:border-t-0"
                    >
                        <Counter value={metric.value} suffix={metric.suffix} decimals={metric.decimals}
                                 className="block text-[2.4rem] font-semibold leading-none tracking-display text-ink 640px:text-[3.2rem]"/>
                        <p className="mt-3 text-[0.875rem] text-ink-muted">{metric.label}</p>
                    </Reveal>
                ))}
            </div>
        </Band>
    );
};

export default MetricsCard;
