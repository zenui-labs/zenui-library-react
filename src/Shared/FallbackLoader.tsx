
// The ZenUI mark used as a mask: an accent "liquid" with a moving wave fills it from the bottom.
const logoMask = {
    WebkitMaskImage: "url(/logo.png)",
    maskImage: "url(/logo.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
};

const wave = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12' preserveAspectRatio='none'%3E%3Cpath d='M0 6 Q15 0 30 6 T60 6 T90 6 T120 6 V12 H0Z' fill='black'/%3E%3C/svg%3E\")";

const FallbackLoader = () => {
    return (
        <div role="status" aria-label="Loading" className="fixed inset-0 z-[2000] flex items-center justify-center bg-canvas">
            <div className="relative flex items-center justify-center">
                <span aria-hidden="true" className="absolute size-28 animate-[loader-ring_1.8s_ease-out_infinite] rounded-full border border-accent/40"/>
                <span aria-hidden="true" className="absolute size-28 animate-[loader-ring_1.8s_ease-out_0.9s_infinite] rounded-full border border-accent/30"/>

                <div className="relative h-[54px] w-[72px]" style={logoMask}>
                    {/* Empty shape */}
                    <div className="absolute inset-0 bg-hairline-strong"/>
                    {/* Liquid: rises, and its wavy top edge keeps moving */}
                    <div className="absolute inset-x-0 bottom-0 h-full animate-[loader-fill_1.8s_cubic-bezier(0.65,0,0.35,1)_infinite]">
                        <div
                            className="absolute -top-[6px] left-0 h-[7px] w-[200%] animate-[loader-wave_0.9s_linear_infinite]"
                            style={{
                                WebkitMaskImage: wave,
                                maskImage: wave,
                                WebkitMaskSize: "50% 100%",
                                maskSize: "50% 100%",
                                background: "rgb(var(--accent))",
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-accent to-accent-strong"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FallbackLoader;
