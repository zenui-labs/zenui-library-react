import type {ReactNode} from "react";
import {FolderTabs, type Folder} from "./FolderTabs";

const Sheet = ({title, children}: {title: string; children: ReactNode}) => (
    <div className="max-w-md">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">Job 24-117 · Harbour Baths, Aarhus</p>
        <h3 className="mt-1 font-serif text-2xl">{title}</h3>
        <div className="mt-4 space-y-1.5 font-mono text-[12px] leading-relaxed">{children}</div>
    </div>
);

const Row = ({label, value}: {label: string; value: string}) => (
    <p className="flex justify-between gap-4 border-b border-dashed pb-1.5 [border-color:rgba(120,100,70,0.3)]">
        <span className="opacity-70">{label}</span>
        <span className="text-right tabular-nums">{value}</span>
    </p>
);

const folders: Folder[] = [
    {
        id: "brief", label: "Brief", note: "rev. C", tint: "manila", content: (
            <Sheet title="Client brief">
                <Row label="Client" value="Aarhus Kommune"/>
                <Row label="Programme" value="Sea baths, sauna, 2 pools"/>
                <Row label="Capacity" value="340 bathers"/>
                <Row label="Open by" value="1 June 2026"/>
            </Sheet>
        ),
    },
    {
        id: "site", label: "Site", note: "survey 12/03", tint: "kraft", content: (
            <Sheet title="Site survey">
                <Row label="Position" value="56.1537° N, 10.2176° E"/>
                <Row label="Water depth" value="3.8 m at quay"/>
                <Row label="Tidal range" value="± 0.3 m"/>
                <Row label="Wave exposure" value="NE, 1.1 m design"/>
            </Sheet>
        ),
    },
    {
        id: "drawings", label: "Drawings", tint: "slate", content: (
            <Sheet title="Drawing register">
                <Row label="A-101 Site plan" value="rev C · issued"/>
                <Row label="A-201 Sections" value="rev B · issued"/>
                <Row label="A-310 Sauna deck" value="rev A · in review"/>
                <Row label="S-400 Pontoon piles" value="with engineer"/>
            </Sheet>
        ),
    },
    {
        id: "budget", label: "Budget", note: "check VAT", tint: "sage", content: (
            <Sheet title="Cost plan, stage 3">
                <Row label="Pontoons and piling" value="DKK 14,200,000"/>
                <Row label="Timber decks" value="DKK 6,850,000"/>
                <Row label="Sauna building" value="DKK 4,120,000"/>
                <Row label="Total excl. VAT" value="DKK 25,170,000"/>
            </Sheet>
        ),
    },
    {
        id: "letters", label: "Letters", tint: "rose", content: (
            <Sheet title="Correspondence">
                <Row label="04 Mar · Harbour master" value="Berth moved 12 m south"/>
                <Row label="19 Feb · Kommune" value="Stage 2 approved"/>
                <Row label="02 Feb · Engineer" value="Pile spacing query"/>
            </Sheet>
        ),
    },
];

const FolderTabsExample = () => <FolderTabs label="Project files" folders={folders} defaultValue="site"/>;

export default FolderTabsExample;
