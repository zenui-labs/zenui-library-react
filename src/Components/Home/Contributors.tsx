import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {LuArrowRight, LuGithub} from "react-icons/lu";

import MetricsCard from "./MetricsCard.tsx";
import {TeamData} from "@utils/TeamData.ts";
import {DevContributorsData} from "@utils/DevContributorsData.ts";
import {MemberCard} from "@/Components/Home/MemberCard.tsx";

const REPO_URL = "https://github.com/Asfak00/zenui-library";

const groups = [
    {
        id: "development",
        title: "Development",
        description: "The people who write, review and maintain ZenUI's code.",
        members: DevContributorsData ?? [],
    },
    {
        id: "design",
        title: "Design",
        description: "The people who design ZenUI's components, pages and templates.",
        members: TeamData ?? [],
    },
];

const Contributors = () => {
    return (
        <>
            <div className="shell pb-20 pt-10">
                <header className="max-w-[60ch]">
                    <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                        Contributors
                    </h1>
                    <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-muted">
                        ZenUI is an open source project, and these are the people who build it. Each card links to their
                        profiles. Contributors can also download their certificate from their card.
                    </p>
                </header>

                {groups.map((group) => (
                    <section key={group.id} aria-labelledby={`${group.id}-title`} className="mt-14">
                        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-hairline pb-4">
                            <div>
                                <h2 id={`${group.id}-title`} className="flex items-baseline gap-2.5 text-[1.3rem] font-semibold tracking-heading text-ink">
                                    {group.title}
                                </h2>
                                <p className="mt-1 text-[0.92rem] text-ink-muted">{group.description}</p>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 640px:grid-cols-3 640px:gap-4 1024px:grid-cols-4 1260px:grid-cols-5">
                            {group.members.map((member, index) => (
                                <MemberCard key={`${member.name}-${index}`} member={member}/>
                            ))}
                        </div>
                    </section>
                ))}

                <section className="panel mt-16 flex flex-col gap-6 p-6 640px:p-8 1024px:flex-row 1024px:items-center 1024px:justify-between">
                    <div className="max-w-[56ch]">
                        <h2 className="text-[1.15rem] font-semibold tracking-heading text-ink">Want to see your name here?</h2>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                            Fix a bug, add a component or improve the docs through a pull request. People who make a large
                            or critical contribution earn the ZenUI Hero badge.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <Link to="/zenui-hero-docs" className="btn-primary">
                            Read the contributor guide
                            <LuArrowRight className="size-4"/>
                        </Link>
                        <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-ghost">
                            <LuGithub className="size-4"/>
                            GitHub
                        </a>
                    </div>
                </section>
            </div>

            <MetricsCard/>

            <Helmet>
                <title>Contributors | ZenUI Library</title>
            </Helmet>
        </>
    );
};

export default Contributors;
