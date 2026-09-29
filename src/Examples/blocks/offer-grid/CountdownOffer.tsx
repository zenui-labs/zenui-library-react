import {useEffect, useState} from "react";

export interface CountdownUnitLabels {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export interface CountdownOfferProps {
    image: string;
    imageAlt: string;
    /** When the offer ends. Accepts a Date, a timestamp or an ISO date string. */
    expiresAt: Date | number | string;
    title: string;
    description: string;
    /** Small label above the title. */
    eyebrow?: string;
    expiresLabel?: string;
    unitLabels?: CountdownUnitLabels;
    ctaLabel?: string;
    /** Where the button goes. Without it the button calls `onShop`. */
    href?: string;
    onShop?: () => void;
    className?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ZERO: TimeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

const getTimeLeft = (target: number): TimeLeft => {
    const difference = target - Date.now();
    if (difference <= 0) return ZERO;
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

// Ticks once a second until the target passes, then stops the timer.
const useCountdown = (expiresAt: Date | number | string) => {
    const target = new Date(expiresAt).getTime();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

    useEffect(() => {
        const tick = () => {
            const next = getTimeLeft(target);
            setTimeLeft(next);
            return next !== ZERO;
        };
        if (!tick()) return;
        const timer = window.setInterval(() => {
            if (!tick()) window.clearInterval(timer);
        }, 1000);
        return () => window.clearInterval(timer);
    }, [target]);

    return timeLeft;
};

const formatNumber = (number: number) => number.toString().padStart(2, "0");

const defaultUnitLabels: CountdownUnitLabels = {days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds"};

/** A two column promotion with an image, a live countdown to the end of the offer and a shop button. */
export const CountdownOffer = ({
    image,
    imageAlt,
    expiresAt,
    title,
    description,
    eyebrow = "PROMOTION",
    expiresLabel = "Offer expires in:",
    unitLabels = defaultUnitLabels,
    ctaLabel = "Shop now",
    href,
    onShop,
    className = "",
}: CountdownOfferProps) => {
    const timeLeft = useCountdown(expiresAt);
    const units: {key: keyof TimeLeft; label: string}[] = [
        {key: "days", label: unitLabels.days},
        {key: "hours", label: unitLabels.hours},
        {key: "minutes", label: unitLabels.minutes},
        {key: "seconds", label: unitLabels.seconds},
    ];
    const ctaClass = "inline-block py-2 px-6 rounded-md bg-black text-white mt-5 text-[1rem]";

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 rounded-md ${className}`}>
            <img alt={imageAlt} src={image} className="w-full h-full rounded-t-md lg:rounded-none lg:rounded-l-md"/>

            <div className="bg-[#ffd37c] text-gray-900 rounded-b-md lg:rounded-none lg:rounded-r-md p-5 lg:p-12">
                <span className="text-[0.9rem] font-semibold text-blue-600">{eyebrow}</span>
                <h4 className="text-[1.5rem] lg:text-[1.8rem] font-medium mt-2">{title}</h4>
                <p className="text-[0.9rem] font-normal text-gray-900 mt-2">{description}</p>

                <div className="mt-5">
                    <p className="text-[0.9rem] font-normal text-gray-900">{expiresLabel}</p>
                    <div className="flex items-center gap-[10px] mt-2" role="timer">
                        {units.map((unit) => (
                            <div key={unit.key} className="flex items-center justify-center flex-col">
                                <span className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">
                                    {formatNumber(timeLeft[unit.key])}
                                </span>
                                <span className="text-[0.7rem]">{unit.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {href ? (
                    <a href={href} onClick={onShop} className={ctaClass}>{ctaLabel}</a>
                ) : (
                    <button type="button" onClick={onShop} className={ctaClass}>{ctaLabel}</button>
                )}
            </div>
        </div>
    );
};
