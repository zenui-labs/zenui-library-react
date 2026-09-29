import {PaperPlaneSend, type Recipient} from "./PaperPlaneSend";

const recipient: Recipient = {name: "Maya Chen", initials: "MC"};

const PaperPlaneSendExample = () => (
    <PaperPlaneSend
        recipient={recipient}
        defaultMessage="Hi Maya, the revised floor plans are attached. Could you check the kitchen layout before Friday?"
    />
);

export default PaperPlaneSendExample;
