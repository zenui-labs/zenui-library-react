import {LuDatabase, LuDownload, LuFilter, LuSparkles} from "react-icons/lu";
import {DataPipeline, type PipelineStage} from "./DataPipeline";

const stages: PipelineStage[] = [
    {id: "ingest", label: "Ingest", detail: "12,480 events", icon: LuDownload},
    {id: "clean", label: "Clean", detail: "164 dropped", icon: LuFilter},
    {id: "enrich", label: "Enrich", detail: "+ geo, plan", icon: LuSparkles},
    {id: "load", label: "Load", detail: "to warehouse", icon: LuDatabase},
];

const DataPipelineExample = () => (
    <DataPipeline stages={stages} name="Nightly sync" firstRun={1841} summary="12,316 rows loaded in 3.4s"/>
);

export default DataPipelineExample;
