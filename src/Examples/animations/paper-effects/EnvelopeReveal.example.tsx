import {EnvelopeReveal} from "./EnvelopeReveal";

const invitation = (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[7.5px] font-semibold uppercase tracking-[0.3em] text-[#8a7248]">Together with their families</p>
        <p className="mt-2 font-serif text-[19px] italic leading-tight">Inês Carvalho</p>
        <p className="font-serif text-[11px] italic text-[#8a7248]">and</p>
        <p className="font-serif text-[19px] italic leading-tight">Tomás Reyes</p>
        <p className="mt-2 text-[8.5px] leading-snug text-[#5b4c36]">request the pleasure of your company at their wedding</p>
        <div className="mt-2.5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.16em] text-[#2c2419]">
            <span>Sat 12 June 2027</span>
            <span className="h-2.5 w-px bg-[#b79b6a]"/>
            <span className="tabular-nums">4:00 pm</span>
        </div>
        <p className="mt-1 text-[9px] text-[#5b4c36]">Quinta da Regaleira, Sintra</p>
        <p className="mt-2.5 text-[7.5px] uppercase tracking-[0.22em] text-[#8a7248]">Kindly reply by 1 April</p>
    </div>
);

const EnvelopeRevealExample = () => (
    <EnvelopeReveal
        letter={invitation}
        monogram="I·T"
        returnAddress="I. Carvalho · Rua do Arco 14 · Lisboa"
    />
);

export default EnvelopeRevealExample;
