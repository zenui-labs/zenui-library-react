import {CtaPanel} from "./CtaPanel";

const perks: string[] = ["14-day trial on every plan", "No credit card", "Cancel from settings"];

const CtaPanelExample = () => <CtaPanel command="npx relay@latest init" perks={perks}/>;

export default CtaPanelExample;
