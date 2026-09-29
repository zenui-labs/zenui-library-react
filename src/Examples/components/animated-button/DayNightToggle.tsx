import {useId, useState, type ChangeEvent} from "react";

export interface DayNightToggleProps {
    /** On means night. Pass it with `onChange` to control the toggle from the parent. */
    checked?: boolean;
    /** Starting state when the toggle manages itself. */
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    /** Height in pixels. The width follows from it. */
    size?: number;
    /** Length of the switch animation in seconds. */
    animationSpeed?: number;
    /** Sky color in the off (day) state. */
    dayColor?: string;
    /** Sky color in the on (night) state. */
    nightColor?: string;
    /** Accessible name of the switch. */
    label?: string;
    className?: string;
}

// Every selector is prefixed with a class made from useId, so several toggles can share a page and the styles
// never reach other elements.
const buildStyles = (s: string, size: number, speed: number, dayColor: string, nightColor: string) => `
    .${s} .dn-input {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .${s} .dn-sky {
        background-color: ${dayColor};
        height: ${size}px;
        aspect-ratio: 2.542;
        width: auto;
        border-radius: 9999px;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        transition: all ease-in-out ${speed}s;
        display: block;
        cursor: pointer;
    }

    .${s} .dn-input:focus-visible + .dn-sky {
        outline: 2px solid #3B9DF8;
        outline-offset: 3px;
    }

    .${s} .dn-sky::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        box-shadow: 0px 2.226px 2.862px 0px rgba(0, 0, 0, 0.25) inset,
                    0px -0.318px 4.134px 0px rgba(0, 0, 0, 0.25) inset,
                    0px -0.954px 1.272px 0px rgba(0, 0, 0, 0.25);
        z-index: 9999;
    }

    .${s} .dn-sun-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        aspect-ratio: 1;
        position: relative;
        z-index: 10;
        margin-left: 0.45%;
        transition: all ease-in-out ${speed}s;
    }

    .${s} .dn-sun {
        background-color: #ffd700;
        height: 83%;
        aspect-ratio: 1;
        border-radius: 9999px;
        position: absolute;
        z-index: 20;
        box-shadow: 0.6px 0.8px 0.8px 0px rgba(254, 255, 239, 0.61) inset,
                    0px -1px 0.8px 0px #ba9b2e inset;
        overflow: hidden;
    }

    .${s} .dn-sun-ray {
        background-color: #fff;
        height: 260%;
        aspect-ratio: 1;
        border-radius: 9999px;
        position: absolute;
        opacity: 0.1;
    }

    .${s} .dn-sun-ray:nth-child(1) {
        height: 198%;
    }

    .${s} .dn-sun-ray:nth-child(2) {
        height: 140%;
    }

    .${s} .dn-moon {
        background-color: rgb(195, 201, 209);
        height: 100%;
        aspect-ratio: 1;
        border-radius: 9999px;
        z-index: -11;
        position: relative;
        box-shadow: 0.6px 0.8px 0.8px 0px rgba(255, 255, 255, 0.61) inset,
                    0px -1px 0.8px 0px #969696 inset;
        transform: translateX(100%);
        transition: all ease-in-out ${speed}s;
    }

    .${s} .dn-spot {
        background: rgb(148, 158, 178);
        height: 10%;
        aspect-ratio: 1;
        border-radius: 99999px;
        position: absolute;
        box-shadow: 0px 0.2px 0.8px 0px rgba(0, 0, 0, 0.25) inset;
    }

    .${s} .dn-spot:nth-child(1) {
        top: 40%;
        left: 17%;
        height: 37%;
    }

    .${s} .dn-spot:nth-child(2) {
        top: 20%;
        left: 45%;
        height: 13%;
    }

    .${s} .dn-spot:nth-child(3) {
        top: 50%;
        left: 64%;
        height: 22%;
    }

    .${s} .dn-cloud-wrapper {
        background-color: transparent;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: flex-end;
        z-index: 10;
        transition: all ease-in-out ${speed}s;
    }

    .${s} .dn-cloud-wrapper:nth-of-type(2) {
        transform: translateY(-5%) translateX(-5.5%);
        opacity: 0.6;
    }

    .${s} .dn-cloud {
        background-color: rgb(243, 253, 255);
        height: 55%;
        aspect-ratio: 1;
        border-radius: 9999px;
        position: absolute;
    }

    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(1) { margin-left: 77%; margin-bottom: 16%; height: 81%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(2) { margin-left: 81%; margin-bottom: 1%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(3) { margin-left: 66%; margin-bottom: -4%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(4) { margin-left: 57%; margin-bottom: -9%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(5) { margin-left: 46%; margin-bottom: -9.5%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(6) { margin-left: 33%; margin-bottom: -14.5%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(7) { margin-left: 23%; margin-bottom: -16%; }
    .${s} .dn-cloud-wrapper:nth-of-type(2) .dn-cloud:nth-child(8) { margin-left: 7%; margin-bottom: -14%; }

    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(1) { margin-left: 84%; margin-bottom: 15%; height: 81%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(2) { margin-left: 84%; margin-bottom: -2%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(3) { margin-left: 67%; margin-bottom: -9.5%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(4) { margin-left: 58%; margin-bottom: -15%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(5) { margin-left: 46%; margin-bottom: -11%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(6) { margin-left: 33%; margin-bottom: -14%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(7) { margin-left: 21%; margin-bottom: -16%; }
    .${s} .dn-cloud-wrapper:nth-of-type(3) .dn-cloud:nth-child(8) { margin-left: 5%; margin-bottom: -14%; }

    .${s} .dn-stars {
        width: 100%;
        height: 100%;
        background-color: inherit;
        position: absolute;
        border-radius: 99999px;
        display: flex;
        justify-content: flex-start;
        gap: 1.2%;
        padding-left: 8%;
        align-items: center;
        top: 0;
        transform: translateY(-100%);
        transition: transform ease-in-out ${speed}s;
    }

    .${s} .dn-star {
        position: relative;
        height: 10%;
        aspect-ratio: 1;
        border-radius: 100%;
        overflow: hidden;
        background-color: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .${s} .dn-star:nth-child(1) { transform: scale(0.6); margin-bottom: 10%; }
    .${s} .dn-star:nth-child(2) { transform: scale(0.5); margin-bottom: -15%; }
    .${s} .dn-star:nth-child(3) { transform: scale(0.3); margin-bottom: -1%; }
    .${s} .dn-star:nth-child(4) { transform: scale(1.2); margin-bottom: 20%; }
    .${s} .dn-star:nth-child(5) { transform: scale(0.6); margin-bottom: 8%; margin-left: 3%; }
    .${s} .dn-star:nth-child(6) { transform: scale(0.6); margin-bottom: -17%; margin-left: -3%; }
    .${s} .dn-star:nth-child(7) { transform: scale(0.3); margin-bottom: -2%; }
    .${s} .dn-star:nth-child(8) { transform: scale(1.4); margin-bottom: -19%; margin-left: 2%; }
    .${s} .dn-star:nth-child(9) { transform: scale(0.8); margin-bottom: 3%; margin-left: -2%; }

    .${s} .dn-star-ray {
        background-color: inherit;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 100%;
        position: absolute;
    }

    .${s} .dn-star-base {
        background-color: white;
        height: 95%;
        aspect-ratio: 1;
        border-radius: 100%;
        position: absolute;
    }

    .${s} .dn-star-ray:nth-child(2) { transform: translateX(70%); }
    .${s} .dn-star-ray:nth-child(3) { transform: translateX(-70%); }
    .${s} .dn-star-ray:nth-child(4) { transform: translateY(70%); }
    .${s} .dn-star-ray:nth-child(5) { transform: translateY(-70%); }

    .${s} .dn-input:checked + .dn-sky {
        background: ${nightColor};
    }

    .${s} .dn-input:checked + .dn-sky .dn-cloud-wrapper {
        transform: translateY(130%);
    }

    .${s} .dn-input:checked + .dn-sky .dn-cloud-wrapper:nth-of-type(2) {
        transform: translate(20%, 130%);
    }

    .${s} .dn-input:checked + .dn-sky .dn-sun-wrapper {
        transform: translateX(152.1%);
    }

    .${s} .dn-input:checked + .dn-sky .dn-moon {
        transform: translateX(0%);
    }

    .${s} .dn-input:checked + .dn-sky .dn-stars {
        transform: unset;
    }
`;

const CLOUDS = Array.from({length: 8}, (_, index) => index);
const STARS = Array.from({length: 9}, (_, index) => index);

/** A light and dark mode switch drawn as a sky: the sun moves across and turns into the moon, clouds give way to stars. */
export const DayNightToggle = ({
    checked,
    defaultChecked = false,
    onChange,
    size = 60,
    animationSpeed = 0.7,
    dayColor = "#357bb3",
    nightColor = "#1c1f2c",
    label = "Dark mode",
    className = "",
}: DayNightToggleProps) => {
    const id = useId();
    const scope = `dn-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const inputId = `${scope}-input`;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternalChecked(event.target.checked);
        onChange?.(event.target.checked);
    };

    return (
        <div className={`${scope} ${className}`}>
            <style>{buildStyles(scope, size, animationSpeed, dayColor, nightColor)}</style>
            <input
                id={inputId}
                className="dn-input"
                type="checkbox"
                role="switch"
                aria-label={label}
                checked={isChecked}
                onChange={handleChange}
            />
            <label htmlFor={inputId} className="dn-sky">
                <div className="dn-sun-wrapper">
                    <div className="dn-sun-ray"/>
                    <div className="dn-sun-ray"/>
                    <div className="dn-sun-ray"/>
                    <div className="dn-sun">
                        <div className="dn-moon">
                            <div className="dn-spot"/>
                            <div className="dn-spot"/>
                            <div className="dn-spot"/>
                        </div>
                    </div>
                </div>
                <div className="dn-cloud-wrapper">
                    {CLOUDS.map((cloud) => (
                        <div key={cloud} className="dn-cloud"/>
                    ))}
                </div>
                <div className="dn-cloud-wrapper">
                    {CLOUDS.map((cloud) => (
                        <div key={cloud} className="dn-cloud"/>
                    ))}
                </div>
                <div className="dn-stars">
                    {STARS.map((star) => (
                        <div key={star} className="dn-star">
                            <div className="dn-star-base"/>
                            <div className="dn-star-ray"/>
                            <div className="dn-star-ray"/>
                            <div className="dn-star-ray"/>
                            <div className="dn-star-ray"/>
                        </div>
                    ))}
                </div>
            </label>
        </div>
    );
};
