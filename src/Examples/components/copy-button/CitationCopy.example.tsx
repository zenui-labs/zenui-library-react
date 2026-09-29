import {CitationCopy, type Paper} from "./CitationCopy";

const paper: Paper = {
    authors: [
        {first: "Lena", last: "Okafor"},
        {first: "Marcus", last: "Whitfield"},
        {first: "Yuki", last: "Tanaka"},
    ],
    title: "Urban tree canopy and summer heat exposure in mid-sized cities",
    journal: "Journal of Urban Ecology",
    year: 2024,
    volume: 10,
    issue: 2,
    pages: "118-134",
    doi: "10.1093/jue/juae014",
};

const CitationCopyExample = () => <CitationCopy paper={paper}/>;

export default CitationCopyExample;
