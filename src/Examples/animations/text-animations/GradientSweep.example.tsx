import {GradientSweep, type SweepAnnouncement} from "./GradientSweep";

const announcement: SweepAnnouncement = {text: "Aurora 2.0 is out, read the launch notes", href: "#aurora"};

const GradientSweepExample = () => (
    <GradientSweep
        announcement={announcement}
        headline="Analytics that answer back"
        description="Ask a question in plain words and get a chart, the query behind it and a short explanation."
    />
);

export default GradientSweepExample;
