import {LogoMarqueeRows, type MarqueeRowData} from "./LogoMarqueeRows";

const markClass = "h-5 w-5 shrink-0";

// Simple geometric marks drawn with SVG so the block has no image dependencies.
const marks = {
    ring: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3"/></svg>,
    triangle: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M12 3 21 20H3Z" fill="currentColor"/></svg>,
    squares: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/></svg>,
    arc: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M3 19a9 9 0 0 1 18 0h-5a4 4 0 0 0-8 0Z" fill="currentColor"/></svg>,
    bolt: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7Z" fill="currentColor"/></svg>,
    hex: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7Z" fill="currentColor"/></svg>,
    wave: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M2 14c3-6 6 6 10 0s7 6 10 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>,
    plus: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z" fill="currentColor"/></svg>,
    dots: <svg viewBox="0 0 24 24" className={markClass} aria-hidden="true"><circle cx="6" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/><circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.3"/></svg>,
};

const rows: MarqueeRowData[] = [
    {
        label: "Fintech",
        speed: 28,
        direction: -1,
        logos: [
            {name: "Ferrox", mark: marks.bolt},
            {name: "Northbeam Bank", mark: marks.arc},
            {name: "Ledgerly", mark: marks.squares},
            {name: "Coinstack", mark: marks.hex},
            {name: "Paylane", mark: marks.wave},
            {name: "Tallyhouse", mark: marks.dots},
        ],
    },
    {
        label: "Healthcare",
        speed: 22,
        direction: 1,
        logos: [
            {name: "Halcyon Health", mark: marks.ring},
            {name: "Brightline", mark: marks.plus},
            {name: "Carewell", mark: marks.arc},
            {name: "Medora", mark: marks.triangle},
            {name: "Pulsewise", mark: marks.wave},
            {name: "Vitalis", mark: marks.hex},
        ],
    },
    {
        label: "Retail",
        speed: 34,
        direction: -1,
        logos: [
            {name: "Arcadia Goods", mark: marks.triangle},
            {name: "Parcelly", mark: marks.hex},
            {name: "Quillo", mark: marks.squares},
            {name: "Mercato", mark: marks.dots},
            {name: "Fernhill", mark: marks.ring},
            {name: "Stitchery", mark: marks.bolt},
        ],
    },
];

const LogoMarqueeRowsExample = () => <LogoMarqueeRows rows={rows}/>;

export default LogoMarqueeRowsExample;
