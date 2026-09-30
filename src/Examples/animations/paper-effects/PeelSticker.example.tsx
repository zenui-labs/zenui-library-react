import {PeelSticker} from "./PeelSticker";

const face = (
    <div className="flex h-full flex-col justify-between bg-[#1f3a2c] px-4 py-3.5 text-[#f1e6cf]">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.28em] text-[#c9b48e]">
            <span>Harbor &amp; Pine</span>
            <span className="tabular-nums">Lot 0419</span>
        </div>
        <div>
            <p className="font-serif text-[30px] italic leading-none">Night Ferry</p>
            <p className="mt-1.5 text-[11px] text-[#c9b48e]">Dark roast · Huila, Colombia · 250 g</p>
        </div>
        <div className="flex items-end justify-between text-[10px] text-[#c9b48e]">
            <span>Roasted 22 Sep 2026</span>
            <span className="pr-3 font-medium uppercase tracking-[0.18em] text-[#f1e6cf]">Peel me</span>
        </div>
    </div>
);

const PeelStickerExample = () => (
    <PeelSticker
        face={face}
        code="FERRY-20"
        offer="20% off your next bag"
        note="Online or in the Portland café until 31 Dec 2026"
    />
);

export default PeelStickerExample;
