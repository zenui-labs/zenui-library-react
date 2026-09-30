import {ConstellationRadar} from "./ConstellationRadar";

const attributes = [
    {id: "passing", label: "Passing"},
    {id: "vision", label: "Vision"},
    {id: "dribbling", label: "Dribbling"},
    {id: "finishing", label: "Finishing"},
    {id: "pace", label: "Pace"},
    {id: "stamina", label: "Stamina"},
    {id: "tackling", label: "Tackling"},
    {id: "aerial", label: "Aerial"},
];

const ConstellationRadarExample = () => (
    <ConstellationRadar
        axes={attributes}
        profiles={[
            {id: "okafor", label: "Okafor", values: [91, 88, 79, 58, 71, 84, 62, 45]},
            {id: "brandt", label: "Brandt", values: [74, 66, 70, 81, 86, 77, 55, 69]},
        ]}
        title="Scouting report, central midfield"
        subtitle="Percentile against league midfielders, 2024–25"
        summary="Two midfielders compared on eight attributes. Okafor leads on passing (91) and vision (88). Brandt is the more direct player, ahead on pace (86), finishing (81) and aerial duels (69)."
    />
);

export default ConstellationRadarExample;
