import {useState} from "react";
import {FaBehance, FaXTwitter} from "react-icons/fa6";
import {LuAward, LuFigma, LuGithub, LuGlobe, LuLinkedin, LuLoader2, LuAlertTriangle} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

// Some profile links in the data are missing the protocol.
const toUrl = (link) => (/^https?:\/\//i.test(link) ? link : `https://${link}`);

const socials = [
    {key: "githubLink", label: "GitHub", icon: LuGithub},
    {key: "linkedinLink", label: "LinkedIn", icon: LuLinkedin},
    {key: "twitterLink", label: "X", icon: FaXTwitter},
    {key: "behanceLink", label: "Behance", icon: FaBehance},
    {key: "figmaLink", label: "Figma", icon: LuFigma},
    {key: "website", label: "Website", icon: LuGlobe},
];

const iconButton = "inline-flex size-7 items-center justify-center rounded-lg 640px:size-8 border border-hairline bg-surface text-ink-subtle transition-colors hover:border-hairline-strong hover:bg-raised hover:text-ink";

export const MemberCard = ({member}) => {
    const [certificateState, setCertificateState] = useState("idle");
    const name = member?.name?.trim();

    const handleDownloadCertificate = async (certificate) => {
        if (!certificate || certificateState === "loading") return;
        setCertificateState("loading");

        try {
            const response = await fetch(`/certificates/certificate-${certificate}.png`);
            if (!response.ok) throw new Error("Image not found");

            const blobUrl = URL.createObjectURL(await response.blob());
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", "zenui-contributor-certificate.png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            setCertificateState("idle");
        } catch (error) {
            console.error("Error downloading certificate:", error);
            setCertificateState("error");
            setTimeout(() => setCertificateState("idle"), 2400);
        }
    };

    const links = socials.filter(({key}) => member?.[key]);

    return (
        <article className="group flex flex-col overflow-hidden rounded-panel border border-hairline bg-surface transition-[border-color,box-shadow] duration-300 hover:border-hairline-strong hover:shadow-float">
            <div className="relative aspect-square overflow-hidden bg-raised">
                <img
                    src={member?.image}
                    alt={name ? `Photo of ${name}` : ""}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
                {member?.zenuiHero && (
                    <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/90 px-2 py-0.5 text-[0.72rem] font-medium text-ink backdrop-blur">
                        <LuAward className="size-3 text-accent-strong" aria-hidden="true"/>
                        ZenUI Hero
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-3.5 640px:p-4">
                <h3 className="truncate text-[0.95rem] font-medium text-ink" title={name}>{name}</h3>
                <p className="mt-0.5 truncate text-[0.82rem] text-ink-subtle first-letter:uppercase">{member?.title}</p>

                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3.5">
                    {links.map(({key, label, icon: Icon}) => (
                        <a
                            key={key}
                            href={toUrl(member[key])}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${name} on ${label}`}
                            title={label}
                            className={iconButton}
                        >
                            <Icon className="size-3.5"/>
                        </a>
                    ))}

                    {member?.certificate && (
                        <button
                            type="button"
                            onClick={() => handleDownloadCertificate(member.certificate)}
                            aria-label={`Download ${name}'s contributor certificate`}
                            title={certificateState === "error" ? "Certificate not found" : "Download certificate"}
                            className={cn(iconButton, "ml-auto", certificateState === "error" && "text-ink")}
                        >
                            {certificateState === "loading" && <LuLoader2 className="size-3.5 animate-spin"/>}
                            {certificateState === "error" && <LuAlertTriangle className="size-3.5"/>}
                            {certificateState === "idle" && <LuAward className="size-3.5"/>}
                        </button>
                    )}
                </div>
                {certificateState === "error" && (
                    <p role="status" className="mt-2 text-[0.75rem] text-ink-subtle">Certificate not found.</p>
                )}
            </div>
        </article>
    );
};
