import type {ComponentType} from "react";

export interface TicketDetail {
    icon: ComponentType<{className?: string}>;
    /** Bold first line, for example the venue. */
    label: string;
    /** Smaller second line, for example the date. */
    value: string;
}

export interface TicketCardProps {
    title: string;
    /** Rows on the left side, for example the venue and the location. */
    details: TicketDetail[];
    /** Start time shown at the top of the stub, for example "9:00 AM". */
    time: string;
    price: string;
    priceLabel?: string;
    buttonLabel?: string;
    onBuy?: () => void;
    /** Color of the two half circles cut into the stub. Match it to the background behind the card. */
    notchClassName?: string;
    className?: string;
}

/** A ticket shaped card with event details on the left and a dashed stub with the time, price and a buy button. */
export const TicketCard = ({
    title,
    details,
    time,
    price,
    priceLabel = "Price",
    buttonLabel = "Buy ticket",
    onBuy,
    notchClassName = "bg-white dark:bg-[#020617]",
    className = "",
}: TicketCardProps) => (
    <div className={`bg-blue-50 dark:bg-slate-800 w-full justify-between rounded-xl flex ${className}`}>
        {/* left side */}
        <div className="flex flex-col p-[15px] md:p-[20px] gap-[18px]">
            <h3 className="text-[1rem] md:text-[1.3rem] font-bold dark:text-blue-600 text-blue-800">{title}</h3>
            {details.map(({icon: Icon, label, value}) => (
                <div key={label} className="flex items-center gap-[10px]">
                    <Icon className="p-[8px] md:p-[10px] dark:text-[#abc2d3] dark:bg-slate-700 rounded-xl bg-blue-100 text-blue-800 text-[2rem] md:text-[3rem]"/>
                    <div>
                        <h4 className="text-[0.8rem] md:text-[1.1rem] font-[600] dark:text-[#abc2d3] text-gray-800">{label}</h4>
                        <p className="text-[0.6rem] md:text-[0.9rem] font-[400] dark:text-[#abc2d3]/70 text-gray-500">{value}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* right side */}
        <div className="flex flex-col justify-between relative w-[45%] md:w-[40%] items-center border-l-[2px] p-[15px] md:p-[20px] dark:border-slate-600 border-dashed border-gray-200">
            {/* top notch */}
            <div
                aria-hidden
                className={`w-[45px] h-[45px] rounded-full absolute top-[-15%] md:top-[-13%] min-[425px]:left-[-13.5%] left-[-19%] md:left-[-11.5%] ${notchClassName}`}
            />

            <p className="text-[0.9rem] md:text-[1.3rem] font-bold dark:text-blue-600 text-blue-800">{time}</p>

            <button
                type="button"
                onClick={onBuy}
                className="px-2 md:px-4 py-1 text-[0.8rem] md:text-[1.1rem] md:py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-600"
            >
                {buttonLabel}
            </button>

            <p className="text-[0.9rem] md:text-[1.1rem] dark:text-[#abc2d3] text-gray-500">
                {priceLabel}: <span className="text-red-600 font-semibold">{price}</span>
            </p>

            {/* bottom notch */}
            <div
                aria-hidden
                className={`w-[45px] h-[45px] rounded-full absolute bottom-[-15%] md:bottom-[-13%] left-[-18.5%] min-[425px]:left-[-13.5%] md:left-[-11.5%] ${notchClassName}`}
            />
        </div>
    </div>
);
