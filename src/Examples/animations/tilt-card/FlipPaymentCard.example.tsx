import {FlipPaymentCard} from "./FlipPaymentCard";

const FlipPaymentCardExample = () => (
    <FlipPaymentCard
        brand="Northwind"
        lastFour="4821"
        holder="Jordan Ellis"
        expires="09/29"
        backNote="Issued by Northwind Bank. If found, call +1 415 555 0142."
    />
);

export default FlipPaymentCardExample;
