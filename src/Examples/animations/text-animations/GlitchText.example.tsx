import {GlitchText} from "./GlitchText";

const GlitchTextExample = () => (
    <GlitchText
        status="Connection lost"
        text="Error 503"
        description="The billing service is not responding. Your data is safe and we are retrying automatically."
    />
);

export default GlitchTextExample;
