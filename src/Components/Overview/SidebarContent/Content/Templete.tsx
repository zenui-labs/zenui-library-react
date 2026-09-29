import {Helmet} from "react-helmet";
import {LuArrowUpRight} from "react-icons/lu";
import {FiGithub} from "react-icons/fi";

import {templatesData} from "@utils/TemplatesData";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

const Templates = () => {
    return (
        <div>
            <DocsTitle
                title="Templates"
                lead={`${templatesData.length} free React templates, from landing pages to multi-page sites. Open the live preview, then clone the repository to start.`}
            />

            <div className="mt-10 grid grid-cols-1 gap-5 640px:grid-cols-2 1404px:grid-cols-3">
                {templatesData?.map((template) => (
                    <article key={template.githubLink}
                             className="group flex flex-col overflow-hidden rounded-panel border border-hairline bg-surface transition-[border-color,box-shadow] duration-300 hover:border-hairline-strong hover:shadow-float">
                        <a href={template.liveLink} target="_blank" rel="noreferrer" className="relative block overflow-hidden bg-raised"
                           aria-label={`Live preview of ${template.title}`}>
                            <img src={template.image} alt="" loading="lazy"
                                 className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"/>
                        </a>
                        <div className="flex flex-1 flex-col p-4">
                            <h2 className="line-clamp-1 text-[0.95rem] font-medium text-ink first-letter:uppercase">{template.title}</h2>
                            <p className="mt-1.5 line-clamp-2 text-[0.85rem] leading-relaxed text-ink-subtle">{template.description}</p>
                            <div className="mt-4 flex gap-2 pt-1">
                                <a href={template.liveLink} target="_blank" rel="noreferrer" className="btn-ghost h-9 flex-1 text-[0.82rem]">
                                    Live preview <LuArrowUpRight className="size-3.5"/>
                                </a>
                                <a href={template.githubLink} target="_blank" rel="noreferrer" className="btn-primary h-9 flex-1 text-[0.82rem]">
                                    <FiGithub className="size-3.5"/> Get the code
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <OverviewFooter/>

            <Helmet>
                <title>Templates | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Templates;
